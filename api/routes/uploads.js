const multer = require('multer');
const express = require('express');
const joinUrl = require('url-join');
const pick = require('lodash/pick');
const middleware = require('@blocklet/sdk/lib/middlewares');
const mime = require('mime-types');

const env = require('../libs/env');
const { nanoid } = require('../libs/util');
const Upload = require('../states/upload');

const router = express.Router();
const auth = middleware.auth({ roles: ['owner', 'admin'] });
const user = middleware.user();
const upload = multer({
  storage: multer.diskStorage({
    destination: env.uploadDir,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${nanoid()}.${mime.extension(file.mimetype)}`);
    },
  }),
});

router.post('/uploads', user, auth, upload.single('image'), async (req, res) => {
  const obj = new URL(env.appUrl);
  obj.protocol = req.get('x-forwarded-proto') || req.protocol;
  obj.pathname = joinUrl('/uploads', req.file.filename);

  const doc = await Upload.insert({
    ...pick(req.file, ['size', 'filename', 'mimetype', 'originalname']),
    remark: req.body.remark || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: req.user.did,
    updatedBy: req.user.did,
  });

  res.json({ url: obj.href, ...doc });
});

module.exports = router;

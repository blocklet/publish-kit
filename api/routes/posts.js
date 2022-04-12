const Joi = require('joi');
const express = require('express');
const middleware = require('@blocklet/sdk/lib/middlewares');

// const env = require('../libs/env');
const logger = require('../libs/logger');
const Post = require('../states/post');

const router = express.Router();
const auth = middleware.auth({ roles: ['owner', 'admin'] });
const user = middleware.user();

const schema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(Post.TYPE))
    .required(),
  permission: Joi.string()
    .valid(...Object.values(Post.PERMISSIONS))
    .required(),
  status: Joi.string()
    .valid(...Object.values(Post.STATUS))
    .required(),
  tags: Joi.array().items(Joi.string()).default([]),
  author: Joi.string().required(),

  body: Joi.alternatives().conditional('type', [
    {
      is: Post.TYPE.STATUS,
      then: Joi.object({
        content: Joi.string().trim().min(1).max(280).required(),
      }),
    },
    {
      is: Post.TYPE.BLOG,
      then: Joi.object({
        title: Joi.string().trim().min(1).max(64).required(),
        content: Joi.string().trim().min(1).max(10240).required(),
        cover: Joi.string().trim().optional().default(''),
        excerpt: Joi.string().trim().optional().default(''),
      }),
    },
    {
      is: Post.TYPE.GALLERY,
      then: Joi.object({
        images: Joi.array().items(Joi.string()).min(1).max(9).required(),
        description: Joi.string().trim().min(1).max(280).required(),
      }),
    },
  ]),

  createdAt: Joi.date().iso().required().raw(),
  updatedAt: Joi.date().iso().required().raw(),
  createdBy: Joi.string().required(),
  updatedBy: Joi.string().required(),
}).options({ stripUnknown: true });

// create post
router.post('/posts', user, auth, async (req, res) => {
  const { type, status = Post.STATUS.PUBLISHED, permission, body } = req.body;
  const { did, fullName } = req.user;

  const post = {
    type,
    status,
    permission,
    body,
    author: fullName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: did,
    updatedBy: did,
  };

  const { value, error } = schema.validate(post);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  logger.info('create post', { post, value, error });

  const doc = await Post.insert(value);
  return res.jsonp(doc);
});

// update post
router.put('/posts/:postId', user, auth, async (req, res) => {
  const updates = req.body;
  const doc = await Post.findOne({ _id: req.params.postId });
  if (!doc) {
    return res.status(404).json({ error: 'post not found' });
  }

  const { error } = schema.validate({ ...doc, ...updates });
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  logger.info('update post', { postId: req.params.postId, updates });

  const updated = await Post.update(
    { _id: req.params.postId },
    { $set: { ...updates, updatedAt: new Date().toISOString(), updatedBy: req.user.did } }
  );
  return res.jsonp(updated);
});

// delete post
router.delete('/posts/:postId', user, auth, async (req, res) => {
  const doc = await Post.findOne({ _id: req.params.postId });
  if (!doc) {
    return res.status(404).json({ error: 'post not found' });
  }

  const updated = await Post.update(
    { _id: req.params.postId },
    { $set: { updatedAt: new Date().toISOString(), updatedBy: req.user.did, status: Post.STATUS.DELETED } }
  );
  logger.info('update post', { postId: req.params.postId });
  return res.jsonp(updated);
});

// get detail
router.get('/posts/:postId', async (req, res) => {
  const doc = await Post.findOne({ _id: req.params.postId });
  return res.jsonp(doc);
});

// get list
const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 20;
router.get('/posts', user, async (req, res) => {
  let page = Number(req.query.page || 1);
  let pageSize = Number(req.query.pageSize || DEFAULT_PAGE_SIZE);

  page = Number.isNaN(page) ? 1 : page;
  pageSize = Number.isNaN(pageSize) ? DEFAULT_PAGE_SIZE : pageSize;
  pageSize = pageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : pageSize;

  const conditions = {};
  conditions.status = Post.STATUS.PUBLISHED;
  if (req.query.status) {
    conditions.status = req.query.status;
  }
  if (req.query.type) {
    conditions.type = req.query.type;
  }
  if (req.query.createdBy) {
    conditions.createdBy = req.query.createdBy;
  }
  if (!req.user) {
    conditions.permission = Post.PERMISSIONS.PUBLIC;
  }

  const posts = await Post.find(conditions).sort({ updatedAt: -1 }).paginate(page, pageSize);
  const total = await Post.count(conditions);

  res.jsonp({ posts, total, page, pageSize, pageCount: Math.ceil(total / pageSize) });
});

module.exports = router;

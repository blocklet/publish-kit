const Joi = require('joi');
const express = require('express');
const middleware = require('@blocklet/sdk/lib/middlewares');

// const env = require('../libs/env');
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

  const doc = await Post.insert(value);
  return res.jsonp(doc);
});

router.post('/posts/:postId', async (req, res) => {
  // TODO: return post detail
});

module.exports = router;

const express = require('express');
const middleware = require('@blocklet/sdk/lib/middlewares');

const env = require('../libs/env');
const Post = require('../states/post');

const router = express.Router();
const auth = middleware.auth({ roles: ['owner', 'admin'] });
const user = middleware.user();

router.post('/posts', user, auth, async (req, res) => {
  // TODO: validate and create post
});

router.post('/posts/:postId', async (req, res) => {
  // TODO: return post detail
});

module.exports = router;

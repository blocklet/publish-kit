const path = require('path');
const env = require('./env');

module.exports = Object.freeze({
  UPLOAD_DIR: path.join(env.dataDir, 'uploads'),
  SUPPORTED_CONTENT_TYPES: ['status', 'gallery', 'blog'],
});

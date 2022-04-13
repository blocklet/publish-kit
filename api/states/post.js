const Database = require('@blocklet/sdk/lib/database');

/**
 * Data structure
 *
 * - tags: array
 * - body: object
 *  - type = status
 *    - content: [string], the tweet content
 *  - type = blog
 *    - title: string
 *    - content: string
 *    - excerpt: string
 *    - cover: string, used to concat url
 *  - type = gallery
 *    - images: array, the image urls
 *    - description: string, as image desc
 *
 * - author: string
 * - permission: enum
 * - type: enum
 * - status: enum
 *
 * - createdAt: date
 * - createdBy: string
 * - updatedAt: date
 * - updatedBy: string
 */

class Post extends Database {
  constructor() {
    super('posts');
  }

  STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    DELETED: 'deleted',
  };

  TYPE = {
    STATUS: 'status',
    THREAD: 'thread',
    GALLERY: 'gallery',
    BLOG: 'blog',
    POLL: 'poll',
  };

  PERMISSIONS = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    PAID: 'paid',
    MEMBER_ONLY: 'member_only',
  };
}

module.exports = new Post();

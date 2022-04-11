const Database = require('@blocklet/sdk/lib/database');

/**
 * Data structure
 *
 * - tags: array
 * - body: object
 *  - type = status
 *    - content: [string], the tweet content
 *  - type = blog
 *    - title: string, the blog content
 *    - content: string, the blog content
 *  - type = gallery
 *    - images: array
 *      - filename: string, used to concat url
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
  };

  TYPE = {
    STATUS: 'status',
    THREAD: 'thread',
    GALLERY: 'gallery',
    BLOG: 'blog',
    POLL: 'poll',
  }

  PERMISSIONS = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    PAID: 'paid',
    MEMBER_ONLY: 'member_only',
  };
}

module.exports = new Post();
import React from 'react';
import styled from 'styled-components';

import Empty from '@arcblock/ux/lib/Empty';
import Button from '@arcblock/ux/lib/Button';

import { StatusCard, BlogCard, GalleryCard } from './renderers/card';
import { usePostContext } from '../contexts/post';

const cards = {
  status: StatusCard,
  blog: BlogCard,
  gallery: GalleryCard,
};

export default function Posts() {
  const { loading, posts, hasMore, loadMorePosts } = usePostContext();

  if (posts.length === 0) {
    return <Empty />;
  }

  return (
    <Div>
      {posts.map((x) => {
        const CardComponent = cards[posts[0].type];
        return <CardComponent post={x} key={x._id} />;
      })}
      {hasMore && (
        <div className="load-more">
          <Button onClick={loadMorePosts} disabled={loading} variant="outlined" size="small">
            View more
          </Button>
        </div>
      )}
    </Div>
  );
}

const Div = styled.div`
  border-top: 1px solid #e6ecf0;

  .load-more {
    padding: 24px 0;
    text-align: center;
  }
`;

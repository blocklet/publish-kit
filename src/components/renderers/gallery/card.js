import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PostCard from '../base';

export default function GalleryCard({ post }) {
  return (
    <Div>
      <PostCard post={post}>
        {!!post.body.description && <div className="post-description">{post.body.description}</div>}
        <div className="post-images">
          {post.body.images.map((x) => (
            <img className="post-image" key={x} src={x} alt="" />
          ))}
        </div>
      </PostCard>
    </Div>
  );
}

GalleryCard.propTypes = {
  post: PropTypes.object.isRequired,
};

const Div = styled.div`
  .post-description {
    font-size: 1rem;
    font-weight: normal;
  }

  .post-images {
    display: flex;

    .post-image {
      max-height: 360px;
      width: auto;
    }
  }
`;

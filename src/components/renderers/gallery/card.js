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
            <div className="post-image" key={x}>
              <img src={x} alt="" loading="lazy" />
            </div>
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
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;

    .post-image {
      flex-basis: calc(100% / 3);
      max-height: 240px;

      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
  }
`;

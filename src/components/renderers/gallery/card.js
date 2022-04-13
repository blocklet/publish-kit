import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PostCard from '../base';
import Markdown from '../../markdown';

export default function GalleryCard({ post }) {
  return (
    <Div>
      <PostCard post={post}>
        {!!post.body.description && (
          <div className="post-description">
            <Markdown source={post.body.description} />
          </div>
        )}
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
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .post-image {
      flex-basis: calc(100% / 3 - 8px);
      max-height: 240px;
      margin-right: 8px;
      text-align: left;

      &:last-of-type {
        margin-right: 0;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
  }
`;

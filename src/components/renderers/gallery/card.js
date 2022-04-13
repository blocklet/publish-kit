/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import { LazyImage } from 'react-lazy-images';
import 'react-image-lightbox/style.css';

import PostCard from '../base';
import Markdown from '../../markdown';

export default function GalleryCard({ post }) {
  const { images } = post.body;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

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
            <div className="post-image" key={x} onClick={() => setOpen(true)}>
              <LazyImage
                src={x}
                alt=""
                placeholder={({ imageProps, ref }) => (
                  <img ref={ref} src="/images/placeholder.png" className="placeholder" alt={imageProps.alt} />
                )}
                actual={({ imageProps }) => <img className="actual" {...imageProps} />}
              />
            </div>
          ))}
        </div>
      </PostCard>
      {open && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          prevSrc={images[(index + images.length - 1) % images.length]}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() => setIndex((index + images.length - 1) % images.length)}
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )}
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
      cursor: pointer;

      &:last-of-type {
        margin-right: 0;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }

      .placeholder {
        opacity: 0.3;
      }
    }
  }
`;

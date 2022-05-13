/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import slugify from 'slugify';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import IconButton from '@mui/material/IconButton';
import IconDelete from '@mui/icons-material/CloseOutlined';
import IconAdd from '@mui/icons-material/Add';

import { usePostContext } from '../../contexts/post';

import uploader from '../uploader';

const MAX_GALLERY_SIZE = 3;

export default function GalleryEditor({ onChange }) {
  const suffix = slugify(window.blocklet.prefix); // use prefix here to avoid conflict
  const { events } = usePostContext();
  const [images, setImages] = useLocalStorage(`draft.gallery.images.${suffix}`, []);
  const [description, setDescription] = useLocalStorage(`draft.gallery.description.${suffix}`, '');

  useEffect(() => {
    onChange('images', images);
    onChange('description', description);
  }, [images, description]);

  events.on('post.published', (post) => {
    if (post.type === 'gallery') {
      setImages([]);
      setDescription('');
    }
  });

  const handleDescription = (e) => setDescription(e.target.value);
  const handleDelete = (x) => setImages(images.filter((i) => i !== x));
  const handleAdd = () => {
    uploader.on('upload', (url) => setImages([...images, url]));
    uploader.open();
  };

  return (
    <Div>
      <div className="upload-preview">
        {images.map((x) => (
          <div className="preview-image" key={x}>
            <img alt="preview" src={x} loading="lazy" />
            <IconButton className="preview-remove" onClick={() => handleDelete(x)} size="small">
              <IconDelete fontSize="small" />
            </IconButton>
          </div>
        ))}
        {images.length < MAX_GALLERY_SIZE && (
          <div className="preview-image">
            <div className="upload-placeholder">
              <div className="placeholder-image" />
              <IconButton onClick={handleAdd} color="secondary" size="medium" className="placeholder-button">
                <IconAdd style={{ fontSize: 64 }} />
              </IconButton>
            </div>
          </div>
        )}
      </div>
      <div className="upload-footer">
        <input
          type="text"
          placeholder="Describe the gallery with a few words"
          value={description}
          onChange={handleDescription}
        />
      </div>
    </Div>
  );
}

GalleryEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

GalleryEditor.canPublish = (body) => {
  if (!body.images.length) {
    return 'gallery images can not be empty';
  }

  return true;
};

const Div = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 5px;

  .upload-preview {
    margin: 8px 8px 6px;
    display: flex;
    flex-wrap: wrap;

    .preview-image {
      position: relative;
      flex-basis: calc(100% / 3);
      max-height: 247px;
      text-align: center;

      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }

      .preview-remove {
        cursor: pointer;
        position: absolute;
        top: 4px;
        right: 4px;
      }
    }

    .upload-placeholder {
      position: relative;
      height: 247px;

      .placeholder-image {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-size: 50%;
        background-repeat: no-repeat;
        background-image: url(./images/splash.png);
        background-position: center;
        opacity: 0.3;
      }

      .placeholder-button {
        transform: translate(-60%, -60%);
        position: absolute;
        left: 50%;
        top: 50%;
      }
    }
  }

  .upload-footer {
    display: flex;
    margin: 8px 0 0;
    justify-content: space-between;
    align-items: center;

    input {
      flex: 1;
      border-radius: 0 0 5px 5px;
      border: 0;
      border-top: 1px solid #ced4da;
      font-size: 16px;
      width: 100%;
      padding: 8px;

      &:focus {
        outline: none;
      }
    }
  }

  .upload-controls {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

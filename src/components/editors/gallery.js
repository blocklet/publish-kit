/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import IconDelete from '@material-ui/icons/CloseOutlined';
import IconAdd from '@material-ui/icons/Add';

import uploader from '../uploader';

const MAX_GALLERY_SIZE = 3;

export default function GalleryEditor({ onChange, body }) {
  const [images, setImages] = useState(body.images || []);
  const [description, setDescription] = useState('');

  useEffect(() => {
    onChange('images', images);
  }, [images]);

  const handleDelete = (x) => setImages(images.filter((i) => i !== x));
  const handleAdd = () => {
    uploader.on('upload', (url) => setImages([...images, url]));
    uploader.open();
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    onChange('description', e.target.value);
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
              <IconButton onClick={handleAdd} color="secondary" size="large" className="placeholder-button">
                <IconAdd fontSize="large" />
              </IconButton>
            </div>
          </div>
        )}
      </div>
      <div className="upload-footer">
        <label htmlFor="upload-description">Description</label>
        <input
          type="text"
          id="upload-description"
          placeholder="Describe the images"
          value={description}
          onChange={handleDescription}
        />
      </div>
    </Div>
  );
}

GalleryEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  body: PropTypes.object.isRequired,
};

GalleryEditor.canPublish = (body) => body.images && body.images.length > 0;

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
      max-height: 200px;
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
      height: 200px;

      .placeholder-image {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-size: 50%;
        background-repeat: no-repeat;
        background-image: url(/images/splash.png);
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
    margin: 0 8px 8px;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 14px;
      margin-right: 8px;
    }

    input {
      flex: 1;
      border-radius: 4px;
      border: 1px solid #ced4da;
      font-size: 14px;
      width: 100%;
      padding: 4px 8px;

      &:focus {
        border: 1px solid #ced4da;
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

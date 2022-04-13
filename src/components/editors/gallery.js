import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Button from '@arcblock/ux/lib/Button';
import ConfirmDialog from '@arcblock/ux/lib/Dialog/confirm';

import uploader from '../uploader';

const MAX_GALLERY_SIZE = 3;

export default function GalleryEditor({ onChange, body }) {
  const [images, setImages] = useState(body.images || []);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    onChange('images', images);
  }, [images]);

  const handleOpen = () => {
    uploader.on('upload', (url) => setImages([...images, url]));
    uploader.open();
  };

  const handleDescription = () => {
    onChange('description', description);
    setOpen(false);
  };

  return (
    <Div>
      {!!images.length && (
        <div className="upload-preview">
          {images.map((x) => (
            <div className="preview-image" key={x}>
              <img alt="preview" src={x} loading="lazy" />
            </div>
          ))}
        </div>
      )}
      {!images.length && (
        <div className="upload-placeholder">
          <div className="image-regular" />
        </div>
      )}
      <div className="upload-controls">
        <Button onClick={() => setOpen(true)} variant="outlined" color="secondary" size="small">
          Add Description
        </Button>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          size="small"
          disabled={images.length >= MAX_GALLERY_SIZE}>
          Upload Image
        </Button>
      </div>
      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDescription}
        title="Add Description"
        style={{ minWidth: 480 }}>
        <TextField
          fullWidth
          variant="outlined"
          margin="none"
          placeholder="Image description"
          label=""
          onChange={(e) => setDescription(e.target.value)}
        />
      </ConfirmDialog>
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

  .upload-placeholder {
    position: relative;
    text-align: center;
    width: 250px;
    height: 204px;
    margin: 0 auto;
    .image-regular {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-size: 70%;
      background-repeat: no-repeat;
      background-image: url(/images/splash-image.png);
      background-position: center;
      opacity: 0.3;
    }
  }

  .upload-preview {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    .preview-image {
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

  .upload-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;

    button {
      margin-right: 8px;
    }
  }
`;

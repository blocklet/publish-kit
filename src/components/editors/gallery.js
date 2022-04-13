import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Button from '@arcblock/ux/lib/Button';
import ConfirmDialog from '@arcblock/ux/lib/Dialog/confirm';

import uploader from '../uploader';

const MAX_GALLERY_SIZE = 9;

export default function GalleryEditor({ onChange }) {
  const [images, setImages] = useState([]);
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
      <div className="upload-header">
        {!!images.length && (
          <div className="preview-image">
            {images.map((x) => (
              <img key={x} alt="preview" src={x} />
            ))}
          </div>
        )}
        {!images.length && (
          <div className="upload-placeholder">
            <div className="image-regular" />
          </div>
        )}
      </div>
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
};

GalleryEditor.canPublish = (body) => body.images && body.images.length > 0;

const Div = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 5px;

  .upload-header {
    text-align: center;
    color: #070c16;

    .upload-placeholder {
      position: relative;
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

    .preview-image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 250px;
      height: 200px;
      margin: 0 auto;

      img {
        width: auto;
        height: auto;
        max-width: 250px;
        max-height: 200px;
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

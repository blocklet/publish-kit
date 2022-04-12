import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import IconStatus from '@material-ui/icons/Twitter';
import IconPost from '@material-ui/icons/PostAddOutlined';
import IconGallery from '@material-ui/icons/InsertPhotoOutlined';
import IconPoll from '@material-ui/icons/PollOutlined';
import Button from '@arcblock/ux/lib/Button';

import StatusEditor from './status';
import BlogEditor from './blog';
import GalleryEditor from './gallery';

export default function Editor() {
  const [type, setType] = useState('status');
  const editors = {
    status: <StatusEditor />,
    blog: <BlogEditor />,
    gallery: <GalleryEditor />,
  };

  const createTypeHandler = (t) => () => {
    setType(t);
  };

  const isDisabled = (t) => type === t;

  const handlePublish = () => {};

  return (
    <Div>
      <div className="editor-wrapper">{editors[type]}</div>
      <div className="editor-control">
        <div className="editor-icons">
          <IconButton
            onClick={createTypeHandler('status')}
            className="editor-button"
            size="small"
            disabled={isDisabled('status')}
            disableRipple>
            <IconStatus className="editor-icon editor-icon-status" />
          </IconButton>
          <IconButton
            onClick={createTypeHandler('blog')}
            className="editor-button"
            size="small"
            disabled={isDisabled('blog')}
            disableRipple>
            <IconPost className="editor-icon editor-icon-blog" />
          </IconButton>
          <IconButton
            onClick={createTypeHandler('gallery')}
            className="editor-button"
            size="small"
            disabled={isDisabled('gallery')}
            disableRipple>
            <IconGallery className="editor-icon editor-icon-gallery" />
          </IconButton>
          <IconButton className="editor-button" size="small" disabled disableRipple>
            <IconPoll className="editor-icon editor-icon-poll" />
          </IconButton>
        </div>
        <Button color="primary" variant="contained" size="small" onClick={handlePublish}>
          Publish
        </Button>
      </div>
    </Div>
  );
}

const Div = styled.div`
  margin-bottom: 24px;

  .editor-control {
    padding: 8px 0;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .editor-button {
      margin-right: 8px;
    }

    .editor-icon {
      color: ${(props) => props.theme.palette.primary.main};
    }

    .Mui-disabled {
      .editor-icon {
        color: #999;
      }
    }
  }
`;

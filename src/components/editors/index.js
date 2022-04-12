/* eslint-disable no-console */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import IconStatus from '@material-ui/icons/Twitter';
import IconPost from '@material-ui/icons/SubjectOutlined';
import IconGallery from '@material-ui/icons/InsertPhotoOutlined';
import IconPoll from '@material-ui/icons/PollOutlined';
import Button from '@arcblock/ux/lib/Button';

import StatusEditor from './status';
import BlogEditor from './blog';
import GalleryEditor from './gallery';
import PostPermission from './permission';

export default function Editor() {
  const [type, setType] = useState('status');
  const [permission, setPermission] = useState('public');
  const [body, setBody] = useState({});

  const createTypeHandler = (t) => () => {
    setType(t);
  };

  const isDisabled = (t) => type === t;

  const handlePublish = () => {};
  const handleEditorChange = (key, value) => {
    setBody({ ...body, [key]: value });
  };

  console.log({ body, permission });

  const editors = {
    status: <StatusEditor onChange={handleEditorChange} />,
    blog: <BlogEditor onChange={handleEditorChange} />,
    gallery: <GalleryEditor onChange={handleEditorChange} />,
  };

  return (
    <Div>
      <div className="editor-wrapper">{editors[type]}</div>
      <div className="editor-control">
        <div className="editor-icons">
          <Tooltip title="Post a status">
            <IconButton
              onClick={createTypeHandler('status')}
              className="editor-button"
              size="small"
              disabled={isDisabled('status')}
              disableRipple>
              <IconStatus className="editor-icon editor-icon-status" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Post a blog">
            <IconButton
              onClick={createTypeHandler('blog')}
              className="editor-button"
              size="small"
              disabled={isDisabled('blog')}
              disableRipple>
              <IconPost className="editor-icon editor-icon-blog" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Post image and photos">
            <IconButton
              onClick={createTypeHandler('gallery')}
              className="editor-button"
              size="small"
              disabled={isDisabled('gallery')}
              disableRipple>
              <IconGallery className="editor-icon editor-icon-gallery" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Coming soon">
            <IconButton className="editor-button" size="small" disabled disableRipple>
              <IconPoll className="editor-icon editor-icon-poll" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="publish-control">
          <PostPermission onChange={setPermission} initialValue={permission} />
          <Button color="primary" variant="contained" size="small" onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  margin-bottom: 12px;

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

    .publish-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

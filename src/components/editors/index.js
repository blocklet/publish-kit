import React, { useState } from 'react';
import get from 'lodash/get';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import IconStatus from '@material-ui/icons/Twitter';
import IconPost from '@material-ui/icons/SubjectOutlined';
import IconGallery from '@material-ui/icons/InsertPhotoOutlined';
import IconPoll from '@material-ui/icons/PollOutlined';
import Button from '@arcblock/ux/lib/Button';
import Spinner from '@arcblock/ux/lib/Spinner';

import StatusEditor from './status';
import BlogEditor from './blog';
import GalleryEditor from './gallery';
import PostPermission from './permission';

import { usePostContext } from '../../contexts/post';
import { useSessionContext } from '../../contexts/session';

import api from '../../libs/api';

const Editors = {
  status: StatusEditor,
  blog: BlogEditor,
  gallery: GalleryEditor,
};

export default function Editor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useLocalStorage('post-type', 'status');
  const [permission, setPermission] = useLocalStorage(`post-permission-${type}`, 'public');
  const [body, setBody] = useLocalStorage(`post-body-${type}`, {});
  const { prependPost } = usePostContext();
  const { session } = useSessionContext();

  const createTypeHandler = (t) => () => {
    if (t !== type) {
      setType(t);
      setBody({});
    }
  };

  const getBtnDisabled = (t) => type === t;
  const getBtnClass = (t) => (type === t ? 'editor-button editor-button-active' : 'editor-button');

  const handlePublish = async () => {
    if (!session.user) {
      session.login();
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/posts', { type, permission, body });
      setBody({});
      prependPost(data);
    } catch (err) {
      setError(get(err, 'response.data.error', err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (key, value) => {
    setError('');
    setBody({ ...body, [key]: value });
  };

  const EditorComponent = Editors[type];
  const canPublish = Editors[type].canPublish(body);

  return (
    <Div>
      <div className="editor-wrapper">
        <EditorComponent body={body} onChange={handleEditorChange} />
      </div>
      <div className="editor-control">
        <div className="editor-icons">
          <Tooltip title="Post a status">
            <span>
              <IconButton
                onClick={createTypeHandler('status')}
                className={getBtnClass('status')}
                size="small"
                disabled={getBtnDisabled('status')}
                disableRipple>
                <IconStatus className="editor-icon editor-icon-status" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Post a blog">
            <span>
              <IconButton
                onClick={createTypeHandler('blog')}
                className={getBtnClass('blog')}
                size="small"
                disabled={getBtnDisabled('blog')}
                disableRipple>
                <IconPost className="editor-icon editor-icon-blog" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Post image and photos">
            <span>
              <IconButton
                onClick={createTypeHandler('gallery')}
                className={getBtnClass('gallery')}
                size="small"
                disabled={getBtnDisabled('gallery')}
                disableRipple>
                <IconGallery className="editor-icon editor-icon-gallery" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Coming soon">
            <span>
              <IconButton className={getBtnClass('poll')} size="small" disabled disableRipple>
                <IconPoll className="editor-icon editor-icon-poll" />
              </IconButton>
            </span>
          </Tooltip>
        </div>
        {!!error && <div className="editor-error">{error}</div>}
        <div className="publish-control">
          <PostPermission onChange={setPermission} initialValue={permission} />
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={handlePublish}
            disabled={loading || canPublish === false}>
            {loading ? <Spinner size="small" /> : null}
            {session.user ? 'Publish' : 'Connect'}
          </Button>
        </div>
      </div>
    </Div>
  );
}

Editor.propTypes = {};

Editor.defaultProps = {};

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
      .editor-icon {
        color: #999;
      }
    }

    .editor-button-active {
      .editor-icon {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }

    .publish-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .editor-error {
    color: red;
  }
`;

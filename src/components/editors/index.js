import React, { useState, useRef, useEffect } from 'react';
import get from 'lodash/get';
import slugify from 'slugify';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import IconStatus from '@material-ui/icons/Twitter';
import IconPost from '@material-ui/icons/SubjectOutlined';
import IconGallery from '@material-ui/icons/InsertPhotoOutlined';
import Button from '@arcblock/ux/lib/Button';
import Spinner from '@arcblock/ux/lib/Spinner';

import StatusEditor from './status';
import BlogEditor from './blog';
import GalleryEditor from './gallery';
import PostPermission from '../post/permission';

import { usePostContext } from '../../contexts/post';
import { useSessionContext } from '../../contexts/session';

import api from '../../libs/api';

const SUPPORTED_CONTENT_TYPES = ['status', 'gallery', 'blog'];
const ENABLED_CONTENT_TYPES = window.blocklet.CONTENT_TYPES.split(',')
  .map((x) => x.trim())
  .filter((x) => SUPPORTED_CONTENT_TYPES.includes(x));

export default function ContentEditor() {
  const suffix = slugify(window.blocklet.prefix); // use prefix here to avoid conflict
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useLocalStorage(`post-type-${suffix}`, ENABLED_CONTENT_TYPES[0]);
  const [permission, setPermission] = useLocalStorage(`post-permission-${suffix}-${type}`, 'public');
  const { prependPost } = usePostContext();
  const { session } = useSessionContext();
  const body = useRef({});

  // fallback to first if we changed enabled types
  useEffect(() => {
    if (ENABLED_CONTENT_TYPES.includes(type) === false) {
      setType(ENABLED_CONTENT_TYPES[0]);
    }
  }, []);

  const createTypeHandler = (t) => () => {
    if (t !== type) {
      setType(t);
    }
  };

  const getBtnDisabled = (t) => type === t;
  const getBtnClass = (t) => (type === t ? 'editor-button editor-button-active' : 'editor-button');

  const editors = [
    { name: 'status', Editor: StatusEditor, Icon: IconStatus },
    { name: 'blog', Editor: BlogEditor, Icon: IconPost },
    { name: 'gallery', Editor: GalleryEditor, Icon: IconGallery },
  ].filter((x) => ENABLED_CONTENT_TYPES.includes(x.name));

  const { Editor } = editors.find((x) => x.name === type);

  const handlePublish = async () => {
    const canPublish = Editor.canPublish(body.current);
    if (typeof canPublish === 'string') {
      setError(canPublish);
      setTimeout(() => setError(''), 3000);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/posts', { type, permission, body: body.current });
      prependPost(data);
    } catch (err) {
      setError(get(err, 'response.data.error', err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (key, value) => {
    setError('');
    body.current[key] = value;
  };

  if (!session.user) {
    return null;
  }

  return (
    <Div>
      <div className="editor-wrapper">
        <Editor onChange={handleEditorChange} />
      </div>
      <div className="editor-control">
        <div className="editor-icons">
          {editors.length > 1 &&
            editors.map(({ name, Icon }) => (
              <Tooltip title={`Post a ${name}`} key={name}>
                <span>
                  <IconButton
                    onClick={createTypeHandler(name)}
                    className={getBtnClass(name)}
                    size="small"
                    disabled={getBtnDisabled(name)}
                    disableRipple>
                    <Icon className={`editor-icon editor-icon-${name}`} />
                  </IconButton>
                </span>
              </Tooltip>
            ))}
        </div>
        {!!error && <div className="editor-error">{error}</div>}
        <div className="publish-control">
          <PostPermission onChange={setPermission} initialValue={permission} />
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={handlePublish}
            disabled={loading}>
            {loading ? <Spinner size="small" /> : null}
            Publish {type}
          </Button>
        </div>
      </div>
    </Div>
  );
}

ContentEditor.propTypes = {};

ContentEditor.defaultProps = {};

const Div = styled.div`
  margin-bottom: 16px;

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
    color: #f16e6e;
  }
`;

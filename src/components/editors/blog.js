/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

export default function BlogEditor({ onChange, body }) {
  const [height] = useLocalStorage('post-height', 264);
  const [value, setValue] = useState(body.content || "**What's happening?**");
  const [title, setTitle] = useState('');

  useEffect(() => {
    onChange('content', value);
  }, [value]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
    onChange('title', e.target.value);
  };

  return (
    <Div>
      <div className="blog-editor">
        <MDEditor
          value={value}
          onChange={setValue}
          preview="edit"
          height={height}
          textareaProps={{}}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
      <div className="blog-footer">
        <input type="text" placeholder="Summary the blog with a few words" value={title} onChange={handleTitle} />
      </div>
    </Div>
  );
}

BlogEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  body: PropTypes.object.isRequired,
};

BlogEditor.canPublish = (body) => !!body.content && !!body.title;

const Div = styled.div`
  .blog-editor {
    margin: 0 1px;

    .w-md-editor-aree {
      border-radius: 0 !important;
    }

    .w-md-editor-content {
      border-radius: 0 !important;
    }
  }

  .blog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    input {
      width: 100%;
      border: 1px solid #ced4da;
      border-radius: 0 0 5px 5px;
      box-sizing: border-box;
      padding: 8px;
      font-size: 16px;

      &:focus {
        outline: none;
      }
    }
  }
`;

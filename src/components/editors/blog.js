/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import slugify from 'slugify';
import PropTypes from 'prop-types';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import MDPreview from '@uiw/react-markdown-preview';
import trimHtml from 'trim-html';

import { usePostContext } from '../../contexts/post';

const DEFAULT_CONTENT = "**What's happening?**";

export default function BlogEditor({ onChange }) {
  const suffix = slugify(window.blocklet.prefix); // use prefix here to avoid conflict
  const { events } = usePostContext();
  const [height, setHeight] = useLocalStorage(`post-height-${suffix}`, 264);
  const [content, setContent] = useLocalStorage(`draft.blog.content.${suffix}`, DEFAULT_CONTENT);
  // const [excerpt, setExcerpt] = useLocalStorage(`draft.blog.excerpt.${suffix}`, '');
  const [title, setTitle] = useLocalStorage(`draft.blog.title.${suffix}`, '');

  useEffect(() => {
    onChange('content', content);
    onChange('title', title);
    onChange(
      'excerpt',
      trimHtml(document.getElementById('blog-preview').innerHTML, {
        limit: 100,
        wordBreak: false,
        preserveTags: false,
        suffix: '...',
      }).html
    );
  }, [content, title]);

  events.on('post.published', (post) => {
    if (post.type === 'blog') {
      setContent(DEFAULT_CONTENT);
      setTitle('');
    }
  });

  const handleTitle = (e) => setTitle(e.target.value);
  const handleHeightChange = (newHeight) => setHeight(newHeight);

  return (
    <Div>
      <div className="blog-editor" data-color-mode="light">
        <MDEditor
          value={content}
          onChange={setContent}
          onHeightChange={handleHeightChange}
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
      <div style={{ display: 'none' }} id="blog-preview">
        <MDPreview source={content} />
      </div>
    </Div>
  );
}

BlogEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

BlogEditor.canPublish = (body) => {
  if (!body.title.trim()) {
    return 'blog title can not be empty';
  }

  if (!body.content.trim()) {
    return 'blog content can not be empty';
  }

  return true;
};

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

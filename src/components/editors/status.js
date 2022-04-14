import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { usePostContext } from '../../contexts/post';

export default function StatusEditor({ onChange }) {
  const { events } = usePostContext();
  const [content, setContent] = useLocalStorage('draft.status.content', '');

  useEffect(() => {
    onChange('content', content);
  }, [content]);

  events.on('post.published', (post) => {
    if (post.type === 'status') {
      setContent('');
    }
  });

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <Div>
      <textarea value={content} className="textarea" onChange={handleChange} placeholder="What's happening?" />
    </Div>
  );
}

StatusEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

StatusEditor.canPublish = (body) => {
  if (!body.content.trim()) {
    return 'status content can not be empty';
  }

  return true;
};

const Div = styled.div`
  position: relative;

  .textarea {
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    border-color: ${(props) => props.theme.palette.primary.main};
    font-family: ${(props) => props.theme.typography.fontFamily};
    height: 90px;
    width: 100%;
    resize: none;
    outline: none;
  }

  .textarea::placeholder {
    color: darkgray;
    opacity: 0.7;
  }
`;

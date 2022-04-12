import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function StatusEditor({ onChange, body }) {
  return (
    <Div>
      <textarea
        value={body.content || ''}
        className="textarea"
        onChange={(e) => onChange('content', e.target.value)}
        placeholder="What's happening?"
      />
    </Div>
  );
}

StatusEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  body: PropTypes.object.isRequired,
};

StatusEditor.canPublish = (body) => !!body.content;

const Div = styled.div`
  position: relative;

  .textarea {
    font-size: 1rem;
    font-weight: bold;
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

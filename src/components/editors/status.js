import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function StatusEditor({ onChange }) {
  return (
    <Div>
      <textarea
        className="textarea"
        onChange={(e) => onChange('content', e.target.value)}
        placeholder="What's happening?"
      />
    </Div>
  );
}

StatusEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const Div = styled.div`
  position: relative;

  .textarea {
    font-size: 1rem;
    padding: 1rem;
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

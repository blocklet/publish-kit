import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';

export default function StatusEditor({ onChange }) {
  const [value, setValue] = useLocalStorage('draft.status.content', '');

  useEffect(() => {
    onChange('content', value);
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Div>
      <textarea value={value} className="textarea" onChange={handleChange} placeholder="What's happening?" />
    </Div>
  );
}

StatusEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

StatusEditor.canPublish = (body) => !!body.content;

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

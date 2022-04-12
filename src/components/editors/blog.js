import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

export default function BlogEditor({ onChange }) {
  const [value, setValue] = useState("**What's happening?**");

  useEffect(() => {
    onChange('content', value);
  }, [value]);

  return (
    <Div>
      <MDEditor value={value} onChange={setValue} preview="edit" />
    </Div>
  );
}

BlogEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const Div = styled.div`
  .w-md-editor-toolbar {
    border-color: #eff3f4 !important;
  }
`;

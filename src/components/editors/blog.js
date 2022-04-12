import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

export default function BlogEditor() {
  const [value, setValue] = useState("**What's happening?**");
  return (
    <Div>
      <MDEditor value={value} onChange={setValue} preview="edit" />
    </Div>
  );
}

const Div = styled.div`
  .w-md-editor-toolbar {
    border-color: #eff3f4 !important;
  }
`;

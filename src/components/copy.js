/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Copy from 'copy-to-clipboard';

import styled from 'styled-components';

export default function ClickToCopy({ content }) {
  const [copied, setCopied] = useState(false);
  const childrenRef = React.createRef();

  const onCopy = () => {
    Copy(content);
    setCopied(true);
  };

  useEffect(() => {
    let timer = null;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });

  return (
    <Container ref={childrenRef} component="span" onClick={() => onCopy(childrenRef)}>
      {copied ? 'Copied' : 'Copy'}
    </Container>
  );
}

const Container = styled.div`
  display: inline;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  align-items: center;
  justify-content: start;
  background-color: rgba(0, 0, 0, 0.08);
  cursor: pointer;
`;

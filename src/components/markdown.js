import React from 'react';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import styled from 'styled-components';

export default function Markdown({ source }) {
  return (
    <Div>
      <MDEditor.Markdown source={source} linkTarget="_blank" rehypePlugins={[[rehypeSanitize]]} />
    </Div>
  );
}

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

const Div = styled.div`
  .wmde-markdown {
  }
`;

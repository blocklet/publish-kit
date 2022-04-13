import React from 'react';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

export default function Markdown({ source }) {
  return <MDEditor.Markdown source={source} linkTarget="_blank" rehypePlugins={[[rehypeSanitize]]} />;
}

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

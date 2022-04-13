import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

export default function BlogEditor({ onChange, body }) {
  const [value, setValue] = useState(body.content || "**What's happening?**");

  useEffect(() => {
    onChange('content', value);
  }, [value]);

  return (
    <Div>
      <MDEditor
        value={value}
        onChange={setValue}
        preview="edit"
        textareaProps={{}}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </Div>
  );
}

BlogEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  body: PropTypes.object.isRequired,
};

BlogEditor.canPublish = (body) => !!body.content;

const Div = styled.div`
  .w-md-editor-toolbar {
    border-color: #eff3f4 !important;
  }
`;

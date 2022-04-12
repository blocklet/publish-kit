import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// import Uploader from '../components/uploader';

export default function GalleryEditor() {
  return <Div>Gallery Editor goes here</Div>;
}

GalleryEditor.canPublish = (body) => !!body.content;

const Div = styled.div``;

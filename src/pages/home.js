/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

import Editor from '../components/editors';
import Feeds from '../components/feeds';

import { PostProvider } from '../contexts/post';

const Home = () => {
  return (
    <Div>
      <PostProvider>
        <Editor />
        <Feeds />
      </PostProvider>
    </Div>
  );
};

const Div = styled.div``;

export default Home;

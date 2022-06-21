/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

import Editor from '../components/editors';
import Feeds from '../components/feeds';

import { PostProvider } from '../contexts/post';
import { useSessionContext } from '../contexts/session';

const Home = () => {
  const { session } = useSessionContext();

  return (
    <Div>
      <PostProvider pageSize={10}>
        {(session.user.role === 'owner' || session.user.role === 'admin') && <Editor />}
        <Feeds />
      </PostProvider>
    </Div>
  );
};

const Div = styled.div``;

export default Home;

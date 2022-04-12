/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

import { useSessionContext } from '../contexts/session';
import Editor from '../components/editors';
import Feeds from '../components/feeds';

const Home = () => {
  const { session } = useSessionContext();

  return (
    <Div>
      <Editor disabled={!session} />
      <Feeds />
    </Div>
  );
};

const Div = styled.div``;

export default Home;

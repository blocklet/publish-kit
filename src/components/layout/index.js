import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SessionManager from '@arcblock/did-connect/lib/SessionManager';

import BaseLayout from './base';
import { useSessionContext } from '../../contexts/session';

export default function Layout({ children }) {
  const { session } = useSessionContext();
  const onLogout = () => window.location.reload();

  const links = [
    {
      url: '/history',
      title: 'History',
      name: 'history',
    },
  ];

  return (
    <BaseLayout
      title="Home"
      brand={window.blocklet.appName}
      addons={<SessionManager session={session} onLogout={onLogout} size={24} />}
      links={session.user ? links : []}
      variant="border"
      logo={<img src={window.blocklet.appLogo} alt="logo" style={{ width: 36, height: 36 }} />}
      style={{ width: '100%' }}>
      <Div>{children}</Div>
    </BaseLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Div = styled.div`
  width: 100%;
  margin: 0 auto;
`;

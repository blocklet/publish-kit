import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '@blocklet/ui-react/lib/Header';

import Container from '@mui/material/Container';

export default function Layout({ title, brand, links, logo, addons, baseUrl, homeUrl, children, variant, ...rest }) {
  let activeLink = '';
  const { pathname: currentPath } = new URL(window.location);
  links.forEach((link) => {
    if (currentPath.startsWith(link.url) && link.url.length > activeLink.length) {
      activeLink = link.url;
    }
  });

  return (
    <Div {...rest}>
      <Container maxWidth="md">
        <Header />
      </Container>
      <Container maxWidth="md" style={{ marginTop: 8, flex: 1 }}>
        {children}
      </Container>
    </Div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  brand: PropTypes.any.isRequired,
  addons: PropTypes.any,
  logo: PropTypes.any.isRequired,
  links: PropTypes.array,
  children: PropTypes.any.isRequired,
  baseUrl: PropTypes.string,
  homeUrl: PropTypes.string,
  variant: PropTypes.oneOf(['shadow', 'border']),
};

Layout.defaultProps = {
  baseUrl: '',
  homeUrl: '/',
  links: [],
  variant: 'shadow',
  addons: undefined,
};

const Div = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

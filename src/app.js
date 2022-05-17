import React from 'react';
import get from 'lodash/get';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import theme from './libs/theme';
import { SessionProvider } from './contexts/session';
import Layout from './components/layout';

import Home from './pages/home';
import PostDetail from './pages/posts/detail';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none !important;
  }
  a:hover,
  a:hover * {
    text-decoration: none !important;
  }
  .ReactModal__Overlay--after-open {
    z-index: 2000 !important;
  }
`;

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <SessionProvider serviceHost={get(window, 'blocklet.prefix', '/')}>
            <CssBaseline />
            <GlobalStyle />
            <Layout>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </SessionProvider>
        </StyledThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

const WrappedApp = App;

export default () => {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <WrappedApp />
    </Router>
  );
};

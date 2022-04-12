import React from 'react';
import get from 'lodash/get';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import theme from './libs/theme';
import { SessionProvider } from './contexts/session';
import Layout from './components/layout';

import Home from './pages/home';
import PostDetail from './pages/posts/detail';
import PostHistory from './pages/posts/history';

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
`;

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <SessionProvider serviceHost={get(window, 'blocklet.prefix', '/')}>
          <CssBaseline />
          <GlobalStyle />
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/history" element={<PostHistory />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </MuiThemeProvider>
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

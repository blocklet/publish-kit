import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import OpenInWallet from '@arcblock/ux/lib/Wallet/Open';
import Icon from '@arcblock/ux/lib/Icon';

export default function Layout({ title, brand, links, logo, addons, baseUrl, homeUrl, children, variant, ...rest }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const onToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  let activeLink = '';
  const { pathname: currentPath } = new URL(window.location);
  links.forEach((link) => {
    if (currentPath.startsWith(link.url) && link.url.length > activeLink.length) {
      activeLink = link.url;
    }
  });

  const drawer = (
    <div>
      <Toolbar className="toolbar toolbar--drawer">
        <div className="menu-logo">{logo}</div>
        <div style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{brand}</div>
      </Toolbar>
      <Divider />
      <List>
        {links.map((x) => (
          <Link className="nav-link" key={x.url} href={x.url}>
            <ListItem button className={activeLink === x.url ? 'drawer-highlight-nav' : ''}>
              <ListItemText>
                {x.icon && (
                  <Icon name={x.icon} size={18 * (x.iconZoom || 1)} color="inherit" style={{ marginRight: '5px' }} />
                )}
                {x.title}
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Div {...rest}>
        <AppBar position="fixed" className={`appbar appbar--${variant}`} color="default" style={{ height: 56 }}>
          <Container disableGutters maxWidth="md">
            <Toolbar className="toolbar">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onToggleDrawer}
                className="menu-button">
                <MenuIcon />
              </IconButton>
              <div className="menu-logo">{logo}</div>
              <Typography
                href={homeUrl}
                component="a"
                variant="h5"
                color="inherit"
                noWrap
                display="block"
                className="brand">
                {brand}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <div className="nav-links">
                {links.map((x) => (
                  <Link
                    key={x.url}
                    href={x.url}
                    className={`nav-link ${activeLink === x.url ? 'highlight-nav' : ''}`}
                    color={x.color}>
                    {x.icon && (
                      <Icon
                        name={x.icon}
                        size={20 * (x.iconZoom || 1)}
                        color="inherit"
                        style={{ marginRight: '5px' }}
                      />
                    )}
                    {x.title}
                  </Link>
                ))}
              </div>
              {addons}
            </Toolbar>
          </Container>
        </AppBar>
        <div className="toolbar" />
        <Container maxWidth="md" style={{ marginTop: 16, flex: 1 }}>
          {children}
        </Container>
        {!!baseUrl && <OpenInWallet locale="zh" link={baseUrl} />}
      </Div>
      <DrawerDiv>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={onToggleDrawer}
          classes={{
            paper: 'drawer-paper',
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            disablePortal: true,
          }}>
          {drawer}
        </Drawer>
      </DrawerDiv>
    </>
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

  .MuiAppBar-colorDefault {
    background-color: #fff;
  }

  .appbar {
    &.appbar--border {
      box-shadow: none;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        bottom: -1px;
        display: block;
      }
    }
  }

  .toolbar {
    min-height: 56px;
    background: inherit;
    white-space: nowrap;
    .menu-logo {
      font-size: 0;
      margin-right: 8px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      .nav-link {
        margin: 8px 12px;
        font-size: 16px;
        display: flex;
        align-items: center;
      }

      .highlight-nav {
        font-weight: bolder;
      }
    }
    .brand {
      cursor: pointer;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
    }
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    .toolbar {
      .menu-button {
        display: none;
      }
      .menu-logo {
        & + .brand {
          padding-left: 45px;
          margin-left: -45px;
        }
      }
    }
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    .toolbar {
      .nav-links,
      .menu-logo,
    }
  }
`;

const DrawerDiv = styled.nav`
  width: 240px;
  .drawer-paper {
    width: 240px;
  }
  .toolbar {
    min-height: 56px;
  }

  a:hover,
  a:active,
  a:visited,
  a:focus {
    text-decoration: none;
  }

  .drawer-highlight-nav {
    background-color: #eee;
  }

  .toolbar--drawer {
    font-size: 18px;
    .menu-logo {
      display: inline-flex;
    }
  }
`;

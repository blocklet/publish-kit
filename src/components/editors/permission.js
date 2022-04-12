import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const options = [
  { value: 'public', label: 'Visible to everyone' },
  { value: 'private', label: 'Visible to myself' },
  { value: 'paid', label: 'Visible to paid users' },
];

export default function PostPermission({ onChange, initialValue }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(options.findIndex((x) => x.value === initialValue));

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (e, i) => {
    setSelectedIndex(i);
    onChange(options[i].value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Div>
      <List disablePadding style={{ padding: '0px 12px' }}>
        <ListItem button aria-haspopup="true" aria-controls="lock-menu" onClick={handleClickListItem}>
          <ListItemText secondary={options[selectedIndex].label} />
        </ListItem>
      </List>
      <Menu id="lock-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((x, i) => (
          <MenuItem key={x.value} selected={i === selectedIndex} onClick={(e) => handleMenuItemClick(e, i)}>
            {x.label}
          </MenuItem>
        ))}
      </Menu>
    </Div>
  );
}

PostPermission.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};

PostPermission.defaultProps = {
  initialValue: 'public',
};

const Div = styled.div`
  .MuiListItem-root {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

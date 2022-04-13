import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import IconPrivate from '@material-ui/icons/LockOutlined';
import IconPublic from '@material-ui/icons/PublicOutlined';
import IconPaid from '@material-ui/icons/MonetizationOnOutlined';
import IconMember from '@material-ui/icons/VerifiedUserOutlined';

import Button from '@arcblock/ux/lib/Button';

import { useSessionContext } from '../../contexts/session';

const options = [
  { value: 'public', label: 'Everyone can view this post', short: 'Public', icon: <IconPublic fontSize="small" /> },
  {
    value: 'private',
    label: 'Only myself can view this post',
    short: 'Private',
    icon: <IconPrivate fontSize="small" />,
  },
  { value: 'paid', label: 'Only paid users can view this post', short: 'Paid', icon: <IconPaid fontSize="small" /> },
  {
    value: 'member_only',
    label: 'Only subscribed members can view this post',
    short: 'Subscribed',
    icon: <IconMember fontSize="small" />,
  },
];

export default function PostPermission({ onChange, initialValue, minimal }) {
  const { session } = useSessionContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(options.findIndex((x) => x.value === initialValue));

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (e, i) => {
    setSelected(i);
    onChange(options[i].value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const canChange = session.user && ['owner', 'admin'].includes(session.user.role);

  return (
    <Div>
      {minimal && (
        <span
          className="post-action menu-trigger"
          aria-haspopup="true"
          aria-controls="permission-menu"
          onClick={handleClickListItem}>
          {options[selected].icon}
        </span>
      )}
      {!minimal && (
        <Button
          size="small"
          aria-haspopup="true"
          aria-controls="permission-menu"
          className="post-action menu-trigger"
          disabled={!canChange}
          onClick={handleClickListItem}>
          {options[selected].icon}
          {options[selected].short}
        </Button>
      )}
      <Menu id="permission-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((x, i) => (
          <MenuItem key={x.value} selected={i === selected} onClick={(e) => handleMenuItemClick(e, i)}>
            <ListItemIcon style={{ minWidth: 30 }}>{x.icon}</ListItemIcon>
            <ListItemText style={{ padding: 0, margin: 0 }} primary={x.short} secondary={x.label} />
          </MenuItem>
        ))}
      </Menu>
    </Div>
  );
}

PostPermission.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  minimal: PropTypes.bool,
};

PostPermission.defaultProps = {
  initialValue: 'public',
  minimal: false,
};

const Div = styled.div`
  .menu-trigger {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.54);
  }
`;

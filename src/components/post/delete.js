import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconDelete from '@material-ui/icons/DeleteOutlineOutlined';
import ConfirmDialog from '@arcblock/ux/lib/Dialog/confirm';

import { useSessionContext } from '../../contexts/session';
import { usePostContext } from '../../contexts/post';

import api from '../../libs/api';

export default function PostDelete({ post }) {
  const [open, setOpen] = useState(false);
  const { session } = useSessionContext();
  const { deletePost } = usePostContext();
  const canChange = session.user && ['owner', 'admin'].includes(session.user.role);
  if (!canChange) {
    return null;
  }

  const onDelete = async () => {
    await api.delete(`/api/posts/${post._id}`);
    deletePost(post._id);
    setOpen(false);
  };

  return (
    <Div>
      <span className="post-action" onClick={() => setOpen(true)}>
        <IconDelete fontSize="small" />
      </span>
      <ConfirmDialog open={open} onCancel={() => setOpen(false)} onConfirm={onDelete} title="Warning">
        Delete this post?
      </ConfirmDialog>
    </Div>
  );
}

PostDelete.propTypes = {
  post: PropTypes.object.isRequired,
};

const Div = styled.div`
  .post-action {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.54);
  }
`;

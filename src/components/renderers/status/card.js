import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format } from 'timeago.js';

import DidAvatar from '@arcblock/did-connect/lib/Avatar';

import PostPermission from '../../post/permission';
import PostDelete from '../../post/delete';

import { useSessionContext } from '../../../contexts/session';

import api from '../../../libs/api';

export default function StatusCard({ post }) {
  const { session } = useSessionContext();
  const did = session && session.user && session.user.did ? session.user.did : '';
  const name = did === post.createdBy ? session.user.fullName : post.author;

  const onChangePermission = async (permission) => {
    if (permission === post.permission) {
      return;
    }

    await api.put(`/api/posts/${post._id}`, { permission });
  };

  return (
    <Div>
      <div className="status-header">
        <div className="status-avatar">
          <DidAvatar variant="circle" did={post.createdBy} size={32} shape="circle" />
        </div>
        <div className="status-meta">
          <span>{name}</span>
          <span>· {format(post.createdAt)}</span>
        </div>
      </div>
      <div className="status-content">{post.body.content}</div>
      <div className="status-actions">
        <PostPermission onChange={onChangePermission} initialValue={post.permission} minimal />
        <PostDelete post={post} />
      </div>
    </Div>
  );
}

StatusCard.propTypes = {
  post: PropTypes.object.isRequired,
};

const Div = styled.div`
  background: #fff;
  margin: 0 auto;
  border-radius: 3px;
  padding: 24px 0 12px;
  border-bottom: 1px solid #e6ecf0;

  .status-header {
    display: flex;
    align-items: center;
    font-size: 14px;

    .status-avatar {
      width: 32px;
      height: 32px;
    }

    .status-meta {
      font-weight: bold;
      margin-left: 8px;
    }

    .status-meta span {
      color: #657786;
      font-weight: normal;
      margin-right: 8px;
    }
  }
  .status-content {
    padding-left: 40px;
    font-size: 1rem;
    font-weight: normal;
    margin-top: 8px;
    margin-bottom: 8px;

    img {
      width: 100%;
      max-width: 360px;
    }
  }

  .status-actions {
    display: flex;
    margin-left: 40px;
    margin-top: 16px;
  }
  .status-actions div {
    display: flex;
    margin-right: 16px;
  }
  .status-actions div svg {
    color: #657786;
    margin-right: 10px;
  }

  @media screen and (max-width: 430px) {
    .status-header {
    }
    .status-content {
      padding-left: 0;
    }
    .status-actions {
      display: flex;
      margin-left: 0;
    }
  }

  .status-actions div {
    margin-right: 8px;
  }
`;

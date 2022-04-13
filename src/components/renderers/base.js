import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format } from 'timeago.js';

import DidAvatar from '@arcblock/did-connect/lib/Avatar';

import PostPermission from '../post/permission';
import PostDelete from '../post/delete';

import { useSessionContext } from '../../contexts/session';

import api from '../../libs/api';

export default function BaseCard({ post, children }) {
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
      <div className="post-header">
        <div className="post-avatar">
          <DidAvatar variant="circle" did={post.createdBy} size={32} shape="circle" />
        </div>
        <div className="post-meta">
          <span>{name}</span>
          <span>· {format(post.createdAt)}</span>
        </div>
      </div>
      <div className="post-content">{children}</div>
      <div className="post-actions">
        <PostPermission onChange={onChangePermission} initialValue={post.permission} minimal />
        <PostDelete post={post} />
      </div>
    </Div>
  );
}

BaseCard.propTypes = {
  post: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const Div = styled.div`
  padding: 24px 0 12px;
  border-bottom: 1px solid #e6ecf0;

  .post-header {
    display: flex;
    align-items: center;
    font-size: 14px;

    .post-avatar {
      width: 32px;
      height: 32px;
    }

    .post-meta {
      font-weight: bold;
      margin-left: 8px;
    }

    .post-meta span {
      color: #657786;
      font-weight: normal;
      margin-right: 8px;
    }
  }

  .post-content {
    padding-left: 40px;
    margin-bottom: 8px;
  }

  .post-actions {
    display: flex;
    margin-left: 40px;
    margin-top: 16px;
  }

  .post-action {
    display: flex;
    margin-right: 8px;
  }

  @media screen and (max-width: 430px) {
    .post-header {
    }
    .post-content {
      padding-left: 0;
    }
    .post-actions {
      display: flex;
      margin-left: 0;
    }
  }

  .post-actions div {
    margin-right: 8px;
  }
`;

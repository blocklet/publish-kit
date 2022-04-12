import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format } from 'timeago.js';

import IconLock from '@material-ui/icons/LockOutlined';
import DidAvatar from '@arcblock/did-connect/lib/Avatar';

import { useSessionContext } from '../../../contexts/session';

export default function StatusCard({ post }) {
  const { session } = useSessionContext();
  const did = session && session.user && session.user.did ? session.user.did : '';
  const avatar = did === post.createdBy ? session.user.avatar : null;
  const name = did === post.createdBy ? session.user.fullName : 'Anonymous';
  return (
    <Div>
      <div className="status-header">
        <DidAvatar variant="circle" className="avatar" did={did} src={avatar} size={40} shape="circle" />
        <div className="status-header-info">
          <span>{name}</span>
          <span>· {format(post.createdAt)}</span>
          {post.permission === 'private' && (
            <span title="Private">
              · <IconLock style={{ fontSize: 14 }} />
            </span>
          )}
          <p>{post.body.content}</p>
        </div>
      </div>
      <div className="status-info-counts">
        <div className="comments">
          <svg
            className="feather feather-message-circle sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <div className="comment-count">33</div>
        </div>

        <div className="retweets">
          <svg
            className="feather feather-repeat sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <div className="retweet-count">397</div>
        </div>
        <div className="likes">
          <svg
            className="feather feather-heart sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <div className="likes-count">2.6k</div>
        </div>
        <div className="message">
          <svg
            className="feather feather-send sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
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
  padding: 24px 0;
  border-bottom: 1px solid #e6ecf0;

  .avatar {
    width: 40px;
    height: 40px;
  }

  img {
    width: 100%;
    max-width: 360px;
  }

  .status-header {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
  }
  .status-header-info {
    font-weight: bold;
    margin-left: 8px;
  }
  .status-header-info span {
    color: #657786;
    font-weight: normal;
    margin-left: 8px;
  }
  .status-header-info p {
    font-size: 1rem;
    font-weight: normal;
    margin-top: 8px;
  }

  .status-img-wrap {
    padding-left: 60px;
  }

  .status-info-counts {
    display: flex;
    margin-left: 60px;
    margin-top: 8px;
    display: none;
  }
  .status-info-counts div {
    display: flex;
    margin-right: 20px;
  }
  .status-info-counts div svg {
    color: #657786;
    margin-right: 10px;
  }

  @media screen and (max-width: 430px) {
    body {
      padding-left: 20px;
      padding-right: 20px;
    }
    .status-header {
      flex-direction: column;
    }
    .status-header img {
      margin-bottom: 20px;
    }
    .status-header-info p {
      margin-bottom: 30px;
    }
    .status-img-wrap {
      padding-left: 0;
    }
    .status-info-counts {
      display: flex;
      margin-left: 0;
    }
  }

  .status-info-counts div {
    margin-right: 10px;
  }
`;

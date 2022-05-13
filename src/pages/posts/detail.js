import React from 'react';
import styled from 'styled-components';
import useAsync from 'react-use/lib/useAsync';
import { useParams } from 'react-router-dom';
import { format } from 'timeago.js';

import DidAvatar from '@arcblock/did-connect/lib/Avatar';
import Spinner from '@arcblock/ux/lib/Spinner';
import Alert from '@arcblock/ux/lib/Alert';
import Typography from '@mui/material/Typography';
import IconInfo from '@mui/icons-material/InfoOutlined';

import Markdown from '../../components/markdown';

import api from '../../libs/api';

export default function PostDetail() {
  const { id } = useParams();
  const post = useAsync(async () => {
    try {
      const { data } = await api.get(`/api/posts/${id}`);
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        throw new Error(err.response.data.error);
      }

      throw err;
    }
  });

  if (post.error) {
    return (
      <Div>
        <Alert variant="icon" type="error">
          <ErrorWrapper>
            <IconInfo style={{ color: '#f16e6e', marginRight: 8 }} />
            {post.error.message}
          </ErrorWrapper>
        </Alert>
      </Div>
    );
  }

  if (!post.value || post.loading) {
    return (
      <Div>
        <Spinner />
      </Div>
    );
  }

  return (
    <Div>
      <Typography component="h2" variant="h2" className="post-title">
        {post.value.body.title}
      </Typography>
      <div className="post-header">
        <div className="post-avatar">
          <DidAvatar variant="circle" did={post.value.createdBy} size={32} shape="circle" />
        </div>
        <div className="post-meta">
          <span>{post.value.author}</span>
          <span>· {format(post.value.createdAt)}</span>
        </div>
      </div>
      <div className="post-content">
        <Markdown source={post.value.body.content} />
      </div>
    </Div>
  );
}

const Div = styled.div`
  margin-bottom: 32px;

  .post-title {
    font-weight: bold;
    font-size: 2rem;
  }

  .post-header {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 16px;

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
    margin-top: 32px;
  }

  .alert i {
    display: none;
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

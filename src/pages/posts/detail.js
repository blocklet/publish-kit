import React from 'react';
import styled from 'styled-components';
import useAsync from 'react-use/lib/useAsync';
import { useParams } from 'react-router-dom';
import { format } from 'timeago.js';

import DidAvatar from '@arcblock/did-connect/lib/Avatar';
import Spinner from '@arcblock/ux/lib/Spinner';
import Typography from '@material-ui/core/Typography';

import Markdown from '../../components/markdown';

import api from '../../libs/api';

export default function PostDetail() {
  const { id } = useParams();
  const post = useAsync(async () => {
    const { data } = await api.get(`/api/posts/${id}`);
    return data;
  });

  if (!post.value || post.loading) {
    return <Spinner />;
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
`;

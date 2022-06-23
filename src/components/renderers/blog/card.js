import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconLink from '@mui/icons-material/LinkOutlined';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import PostCard from '../base';

export default function BlogCard({ post }) {
  return (
    <Div>
      <PostCard post={post}>
        <div className="post-excerpt">{post.body.excerpt}</div>
        <Link to={`/post/${post._id}`} className="post-link">
          <div className="post-cover">
            <IconLink fontSize="medium" style={{ color: '#999' }} />
          </div>
          <Typography className="post-title">{post.body.title} </Typography>
        </Link>
      </PostCard>
    </Div>
  );
}

BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
};

const Div = styled.div`
  .post-link {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 12px;
    background-color: rgba(0, 0, 0, 0.03);
    border: 1px solid #ced4da;
    border-radius: 5px;

    .post-cover {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      margin-right: 8px;
      transform: rotate(-45deg);
    }

    .post-title {
      font-size: 1rem;
      font-weight: normal;
      background-color: transparent;
    }
  }
`;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PostCard from '../base';

export default function StatusCard({ post }) {
  return (
    <Div>
      <PostCard post={post}>{post.body.content}</PostCard>
    </Div>
  );
}

StatusCard.propTypes = {
  post: PropTypes.object.isRequired,
};

const Div = styled.div`
  .post-content {
    font-size: 1rem;
    font-weight: normal;
  }
`;

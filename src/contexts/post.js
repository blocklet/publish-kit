/* eslint-disable import/no-cycle */
import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Center from '@arcblock/ux/lib/Center';
import Spinner from '@arcblock/ux/lib/Spinner';
import useAsync from 'react-use/lib/useAsync';

import api from '../libs/api';
import { useSessionContext } from './session';

const PostContext = createContext({});
const { Provider, Consumer } = PostContext;

function PostProvider({ children, pageSize = 20, type = '' }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { session } = useSessionContext();

  const loadInitialPosts = async () => {
    const { data } = await api.get(`/api/posts?page=1&pageSize=${pageSize}&type=${type}`);
    setPosts(data.posts);
    setHasMore(data.pageCount > 1);
    return data;
  };

  const loadMorePosts = () => {
    console.log('load more'); // eslint-disable-line
    setLoading(true);
    api
      .get(`/api/posts?page=${page + 1}&pageSize=${pageSize}&type=${type}`)
      .then(({ data }) => {
        setPage(page + 1);
        setHasMore(page + 1 < data.pageCount);
        setPosts([...posts, ...data.posts]);
        setLoading(false);
      })
      .catch(console.error);
  };

  const prependPost = (post) => {
    if (post) {
      setPosts([post, ...posts]);
    }
  };

  const deletePost = (postId) => {
    const index = posts.findIndex((p) => p._id === postId);
    if (index > -1) {
      setPosts([...posts.slice(0, index), ...posts.slice(index + 1)]);
    }
  };

  const state = useAsync(loadInitialPosts, []);
  useEffect(() => loadInitialPosts, [session.user]);

  if (state.loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return <Provider value={{ loading, posts, prependPost, deletePost, loadMorePosts, hasMore }}>{children}</Provider>;
}

PostProvider.propTypes = {
  children: PropTypes.any.isRequired,
  pageSize: PropTypes.number,
  type: PropTypes.string,
};

PostProvider.defaultProps = {
  pageSize: 20,
  type: '',
};

function usePostContext() {
  const result = useContext(PostContext);
  return result;
}

export { PostContext, PostProvider, Consumer as PostConsumer, usePostContext };

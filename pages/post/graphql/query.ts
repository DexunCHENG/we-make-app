import { gql, useQuery } from '@apollo/client';

import { Post } from '../types';

const POSTS = gql`
  query($offset: Int) {
    posts(offset: $offset, sortBy: COMMENTS, order: DESC) {
      title
      link
      points
      author
      time
      comments
    }
  }
`;

export const usePosts = (offset?: number) => {
  const { loading, error, data, refetch } = useQuery(POSTS, { variables: { offset } });
  return {
    loading,
    error,
    posts: (data?.posts ?? []) as Post[],
    getPosts: refetch,
  };
};

import React from 'react';
import { Grid } from '@material-ui/core';

import { queryGraphql, Post } from '../graphql';
import { PostCard } from './components';

interface IProps {
  posts: Post[];
}

const Home: React.FunctionComponent<IProps> = ({ posts }) => {
  return (
    <Grid container spacing={1}>
      {posts.map((post, idx) => {
        return (
          <Grid key={`grid-item-${idx}`} item xs={12} sm={6} md={4} lg={3}>
            <PostCard post={post} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export async function getStaticProps() {
  const { posts } = await queryGraphql(`
    query($offset: Int) {
      posts(offset: $offset, sortBy: COMMENTS, order: DESC){
        title
        link
        points
        author
        time
        comments
      }
    }
  `);
  return { props: { posts } };
}

export default Home;

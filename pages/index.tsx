import React from 'react';

import {queryGraphql, Post} from '../graphql';

interface IProps {
  posts: Post[];
}

const Home: React.FunctionComponent<IProps> = ({posts}) => {
  console.log('posts', posts);
  return <div>hello world</div>;
};

export async function getStaticProps() {
  const {posts} = await queryGraphql(`
    query($offset: Int) {
      posts(offset: $offset){
        title
        link
        points
        author
        time
        comments
      }
    }
  `);
  return {props: {posts}};
}

export default Home;

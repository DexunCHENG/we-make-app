import * as React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { PostGrid } from '../modules';

const Home: React.FunctionComponent = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <PostGrid />
    </ApolloProvider>
  );
};

export default Home;

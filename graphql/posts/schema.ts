import { gql, makeExecutableSchema } from 'apollo-server-micro';
import puppeteer from 'puppeteer';

import { WEBSITE_URL, extractPageContent, sortPosts } from './helper';
import { Post } from './types';

const typeDefs = gql`
  type Query {
    posts(offset: Int, sortBy: SortBy, order: Order): [Post!]!
  }
  enum SortBy {
    COMMENTS
  }
  enum Order {
    ASC
    DESC
  }
  type Post {
    title: String!
    link: String
    points: String
    author: String
    time: String
    comments: String
  }
`;

const resolvers = {
  Query: {
    async posts(parent, { offset, sortBy, order }) {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      const pageUrl = `${WEBSITE_URL}?p=${offset}`;
      await page.goto(pageUrl);

      const posts: Post[] = await extractPageContent(page);

      await browser.close();

      return sortPosts(posts, sortBy, order);
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

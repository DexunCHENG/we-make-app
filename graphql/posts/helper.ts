import puppeteer from 'puppeteer';

import { Order } from '../types';
import { Post, SortBy } from './types';

export const extractPageContent = async (page: puppeteer.Page) => {
  const itemList: Post[] = await page.evaluate(() => {
    const itemTitiles = document.querySelectorAll('tr.athing td:last-child');
    const itemSubTexts = document.querySelectorAll('tr td.subtext');
    const itemCount = itemTitiles.length;
    const items: Post[] = [];

    const extractStrsFromElem = (element: HTMLElement, selectors: string[] = []) => {
      // if no selector input, directly extract str from current elements
      if (!selectors.length) {
        return [element ? element.innerText ?? ''.trim() : ''];
      }
      // extractor strs from selected elements
      return selectors.map((sel) => {
        const newElem: HTMLElement = element.querySelector(sel);
        return newElem ? newElem.innerText ?? ''.trim() : '';
      });
    };

    const titleSelectors = ['a.storylink', 'span.sitebit.comhead a span.sitestr'];
    const subTextSelectors = ['span.score', 'a.hnuser', 'span.age a', 'a:nth-child(6)'];

    for (let i = 0; i < itemCount; i = i + 1) {
      const itemTitle = itemTitiles[i] as HTMLElement;
      const itemSubText = itemSubTexts[i] as HTMLElement;

      const [title, link] = extractStrsFromElem(itemTitle, titleSelectors);
      const [points, author, time, comments] = extractStrsFromElem(itemSubText, subTextSelectors);

      items.push({
        title,
        link,
        points,
        author,
        time,
        comments,
      });
    }

    return items;
  });

  return itemList;
};
export const sortPosts = (posts: Post[] = [], sortBy: SortBy, order: Order): Post[] => {
  switch (sortBy) {
    case SortBy.COMMENTS:
      posts.sort((a, b) => {
        const { comments: commentsA } = a;
        const { comments: commentsB } = b;
        const commentCountA = extractCommentsCount(commentsA);
        const commentCountB = extractCommentsCount(commentsB);
        return order === Order.DESC ? commentCountB - commentCountA : commentCountA - commentCountB;
      });
      return posts;
    default:
      return posts;
  }
  // TODO add more cases for posts sorting fields
};

const extractCommentsCount = (comments: string = ''): number => {
  const [countStr] = comments.split(' ');
  try {
    const count = parseInt(countStr, 10);
    return isNaN(count) ? 0 : count;
  } catch (e) {
    // console.log(e);
    return 0;
  }
};

export const WEBSITE_URL = 'https://news.ycombinator.com';

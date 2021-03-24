import * as React from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';

import { PostCard } from './components';
import { usePosts } from './graphql/query';
import { useStyles } from './PostGrid.jss';

const PostGrid: React.FunctionComponent = () => {
  const classes = useStyles();
  const router = useRouter();
  const { page: currPage } = router.query;
  let currPageNum = parseInt(currPage as string, 10);
  currPageNum = isNaN(currPageNum) ? 1 : currPageNum;

  const { posts, getPosts, loading } = usePosts(currPageNum);

  const handleMore = () => {
    const newPage = currPageNum + 1;
    getPosts({ offset: newPage });
    router.push(`${router.pathname}?page=${newPage}`);
  };

  return loading ? (
    <div className={classes.loadingContainer}>
      <CircularProgress size={70} />
    </div>
  ) : (
    <div className={classes.container}>
      <Grid container spacing={1}>
        {posts.map((post, idx) => {
          return (
            <Grid key={`grid-item-${idx}`} item xs={12} sm={6} md={4} lg={3}>
              <PostCard post={post} />
            </Grid>
          );
        })}
      </Grid>
      <Button className={classes.button} onClick={handleMore}>
        More
      </Button>
    </div>
  );
};

export default PostGrid;

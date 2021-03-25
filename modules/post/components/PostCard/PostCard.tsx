import * as React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { useStyles } from './PostCard.jss';
import { IPostCardProps } from './PostCard.types';

const PostCard: React.FunctionComponent<IPostCardProps> = (props) => {
  const { title, link, author, points, time, comments } = props?.post ?? {};
  const classes = useStyles(props);
  const cardContentStr = `${points ? points : '--'} | ${author ? author : '--'} | ${time ? time : '--'} | ${comments ? comments : '--'}`;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography title={title} className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.link} color="textSecondary" gutterBottom>
          <a href={`https://${link}`} target={'_blank'}>
            {link}
          </a>
        </Typography>
        <Typography variant="body2" component="p">
          {cardContentStr}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;

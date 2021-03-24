import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    minWidth: 250,
    minHeight: 130,
    backgroundColor: 'aliceblue',
  },
  link: {
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

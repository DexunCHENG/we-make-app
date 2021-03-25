import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  button: {
    marginTop: '8px',
  },
  loadingContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}));

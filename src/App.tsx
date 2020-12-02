import React from 'react'
import { MemoList } from './components/MemoList';
import { MemoForm } from './components/MemoForm';
import { MemoContextProvider } from "./context/MemoContextProvider";
import { Box, BottomNavigation, BottomNavigationAction, Fab } from '@material-ui/core';
import { Restore, Favorite, LocationOn, Add} from '@material-ui/icons';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';


const BOTTOM_NAV_HEIGHT = 56;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      '& > div': {
        margin: `0 0 ${theme.spacing(2)}px 0`
      },
      paddingBottom: theme.spacing(2) + BOTTOM_NAV_HEIGHT
    },
    fab: {
      display: 'none',
      position: 'fixed',
      bottom: theme.spacing(2) + BOTTOM_NAV_HEIGHT,
      right: theme.spacing(2),
    },
    bottomNav: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: BOTTOM_NAV_HEIGHT
    },
  }),
);

const App = () => {
  const classes = useStyles();
  return (
    <MemoContextProvider>
      <Box className={classes.root}>
        <MemoForm />
        <MemoList />
      </Box>
      <BottomNavigation className={classes.bottomNav} showLabels >
        <BottomNavigationAction label="Recents" icon={<Restore />} />
        <BottomNavigationAction label="Favorites" icon={<Favorite />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
      </BottomNavigation>
      <Fab className={classes.fab} color="primary" aria-label="add">
        <Add />
      </Fab>
    </MemoContextProvider>
  );
}

export default App
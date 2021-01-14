import React, { memo, useContext } from 'react'
import { MemoDataGrid } from './components/MemoDataGrid';
import { MemoForm } from './components/MemoForm';
import { MemoView } from './components/MemoView';
import { IMemo as Memo} from "./models/Memo";
import { MemoContext, MemoContextProvider } from "./context/MemoContextProvider";
import { Box, BottomNavigation, BottomNavigationAction, 
  Fab, Dialog, AppBar, Button, Typography, IconButton, 
  Toolbar, List, ListItem, ListItemText, useMediaQuery } from '@material-ui/core';
import { Restore, Favorite, LocationOn, Add, Close as CloseIcon} from '@material-ui/icons';
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
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2) + BOTTOM_NAV_HEIGHT,
      right: theme.spacing(2),
    },
    detailViewContent: {
      padding: theme.spacing(2)
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
  const {state, dispatch} = useContext(MemoContext)
  const [detailViewOpen, setDetailViewOpen] = React.useState(false);
  const [addMemoOpen, setAddMemoOpen] = React.useState(false);
  const [focussedMemo, setFocussedMemo] = React.useState({} as Memo)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const gridItemClickHandler = (memo: Memo) => {
    setDetailViewOpen(true);
    // get Memo from context for updates
    const item = state.filter(item => item.id === memo.id)
    setFocussedMemo(item[0])
  }

  const handleClose = () => {setDetailViewOpen(false)}

  const handleAddMemoClose = () => {setAddMemoOpen(false)}

  const memoList = (memos: Memo[]) => {
    return memos.map(memo => {
      const itemClickHandler = () => {
        setDetailViewOpen(true);
        // get Memo from context for updates
        // const item = state.filter(item => item.id === memo.id)
        setFocussedMemo(memo)
      }
      return (
        <ListItem button onClick={itemClickHandler}>
          <ListItemText primary={memo.name} secondary={memo.url}/>
        </ListItem>
      )
    })
  }

  return (
    <MemoContextProvider>
      <Dialog fullScreen={fullScreen} open={detailViewOpen} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {focussedMemo.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className={classes.detailViewContent}>
          <MemoView memo={focussedMemo}/>
        </Box>
      </Dialog>
      <Dialog fullScreen={fullScreen} open={addMemoOpen} onClose={handleAddMemoClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleAddMemoClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Memo
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className={classes.detailViewContent}>
          <MemoForm />
        </Box>
      </Dialog>
      <Box className={classes.root}>
        <List>
          {memoList(state)}
        </List>
        {/* <MemoDataGrid onClick={gridItemClickHandler}/> */}
        {/* <MemoForm prefilledMemo={state[0]}/> */}
      </Box>
      <BottomNavigation className={classes.bottomNav} showLabels >
        <BottomNavigationAction label="List" icon={<Restore />} />
        <BottomNavigationAction label="Favorites" icon={<Favorite />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
      </BottomNavigation>
      <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setAddMemoOpen(true)}>
        <Add />
      </Fab>
    </MemoContextProvider>
  );
}

export default App
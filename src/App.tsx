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
import ClosableDialog from './components/CloseableDialog';

const NAV_LEFT_ACTION_VALUE = 'NAV_LEFT'
const NAV_LEFT_ACTION_LABEL = 'All'
const NAV_MIDDLE_ACTION_VALUE = 'NAV_MIDDLE'
const NAV_MIDDLE_ACTION_LABEL = 'Journal'
const NAV_RIGHT_ACTION_VALUE = 'NAV_RIGHT'
const NAV_RIGHT_ACTION_LABEL = 'Graph'

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
  const [navValue, setNavValue] = React.useState(NAV_LEFT_ACTION_VALUE)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {setDetailViewOpen(false)}

  const handleAddMemoClose = () => {setAddMemoOpen(false)}

  const handleNavChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setNavValue(newValue)
  }

  const memoList = (memos: Memo[]) => {
    return memos.map(memo => {
      const itemClickHandler = () => {
        setDetailViewOpen(true);
        setFocussedMemo(memo)
      }
      return (
        <ListItem button onClick={itemClickHandler}>
          <ListItemText primary={memo.name} secondary={memo.url}/>
        </ListItem>
      )
    })
  }

  const drawContent = (navValue: String) => {
    switch(navValue) {
      case NAV_LEFT_ACTION_VALUE:
        return (
          <List>
            {memoList(state)}
          </List>
        )
      case NAV_MIDDLE_ACTION_VALUE:
        return (
          <div>{NAV_MIDDLE_ACTION_LABEL}</div>
        )
      case NAV_RIGHT_ACTION_VALUE:
        return (
          <div>{NAV_RIGHT_ACTION_LABEL}</div>
        )
    }
  }

  return (
    <MemoContextProvider>
      <Box className={classes.root}>
        {drawContent(navValue)}
      </Box>
      <BottomNavigation value={navValue} onChange={handleNavChange} className={classes.bottomNav} showLabels >
        <BottomNavigationAction value={NAV_LEFT_ACTION_VALUE} label={NAV_LEFT_ACTION_LABEL} icon={<Restore />} />
        <BottomNavigationAction value={NAV_MIDDLE_ACTION_VALUE} label={NAV_MIDDLE_ACTION_LABEL} icon={<Favorite />} />
        <BottomNavigationAction value={NAV_RIGHT_ACTION_VALUE} label={NAV_RIGHT_ACTION_LABEL} icon={<LocationOn />} />
      </BottomNavigation>
      <ClosableDialog open={detailViewOpen} title={focussedMemo.name} onCloseHandler={handleClose}>
        <MemoView memo={focussedMemo}/>
      </ClosableDialog>
      <ClosableDialog open={addMemoOpen} title="Add Memo" onCloseHandler={handleAddMemoClose}>
        <MemoForm />
      </ClosableDialog>
      <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setAddMemoOpen(true)}>
        <Add />
      </Fab>
    </MemoContextProvider>
  );
}

export default App
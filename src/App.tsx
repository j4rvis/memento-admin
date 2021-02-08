import React, { memo, useContext, useEffect } from 'react'
import { MemoForm } from './components/MemoForm';
import { MemoView } from './components/MemoView';
import { BottomNav, NavIndex } from './components/BottomNav';
import { Memo, Tag } from "./models/Models";
import { MemoContext } from "./context/MemoContextProvider";
import { Grid, BottomNavigation, BottomNavigationAction, 
  Fab, List, ListItem, ListItemText, useMediaQuery, Backdrop, CircularProgress, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Restore, Favorite, LocationOn, Add, Close as CloseIcon} from '@material-ui/icons';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { ClosableDialog } from './components/CloseableDialog';
import { SimplifiedMemoForm } from './components/SimplifiedMemoForm';
import { GridContentView } from './components/GridContentView';

const BOTTOM_NAV_HEIGHT = 56;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: BOTTOM_NAV_HEIGHT
    },
    content: {
      flexGrow: 1
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(8),
      right: theme.spacing(2),
    }
  }),
);

const App = () => {
  const classes = useStyles();
  const theme = useTheme();

  const {isSyncing, isSynced, error, memos, addMemo, deleteMemo, syncMemos, syncTags, tags} = useContext(MemoContext)
  
  const [state, setState] = React.useState({
    isEditViewOpen: false,
    isDetailViewOpen: false,
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
    navIndex: NavIndex.Left,
    focussedMemo: {}
  })
  const [addMemoOpen, setAddMemoOpen] = React.useState(false);
  const [navValue, setNavValue] = React.useState(NavIndex.Left)
  const [focussedMemo, setFocussedMemo] = React.useState({} as Memo)
  const [isDetailViewOpen, setIsDetailViewOpen] = React.useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavChange = (current: NavIndex, prev: NavIndex) => {
    setNavValue(current)
  }

  useEffect(() => {
    if (!isSyncing && !isSynced) {
      syncMemos()
      syncTags()
    }
  })

  const handleCardClick = (memo: Memo) => {
    setState({
      ...state,
      focussedMemo: memo,
      isDetailViewOpen: true
    })
  }

  const handleCardDeleteClick = () => {
    console.log("Delete memo")
    deleteMemo(focussedMemo)
    setState({
      ...state,
      focussedMemo: {},
      isDetailViewOpen: false
    })
    // setFocussedMemo({} as Memo)
    // setIsDetailViewOpen(false)
  }

  const handleCardEditClick = () => {
    setState({
      ...state,
      isEditViewOpen: true,
      isDetailViewOpen: false
    })
    // setIsDetailViewOpen(false)
    // setAddMemoOpen(true)
  }

  const handleDetailViewClose = () => {
    console.log("Close")
    setState({
      ...state,
      focussedMemo: {},
      isDetailViewOpen: false
    })
    // setFocussedMemo({} as Memo)
    // setIsDetailViewOpen(false)
  }

  return (
    <Box className={classes.root}>
      <GridContentView handleCardClick={handleCardClick}></GridContentView>
      <BottomNav isMobile={isMobile} selectedIndex={NavIndex.Left} onChange={handleNavChange}></BottomNav>
      <Backdrop open={isSyncing}><CircularProgress /></Backdrop>
      {error !== null ? <Alert severity="error">This is an error message!</Alert> : ''}
      <ClosableDialog 
        open={isDetailViewOpen} 
        title='Memo' 
        handleCloseClick={() => handleDetailViewClose()}
        handleDeleteClick={() => handleCardDeleteClick()}
        handleEditClick={() => handleCardEditClick()} >
        <MemoView memo={focussedMemo}/>
      </ClosableDialog>
      <ClosableDialog open={addMemoOpen} title="Add Memo" handleCloseClick={() => setAddMemoOpen(false)}>
        <SimplifiedMemoForm triggerCloseEvent={() => setAddMemoOpen(false)}/>
      </ClosableDialog>
      <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setAddMemoOpen(true)}>
        <Add />
      </Fab>
    </Box>
    // <Grid container className={classes.main} direction='column'>
    //   <Grid className={classes.content} item container>
    //     <ListContentView viewIndex={navValue} isMobile={isMobile}></ListContentView>
    //   </Grid>
    //   <Grid item>
    //   </Grid>
    // </Grid>
  );
}

export default App
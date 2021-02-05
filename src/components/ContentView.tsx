import React, { useContext } from 'react'
import { NavIndex } from './BottomNav'
import { MemoView } from './MemoView';
import { ClosableDialog } from './CloseableDialog';
import { Memo } from "../models/Models";
import { MemoContext } from "../context/MemoContextProvider";
import { Box, List, ListItem, ListItemText, Paper, Grid } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type ContentViewProps = {
  viewIndex: NavIndex,
  isMobile: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      // height: '100vh',
      padding: theme.spacing(2)
    },
    detailCardSpacing: {
      padding: theme.spacing(2),
      flex: '1 1 auto',
      overflowY: 'scroll'
    },
    paper: {
      height: '100%'
    }
  }),
);

export const ContentView = ({viewIndex, isMobile}: ContentViewProps) => {
  const classes = useStyles();
  const {memos, isSyncing, isSynced, error, addMemo, deleteMemo, syncMemos, syncTags, tags} = useContext(MemoContext)
  const [detailViewOpen, setDetailViewOpen] = React.useState(false);

  const [selectedElement, setSelectedElement] = React.useState({
    index: NaN,
    memo: {} as Memo
  })

  const memoList = (memos: Memo[]) => {
    return memos.map((memo, index) => {
      const itemClickHandler = () => {
        setDetailViewOpen(true);
        setSelectedElement({index: index, memo: memo})
      } 
      const secondary = memo.text ? memo.text.substr(0,100) : ""
      return (
        <ListItem key={memo.id} button onClick={itemClickHandler} selected={selectedElement.index === index}>
          <ListItemText primary={memo.title} secondary={secondary}/>
        </ListItem>
      )
    })
  }

  const renderContent = () => {
    switch(viewIndex) {
      case NavIndex.Left: return renderNavLeft()
      case NavIndex.Middle: return <div>Middle</div>
      case NavIndex.Right: return <div>Right</div>
    }
  }

  const renderNavLeft = () => {
    if (isMobile) {
      return (
        <div>
          <List>{memoList(memos)}</List>
          <ClosableDialog open={detailViewOpen} title={selectedElement.memo?.title} onCloseHandler={() => setDetailViewOpen(false)}>
            <MemoView memo={selectedElement.memo} handleReferenceMemoClick={m => console.log("ref:", m)}/>
          </ClosableDialog>
        </div>
      )
    } else {
      return (
        <Grid className={classes.grid}
          container
          spacing={2}
          direction='row'
          alignItems='stretch'>
          <Grid item sm={4}>
            <Paper className={classes.paper}>
              <List>{memoList(memos)}</List>
            </Paper>
          </Grid>
          <Grid item sm={8}>
            <Paper className={classes.detailCardSpacing}>
              {selectedElement.index >= 0 && <MemoView memo={selectedElement.memo} handleReferenceMemoClick={m => console.log("ref:", m)}></MemoView>}
            </Paper>
          </Grid>
        </Grid>
      )
    }
  }


  return (
    renderContent()
  )
}
import React, { useState, useContext, FunctionComponent } from "react";
import { Box, Dialog, AppBar, Typography, IconButton, 
  Toolbar, useMediaQuery } from '@material-ui/core';
import { Close as CloseIcon} from '@material-ui/icons';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

type CloseableDialogProps = {
  open: boolean,
  onCloseHandler: () => void,
  title: string
}

const ClosableDialog: FunctionComponent<CloseableDialogProps> = ({open, onCloseHandler, title, children}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        position: 'relative',
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
      detailViewContent: {
        padding: theme.spacing(2)
      },
    }),
  );
  const classes = useStyles();
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onCloseHandler}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onCloseHandler} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.detailViewContent}>
        {children}
      </Box>
    </Dialog>
  )
}

export default ClosableDialog;
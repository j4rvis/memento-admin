import React, { useState, useContext, FunctionComponent } from "react";
import { Box, Dialog, AppBar, Typography, IconButton, 
  Toolbar, useMediaQuery, DialogActions, Button } from '@material-ui/core';
import { Close as CloseIcon, Delete as DeleteIcon} from '@material-ui/icons';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

type CloseableDialogProps = {
  open: boolean,
  title: string,
  handleCloseClick: () => void,
  handleDeleteClick?: () => void,
  handleEditClick?: () => void
}

export const ClosableDialog: FunctionComponent<CloseableDialogProps> = ({open, handleCloseClick, title, handleDeleteClick, handleEditClick, children}) => {
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

  const drawActions = () => {
    if (!handleDeleteClick && ! handleEditClick) return;
    return (
      <DialogActions>
        {handleDeleteClick && <IconButton aria-label="delete" onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" />
        </IconButton>}
        {handleEditClick && <Button onClick={handleEditClick}>Edit</Button>}
      </DialogActions>
    )
  }

  const classes = useStyles();
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleCloseClick}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCloseClick} aria-label="close">
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
      {drawActions()}     
    </Dialog>
  )
}
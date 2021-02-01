import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { MemoContext} from "../context/MemoContextProvider";
import { Memo } from "../models/Memo";
import { Button, Checkbox, FormControlLabel, TextField, makeStyles, Theme, createStyles, Typography, Box} from '@material-ui/core';
import { v4 as uuidv4 } from "uuid";

type FormProps = {
  prefilledMemo?: Memo,
  triggerCloseEvent?: () => void
}

export const MemoForm = ({prefilledMemo, triggerCloseEvent}: FormProps) => {
  const {addMemo} = useContext(MemoContext)
  const [memo, setMemo] = useState(prefilledMemo || {
    id: uuidv4()
  } as Memo)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMemo({
      ...memo,
      [event.target.name]: event.target.value
    });
  }

  const handleAddMemo = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Check if the required fields are given!
    addMemo(memo)
    if (triggerCloseEvent) {
      triggerCloseEvent()
    }
  };

  const dateLabels = (date: Date, label: string) => {
    if (!date) return
    return (
      <Box>
        <Typography variant='subtitle1'>{label}</Typography>
        <Typography variant='body2'>{String(date)}</Typography>
      </Box>
    )
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        '& > div, label': {
          marginBottom: theme.spacing(2)
        }
      }
    })
  )

  const classes = useStyles()
  return (
    <form className={classes.root} autoComplete="off">
      <TextField label='Title' multiline variant='outlined' onChange={handleChange} value={memo.title} name="title"/>
      <TextField label='Text' multiline variant='outlined' onChange={handleChange} value={memo.text} name="text"/>        
      {/* <TextField label='URL' multiline variant='outlined' onChange={handleChange} value={memo.url} name="url"/> */}
      {/* <FormControlLabel
        control={
          <Checkbox color="primary" onChange={handleChange} value={String(memo.isRead)} name="isRead" />
        } 
        label="IsRead"/> */}
      <FormControlLabel
        control={
          <Checkbox color="primary" onChange={handleChange} value={String(memo.isCategory)} name="isCategory" />
        } 
        label="IsCategory"/>
      { dateLabels(memo.created_at, 'CreatedAt') }
      { dateLabels(memo.updated_at, 'UpdatedAt') }
      <Button variant="contained" color="primary" onClick={handleAddMemo}>Add Memo</Button>
    </form>
  )
}
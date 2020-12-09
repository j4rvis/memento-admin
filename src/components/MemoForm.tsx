import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { MemoContext, ActionType } from "../context/MemoContextProvider";
import { IMemo as Memo } from "../models/Memo";
import { Card, Button, Checkbox, FormControlLabel, TextField, CardContent, Grid, makeStyles, Theme, createStyles, Typography, Box} from '@material-ui/core';

type FormProps = {
  prefilledMemo?: Memo
}

export const MemoForm = ({prefilledMemo}: FormProps) => {
  const {dispatch} = useContext(MemoContext)
  const [memo, setMemo] = useState(prefilledMemo || {} as Memo)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMemo({
      ...memo,
      [event.target.name]: event.target.value
    });
  }

  const handleAddMemo = (e: FormEvent) => {
    e.preventDefault()
    alert(JSON.stringify(memo, null, 4))

    // dispatch({
    //   type: ActionType.Add,
    //   payload: memo,
    // });

    // resetInput();
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
    <Card>
      <CardContent >
        <form className={classes.root} autoComplete="off">
          <TextField label='Name' multiline variant='outlined' onChange={handleChange} value={memo.name} name="name"/>
          <TextField label='Description' multiline variant='outlined' onChange={handleChange} value={memo.description} name="description"/>        
          <TextField label='URL' multiline variant='outlined' onChange={handleChange} value={memo.url} name="url"/>
          <FormControlLabel
            control={
              <Checkbox color="primary" onChange={handleChange} value={String(memo.isRead)} name="isRead" />
            } 
            label="IsRead"/>
          <FormControlLabel
            control={
              <Checkbox color="primary" onChange={handleChange} value={String(memo.isCategory)} name="isCategory" />
            } 
            label="IsCategory"/>
          { dateLabels(memo.createdAt, 'CreatedAt') }
          { dateLabels(memo.updatedAt, 'UpdatedAt') }
          <Button variant="contained" color="primary" onClick={handleAddMemo}>Add Memo</Button>
        </form>
      </CardContent>
    </Card>
  )
}
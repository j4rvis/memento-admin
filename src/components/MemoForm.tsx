import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { MemoContext} from "../context/MemoContextProvider";
import { Memo, Tag, FormSubmitMemo } from "../models/Models";
import { Button, TextField, makeStyles, Theme, createStyles, Typography, Box} from '@material-ui/core';
import { Autocomplete, Alert} from '@material-ui/lab';

type FormProps = {
  prefilledMemo?: Memo,
  triggerCloseEvent?: () => void
}

export const MemoForm = ({prefilledMemo, triggerCloseEvent}: FormProps) => {
  const {memos, addMemo, tags} = useContext(MemoContext)
  const [memo, setMemo] = useState({} as FormSubmitMemo)

  const [referredMemos, setReferredMemos] = useState([] as Memo[])
  const [selectedTags, setSelectedTags] = useState([] as Tag[])

  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMemo({
      ...memo,
      [event.target.name]: event.target.value
    });
  }

  const handleAddMemo = (e: FormEvent) => {
    e.preventDefault()
    
    if(!memo.title) {
      setErrorMessage("A Title is required.")
      return;
    }

    const tmpMemo: FormSubmitMemo = {
      ...memo,
      refersTo: referredMemos.map(r=>r.id),
      tags: selectedTags.map(r=>r.id)
    }
    setMemo(tmpMemo)

    console.log("POST memo", tmpMemo)
    addMemo(tmpMemo)
    // if (triggerCloseEvent) {
    //   triggerCloseEvent()
    // }
  };

  const handleRefersToChanged = (e: any, value: Memo[]) => {
    setReferredMemos(value)
  }
  
  const handleTagsChanged = (e: any, value: Tag[]) => {
    setSelectedTags(value)
  }
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
      {errorMessage !== "" ? <Alert variant="outlined" severity="error">{errorMessage}</Alert> : ''}
      <TextField label='Title' multiline variant='outlined' onChange={handleChange} value={memo.title} name="title" required/>
      <TextField label='Text' multiline variant='outlined' onChange={handleChange} value={memo.text} name="text"/>        
      {/* { dateLabels(memo.created_at, 'CreatedAt') }
      { dateLabels(memo.updated_at, 'UpdatedAt') } */}
      <Autocomplete
        options={memos}
        onChange={handleRefersToChanged}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        multiple
        renderInput={(params) => <TextField {...params} label="Relates to" variant="outlined" />}
      />
      <Autocomplete
        onChange={handleTagsChanged}
        options={tags}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        multiple
        renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
      />
      <Button variant="contained" color="primary" onClick={handleAddMemo}>Add Memo</Button>
    </form>
  )
}
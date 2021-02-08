import { Box, Button, Chip, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import React, { FormEvent, useContext, useState } from 'react'
import { MemoContext } from '../context/MemoContextProvider'
import {Memo, SimplyfiedSubmitMemo, Tag} from '../models/Models'

type ViewProps = {
  prefilledMemo?: Memo,
  prefilledTags?: Tag[],
  triggerCloseEvent?: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        widht: '500px'
      },
      textField: {
        width: '100%',
      },
      chipsArea: {
        paddingTop: theme.spacing(2)
      },
      chipList: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
      },
      chip: {
        margin: theme.spacing(0.5),
      },
    })
  )

export const SimplifiedMemoForm = ({prefilledMemo, prefilledTags, triggerCloseEvent}: ViewProps) => {
  const {memos, addMemo, tags} = useContext(MemoContext)
  const [text, setText] = useState("")
  const [url, setUrl] = useState("")
  const [selectedTags, setSelectedTags] = useState([] as Tag[])
  const [errorMessage, setErrorMessage] = useState("")


  const handleSubmit = () => {

  }
  const handleTagListChange = () => {

  }
  const handleTextChange = (e: any) => {
    setText(e.target.value)
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

  const toggleTag = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => tag.id !== t.id))
    } else {
      setSelectedTags((prev) => [
        ...prev,
        tag
      ])
    }
  }

  const drawTagChips = () => {
    const chips = tags.map(tag => {
      return (
        <Chip
          className={classes.chip}
          label={tag.name}
          onClick={() => {
            toggleTag(tag)
          }}
          color={selectedTags.includes(tag) ? 'primary' : 'default'}
        ></Chip>
      )
    })
    return (
      <Box className={classes.chipsArea}>
        <Typography variant='h6'>Tags:</Typography>
        <Box className={classes.chipList}>
          {chips}
        </Box>
      </Box>
    )
  }

  const handleAddMemo = (e: FormEvent) => {
    e.preventDefault()
    
    if(!text) {
      setErrorMessage("A Text is required.")
      return;
    }

    const tmpMemo: SimplyfiedSubmitMemo = {
      id: prefilledMemo?.id || -1,
      text: text,
      tags: selectedTags.map(r=>r.id)
    }

    console.log("POST memo", tmpMemo)
    addMemo(tmpMemo)
    if (triggerCloseEvent) {
      triggerCloseEvent()
    }
  };

  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <TextField 
        className={classes.textField}
        label='Text'
        multiline
        rows={6} 
        variant='outlined' 
        onChange={handleTextChange} 
        value={text}
      /> 
      {drawTagChips()}
      <Button variant="contained" color="primary" onClick={handleAddMemo}>Add Memo</Button>
    </Box>
  )
}


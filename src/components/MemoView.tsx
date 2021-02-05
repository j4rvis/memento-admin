import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Memo, Tag } from "../models/Models";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ContactsOutlined } from "@material-ui/icons";
import { MemoList } from "./MemoList";

type ViewProps = {
  memo: Memo,
  handleReferenceMemoClick: (memo: Memo) => void,
  handleTagClick?: (tag: Tag) => void
}

type TextAreaProps = {
  label: string,
  content: string
}

const TextArea = ({label, content}: TextAreaProps) => (
  <Box>
    <Typography variant='h6'>{label}</Typography>
    <Typography variant='body2' gutterBottom>{content}</Typography>
  </Box>
)

const formatToDateString = (input: string): string => {
  return new Date(input).toLocaleDateString('de-DE')
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    }
  }),
);


export const MemoView = ({memo, handleReferenceMemoClick, handleTagClick}: ViewProps) => {
  const classes = useStyles()
  if(Object.keys(memo).length <= 0) return <div></div>;
  console.log("Memo:", memo)
  return (
    <Box>
      <Typography variant='h4'>{memo.title}</Typography>
      <Typography variant='subtitle2'>Erstellt am {formatToDateString(memo.created_at)} - Geändert am {formatToDateString(memo.updated_at)}</Typography>
      <Typography className={classes.text} variant='body1'>{memo.text}</Typography>
      
      {memo.refersTo.length > 0 && <MemoList label='Refers to:' memos={memo.refersTo} onClickHandler={(m) => handleReferenceMemoClick(m)}></MemoList>}
      {memo.referredBy.length > 0 && <MemoList label='Referred by:' memos={memo.referredBy} onClickHandler={(m) => handleReferenceMemoClick(m)}></MemoList>}
      <TextArea label='Tags' content={memo.tags?.map(i => i.name).join(', ')}></TextArea>
    </Box>
  )
}
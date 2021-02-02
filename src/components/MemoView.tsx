import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Memo } from "../models/Memo";

type ViewProps = {
  memo: Memo
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

export const MemoView = ({memo}: ViewProps) => {
  console.log("Memo:", memo)
  return (
    <Box>
      {/* <TextArea label='ID' content={memo.id}></TextArea> */}
      <TextArea label='Title' content={memo.title}></TextArea>
      <TextArea label='Text' content={memo.text}></TextArea>
      <TextArea label='CreatedAt' content={String(memo.created_at)}></TextArea>
      <TextArea label='UpdatedAt' content={String(memo.updated_at)}></TextArea>
      <TextArea label='RefersTo' content={memo.refersTo.map(i => i.title).join(', ')}></TextArea>
      <TextArea label='RelatedBy' content={memo.referredBy.map(i => i.title).join(', ')}></TextArea>
      <TextArea label='Tags' content={memo.tags.map(i => i.name).join(', ')}></TextArea>

    </Box>
  )
}
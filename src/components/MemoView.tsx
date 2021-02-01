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
      {/* <TextArea label='URL' content={memo.url}></TextArea>
      <TextArea label='Read?' content={String(memo.isRead)}></TextArea> */}
      <TextArea label='Category?' content={memo.isCategory ? "Yes" : "No"}></TextArea>
      <TextArea label='CreatedAt' content={String(memo.created_at)}></TextArea>
      <TextArea label='UpdatedAt' content={String(memo.updated_at)}></TextArea>

    </Box>
  )
}
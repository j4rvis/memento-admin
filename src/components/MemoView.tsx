import React, { useState, useContext } from "react";
import { Box, Typography } from "@material-ui/core";
import { IMemo } from "../models/Memo";

type ViewProps = {
  memo: IMemo
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

  return (
    <Box>
      <TextArea label='ID' content={memo.id}></TextArea>
      <TextArea label='Name' content={memo.name}></TextArea>
      <TextArea label='Description' content={memo.description}></TextArea>
      <TextArea label='URL' content={memo.url}></TextArea>
      <TextArea label='Read?' content={String(memo.isRead)}></TextArea>
      <TextArea label='Category?' content={String(memo.isCategory)}></TextArea>
      <TextArea label='CreatedAt' content={String(memo.createdAt)}></TextArea>
      <TextArea label='UpdatedAt' content={String(memo.updatedAt)}></TextArea>

    </Box>
  )
}
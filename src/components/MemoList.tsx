import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Memo, Tag } from "../models/Models";

type ViewProps = {
  label: string,
  memos: Memo[], 
  onClickHandler: (memo: Memo) => void
}

export const MemoList = ({label, memos, onClickHandler}: ViewProps) => {

  const list = memos.map(m => {
    return (
      <li key={m.id} onClick={() => onClickHandler(m)}>{m.title}</li>
    )
  })

  return (
    <div>
      <Typography variant='h6'>{label}</Typography>
      <ul>{list}</ul> 
    </div>
  )
}
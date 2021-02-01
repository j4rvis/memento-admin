import React, { useContext } from "react";
import { MemoContext } from "../context/MemoContextProvider";
import { Memo } from "../models/Memo";
import { Card, CardContent, Typography } from '@material-ui/core';
import { DataGrid, ColDef, ValueFormatterParams, RowParams } from '@material-ui/data-grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CheckBox, CheckBoxOutlineBlank} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 500,
    }
  })
)

type ItemHandler = {
  onClick: (memo: Memo) => void
}

export const MemoDataGrid = ({onClick}: ItemHandler) => {
  const classes = useStyles()
  const {memos} = useContext(MemoContext)

  const columns: ColDef[] = [
    { field: 'title', headerName: 'Title', width: 320 },
    { field: 'description', headerName: 'Description', width: 400 },
    { field: 'url', headerName: 'URL', width: 240 },
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'isRead', headerName: 'Read?', width: 80, renderCell: (params:ValueFormatterParams) => (
      params.value ? <CheckBox /> : <CheckBoxOutlineBlank />
    )},
    { field: 'isCategory', headerName: 'Category?', width: 80, renderCell: (params:ValueFormatterParams) => (
      params.value ? <CheckBox /> : <CheckBoxOutlineBlank />
    )},
    { field: "refersTo", headerName: 'Refers to', width: 400 },
    { field: "referedBy", headerName: 'Referred by', width: 400 }
  ];

  const rows = memos.map((memo) => {
    return {
      id: memo.id,
      title: memo.title,
      description: memo.text,
      // url: memo.url,
      // isRead: memo.isRead,
      isCategory: memo.isCategory,
      refersTo: memo.refersTo,
      referredBy: memo.referredBy
    }
  })

  const rowClicked = (param: RowParams) => {
    onClick(param.data as Memo)
  }

  return (
    <Card>
      <CardContent className={classes.root} >
        <Typography>
          Memos
        </Typography>
        <DataGrid rows={rows} columns={columns} onRowClick={rowClicked} />
      </CardContent>
    </Card>
  )
}
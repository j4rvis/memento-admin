import React, { useContext } from "react";
import { MemoContext, ActionType } from "../context/MemoContextProvider";
import { IMemo as Memo } from "../models/Memo";
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

export const MemoDataGrid = () => {
  const classes = useStyles()
  const {state, dispatch} = useContext(MemoContext)

  const handleDeleteMemo = (memo: Memo) => {
    dispatch({
      type: ActionType.Delete,
      payload: memo,
    });
  };

  const columns: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 320 },
    { field: 'description', headerName: 'Description', width: 400 },
    { field: 'url', headerName: 'URL', width: 240 },
    { field: 'isRead', headerName: 'Read?', width: 80, renderCell: (params:ValueFormatterParams) => (
      params.value ? <CheckBox /> : <CheckBoxOutlineBlank />
    )},
    { field: 'isCategory', headerName: 'Category?', width: 80, renderCell: (params:ValueFormatterParams) => (
      params.value ? <CheckBox /> : <CheckBoxOutlineBlank />
    )},
    { field: "refersTo", headerName: 'Refers to', width: 400 },
    { field: "referedBy", headerName: 'Referred by', width: 400 }
  ];

  const rows = state.map((memo) => {
    return {
      id: memo.id,
      name: memo.name,
      description: memo.description,
      url: memo.url,
      isRead: memo.isRead,
      isCategory: memo.isCategory,
      refersTo: memo.refersTo,
      referredBy: memo.referredBy
    }
  })

  const rowClicked = (param: RowParams) => {
    alert(param.data.id)
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
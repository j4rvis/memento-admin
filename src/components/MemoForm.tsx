import React, { useState, useContext } from "react";
import { MemoContext, ActionType } from "../context/MemoContextProvider";
import { IMemo as Memo } from "../models/Memo";
import { Card, Button, Checkbox, FormControlLabel, TextField, CardContent, Grid} from '@material-ui/core';

export const MemoForm = () => {
  const {dispatch} = useContext(MemoContext)
  
  const [memo, setMemo] = useState({} as Memo)

  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    switch(name) {
      case "name":
        memo.name = value
        break
      case "description":
        memo.description = value
        break
      case "isRead":
        memo.isRead = value
        break
      case "url":
        memo.url = value
        break
    }
    setMemo(memo)
  };

  const resetInput = () => {
    setMemo({} as Memo)
  }

  const handleAddMemo = () => {

    dispatch({
      type: ActionType.Delete,
      payload: memo,
    });

    resetInput();
  };

  return (
    <Card>
      <CardContent>
        <TextField label='Name' variant="outlined" onChange={handleInputChange} value={memo.name} name="name"/>
        <TextField label='Description' variant="outlined" onChange={handleInputChange} value={memo.description} name="description"/>        
        <TextField label='URL' variant="outlined" onChange={handleInputChange} value={memo.url} name="url"/>
        <FormControlLabel
          control={
            <Checkbox color="primary" onChange={handleInputChange} value={String(memo.isRead)} name="isRead" />
          } 
          label="IsRead"/>
        <Button variant="contained" color="primary" onClick={handleAddMemo}>Add Memo</Button>
      </CardContent>
    </Card>
  )
}
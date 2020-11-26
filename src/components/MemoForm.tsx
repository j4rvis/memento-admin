import React, { useState, useContext } from "react";
import { MemoContext } from "../context/MemoContextProvider";
import { IMemo as Memo, NewMemo } from "../models/Memo";

export default () => {
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
      type: "ADD_MEMO",
      payload: memo,
    });

    resetInput();
  };

  return (
    <div className="memo-form">
      <label>Add Memo:</label>
      <div className="form-input">
        <label>Name:</label>
        <input type="text" value={memo.name} name="name" placeholder="Name" onChange={handleInputChange} />
      </div>
      <div className="form-input">
        <label>Description:</label>
        <input type="text" value={memo.description} name="description" placeholder="Description" onChange={handleInputChange} />
      </div>
      <div className="form-input">
        <label>URL:</label>
        <input type="url" value={memo.url} name="url" placeholder="URL" onChange={handleInputChange} />
      </div>
      <div className="form-input">
        <label>IsRead:</label>
        <input type="checkbox" value={String(memo.isRead)} name="isRead" placeholder="IsRead?" onChange={handleInputChange} />
      </div>
      <button type="button" onClick={handleAddMemo}>
        Add Memo
      </button>
    </div>
  )
}
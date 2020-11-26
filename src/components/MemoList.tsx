import React, { useContext } from "react";
import { MemoContext, ActionType } from "../context/MemoContextProvider";
import { IMemo as Memo } from "../models/Memo";

export const MemoList = () => {
  const {state, dispatch} = useContext(MemoContext)

  const handleDeleteMemo = (memo: Memo) => {
    dispatch({
      type: ActionType.Delete,
      payload: memo,
    });
  };

  console.log("Memos", state)
  return (
    <ul className="memo-list">
      {state.map((memo) => {
        return (
          <li key={memo.id}>
            <ul>
              <li>{memo.id}</li>
              <li>{memo.name}</li>
              <li>{memo.description}</li>
              <li>{memo.url}</li>
              <li>{memo.isRead}</li>
            </ul>
            <button onClick={() => handleDeleteMemo(memo)}>Delete</button>
          </li>
        )
      }
      )}
    </ul>
  )
}
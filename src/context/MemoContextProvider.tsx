import React from 'react'
import { FormSubmitMemo, Memo, SimplyfiedSubmitMemo, Tag } from '../models/Models'
import memoAPI from './MemoAPIClient'

interface IMemoContext {
  memos: Memo[],
  isSyncing: boolean,
  isSynced: boolean,
  error: Error | null
  addMemo: (memo: FormSubmitMemo | SimplyfiedSubmitMemo) => void,
  updateMemo: (memo: FormSubmitMemo | SimplyfiedSubmitMemo) => void,
  deleteMemo: (memo: Memo) => void
  syncMemos: () => void,
  tags: Tag[],
  syncTags: () => void
}

export const MemoContext = React.createContext<IMemoContext>({
  memos: [],
  isSynced: false,
  isSyncing: false,
  error: null,
  addMemo: (memo: FormSubmitMemo | SimplyfiedSubmitMemo) => null,
  updateMemo: (memo: FormSubmitMemo | SimplyfiedSubmitMemo) => null,
  deleteMemo: (memo: Memo) => null,
  syncMemos: () => null,
  tags: [],
  syncTags: () => null
})

export const MemoContextProvider: React.FC = (props) => {
  const [memos, setMemos] = React.useState([] as Memo[])
  const [isSyncing, setIsSyncing] = React.useState(false)
  const [isSynced, setIsSynced] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [tags, setTags] = React.useState([] as Tag[])

  const addMemo = (memo: FormSubmitMemo | SimplyfiedSubmitMemo) => {
    setIsSyncing(true);
    memoAPI.AddMemo(memo)
    setIsSynced(false)
    syncMemos()
  }

  const updateMemo = (memo: FormSubmitMemo | SimplyfiedSubmitMemo) => {
    setIsSyncing(true);
    memoAPI.UpdateMemo(memo)
    setIsSynced(false)
    syncMemos()
  }

  const deleteMemo = (memo: Memo) => {
    setIsSyncing(true)
    memoAPI.DeleteMemo(memo)
    // setMemos(memos.filter(item => item.id !== memo.id))
    setIsSynced(false)
    syncMemos()
  }

  const syncTags = () => {
    memoAPI.GetAllTags()
      .then(setTags)
      .catch(setError)
  }

  const syncMemos = () => {
    console.log("triggered")
    setIsSyncing(true)
    memoAPI.GetAllMemos()
      .then(response => {
        setMemos(response)
        setIsSyncing(false)
        setIsSynced(true)
      }).catch(err => {
        setIsSyncing(false)
        setError(err)
      })
    }
    
    return (
      <MemoContext.Provider value={{memos, isSyncing, isSynced, error, addMemo, updateMemo, deleteMemo, syncMemos, tags, syncTags}}>
        {props.children}
      </MemoContext.Provider>
    )
}
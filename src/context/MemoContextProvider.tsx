import React from 'react'
import { FormSubmitMemo, Memo, Tag } from '../models/Memo'
import memoAPI from './MemoAPIClient'

interface IMemoContext {
    memos: Memo[],
    isSyncing: boolean,
    isSynced: boolean,
    error: Error | null
    addMemo: (memo: FormSubmitMemo) => void,
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
    addMemo: (memo: FormSubmitMemo) => null,
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

    const addMemo = (memo: FormSubmitMemo) => {
        setIsSyncing(true);
        memoAPI.AddMemo(memo)
        setIsSynced(false)
        syncMemos()
    }

    const deleteMemo = (memo: Memo) => {
        setMemos(memos.filter(item => item.id !== memo.id))
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
        <MemoContext.Provider value={{memos, isSyncing, isSynced, error, addMemo, deleteMemo, syncMemos, tags, syncTags}}>
            {props.children}
        </MemoContext.Provider>
    )
}
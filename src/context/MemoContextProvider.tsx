import React, {
    useReducer,
    createContext,
    useEffect
} from 'react'
import { Memo} from '../models/Memo'
import memoAPI from './MemoAPIClient'
import { loremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from "uuid";

const loremIpsumState: Memo[] = Array.apply(null, Array(25)).map(() => {
    return {
        id: uuidv4(),
        title: loremIpsum(),
        text: loremIpsum(),
        // isRead: Date.now() % 2 === 0,
        isCategory: Date.now() % 2 === 0,
        // url: `https://${loremIpsum().replace(' ', '').toLocaleLowerCase()}`,
        referredBy: [],
        refersTo: [],
        created_at: new Date(),
        updated_at: new Date()
    }
})

interface IMemoContext {
    memos: Memo[],
    isSyncing: boolean,
    isSynced: boolean,
    error: Error | null
    addMemo: (memo: Memo) => void,
    deleteMemo: (memo: Memo) => void
    syncMemos: () => void
}

// export const MemoContext = createContext<{
//     state: Memo[],
//     dispatch: React.Dispatch<any>
// }>({
//     state: loremIpsumState,
//     dispatch: () => null
// })

// export enum ActionType {
//     Add,
//     Update,
//     Delete,
//     Sync
// }

// type Action = {
//     type: ActionType.Add | ActionType.Update | ActionType.Delete | ActionType.Sync
//     payload: any
// }

// const reducer = (state: typeof loremIpsumState, action: Action) => {
//     switch (action.type) {
//         case ActionType.Sync:
//             const memos = memoAPI.GetAllMemos()
//             console.log("Memos", memos)
//             return state;
//         case ActionType.Add:
//             /** 
//              * POST new memo
//              * GET all memos (async)
//              * return new memos state (async)
//             */
//             return [...state, action.payload]
//         case ActionType.Update:
//             /** 
//              * POST update memo
//              * GET all memos (async)
//              * return new memos state (async)
//             */
//             return state.map((memo: Memo) => {
//                 if (memo.id === action.payload.id) {
//                     memo = action.payload
//                 }
//                 return memo
//             })
//         case ActionType.Delete: 
//             /** 
//              * DELETE memo
//              * GET all memos (async)
//              * return new memos state (async)
//             */
//             return state.filter((memo: Memo) => memo.id !== action.payload)
//         default:
//             return state
//     }
// }

export const MemoContext = React.createContext<IMemoContext>({
    memos: loremIpsumState,
    isSynced: false,
    isSyncing: false,
    error: null,
    addMemo: (memo: Memo) => null,
    deleteMemo: (memo: Memo) => null,
    syncMemos: () => null
})

export const MemoContextProvider: React.FC = (props) => {
    const [memos, setMemos] = React.useState(loremIpsumState)
    const [isSyncing, setIsSyncing] = React.useState(false)
    const [isSynced, setIsSynced] = React.useState(false)
    const [error, setError] = React.useState(null)

    const addMemo = (memo: Memo) => {
        setIsSyncing(true);
        // setMemos([...memos, memo])
        memoAPI.AddMemo(memo)
        setIsSynced(false)
        syncMemos()
    }

    const deleteMemo = (memo: Memo) => {
        setMemos(memos.filter(item => item.id !== memo.id))
        setIsSynced(false)
        syncMemos()
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
        <MemoContext.Provider value={{memos, isSyncing, isSynced, error, addMemo, deleteMemo, syncMemos}}>
            {props.children}
        </MemoContext.Provider>
    )
}
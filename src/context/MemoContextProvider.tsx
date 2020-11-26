import React, {
    useReducer,
    createContext
} from 'react'
import { IMemo as Memo} from '../models/Memo'

const defaultState: Memo[] = [
    {
        id: "1",
        name: "11",
        description: "111",
        isRead: false,
        url: "",
        referredBy: [],
        refersTo: []
    },
    {
        id: "2",
        name: "22",
        description: "222",
        isRead: false,
        url: "",
        referredBy: [],
        refersTo: []
    },
]

export const MemoContext = createContext<{
    state: Memo[],
    dispatch: React.Dispatch<any>
}>({
    state: defaultState,
    dispatch: () => null
})

export enum ActionType {
    Add,
    Update,
    Delete
}

type Action = {
    type: ActionType.Add | ActionType.Update | ActionType.Delete
    payload: any
}

const reducer = (state: typeof defaultState, action: Action) => {
    switch (action.type) {
        case ActionType.Add:
            return [...state, action.payload]
        case ActionType.Update:
            return state.map((memo: Memo) => {
                if (memo.id === action.payload.id) {
                    memo = action.payload
                }
                return memo
            })
        case ActionType.Delete: 
            return state.filter((memo: Memo) => memo.id !== action.payload)
        default:
            return state
    }
}

export const MemoContextProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    
    return <MemoContext.Provider value={{state, dispatch}}>{props.children}</MemoContext.Provider>
}
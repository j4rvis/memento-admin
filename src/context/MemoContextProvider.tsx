import React, {
    useReducer,
    createContext
} from 'react'
import { IMemo as Memo} from '../models/Memo'
import { loremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from "uuid";

const loremIpsumState: Memo[] = Array.apply(null, Array(25)).map(() => {
    return {
        id: uuidv4(),
        name: loremIpsum(),
        description: loremIpsum(),
        isRead: Date.now() % 2 === 0,
        isCategory: Date.now() % 2 === 0,
        url: `https://${loremIpsum().replace(' ', '').toLocaleLowerCase()}`,
        referredBy: [],
        refersTo: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }
})

export const MemoContext = createContext<{
    state: Memo[],
    dispatch: React.Dispatch<any>
}>({
    state: loremIpsumState,
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

const reducer = (state: typeof loremIpsumState, action: Action) => {
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
    const [state, dispatch] = useReducer(reducer, loremIpsumState)
    
    return <MemoContext.Provider value={{state, dispatch}}>{props.children}</MemoContext.Provider>
}
import React, {
    useReducer,
    createContext
} from 'react'
import { IMemo as Memo} from '../models/Memo'
import { loremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from "uuid";

const defaultState: Memo[] = [
    {
        id: "1",
        name: "The first memo",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        isRead: false,
        url: "",
        referredBy: [],
        refersTo: []
    },
    {
        id: "2",
        name: "Another memo",
        description: "Quite a long description.",
        isRead: false,
        url: "https://www.lipsum.com/",
        referredBy: [],
        refersTo: []
    },
    {
        id: "3",
        name: "An already read memo",
        description: "Quite a long description.",
        isRead: true,
        url: "https://www.lipsum.com/",
        referredBy: [],
        refersTo: []
    },
]

const loremIpsumState: Memo[] = Array.apply(null, Array(25)).map(() => {
    return {
        id: uuidv4(),
        name: loremIpsum(),
        description: loremIpsum(),
        isRead: Date.now() % 2 === 0,
        url: `https://${loremIpsum().replace(' ', '').toLocaleLowerCase()}`,
        referredBy: [],
        refersTo: []
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
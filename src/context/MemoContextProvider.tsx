import React, {
    useReducer,
    createContext
} from 'react'
import { IMemo as Memo} from '../models/Memo'
import { v4 as uuidv4 } from "uuid";

const initState = {
    memos: [
        {
            id: "1",
            name: "11",
            description: "111",
            categories: [],
            isRead: false,
            url: "",
            referred_by: [],
            refers_to: []
        },
        {
            id: "2",
            name: "22",
            description: "222",
            referred_by: [],
            refers_to: []
        },
        {
            id: "3",
            name: "33",
            description: "333",
            referred_by: [],
            refers_to: []
        },
        {
            id: "4",
            name: "44",
            description: "444",
            referred_by: [],
            refers_to: []
        },
        {
            id: "5",
            name: "55",
            description: "555",
            referred_by: [],
            refers_to: []
        },
        {
            id: "6",
            name: "66",
            description: "666",
            referred_by: [],
            refers_to: []
        }
    ]
}

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

type ActionType = {
    type: 'ADD_MEMO' | 'UPDATE_MEMO' | 'DELETE_MEMO'
    payload: any
}

const reducer = (state: typeof defaultState, action: ActionType) => {
    switch (action.type) {
        case 'ADD_MEMO':
            return [...state, action.payload]
        case 'UPDATE_MEMO':
            return state.map((memo: Memo) => {
                if (memo.id === action.payload.id) {
                    memo = action.payload
                }
                return memo
            })
        case 'DELETE_MEMO': 
            return state.filter((memo: Memo) => memo.id !== action.payload)
    }
    return state
}

export const MemoContextProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    
    return <MemoContext.Provider value={{state, dispatch}}>{props.children}</MemoContext.Provider>
}
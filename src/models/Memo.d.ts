import { v4 as uuidv4 } from "uuid";
import MemoAPIClient from "../context/MemoAPIClient";

export interface Memo {
  id: number
  title: string
  text: string
  refersTo: Memo[]
  referredBy: Memo[]
  tags: Tag[]
  created_at: Date
  updated_at: Date
}

export interface FormSubmitMemo {
  title: string
  text: string
  refersTo: number[]
  tags: number[]
}

export interface Tag {
  id: number
  name: string
}
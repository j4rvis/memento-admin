import { v4 as uuidv4 } from "uuid";
import MemoAPIClient from "../context/MemoAPIClient";

export interface Memo {
  id: string
  title: string
  text: string
  // url: string
  // isRead: boolean
  isCategory: boolean
  refersTo: Memo[]
  referredBy: Memo[]
  created_at: Date
  updated_at: Date
}

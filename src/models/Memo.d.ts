import { v4 as uuidv4 } from "uuid";

export interface IMemo {
  id: string
  name: string
  description: string
  url: string
  isRead: boolean
  isCategory: boolean
  refersTo: Memo[]
  referredBy: Memo[]
  createdAt: Date
  updatedAt: Date
}
import { v4 as uuidv4 } from "uuid";

export interface IMemo {
  id: string
  name: string
  description: string
  url: string
  isRead: boolean
  refersTo: Memo[]
  referredBy: Memo[]
}

function NewMemo(name, description, url, isRead, refersTo, referredBy) : IMemo {
  return {
    id: uuidv4(),
    name: name,
    description: description,
    url: url,
    isRead: isRead,
    refersTo: refersTo || [],
    referredBy: referredBy || []
  }
}

function SaveMemo(memo: IMemo) : Error {

}

function DeleteMemo(memo: IMemo) : Error {

}
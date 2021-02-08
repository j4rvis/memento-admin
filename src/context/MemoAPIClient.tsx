import { Memo, Tag, FormSubmitMemo, SimplyfiedSubmitMemo } from '../models/Models'

export const MEMO_PATH = "https://admin.schwarz-micha.de/memos"
export const TAG_PATH = "https://admin.schwarz-micha.de/tags/"

const GetAllMemos = (): Promise<Memo[]> => {
  return fetch(`${MEMO_PATH}?_sort=updated_at:DESC`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}

const GetMemosByTagName = (name: string): Promise<Memo[]> => {
  return fetch(`${TAG_PATH}?name=${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}

const GetAllTags = (): Promise<Tag[]> => {
  return fetch(TAG_PATH)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}

const AddMemo = (memo: FormSubmitMemo | SimplyfiedSubmitMemo): Promise<Memo> => {
  return fetch(MEMO_PATH, {
    method: 'POST',
    body: JSON.stringify(memo)
  }).then(response => {
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

const UpdateMemo = (memo: FormSubmitMemo | SimplyfiedSubmitMemo): Promise<Memo> => {
  return fetch(`${MEMO_PATH}/${memo.id}`, {
    method: 'PUT',
    body: JSON.stringify(memo)
  }).then(response => {
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

const DeleteMemo = (memo: Memo): Promise<Memo> => {
  return fetch(`${MEMO_PATH}/${memo.id}`, {
    method: 'DELETE'
  }).then(response => {
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

export default {
  GetAllMemos,
  AddMemo,
  UpdateMemo,
  DeleteMemo,
  GetAllTags
}
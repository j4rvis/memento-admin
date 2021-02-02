import { responsiveFontSizes } from '@material-ui/core'
import { Http, NoSimRounded } from '@material-ui/icons'
import { Memo, Tag, FormSubmitMemo } from '../models/Memo'

export const MEMO_PATH = "https://admin.schwarz-micha.de/memos?_sort=updated_at:DESC"
export const TAG_PATH = "https://admin.schwarz-micha.de/tags/"

const GetAllMemos = (): Promise<Memo[]> => {
  return fetch(MEMO_PATH)
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

const AddMemo = (memo: FormSubmitMemo): Promise<Memo> => {
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

export default {
  GetAllMemos,
  AddMemo,
  GetAllTags
}
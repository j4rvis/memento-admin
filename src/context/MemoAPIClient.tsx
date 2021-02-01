import { responsiveFontSizes } from '@material-ui/core'
import { Http, NoSimRounded } from '@material-ui/icons'
import { Memo } from '../models/Memo'

export const PATH = "https://admin.schwarz-micha.de/memos/"
const GetAllMemos = (): Promise<Memo[]> => {
  return fetch(PATH)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}

const AddMemo = (memo: Memo): Promise<Memo> => {
  return fetch(PATH, {
    method: 'POST',
    body: JSON.stringify(memo)
  }).then(response => {
    if (!response.ok) {
      console.log(response)
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

export default {
  GetAllMemos,
  AddMemo
}
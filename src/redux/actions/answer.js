import { SEND_ANSWER } from './types'
import axios from 'axios'
import URL from '../../Config/URL'

export const sendAnswer = (value) => ({
  type: SEND_ANSWER,
  payload: axios({
    method: "POST",
    url: `${URL}/answer`,
    data: {
      question_id: value.question_id,
      user_id: value.user_id,
      answer: value.answer,
      attachment: value.attachment
    }
  })
})

export const sendSelect = (value) => ({
    type: SEND_ANSWER,
    payload: axios({
      method: "POST",
      url: `${URL}/answer`,
      data: {
        question_id: value.question_id,
        user_id: value.user_id,
        answer: value.selectedItems,
        attachment: value.attachment
      }
    })
  })
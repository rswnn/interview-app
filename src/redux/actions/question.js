import { GET_QUESTION } from './types'
import axios from 'axios'

import URL from '../../Config/URL'

export const getQuestion = () => ({
    type: GET_QUESTION,
    payload: axios({
        method: "GET",
        url: `${URL}/questions`
    })
})
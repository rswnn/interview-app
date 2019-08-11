import { USER_REGISTER } from './types'
import axios from 'axios'
import URL from '../../Config/URL'

export const userRegister = (value) => ({
  type: USER_REGISTER,
  payload: axios({
    method: "POST",
    url: `${URL}/register`,
    data: {
      name: value.name,
      email: value.email,
      phone: value.phone
    }
  })
})
    
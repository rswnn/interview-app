import { USER_REGISTER, USER_REGISTER_FULFILLED } from '../actions/types'

const initialState = {
  user: [],
  isLoading: false
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_REGISTER:
    state = {
      ...state,
      isLoading: true
    }

    case USER_REGISTER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data.data,
      }
    default:
      return state
  }
}

export default userReducer
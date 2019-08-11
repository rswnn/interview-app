import { GET_QUESTION, GET_QUESTION_FULFILLED } from '../actions/types'

const initialState = {
  data: [],
  isLoading: false
};

const questionReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_QUESTION:
    state = {
      ...state,
      isLoading: true
    }

    case GET_QUESTION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      }
    default:
      return state
  }
}

export default questionReducer

import { combineReducers } from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

import Navigation from '../../Navigation'
import userReducer from './userReducer'
import questionReducer from './questionReducer'

const router = createNavigationReducer(Navigation);

const appReducer = combineReducers({
  router,
  userReducer,
  questionReducer
})

export default appReducer
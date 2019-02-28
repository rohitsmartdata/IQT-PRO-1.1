import { combineReducers } from 'redux'
import LoginReducer from '../reducers/LoginReducer/LoginReducer'
import QuesReducer from '../reducers/QuesReducer/QuesReducer'
import BankIdReducer from '../reducers/LoginReducer/LoginReducer'
const reducers = combineReducers({
  LoginReducer,
  QuesReducer: QuesReducer,
  BankIdReducer: BankIdReducer
})

export default reducers

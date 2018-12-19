import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import alertRegReducer from './alertRegReducer'

export default combineReducers({
   auth: authReducer,
   errors: errorReducer,
   alertReg: alertRegReducer

});
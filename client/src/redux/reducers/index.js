import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import alertRegReducer from './alertRegReducer';
import profileReducer from './profileReducer';

export default combineReducers({
   auth: authReducer,
   errors: errorReducer,
   alertReg: alertRegReducer,
   profile:profileReducer
});
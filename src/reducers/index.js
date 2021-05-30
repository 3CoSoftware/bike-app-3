import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import summaryReducer from './summaryReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
    note: noteReducer,
    summary: summaryReducer,
    auth: authReducer,
    error: errorReducer
})
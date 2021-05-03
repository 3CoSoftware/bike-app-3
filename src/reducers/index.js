import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import summaryReducer from './summaryReducer'


export default combineReducers({
    note: noteReducer,
    summary: summaryReducer
})
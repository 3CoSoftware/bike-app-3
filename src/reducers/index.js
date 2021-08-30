import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import summaryReducer from './summaryReducer';
import rideReducer from './rideReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    note: noteReducer,
    summary: summaryReducer,
    ride: rideReducer,
    auth: authReducer,
    error: errorReducer
})
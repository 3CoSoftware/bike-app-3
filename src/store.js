import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers';

const initialState = {};

// const persistConfig = {
//     key: 'root',
//     storage,
// }
   
// const persistedReducer = persistReducer(persistConfig, rootReducer)  

const middleware = [
    applyMiddleware(thunk),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
  ]
// const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(...middleware))

// const store = createStore(rootReducer, initialState, compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

store.subscribe(() => console.log('store.subscribe() store.getState()', store.getState()));

// const  persistor = persistStore(store);

export { store }
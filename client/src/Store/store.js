import {combineReducers, createStore} from 'redux';
import authReducer from './Reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const allReducers = combineReducers({
    authReducer: authReducer
})

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(
    persistedReducer,
    composeWithDevTools()
)

const  persistor = persistStore(store);

export {store, persistor}

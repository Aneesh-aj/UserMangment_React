import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer  from './user/userSlice.js'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist'

const rootReducer = combineReducers({user:userReducer})
const persistCongfig = {
     key:'root',
     version:1,
     storage,
}

const persistedReducer = persistReducer(persistCongfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false,
    }),
})



export const persistor = persistStore(store)
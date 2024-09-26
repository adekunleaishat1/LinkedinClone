import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'
import userslice from "./Userslice";
import postslice from "./Postslice";
import  likeslice  from "./Like";
import  commentslice from './Comment'
import notificationslice from './Notification'

const persistConfig = {
    key: "root",
    storage,
  };

  const rootReducers = combineReducers({
    userslice,
    postslice,
    likeslice,
    commentslice ,
    notificationslice
  })

  const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer
    
})

export const persistor = persistStore(store)
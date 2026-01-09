import { configureStore} from "@reduxjs/toolkit"
import submenuReducer from './SubmenuSlice'
import subfilterSlice from "./SubfilterSlice.js";
import cartSlice from "./CartSlice.js";
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";

const rootReducer = combineReducers({
    submenu: submenuReducer,
    subfilter: subfilterSlice,
    cart: cartSlice,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer:  persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store);
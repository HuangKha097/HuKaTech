import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import productsSlide from "./productsSlice.js";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    products: productsSlide
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["products","user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })

});

export const persistor = persistStore(store);
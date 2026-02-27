import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import productsSlide from "./productsSlice.js";
import userSlice from "./userSlice.js";
import {configureStore} from "@reduxjs/toolkit";
import categoriesReducer from './categorySlice.js';

const rootReducer = combineReducers({
    products: productsSlide,
    user: userSlice,
    categories: categoriesReducer,
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["products", "user", "categories"],
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
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import productsSlide from "./productsSlice.js";
import userSlice from "./userSlice.js";
import {configureStore} from "@reduxjs/toolkit";
import categoriesReducer from './categorySlice.js';
import ordersReducer from './orderSlice.js';
import customersReducer from './customerSlice.js';
import reportReducer from './reportSlice.js';


const rootReducer = combineReducers({
    products: productsSlide,
    user: userSlice,
    categories: categoriesReducer,
    orders: ordersReducer,
    customers: customersReducer,
    report: reportReducer,
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["products", "user", "categories", "orders", "customers", "report"],
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
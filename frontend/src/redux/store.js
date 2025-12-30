import { configureStore} from "@reduxjs/toolkit"
import submenuReducer from './SubmenuSlice'
import subfilterSlice from "./SubfilterSlice.js";
import cartSlice from "./CartSlice.js";

const store = configureStore({
    reducer: {
        submenu: submenuReducer,
        subfilter: subfilterSlice,
        cart:  cartSlice
    }
})

export default store;
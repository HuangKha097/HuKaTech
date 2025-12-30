import { configureStore} from "@reduxjs/toolkit"
import submenuReducer from './SubmenuSlice'
import subfilterSlice from "./SubfilterSlice.js";

const store = configureStore({
    reducer: {
        submenu: submenuReducer,
        subfilter: subfilterSlice
    }
})

export default store;
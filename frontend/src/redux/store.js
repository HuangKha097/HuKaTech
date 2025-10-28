import { configureStore} from "@reduxjs/toolkit"
import submenuReducer from './SubmenuSlice'

const store = configureStore({
    reducer: {
        submenu: submenuReducer
    }
})

export default store;
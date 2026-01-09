import { createSlice} from "@reduxjs/toolkit"
const initialState = {
  value: ""
};
const submenuSlice = createSlice({
    name:"submenuValue",
    initialState,
    reducers:{
        setSubmenuValue: (state, action) =>{
            state.value = action.payload;
        }
    },
    clearSubmenuValue: (state) => {
      state.value = "";
    },
})

export const { setSubmenuValue, clearSubmenuValue} = submenuSlice.actions;
export default submenuSlice.reducer;
//selector
export const selectValue = (state) => state.submenu.value;
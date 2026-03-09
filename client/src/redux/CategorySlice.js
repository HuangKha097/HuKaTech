import { createSlice} from "@reduxjs/toolkit"
const initialState = {
    list: []
};
const categorySlice = createSlice({
    name:"categorySlice",
    initialState,
    reducers:{
        setCategories: (state, action) =>{
            state.list = action.payload;
        }
    },
})

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;

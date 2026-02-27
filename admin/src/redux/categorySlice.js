import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    list: [],
    categoryEdit: {},
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.list = action.payload;
        },
        setCategoryEdit: (state, action) => {
            state.categoryEdit = action.payload;
        }
    }
});

export const {setCategories, setCategoryEdit} = categoriesSlice.actions;
export default categoriesSlice.reducer;
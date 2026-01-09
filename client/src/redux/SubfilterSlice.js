import { createSlice} from "@reduxjs/toolkit"
const initialState = {
    value: []
};
const subfilterSlide = createSlice({
    name:"submenuFilterValue",
    initialState,
    reducers:{
        setSubfilterValue: (state, action) =>{
            state.value = action.payload;
        },
    removeSubfilterValue: (state, action) => {
        state.value = state.value.filter((item) => item!==action.payload);
    },
    clearSubfilterValue: (state) => {
        state.value = [];
    },
    },
})

export const { setSubfilterValue,removeSubfilterValue, clearSubfilterValue} = subfilterSlide.actions;
export default subfilterSlide.reducer;

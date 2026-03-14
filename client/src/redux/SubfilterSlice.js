import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: [],
    brand: [],
    priceRange: null,
    productsSearch: []
};

const subfilterSlice = createSlice({
    name: "subfilter",
    initialState,
    reducers: {
        toggleType(state, action) {
            const value = action.payload;
            state.type.includes(value)
                ? state.type = state.type.filter(item => item !== value)
                : state.type.push(value);
        },

        toggleBrand(state, action) {
            const value = action.payload;
            state.brand.includes(value)
                ? state.brand = state.brand.filter(item => item !== value)
                : state.brand.push(value);
        },
        setPriceRange(state, action) {
            state.priceRange = action.payload;
        },

        clearPriceRange(state) {
            state.priceRange = null;
        },

        clearSubfilter(state) {
            state.type = [];
            state.brand = [];
            state.priceRange = null;
        },

        setProductsSearch(state, action) {
            state.productsSearch = action.payload;
        }
    }
});

export const {
    toggleType,
    toggleBrand,
    setPriceRange,
    clearPriceRange,
    clearSubfilter,
    setProductsSearch
} = subfilterSlice.actions;

export default subfilterSlice.reducer;

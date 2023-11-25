import { createSlice } from "@reduxjs/toolkit";
import { getContactList } from "../actions/ContactListAction";

const initialState= {
    contacts: [],
    loading: false,
    success: false,
    error: false,
}

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers(build){
        build.addCase(getContactList.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getContactList.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.contacts = action.payload.data
        })
        .addCase(getContactList.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload 
        })
    }
});

export default contactSlice.reducer;
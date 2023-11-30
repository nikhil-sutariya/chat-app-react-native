import { createSlice } from "@reduxjs/toolkit";
import { getContactList } from "../actions/ContactListAction";
import { resetContacts } from "../actions/ResetStateAction";

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
        .addCase(resetContacts, (state, action) => {
            state.contacts = [],
            state.loading = false
            state.success = false
            state.error = false
        })
    }
});

export default contactSlice.reducer;
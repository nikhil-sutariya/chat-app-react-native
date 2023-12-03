import { createSlice } from "@reduxjs/toolkit";
import { getConversationDetails } from "../actions/ConversationDetailsAction";

const initialState= {
    messages: [],
    loading: false,
    success: false,
    error: false,
}

const conversationDetailsSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers(build){
        build.addCase(getConversationDetails.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getConversationDetails.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.messages = action.payload.data
        })
        .addCase(getConversationDetails.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload 
        })
    }
});

export default conversationDetailsSlice.reducer;

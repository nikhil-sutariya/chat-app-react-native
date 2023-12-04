import { createSlice } from "@reduxjs/toolkit";
import { getConversationDetails, receiveMessage } from "../actions/ConversationDetailsAction";
import { resetConversationDetails } from "../actions/ResetStateAction";

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
        .addCase(receiveMessage, (state, action) => {
            state.messages = [...state.messages, action.payload];
        })
        .addCase(resetConversationDetails, (state, action) => {
            state.messages = []
            state.loading = false
            state.success = false
            state.error = false
        })
    }
});

export default conversationDetailsSlice.reducer;

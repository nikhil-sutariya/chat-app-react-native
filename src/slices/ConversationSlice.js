import { createSlice } from "@reduxjs/toolkit";
import { getConversationList } from "../actions/ConversationListAction";

const initialState= {
    conversations: [],
    loading: false,
    success: false,
    error: false,
}

const conversationSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers(build){
        build.addCase(getConversationList.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getConversationList.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.conversations = action.payload.data
        })
        .addCase(getConversationList.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload 
        })
    }
});

export default conversationSlice.reducer;

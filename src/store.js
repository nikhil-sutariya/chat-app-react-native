import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slices/ContactSlice";
import conversationSlice from "./slices/ConversationSlice";
import conversationDetailsSlice from "./slices/ConversationDetailsSlice";

const store = configureStore({
    reducer: {
        contacts: contactSlice,
        conversations: conversationSlice,
        messages: conversationDetailsSlice
    }
})

export default store
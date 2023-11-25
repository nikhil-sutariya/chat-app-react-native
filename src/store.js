import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slices/ContactSlice";
import conversationSlice from "./slices/ConversationSlice";

const store = configureStore({
    reducer: {
        contacts: contactSlice,
        conversations: conversationSlice
    }
})

export default store
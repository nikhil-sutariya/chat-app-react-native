import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from '@env';

const baseUrl = BASE_URL

export const getConversationDetails = createAsyncThunk('getConversationDetails', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/chat-api/v1/fetch-conversation-messages`, {
            headers: {"Authorization": `Bearer ${params}`}
        });
        return data;
    } 
    catch (error) {
        return rejectWithValue(error.message);
    }
})

export const receiveMessage = createAction("messages/receiveMessage");
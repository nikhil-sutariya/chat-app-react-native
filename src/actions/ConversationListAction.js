import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from '@env';

const baseUrl = BASE_URL

export const getConversationList = createAsyncThunk('getConversations', async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/chat-app/v1/fetch-conversation`, {
            headers: {"Authorization": `Bearer ${params}`}
        });
        return data;
    } 
    catch (error) {
        return rejectWithValue(error.message);
    }
})

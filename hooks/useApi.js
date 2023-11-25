import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { BASE_URL } from '@env';

export const useApi = async (url, method, headers, data) => {
    const baseUrl = BASE_URL;
    const axiosHeaders = headers || { 'Content-Type': 'application/json' };

    console.log('Request URL:', baseUrl + url);
    try {
        const response = await axios({
            method,
            url: baseUrl + url,
            headers: axiosHeaders.map,
            data,
            validateStatus: () => true,
        });
        return response;

    } catch (error) {
        const delay = ms => new Promise(res => setTimeout(res, ms));
		
        ToastAndroid.showWithGravityAndOffset(
            // 'Please try again later.',
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        await delay(1000);
        throw error;
    }
};

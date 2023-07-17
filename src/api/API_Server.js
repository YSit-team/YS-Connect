import axios from 'axios';

const API_BASE_URL = 'https://www.zena.co.kr/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance
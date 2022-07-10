import axios from 'axios';
import { toast } from 'react-toastify';

interface RefreshedTokens {
    refreshToken: string,
    token: string
}

async function refresh(refresh_token: string) {
    const { data } = await axios.get<RefreshedTokens>('http://localhost:3333/refreshTokens', {
        headers: {
            refresh_token: refresh_token
        }
    })
    localStorage.setItem('refresh_token', data.refreshToken)
    localStorage.setItem('token', data.token)
}

function configAxios() {
    axios.interceptors.request.use((config) => {
        config.baseURL = 'http://localhost:3333';
        config.headers = {
            authorization: localStorage.getItem('token') || '',
            refresh_token: localStorage.getItem('refresh_token') || ''
        }
        return config;
    }, (error) => {
        console.error(error)
        const refreshToken = localStorage.getItem('refresh_token')
        if(error.status === 401 && refreshToken) {
            refresh(refreshToken);
        }
        return Promise.reject(error);
    });
    
    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        console.error(error)
        toast.error(error.data?.message || 'Server error.')
        return Promise.reject(error);
    });
}

export default configAxios;
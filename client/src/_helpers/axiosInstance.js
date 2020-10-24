import axios from 'axios';
import { getAccessToken } from '../accessToken';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default (history = null) => {

    const baseURL = process.env.REACT_APP_API_DOMAIN;

    let headers = {}
    let accessToken = getAccessToken();

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
    }

    const axiosInstance = axios.create({
        baseURL,
        withCredentials: true,
        // credentials: 'include',
        headers
    })

    console.log({ headers })

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return new Promise((resolve, reject) => {
                const originalReq = error.config;

                if (error.response.status === 401 && error.config && !error.config._isRetryRequest) {
                    originalReq._retry = true;

                    let refreshTokenRes = fetch(`${baseURL}/refresh_token`, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin'
                    }).then(res => {
                        res.json()

                        return axios(originalReq);
                    })

                    resolve(refreshTokenRes)
                }

                if (history) {
                    history.push('/login');
                } else {
                    window.location = '/login'
                }

                return Promise.reject(error)
            });
        }
    )

    return axiosInstance;
}

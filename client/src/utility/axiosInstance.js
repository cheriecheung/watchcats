import axios from 'axios';
import { getAccessToken, setAccessToken } from './accessToken';

// logs out automatically when tried too many times?
export default (history = null) => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_DOMAIN,
        withCredentials: true,
    })

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return new Promise((resolve, reject) => {
                const originalReq = error.config;

                console.log({ errorConfig: error.config })

                // with specific message
                if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
                    originalReq._retry = true;

                    // let refreshTokenRes = fetch(`/refresh_token`, {
                    //     method: 'POST',
                    //     mode: 'cors',
                    //     cache: 'no-cache',
                    //     credentials: 'same-origin'
                    // }).then((res) => {
                    //     console.log({ resJSON: res.json(), res______: res })
                    //     // res.json() 

                    //     return axios(originalReq);
                    // }).catch(err => {
                    //     console.log({ err_________: err.response })
                    // })

                    let refreshTokenRes = fetch(`/refresh_token`, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'Device': 'device',
                        },
                        redirect: 'follow',
                        referrer: 'no-referrer',
                    }).then(res => {
                        return res.json()
                    }).then(data => {
                        console.log('Success:', { data });
                        const { accessToken } = data;
                        setAccessToken(accessToken)
                    }).then(() => {
                        originalReq.headers["Authorization"] = 'Bearer ' + getAccessToken();
                        return axios(originalReq);
                    })

                    resolve(refreshTokenRes)
                } else {
                    console.log('unsuccessful')

                    if (history) {
                        history.push('/login');
                    } else {
                        window.location = '/login'
                    }
                }

                return Promise.reject(error)
            });
        }
    )

    return axiosInstance;
}

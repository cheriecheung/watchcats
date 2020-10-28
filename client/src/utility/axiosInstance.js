import axios from 'axios';
import { getAccessToken, setAccessToken } from './accessToken';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default (history = null) => {

    const baseURL = process.env.REACT_APP_API_DOMAIN;

    // let headers = {}
    // let accessToken = getAccessToken();

    // if (accessToken) {
    //     headers.Authorization = `Bearer ${accessToken}`
    // }

    const axiosInstance = axios.create({
        baseURL,
        withCredentials: true,
        // credentials: 'include',
        // headers
    })

    // no headers needed?
    // console.log({ headers })

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
                        //  change header  
                        return axios(originalReq);
                    })

                    resolve(refreshTokenRes)
                } else {
                    console.log('unsuccessful')

                    // if (history) {
                    //     history.push('/login');
                    // } else {
                    //     window.location = '/login'
                    // }
                }

                return Promise.reject(error)
            });
        }
    )


    // axiosInstance.interceptors.response.use(
    //     (response) =>
    //         new Promise((resolve, reject) => {
    //             resolve(response);
    //         }),
    //     (error) => {
    //         if (!error.response) {
    //             return new Promise((resolve, reject) => {
    //                 reject(error);
    //             })
    //         }

    //         console.log({ errorResponse: error.response })

    //         if (error.response.status === 403) {

    //             if (history) {
    //                 history.push('/login');
    //             } else {
    //                 window.location = '/login'
    //             }
    //         } else {
    //             return new Promise((resolve, reject) => {
    //                 reject(error);
    //             })
    //         }
    //     }
    // )

    return axiosInstance;
}

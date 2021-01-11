import axios from 'axios';
import { getAccessToken, setAccessToken } from './accessToken';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

export default (history = null) => {
    const refresh_token = cookies.get('refreshToken');
    if (!refresh_token) return;

    const axiosInstance = axios.create({
        baseURL: REACT_APP_API_DOMAIN,
        withCredentials: true,
    })

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return new Promise((resolve, reject) => {
                const { response, config: originalReq } = error
                const { status } = response || {}
                console.log({ errorConfig: error.config })

                // with specific message
                if (status === 401 && originalReq && !originalReq.__isRetryRequest) {
                    originalReq._retry = true;

                    let refreshTokenRes = fetch(`${REACT_APP_API_DOMAIN}/refresh-token`, {
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
                } else if ((status === 400 || status === 404) && originalReq) {
                    return reject(error)
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

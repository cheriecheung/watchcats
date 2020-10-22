let accessToken = '';

export const setAccessToken = (token) => {
    console.log({ token___value: token })
    accessToken = token
}

export const getAccessToken = () => {
    return accessToken;
}
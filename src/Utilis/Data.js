import Axios from "axios";

const apiBaseUrl = `${RcParam.restApiUrl}RC/v1/api`;

const Api = Axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'X-WP_Nonce' : RcParam.rest_nonce
    }
});

export const updateOptions = async ( prams ) => {
    const response = await Api.post('/updateOptions', prams );
    return response;
}
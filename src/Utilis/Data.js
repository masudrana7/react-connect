import Axios from "axios";
import { notification } from 'antd'
const apiBaseUrl = `${RcParam.restApiUrl}RC/v1/api`;

export const notifications = ( isTrue, text ) => {
    const message = {
        message: text, //response.data.message,
        placement: 'topRight',
        style: {
            marginTop: '10px',
        },
    }
    if( isTrue ){
        notification.success( message );
    } else {
        notification.error(message );
    }
}


const Api = Axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'X-WP-Nonce' : RcParam.rest_nonce
    }
});

export const updateOptions = async ( prams ) => {
    const response = await Api.post('/updateOptions', prams );
    notifications( 200 === response.status && response.data.updated , response.data.message );
    return response;
}

export const getOptions = async () => {
    const response = await Api.get('/getOptions' );
    return JSON.parse( response.data );
}
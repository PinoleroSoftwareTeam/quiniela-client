import { json } from 'node:stream/consumers';
import { hostApi } from '../constants/hostApi';

export default class HttpService {

    async get(endpoint: string) {
        const url = `${hostApi.hostApi}${endpoint}`;        
        const response = fetch(url);
        return response;
    }

    async post(endpoint: string, data: any) {
        const url = `${hostApi.hostApi}${endpoint}`;        
        const response = fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}
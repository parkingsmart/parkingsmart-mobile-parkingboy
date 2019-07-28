import axios from './base.js';

const baseUrl = 'http://localhost:9999/orders';

export function getAllNewOrders (){
    return axios.get(baseUrl + '/newOrders');
}


import axios from './base.js';

const baseUrl = 'http://localhost:8080/orders';

export function getAllNewOrders (){
    return axios.get(baseUrl + '/newOrders');
}


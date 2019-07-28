import axios from './base.js';

const baseUrl = 'http://localhost:8080/orders/n/';

export function getParkingLots(){
    return axios.get(baseUrl);
 }
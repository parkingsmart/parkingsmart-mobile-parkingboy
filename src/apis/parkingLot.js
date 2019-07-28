import axios from './base.js';

const baseUrl = 'http://localhost:8080/parking-lots/';

export function getParkingLots(employeeId){
    return axios.get(baseUrl+employeeId);
 }
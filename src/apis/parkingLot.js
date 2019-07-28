import axios from './base.js';

const baseUrl = '/api/parking-lots/';

export function getParkingLots(employeeId){
    return axios.get(baseUrl+employeeId);
 }
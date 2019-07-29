import axios from './base.js';

const baseUrl = '/api/employees';

export function getParkingLots(employeeId) {
  return axios.get(`${baseUrl}/${employeeId}/parking-lots`);
}
export function getAllOrdersOnGoing(employeeId) {
  return axios.get(`${baseUrl}/${employeeId}/orders`);
}
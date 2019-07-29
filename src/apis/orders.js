import axios from './base.js';

const baseUrl = '/api/orders/newOrders';

export function getAllNewOrders() {
  return axios.get(baseUrl);
}

export function grabOrderById(orderId, employee) {
  return axios({
    method: "put",
    url: `${baseUrl}/${orderId}`,
    data: employee,
  });
}

export function updateOrderParkingLot(orderId, parkingLot) {
  return axios({
    method: "put",
    url: `${baseUrl}/${orderId}/parkinglot`,
    data: parkingLot,
  });
}
export function finishOrder(orderId) {
  return axios({
    method: "patch",
    url: `${baseUrl}/${orderId}`,
  });
}

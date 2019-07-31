import axios from './base.js';

const baseUrl = '/api/orders';

export function getAllNewOrders() {
  return axios.get(baseUrl, {
    params: {
      status: 0
    }
  });
}

export function grabOrderById(orderId, employeeId) {
  return axios({
    method: "put",
    url: `${baseUrl}/${orderId}?employeeId=${employeeId}`,

  });
}

export function updateOrderParkingLot(orderId, parkingLot) {
  return axios({
    method: "put",
    url: `${baseUrl}/${orderId}/parkinglot`,
    data: parkingLot,
  });
}
export function updateOrderStatus(orderId, statusCode) {
  return axios({
    method: "patch",
    url: `${baseUrl}/${orderId}?status=${statusCode}`,
  });
}
export function getOrderById(orderId) {
  return axios({
    method: "get",
    url: `${baseUrl}/${orderId}`,
  });
}


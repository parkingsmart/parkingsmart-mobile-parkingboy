import axios from './base.js';

const baseUrl = '/api/orders';

export function getAllNewOrders() {
  return axios.get(baseUrl, {
    params: {
      status: 0
    }
  });
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


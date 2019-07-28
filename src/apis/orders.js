import axios from './base.js';

const baseUrl = '/api/orders/newOrders/';

export function getAllNewOrders (){
  return axios.get(baseUrl);
}

export async function grabOrderById(orderId,employee){
  return await axios({
    method: "put",
    url: baseUrl + orderId,
    data: JSON.stringify(employee),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  });
}

export async function updateOrderParkingLot(orderId,parkingLot){
  await axios({
    method: "put",
    url: baseUrl + orderId + '/parkinglot',
    data: JSON.stringify(parkingLot),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  });
}
export async function finishOrder(orderId){
  await axios({
    method: "patch",
    url: baseUrl + orderId,
    // data: JSON.stringify(parkingLot),
    // headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  });
}

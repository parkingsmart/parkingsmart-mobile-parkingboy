import axios from './base.js';

const baseUrl = 'http://localhost:8080/orders/newOrders/';

export function getAllNewOrders (){
    return axios.get(baseUrl);
}

export async function grabOrderById(orderId,employee){
    await axios({
        method: "put",
        url: baseUrl+orderId,
        data: JSON.stringify(employee),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
      .then((res) => {
      })
      .catch(function (err) {
      });
}


export async function updateOrderParkingLot(orderId,parkingLot){
    await axios({
        method: "put",
        url: baseUrl+orderId+'/parkinglot',
        data: JSON.stringify(parkingLot),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      })
      .then((res) => {
      })
      .catch(function (err) {
      });
}


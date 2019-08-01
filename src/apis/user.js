import axios from './base.js';

const baseUrl = '/api/users';

export function getUserInfo(userId){
  return axios.get(`${baseUrl}/${userId}`);
}
import axios from './base.js';

export function login (users){
  return axios.post('http://localhost:8080/api/employees/login?', 'username=' + users.username + '&password=' + users.password);
}

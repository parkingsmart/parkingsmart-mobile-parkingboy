import axios from './base.js';

export function login (users){
  return axios.post('/api/employees/login?', 'username=' + users.username + '&password=' + users.password);
}

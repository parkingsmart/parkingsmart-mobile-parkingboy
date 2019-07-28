import axios from './base.js';

export function login (users){
    return axios.post('http://localhost:8080/users?', 'username=' + users.username + '&password=' + users.password);
}

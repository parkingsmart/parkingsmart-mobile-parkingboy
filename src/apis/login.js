import axios from './base.js';

const baseUrl = 'http://localhost:8080/users';

export function login (users){
    return axios.post('http://localhost:8080/users?', 'username=' + users.username + '&password=' + users.password)
}

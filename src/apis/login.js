import axios from './base.js';

export function login (users){
    return axios.post('/api/users?', 'username=' + users.username + '&password=' + users.password);
}

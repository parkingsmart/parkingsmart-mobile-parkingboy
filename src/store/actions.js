import axios from 'axios';
export default { 
    login({ dispatch, commit },users) {axios.post('http://localhost:8080/employees', "username="+users.username+"&password="+users.password)
    },
}
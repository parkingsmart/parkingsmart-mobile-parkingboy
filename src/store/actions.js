import axios from 'axios';
import { Toast } from 'vant';
export default {
    login({ commit }, users) {
        axios.post('http://localhost:8080/users?', 'username=' + users.username + '&password=' + users.password)
            .then(function (response) {
                Toast.success("login success");
            })
            .catch(function (error) {
                Toast.fail("login failed");
            })
    }
}
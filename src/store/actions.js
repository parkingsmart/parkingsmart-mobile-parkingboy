import axios from 'axios';
export default { 
    login({ dispatch, commit },users) {
        axios.post('http://localhost:8080/employees', 
        "username="+users.username+"&password="+users.password)
            .then(function (response) {
                console.log(response)
                // dispatch('initTodo');
            })
            .catch(function (error) {
                console.log(error)
                // dispatch('error', error);
            });

    },
}
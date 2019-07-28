import State from './state'
export default { 
    getEmployeeInfo(state,employee){
        State.employee = employee;
    }
}
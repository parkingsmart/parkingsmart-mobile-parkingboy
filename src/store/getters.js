export default {
  id(state) {
    return state.employee ? state.employee.id : "";
  }
};
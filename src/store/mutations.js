export default {
  getEmployeeInfo(state, employee) {
    state.employee = employee;
  },
  saveCurrentOrder(state, order) {
    state.currentOrder = order;
  }
};
import { setToken } from '@/utils/token';

export default {
  getEmployeeInfo(state, employee) {
    state.employee = employee;
    setToken(employee.id);
  },
  saveCurrentOrder(state, order) {
    state.currentOrder = order;
  }
};
import { getToken } from '../utils/token';

export default {
  id(state) {
    return state.employee ? state.employee.id : getToken();
  }
};
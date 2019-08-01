import { login, logout, getUserInfo } from '@//apis/auth';
import { removeToken } from '@/utils/token';

export default {
  async login({ dispatch }, { username, password }) {
    username = username.trim();
    await login(username, password);
    await dispatch('getUserInfo');
  },
  async getUserInfo({ commit }) {
    const data = await getUserInfo();
    commit('getEmployeeInfo', data);
  },
  async logout({ commit }) {
    await logout();
    commit('getEmployeeInfo', null);
    removeToken();
  }
};
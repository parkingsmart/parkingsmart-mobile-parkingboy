import { login, logout, getUserInfo } from '@//apis/auth';
import { removeToken } from '@/utils/token';

export default {
  async login({ dispatch }, { username, password }) {
    username = username.trim();
    await login(username, password);
    await dispatch('getUserInfo', username);
  },
  async getUserInfo({ commit }, id) {
    const data = await getUserInfo(id);
    commit('getEmployeeInfo', data);
  },
  async logout({ commit }) {
    await logout();
    commit('setToken', '');
    commit('getEmployeeInfo', null);
    removeToken();
  }
};
import axios from './base';

export const login = (username, password) => {
  return axios.post('/api/login', {
    username,
    password
  });
};

export const getUserInfo = () => {
  return axios.get(`/api/employees/info`);
};

export const logout = () => {
  return Promise.resolve();
};

import axios from './base';

export const login = (username, password) => {
  return axios.post('/api/login', {
    username,
    password
  });
};

export const getUserInfo = (id) => {
  return axios.get(`/api/employees/${id}`);
};

export const logout = () => {
  return Promise.resolve();
};

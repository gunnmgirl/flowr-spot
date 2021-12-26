import axios from "../../http";

const signup = (data) => {
  return axios.post(`/users/register`, data);
};

const login = (data) => {
  return axios.post(`/users/login`, data);
};

export { signup, login };

import axios from "../../http";

const signup = async (data) => {
  return await axios.post(`/users/register`, data);
};

const login = async (data) => {
  return await axios.post(`/users/login`, data);
};

export { signup, login };

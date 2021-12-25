import axios from "../../http";

const signup = (data) => {
  return axios.post(`/users/register`, data);
};

export { signup };

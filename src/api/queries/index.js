import axios from "../../http";

const getFlowers = () => {
  return axios.get(`/flowers`);
};

const getMe = () => {
  return axios.get(`/users/me`);
};

export { getFlowers, getMe };

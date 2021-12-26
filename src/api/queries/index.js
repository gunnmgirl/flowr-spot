import axios from "../../http";

const getFlowers = async () => {
  return await axios.get(`/flowers`);
};

const getMe = async () => {
  return await axios.get(`/users/me`);
};

const getUser = async (id) => {
  return await axios.get(`/users/${id}`);
};

export { getFlowers, getMe, getUser };

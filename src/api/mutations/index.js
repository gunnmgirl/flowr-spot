import axios from "../../http";

const signup = async (data) => {
  return await axios.post(`/users/register`, data);
};

const login = async (data) => {
  return await axios.post(`/users/login`, data);
};

const favoriteFlower = async (id) => {
  const response = await axios.post(`/flowers/${id}/favorites`);
  const sightingId = response?.data?.fav_flower?.id;
  return sightingId;
};

const unfavoriteFlower = async (id, userId) => {
  return await axios.delete(`/flowers/${id}/favorites/${userId}`);
};

const createComment = async (id, data) => {
  const response = await axios.post(`/sightings/${id}/comments`, data);
  return response?.data?.comment || {};
};

export { signup, login, favoriteFlower, unfavoriteFlower, createComment };

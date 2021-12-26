import axios from "../../http";

const getFlowers = async (params) => {
  const { pageParam = 1 } = params;
  const response = await axios.get(`/flowers?page=${pageParam}`);
  return {
    flowers: response?.data?.flowers || [],
    pageParams: response?.data?.meta?.pagination,
  };
};

const getFavoriteFlowers = async (params) => {
  const { pageParam = 1 } = params;
  const response = await axios.get(`/flowers/favorites?page=${pageParam}`);
  return {
    flowers: response?.data?.fav_flowers || [],
    pageParams: response?.data?.meta?.pagination,
  };
};

const getMe = async () => {
  return await axios.get(`/users/me`);
};

const getUser = async (id) => {
  return await axios.get(`/users/${id}`);
};

export { getFlowers, getMe, getUser, getFavoriteFlowers };

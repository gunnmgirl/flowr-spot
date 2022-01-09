import axios from "../../http";

const getFlowers = async (params) => {
  const { pageParam = 1, query = "" } = params;
  const response = query
    ? await axios.get(`/flowers/search?page=${pageParam}&query=${query}`)
    : await axios.get(`/flowers?page=${pageParam}`);
  return {
    flowers: response?.data?.flowers || [],
    pageParams: response?.data?.meta?.pagination,
  };
};

const getSightings = async (params) => {
  const { pageParam = 1 } = params;
  const response = await axios.get(`/sightings?page=${pageParam}`);
  return {
    sightings: response?.data?.sightings || [],
    pageParams: response?.data?.meta?.pagination,
  };
};

const getFlower = async (params) => {
  const { id } = params;
  const response = await axios.get(`/flowers/${id}/sightings`);
  return response?.data || {};
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

const refreshToken = async (token) => {
  const response = await axios.get(
    `/users/me/refresh`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response?.data?.auth_token || "";
};

const getComments = async (params) => {
  const { pageParam = 1, sighting_id } = params;
  const response = await axios.get(
    `/sightings/${sighting_id}/comments?page=${pageParam}`
  );
  return {
    comments: response?.data?.comments || [],
    pageParams: response?.data?.meta?.pagination,
  };
};

export {
  getFlowers,
  getMe,
  getUser,
  getFavoriteFlowers,
  refreshToken,
  getFlower,
  getComments,
  getSightings,
};

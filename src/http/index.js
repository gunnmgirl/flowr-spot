import axios from "axios";

import { API_URL } from "../constants";

import useStore from "../store";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = useStore.getState().token;
    config.headers.authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // go to login
    }
    return Promise.reject(error.response);
  }
);

export default instance;

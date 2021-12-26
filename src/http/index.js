import axios from "axios";

import { API_URL } from "../constants";

const instance = axios.create({
  baseURL: API_URL,
});

const { token } = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state"))?.state
  : "";

instance.interceptors.request.use(
  (config) => {
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
      localStorage.removeItem("token");
      // go to login
    }
    return Promise.reject(error.response);
  }
);

export default instance;

import axios from "axios";

import { API_URL } from "../constants";

import { refreshToken } from "../api/queries";

import useStore from "../store";

let isFetchingToken = false;

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = useStore.getState().token;
    config.headers.authorization = token;
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
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401) {
      if (!isFetchingToken) {
        try {
          isFetchingToken = true;
          const saveToken = useStore.getState().saveToken;
          const currentToken = useStore.getState().token;
          const token = await refreshToken(currentToken);
          saveToken(token);
          const retryOriginalRequest = new Promise((resolve) => {
            originalRequest.headers.Authorization = token;
            resolve(axios(originalRequest));
          });
          isFetchingToken = false;
          return retryOriginalRequest;
        } catch {
          isFetchingToken = false;
          return Promise.reject(error.response);
        }
      } else {
        return Promise.reject(error.response);
      }
    }
    return Promise.reject(error.response);
  }
);

export default instance;

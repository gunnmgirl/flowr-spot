import axios from "../../http";

const getFlowers = () => {
  return axios.get(`/flowers`);
};

export { getFlowers };

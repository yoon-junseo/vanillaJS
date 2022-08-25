import { API_KEY } from "../constants.js";

const cache = {};

const request = async (url) => {
  if (cache[url]) {
    return cache[url];
  }

  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    cache[url] = json;
    return json;
  }

  throw new Error("요청에 실패함");
};

export const getProductList = () => request(`${API_KEY}/products`);

export const getProductInfo = (productId) =>
  request(`${API_KEY}/products/${productId}`);

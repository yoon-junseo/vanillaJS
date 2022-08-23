import { API_KEY } from "../constants/index.js";

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

export const fetchLanguages = (keyword) =>
  request(`${API_KEY}/languages?keyword=${keyword}`);

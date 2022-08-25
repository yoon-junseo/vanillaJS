import { API_KEY } from "../constants.js";

const request = async (url) => {
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    return json;
  }

  throw new Error("요청에 실패함");
};

export const fetcheLanguages = async (keyword) =>
  request(`${API_KEY}/languages?keyword=${keyword}`);

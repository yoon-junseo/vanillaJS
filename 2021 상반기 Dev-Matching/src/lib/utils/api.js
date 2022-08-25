import { $ } from "./dom.js";

import { API_KEY } from "../constants.js";

import Loading from "../../components/Loading.js";

const cache = {};

const request = async (url) => {
  const $app = $(".App");

  if (cache[url]) {
    return cache[url];
  }

  new Loading({
    $target: $app,
  });

  const res = await fetch(url);

  $app.removeChild($(".Loading"));

  if (res.ok) {
    const json = await res.json();
    cache[url] = json;
    return json;
  }

  throw new Error("요청에 실패함");
};

export const fetchNodes = (nodeId = "") => request(`${API_KEY}/${nodeId}`);

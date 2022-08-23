import { $ } from "./lib/utils/dom.js";

import Model from "./model/index.js";
import View from "./view/index.js";
import Controller from "./controller/index.js";

const $app = $(".App");

const model = new Model();

const view = new View($app);

new Controller({ view, model });

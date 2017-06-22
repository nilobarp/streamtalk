"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const home_controller_1 = require("../app/controllers/home-controller");
let controller = core_1.IOC.Container.get(home_controller_1.HomeController);
let home = {
    method: 'GET',
    path: '/',
    name: 'home',
    handler: controller.show,
    protected: false
};
exports.home = home;
//# sourceMappingURL=home.js.map
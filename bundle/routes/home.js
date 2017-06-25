"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var home_controller_1 = require("../app/controllers/home-controller");
var controller = core_1.IOC.Container.get(home_controller_1.HomeController);
var home = {
    method: 'GET',
    path: '/',
    name: 'home',
    handler: controller.show,
    protected: false
};
exports.home = home;
//# sourceMappingURL=home.js.map
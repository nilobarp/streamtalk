"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const app_1 = require("../config/app");
const database_1 = require("../config/database");
const home_controller_1 = require("../app/controllers/home-controller");
const auth_controller_1 = require("../app/controllers/auth-controller");
core_1.IOC.Container.bind(core_1.Types.ServerConfig).to(app_1.SrvConf);
core_1.IOC.Container.bind(core_1.Types.DatabaseConfig).to(database_1.DatabaseConfig);
core_1.IOC.Container.bind(home_controller_1.HomeController).to(home_controller_1.HomeController);
core_1.IOC.Container.bind(core_1.Types.AuthGuard).to(auth_controller_1.AuthController);
//# sourceMappingURL=ioc-bindings.js.map
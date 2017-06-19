"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StreamTalk_1 = require("StreamTalk");
const app_1 = require("../config/app");
const database_1 = require("../config/database");
const home_controller_1 = require("../app/controllers/home-controller");
const auth_controller_1 = require("../app/controllers/auth-controller");
StreamTalk_1.IOC.Container.bind(StreamTalk_1.Types.ServerConfig).to(app_1.SrvConf);
StreamTalk_1.IOC.Container.bind(StreamTalk_1.Types.DatabaseConfig).to(database_1.DatabaseConfig);
StreamTalk_1.IOC.Container.bind(home_controller_1.HomeController).to(home_controller_1.HomeController);
StreamTalk_1.IOC.Container.bind(StreamTalk_1.Types.AuthGuard).to(auth_controller_1.AuthController);
//# sourceMappingURL=ioc-bindings.js.map
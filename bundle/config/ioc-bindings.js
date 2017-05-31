"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamTalk_1 = require("StreamTalk");
var app_1 = require("../config/app");
var database_1 = require("../config/database");
var home_controller_1 = require("../app/controllers/home-controller");
var auth_controller_1 = require("../app/controllers/auth-controller");
StreamTalk_1.IOC.Container.bind(StreamTalk_1.Types.ServerConfig).to(app_1.SrvConf);
StreamTalk_1.IOC.Container.bind(StreamTalk_1.Types.DatabaseConfig).to(database_1.DatabaseConfig);
StreamTalk_1.IOC.Container.bind(home_controller_1.HomeController).to(home_controller_1.HomeController);
StreamTalk_1.IOC.Container.bind(StreamTalk_1.Types.AuthGuard).to(auth_controller_1.AuthController);
//# sourceMappingURL=ioc-bindings.js.map
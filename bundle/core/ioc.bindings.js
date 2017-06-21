"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IOC = require("typescript-ioc/es6");
const error_provider_1 = require("./error.provider");
IOC.Container.bind(error_provider_1.ErrorProvider).to(error_provider_1.ErrorProvider);
const log_provider_1 = require("./log.provider");
IOC.Container.bind(log_provider_1.LogProvider).to(log_provider_1.LogProvider);
const router_1 = require("./router");
IOC.Container.bind(router_1.Router).to(router_1.Router);
const authenticator_1 = require("./authenticator");
IOC.Container.bind(authenticator_1.Authenticator).to(authenticator_1.Authenticator);
const streamtalk_1 = require("./streamtalk");
IOC.Container.bind(streamtalk_1.StreamTalk).to(streamtalk_1.StreamTalk);
//# sourceMappingURL=ioc.bindings.js.map
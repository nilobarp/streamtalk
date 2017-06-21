"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const es6_1 = require("typescript-ioc/es6");
const types_1 = require("./types");
const string_constants_1 = require("./string.constants");
const streamtalk_1 = require("./streamtalk");
const env_1 = require("./helpers/env");
require("./ioc.bindings");
class Bootstrap {
    constructor(rootPath) {
        this.ROOT_PATH = rootPath;
        process.env[string_constants_1.Constants.VAR_ROOT_PATH] = rootPath;
        env_1.loadEnvironment(this.ROOT_PATH);
        this.streamTalk = es6_1.Container.get(streamtalk_1.StreamTalk);
        if (process.env[string_constants_1.Constants.NODE_ENV_KEY] && process.env[string_constants_1.Constants.NODE_ENV_KEY].toUpperCase() === 'TEST') {
            this.streamTalk.setConfig = es6_1.Container.get(types_1.ServerConfig);
        }
        this.initializedOptions = this.streamTalk.initialize();
        this.serverInstance = this.streamTalk.instance;
    }
    get instance() {
        return this.serverInstance;
    }
    start() {
        this.streamTalk.start(this.initializedOptions);
    }
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map
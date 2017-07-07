"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var es6_1 = require("typescript-ioc/es6");
var types_1 = require("./types");
var string_constants_1 = require("./string.constants");
var streamtalk_1 = require("./streamtalk");
var env_1 = require("./helpers/env");
require("./ioc.bindings");
var Bootstrap = (function () {
    function Bootstrap(rootPath) {
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
    Object.defineProperty(Bootstrap.prototype, "instance", {
        get: function () {
            return this.serverInstance;
        },
        enumerable: true,
        configurable: true
    });
    Bootstrap.prototype.start = function () {
        this.streamTalk.start(this.initializedOptions);
    };
    return Bootstrap;
}());
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map
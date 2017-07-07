"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bunyan = require("bunyan");
var path = require("path");
var fs = require("fs");
var serializers = require("./log.serializers");
var string_constants_1 = require("./string.constants");
var LogProvider = (function () {
    function LogProvider() {
    }
    LogProvider.prototype.factory = function (logger) {
        if (logger === void 0) { logger = undefined; }
        if (logger !== undefined) {
            var child = logger.child({ ctx: this.callerContext() });
            child.level(this.level());
            return this.addSerializers(child);
        }
        if (this._instance !== undefined) {
            return this._instance;
        }
        var LOG_PATH = path.join(process.env[string_constants_1.Constants.VAR_ROOT_PATH], '..', 'storage', 'logs');
        if (fs.existsSync(LOG_PATH) === false) {
            LOG_PATH.split('/')
                .reduce(function (_path, _folder) {
                _path += path.sep + _folder;
                if (!fs.existsSync(_path)) {
                    fs.mkdirSync(_path);
                }
                return _path;
            });
        }
        this._instance = Bunyan.createLogger({
            name: 'StreamTalk',
            serializers: Bunyan.stdSerializers,
            streams: [
                {
                    stream: process.stdout,
                    level: this.level()
                },
                {
                    path: path.join(LOG_PATH, 'app.json'),
                    level: this.level()
                }
            ]
        });
        this._instance = this.addSerializers(this._instance);
        return this._instance;
    };
    LogProvider.prototype.callerContext = function () {
        var caller = new Error().stack.split('at ')[3].trim();
        var callerName = caller.substr(0, caller.indexOf(' ('));
        return callerName;
    };
    LogProvider.prototype.addSerializers = function (loggerInstance) {
        loggerInstance.addSerializers({
            user: serializers.userSerializer
        });
        return loggerInstance;
    };
    LogProvider.prototype.level = function () {
        var STR_DEBUG_VAR = 'DEBUG';
        var STR_NODE_ENV = 'NODE_ENV';
        var environment = process.env[STR_NODE_ENV] && process.env[STR_NODE_ENV].toUpperCase();
        var debugLevel = process.env[STR_DEBUG_VAR] && process.env[STR_DEBUG_VAR].toUpperCase();
        switch (debugLevel) {
            case 'TRACE':
                return Bunyan.TRACE;
            case 'DEBUG':
                return Bunyan.DEBUG;
            case 'INFO':
                return Bunyan.INFO;
            case 'WARN':
                return Bunyan.WARN;
            case 'FATAL':
                return Bunyan.FATAL;
            case 'OFF':
                return Bunyan.FATAL + 1;
            case 'ERROR':
                return Bunyan.ERROR;
            default:
                return environment === 'TEST' ? Bunyan.FATAL + 1 : Bunyan.ERROR;
        }
    };
    return LogProvider;
}());
exports.LogProvider = LogProvider;
//# sourceMappingURL=log.provider.js.map
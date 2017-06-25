"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bunyan = require("bunyan");
const path = require("path");
const fs = require("fs");
const serializers = require("./log.serializers");
const string_constants_1 = require("./string.constants");
class LogProvider {
    factory(logger = undefined) {
        if (logger !== undefined) {
            let child = logger.child({ ctx: this.callerContext() });
            child.level(this.level());
            return this.addSerializers(child);
        }
        if (this._instance !== undefined) {
            return this._instance;
        }
        let LOG_PATH = path.join(process.env[string_constants_1.Constants.VAR_ROOT_PATH], '..', 'storage', 'logs');
        if (fs.existsSync(LOG_PATH) === false) {
            LOG_PATH.split('/')
                .reduce((_path, _folder) => {
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
    }
    callerContext() {
        let caller = new Error().stack.split('at ')[3].trim();
        let callerName = caller.substr(0, caller.indexOf(' ('));
        return callerName;
    }
    addSerializers(loggerInstance) {
        loggerInstance.addSerializers({
            user: serializers.userSerializer
        });
        return loggerInstance;
    }
    level() {
        const STR_DEBUG_VAR = 'DEBUG';
        const STR_NODE_ENV = 'NODE_ENV';
        let environment = process.env[STR_NODE_ENV] && process.env[STR_NODE_ENV].toUpperCase();
        let debugLevel = process.env[STR_DEBUG_VAR] && process.env[STR_DEBUG_VAR].toUpperCase();
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
    }
}
exports.LogProvider = LogProvider;
//# sourceMappingURL=log.provider.js.map
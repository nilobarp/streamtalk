"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bunyan = require("bunyan");
const path = require("path");
const fs = require("fs");
const serializers = require("./log.serializers");
class LogProvider {
    get logFolder() {
        return this._logFolder;
    }
    set logFolder(v) {
        this._logFolder = v;
    }
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(v) {
        this._logLevel = v;
    }
    get instance() {
        return this._instance;
    }
    factory(logger = undefined) {
        const STR_ROOT_PATH_VAR = 'ROOT_PATH';
        if (logger !== undefined) {
            let child = logger.child({ ctx: this.callerContext() });
            return this.addSerializers(child);
        }
        if (this._instance !== undefined) {
            return this._instance;
        }
        let LOG_PATH = path.join(process.env[STR_ROOT_PATH_VAR], path.sep, 'storage', path.sep, 'logs');
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
            default:
                return Bunyan.ERROR;
        }
    }
}
exports.LogProvider = LogProvider;
//# sourceMappingURL=log.provider.js.map
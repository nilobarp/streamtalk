import * as Bunyan from 'bunyan';
import * as path from 'path';
import * as fs from 'fs';
import * as Types from './types';
import * as serializers from './log.serializers';
import { Constants } from './string.constants';

export class LogProvider {
    private _instance: Bunyan;

    factory (logger: Bunyan = undefined): Bunyan {
        if (logger !== undefined) {
            let child = logger.child({ctx: this.callerContext()});
            child.level(this.level());
            return this.addSerializers(child);
        }
        if (this._instance !== undefined) {
            return this._instance;
        }

        let LOG_PATH = path.join(process.env[Constants.VAR_ROOT_PATH], '..', 'storage', 'logs');

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

    private callerContext (): string {
        let caller = new Error().stack.split('at ')[3].trim();
        let callerName = caller.substr(0, caller.indexOf(' ('));
        return callerName;
    }

    private addSerializers (loggerInstance: Bunyan): Bunyan {
        loggerInstance.addSerializers({
            user: serializers.userSerializer
        });
        return loggerInstance;
    }

    private level () {
        const STR_DEBUG_VAR: string = 'DEBUG';
        const STR_NODE_ENV: string = 'NODE_ENV';
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
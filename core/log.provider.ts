import * as Bunyan from 'bunyan';
import * as path from 'path';
import * as fs from 'fs';
import * as Types from './types';
import * as serializers from './log.serializers';

export class LogProvider {

    private _logFolder: string;
    public get logFolder(): string {
        return this._logFolder;
    }
    public set logFolder(v: string) {
        this._logFolder = v;
    }

    private _logLevel: Types.LogLevel;
    public get logLevel(): Types.LogLevel {
        return this._logLevel;
    }
    public set logLevel(v: Types.LogLevel) {
        this._logLevel = v;
    }

    private _instance: Bunyan;
    public get instance(): Bunyan {
        return this._instance;
    }

    factory (logger: Bunyan = undefined): Bunyan {
        const STR_ROOT_PATH_VAR: string = 'ROOT_PATH';
        if (logger !== undefined) {
            let child = logger.child({ctx: this.callerContext()});
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
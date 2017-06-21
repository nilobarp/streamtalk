import 'reflect-metadata';
import * as path from 'path';
import * as fs from 'fs';
import * as Bunyan from 'bunyan';
import { Container, AutoWired, Inject } from 'typescript-ioc/es6';
import { ServerConfig } from './types';
import { Constants } from './string.constants';
import { StreamTalk } from './streamtalk';
import { loadEnvironment } from './helpers/env';
import { Server, ServerOptions } from 'restify';

import './ioc.bindings';

export class Bootstrap {
    private ROOT_PATH: string;
    private serverInstance: Server;
    private streamTalk: StreamTalk;
    private initializedOptions: ServerOptions;

    constructor (rootPath: string) {
        this.ROOT_PATH = rootPath;
        process.env[Constants.VAR_ROOT_PATH] = rootPath;
        loadEnvironment(this.ROOT_PATH);
        this.streamTalk = Container.get(StreamTalk);
        if (process.env[Constants.NODE_ENV_KEY] && process.env[Constants.NODE_ENV_KEY].toUpperCase() === 'TEST') {
            /**
             * This line is required for testing only.
             *
             * Utilize the setter to override server params after initialization
             * catering for different test scenarios.
             */
            this.streamTalk.setConfig = Container.get(ServerConfig);
        }

        this.initializedOptions = this.streamTalk.initialize();
        // streamTalk.start(options);
        this.serverInstance = this.streamTalk.instance;
    }

    get instance (): Server {
        return this.serverInstance;
    }

    start () {
        this.streamTalk.start(this.initializedOptions);
    }
}

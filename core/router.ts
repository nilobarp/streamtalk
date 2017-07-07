import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { Server, RequestHandler } from 'restify';
import { Container, AutoWired, Inject } from 'typescript-ioc/es6';
import { HttpRoute } from './types';
import { Constants } from './string.constants';
import { LogProvider } from './log.provider';
import { Authenticator } from './authenticator';

export class Router {
    private auth: Authenticator;
    private logger: any;
    constructor (
        @Inject auth: Authenticator,
        @Inject logProvider: LogProvider
    ) {
        this.auth = auth;
        this.logger = logProvider.factory();
    }

    setup (server: Server, routesDir: string): Server {
        let rootPath: string = process.env[Constants.VAR_ROOT_PATH] || '';
        let absRoutesPath = path.resolve(rootPath, routesDir);
        if (fs.existsSync(absRoutesPath) === false) {
            this.logger.fatal('Routes folder not found [%s]', absRoutesPath);
            this.logger.fatal('Edit config/app.ts to specify the correct path.');
            throw new Error('Routes not defined');
        }

        let routeFiles = fs.readdirSync(absRoutesPath);
        for(let key in routeFiles) {
            if (routeFiles[key].indexOf('.js.map') > 0) {
                continue;
            }
            let filePath = path.join(absRoutesPath, routeFiles[key]);
            filePath = filePath.substr(0, filePath.lastIndexOf('.js'));
            let file = require(filePath);
            for (let route in file) {
                if (this.valid(file[route])) {
                    this.make (server, file[route]);
                }
            }
        }
        return server;
    }
    private make (server: Server, route: HttpRoute): Server {
        route.middlewares = route.middlewares || [];
        if (route.protected === true) {
            if (this.auth.enabled === true) {
                let authHandler = this.auth.authenticate();
                route.middlewares.unshift(authHandler);
            } else {
                // TODO: move error message to error provider
                this.logger.fatal('No authentication mechanism found. You must configure an auth controller to have protected routes.');
                throw new Error ('No authentication mechanism found. You must configure an auth controller to have protected routes.');
            }
        }

        switch (route.method) {
            case 'POST':
                server.post({path: route.path, name: route.name, version: route.versions}, route.middlewares, route.handler);
                break;
            case 'PUT':
                server.put({path: route.path, name: route.name, version: route.versions}, route.middlewares, route.handler);
                break;
            case 'HEAD':
                server.head({path: route.path, name: route.name, version: route.versions}, route.middlewares, route.handler);
                break;
            case 'DELETE':
                server.del({path: route.path, name: route.name, version: route.versions}, route.middlewares, route.handler);
                break;
            case 'OPTIONS':
                // TODO: handle CORS
                server.opts({path: route.path, name: route.name, version: route.versions}, route.middlewares, route.handler);
                break;
            default:
                server.get({path: route.path, name: route.name, version: route.versions}, route.middlewares, route.handler);
                break;
        }

        return server;
    }

    private valid (route: HttpRoute): boolean {
        return 'path' in route && 'handler' in route;
    }
}
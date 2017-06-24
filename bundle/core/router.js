"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const es6_1 = require("typescript-ioc/es6");
const string_constants_1 = require("./string.constants");
const log_provider_1 = require("./log.provider");
const authenticator_1 = require("./authenticator");
let Router = class Router {
    constructor(auth, logProvider) {
        this.auth = auth;
        this.logger = logProvider.factory();
    }
    setup(server, routesDir) {
        let rootPath = process.env[string_constants_1.Constants.VAR_ROOT_PATH] || '';
        let absRoutesPath = path.resolve(rootPath, routesDir);
        if (fs.existsSync(absRoutesPath) === false) {
            this.logger.fatal('Routes folder not found [%s]', absRoutesPath);
            this.logger.fatal('Edit config/app.ts to specify the correct path.');
            throw new Error('Routes not defined');
        }
        let routeFiles = fs.readdirSync(absRoutesPath);
        for (let key in routeFiles) {
            if (routeFiles[key].indexOf('.js.map') > 0) {
                continue;
            }
            let filePath = path.join(absRoutesPath, routeFiles[key]);
            filePath = filePath.substr(0, filePath.lastIndexOf('.js'));
            let file = require(filePath);
            for (let route in file) {
                if (this.valid(file[route])) {
                    this.make(server, file[route]);
                }
            }
        }
        return server;
    }
    make(server, route) {
        route.middlewares = route.middlewares || [];
        if (route.protected === true) {
            if (this.auth.enabled === true) {
                let authHandler = this.auth.authenticate();
                route.middlewares.unshift(authHandler);
            }
            else {
                this.logger.fatal('No authentication mechanism found. You must configure an auth controller to have protected routes.');
                throw new Error('No authentication mechanism found. You must configure an auth controller to have protected routes.');
            }
        }
        switch (route.method) {
            case 'POST':
                server.post({ path: route.path, name: route.name, version: route.versions }, route.middlewares, route.handler);
                break;
            case 'PUT':
                server.put({ path: route.path, name: route.name, version: route.versions }, route.middlewares, route.handler);
                break;
            case 'HEAD':
                server.head({ path: route.path, name: route.name, version: route.versions }, route.middlewares, route.handler);
                break;
            case 'DELETE':
                server.del({ path: route.path, name: route.name, version: route.versions }, route.middlewares, route.handler);
                break;
            case 'OPTIONS':
                server.opts({ path: route.path, name: route.name, version: route.versions }, route.middlewares, route.handler);
                break;
            default:
                server.get({ path: route.path, name: route.name, version: route.versions }, route.middlewares, route.handler);
                break;
        }
        return server;
    }
    valid(route) {
        return 'path' in route && 'handler' in route;
    }
};
Router = __decorate([
    __param(0, es6_1.Inject),
    __param(1, es6_1.Inject),
    __metadata("design:paramtypes", [authenticator_1.Authenticator,
        log_provider_1.LogProvider])
], Router);
exports.Router = Router;
//# sourceMappingURL=router.js.map
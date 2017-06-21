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
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const core_1 = require("../../core");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = require("../../config/logger");
let AuthController = class AuthController {
    constructor(config, logProvider) {
        this.config = config;
        this.logger = logProvider.factory(logger_1.stdoutLogger);
    }
    initialize(options) {
        let opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
            secretOrKey: this.config.secretKey
        };
        passport.use('jwt', new passport_jwt_1.Strategy(opts, function (payload, done) {
            done(undefined, true);
        }));
        return passport.initialize();
    }
    extractJwt(req) {
        let jwt = passport_jwt_1.ExtractJwt.fromAuthHeader()(req);
        return jwt;
    }
    authenticate() {
        return passport.authenticate('jwt', { session: false });
    }
    authorize(req, res, next) {
        let auth = req.authorization.basic;
        let { username, password } = auth;
        console.log(this.logger, username, password);
        this.logger.info({ user: auth });
        if (username === 'validusername' && password === 'validpassword') {
            let signOptions = {};
            let token = jsonwebtoken_1.sign({ user: 'validuser' }, this.config.secretKey, signOptions);
            res.send(200, token);
            next();
        }
        else {
            res.send(401);
            next();
        }
    }
};
AuthController = __decorate([
    core_1.Decorators.Controller,
    __param(0, core_1.IOC.Inject),
    __param(1, core_1.IOC.Inject),
    __metadata("design:paramtypes", [core_1.Types.ServerConfig, core_1.LogProvider])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controller.js.map
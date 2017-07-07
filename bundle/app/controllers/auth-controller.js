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
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var core_1 = require("../../core");
var jsonwebtoken_1 = require("jsonwebtoken");
var logger_1 = require("../../config/logger");
var user_model_1 = require("../models/user.model");
var AuthController = (function () {
    function AuthController(config, logProvider) {
        this.config = config;
        this.logger = logProvider.factory(logger_1.stdoutLogger);
    }
    AuthController.prototype.initialize = function (options) {
        var opts = {
            jwtFromRequest: this.extractJwt,
            secretOrKey: this.config.secretKey
        };
        passport.use('jwt', new passport_jwt_1.Strategy(opts, function (payload, done) {
            done(undefined, payload);
        }));
        return passport.initialize();
    };
    AuthController.prototype.extractJwt = function (req) {
        var jwt = passport_jwt_1.ExtractJwt.fromAuthHeader()(req);
        return jwt;
    };
    AuthController.prototype.authenticate = function () {
        return passport.authenticate('jwt', { session: false });
    };
    AuthController.prototype.authorize = function (req, res, next) {
        var _this = this;
        var auth = req.authorization.basic;
        if (!auth) {
            res.header('WWW-Authenticate', 'Basic');
            res.send(401, 'Unauthorized');
            return;
        }
        var username = auth.username, password = auth.password;
        this.logger.info({ user: auth });
        var UserModel = user_model_1.UserModelFactory();
        UserModel.findOne({
            where: { username: username, password: password }
        }).then(function (user) {
            if (!user) {
                res.send(401, 'Unauthorized');
                next();
            }
            else {
                var signOptions = {
                    expiresIn: '1m'
                };
                var token = jsonwebtoken_1.sign({ user: user.id }, _this.config.secretKey, signOptions);
                res.send(200, token);
                next();
            }
        });
    };
    return AuthController;
}());
AuthController = __decorate([
    core_1.Decorators.autobind,
    __param(0, core_1.IOC.Inject),
    __param(1, core_1.IOC.Inject),
    __metadata("design:paramtypes", [core_1.Types.ServerConfig, core_1.LogProvider])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controller.js.map
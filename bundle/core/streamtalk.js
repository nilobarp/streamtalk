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
var es6_1 = require("typescript-ioc/es6");
var responseTime = require("response-time");
var types_1 = require("./types");
var log_provider_1 = require("./log.provider");
var error_provider_1 = require("./error.provider");
var router_1 = require("./router");
var authenticator_1 = require("./authenticator");
var restify_1 = require("restify");
var StreamTalk = (function () {
    function StreamTalk(config, router, auth, errors, logProvider) {
        this.config = config;
        this.router = router;
        this.auth = auth;
        this.errors = errors;
        this.logger = logProvider.factory();
    }
    Object.defineProperty(StreamTalk.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamTalk.prototype, "setConfig", {
        set: function (v) {
            this.config = v;
        },
        enumerable: true,
        configurable: true
    });
    StreamTalk.prototype.initialize = function () {
        var options = {
            certificate: this.config.sslCert,
            key: this.config.privateKey,
            name: 'StreamTalk',
            log: this.logger
        };
        if (!options.certificate || !options.key) {
            this.logger.warn('TLS configuration not provided');
        }
        this._instance = restify_1.createServer(options);
        this.setupMiddlewares();
        this.setupRouting();
        return options;
    };
    StreamTalk.prototype.start = function (options) {
        var _this = this;
        try {
            this.verifyServerConfig();
            var _port = void 0;
            if (this.config.sslCert && this.config.privateKey) {
                _port = this.config.port || 443;
            }
            else {
                _port = this.config.port || 80;
            }
            this._instance.listen(_port, this.config.bindIP, function (err) {
                if (err) {
                    throw err;
                }
                _this.logger.info('Server ready. Listening @ %s', _this.instance.url);
            });
        }
        catch (err) {
            this.logger.fatal(err);
            throw err;
        }
    };
    StreamTalk.prototype.verifyServerConfig = function () {
        if (this.config.secretKey === undefined || this.config.secretKey === '') {
            this.errors.throwAppSecretUndefined();
        }
    };
    StreamTalk.prototype.setupMiddlewares = function () {
        this.instance.use(restify_1.acceptParser(this.instance.acceptable));
        this.instance.use(restify_1.authorizationParser());
        this.instance.use(restify_1.queryParser());
        this.instance.use(restify_1.jsonp());
        this.instance.use(restify_1.gzipResponse());
        this.instance.use(restify_1.bodyParser());
        this.instance.use(responseTime());
        if (this.auth.enabled) {
            this.instance.use(this.auth.initialize());
        }
        this.instance.on('after', restify_1.auditLogger({
            log: this.logger
        }));
    };
    StreamTalk.prototype.setupRouting = function () {
        this.router.setup(this.instance, this.config.routesFolder);
    };
    return StreamTalk;
}());
StreamTalk = __decorate([
    es6_1.Singleton,
    __param(0, es6_1.Inject),
    __param(1, es6_1.Inject),
    __param(2, es6_1.Inject),
    __param(3, es6_1.Inject),
    __param(4, es6_1.Inject),
    __metadata("design:paramtypes", [types_1.ServerConfig,
        router_1.Router,
        authenticator_1.Authenticator,
        error_provider_1.ErrorProvider,
        log_provider_1.LogProvider])
], StreamTalk);
exports.StreamTalk = StreamTalk;
//# sourceMappingURL=streamtalk.js.map
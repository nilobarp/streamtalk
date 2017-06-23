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
const Sequelize = require("sequelize");
const es6_1 = require("typescript-ioc/es6");
const types_1 = require("../types");
const log_provider_1 = require("../log.provider");
let Connection = class Connection {
    constructor(dbConfig, logProvider) {
        this.isConnected = false;
        this.sequelize = undefined;
        this.dbConfig = dbConfig;
        this.logger = logProvider.factory();
    }
    client() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.logger.info('Initializing database connection');
            let _sequelize = new Sequelize(this.dbConfig.database, this.dbConfig.user, this.dbConfig.password, {
                host: this.dbConfig.host,
                dialect: 'postgres',
                pool: {
                    max: this.dbConfig.max,
                    min: this.dbConfig.min,
                    idle: this.dbConfig.idleTimeoutMillis
                },
                storage: undefined,
                logging: this.logger.debug.bind(this.logger)
            });
            this.sequelize = _sequelize;
            return _sequelize;
        }
    }
    connect() {
        return this.client();
    }
    close() {
        this.sequelize.close();
    }
    get instance() {
        if (this.isConnected) {
            return this.sequelize;
        }
    }
};
Connection = __decorate([
    es6_1.Singleton,
    __param(0, es6_1.Inject), __param(1, es6_1.Inject),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.DatabaseConfig !== "undefined" && types_1.DatabaseConfig) === "function" && _a || Object, typeof (_b = typeof log_provider_1.LogProvider !== "undefined" && log_provider_1.LogProvider) === "function" && _b || Object])
], Connection);
var _a, _b;
//# sourceMappingURL=connection.js.map
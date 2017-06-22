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
const fs = require("fs");
const path = require("path");
const es6_1 = require("typescript-ioc/es6");
const types_1 = require("./types");
const log_provider_1 = require("./log.provider");
let Database = class Database {
    constructor(dbConfig, logProvider) {
        this.isConnected = false;
        this.sequelize = undefined;
        this.dbConfig = dbConfig;
        this.logger = logProvider.factory();
    }
    client() {
        if (this.sequelize) {
            return this.sequelize;
        }
        else {
            this.logger.info('Initializing database connection');
            if (this.dbConfig.dialect === types_1.DatabaseDialect.sqlite) {
                if (!this.dbConfig.storage) {
                    throw new Error('Storage location must be provided for sqlite');
                }
                if (!fs.existsSync(this.dbConfig.storage)) {
                    this.dbConfig.storage.split('/')
                        .slice(0, -1)
                        .reduce((_path, _folder) => {
                        _path += path.sep + _folder;
                        if (!fs.existsSync(_path)) {
                            fs.mkdirSync(_path);
                        }
                        return _path;
                    });
                }
            }
            let _sequelize = new Sequelize(this.dbConfig.database, this.dbConfig.user, this.dbConfig.password, {
                host: this.dbConfig.host,
                dialect: types_1.DatabaseDialect[this.dbConfig.dialect],
                pool: {
                    max: this.dbConfig.max,
                    min: this.dbConfig.min,
                    idle: this.dbConfig.idleTimeoutMillis
                },
                storage: this.dbConfig.storage,
                logging: this.logger.trace.bind(this.logger)
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
        return this.client();
    }
};
Database = __decorate([
    es6_1.Singleton,
    __param(0, es6_1.Inject), __param(1, es6_1.Inject),
    __metadata("design:paramtypes", [types_1.DatabaseConfig, log_provider_1.LogProvider])
], Database);
exports.Database = Database;
//# sourceMappingURL=database.js.map
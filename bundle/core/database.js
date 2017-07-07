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
var Sequelize = require("sequelize");
var fs = require("fs");
var path = require("path");
var es6_1 = require("typescript-ioc/es6");
var types_1 = require("./types");
var log_provider_1 = require("./log.provider");
var Database = (function () {
    function Database(dbConfig, logProvider) {
        this.isConnected = false;
        this.sequelize = undefined;
        this.dbConfig = dbConfig;
        this.logger = logProvider.factory();
    }
    Database.prototype.client = function () {
        if (this.sequelize) {
            return this.sequelize;
        }
        else {
            this.logger.info('Initializing database connection');
            if (this.dbConfig.dialect === 'sqlite') {
                if (!this.dbConfig.storage) {
                    throw new Error('Storage location must be provided for sqlite');
                }
                if (!fs.existsSync(this.dbConfig.storage)) {
                    this.dbConfig.storage.split('/')
                        .slice(0, -1)
                        .reduce(function (_path, _folder) {
                        _path += path.sep + _folder;
                        if (!fs.existsSync(_path)) {
                            fs.mkdirSync(_path);
                        }
                        return _path;
                    });
                }
            }
            var _sequelize = new Sequelize(this.dbConfig.database, this.dbConfig.user, this.dbConfig.password, {
                host: this.dbConfig.host,
                dialect: this.dbConfig.dialect,
                pool: {
                    max: this.dbConfig.max,
                    min: this.dbConfig.min,
                    idle: this.dbConfig.idleTimeoutMillis
                },
                storage: this.dbConfig.storage,
                logging: this.logger.trace.bind(this.logger)
            });
            this.sequelize = _sequelize;
            delete (this.dbConfig.password);
            return _sequelize;
        }
    };
    Database.prototype.connect = function () {
        return this.client();
    };
    Database.prototype.close = function () {
        this.sequelize.close();
    };
    Object.defineProperty(Database.prototype, "instance", {
        get: function () {
            return this.client();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Database.prototype, "config", {
        get: function () {
            return this.dbConfig;
        },
        enumerable: true,
        configurable: true
    });
    return Database;
}());
Database = __decorate([
    es6_1.Singleton,
    __param(0, es6_1.Inject), __param(1, es6_1.Inject),
    __metadata("design:paramtypes", [types_1.DatabaseConfig, log_provider_1.LogProvider])
], Database);
exports.Database = Database;
//# sourceMappingURL=database.js.map
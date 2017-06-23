import * as Sequelize from 'sequelize';
import * as Bunyan from 'bunyan';
import * as fs from 'fs';
import * as path from 'path';
import { Container, AutoWired, Inject, Singleton } from 'typescript-ioc/es6';
import { DatabaseConfig } from './types';
import { LogProvider } from './log.provider';

@Singleton
class Database {
    private isConnected: boolean = false;
    private sequelize: Sequelize.Sequelize = undefined;
    private dbConfig: DatabaseConfig;
    private logger: Bunyan;

    constructor (@Inject dbConfig: DatabaseConfig, @Inject logProvider: LogProvider) {
        this.dbConfig = dbConfig;
        this.logger = logProvider.factory();
    }

    client (): Sequelize.Sequelize {
        if (this.sequelize) {
            return this.sequelize;
        } else {
            this.logger.info('Initializing database connection');
            if (this.dbConfig.dialect === 'sqlite') {
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
            let _sequelize = new Sequelize(
                                            this.dbConfig.database,
                                            this.dbConfig.user,
                                            this.dbConfig.password,
                                            {
                                                host: this.dbConfig.host,
                                                dialect: this.dbConfig.dialect,
                                                pool: {
                                                    max: this.dbConfig.max,
                                                    min: this.dbConfig.min,
                                                    idle: this.dbConfig.idleTimeoutMillis
                                                },
                                                storage: this.dbConfig.storage,
                                                logging: this.logger.trace.bind(this.logger)
                                            }
                                        );
            this.sequelize = _sequelize;
            delete(this.dbConfig.password);
            return _sequelize;
        }
    }

    connect (): Sequelize.Sequelize {
        return this.client();
    }

    close () {
        this.sequelize.close();
    }

    get instance (): Sequelize.Sequelize {
        return this.client();
    }

    get config (): DatabaseConfig {
        return this.dbConfig;
    }
}

export { Database };
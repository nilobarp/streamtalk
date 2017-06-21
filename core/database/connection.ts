import * as Sequelize from 'sequelize';
import { IOC } from 'StreamTalk';
import { DatabaseConfig } from '../types';

class Connection {
    private isConnected: boolean = false;
    private sequelize: Sequelize.Sequelize;
    private dbConfig: DatabaseConfig;

    constructor (@IOC.Inject dbConfig: DatabaseConfig) {
        this.dbConfig = dbConfig;
    }

    initialize (): Sequelize.Sequelize {
        let _sequelize = new Sequelize(
                                        this.dbConfig.database,
                                        this.dbConfig.user,
                                        this.dbConfig.password,
                                        {
                                            host: this.dbConfig.host,
                                            dialect: 'postgres',
                                            pool: {
                                                max: this.dbConfig.max,
                                                min: this.dbConfig.min,
                                                idle: this.dbConfig.idleTimeoutMillis
                                            },
                                            storage: undefined
                                        }
                                    );
        this.sequelize = _sequelize;
        return _sequelize;
    }

    async connect () {
        let result = undefined;
        try {
            result = await this.sequelize.authenticate();
            this.isConnected = true;
        } catch (err) {
            this.isConnected = false;
            throw err;
        }
    }

    get instance (): Sequelize.Sequelize {
        if(this.isConnected) {
            return this.sequelize;
        }
    }
}

let _connection: Connection = IOC.Container.get(Connection);
_connection.initialize();
_connection.connect();
let instance = _connection.instance;

export {
    instance as Connection
};
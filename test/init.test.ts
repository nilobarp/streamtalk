import * as mocha from 'mocha';
import * as path from 'path';
import { Constants } from '../core/string.constants';
import { loadEnvironment, IOC } from '../core';
import { DatabaseConfig } from '../core/types';

loadEnvironment(path.join(__dirname, '..', '..'));
process.env[Constants.VAR_ROOT_PATH] = path.join(__dirname, 'artefacts', 'tmp');

class MockDbConfig implements DatabaseConfig {
    dialect = process.env.DB_DIALECT;
    database = process.env.PGDATABASE;
    user = process.env.PGUSER;
    password = process.env.PGPASSWORD;
    storage = path.resolve(__dirname, '..', '..', 'storage', 'db', 'app.sqlite');
}

IOC.Container.bind(DatabaseConfig).to(MockDbConfig).scope(IOC.Scope.Local);
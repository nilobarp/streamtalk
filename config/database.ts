import { Types } from '../core';
import * as path from 'path';

export class DatabaseConfig implements Types.DatabaseConfig {
    dialect = process.env.DB_DIALECT;
    database = process.env.PGDATABASE;
    user = process.env.PGUSER;
    password = process.env.PGPASSWORD;
    host = process.env.DBHOST;
    max = 1;
    idleTimeoutMillis: 1000;
    storage = path.resolve(__dirname, '..', '..', 'storage', 'db', 'app.sqlite');
}
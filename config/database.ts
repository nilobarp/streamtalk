import { Types } from '../core';
import * as path from 'path';

export class DatabaseConfig implements Types.DatabaseConfig {
    dialect = process.env.DB_DIALECT;
    database = process.env.DB_NAME;
    user = process.env.DB_USER;
    password = process.env.DB_PASSWORD;
    host = process.env.DB_HOST;
    max = 1;
    idleTimeoutMillis: 1000;
    storage = path.resolve(__dirname, '..', '..', 'storage', 'db', `${process.env.DB_NAME}.sqlite`);
}
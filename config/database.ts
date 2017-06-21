import { Types } from '../core';

export class DatabaseConfig implements Types.DatabaseConfig {
    database = process.env.PGDATABASE;
    user = process.env.PGUSER;
    password = process.env.PGPASSWORD;
    host = process.env.DBHOST;
    max = 1;
    idleTimeoutMillis: 1000;
}
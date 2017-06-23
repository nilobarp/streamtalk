import { DatabaseDialect } from './composite';

export abstract class DatabaseConfig {
    /**
     * Tpye of database (postgres, sqlite or mysql)
     */
    dialect: string;
    /**
     * Database name
     */
    database: string;
    /**
     * Database user
     */
    user: string;
    /**
     * Password for database user
     */
    password: string;
    /**
     * Port number
     */
    port?: number;
    /**
     * Database host
     */
    host?: string;
    /**
     * Require SSL?
     */
    ssl?: boolean;
    /**
     * Maxinum pool size
     */
    max?: number;
    /**
     * Minimum pool size
     */
    min?: number;
    /**
     * Recycle idle agents?
     */
    refreshIdle?: boolean;
    /**
     * Idle timeout (milliseconds)
     */
    idleTimeoutMillis?: number;
    reapIntervalMillis?: number;
    returnToHead?: boolean;
    applicationName?: string;
    /**
     * [Sqlite only] Database file location
     */
    storage?: string;
}
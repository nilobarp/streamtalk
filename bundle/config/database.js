"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseConfig {
    constructor() {
        this.database = process.env.PGDATABASE;
        this.user = process.env.PGUSER;
        this.password = process.env.PGPASSWORD;
        this.host = process.env.DBHOST;
        this.max = 1;
    }
}
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.js.map
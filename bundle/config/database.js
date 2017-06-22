"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const path = require("path");
class DatabaseConfig {
    constructor() {
        this.dialect = core_1.Types.DatabaseDialect.sqlite;
        this.database = process.env.PGDATABASE;
        this.user = process.env.PGUSER;
        this.password = process.env.PGPASSWORD;
        this.host = process.env.DBHOST;
        this.max = 1;
        this.storage = path.resolve(__dirname, '..', '..', 'storage', 'db', 'app.sqlite');
    }
}
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.js.map
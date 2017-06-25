"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var DatabaseConfig = (function () {
    function DatabaseConfig() {
        this.dialect = process.env.DB_DIALECT;
        this.database = process.env.PGDATABASE;
        this.user = process.env.PGUSER;
        this.password = process.env.PGPASSWORD;
        this.host = process.env.DBHOST;
        this.max = 1;
        this.storage = path.resolve(__dirname, '..', '..', 'storage', 'db', 'app.sqlite');
    }
    return DatabaseConfig;
}());
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.js.map
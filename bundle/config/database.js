"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseConfig = (function () {
    function DatabaseConfig() {
        this.database = process.env.PGDATABASE;
        this.user = process.env.PGUSER;
        this.password = process.env.PGPASSWORD;
        this.host = process.env.DBHOST;
        this.max = 1;
    }
    return DatabaseConfig;
}());
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.js.map
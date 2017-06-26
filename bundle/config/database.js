"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var DatabaseConfig = (function () {
    function DatabaseConfig() {
        this.dialect = process.env.DB_DIALECT;
        this.database = process.env.DB_NAME;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.host = process.env.DB_HOST;
        this.max = 1;
        this.storage = path.resolve(__dirname, '..', '..', 'storage', 'db', process.env.DB_NAME + ".sqlite");
    }
    return DatabaseConfig;
}());
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.js.map
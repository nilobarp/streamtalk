#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var program = require("commander");
program
    .usage('-n <migration_name>')
    .option('-i, --id [identifier]', '(Required) Identifying name of the migration')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    console.error('\n  Missing migration name');
    program.outputHelp();
    process.exit(-1);
}
function timestamp() {
    var currentTimestamp = '' +
        new Date().getUTCFullYear() +
        ('0' + (new Date().getUTCMonth() + 1)).substr(-2) +
        ('0' + (new Date().getUTCDate())).substr(-2) +
        ('0' + (new Date().getUTCHours())).substr(-2) +
        ('0' + (new Date().getUTCMinutes())).substr(-2) +
        ('0' + (new Date().getUTCSeconds())).substr(-2) +
        ('00' + (new Date().getUTCMilliseconds())).substr(-3);
    return currentTimestamp;
}
var migarationName = timestamp() + '_' + sanitizeFilename(program.id) + '.ts';
var migrationsDir = path.resolve(__dirname, '..', '..', 'database', 'migrations');
var fullPathOfMigration = path.resolve(migrationsDir, migarationName);
var template = "\nimport { Umzug } from 'umzug';\nimport { QueryInterface } from 'sequelize';\n\nconst tableName: string = '';\n\nmodule.exports = {\n    up: function(query: QueryInterface, DataTypes) {\n        // add database changes here\n    },\n\n    down: function(query: QueryInterface, DataTypes) {\n        // reverse the changes added to 'up'\n    }\n};\n";
fs.readdirSync(migrationsDir).map(function (file) {
    var migrationId = file.substr(18);
    if (migrationId === sanitizeFilename(program.id) + '.ts') {
        console.error("Migration identifier " + program.id + " already exists. Please use a different identifier.");
        process.exit(-1);
    }
});
try {
    fs.writeFileSync(fullPathOfMigration, '// ' + migarationName + '\n' + template);
    console.log('Created: ' + migarationName);
}
catch (err) {
    console.error(err.message);
}
function sanitizeFilename(name) {
    return name.replace(/[\b\.$\*^&@!~`'";:|\/\\]/, '_');
}
//# sourceMappingURL=ht-db-migration-new.js.map
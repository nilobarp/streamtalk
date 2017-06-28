#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var path = require("path");
var Umzug = require("umzug");
var core_1 = require("../core");
require("../config/ioc-bindings");
program
    .usage('-e <environment>')
    .option('-e, --env [environment]', '(Required) Environment for which migrations are to be executed')
    .parse(process.argv);
if (!program.env) {
    console.error('\n  Missing environment\n  To migrate for Production use -e PROD');
    program.outputHelp();
    process.exit(-1);
}
var nodeEnv = process.env.NODE_ENV;
process.env.NODE_ENV = program.env ? (program.env.toUpperCase() === 'PROD' ? '' : program.env) : '';
var rootPath = path.resolve(__dirname, '..');
var migrationsFolder = path.resolve(rootPath, '..', 'database', 'migrations');
var bootstrap = new core_1.Bootstrap(rootPath);
var database = core_1.IOC.Container.get(core_1.Database);
var sequelize = database.instance;
var DB_NAME = database.config.database;
var DB_USER = database.config.user;
var umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(),
            sequelize.constructor,
            function () {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            }
        ],
        path: path.resolve(__dirname, '..', 'database', 'migrations'),
        pattern: /\.js$/
    }
});
function logUmzugEvent(eventName) {
    return function (name, migration) {
        console.log(name + " " + eventName);
    };
}
umzug.on('reverted', logUmzugEvent('reverted'));
function cmdStatus() {
    var result = {};
    return umzug.executed()
        .then(function (executed) {
        result.executed = executed;
        return umzug.pending();
    }).then(function (pending) {
        result.pending = pending;
        return result;
    }).then(function (_a) {
        var executed = _a.executed, pending = _a.pending;
        executed = executed.map(function (m) {
            m.name = path.basename(m.file, '.js');
            return m;
        });
        pending = pending.map(function (m) {
            m.name = path.basename(m.file, '.js');
            return m;
        });
        var current = executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>';
        var status = {
            current: current,
            executed: executed.map(function (m) { return m.file; }),
            pending: pending.map(function (m) { return m.file; })
        };
        console.log(JSON.stringify(status, undefined, 2));
        return { executed: executed, pending: pending };
    });
}
function cmdReset() {
    return umzug.down({ to: 0 });
}
var cmd = 'down';
console.log(cmd.toUpperCase() + " BEGIN");
var executedCmd = cmdReset();
executedCmd
    .then(function (result) {
    var doneStr = cmd.toUpperCase() + " DONE";
    console.log(doneStr);
    console.log('='.repeat(doneStr.length));
})
    .catch(function (err) {
    var errorStr = cmd.toUpperCase() + " ERROR";
    console.log(errorStr);
    console.log('='.repeat(errorStr.length));
    console.log(err);
    console.log('='.repeat(errorStr.length));
})
    .then(function () {
    return cmdStatus();
})
    .then(function () { return process.exit(0); });
//# sourceMappingURL=ht-db-migration-down.js.map
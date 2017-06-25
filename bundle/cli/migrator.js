#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var path = require("path");
var child_process = require("child_process");
var Promise = require("bluebird");
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
    },
    logging: function () {
        console.log.apply(undefined, arguments);
    }
});
function logUmzugEvent(eventName) {
    return function (name, migration) {
        console.log(name + " " + eventName);
    };
}
umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated', logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
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
function cmdMigrate() {
    return umzug.up();
}
function cmdMigrateNext() {
    return cmdStatus()
        .then(function (_a) {
        var executed = _a.executed, pending = _a.pending;
        if (pending.length === 0) {
            return Promise.reject(new Error('No pending migrations'));
        }
        var next = pending[0].name;
        return umzug.up({ to: next });
    });
}
function cmdReset() {
    return umzug.down({ to: 0 });
}
function cmdResetPrev() {
    return cmdStatus()
        .then(function (_a) {
        var executed = _a.executed, pending = _a.pending;
        if (executed.length === 0) {
            return Promise.reject(new Error('Already at initial state'));
        }
        var prev = executed[executed.length - 1].name;
        return umzug.down({ to: prev });
    });
}
function cmdHardReset() {
    return new Promise(function (resolve, reject) {
        setImmediate(function () {
            try {
                console.log("dropdb " + DB_NAME);
                child_process.spawnSync("dropdb " + DB_NAME);
                console.log("createdb " + DB_NAME + " --username " + DB_USER);
                child_process.spawnSync("createdb " + DB_NAME + " --username " + DB_USER);
                resolve();
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        });
    });
}
var cmd = process.argv[2].trim();
var executedCmd;
console.log(cmd.toUpperCase() + " BEGIN");
switch (cmd) {
    case 'status':
        executedCmd = cmdStatus();
        break;
    case 'up':
    case 'migrate':
        executedCmd = cmdMigrate();
        break;
    case 'next':
    case 'migrate-next':
        executedCmd = cmdMigrateNext();
        break;
    case 'down':
    case 'reset':
        executedCmd = cmdReset();
        break;
    case 'prev':
    case 'reset-prev':
        executedCmd = cmdResetPrev();
        break;
    case 'reset-hard':
        executedCmd = cmdHardReset();
        break;
    default:
        console.log("invalid cmd: " + cmd);
        process.exit(1);
}
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
    if (cmd !== 'status' && cmd !== 'reset-hard') {
        return cmdStatus();
    }
    return Promise.resolve();
})
    .then(function () { return process.exit(0); });
//# sourceMappingURL=migrator.js.map
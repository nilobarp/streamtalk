#!/usr/bin/env node

import * as program from 'commander';
import * as path from 'path';
import * as child_process from 'child_process';
import * as Promise from 'bluebird';
import * as Umzug from 'umzug';
import { Bootstrap, IOC, Types, Database } from '../core';
import '../config/ioc-bindings';

program
    .usage('-e <environment>')
    .option('-e, --env [environment]', '(Required) Environment for which migrations are to be executed')
    .option('-h, --hard', 'Hard reset database')
    .parse(process.argv);

if (!program.env) {
    console.error('\n  Missing environment\n  To migrate for Production use -e PROD');
    program.outputHelp();
    process.exit(-1);
}

const nodeEnv = process.env.NODE_ENV;
process.env.NODE_ENV = program.env ? (program.env.toUpperCase() === 'PROD' ? '' : program.env) : '';

let rootPath: string = path.resolve(__dirname, '..');
let migrationsFolder = path.resolve(rootPath, '..', 'database', 'migrations');

let bootstrap: Bootstrap = new Bootstrap(rootPath);

let database: Database = IOC.Container.get(Database);
const sequelize = database.instance;

const DB_NAME = database.config.database;
const DB_USER = database.config.user;

const umzug: any = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize
    },

    // see: https://github.com/sequelize/umzug/issues/17
    migrations: {
        params: [
            sequelize.getQueryInterface(), // queryInterface
            sequelize.constructor, // DataTypes
            function() {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            }
        ],
        path: path.resolve(__dirname, '..', 'database', 'migrations'),
        pattern: /\.js$/
    }
});

function logUmzugEvent(eventName) {
    return function(name, migration) {
        console.log(`${ name } ${ eventName }`);
    };
}

umzug.on('reverted',  logUmzugEvent('reverted'));

function cmdReset() {
    return umzug.down({ to: 0 });
}

function cmdHardReset() {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            try {
                console.log(`dropdb ${ DB_NAME }`);
                child_process.spawnSync(`dropdb ${ DB_NAME }`);
                console.log(`createdb ${ DB_NAME } --username ${ DB_USER }`);
                child_process.spawnSync(`createdb ${ DB_NAME } --username ${ DB_USER }`);
                resolve();
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    });
}

let cmd;
let executedCmd;

if (program.hard) {
    cmd = 'hard reset';
    console.log(`${ cmd.toUpperCase() } BEGIN`);
    executedCmd = cmdHardReset();
} else {
    cmd = 'reset';
    console.log(`${ cmd.toUpperCase() } BEGIN`);
    executedCmd = cmdReset();
}

executedCmd
    .then((result) => {
        const doneStr = `${ cmd.toUpperCase() } DONE. `;
        console.log(doneStr);
        console.log('='.repeat(doneStr.length));
    })
    .catch(err => {
        const errorStr = `${ cmd.toUpperCase() } ERROR`;
        console.log(errorStr);
        console.log('='.repeat(errorStr.length));
        console.log(err);
        console.log('='.repeat(errorStr.length));
    })
    .then(() => {
        return Promise.resolve();
    })
    .then(() => {
        process.exit(0);
    });
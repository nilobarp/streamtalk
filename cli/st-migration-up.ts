#!/usr/bin/env node
import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { IOC, Types, DbPool, Bootstrap, Client } from 'StreamTalk';
import '../config/ioc-bindings';

program
    .usage('-e <environment>')
    .option('-e, --env [environment]', '(Required) Environment for which migrations are to be executed')
    .parse(process.argv);

if (!program.env) {
    console.error('\n  Missing environment\n  To migrate for Production use -e PROD');
    program.outputHelp();
    process.exit(-1);
}

const nodeEnv = process.env.NODE_ENV;
process.env.NODE_ENV = program.env ? (program.env.toUpperCase() === 'PROD' ? '' : program.env) : '';

let rootPath: string = path.resolve(__dirname, '..');
let bootstrap: Bootstrap = new Bootstrap(rootPath);

let dbConf: Types.DatabaseConfig = IOC.Container.get(Types.DatabaseConfig);
if(dbConf.database === undefined) {
    // TODO: Clean up error messages
    console.error('Can\'t read database config. Did you bind the implementation in IOC container?');
    process.exit(-1);
}

IOC.Container.bind(DbPool).to(DbPool).scope(IOC.Scope.Local);
let db: DbPool = IOC.Container.get(DbPool);

let query = db.query('SELECT 1::int');
query.then((results) => {
    console.log(results);
});

// let client = new Client(dbConf);
// client.connect((err) => {
//     console.error(err);
// });

// let query = client.query('SELECT 1::int as number').then((value) => {
//     console.log(value.rows[0].number);
//     client.end();
// }).catch((reason) => {
//     console.error(reason);
// });

process.env.NODE_ENV = nodeEnv;
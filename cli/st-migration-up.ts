#!/usr/bin/env node
import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { IOC, Types, Bootstrap, Database } from 'StreamTalk';
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

let db: Database = IOC.Container.get(Database);
let client = db.client;
getMigrations();
client.tx((t) => {
    // for (let i =0 ; i < 100; i++) {
    //     t.none('INSERT INTO users (username, password) values (\'user' + i + '\',\'password' + i + '\')');
    // }
    // t.none('INSERT INTO users (username) values (user)');
    return t.sequence(source, {limit: 100000});
}).then(value => {
    console.log('Tx completed');
}).catch((err) => {
    console.log('Tx rolledback', err);
});

// tslint:disable-next-line:no-var-keyword
var migrations: string[];

function getMigrations () {
    let migrationsFolder: string = path.resolve(rootPath, '..', 'database', 'migrations');
    migrations = fs.readdirSync(migrationsFolder).filter((migration) => { return migration.substr(-3) === '.js'; });
    migrations.map((migration) => { return path.join(migrationsFolder, migration); });
    console.log(migrations);
    // for(let migration of migrations) {
    //     let up = require(path.join(migrationsFolder, migration)).up;
    //     console.log(up);
    // }
    // // let up = require()
    // console.log(migrationsFolder);
}

function * source (index) {
    if (index < migrations.length) {
        let up = require(migrations[index]).up;
        return yield this.any(up);
    }
}

process.env.NODE_ENV = nodeEnv;
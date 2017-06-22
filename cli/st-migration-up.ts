#!/usr/bin/env node
import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { Bootstrap, IOC, Types, Database } from '../core';
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
import { User } from '../app/models/user.model';
import { Inventory } from '../app/models/inventory.model';

async function migrator () {
    try {
        await User.sync({force: false});
        await Inventory.sync({force: false});
    } catch (err) {
        throw err;
    } finally {
        const database: Database = IOC.Container.get(Database);
        database.close();
    }
}

migrator().then(() => console.log('Migration complete.'));

process.env.NODE_ENV = nodeEnv;
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fs = require("fs");
const path = require("path");
const StreamTalk_1 = require("StreamTalk");
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
const nodeEnv = process.env.NODE_ENV;
process.env.NODE_ENV = program.env ? (program.env.toUpperCase() === 'PROD' ? '' : program.env) : '';
let rootPath = path.resolve(__dirname, '..');
let bootstrap = new StreamTalk_1.Bootstrap(rootPath);
let dbConf = StreamTalk_1.IOC.Container.get(StreamTalk_1.Types.DatabaseConfig);
if (dbConf.database === undefined) {
    console.error('Can\'t read database config. Did you bind the implementation in IOC container?');
    process.exit(-1);
}
let db = StreamTalk_1.IOC.Container.get(StreamTalk_1.Database);
let client = db.client;
getMigrations();
client.tx((t) => {
    return t.sequence(source, { limit: 100000 });
}).then(value => {
    console.log('Tx completed');
}).catch((err) => {
    console.log('Tx rolledback', err);
});
var migrations;
function getMigrations() {
    let migrationsFolder = path.resolve(rootPath, '..', 'database', 'migrations');
    migrations = fs.readdirSync(migrationsFolder).filter((migration) => { return migration.substr(-3) === '.js'; });
    migrations.map((migration) => { return path.join(migrationsFolder, migration); });
    console.log(migrations);
}
function* source(index) {
    if (index < migrations.length) {
        let up = require(migrations[index]).up;
        return yield this.any(up);
    }
}
process.env.NODE_ENV = nodeEnv;
//# sourceMappingURL=st-migration-up.js.map
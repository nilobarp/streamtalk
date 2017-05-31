#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var path = require("path");
var StreamTalk_1 = require("StreamTalk");
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
var bootstrap = new StreamTalk_1.Bootstrap(rootPath);
var dbConf = StreamTalk_1.IOC.Container.get(StreamTalk_1.Types.DatabaseConfig);
if (dbConf.database === undefined) {
    console.error('Can\'t read database config. Did you bind the implementation in IOC container?');
    process.exit(-1);
}
StreamTalk_1.IOC.Container.bind(StreamTalk_1.DbPool).to(StreamTalk_1.DbPool).scope(StreamTalk_1.IOC.Scope.Local);
var db = StreamTalk_1.IOC.Container.get(StreamTalk_1.DbPool);
var query = db.query('SELECT 1::int');
query.then(function (results) {
    console.log(results);
});
process.env.NODE_ENV = nodeEnv;
//# sourceMappingURL=st-migration-up.js.map
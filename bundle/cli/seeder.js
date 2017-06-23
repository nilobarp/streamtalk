#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const path = require("path");
const fs = require("fs");
const core_1 = require("../core");
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
let seedsFolder = path.resolve(rootPath, 'database', 'seeds');
let bootstrap = new core_1.Bootstrap(rootPath);
if (fs.existsSync(seedsFolder)) {
    let seeds = fs.readdirSync(seedsFolder).filter(seed => { return seed.substr(-3) === '.js'; });
    for (let seed of seeds) {
        let seeder = require(path.join(seedsFolder, seed));
        if (seeder.seed.environment.find((value, index) => { return value.toLowerCase() === process.env.NODE_ENV; })) {
            console.log(`=> ${seed}`);
            seeder.seed.run()
                .then(() => {
                console.log(`=> Done`);
            })
                .catch((err) => {
                console.log('=> Error: ');
                console.error(err.message);
            });
        }
        else {
            console.log(`The seed file '${seed}' doesnot apply to the current environment '${process.env.NODE_ENV}'`);
        }
    }
}
else {
    console.log('Seeds folder doesn\'t exist');
    process.exit(-1);
}
//# sourceMappingURL=seeder.js.map
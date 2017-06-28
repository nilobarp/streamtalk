#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var path = require("path");
var fs = require("fs");
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
var seedsFolder = path.resolve(rootPath, 'database', 'seeds');
var bootstrap = new core_1.Bootstrap(rootPath);
if (fs.existsSync(seedsFolder)) {
    var seeds = fs.readdirSync(seedsFolder).filter(function (seed) { return seed.substr(-3) === '.js'; });
    for (var _i = 0, seeds_1 = seeds; _i < seeds_1.length; _i++) {
        var seed = seeds_1[_i];
        var seeder = require(path.join(seedsFolder, seed));
        if (seeder.seed.environment.find(function (value, index) { return value.toLowerCase() === process.env.NODE_ENV; })) {
            console.log("=> " + seed);
            seeder.seed.run()
                .then(function () {
                console.log("=> Done");
            })
                .catch(function (err) {
                console.log('=> Error: ');
                console.error(err.message);
            });
        }
        else {
            console.log("The seed file '" + seed + "' doesnot apply to the current environment '" + process.env.NODE_ENV + "'");
        }
    }
}
else {
    console.log('Seeds folder doesn\'t exist');
    process.exit(-1);
}
//# sourceMappingURL=ht-db-seed.js.map
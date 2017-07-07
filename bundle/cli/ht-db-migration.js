#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var programVersion = '1.0.0';
program.version("htHero CLI: " + programVersion)
    .command('new', 'Create a new migration file')
    .command('status', 'Current status of migrations')
    .command('up', 'Execute pending migrations')
    .command('down', 'Revert executed migrations')
    .command('reset', 'Reset database to initial stage')
    .command('next', 'Run next migration')
    .command('prev', 'Run previous migration')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=ht-db-migration.js.map
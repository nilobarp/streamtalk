#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
program
    .usage('[command] [options]')
    .command('new', 'Create new migration file')
    .command('up', 'Run pending migrations')
    .command('um', 'Umzug migrations')
    .command('down', 'Revert executed migrations')
    .command('refresh', 'Re-run all migrations. Existing data will be deleted.')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=st-migration.js.map
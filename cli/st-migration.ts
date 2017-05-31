#!/usr/bin/env node
import * as program from 'commander';

program
    .usage('[command] [options]')
    .command('new', 'Create new migration file')
    .command('up', 'Run pending migrations')
    .command('down', 'Revert executed migrations')
    .command('refresh', 'Re-run all migrations. Existing data will be deleted.')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
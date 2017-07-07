#!/usr/bin/env node

import * as program from 'commander';
import * as path from 'path';

const programVersion = '1.0.0';

program.version(`htHero CLI: ${programVersion}`)
    .command('migration', 'DB migrations')
    .command('seed', 'Seed environment specific databases')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
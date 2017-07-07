#!/usr/bin/env node

import * as program from 'commander';
import * as path from 'path';

const programVersion = '1.0.0';

program.version(`htHero CLI: ${programVersion}`)
    .command('db [migration]', 'DB tasks')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
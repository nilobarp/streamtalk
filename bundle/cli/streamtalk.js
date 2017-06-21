#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../config/ioc-bindings");
const program = require("commander");
const programVersion = '1.0.0';
program.version(`StreamTalk CLI: ${programVersion}`)
    .usage('[command] [sub-command]')
    .command('migration [new]', 'Create a new migration file')
    .command('migration [up]', 'Run pending migrations')
    .command('migration [down]', 'Revert executed migrations')
    .command('migration [refresh]', 'Re-run all migrations')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=streamtalk.js.map
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var programVersion = '1.0.0';
program.version("htHero CLI: " + programVersion)
    .command('db [migration]', 'DB tasks')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=ht.js.map
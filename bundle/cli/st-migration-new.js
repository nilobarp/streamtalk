#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var fs = require("fs");
var path = require("path");
program
    .usage('-f <filename> [-t]')
    .option('-f, --file [name]', '(Required) Name the migration')
    .option('-t, --template', 'Include boilerplate code')
    .parse(process.argv);
if (!program.file) {
    console.error('\n  Missing filename');
    program.outputHelp();
    process.exit(-1);
}
var rootLocation = path.resolve('.');
var migrationFolder = path.join(rootLocation, 'database', 'migrations');
if (fs.existsSync(migrationFolder)) {
    var now = new Date();
    var version = '' + now.getFullYear() + now.getMonth() + now.getDate()
        + now.getUTCHours() + now.getUTCMinutes() + now.getUTCSeconds() + now.getUTCMilliseconds();
    var migrationFile = path.join(migrationFolder, normalizeFilename(program.file) + '_' + version + '.js');
    console.log('Writing to: ' + migrationFile);
    fs.writeFileSync(migrationFile, '/*Migration: ' + migrationFile + '*/');
}
else {
    console.error('Migration folder not found. Aborting...');
}
function normalizeFilename(text) {
    return text.replace(/[\s~!@#$:,^&\*\\\/]/, '_');
}
//# sourceMappingURL=st-migration-new.js.map
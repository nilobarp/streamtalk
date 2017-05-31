#!/usr/bin/env node
import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';

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

const rootLocation = path.resolve('.');
const migrationFolder = path.join(rootLocation, 'database', 'migrations');

if (fs.existsSync(migrationFolder)) {
    let now = new Date();
    let version = '' + now.getFullYear() + now.getMonth() + now.getDate()
                    + now.getUTCHours() + now.getUTCMinutes() + now.getUTCSeconds() + now.getUTCMilliseconds();
    let migrationFile = path.join(migrationFolder, normalizeFilename(program.file) + '_' + version + '.js');
    console.log('Writing to: ' + migrationFile);
    fs.writeFileSync(migrationFile, '/*Migration: ' + migrationFile + '*/');
} else {
    console.error('Migration folder not found. Aborting...');
}

function normalizeFilename (text: string) {
    return text.replace(/[\s~!@#$:,^&\*\\\/]/, '_');
}
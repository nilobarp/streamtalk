#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs';
import * as program from 'commander';

program
    .usage('-n <migration_name>')
    .option('-i, --id [identifier]', '(Required) Identifying name of the migration')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    console.error('\n  Missing migration name');
    program.outputHelp();
    process.exit(-1);
}

function timestamp() {
    let currentTimestamp = '' +
    new Date().getUTCFullYear() +
    ('0' + (new Date().getUTCMonth() + 1) ).substr(-2) +
    ('0' + (new Date().getUTCDate())).substr(-2) +
    ('0' + (new Date().getUTCHours())).substr(-2) +
    ('0' + (new Date().getUTCMinutes())).substr(-2) +
    ('0' + (new Date().getUTCSeconds())).substr(-2) +
    ('00' + (new Date().getUTCMilliseconds())).substr(-3);

    return currentTimestamp;
}

let migarationName = timestamp() + '_' + sanitizeFilename(program.id) + '.ts';
let migrationsDir = path.resolve(__dirname, '..', '..', 'database', 'migrations');
let fullPathOfMigration = path.resolve(migrationsDir, migarationName);

const template: string = `
import { Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';

const tableName: string = '';

module.exports = {
    up: function(query: QueryInterface, DataTypes) {
        // add database changes here
    },

    down: function(query: QueryInterface, DataTypes) {
        // reverse the changes added to 'up'
    }
};
`;

fs.readdirSync(migrationsDir).map((file) => {
    let migrationId = file.substr(18);
    if (migrationId === sanitizeFilename(program.id) + '.ts') {
        console.error(`Migration identifier ${program.id} already exists. Please use a different identifier.`);
        process.exit(-1);
    }
});

try {
    fs.writeFileSync(fullPathOfMigration, '// ' + migarationName + '\n' + template);
    console.log('Created: ' + migarationName);
} catch(err) {
    console.error(err.message);
}

function sanitizeFilename (name: string) {
    return name.replace(/[\b\.$\*^&@!~`'";:|\/\\]/, '_');
}
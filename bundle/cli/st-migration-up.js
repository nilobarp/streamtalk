#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const path = require("path");
const core_1 = require("../core");
require("../config/ioc-bindings");
program
    .usage('-e <environment>')
    .option('-e, --env [environment]', '(Required) Environment for which migrations are to be executed')
    .parse(process.argv);
if (!program.env) {
    console.error('\n  Missing environment\n  To migrate for Production use -e PROD');
    program.outputHelp();
    process.exit(-1);
}
const nodeEnv = process.env.NODE_ENV;
process.env.NODE_ENV = program.env ? (program.env.toUpperCase() === 'PROD' ? '' : program.env) : '';
let rootPath = path.resolve(__dirname, '..');
let migrationsFolder = path.resolve(rootPath, '..', 'database', 'migrations');
let bootstrap = new core_1.Bootstrap(rootPath);
const user_model_1 = require("../app/models/user.model");
const inventory_model_1 = require("../app/models/inventory.model");
function migrator() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_model_1.User.sync({ force: true });
            yield inventory_model_1.Inventory.sync({ force: true });
        }
        catch (err) {
            throw err;
        }
        finally {
            const database = core_1.IOC.Container.get(core_1.Database);
            database.close();
        }
    });
}
migrator().then(() => console.log('Migration complete.'));
process.env.NODE_ENV = nodeEnv;
//# sourceMappingURL=st-migration-up.js.map
import * as mocha from 'mocha';
import * as path from 'path';
import { Constants } from '../core/string.constants';
import { loadEnvironment, IOC } from '../core';
import { DatabaseConfig as dbConfigType } from '../core/types';
import { DatabaseConfig } from '../config/database';

loadEnvironment(path.join(__dirname, '..', '..'));
process.env[Constants.VAR_ROOT_PATH] = path.join(__dirname, 'artefacts', 'tmp');

IOC.Container.bind(dbConfigType).to(DatabaseConfig).scope(IOC.Scope.Local);
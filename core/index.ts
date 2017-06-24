import { Bootstrap } from './bootstrap';
import * as IOC from 'typescript-ioc/es6';
import * as Types from './types';
// import * as Decorators from './decorators';
import * as Decorators from 'core-decorators';
import { LogProvider } from './log.provider';
import { I18N } from './i18n.provider';
import { loadEnvironment } from './helpers/env';
import { Database } from './database';

export {
    Bootstrap,
    IOC,
    Types,
    Decorators,
    LogProvider,
    I18N,
    loadEnvironment,
    Database
};
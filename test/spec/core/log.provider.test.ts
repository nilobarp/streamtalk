import * as mocha from 'mocha';
import * as chai from 'chai';
import * as path from 'path';
import * as fs from 'fs';
import * as Bunyan from 'bunyan';
import { LogProvider } from '../../../core/log.provider';
import { Constants } from '../../../core/string.constants';

const expect = chai.expect;
const logPath = path.resolve(__dirname, '..', '..', 'artefacts', 'tmp');
const STR_DEBUG_VAR: string = 'DEBUG';
const STR_NODE_ENV: string = 'NODE_ENV';

describe('log provider', () => {
    before((done) => {
        process.env[Constants.VAR_ROOT_PATH] = logPath;
        done();
    });

    it('creates logger instance', (done) => {
        let provider = new LogProvider();
        let logger = provider.factory();
        expect(logger).to.be.instanceOf(Bunyan);
        done();
    });

    it ('creates child instances', (done) => {
        let stdoutLogger: Bunyan = Bunyan.createLogger({
            name: 'child-logger',
            serializers: Bunyan.stdSerializers,
            streams: [{
                level: Bunyan.INFO,
                stream: process.stdout
            }]
        });
        let provider = new LogProvider();
        let logger = provider.factory(stdoutLogger);
        expect(logger).to.be.instanceOf(Bunyan);
        done();
    });

    it ('sets log level from DEBUG environment var', (done) => {
        process.env[STR_DEBUG_VAR] = 'trace';
        let provider = new LogProvider();
        let logger = provider.factory();
        expect(logger.level()).to.equal(Bunyan.TRACE);

        process.env[STR_DEBUG_VAR] = 'debug';
        provider = new LogProvider();
        logger = provider.factory();
        expect(logger.level()).to.equal(Bunyan.DEBUG);

        process.env[STR_DEBUG_VAR] = 'info';
        provider = new LogProvider();
        logger = provider.factory();
        expect(logger.level()).to.equal(Bunyan.INFO);

        process.env[STR_DEBUG_VAR] = 'warn';
        provider = new LogProvider();
        logger = provider.factory();
        expect(logger.level()).to.equal(Bunyan.WARN);

        process.env[STR_DEBUG_VAR] = 'fatal';
        provider = new LogProvider();
        logger = provider.factory();
        expect(logger.level()).to.equal(Bunyan.FATAL);

        process.env[STR_DEBUG_VAR] = 'error';
        provider = new LogProvider();
        logger = provider.factory();
        expect(logger.level()).to.equal(Bunyan.ERROR);

        done();
    });

    it ('default log level is ERROR', (done) => {
        process.env[STR_DEBUG_VAR] = undefined;
        process.env[STR_NODE_ENV] = 'dev';

        let provider = new LogProvider();
        let logger = provider.factory();
        expect(logger.level()).to.equal(Bunyan.ERROR);
        done();
    });

    it ('turns off logging in TEST environment if DEBUG level is not set', (done) => {
        process.env[STR_DEBUG_VAR] = undefined;
        process.env[STR_NODE_ENV] = 'test';
        let provider = new LogProvider();
        let logger = provider.factory();
        expect(logger.level()).to.equal(Bunyan.FATAL + 1);
        done();
    });

    it ('logger is singleton', (done) => {
        let provider = new LogProvider();
        let logger = provider.factory();
        let logger2 = provider.factory();
        expect(logger).to.be.equal(logger2);
        done();
    });

    after((done) => {
        process.env[STR_DEBUG_VAR] = undefined;
        process.env[STR_NODE_ENV] = 'test';
        delete(process.env[STR_DEBUG_VAR]);
        deleteFolderRecursive(path.resolve(logPath, '..', 'storage'));
        done();
    });
});

let deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            let curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
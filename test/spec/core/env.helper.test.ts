import * as mocha from 'mocha';
import * as chai from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import { loadEnvironment } from '../../../core/helpers/env';
const expect = chai.expect;
const STR_ENV_VAR_KEY: string = 'ENV_VAR';
const STR_ENV_VAR_VALUE: string = 'SOME_VALUE';
const STR_ENV_VAR: string = `${STR_ENV_VAR_KEY}=${STR_ENV_VAR_VALUE}`;
const STR_NODE_ENV_VAR_KEY: string = 'NODE_ENV';
const STR_EXISTING_VAR_KEY: string = 'EXISTING_VAR';
const STR_COMMENTED_VAR_KEY: string = 'COMMENTED_VAR';

let currentEnv: string = 'test';

describe ('ENV Helper', () => {
    beforeEach(() => {
        currentEnv = process.env[STR_NODE_ENV_VAR_KEY];
    });

    afterEach(() => {
        cleanUp();
        process.env[STR_NODE_ENV_VAR_KEY] = currentEnv;
    });

    it ('loads .env from root', (done) => {
        genDotEnv('test', STR_ENV_VAR);
        loadEnvironment(path.resolve(__dirname));
        expect(process.env[STR_ENV_VAR]).to.equal(STR_ENV_VAR_VALUE);
        done();
    });

    it ('loads environment specific file', (done) => {
        process.env[STR_NODE_ENV_VAR_KEY]='dev';
        genDotEnv('dev', STR_ENV_VAR);
        loadEnvironment(path.resolve(__dirname));
        expect(process.env[STR_ENV_VAR]).to.equal(STR_ENV_VAR_VALUE);
        done();
    });

    it ('throws if variable format is wrong', (done) => {
        genDotEnv('test', 'SOMEVAR=');
        expect(() => loadEnvironment(path.resolve(__dirname)))
            .to.throw('Environment variable SOMEVAR= is not valid');
        done();
    });

    it ('doesn\'t override existing env variables', (done) => {
        process.env[STR_EXISTING_VAR_KEY] = 'OLD_VALUE';
        genDotEnv('test', 'EXISTING_VAR=NEW_VALUE');
        loadEnvironment(path.resolve(__dirname));
        expect(process.env[STR_EXISTING_VAR_KEY]).to.equal('OLD_VALUE');
        done();
    });

    it ('ignores commented lines', (done) => {
        genDotEnv('test', '#COMMENTED_VAR=MUST_BE_UNDEFINED');
        loadEnvironment(path.resolve(__dirname));
        expect(process.env[STR_COMMENTED_VAR_KEY]).to.equal(undefined);
        done();
    });

    it ('looks for .env file one level up', (done) => {
        loadEnvironment(path.resolve(__dirname));
        done();
    });

    it ('defaults to prod environment', (done) => {
        process.env[STR_NODE_ENV_VAR_KEY]=undefined;
        genDotEnv('', STR_ENV_VAR);
        expect(process.env[STR_ENV_VAR]).to.equal(STR_ENV_VAR_VALUE);
        done();
    });
});

function genDotEnv (envType: string = '', contents: string) {
    let baseLocation = path.resolve(__dirname);
    let fileName = path.join(baseLocation, `.env${(envType ? '.' + envType: '')}`);
    fs.writeFileSync(fileName, contents);
}

function cleanUp () {
    let baseLocation = path.resolve(__dirname);
    let files = fs.readdirSync(baseLocation).filter((file) => {
        return file.match(/^\.env*/);
    });

    files.forEach((file) => {
        fs.unlink(path.join(baseLocation, file));
    });
}
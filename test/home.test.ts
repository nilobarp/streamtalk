import 'mocha';
import * as chai from 'chai';
import * as Request from 'request';
import { IOC, Types, Bootstrap } from 'StreamTalk';

let expect = chai.expect;

before(() => {
    let rootPath = '/Users/nilotpal/code/heroel/bundle';
    // IOC.Container.bind(Types.ServerConfig).to(SrvConf);
    let instance = new Bootstrap(rootPath);
});

describe('home', () => {
    it('root url is accessible', (done) => {
        expect(true).to.equal(false);
        done();
    });
});
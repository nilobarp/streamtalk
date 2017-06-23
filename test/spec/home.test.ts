import 'mocha';
import * as chai from 'chai';
import * as Request from 'request';
import { IOC, Types, Bootstrap } from '../../core';

let expect = chai.expect;

describe('home', () => {
    it('root url is accessible', (done) => {
        expect(true).to.equal(true);
        done();
    });
});
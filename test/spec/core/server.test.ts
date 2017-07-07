import * as mocha from 'mocha';
import * as chai from 'chai';
import * as path from 'path';
import * as request from 'supertest';
import { Server } from 'restify';
import { IOC } from '../../../core';
import { ServerConfig } from '../../../core/types';
import { StreamTalk } from '../../../core/streamtalk';
import { Bootstrap } from '../../../core/bootstrap';

const expect = chai.expect;
let app: Server;
let routesFolder = path.resolve(__dirname, '..', '..', 'artefacts', 'routes');

describe ('server', () => {
    before((done) => {
        class MockConfig implements ServerConfig {
            bindIP: string = '0.0.0.0';
            port: number = 57890;
            sslCert: string = '';
            privateKey: string = '';
            secretKey: string = 'app-secret-key';
            routesFolder: string = this.resolveRouteFolder();

            private resolveRouteFolder (): string {
                return path.resolve(routesFolder, 'valid-routes');
            }
        }

        IOC.Container.bind(ServerConfig).to(MockConfig).scope(IOC.Scope.Local);

        let booted = new Bootstrap(__dirname);
        booted.start();
        app = booted.instance;
        done();
    });

    after((done) => {
        app.close();
        done();
    });

    it ('handles get requests', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it ('handles post request', (done) => {
        request(app)
            .post('/')
            .expect(200, done);
    });

    it ('handles put request', (done) => {
        request(app)
            .put('/')
            .expect(200, done);
    });

    it ('handles head request', (done) => {
        request(app)
            .head('/')
            .expect(200, done);
    });

    it ('handles options request', (done) => {
        request(app)
            .options('/')
            .expect(200, done);
    });

    it ('handles delete request', (done) => {
        request(app)
            .del('/')
            .expect(200, done);
    });
});
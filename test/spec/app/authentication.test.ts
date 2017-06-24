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

describe ('authentication', () => {
    before((done) => {
        console.log('before authentication');
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
        console.log('after authentication');
        app.close();
        done();
    });
});
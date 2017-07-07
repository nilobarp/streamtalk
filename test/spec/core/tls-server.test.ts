import * as mocha from 'mocha';
import * as chai from 'chai';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'supertest';
import { Server } from 'restify';
import { IOC } from '../../../core';
import { ServerConfig } from '../../../core/types';
import { StreamTalk } from '../../../core/streamtalk';
import { Bootstrap } from '../../../core/bootstrap';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const expect = chai.expect;
let app: Server;
let artefacts = path.resolve(__dirname, '..', '..', '..', '..', 'test', 'artefacts');
let routesFolder = path.resolve(__dirname, '..', '..', 'artefacts', 'routes');

describe ('TLS server', () => {
    before((done) => {
        class MockConfig implements ServerConfig {
            bindIP: string = '0.0.0.0';
            port: number = 8443;
            sslCert: string = this.resolveCert();
            privateKey: string = this.resolveKey();
            secretKey: string = 'app-secret-key';
            routesFolder: string = this.resolveRouteFolder();

            private resolveRouteFolder (): string {
                return path.resolve(routesFolder, 'valid-routes');
            }

            private resolveCert (): string {
                let certFile: string = path.resolve(artefacts, 'certs', 'server', 'cert.pem');
                let cert: string = fs.readFileSync(certFile, 'utf-8');
                return cert;
            }

            private resolveKey (): string {
                let keyFile: string = path.resolve(artefacts, 'certs', 'server', 'privkey.pem');
                let key: string = fs.readFileSync(keyFile, 'utf-8');
                return key;
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

    it ('responds to / over https', (done) => {
        request('https://localhost:8443')
            .get('/')
            .expect(200, done);
    });
});
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as path from 'path';
import { Server } from 'restify';
import { IOC } from '../../../core';
import { Container, Scope } from 'typescript-ioc';
import { ServerConfig, AuthGuard } from '../../../core/types';
import { StreamTalk } from '../../../core/streamtalk';
import { Bootstrap } from '../../../core/bootstrap';

const expect = chai.expect;
let app: Server;
let routesFolder: string;

describe('bootstrap', () => {
    before((done) => {
        routesFolder = path.resolve(__dirname, '..', '..', 'artefacts', 'routes');
        done();
    });

    it ('creates a server instance', (done) => {
        class MockConfig implements ServerConfig {
            bindIP: string = '0.0.0.0';
            port: number = 57890;
            sslCert: string = '';
            privateKey: string = '';
            secretKey: string = 'app-secret-key';
            routesFolder: string = this.resolveRouteFolder();

            private resolveRouteFolder (): string {
                return path.resolve(routesFolder, 'non-protected-route');
            }
        }

        IOC.Container.bind(ServerConfig).to(MockConfig).scope(IOC.Scope.Local);

        let booted = new Bootstrap(__dirname);
        // tslint:disable-next-line:no-unused-expression
        expect(booted.instance).is.not.undefined;
        done();
    });

    it ('auth controller is optional if no routes are protected', (done) => {
        class MockConfig implements ServerConfig {
            bindIP: string = '0.0.0.0';
            port: number = 57890;
            sslCert: string = '';
            privateKey: string = '';
            secretKey: string = 'app-secret-key';
            routesFolder: string = this.resolveRouteFolder();

            private resolveRouteFolder (): string {
                return path.resolve(routesFolder, 'non-protected-route');
            }
        }

        IOC.Container.bind(ServerConfig).to(MockConfig).scope(IOC.Scope.Local);

        let instance = new Bootstrap(__dirname);
        expect(instance).to.be.instanceOf(Bootstrap);
        done();
    });

    it ('throws if app secret is not specified', (done) => {
        class MockConfig implements ServerConfig {
            bindIP: string = '0.0.0.0';
            port: number = 57890;
            sslCert: string = '';
            privateKey: string = '';
            secretKey: string = '';
            routesFolder: string = this.resolveRouteFolder();

            private resolveRouteFolder (): string {
                return path.resolve(routesFolder, 'non-protected-route');
            }
        }

        IOC.Container.bind(ServerConfig).to(MockConfig).scope(IOC.Scope.Local);

        let instance;
        try {
            instance = new Bootstrap(__dirname);
            instance.start();
            done(new Error('Expected to throw exception. None was thrown.'));
        } catch (err) {
            done();
        }

        instance.close();
    });

    it ('throws if routes folder was not found', (done) => {
        class MockConfig implements ServerConfig {
            bindIP: string = '0.0.0.0';
            port: number = 57890;
            sslCert: string = '';
            privateKey: string = '';
            secretKey: string = 'app-secret-key';
            routesFolder: string = this.resolveRouteFolder();

            private resolveRouteFolder (): string {
                return path.resolve(routesFolder, 'missing-folder');
            }
        }

        IOC.Container.bind(ServerConfig).to(MockConfig).scope(IOC.Scope.Local);

        try {
            let instance = new Bootstrap(__dirname);
            done(new Error('Expected to throw exception. None was thrown.'));
        } catch (err) {
            done();
        }
    });

    it.skip ('throws if auth controller is not configured', (done) => {
        class MockConfig implements ServerConfig {
            bindIP: string = '0.0.0.0';
            port: number = 57890;
            sslCert: string = '';
            privateKey: string = '';
            secretKey: string = 'app-secret-key';
            routesFolder: string = this.resolveRouteFolder();

            private resolveRouteFolder (): string {
                return path.resolve(routesFolder, 'protected-wo-auth');
            }
        }

        IOC.Container.bind(ServerConfig).to(MockConfig).scope(IOC.Scope.Local);
        class Dummy {}
        Container.bind(AuthGuard).to(Dummy).scope(Scope.Local);

        try {
            let instance = new Bootstrap(__dirname);
            done(new Error('Expected to throw exception. None was thrown.'));
        } catch (err) {
            done();
        }
    });
});
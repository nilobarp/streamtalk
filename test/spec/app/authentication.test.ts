import * as mocha from 'mocha';
import * as chai from 'chai';
import * as path from 'path';
import * as request from 'supertest';
import { Server } from 'restify';
import { IOC, loadEnvironment } from '../../../core';
import { ServerConfig, AuthGuard } from '../../../core/types';
import { AuthController } from '../../../app/controllers/auth-controller';
import { StreamTalk } from '../../../core/streamtalk';
import { Bootstrap } from '../../../core/bootstrap';
import { Constants } from '../../../core/string.constants';
import { UserModelFactory } from '../../../app/models/user.model';

const expect = chai.expect;
let app: Server;
let routesFolder = path.resolve(__dirname, '..', '..', 'artefacts', 'routes');
const logPath = path.resolve(__dirname, '..', '..', 'artefacts', 'tmp');
process.env[Constants.VAR_ROOT_PATH] = logPath;
let authToken: string;

describe ('authentication', () => {
    before((done) => {
        IOC.Container.bind(AuthGuard).to(AuthController);

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

    it ('expects basic auth headers', (done) => {
        request(app)
            .post('/login')
            .expect(401)
            .expect('WWW-Authenticate', 'Basic', done);
    });

    it ('returns 401 for invalid credentials', (done) => {
        request(app)
            .post('/login')
            .auth('invalidusername', 'invalidpassword')
            .expect(401, done);
    });

    it ('generates JWT upon authentication', (done) => {
        const username: string = 'hthero';
        const password: string = 'password';
        let UserModel = UserModelFactory();
        UserModel.destroy({
            truncate: true
        }).then(() => {
            UserModel.create({
                username: username,
                password: password
            }).then(() => {
                request(app)
                    .post('/login')
                    .auth(username, password)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            expect(validateJWTStructure(res.body)).to.be.equal(true);
                            authToken = res.body;
                            done();
                        }
                    });
            }).catch(err => done(err));
        }).catch (err => done(err));
    });

    it ('can access protected routes with auth token', (done) => {
        request(app)
            .get('/protected')
            .set('Authorization', 'JWT ' + authToken)
            .expect(200, done);
    });

    after((done) => {
        app.close();
        done();
    });
});

function validateJWTStructure (jwt: string) {
    return jwt.split('.').length === 3;
}
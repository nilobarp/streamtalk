import * as util from 'util';
import * as Bunyan from 'bunyan';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Types, IOC, Decorators, LogProvider } from '../../core';
import { sign, SignOptions } from 'jsonwebtoken';
import { stdoutLogger } from '../../config/logger';
import { UserModelFactory } from '../models/user.model';

@Decorators.autobind
export class AuthController implements Types.AuthGuard {
    private config: Types.ServerConfig;
    private logger: Bunyan;

    constructor (
        @IOC.Inject config: Types.ServerConfig,
        @IOC.Inject logProvider: LogProvider
    ) {
        this.config = config;
        this.logger = logProvider.factory(stdoutLogger);
    }

    initialize (options?: any): Function {
        let opts: StrategyOptions = {
            jwtFromRequest: this.extractJwt,
            secretOrKey: this.config.secretKey
        };
        passport.use('jwt', new JwtStrategy(opts, function (payload, done) {
            done(undefined, payload);
        }));
        return passport.initialize();
    }

    extractJwt(req): string {
        let jwt = ExtractJwt.fromAuthHeader()(req);
        return jwt;
    }

    authenticate (): Function {
        return passport.authenticate('jwt', {session: false});
    }

    authorize (req, res, next) {
        let auth = req.authorization.basic;
        if (!auth) {
            res.header('WWW-Authenticate', 'Basic');
            res.send(401, 'Unauthorized');
            return;
        }
        let {username, password} = auth;
        this.logger.info({user: auth});
        let UserModel = UserModelFactory();
        UserModel.findOne({
            where: {username: username, password: password}
        }).then((user: any) => {
            if (!user) {
                res.send(401, 'Unauthorized');
                next();
            } else {
                let signOptions: SignOptions = {
                    expiresIn: '1m'
                };
                let token = sign({user: user.id}, this.config.secretKey, signOptions);

                res.send(200, token);
                next();
            }
        });
    }
}
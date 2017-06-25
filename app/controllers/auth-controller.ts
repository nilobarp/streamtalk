import * as util from 'util';
import * as Bunyan from 'bunyan';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Types, IOC, Decorators, LogProvider } from '../../core';
import { sign, SignOptions } from 'jsonwebtoken';
import { stdoutLogger } from '../../config/logger';
import { UserModel } from '../models/user.model';

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
            // issuer: 'heroel.com'
        };
        passport.use('jwt', new JwtStrategy(opts, function (payload, done) {
            done(undefined, true);
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
        let {username, password} = auth;
        this.logger.info({user: auth});
        UserModel.findOne({
            where: {username: username, password: password}
        }).then((user) => {
            if (!user) {
                res.send(401);
                next();
            } else {
                let signOptions: SignOptions = {
                    // issuer: 'heroel.com'
                };
                let token = sign({user: 'validuser'}, this.config.secretKey, signOptions);

                res.send(200, token);
                next();
            }
        });
    }
}
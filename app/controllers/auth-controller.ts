import * as util from 'util';
import * as Bunyan from 'bunyan';
import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Types, IOC, Decorators, LogProvider } from '../../core';
import { sign, SignOptions } from 'jsonwebtoken';
import { stdoutLogger } from '../../config/logger';

// @IOC.AutoWired
@Decorators.Controller
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
        /*passport.use(new BasicStrategy((username, password, done) => {
            console.log(username);
                if (username === 'validusername' && password === 'validpassword') {
                    return done(null, {user_id: 1});
                }
                done(null, false);
            })
        );*/
        let opts: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
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
        console.log(this.logger, username, password);
        this.logger.info({user: auth});
        if (username === 'validusername' && password === 'validpassword') {
            let signOptions: SignOptions = {
                // issuer: 'heroel.com'
            };
            let token = sign({user: 'validuser'}, this.config.secretKey, signOptions);

            res.send(200, token);
            next();
        } else {
            res.send(401);
            next();
        }
    }
}
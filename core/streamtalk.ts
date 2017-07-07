import { AutoWired, Inject, Singleton } from 'typescript-ioc/es6';
import * as Bunyan from 'bunyan';
import * as path from 'path';
import * as fs from 'fs';
import * as responseTime from 'response-time';
import { ServerConfig } from './types';
import { LogProvider } from './log.provider';
import { ErrorProvider } from './error.provider';
import { Router } from './router';
import { Authenticator } from './authenticator';
import {
    Request,
    Response,
    Server,
    ServerOptions,
    createServer,
    acceptParser,
    authorizationParser,
    dateParser,
    queryParser,
    jsonp,
    gzipResponse,
    bodyParser,
    throttle,
    requestLogger,
    auditLogger } from 'restify';

@Singleton
export class StreamTalk {
    private config: ServerConfig;
    private router: Router;
    private errors: ErrorProvider;
    private logger: Bunyan;
    private auth: Authenticator;

    private _instance: Server;

    get instance (): Server {
        return this._instance;
    }

    constructor (
        @Inject config: ServerConfig,
        @Inject router: Router,
        @Inject auth: Authenticator,
        @Inject errors: ErrorProvider,
        @Inject logProvider: LogProvider
        ) {
            this.config = config;
            this.router = router;
            this.auth = auth;
            this.errors = errors;
            this.logger = logProvider.factory();
        }

    /**
     * Override server configuration params after instantiation
     */
    public set setConfig(v: ServerConfig) {
        this.config = v;
    }

    initialize (): ServerOptions {
        let options: ServerOptions = {
            certificate: this.config.sslCert,
            key: this.config.privateKey,
            name: 'StreamTalk',
            log: this.logger
        };

        if (!options.certificate || !options.key) {
            this.logger.warn('TLS configuration not provided');
        }

        this._instance = createServer(options);

        this.setupMiddlewares();
        this.setupRouting();

        return options;
    }

    start (options: ServerOptions) {
        try {
            this.verifyServerConfig();
            let _port: number;
            if (this.config.sslCert && this.config.privateKey) {
                _port = this.config.port || 443;
            } else {
                _port = this.config.port || 80;
            }

            this._instance.listen(_port, this.config.bindIP, (err) => {
                if (err) {
                    throw err;
                }
                this.logger.info('Server ready. Listening @ %s', this.instance.url);
            });
        } catch (err) {
            this.logger.fatal(err);
            throw err;
        }
    }

    private verifyServerConfig () {
        if (this.config.secretKey === undefined || this.config.secretKey === '') {
            this.errors.throwAppSecretUndefined();
        }
    }

    private setupMiddlewares () {
        this.instance.use(acceptParser(this.instance.acceptable));
        this.instance.use(authorizationParser());
        this.instance.use(queryParser());
        this.instance.use(jsonp());
        this.instance.use(gzipResponse());
        this.instance.use(bodyParser());
        this.instance.use(responseTime());
        if (this.auth.enabled) {
            this.instance.use(this.auth.initialize());
        }

        this.instance.on('after', auditLogger({
            log: this.logger
        }));
    }

    private setupRouting () {
        this.router.setup(this.instance, this.config.routesFolder);
    }
}
import { Types } from '../core';

const SERVER_PORT_VAR_KEY: string = 'SERVER_PORT';

export class SrvConf implements Types.ServerConfig {
    bindIP = '0.0.0.0';
    port = process.env[SERVER_PORT_VAR_KEY];
    sslCert = '';
    privateKey = '';
    secretKey = 'super-secret-key-sshhhh';
    routesFolder = 'routes';
}

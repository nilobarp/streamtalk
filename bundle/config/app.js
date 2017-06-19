"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SERVER_PORT_VAR_KEY = 'SERVER_PORT';
class SrvConf {
    constructor() {
        this.bindIP = '0.0.0.0';
        this.port = process.env[SERVER_PORT_VAR_KEY];
        this.sslCert = '';
        this.privateKey = '';
        this.secretKey = 'super-secret-key-sshhhh';
        this.routesFolder = 'routes';
    }
}
exports.SrvConf = SrvConf;
//# sourceMappingURL=app.js.map
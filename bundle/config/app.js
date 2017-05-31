"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SERVER_PORT_VAR_KEY = 'SERVER_PORT';
var SrvConf = (function () {
    function SrvConf() {
        this.bindIP = '0.0.0.0';
        this.port = process.env[SERVER_PORT_VAR_KEY];
        this.sslCert = '';
        this.privateKey = '';
        this.secretKey = 'super-secret-key-sshhhh';
        this.routesFolder = 'routes';
    }
    return SrvConf;
}());
exports.SrvConf = SrvConf;
//# sourceMappingURL=app.js.map
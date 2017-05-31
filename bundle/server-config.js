"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SrvConf = (function () {
    function SrvConf() {
        this.bindIP = '0.0.0.0';
        this.port = 8080;
        this.sslCert = '';
        this.privateKey = '';
        this.secretKey = 'super-secret-key-sshhhh';
    }
    return SrvConf;
}());
exports.SrvConf = SrvConf;
//# sourceMappingURL=server-config.js.map
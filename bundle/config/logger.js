"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bunyan = require("bunyan");
var stdoutLogger = Bunyan.createLogger({
    name: 'heroEl',
    serializers: Bunyan.stdSerializers,
    streams: [{
            level: Bunyan.INFO,
            stream: process.stdout
        }]
});
exports.stdoutLogger = stdoutLogger;
//# sourceMappingURL=logger.js.map
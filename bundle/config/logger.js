"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bunyan = require("bunyan");
let stdoutLogger = Bunyan.createLogger({
    name: 'heroEl',
    serializers: Bunyan.stdSerializers,
    streams: [{
            level: Bunyan.INFO,
            stream: process.stdout
        }]
});
exports.stdoutLogger = stdoutLogger;
//# sourceMappingURL=logger.js.map
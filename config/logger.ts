import * as Bunyan from 'bunyan';

let stdoutLogger: Bunyan = Bunyan.createLogger({
    name: 'heroEl',
    serializers: Bunyan.stdSerializers,
    streams: [{
        level: Bunyan.INFO,
        stream: process.stdout
    }]
});

export {
    stdoutLogger
};
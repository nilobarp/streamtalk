"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Redis = require("redis");
var client = Redis.createClient(6379, 'localhost');
client.on('error', function (err) {
    console.error(err);
});
client.set('key', '1', Redis.print);
client.get('key', Redis.print);
client.incr('key');
client.get('key', Redis.print);
client.set('expiredKey', 'expiredValue', 'EX', 1);
client.get('expiredKey', Redis.print);
setTimeout(function () {
    client.get('expiredKey', Redis.print);
    client.quit();
}, 2000);
//# sourceMappingURL=test.js.map
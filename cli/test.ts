import * as Redis from 'redis';

const client = Redis.createClient(6379, 'localhost');
client.on('error', (err) => {
    console.error(err);
});

client.set('key', '1', Redis.print);
client.get('key', Redis.print);
client.incr('key');
client.get('key', Redis.print);

client.set('expiredKey', 'expiredValue', 'EX', 1);
client.get('expiredKey', Redis.print);
setTimeout(() => {
    client.get('expiredKey', Redis.print);
    client.quit();
}, 2000);
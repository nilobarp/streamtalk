import * as Mocha from 'mocha';
import * as fs from 'fs';
import * as path from 'path';
import * as notifier from 'node-notifier';
import * as glob from 'glob';

const mocha = new Mocha();

let testDir = path.join(__dirname);
let failureCount: number = 0;
let checkImage: string = path.join(testDir, '..', '..', 'test', 'artefacts', 'icons', 'pass.png');
let crossImage: string = path.join(testDir, '..', '..', 'test', 'artefacts', 'icons', 'fail.png');

console.log('/* ---- ----- ----- Test suites ----- ----- ----- */');

glob(`${testDir}/**/*.test.js`, (err, matches: string[]) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }

    for (let match of matches) {
        mocha.addFile(match);
    }

    run();
});

function run () {
    const pattern: string = process.argv.slice(2).join('|');
    mocha.grep(new RegExp(pattern, 'i'));

    let runner: any = mocha.run( failures => {
        process.on('exit', () => {
            process.exit(failures);
        });
    });

    runner.on('fail', (test, err) => {
        failureCount++;
        notifier.notify({
            'title': `${failureCount} ${failureCount > 1 ? 'tests' : 'test'} failed`,
            'subtitle': test.title,
            'message': test.err.message,
            'icon': crossImage,
            'sound': true
        });
    });

    runner.on('end', () => {
        if (failureCount === 0) {
            notifier.notify({
                'title': 'Test runner: Completed',
                'message': 'All tests passing',
                'icon': checkImage,
                'sound': false
            });
            console.log('/* ---- ----- ----- Awesome, no tests failed ----- ----- ----- */');
        } else {
            console.log(`/* ---- ----- ----- ${failureCount} ${failureCount > 1 ? 'tests' : 'test'} failed ----- ----- ----- */`);
        }
    });
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pgp = require("pg-promise");
const promise = require("bluebird");
class DbPool {
    constructor() {
        this.init();
    }
    init() {
        let instance = pgp({ promiseLib: promise });
        this._databasePool = instance('postgres://user:password@localhost:5432/hthero');
    }
    get client() {
        return this._databasePool;
    }
}
let db = new DbPool();
let client = db.client;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        let user = 'user';
        return /u/.test(user);
    });
}
function getProfile(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return 'profile';
    });
}
const Benchmark = require("benchmark");
let suite = new Benchmark.Suite;
suite
    .add('get user', function () {
    getUsers();
})
    .add('get profile', () => {
    getProfile('user77777');
})
    .on('cycle', function (event) {
    console.log(String(event.target));
})
    .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
    .run({ async: false });
//# sourceMappingURL=test.js.map
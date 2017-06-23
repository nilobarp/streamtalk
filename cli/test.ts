// const fetchStartTime = (time: number) => new Promise((resolve) => {
//   setTimeout(() => resolve(time), 0);
// });

// const fetchEndTime = (someValue: number) => new Promise((resolve) => {
//   if (someValue === 0) {
//     throw new Error('You didn\'t give me any value');
//   }
//   setTimeout(() => resolve(+ new Date()), 0);
// });

// // asyncFunction().then(result => console.log(result));

// // import * as Promise from 'bluebird';

// // let p = Promise.coroutine(function* () {
// //   let start = yield fetchStartTime(+new Date());
// //   // console.log(start, + new Date());
// //   try {
// //     let end = yield fetchEndTime(start);
// //     console.log('time elapsed:', end - start);
// //   } catch (err) {
// //     console.log(err.message);
// //   }
// //   // console.log(end, + new Date());
// // })();

// async function routine() {
//   let start = await fetchStartTime(+ new Date());
//   let end = await fetchEndTime(+ new Date());
//   return {start, end};
// }

// routine().then(r => console.log(r));

// import * as pgp from 'pg-promise';
// import * as promise from 'bluebird';
// import * as Bunyan from 'bunyan';

// class DbPool {
//     private dbPoolConfig: pgp.IOptions<any>;
//     private _databasePool: pgp.IDatabase<any>;
//     private logger: Bunyan;

//     constructor (
//     ) {
//         this.init();
//     }

//     private init () {
//         let instance: pgp.IMain = pgp({promiseLib: promise});
//         // instance.pg.defaults.poolSize = 50;
//         this._databasePool = <pgp.IDatabase<any>> instance('postgres://user:password@localhost:5432/hthero');
//     }

//     public get client(): pgp.IDatabase<any> {
//         return this._databasePool;
//     }
// }

// let db = new DbPool();
// let client = db.client;

// async function getUsers () {
//   // let users7 = await client.many('select * from users where username like \'%77777\'');
//   // let profile;
//   // try {
//   //   profile = await getProfile(users7[0].username);
//   // } catch (err) {
//   //   console.log(err);
//   // }
//   // return {users7, profile};
//   let user = 'user';
//   return /u/.test(user);
// }

// async function getProfile (user: string) {
//   // let userProfile = await client.any('select * from profile where userid = 2');
//   // return userProfile;
//   return 'profile';
// }

// import * as Benchmark from 'benchmark';

// let suite = new Benchmark.Suite;

// suite
// .add('get user', function() {
//   getUsers();
// })
// .add('get profile', () => {
//   getProfile('user77777');
// })
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .on('complete', function () {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// .run({async: false});
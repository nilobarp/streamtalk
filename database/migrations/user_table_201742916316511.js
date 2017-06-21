/*Migration: /Users/nilotpal/code/heroel/hthero/database/migrations/user_table_201742916316511.js*/

const up = `
    CREATE TABLE users (
        userid BIGSERIAL PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(100) UNIQUE NOT NULL
    )
`;

const down = `
    DROP TABLE users;
`;

module.exports.up = up;
module.exports.down = down;
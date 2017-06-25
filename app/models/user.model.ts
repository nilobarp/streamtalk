import { Database, IOC } from '../../core';
import * as Sequelize from 'sequelize';

const database: Database = IOC.Container.get(Database);
const client = database.client();

let UserModel = client.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

export {
    UserModel
};
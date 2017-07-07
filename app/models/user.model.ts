import { Database, IOC } from '../../core';
import * as Sequelize from 'sequelize';

function factory () {
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

    return UserModel;
}

export {
    factory as UserModelFactory
};
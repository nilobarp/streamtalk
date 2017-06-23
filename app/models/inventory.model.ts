import { Database, IOC } from '../../core';
import * as Sequelize from 'sequelize';

const database: Database = IOC.Container.get(Database);
const client = database.client();

let Inventory = client.define('inventory', {
    item_name: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

export {
    Inventory
};
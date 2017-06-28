// 20170628142622011_inventory_table.ts

import { Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';

const tableName: string = 'inventories';

module.exports = {
    up: function(query: QueryInterface, DataTypes) {
        query.createTable(tableName, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            item_name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });
    },

    down: function(query: QueryInterface, DataTypes) {
        query.dropTable(tableName);
    }
};

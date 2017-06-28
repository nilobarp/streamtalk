// 20170628144425392_add_quantity_col_to_inventory_table.ts

import { Umzug } from 'umzug';
import { QueryInterface } from 'sequelize';

const tableName: string = 'inventories';

module.exports = {
    up: function(query: QueryInterface, DataTypes) {
        query.addColumn(tableName, 'quantity', {
            type: DataTypes.INTEGER,
            defaultValue: 0
        });
    },

    down: function(query: QueryInterface, DataTypes) {
        query.removeColumn(tableName, 'quantity');
    }
};

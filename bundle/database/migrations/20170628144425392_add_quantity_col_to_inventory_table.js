"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tableName = 'inventories';
module.exports = {
    up: function (query, DataTypes) {
        query.addColumn(tableName, 'quantity', {
            type: DataTypes.INTEGER,
            defaultValue: 0
        });
    },
    down: function (query, DataTypes) {
        query.removeColumn(tableName, 'quantity');
    }
};
//# sourceMappingURL=20170628144425392_add_quantity_col_to_inventory_table.js.map
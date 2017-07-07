"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tableName = 'inventories';
module.exports = {
    up: function (query, DataTypes) {
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
    down: function (query, DataTypes) {
        query.dropTable(tableName);
    }
};
//# sourceMappingURL=20170628142622011_inventory_table.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tableName = '';
module.exports = {
    up: function (query, DataTypes) {
        return query.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });
    },
    down: function (query, DataTypes) {
        return query.dropTable('users');
    }
};
//# sourceMappingURL=20170628142431338_user_table.js.map
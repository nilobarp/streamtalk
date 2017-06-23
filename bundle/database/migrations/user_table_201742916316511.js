'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=user_table_201742916316511.js.map
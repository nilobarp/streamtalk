/*Migration: /Users/nilotpal/code/heroel/hthero/database/migrations/user_table_201742916316511.js*/
'use strict';

var Bluebird = require('bluebird');

module.exports = {
    up: function(query, DataTypes) {
        return query.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.TEXT
            },
            password: {
                type: DataTypes.TEXT
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });
    },

    down: function(query, DataTypes) {
        // return query.dropAllTables();
        return query.dropTable('users');
    }
};
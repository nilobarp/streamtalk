"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../../core");
var Sequelize = require("sequelize");
var database = core_1.IOC.Container.get(core_1.Database);
var client = database.client();
var Inventory = client.define('inventory', {
    item_name: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.model.js.map
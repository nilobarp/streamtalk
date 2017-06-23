"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
const Sequelize = require("sequelize");
const database = core_1.IOC.Container.get(core_1.Database);
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
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.model.js.map
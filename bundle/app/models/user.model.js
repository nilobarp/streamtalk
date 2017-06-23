"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
const Sequelize = require("sequelize");
const database = core_1.IOC.Container.get(core_1.Database);
const client = database.client();
let User = client.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});
exports.User = User;
//# sourceMappingURL=user.model.js.map
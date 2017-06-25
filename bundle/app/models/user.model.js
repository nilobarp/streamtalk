"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../../core");
var Sequelize = require("sequelize");
function factory() {
    var database = core_1.IOC.Container.get(core_1.Database);
    var client = database.client();
    var UserModel = client.define('user', {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return UserModel;
}
exports.UserModelFactory = factory;
//# sourceMappingURL=user.model.js.map
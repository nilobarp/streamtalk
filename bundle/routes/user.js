"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var loginController = core_1.IOC.Container.get(core_1.Types.AuthGuard);
exports.login = {
    method: 'POST',
    path: '/login',
    name: 'login',
    handler: loginController.authorize,
    protected: false
};
exports.profile = {
    method: 'GET',
    path: '/profile',
    name: 'UserProfile',
    handler: function (req, res, next) { res.send('Hello world!'); },
    protected: true
};
//# sourceMappingURL=user.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StreamTalk_1 = require("StreamTalk");
let loginController = StreamTalk_1.IOC.Container.get(StreamTalk_1.Types.AuthGuard);
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
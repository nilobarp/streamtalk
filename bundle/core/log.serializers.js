"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var userSerializer = function (user) {
    return util.format('%s/%s', user.username, '*****');
};
exports.userSerializer = userSerializer;
//# sourceMappingURL=log.serializers.js.map
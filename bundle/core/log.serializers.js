"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
let userSerializer = (user) => {
    return util.format('%s/%s', user.username, '*****');
};
exports.userSerializer = userSerializer;
//# sourceMappingURL=log.serializers.js.map
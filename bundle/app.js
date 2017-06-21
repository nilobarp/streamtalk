"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
require("./config/ioc-bindings");
let instance = new core_1.Bootstrap(__dirname);
instance.start();
//# sourceMappingURL=app.js.map
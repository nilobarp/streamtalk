"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
require("./config/ioc-bindings");
var instance = new core_1.Bootstrap(__dirname);
instance.start();
//# sourceMappingURL=app.js.map
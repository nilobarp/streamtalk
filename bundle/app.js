"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamTalk_1 = require("StreamTalk");
require("./config/ioc-bindings");
var instance = new StreamTalk_1.Bootstrap(__dirname);
instance.start();
//# sourceMappingURL=app.js.map
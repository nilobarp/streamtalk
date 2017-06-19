"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StreamTalk_1 = require("StreamTalk");
require("./config/ioc-bindings");
let instance = new StreamTalk_1.Bootstrap(__dirname);
instance.start();
//# sourceMappingURL=app.js.map
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/ioc-bindings");
var child = require("child_process");
child.exec('./node_modules/streamtalk/bundle/lib/cli/st');
//# sourceMappingURL=st.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphQLHTTP = require("express-graphql");
const schema = require('./schema');
console.log(schema);
const app = express();
app.use(express.static(__dirname));
app.use('/graphql', graphQLHTTP(() => ({ schema, graphiql: true })));
app.listen(7799, function () {
    const port = this.address().port;
    console.log(`Started on http://localhost:${port}/`);
});
//# sourceMappingURL=server.js.map
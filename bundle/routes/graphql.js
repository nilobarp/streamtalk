"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphQLHTTP = require("express-graphql");
var schema = require("../app/schemas/schema");
var env = process.env.NODE_ENV;
if (env === 'dev' || env === 'development') {
    exports.graphqlPost = {
        method: 'POST',
        path: '/graphql',
        handler: graphQLHTTP({ schema: schema, graphiql: false }),
        protected: false
    };
    exports.graphqlGet = {
        method: 'GET',
        path: '/graphql',
        handler: graphQLHTTP({ schema: schema, graphiql: true }),
        protected: false
    };
}
//# sourceMappingURL=graphql.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphQLHTTP = require("express-graphql");
const schema = require("../app/schemas/schema");
const env = process.env.NODE_ENV;
if (env === 'dev' || env === 'development') {
    exports.graphqlPost = {
        method: 'POST',
        path: '/graphql',
        handler: graphQLHTTP({ schema, graphiql: false }),
        protected: false
    };
    exports.graphqlGet = {
        method: 'GET',
        path: '/graphql',
        handler: graphQLHTTP({ schema, graphiql: true }),
        protected: false
    };
}
//# sourceMappingURL=graphql.js.map
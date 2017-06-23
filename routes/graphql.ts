import { Types } from '../core';
import * as graphQLHTTP from 'express-graphql';
import * as schema from '../app/schemas/schema';

const env = process.env.NODE_ENV;
export let graphqlPost: Types.HttpRoute;
export let graphqlGet: Types.HttpRoute;

if (env === 'dev' || env === 'development') {
    graphqlPost = {
        method: 'POST',
        path: '/graphql',
        handler: graphQLHTTP ({ schema, graphiql: false }),
        protected: false
    };

    graphqlGet = {
        method: 'GET',
        path: '/graphql',
        handler: graphQLHTTP ({ schema, graphiql: true }),
        protected: false
    };
}
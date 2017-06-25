"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var TestEnum = new graphql_1.GraphQLEnumType({
    name: 'TestEnum',
    values: {
        RED: { description: 'A rosy color' },
        GREEN: { description: 'The color of martians and slime' },
        BLUE: { description: 'A feeling you might have if you can\'t use GraphQL' }
    }
});
var TestInputObject = new graphql_1.GraphQLInputObjectType({
    name: 'TestInput',
    fields: function () { return ({
        string: {
            type: graphql_1.GraphQLString,
            description: 'Repeats back this string'
        },
        int: { type: graphql_1.GraphQLInt },
        float: { type: graphql_1.GraphQLFloat },
        boolean: { type: graphql_1.GraphQLBoolean },
        id: { type: graphql_1.GraphQLID },
        enum: { type: TestEnum },
        object: { type: TestInputObject },
        listString: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        listInt: { type: new graphql_1.GraphQLList(graphql_1.GraphQLInt) },
        listFloat: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
        listBoolean: { type: new graphql_1.GraphQLList(graphql_1.GraphQLBoolean) },
        listID: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
        listEnum: { type: new graphql_1.GraphQLList(TestEnum) },
        listObject: { type: new graphql_1.GraphQLList(TestInputObject) }
    }); }
});
var TestInterface = new graphql_1.GraphQLInterfaceType({
    name: 'TestInterface',
    description: 'Test interface.',
    fields: function () { return ({
        name: {
            type: graphql_1.GraphQLString,
            description: 'Common name string.'
        }
    }); },
    resolveType: function (check) {
        return check ? UnionFirst : UnionSecond;
    }
});
var UnionFirst = new graphql_1.GraphQLObjectType({
    name: 'First',
    fields: function () { return ({
        name: {
            type: graphql_1.GraphQLString,
            description: 'Common name string for UnionFirst.'
        },
        first: {
            type: new graphql_1.GraphQLList(TestInterface),
            resolve: function () { return true; }
        }
    }); },
    interfaces: [TestInterface]
});
var UnionSecond = new graphql_1.GraphQLObjectType({
    name: 'Second',
    fields: function () { return ({
        name: {
            type: graphql_1.GraphQLString,
            description: 'Common name string for UnionFirst.'
        },
        second: {
            type: TestInterface,
            resolve: function () { return false; }
        }
    }); },
    interfaces: [TestInterface]
});
var TestUnion = new graphql_1.GraphQLUnionType({
    name: 'TestUnion',
    types: [UnionFirst, UnionSecond],
    resolveType: function () {
        return UnionFirst;
    }
});
var TestType = new graphql_1.GraphQLObjectType({
    name: 'Test',
    fields: function () { return ({
        test: {
            type: TestType,
            description: '`test` field from `Test` type.',
            resolve: function () { return ({}); }
        },
        union: {
            type: TestUnion,
            description: '> union field from Test type, block-quoted.',
            resolve: function () { return ({}); }
        },
        id: {
            type: graphql_1.GraphQLID,
            description: 'id field from Test type.',
            resolve: function () { return 'abc123'; }
        },
        isTest: {
            type: graphql_1.GraphQLBoolean,
            description: 'Is this a test schema? Sure it is.',
            resolve: function () {
                return true;
            }
        },
        hasArgs: {
            type: graphql_1.GraphQLString,
            resolve: function (value, args) {
                return JSON.stringify(args);
            },
            args: {
                string: { type: graphql_1.GraphQLString },
                int: { type: graphql_1.GraphQLInt },
                float: { type: graphql_1.GraphQLFloat },
                boolean: { type: graphql_1.GraphQLBoolean },
                id: { type: graphql_1.GraphQLID },
                enum: { type: TestEnum },
                object: { type: TestInputObject },
                listString: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                listInt: { type: new graphql_1.GraphQLList(graphql_1.GraphQLInt) },
                listFloat: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
                listBoolean: { type: new graphql_1.GraphQLList(graphql_1.GraphQLBoolean) },
                listID: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
                listEnum: { type: new graphql_1.GraphQLList(TestEnum) },
                listObject: { type: new graphql_1.GraphQLList(TestInputObject) }
            }
        }
    }); }
});
var TestMutationType = new graphql_1.GraphQLObjectType({
    name: 'MutationType',
    description: 'This is a simple mutation type',
    fields: {
        setString: {
            type: graphql_1.GraphQLString,
            description: 'Set the string field',
            args: {
                value: { type: graphql_1.GraphQLString }
            }
        }
    }
});
var TestSubscriptionType = new graphql_1.GraphQLObjectType({
    name: 'SubscriptionType',
    description: 'This is a simple subscription type',
    fields: {
        subscribeToTest: {
            type: TestType,
            description: 'Subscribe to the test type',
            args: {
                id: { type: graphql_1.GraphQLString }
            }
        }
    }
});
var myTestSchema = new graphql_1.GraphQLSchema({
    query: TestType,
    mutation: TestMutationType,
    subscription: TestSubscriptionType
});
module.exports = myTestSchema;
//# sourceMappingURL=schema.js.map
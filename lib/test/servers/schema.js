'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TestSchema = undefined;

var _graphql = require('graphql');

var QueryRootType = new _graphql.GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
        test: {
            type: _graphql.GraphQLString,
            args: {
                who: {
                    type: _graphql.GraphQLString
                }
            },
            resolve: function resolve(root, _ref) {
                var who = _ref.who;
                return 'Hello ' + (who || 'World');
            }
        },
        thrower: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
            resolve: function resolve() {
                throw new Error('Throws!');
            }
        }
    }
});

var TestSchema = exports.TestSchema = new _graphql.GraphQLSchema({
    query: QueryRootType
});
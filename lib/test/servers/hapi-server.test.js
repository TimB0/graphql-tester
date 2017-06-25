'use strict';

var _hapiGraphql = require('hapi-graphql');

var _hapiGraphql2 = _interopRequireDefault(_hapiGraphql);

var _hapi = require('../../main/servers/hapi');

var _schema = require('./schema');

var _main = require('../../main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Hapi Server', function () {
    var HapiTest = (0, _main.tester)({
        server: (0, _hapi.create)([{
            register: _hapiGraphql2.default,
            options: {
                query: {
                    schema: _schema.TestSchema,
                    rootValue: {},
                    pretty: false
                },
                route: {
                    path: '/hapi/graphql',
                    config: {}
                }
            }
        }]),
        url: '/hapi/graphql'
    });

    describe('Valid Query', function () {
        var response = HapiTest('{ test(who: "Graham") }');

        it('Returns success', function () {
            return response.should.eventually.have.property('success').equal(true);
        });
        it('Returns the correct Status code', function () {
            return response.should.eventually.have.property('status').equal(200);
        });
        it('Returns the correct name', function () {
            return response.should.eventually.have.deep.property('data.test').equal('Hello Graham');
        });
    });

    describe('Invalid Query', function () {
        var response = HapiTest('{ somethingElse(who: "Graham") }');

        it('Returns success', function () {
            return response.should.eventually.have.property('success').equal(false);
        });
        it('Returns the correct Status code', function () {
            return response.should.eventually.have.property('status').equal(400);
        });
        it('Returns some errors', function () {
            return response.should.eventually.have.property('errors');
        });
    });
});
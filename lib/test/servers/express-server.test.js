'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _express3 = require('../../main/servers/express');

var _schema = require('./schema');

var _main = require('../../main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Express Server', function () {
    var app = (0, _express2.default)();
    app.use('/express/graphql', (0, _expressGraphql2.default)({
        schema: _schema.TestSchema
    }));

    var ExpressTest = (0, _main.tester)({
        server: (0, _express3.create)(app),
        url: '/express/graphql'
    });

    describe('Valid Query', function () {
        var response = ExpressTest('{ test(who: "Graham") }');

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
        var response = ExpressTest('{ somethingElse(who: "Graham") }');

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
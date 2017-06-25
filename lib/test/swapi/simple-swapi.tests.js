'use strict';

var _main = require('../../main');

describe('SWAPI', function () {
    var SwapiTest = (0, _main.tester)({
        url: 'http://graphql-swapi.parseapp.com'
    });

    describe('Successfully getting the name of Person #1', function () {
        var response = SwapiTest('{ person(personID: 1) { name } }');

        it('Returns success', function () {
            return response.should.eventually.have.property('success').equal(true);
        });
        it('Returns the correct Status code', function () {
            return response.should.eventually.have.property('status').equal(200);
        });
        it('Returns the correct name', function () {
            return response.should.eventually.have.deep.property('data.person.name').equal('Luke Skywalker');
        });
    });

    describe('Getting the name of Person #1234', function () {
        var response = SwapiTest('{ person(personID: 1234) { name } }');

        it('Returns failure', function () {
            return response.should.eventually.have.property('success').equal(false);
        });
        it('Returns the correct Status code', function () {
            return response.should.eventually.have.property('status').equal(200);
        });
        it('Returns some errors', function () {
            return response.should.eventually.have.property('errors');
        });
    });

    describe('Incorrect argument requested', function () {
        var response = SwapiTest('{ person(personId: 1) { name } }');

        it('Returns failure', function () {
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
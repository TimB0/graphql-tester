'use strict';

var _main = require('../main');

describe('Invalid Hostname', function () {
    var InvalidHostnameTest = (0, _main.tester)({
        url: 'http://i.dont.exist.grahamcox.co.uk'
    });

    describe('Valid Query to Invalid Host', function () {
        var response = InvalidHostnameTest('{ person(personID: 1) { name } }');

        it('Promise is rejected', function () {
            return response.should.eventually.be.rejected;
        });
    });
});
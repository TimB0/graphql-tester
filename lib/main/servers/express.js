"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
/**
 * Create an Express.js wrapper that can be used for running tests against
 * @param {Application} app The Express.js Application that should be used to test against
 * @return {Object} configuration to pass to the GraphQL Tester for using this server
 */
function create(app) {
    return {
        creator: function creator(port) {
            return new Promise(function (resolve, reject) {
                var server = app.listen(port, function () {
                    resolve({
                        server: {
                            shutdown: function shutdown() {
                                server.close();
                            }
                        },
                        url: "http://localhost:" + port
                    });
                });
            });
        }
    };
}
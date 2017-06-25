'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a HapiJS wrapper that can be used for running tests against
 * @param {Object|Array} plugins The HapiJS plugins to register against the instance
 * @return {Object} configuration to pass to the GraphQL Tester for using this server
 */
function create(plugins) {
    return {
        creator: function creator(port) {
            var server = new _hapi2.default.Server();
            server.connection({
                port: port
            });

            return server.register(plugins).then(function () {
                return server.start();
            }).then(function () {
                return {
                    server: {
                        shutdown: function shutdown() {
                            server.stop();
                        }
                    },
                    url: server.info.uri
                };
            });
        }
    };
}
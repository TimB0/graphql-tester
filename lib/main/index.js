'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tester = tester;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _freeport = require('freeport');

var _freeport2 = _interopRequireDefault(_freeport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tester(_ref) {
    var url = _ref.url,
        server = _ref.server,
        _ref$method = _ref.method,
        method = _ref$method === undefined ? 'POST' : _ref$method,
        _ref$contentType = _ref.contentType,
        contentType = _ref$contentType === undefined ? 'application/graphql' : _ref$contentType,
        _ref$authorization = _ref.authorization,
        authorization = _ref$authorization === undefined ? null : _ref$authorization;

    return function (query, requestOptions) {
        return new Promise(function (resolve, reject) {
            if (server) {
                (0, _freeport2.default)(function (err, port) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(server.creator(port).then(function (runningServer) {
                            return {
                                server: runningServer.server,
                                url: runningServer.url + url
                            };
                        }));
                    }
                });
            } else {
                resolve({
                    url: url
                });
            }
        }).then(function (_ref2) {
            var url = _ref2.url,
                server = _ref2.server;

            return new Promise(function (resolve, reject) {
                var headers = {
                    'Content-Type': contentType
                };
                if (authorization !== null) headers['Authorization'] = authorization;
                var options = { method: method, uri: url, headers: headers, body: query };
                options = Object.assign(options, requestOptions);
                (0, _request2.default)(options, function (error, message, body) {
                    if (server && typeof server.shutdown === 'function') {
                        server.shutdown();
                    }

                    if (error) {
                        reject(error);
                    } else {
                        var result = JSON.parse(body);

                        resolve({
                            raw: body,
                            data: result.data,
                            errors: result.errors,
                            headers: message.headers,
                            status: message.statusCode,
                            success: !result.hasOwnProperty('errors')
                        });
                    }
                });
            });
        });
    };
}
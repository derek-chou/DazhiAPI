var config = require('../../config');
var pg = require('pg');
var Q = require('q');

function dbBase() {}

dbBase.prototype._connect = function (callback) {
    var defer = Q.defer();
    var connectStr = config.pgConnectStr;
    console.log(connectStr);
    pg.connect(connectStr, function (err, client, done) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve({client: client, done: done});
        }
    });
    return defer.promise.nodeify(callback);
};

dbBase.prototype._query = function (sql, params, callback) {
    if (typeof params == 'function') {
        callback = params;
        params = [];
    }
    if (!params) {
        params = [];
    }
    if (!sql) {
        var err = new Error("sql is empty!");
        var defer3 = Q.defer();
        return defer3.reject(err).nodeify(callback);
    }

    if (config.debug) {
        console.log('[SQL:]', sql, '[:SQL]');
        console.log('[PARAMS:]', params, '[:PARAMS]');
    }
    return this._connect()
        .then(function (result) {
            var client = result.client;
            var done = result.done;
            var defer = Q.defer();
            client.query(sql, params, function (err, result) {
                done();
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            })
            return defer.promise;
        })
        .nodeify(callback);
};

module.exports = dbBase;
/*
 * Simple OO MySQL helper module.
 *
 * Copyright (C) 2017 Ferenc Kretz <ferkretz@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var mysql = require('mysql');

// Exports instance
module.exports = (function () {
    // Public functions
    var db = {};
    // Private variables
    var connectionLimit;
    var host;
    var user;
    var database;
    var password;
    var debug;
    var pool;

    // You can specify version number
    db.version = '0.0.1';

    // Initializing with optional (default) values
    db.init = function (opts) {
        connectionLimit = (typeof opts.connectionLimit === 'number') ? opts.connectionLimit : 100;
        host = (typeof opts.host === 'string') ? opts.host : 'localhost';
        user = (typeof opts.user === 'string') ? opts.user : 'root';
        password = (typeof opts.password === 'string') ? opts.password : ''; // empty password
        database = (typeof opts.database === 'string') ? opts.database : 'database';
        debug = (typeof opts.debug === 'string') ? opts.debug : false; // we don't use debug

        pool = mysql.createPool({
            connectionLimit: connectionLimit,
            host: host,
            user: user,
            password: password,
            database: database,
            debug: debug
        });
    };

    // Simple SQL query
    db.query = function (query, values, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                return callback(err, null);
            }
            connection.query(query, values, function (err, results) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    };

    // Table list
    db.listTables = function (callback) {
        this.query('SHOW TABLES', [], callback);
    };

    // Describe table
    db.describeTable = function (table, callback) {
        this.query('DESCRIBE ??', [table], callback);
    };

    db.getDatabase = function () {
        return database;
    };

    return db;
}());

"use strict";

class app {
    constructor() {
        this.loadServer();
    }

    loadServer() {
        const fs = require('fs');
        const _ = require('lodash');
        const mysql = require('mysql');
        const config = require('./config/config.json');

        const defaultConfig = config.development;
        const environment = process.env.NODE_ENV || 'development';
        const environmentConfig = config[environment];
        const finalConfig = _.merge(defaultConfig, environmentConfig);

        const db = mysql.createConnection ({
            host: finalConfig.db_host,
            user: finalConfig.db_user,
            password: finalConfig.db_password,
            database: finalConfig.db_name
        });

        global.db = db;
        global.app_config = finalConfig;

        const testQ = "select * from cb_rfq order by id desc limit 5";
        db.query(testQ, (err, result) => {
            if(!err){
                console.log('DEBUG result -> ', result.map(JSON.stringify));
            }else{
                console.log('DEBUG error -> ', err);
            }
        });

        const HTTP = require('http');
        // require the new module
        var handler = require('./resources/js/handler');
        var server = HTTP.createServer((request, response) => {
            var parts = url.parse(request.url);
            if (parts.pathname === '/') {
                handler(request, response);
            } else {
                // error handle unknown path
            }
        });
        const PORT = 8000;
        fs.readFile('./resources/html/index.html', function (err, html) {
            if (err) {
                throw err;
            }
            server.listen(PORT, () => {
                console.log('Server is now running at port ', PORT);
            });
        });
    }
}

module.exports = app;
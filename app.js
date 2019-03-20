"use strict";

class app {
    constructor() {
        this.loadServer();
    }

    loadServer() {
        const _ = require('lodash');
        const server = require('./resources/js/controller');
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
        global.active_user = 0;
        global.threshold = ((finalConfig.user_tle_minutes * 60) * 1000);

        server.listen(finalConfig.node_port, finalConfig.hostname, () => {
            console.log(`Server running at http://${finalConfig.hostname}:${finalConfig.node_port}/`);
        });
    }
}

module.exports = app;
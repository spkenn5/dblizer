"use strict";

class app {
    constructor() {
        this.loadServer();
    }

    loadServer() {
        const mysql = require('mysql')
        const options = {
            user: 'dev',
            password: 'maingames',
            database: 'playground'
          }
        const connection = mysql.createConnection(options)
        connection.connect(err => {
            if (err) {
              console.error('An error occurred while connecting to the DB')
              throw err
            }
          });

        connection.query('SELECT * FROM cards', (error, todos, fields) => {
           if (error) {
             console.error('An error occurred while executing the query')
             throw error
           }
           console.log("mother shit ", todos, fields);
        });

        const HTTP = require('http');
        const PORT = 8000;

        HTTP.createServer((request, response) => {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write(`Look at my website!`);
            response.end();
        }).listen(PORT);
    }
}

module.exports = app;
const url = require('url');
const fs = require('fs');

exports.renderHome = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./resources/html/index.html', null, function (error, data) {
        if (error) {
            console.log('DEBUG error', error);
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
};

exports.getCss = function (path, req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css');
    fs.readFile('.' + path, null, function (error, data) {
        if (error) {
            console.log('DEBUG error', error);
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
};

exports.getJs = function (path, req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/script');
    fs.readFile('.' + path, null, function (error, data) {
        if (error) {
            console.log('DEBUG error', error);
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
};

exports.submitQuery = function (req, res) {
    let body = '';
    let date = new Date();
    let timestamp = date.getTime();

    req.on('data', function (chunk) {
        body = chunk.toString();
    });

    req.on('end', function () {
        let postBody = JSON.parse(body);
        let response = {};

        let loggedId = postBody.by;
        if (active_user === 0) {
            global.active_user = loggedId;
        }
        if (active_user + threshold < timestamp) {
            global.active_user = loggedId;
        }

        if (loggedId === active_user) {
            db.query(postBody.q, (err, result) => {                        
                if(!err){
                    response = JSON.stringify(result);
                    res.statusCode = 200;            
                } else {                
                    response = JSON.stringify(err);
                    res.statusCode = 500;                
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(response);
            });   
        } else {
            response = JSON.stringify("Another session is active");
            res.statusCode = 400;     
            res.setHeader('Content-Type', 'application/json');
            res.end(response);
        }
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};
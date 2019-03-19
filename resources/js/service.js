const url = require('url');
const fs = require('fs');

exports.renderPage = function (req, res) {
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
}

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
}

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
}

exports.sampleRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name
    }

    var response = {
        "text": "Hello " + name
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

exports.testRequest = function (req, res) {
    body = '';
    var date = new Date();
    var timestamp = date.getTime();

    req.on('data', function (chunk) {
        body = chunk.toString();
    });

    req.on('end', function () {
        postBody = JSON.parse(body);           
        var response = {};

        var loggedId = postBody.by;
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
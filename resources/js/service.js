const url = require('url');

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
    
    req.on('data', function (chunk) {
        body = chunk.toString();
    });

    req.on('end', function () {
        postBody = JSON.parse(body);   
        console.log('DEBUG postBody', postBody.q);
        var response = {};
        db.query(postBody.q, (err, result) => {            
            console.log('DEBUG postBody 2', postBody.q);
            if(!err){
                response = JSON.stringify(result);
                res.statusCode = 200;            
            } else {
                console.log('DEBUG error ', JSON.stringify(err));
                response = JSON.stringify(err);
                res.statusCode = 500;                
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(response);
        });
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};
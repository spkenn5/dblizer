const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    // GET Endpoint
    if (reqUrl.pathname == '/' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);
        service.renderPage(req, res);
    } else if (reqUrl.pathname == '/resources/css/app.css' && req.method === 'GET') { 
        service.getCss(reqUrl.pathname, req, res);
    } else if (reqUrl.pathname == '/resources/js/main.js' && req.method === 'GET') { 
        service.getJs(reqUrl.pathname, req, res);
    }else if (reqUrl.pathname == '/sample' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.sampleRequest(req, res);

        // POST Endpoint
    } else if (reqUrl.pathname == '/submit' && req.method === 'POST') {
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname); 
        service.testRequest(req, res);

    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});
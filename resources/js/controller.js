const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

    const service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/' && req.method === 'GET') {
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.renderHome(req, res);
    } else if (reqUrl.pathname === '/resources/css/app.css' && req.method === 'GET') {
        service.getCss(reqUrl.pathname, req, res);
    } else if (reqUrl.pathname === '/resources/js/main.js' && req.method === 'GET') {
        service.getJs(reqUrl.pathname, req, res);
    } else if (reqUrl.pathname === '/submit' && req.method === 'POST') {
        console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.submitQuery(req, res);
    } else {
        console.log('Request Type:' + req.method + ' Invalid Endpoint: ' + reqUrl.pathname);
        service.invalidRequest(req, res);
    }
});
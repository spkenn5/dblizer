var sendResponse = (response, data, html, statusCode, headers) => {
    response.writeHead(statusCode, headers);
    response.write(html);
    response.end(data);
};
var collectData = (request, callback) => {
    var data = '';
    request.on('data', (chunk) => {
        data += chunk;
    };
    request.on('end', () => {
        callback(data);
    });
};
module.exports = (request, response) => {
    if (request.method === 'GET') {
        sendResponse(response, "", html, 200, {"Content-Type": "text/html"});
    } else if (request.method === 'POST') {
        collectData(request, (formattedData) => {
            // do something with the formatted data e.g. store in db
            sendResponse(response, 'Success', 200, {'Content-Type': 'text/plain'});
        });
    }
};
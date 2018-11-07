//Hello world RESTFul API
var http = require('http');
var url = require('url');
var config = {
    httpPort: 2001
};
var httpServer = http.createServer((req, res) => {
    var path = url.parse(req.url);
    var incomingPath = path.pathname.replace(/^\/+|\/+$/g, '');
    var methodToBeCalled = route[incomingPath] ? route[incomingPath] : methodHandler.NotFound;

    methodToBeCalled((statusCode, msg) => {

        var returnCode = (typeof (stausCode) == 'number') ? statusCode : 404;
        var message = (typeof (msg) == 'object') ? msg : { 'message': 'Page Not Found' };
        res.writeHead(returnCode, { 'content-Type': 'application/json' });
        res.end(JSON.stringify(message));
    });
});
httpServer.listen(config.httpPort, () => {
    console.log(`started listening on port:${config.httpPort}`);
});

var methodHandler = {};
methodHandler.hello = function (callback) {
    callback(200, { 'message': 'Hello World' });
}
methodHandler.NotFound = function (callback) {
    callback();
}

var route = {
    'hello': methodHandler.hello
};
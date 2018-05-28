const http = require('http');
const web = require('./website');

const port = process.env.PORT || 3000;

const server = http.createServer(web);

server.listen(port, () => {
    console.log('Your server is running on port ' + port)
});
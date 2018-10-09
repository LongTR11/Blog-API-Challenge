const express = require('express');
const app = express();
const router = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser());
app.use(morgan('common'));

app.use('/', router);

let server;

function runServer() {
    return new Promise(function(resolve, reject) {
        server = app.listen(8080, function () {
            console.log('listening on 8080');
            resolve();
        }).on('error', function(error) {
            reject(error);
        })
    })
}

function closeServer() {
    return new Promise(function(resolve, reject) {
        console.log('closing the server');
        server.close(function(error) {
            if (error) {
                return reject(error);
            }
            resolve();
        })
    })
}

if (require.main === module) {
    runServer().catch(function(err) {
        return console.error(err);
    })
}


 
app.use('/blogposts', router);
module.exports = {app, runServer, closeServer};
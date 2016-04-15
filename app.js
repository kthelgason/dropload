const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const api = require('./routes/api');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const serveStatic = require('serve-static');

const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy({ immediate: true }));
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'uploads')));

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/api/upload', api.upload);
app.get('/api/fetch/:filename', api.fetch);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

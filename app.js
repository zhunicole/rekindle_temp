
/**
 * Module dependencies.
 */

// libraries

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
lunr = require('lunr'); // No var here to make it global :P. Used in search.js

// Routes

var index = require('./routes/index');
var contact = require('./routes/contact');
var choose = require('./routes/choose');
var view_full_details = require('./routes/view_full_details');
var search = require('./routes/menu/search');
var help = require('./routes/menu/help');
var settings = require('./routes/menu/settings');
var logout = require('./routes/menu/logout');

// Models

var User = require('./models/user');
var Contact = require('./models/contact');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Rekindle secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ACTUAL URLS
app.locals.layout = './main.handlebars';
app.get('/', index.view);
app.get('/index/:id', index.view);
app.get('/choose', choose.view);
app.get('/contact', contact.view);
app.get('/view/:id', view_full_details.view);
// Menu routes
app.get('/search', search.view);
app.get('/help', help.view);
app.get('/settings', settings.view);
app.get('/logout', logout.view);


// Create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

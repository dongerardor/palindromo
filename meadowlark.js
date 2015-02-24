

var express = require('express');

var path = require('path');

var exphbs = require('express-handlebars');

var fortune = require('./lib/fortune.js');
var app = express();

//set up handlevars view engine

// view engine setup
app.set('views', path.join(__dirname, 'views/'));

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);


app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about', { fortune: fortune.getFortune });
});

//404 catch-all handler (middleware)
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

//500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
})

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');	
});
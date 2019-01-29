var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var session = require("express-session");
var FileStore = require("session-file-store")(session);
var MongoStore = require("connect-mongo")(session)

//var passport = require('passport');

var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'session',
    secret: 'abcdefg',
    store: new MongoStore({
        url: 'mongodb://localhost/test',
        collection: 'ch_session'
    }),
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 30*60*1000
    }
}));

app.use(function(req, res, next) {
    if(req.path.indexOf('/login')<0 && !req.session.user){
        return res.redirect('login');
    }else{
        next();
    }
});
// 设置路由
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



app.listen(app.get('post'),function(){
    console.log("Express server listening on port: " + 3000);
});

module.exports = app;

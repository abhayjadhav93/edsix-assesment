var createError = require('http-errors');
var express = require('express');
const bodyParser = require("body-parser");
var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//index Route
var indexRouter = require('./routes/index');
app.use('/api', indexRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
}); 




// error handler
app.use(function (err, req, res, next) {

    models.errorLogger.create({
        message: err.message,
        url:req.url,
        method:req.method,
        host: req.hostname,
        body:req.body,
        userData:req.userData
    })

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(function (err, req, res, next) {
    res.status(500).send({ message: "something went wrong" });
});

module.exports = app;
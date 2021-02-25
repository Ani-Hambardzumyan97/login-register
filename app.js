const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session=require("express-session")
const logger = require('morgan');
const mongoose=require("mongoose")
const { mongodbUrl}=require("./config/config")

const indexRouter = require('./routes/index');
const authRouter = require('./routes/AuthRouter');
const todoRouter=require("./routes/ToDoRouter");
const { chechkSign } = require('./middlewares/checkSign');

//connect to mongo DB
mongoose.connect(mongodbUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

let db=mongoose.connection

db.on("error",(err)=>{
  console.log(err)
})
db.on("connected",()=>{
  console.log("connected")
})




const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"Gevorg"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/todo',chechkSign, todoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;

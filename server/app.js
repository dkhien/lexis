const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const winstonLogger = require('./utils/logger');

const indexRouter = require('./routes/index');
const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');
const summarizeRouter = require('./routes/summarize');

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? [process.env.CLIENT_REDIRECT_URL] : '*',
};

winstonLogger.info('LEXIS SERVER STARTED!');
winstonLogger.debug(`Enviroment: ${process.env.NODE_ENV}`);

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/download', downloadRouter);
app.use('/api/summarize', summarizeRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error back to the requester
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      stack: req.app.get('env') === 'development' ? err.stack : undefined,
    },
  });
});

module.exports = app;

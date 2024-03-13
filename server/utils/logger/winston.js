const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');
const { transports } = require('winston');

const CATEGORY = 'Log Rotation';

const fileRotateTransport = new transports.DailyRotateFile({
  filename: path.join(__dirname, 'logs/%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const errorFileRotateTransport = new transports.DailyRotateFile({
  level: 'error',
  filename: path.join(__dirname, 'logs/error_%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.label({ label: CATEGORY }),
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (log) => {
        if (log.stack) return `[${log.timestamp}] [${log.level.toLocaleUpperCase()}] ${log.stack}`;
        return `[${log.timestamp}] [${log.level.toLocaleUpperCase()}] ${log.message}`;
      },
    ),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true }),
    }),
    fileRotateTransport,
    errorFileRotateTransport,
  ],
});

module.exports = logger;

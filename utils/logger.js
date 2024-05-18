//winston for logging
const winston = require('winston');
const path = require('path');const { LOADIPHLPAPI } = require('dns');
const logsFolder = path.join(__dirname, '..', 'logs');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'school-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: path.join(logsFolder, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logsFolder, 'combined.log') }),
  ],
});

module.exports = {logger}
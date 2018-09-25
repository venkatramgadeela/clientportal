import dotenv from 'dotenv';
import winston from 'winston';
import fs from 'fs';

require('winston-mongodb');

// directory path you want to set
const logDir = 'logs';

// Create the directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Load environment variables
dotenv.config();

// define the custom settings for each transport (file, console)
const options = {
  fileError: {
    level: 'error',
    filename: `logs/errors.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  fileDebug: {
    level: 'debug',
    filename: `logs/combined.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  fileSilly: {
    level: 'silly',
    filename: `logs/access.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true
  },
  mongoDb: {
    level: 'info',
    db: process.env.MONGO_URI,
    collection: 'dctServiceLogs',
    name: 'MongoDbTrasport'
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.fileError),
    new winston.transports.File(options.fileDebug),
    new winston.transports.File(options.fileSilly),
    new winston.transports.MongoDB(options.mongoDb)
  ]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message) {
    logger.silly(message);
  }
};

export default logger;
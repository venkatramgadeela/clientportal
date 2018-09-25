import mongoose from 'mongoose';
import logger from './logger';

mongoose.Promise = global.Promise;

export default app => {
  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    logger.info(`Connected to database.`);
  });

  // If the connection throws an error
  mongoose.connection.on('error', err => {
    logger.error(`Unexpected database connection error: ${err}`);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    logger.info(`Disconnected from database.`);
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(err => {
      if (err != null) {
        logger.error('Error closing mongoose connection', err);
        return process.exit(1);
      }

      logger.debug('Application shutting down. Closing database connection...');
      process.exit(0);
    });
  });

  mongoose.connect(process.env.MONGO_URI);
  mongoose.connection.once('open', () => {
    // database connected - emit a ready event.
    app.emit('databaseReady');
  });
};

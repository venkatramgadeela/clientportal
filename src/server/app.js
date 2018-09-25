import dotenv from 'dotenv';
import path from 'path';
import Express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import lusca from 'lusca';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from './lib/logger';
import db from './lib/mongo';
import session from './lib/session';
import routes from './routes';

// Load environment variables
dotenv.config();

// Initialize Logger
require('./lib/logger');

// Intialize Express Server and configure...
const app = new Express();

// app.use(morgan('dev'));
app.use(
  morgan('combined', {
    stream: logger.stream
  })
);
app.set('port', process.env.EXPRESS_PORT || '3001');
app.use(compression());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// Application Security
app.use(helmet());
app.use(
  lusca({
    xframe: 'SAMEORIGIN',
    xssProtection: true,
    referrerPolicy: 'same-origin'
  })
);

// Static files
app.use(Express.static('public'));

// Session
session(app);

// Initialize routes
app.use('/', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.on('databaseReady', () => {
  // Database is ready so start the server
  app.listen(app.get('port'), () => {
    logger.info(`dct-client listening on port ${app.get('port')}`);
  });
});

// Establish Database Connection
db(app);

export default app;

import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';
import User from '../models/User';

const LocalStrategy = passportLocal.Strategy;
const MongoStore = require('connect-mongo')(session);

export default app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      name: 'aaa-dct',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions'
      }),
      cookie: {
        path: '/',
        maxAge: 60000 * 120
      }
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'email'
      },
      (username, password, cb) => {
        User.findOne(
          {
            email: username,
            active: true,
            deleted: { $ne: true }
          },
          (err, user) => {
            if (err) {
              return cb(err);
            }
            if (!user) {
              return cb(null, false);
            }
            return cb(null, user.minimize());
          }
        );
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.email);
  });

  passport.deserializeUser((email, cb) => {
    User.findOne(
      {
        email
      },
      (err, user) => {
        if (err) {
          return cb(err, false);
        }
        cb(null, user);
      }
    );
  });

  // Passport Authentication
  app.use(passport.initialize());
  app.use(passport.session());
};

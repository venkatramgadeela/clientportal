const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) {
      return res.send(info.message);
    }
    if (err) {
      return res.status(401).json({
        message: err
      });
    }
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials.'
      });
    }
    req.login(user, err => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send();
});

export default router;
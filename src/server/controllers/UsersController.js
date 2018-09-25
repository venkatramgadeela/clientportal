import logger from 'winston';
import User from '../models/User';

export const getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      logger.error('Error getting users. ', err);
      return res.status(500).send();
    }
    const minimizedUsers = users.map(user => user.minimize());
    res.json(minimizedUsers);
  });
};

export const getUserById = (req, res) => {
  User.find({ email: req.params.email }, (err, user) => {
    if (err) {
      logger.error('Error getting user');
      return res.status(500).send();
    }
    res.json(user.minimize());
  });
};
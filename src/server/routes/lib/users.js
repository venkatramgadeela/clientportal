import express from 'express';
import * as UsersController from '../../controllers/UsersController';
import {
  ensureAuthenticated,
  ensureIsAdmin
} from '../../services/auth/middlewares';

const users = express.Router();

users.get('/', ensureAuthenticated, ensureIsAdmin, UsersController.getUsers);

export default users;

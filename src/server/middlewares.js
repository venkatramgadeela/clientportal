import UserRoles from '../../../common/constants/UserRoles';
import { GENERIC_ERRORS } from '../../../common/constants/ResponseErrors';

export const ensureAuthenticated = (req, res, next) =>
  req.isAuthenticated()
    ? next()
    : res.status(401).json(GENERIC_ERRORS.FORBIDDEN);

export const ensureIsAdmin = (req, res, next) => {
  isAdmin(req) ? next() : res.status(403).json(GENERIC_ERRORS.FORBIDDEN);
};

export const isAdmin = req => req.user.role === UserRoles.ROLE_ADMIN;

export const isUser = req => req.user.role === UserRoles.ROLE_USER;
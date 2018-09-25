import store from '../../store';
import UserRoles from '../../../common/constants/UserRoles';

class Auth {
  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    const { auth } = store.getState();
    if (
      Object.prototype.hasOwnProperty.call(auth, 'user') &&
      auth.user != null
    ) {
      return true;
    }
    return false;
  }

  /**
   * Get user role
   * @returns {string}
   */
  static getUserRole() {
    const { auth } = store.getState();
    if (
      Object.prototype.hasOwnProperty.call(auth, 'user') &&
      Object.prototype.hasOwnProperty.call(auth.user, 'role')
    ) {
      return auth.user.role;
    }
    return null;
  }

  /**
   * Determine if user is an admin
   * @returns {string}
   */
  static isAdmin() {
    const { auth } = store.getState();
    if (
      Object.prototype.hasOwnProperty.call(auth, 'user') &&
      Object.prototype.hasOwnProperty.call(auth.user, 'role')
    ) {
      return auth.user.role === UserRoles.ROLE_ADMIN;
    }
    return false;
  }
}

export default Auth;

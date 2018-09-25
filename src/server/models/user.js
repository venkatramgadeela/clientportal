import mongoose from 'mongoose';

import UserRoles from '../../common/constants/UserRoles';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
      default: null
    },
    lastName: {
      type: String,
      required: true,
      default: null
    },
    phoneNumber: {
      type: String,
      default: null
    },
    role: {
      type: String,
      required: true,
      default: UserRoles.ROLE_USER
    },
    clubs: [
      {
        type: String
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: String,
      default: null
    },
    updatedBy: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

/**
 * Return javascript object containing minimal propoerties.
 *
 * @return {Object}
 */
userSchema.methods.minimize = function() {
  const miniUser = {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    phoneNumber: this.phoneNumber,
    role: this.role,
    clubs: this.clubs,
    active: this.active,
    deleted: this.deleted
  };
  return miniUser;
};

const User = mongoose.model('users', userSchema);

export default User;
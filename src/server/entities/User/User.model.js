import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Create User Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String
    }
  },
  { timestamps: true }
);

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} cb
 */
UserSchema.methods.comparePassword = function comparePassword(password, cb) {
  bcrypt.compare(password, this.password, cb);
};

/**
 * Create a password hash before saving the user to the database.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      // replace password string with hash value
      user.password = hash;

      return next();
    });
  });
});

export default mongoose.model('User', UserSchema);

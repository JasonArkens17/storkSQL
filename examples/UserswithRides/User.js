import dbm from './db';
export const UserSchema = function (user) {
  user.increments('id').primary();
  user.string('email', 100).unique();
  user.string('password', 100);
  user.string('homeLatitude', 100);
  user.string('homeLongitude', 100);
  user.string('homeAddress', 100);
  user.timestamps();
};

export const User = dbm.model('users');

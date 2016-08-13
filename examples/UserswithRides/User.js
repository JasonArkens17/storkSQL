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
//
// User.create({email: 'hise', password:'pass'})
// .then((user) => console.log(user));
//

// User.findOne({email: 'hise'})
// .then((user) => console.log(user));
//
// User.updateOrCreate({email: 'hise', password:'otherpass'})
// .then((user) => console.log(user));

// User.update({email:'hise'}, {password:'otherpass'})
// .then((user) => console.log(user));

// User.updateOrCreate({email: 'hise'}, {password: 'origpass'})
// .then((user) => console.log(user));

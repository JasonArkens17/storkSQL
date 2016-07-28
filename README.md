```
export const facebookAuthConfig = function(User) {
  passport.use(new FacebookStrategy({
    clientID: FB.APP_ID,
    clientSecret: FB.APP_SECRET,
    callbackURL: FB.CALLBACK,
    enableProof: true,
    profileFields: ['id', 'emails', 'name']
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return User.findOrCreate({
        name: profile.name.givenName,
        facebookId: profile.id,
        facebookAccessToken: accessToken
      })
      .then((user) => {
        console.log('got it!');
        return done(null, user);
      })
      .catch((err) => done(err, null));
    });
  }
  ));
  ```


  import _ from 'lodash';
  import Stork from './Stork';
  import dbConnection from './dbConnect';
  import SpotsUsers from './spotsUsersJoin';
  import Promise from 'bluebird';

  const spotSchema = {
    columns: {
      name: 'string',
      rating: 'number',
      latitude: 'number',
      longitude: 'number',
      yelp_id: 'string'
    },
    tableName: 'spots'
  };

  class Spot extends DB {
    constructor(dbConnection, schema) {
      super(dbConnection, schema);
    }

    getAllForUser(user) {
      return SpotsUsers.find({userid: user.id})
        .then((spotsUsers) => {
          return Promise.all(spotsUsers.map((spotUser) => this.find({id: spotUser.spotid})));
        })
        .then((results) => results.map((result) => result[0]))
        .catch((err) => console.log(err));
    }
  }

  export default new Spot(dbConnection, spotSchema);

  mport DB from './queries';
  import {createInsertQuery} from './queryHelpers';

  const userSchema = {
    columns: {
      name: 'string',
      username: 'string',
      password: 'string',
      facebookId: 'number',
      facebookAccessToken: 'string'
    },
    tableName: 'users'
  };

  class User extends DB {
    constructor(dbConnection, userSchema) {
      super(dbConnection, userSchema);
    }

    create(obj) {
      return this.pg.query(createInsertQuery(this.schema, {
        username: obj.username,
        password: this.generateHash(obj.password)
      }));
    }

    generateHash(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    isValidPassword(password, id) {
      return this.find({id: id})
      .then((user) => {
        return bcrypt.compareSync(password, user[0].password);
      })
      .catch((err) => console.log(err));
    }
  }

  export default new User(dbConnection, userSchema);

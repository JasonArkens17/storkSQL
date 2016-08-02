## Getting Started ##

**Under construction!** 
Use at your own risk!

Import the library
```javascript
const Stork = require('storkSQL');
```

### Configure the database ###

```javascript
import Stork from '../src/Stork';

const db = new Stork('postgres://localhost:5432');
db.dropDb('tests')
.then(r => db.createDb('tests'))
.then(r => db.connect('tests'))
.then((r => db.createTable('users', {username: 'string', password: 'string'})))
.then((r => console.log('done')));
```
The database can be configured with the following methods:
```
connect(dbName)
dropDb(dbName)
createDb(dbName)
createTable(tableName, schema)
dropTable(tableName)
addColumn(tableName, column)
```

### Create Queries ###

Set up the connection to your postgres DB and input a schema

```javascript
import Stork from '../src/Stork';

const db = new Stork('postgres://localhost:5432/tests');

const UserSchema = {
  username: 'string',
  password: 'string'
}

const User = db.Model('users', UserSchema);
// console.log(User);

const myUser = {
  username: 'Alex',
  password: 'cats'
}

User.save(myUser);

User.find(myUser)
  .then((user) => console.log(user));
```

This will give you access to the following queries:
```
getAll
getOne
find
findOne
save
create
findOrCreate
remove
```

Using Stork with FB Auth
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

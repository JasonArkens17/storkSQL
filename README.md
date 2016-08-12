## Getting Started ##

You'll need two things to get started: the library and a DB client.

`npm install storkSQL`
`npm install pg`

Stork uses knex which supports pg, mySQL, and SQlite.

Import the library

### Configure the database ###

`databaseManagement.js`
```javascript
import Stork from 'storkSQL';
// Put your information below
const DB_CONFIG_OBJ = {
  host: '',
  password: '',
  database: '',
  port: 3241,
  user: '',
  ssl: true
};
export default new Stork(DB_CONFIG_OBJ, 'pg');
```

### Set up your schema and models ###
`User.js`
```javascript
import dbm from './path/to/databaseManagement';
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
```

This will give you access to the following queries:
```
findAll()
findById(id)
find(obj)
findOrCreate(obj)
create(obj)
save(obj)
update(criteriaObj, updateObj)
remove(obj)
```
Each query will return a promise that must be resolved, like so:

```javascript
User.find({id: req.params.userid})
  .then((user) => res.json(user));
};
```


It is recommended to create files to help manage your DB like this:
```javascript
const resetDb = async function() {
  await db.schema.dropTableIfExists('users');
  console.log('dropping users table');
  await db.schema.dropTableIfExists('rides');
  console.log('dropping rides table');

  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', UserSchema);
    console.log('created new users table');
  }

  if (!(await db.schema.hasTable('rides'))) {
    await db.schema.createTable('rides', RideSchema);
    console.log('created new rides table');
  }

  await db.destroy();
  console.log('connection destroyed');
};


resetDb();

```

Remember to transpile as async/await isn't supported everywhere, yet.


## To-Do ##
* Testing
* Database management
* Relationships and joins

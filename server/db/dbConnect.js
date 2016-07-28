import promise from 'bluebird';

const pgp = require('pg-promise')({
  promiseLib: promise
});

let connectionString = 'postgres://localhost:5432/hotspots';

if (process.env.DATABASE_URL) {
  connectionString = process.env.DATABASE_URL;
}

const pg = pgp(connectionString);

export default pg;

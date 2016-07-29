import promise from 'bluebird';
import StorkQueries from './StorkQueries';

export default class Stork {
  constructor(connectionString) {
    this.pg = require('pg-promise')({promiseLib: promise})(connectionString);
  }

  Model(tableName, schema) {
    console.log('making model');
    return new StorkQueries(tableName, schema, this.pg);
  }

  dropDb = function(dbName) {
    return this.pg.query(`DROP DATABASE IF EXISTS ${dbName}`);
  };

  createDb = function(dbName) {
    return this.pg.query(`CREATE DATABASE ${dbName}`);
  };

  createTable = function(tableName, schema) {
    return this.pg.query(`CREATE TABLE ${tableName} (
      id SERIAL PRIMARY KEY,
      userid INT,
      spotid INT
    )`);
  };

  dropTable = function(tableName) {

  };

  alterTable = function(tableName, obj) {

  };
}

DROP DATABASE IF EXISTS hotspots;
CREATE DATABASE hotspots;

-- connect to the db (\c)
\c hotspots;

CREATE TABLE spots_users (
  id SERIAL PRIMARY KEY,
  userid INT,
  spotid INT
);

CREATE TABLE spots (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  rating VARCHAR,
  latitude REAL,
  longitude REAL,
  yelp_id VARCHAR
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  username VARCHAR,
  password VARCHAR,
  facebookId BIGINT,
  facebookAccessToken VARCHAR
);

--  heroku pg:psql --app [NAME OF APP] -f server/db/setuphotspotdb.sql

// const Stork = function(connectionString) {
//   this.pg = require('pg-promise')({promiseLib: promise})(connectionString);
// };

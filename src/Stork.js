import promise from 'bluebird';
import StorkQueries from './StorkQueries';
import qh from './queryHelpers';

const pgp = require('pg-promise')({promiseLib: promise});
export default class Stork {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.pg = pgp(connectionString);
  }

  Model(tableName, schema) {
    console.log('making model');
    return new StorkQueries(tableName, schema, this.pg);
  }

  connect(dbName) {
    this.connectionString += `/${dbName}`;
    this.pg = pgp(this.connectionString);
  }

  dropDb(dbName) {
    console.log(`DROP DATABASE IF EXISTS ${dbName}`);
    return this.pg.query(`DROP DATABASE IF EXISTS ${dbName}`);
  }

  createDb(dbName) {
    console.log(`CREATE DATABASE ${dbName}`);
    return this.pg.query(`CREATE DATABASE ${dbName}`);
  }

  createTable(tableName, schema) {
    let query = qh.createMakeTableQuery(tableName, schema);
    console.log(query);
    return this.pg.query(query);
  }

  dropTable(tableName) {
    return this.pg.query(`DROP TABLE ${tableName}`);
  }

  addColumn(tableName, column) {
    return this.pg.query(qh.createAddColumnQuery(tableName, column));
  }
}

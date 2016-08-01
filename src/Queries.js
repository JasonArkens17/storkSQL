import qh from './queryHelpers';
import Promise from 'bluebird';

const pgp = require('pg-promise')({promiseLib: Promise});

const { insert, update } = pgp.helpers;

console.log(insert({username: 'alex'}, null, 'users'));

export default class Table {
  constructor(tableName, schema, pg) {
    this.tableName = tableName;
    this.schema = schema;
    this.pg = pg;
  }

  findAll() {
    return this.pg.query(`select * from ${this.tableName}`);
  }

  findById(id) {
    return this.pg.query(`select * from ${this.tableName} where id = ${id}`);
  }

  find(obj) {
    return this.pg.query(qh.createSelectQuery(this.tableName, this.schema, obj));
  }

  findOne(obj) {
    return this.find(obj).then((users) => users[0]);
  }

  update(obj) {
    return this.pg.query(update(obj, null, this.tableName));
  }

  save(obj) {
    // return this.pg.query(qh.createInsertQuery(this.tableName, this.schema, obj));
    return this.pg.query(insert(obj, null, this.tableName));
  }

  create(obj) {
    return save(obj);
  }

  findOrCreate(obj) {
    return this.findOne(obj)
    .then((foundObj) => foundObj ? foundObj : this.create(obj));
  }

  remove(id) {
    return this.pg.query(`delete from ${this.tableName} where id = ${id}`);
  }

}

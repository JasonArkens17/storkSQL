import qh from './queryHelpers';
import Promise from 'bluebird';

const pgp = require('pg-promise')({promiseLib: Promise});

const { insert, update, TableName } = pgp.helpers;

console.log(insert({username: 'alex'}, null, 'users'));

export default class Table {
  constructor(tableName, schema, pg) {
    this.table = new TableName(tableName, schema); // this automatically wraps up a schema, plus knows how to be formatted;
    this.pg = pg;
  }

  findAll() {
    return this.pg.query('select * from ${table}', this);
  }

  findById(id) {
    return this.pg.query('select * from ${table} where id = ${id}', {table: this.table, id});
  }

  find(obj) {
    // you might want to change this to use type TableName instead, which already contains table+schema+formatting
    // the destination should only use pre-formatted table.name
    return this.pg.query(qh.createSelectQuery(this.table.table, this.table.schema, obj));
  }

  findOne(obj) {
    return this.find(obj).then((users) => users[0]);
  }

  update(obj) {
    return this.pg.query(update(obj, null, this.table));
  }

  save(obj) {
    // return this.pg.query(qh.createInsertQuery(this.tableName, this.schema, obj));
    return this.pg.query(insert(obj, null, this.table));
  }

  create(obj) {
    return save(obj);
  }

  findOrCreate(obj) {
    return this.findOne(obj)
    .then((foundObj) => foundObj ? foundObj : this.create(obj));
  }

  remove(id) {
    return this.pg.query('delete from ${table} where id = ${id}', {table: this.table, id});
  }

}

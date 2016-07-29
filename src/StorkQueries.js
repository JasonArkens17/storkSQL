import qh from './queryHelpers';

export default class StorkQueries {
  constructor(tableName, schema, pg) {
    this.tableName = tableName;
    this.schema = schema;
    this.pg = pg;
  }

  getAll() {
    return this.pg.query(`select * from ${this.tableName}`);
  }

  getOne(id) {
    return this.pg.query(`select * from ${this.tableName} where id = ${id}`);
  }

  find(obj) {
    console.log('find obj', obj);
    return this.pg.query(qh.createSelectQuery(this.tableName, this.schema, obj));
  }

  save(obj) {
    return this.pg.query(qh.createInsertQuery(this.tableName, this.schema, obj));
  }

  create(obj) {
    return save(obj);
  }

  findOrCreate(obj) {
    return this.find(obj)
    .then((foundObj) => {
      if (foundObj.length > 0) {
        return foundObj;
      }
      return this.create(obj);
    });
  }

  remove(id) {
    return this.pg.query(`delete from ${this.tableName} where id = ${id}`);
  }

}

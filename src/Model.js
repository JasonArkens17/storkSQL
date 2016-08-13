class Model {
  constructor(table, db) {
    this.db = db;
    this.table = table;
    this.relationships = [];
  }

  findAll() {
    return this.db.select().from(this.table);
  }

  findById(id) {
    return this.db.select().from(this.table).where({id: id});
  }

  find(obj) {
    return this.db.select().from(this.table).where(obj);
  }

  findOne(obj) {
    return this.db.select().from(this.table).where(obj)
      .then((user) => user[0]);
  }

  findOrCreate(obj) {
    // finds only on first val
    let firstProperty = Object.keys(obj)[0];
    this.db.select().from(this.table).where({[firstProperty]: obj[firstProperty]})
    .then((foundObj) => {
      if (!foundObj) {
        return this.create(obj);
      } else {
        return foundObj;
      }
    });
  }

  updateOrCreate(obj) {
    return this.find(obj)
    .then((foundObj) => {
      if (!foundObj) {
        return this.create(obj);
      } else {
        return update(foundObj, obj);
      }
    });
  }

  create(obj) {
    return this.db.insert(obj).into(this.table).returning('*');
  }

  save(obj) {
    return this.create(obj);
  }

  update(criteriaObj, updateObj) {
    return this.db(this.table)
      .update(updateObj, [...updateObj])
      .where(criteriaObj)
      .returning('*');
  }

  remove(obj) {
    return this.db(this.table)
      .where(obj)
      .del();
  }

  // TODO create event and lifecycle hooks
  // on(event) {
  //
  // }

}

export default Model;

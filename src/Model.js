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
    return this.db.select().from(this.table).orWhere(obj);
  }

  findOne(obj) {
    return this.db.select().from(this.table).orWhere(obj)
      .then((user) => user[0]);
  }

  findOrCreate(obj) {
    // finds only on first val
    let firstProperty = Object.keys(obj)[0];
    this.db.select().from(this.table).orWhere({[firstProperty]: obj[firstProperty]})
    .then((foundObj) => {
      if (!foundObj) {
        return this.create(obj);
      } else {
        return foundObj;
      }
    });
  }

  updateOrCreate(findCriteria, updateCriteria) {
    return this.findOne(findCriteria)
    .then((foundObj) => {
      if (!foundObj) {
        return this.create(updateCriteria);
      } else {
        return this.update(findCriteria, updateCriteria);
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
    return this.db(this.table).update(updateObj).orWhere(criteriaObj).returning('*');
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

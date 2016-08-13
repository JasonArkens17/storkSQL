import Model from './Model';
import UserModel from './UserModel';
import knex from 'knex';

export default class DatabaseInstance {
  constructor(configObj, client) {
    this.knex = knex({
      client: client,
      connection: configObj
    });
    this.db = this.knex;
  }

  model(table, options) {
    if (options.secureFields) {
      return new SecureFieldsModel(table, this.db, options.secureFields.password, options.secureFields.fields);
    }
    if (options.user) {
      return new UserModel(table, this.db);
    }
    return new Model(table, this.db);
  }

  dropTableIfExists(tableName) {
    return this.db.schema.dropTableIfExists(tableName);
  }

  hasTable(tableName) {
    return this.db.schema.hasTable(tableName);
  }

  createTable(tableName, schema) {
    return this.db.schema.createTable(tableName, schema);
  }

  endConnection() {
    return this.db.destroy();
  }
}

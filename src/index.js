import Model from './Model';
import UserModel from './specializedModels/UserModel';
import SecureFieldsModel from './specializedModels/SecureFieldsModel';
import knex from 'knex';

export default class DatabaseInstance {
  constructor(configObj, client, options) {
    if (options && options.testing) {
      this.knex = this.db = knex({});
    } else {
      this.knex = this.db = knex({
        client: client,
        connection: configObj
      });
    }
  }

  model(table, options) {
    if (options && options.secureFields) {
      return new SecureFieldsModel(table, this.db, options.secureFields.password, options.secureFields.fields);
    }
    if (options && options.user) {
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

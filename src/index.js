import Model from './Model';
import UserModel from './UserModel';
import knex from 'knex';

export default class DatabaseInstance {
  constructor(configObj, client) {
    this.db = knex({
      client: client,
      connection: configObj
    });
  }
  model(table) {
    return new Model(table, this.db);
  }
}

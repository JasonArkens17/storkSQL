'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _UserModel = require('./specializedModels/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _SecureFieldsModel = require('./specializedModels/SecureFieldsModel');

var _SecureFieldsModel2 = _interopRequireDefault(_SecureFieldsModel);

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatabaseInstance = function () {
  function DatabaseInstance(configObj, client) {
    _classCallCheck(this, DatabaseInstance);

    this.knex = (0, _knex2.default)({
      client: client,
      connection: configObj
    });
    this.db = this.knex;
  }

  _createClass(DatabaseInstance, [{
    key: 'model',
    value: function model(table, options) {
      if (options && options.secureFields) {
        return new _SecureFieldsModel2.default(table, this.db, options.secureFields.password, options.secureFields.fields);
      }
      if (options && options.user) {
        return new _UserModel2.default(table, this.db);
      }
      return new _Model2.default(table, this.db);
    }
  }, {
    key: 'dropTableIfExists',
    value: function dropTableIfExists(tableName) {
      return this.db.schema.dropTableIfExists(tableName);
    }
  }, {
    key: 'hasTable',
    value: function hasTable(tableName) {
      return this.db.schema.hasTable(tableName);
    }
  }, {
    key: 'createTable',
    value: function createTable(tableName, schema) {
      return this.db.schema.createTable(tableName, schema);
    }
  }, {
    key: 'endConnection',
    value: function endConnection() {
      return this.db.destroy();
    }
  }]);

  return DatabaseInstance;
}();

exports.default = DatabaseInstance;
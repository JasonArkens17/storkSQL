"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model(table, db) {
    _classCallCheck(this, Model);

    this.db = db;
    this.table = table;
    this.relationships = [];
  }

  _createClass(Model, [{
    key: "findAll",
    value: function findAll() {
      return this.db.select().from(this.table);
    }
  }, {
    key: "findById",
    value: function findById(id) {
      return this.db.select().from(this.table).where({ id: id });
    }
  }, {
    key: "find",
    value: function find(obj) {
      return this.db.select().from(this.table).where(obj);
    }
  }, {
    key: "findOrCreate",
    value: function findOrCreate(obj) {
      var _this = this;

      // finds only on first val
      var firstProperty = Object.keys(obj)[0];
      this.db.select().from(this.table).where(_defineProperty({}, firstProperty, obj[firstProperty])).then(function (foundObj) {
        if (!foundObj) {
          return _this.create(obj);
        } else {
          return foundObj;
        }
      });
    }

    // TODO

  }, {
    key: "updateOrCreate",
    value: function updateOrCreate(obj) {}
  }, {
    key: "create",
    value: function create(obj) {
      var _db$insert$into;

      return (_db$insert$into = this.db.insert(obj).into(this.table)).returning.apply(_db$insert$into, _toConsumableArray(Object.keys(obj)));
    }
  }, {
    key: "save",
    value: function save(obj) {
      return this.create(obj);
    }
  }, {
    key: "update",
    value: function update(criteriaObj, updateObj) {
      var _db$update$where;

      return (_db$update$where = this.db(this.table).update(updateObj, [].concat(_toConsumableArray(updateObj))).where(criteriaObj)).returning.apply(_db$update$where, _toConsumableArray(Object.keys(updateObj)));
    }
  }, {
    key: "remove",
    value: function remove(obj) {
      return this.db(this.table).where(obj).del();
    }
  }]);

  return Model;
}();

exports.default = Model;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    key: 'findAll',
    value: function findAll() {
      return this.db.select().from(this.table);
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      return this.db.select().from(this.table).where({ id: id });
    }
  }, {
    key: 'find',
    value: function find(obj) {
      return this.db.select().from(this.table).orWhere(obj);
    }
  }, {
    key: 'findOne',
    value: function findOne(obj) {
      return this.db.select().from(this.table).orWhere(obj).then(function (user) {
        return user[0];
      });
    }
  }, {
    key: 'findOrCreate',
    value: function findOrCreate(obj) {
      var _this = this;

      // finds only on first val
      var firstProperty = Object.keys(obj)[0];
      this.db.select().from(this.table).orWhere(_defineProperty({}, firstProperty, obj[firstProperty])).then(function (foundObj) {
        if (!foundObj) {
          return _this.create(obj);
        } else {
          return foundObj;
        }
      });
    }
  }, {
    key: 'updateOrCreate',
    value: function updateOrCreate(findCriteria, updateCriteria) {
      var _this2 = this;

      return this.findOne(findCriteria).then(function (foundObj) {
        if (!foundObj) {
          return _this2.create(updateCriteria);
        } else {
          return _this2.update(findCriteria, updateCriteria);
        }
      });
    }
  }, {
    key: '_ModelCreate',
    value: function _ModelCreate(obj) {
      return this.db.insert(obj).into(this.table).returning('*');
    }
  }, {
    key: 'create',
    value: function create(obj) {
      return this.db.insert(obj).into(this.table).returning('*');
    }
  }, {
    key: 'save',
    value: function save(obj) {
      return this.create(obj);
    }
  }, {
    key: 'update',
    value: function update(criteriaObj, updateObj) {
      return this.db(this.table).update(updateObj).orWhere(criteriaObj).returning('*');
    }
  }, {
    key: 'remove',
    value: function remove(obj) {
      return this.db(this.table).where(obj).del();
    }

    // TODO create event and lifecycle hooks
    // on(event) {
    //
    // }

  }]);

  return Model;
}();

exports.default = Model;
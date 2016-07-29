'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendBackJSON = exports.createSelectQuery = exports.createUpdateQuery = exports.createInsertQuery = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeWrapper = function typeWrapper(thing, type) {
  if (thing === null) return null;
  if (type === 'string') return '\'' + thing + '\'';
  return thing;
};

var createInsertQuery = exports.createInsertQuery = function createInsertQuery(schema, objToInsert) {
  var query = 'insert into ' + schema.tableName;
  var columns = '('.concat(_lodash2.default.reduce(Object.keys(schema.columns), function (columns, val) {
    return columns + ', ' + val;
  }), '').concat(')');
  var initial = true;
  var values = 'values ('.concat(_lodash2.default.reduce(schema.columns, function (values, val, key) {
    if (initial) {
      initial = false;
      return '' + typeWrapper(objToInsert[key] || null, val);
    }
    return values + ', ' + typeWrapper(objToInsert[key] || null, val);
  }, '')).concat(') returning *');
  console.log(query + ' ' + columns + ' ' + values);
  return query + ' ' + columns + ' ' + values;
};

var createUpdateQuery = exports.createUpdateQuery = function createUpdateQuery(schema, updateObj, id) {
  var query = 'update ' + schema.tableName + ' set';
  var changes = _lodash2.default.reduce(updateObj, function (columnChanges, val, key) {
    return columnChanges + ' ' + key + ' = ' + typeWrapper(val, schema.columns[val]) + ',';
  }, '').concat('where id = ' + id);
  return query + ' ' + changes + ';';
};

var createSelectQuery = exports.createSelectQuery = function createSelectQuery(schema, findObj) {
  var query = 'select * from ' + schema.tableName + ' where';
  var length = Object.keys(findObj).length;
  var i = 0;
  var params = _lodash2.default.reduce(findObj, function (params, val, key) {
    if (i === length - 1) {
      return params + ' ' + key + ' = ' + typeWrapper(val, schema.columns[key]);
    }
    i++;
    return params + ' ' + key + ' = ' + typeWrapper(val, schema.columns[key]) + ' or';
  }, '');
  console.log(query + ' ' + params);
  return query + ' ' + params;
};

var sendBackJSON = exports.sendBackJSON = function sendBackJSON(res, data, message) {
  return res.status(200).json({
    data: data,
    message: message
  });
};
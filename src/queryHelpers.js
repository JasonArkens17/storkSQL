import _ from 'lodash';
const typeWrapper = function(thing, type) {
  if (thing === null) { return null; }
  if (type === 'string') { return `\'${thing}\'`; }
  return thing;
};

const qh = {};
const typeDictionary = {
  'string': 'VARCHAR',
  'number': 'INT'
};

qh.createInsertQuery = function (tableName, schema, objToInsert) {
  let query = `insert into ${tableName}`;
  let columns = '('.concat(_
    .reduce(Object.keys(schema), (columns, val) => `${columns}, ${val}`), '')
    .concat(')');
  let initial = true;
  let values = 'values ('.concat(_
    .reduce(schema, (values, val, key) => {
      if (initial) {
        initial = false;
        return `${typeWrapper(objToInsert[key] || null, val)}`;
      }
      return `${values}, ${typeWrapper(objToInsert[key] || null, val)}`;
    }, ''))
    .concat(') returning *');
  console.log(`${query} ${columns} ${values}`);
  return `${query} ${columns} ${values}`;
};

qh.createUpdateQuery = function(tableName, schema, updateObj, id) {
  let query = `update ${tableName} set`;
  let changes = _.reduce(updateObj, (columnChanges, val, key) => {
    return `${columnChanges} ${key} = ${typeWrapper(val, schema[val])},`;
  }, '').concat(`where id = ${id}`);
  return `${query} ${changes};`;
};

qh.createSelectQuery = function(tableName, schema, findObj) {
  console.log('find obj', findObj);
  let query = `select * from ${tableName} where`;
  let length = Object.keys(findObj).length;
  let i = 0;
  let params = _.reduce(findObj, (params, val, key) => {
    if (i === length - 1) {
      return `${params} ${key} = ${typeWrapper(val, schema[key])}`;
    }
    i++;
    return `${params} ${key} = ${typeWrapper(val, schema[key])} or`;
  }, '');
  console.log(`${query} ${params}`);
  return `${query} ${params}`;
};

qh.createMakeTableQuery = function(tableName, schema) {
  let query = `CREATE TABLE ${tableName} (`;
  let length = Object.keys(schema).length;
  let i = 0;
  query += 'id SERIAL PRIMARY KEY, ';
  _.each(schema, (val, key) => {
    if (i === length - 1) {
      query += ` ${key} ${typeDictionary[val]} `;
    } else {
      query += ` ${key} ${typeDictionary[val]}, `;
    }
    i += 1;
  });
  query += ')';
  return query;
};

qh.createAddColumnQuery = function(tableName, column) {
  let query = `ALTER TABLE ${tableName} ADD COLUMN ${column.name} ${typeDictionary[column.type]} ${column.null || ''}`;
  if (column.default) {
    query += `DEFAULT ${typeWrapper(column.default, column.type)}`;
  }
  return query;
};


export default qh;

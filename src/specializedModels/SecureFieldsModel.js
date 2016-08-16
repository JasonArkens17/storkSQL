import Model from '../Model';
import _ from 'lodash';
const crypto = require('crypto');

export default class SecureFields extends Model {
  constructor(tableName, db, password, secureFields) {
    super(tableName, db);
    this.algorithm = 'aes-256-ctr';
    this.password = password;
    this.secureFields = secureFields;
  }

  create(obj) {
    return this._ModelCreate(this.encryptModel(obj));
  }

  updateOrCreate(findCriteria, updateCriteria) {
    return this.findOne(findCriteria)
    .then((foundObj) => {
      if (!foundObj || foundObj.length === 0) {
        return this.create(updateCriteria);
      } else {
        return this.update(findCriteria, updateCriteria);
      }
    });

    return this._ModelCreate(obj);
  }

  update(criteriaObj, updateObj) {
    return this._ModelUpdate(criteriaObj, this.encryptModel(updateObj));
  }

  findOrCreate(obj) {
    // finds only on first val
    let firstProperty = Object.keys(obj)[0];
    this.findOne(obj)
    .then((foundObj) => {
      if (!foundObj || foundObj.length === 0) {
        return this.create(obj);
      } else {
        return foundObj;
      }
    });
  }

  decryptCollection(collection) {
    return collection.map((model) => this.decryptModel(model));
  }

  decryptModel(obj) {
    let decrypted = _.extend({}, obj);
    _(this.secureFields).each((field) => {
      if (decrypted[field]) {
        decrypted[field] = this.decrypt(decrypted[field]);
      }
    });
    return decrypted;
  }


  encryptModel(obj) {
    let encrypted = _.extend({}, obj);
    _(this.secureFields).each((field) => {
      if (encrypted[field]) {
        encrypted[field] = this.encrypt(encrypted[field]);
      }
    });
    return encrypted;
  }

  encryptCollection(collection) {
    return collection.map((model) => this.encryptModel(model));
  }

  encrypt(text) {
    const cipher = crypto.createCipher(this.algorithm, this.password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  decrypt(text) {
    const decipher = crypto.createDecipher(this.algorithm, this.password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }

}

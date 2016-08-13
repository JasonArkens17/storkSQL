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
    this.secureFields.forEach((field) => {
      if (obj[field]) {
        obj[field] = this.encrypt(obj[field]);
      }
    });

    return this._ModelCreate(obj);
  }

  decryptCollection(collection) {
    return collection.map((model) => this.decryptedModel(model));
  }

  decryptModel(obj) {
    let decrypted = _.extend({}, obj);
    _(decrypted).each((field) => {
      if (decrypted[field]) {
        decrypted[field] = this.decrypt(decrypted[field]);
      }
    });
    return decrypted;
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

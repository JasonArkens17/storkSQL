import Model from '../Model';
import bcrypt from 'bcrypt-nodejs';

export default class UserModel extends Model {
  constructor(tableName, db, password) {
    super(tableName, db);
  }

  create(user) {
    user.password = this.generateHash(user.password);
    return this.db.insert(user).into(this.table).returning('*');
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  isValidPassword(password, id) {
    return this.findById(id)
    .then((user) => {
      return bcrypt.compareSync(password, user[0].password);
    })
    .catch((err) => console.log(err));
  }
}

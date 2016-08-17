const expect = require('chai').expect;
import Stork from '../src/index';

const testDB = new Stork(null, null, {testing: true});
const User = testDB.model('users', {
  secureFields: {
    fields: ['password', 'token'],
    password: 'yo'
  }
});

describe('Testing suite for Stork ORM', () => {
  describe('Secure fields testing', () => {
    it('should encrypt and decrypt a single model properly', (done) => {
      const userToEncrypt = {
        username: 'alex',
        password: 'hello',
        token: 'ilovewerewolves'
      };
      const salt = User.salt(10);
      console.log('==sssss==================', salt);
      const encryptedUser = User.encryptModel(userToEncrypt, salt);
      const decryptedUser = User.decryptModel(encryptedUser, salt);
      expect(decryptedUser).to.deep.equal(userToEncrypt);
      done();
    });

    it('should encrypt and decrypt collections properly', (done) => {
      const usersCollectionToEncrypt = [
        {
          username: 'alex',
          password: 'hello',
          token: 'ilovewerewolves'
        },
        {
          username: 'jason',
          password: 'jambo2o81',
          token: 'a./sdjfljas#@#'
        },
        {
          username: 'chris',
          password: 'asdl,j13on@!',
          token: 'ateta3q23kj5lka@#'
        }
      ];
      const encryptedUserCollection = User.encryptCollection(usersCollectionToEncrypt);
      const decryptedUserCollection = User.decryptCollection(encryptedUserCollection);
      expect(decryptedUserCollection).to.deep.equal(usersCollectionToEncrypt);
      done();
    });
  });
});

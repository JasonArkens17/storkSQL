'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('../Model');

var _Model3 = _interopRequireDefault(_Model2);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserModel = function (_Model) {
  _inherits(UserModel, _Model);

  function UserModel(tableName, db, password) {
    _classCallCheck(this, UserModel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserModel).call(this, tableName, db));
  }

  _createClass(UserModel, [{
    key: 'create',
    value: function create(user) {
      user.password = this.generateHash(user.password);
      return this.db.insert(user).into(this.table).returning('*');
    }
  }, {
    key: 'generateHash',
    value: function generateHash(password) {
      return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(10));
    }
  }, {
    key: 'isValidPassword',
    value: function isValidPassword(password, id) {
      return this.findById(id).then(function (user) {
        return _bcryptNodejs2.default.compareSync(password, user[0].password);
      }).catch(function (err) {
        return console.log(err);
      });
    }
  }]);

  return UserModel;
}(_Model3.default);

exports.default = UserModel;
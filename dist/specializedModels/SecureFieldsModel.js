'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('../Model');

var _Model3 = _interopRequireDefault(_Model2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var crypto = require('crypto');

var SecureFields = function (_Model) {
  _inherits(SecureFields, _Model);

  function SecureFields(tableName, db, password, secureFields) {
    _classCallCheck(this, SecureFields);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SecureFields).call(this, tableName, db));

    _this.algorithm = 'aes-256-ctr';
    _this.password = password;
    _this.secureFields = secureFields;
    return _this;
  }

  _createClass(SecureFields, [{
    key: 'create',
    value: function create(obj) {
      var _this2 = this;

      this.secureFields.forEach(function (field) {
        if (obj[field]) {
          obj[field] = _this2.encrypt(obj[field]);
        }
      });

      return this._ModelCreate(obj);
    }
  }, {
    key: 'decryptCollection',
    value: function decryptCollection(collection) {
      var _this3 = this;

      return collection.map(function (model) {
        return _this3.decryptModel(model);
      });
    }
  }, {
    key: 'decryptModel',
    value: function decryptModel(obj) {
      var _this4 = this;

      var decrypted = _lodash2.default.extend({}, obj);
      (0, _lodash2.default)(this.secureFields).each(function (field) {
        if (decrypted[field]) {
          decrypted[field] = _this4.decrypt(decrypted[field]);
        }
      });
      return decrypted;
    }
  }, {
    key: 'encrypt',
    value: function encrypt(text) {
      var cipher = crypto.createCipher(this.algorithm, this.password);
      var crypted = cipher.update(text, 'utf8', 'hex');
      crypted += cipher.final('hex');
      return crypted;
    }
  }, {
    key: 'decrypt',
    value: function decrypt(text) {
      var decipher = crypto.createDecipher(this.algorithm, this.password);
      var dec = decipher.update(text, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec;
    }
  }]);

  return SecureFields;
}(_Model3.default);

exports.default = SecureFields;
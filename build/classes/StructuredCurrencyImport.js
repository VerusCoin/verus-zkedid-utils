"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/constants/index'),
    CURRENCY_IMPORT_IDENTIFIER = _require.CURRENCY_IMPORT_IDENTIFIER,
    CURRENCY_IMPORT_VERSION = _require.CURRENCY_IMPORT_VERSION;

var StructuredPrototype = require('./StructuredPrototype/StructuredPrototype');

var _require2 = require('../utils/data_types/index'),
    UInt32 = _require2.UInt32,
    Hash160 = _require2.Hash160,
    StructuredPrototypeArray = _require2.StructuredPrototypeArray;

var presetHashMap = require('../utils/preset_hashes/index');

var CurrencySchema = [new Hash160('id'), new UInt32('version'), new StructuredPrototypeArray("objects")];

var StructuredCurrencyImport = /*#__PURE__*/function () {
  function StructuredCurrencyImport() {
    _classCallCheck(this, StructuredCurrencyImport);
  }

  _createClass(StructuredCurrencyImport, null, [{
    key: "readBuffer",
    value: function readBuffer(buf) {
      var hashMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return StructuredPrototype.readBuffer(buf, CurrencySchema, {
        schemas: _objectSpread(_objectSpread({}, hashMap.schemas), presetHashMap.schemas),
        strings: _objectSpread(_objectSpread({}, hashMap.strings), presetHashMap.strings)
      });
    } // Takes in an array of coinObjects and creates a coin_import buffer

  }, {
    key: "writeBuffer",
    value: function writeBuffer(objects) {
      return StructuredPrototype.writeBuffer({
        schema: CurrencySchema,
        data: {
          id: CURRENCY_IMPORT_IDENTIFIER,
          version: CURRENCY_IMPORT_VERSION,
          objects: objects
        }
      });
    }
  }, {
    key: "writeImport",
    value: function writeImport(objects) {
      return StructuredCurrencyImport.writeBuffer(objects).toString('hex');
    }
  }, {
    key: "readImport",
    value: function readImport(currencyImport, hashMap) {
      return StructuredCurrencyImport.readBuffer(Buffer.from(currencyImport, 'hex'), hashMap);
    }
  }]);

  return StructuredCurrencyImport;
}();

module.exports = StructuredCurrencyImport;
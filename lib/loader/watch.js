'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ts = require('typescript');
var transformer = require('bisheng-plugin-react/lib/transformer');
var Prism = require('prismjs');

module.exports = function watch(tsCode) {
  if (this.cacheable) {
    this.cacheable();
  }

  var es6Code = ts.transpileModule(tsCode, {
    compilerOptions: {
      jsx: 'preserve',
      target: 'es6'
    }
  }).outputText;
  var highlightedCode = {
    es6: Prism.highlight(es6Code, Prism.languages.jsx),
    ts: Prism.highlight(tsCode, Prism.languages.typescript)
  };
  var preview = transformer(es6Code);
  return 'module.exports = {\n' + ('  highlightedCode: ' + (0, _stringify2.default)(highlightedCode) + ',\n') + ('  preview: ' + preview.replace(/;$/, '')) + '\n}';
};
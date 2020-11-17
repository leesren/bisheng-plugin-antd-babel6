'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _jsonmlToReactElement = require('jsonml-to-react-element');

var _jsonmlToReactElement2 = _interopRequireDefault(_jsonmlToReactElement);

var _utils = require('jsonml.js/lib/utils');

var _utils2 = _interopRequireDefault(_utils);

var _VideoPlayer = require('./VideoPlayer');

var _VideoPlayer2 = _interopRequireDefault(_VideoPlayer);

var _ImagePreview = require('./ImagePreview');

var _ImagePreview2 = _interopRequireDefault(_ImagePreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isHeading(node) {
  return (/h[1-6]/i.test(_utils2.default.getTagName(node))
  );
}

function isZhCN(pathname) {
  return (/-cn\/?$/.test(pathname)
  );
}

function makeSureComonentsLink(pathname) {
  var pathSnippets = pathname.split('#');
  if (pathSnippets[0].indexOf('/components') > -1 && !pathSnippets[0].endsWith('/')) {
    pathSnippets[0] = pathSnippets[0] + '/';
  }
  return pathSnippets.join('#');
}

function toZhCNPathname(pathname) {
  var pathSnippets = pathname.split('#');
  pathSnippets[0] = pathSnippets[0].replace(/\/$/, '') + '-cn';
  return makeSureComonentsLink(pathSnippets.join('#'));
}

function generateSluggedId(children) {
  var headingText = children.map(function (node) {
    if (_utils2.default.isElement(node)) {
      if (_utils2.default.hasAttributes(node)) {
        return node[2] || '';
      }
      return node[1] || '';
    }
    return node;
  }).join('');
  var sluggedId = headingText.trim().replace(/\s+/g, '-');
  return sluggedId;
}

// export default doesn't work
module.exports = function (_, props) {
  return {
    converters: [[function (node) {
      return _utils2.default.isElement(node) && isHeading(node);
    }, function (node, index) {
      var children = _utils2.default.getChildren(node);
      var sluggedId = generateSluggedId(children);
      var hash = sluggedId.replace(/[?.]$/g, '');
      return _react2.default.createElement(_utils2.default.getTagName(node), (0, _extends3.default)({
        key: index,
        id: sluggedId
      }, _utils2.default.getAttributes(node)), [_react2.default.createElement(
        'span',
        { key: 'title' },
        children.map(function (child) {
          return (0, _jsonmlToReactElement2.default)(child);
        })
      ), _react2.default.createElement(
        'a',
        { href: '#' + hash, className: 'anchor', key: 'anchor' },
        '#'
      )]);
    }], [function (node) {
      return _utils2.default.isElement(node) && _utils2.default.getTagName(node) === 'video';
    }, function (node, index) {
      return _react2.default.createElement(_VideoPlayer2.default, { video: _utils2.default.getAttributes(node), key: index });
    }], [function (node) {
      return _utils2.default.isElement(node) && _utils2.default.getTagName(node) === 'a' && !(_utils2.default.getAttributes(node).class || _utils2.default.getAttributes(node).href && _utils2.default.getAttributes(node).href.indexOf('http') === 0 || /^#/.test(_utils2.default.getAttributes(node).href));
    }, function (node, index) {
      var _JsonML$getAttributes = _utils2.default.getAttributes(node),
          href = _JsonML$getAttributes.href;

      return _react2.default.createElement(
        _reactRouter.Link,
        {
          to: isZhCN(props.location.pathname) ? toZhCNPathname(href) : makeSureComonentsLink(href),
          key: index
        },
        (0, _jsonmlToReactElement2.default)(_utils2.default.getChildren(node)[0])
      );
    }], [function (node) {
      return _utils2.default.isElement(node) && _utils2.default.getTagName(node) === 'p' && _utils2.default.getTagName(_utils2.default.getChildren(node)[0]) === 'img' && /preview-img/gi.test(_utils2.default.getAttributes(_utils2.default.getChildren(node)[0]).class);
    }, function (node, index) {
      var imgs = _utils2.default.getChildren(node).filter(function (img) {
        return _utils2.default.isElement(img) && (0, _keys2.default)(_utils2.default.getAttributes(img)).length > 0;
      }).map(function (img) {
        return _utils2.default.getAttributes(img);
      });
      return _react2.default.createElement(_ImagePreview2.default, { imgs: imgs, key: index });
    }]]
  };
};
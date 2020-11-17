'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _carousel = require('antd/lib/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isGood(className) {
  return (/\bgood\b/i.test(className)
  );
}

function isBad(className) {
  return (/\bbad\b/i.test(className)
  );
}

function isInline(className) {
  return (/\binline\b/i.test(className)
  );
}

function PreviewImageBox(_ref) {
  var cover = _ref.cover,
      coverMeta = _ref.coverMeta,
      imgs = _ref.imgs,
      style = _ref.style,
      previewVisible = _ref.previewVisible,
      comparable = _ref.comparable,
      onClick = _ref.onClick,
      onCancel = _ref.onCancel;

  var onlyOneImg = comparable || imgs.length === 1;
  var imageWrapperClassName = (0, _classnames2.default)('preview-image-wrapper', {
    good: coverMeta.isGood,
    bad: coverMeta.isBad
  });
  return _react2.default.createElement(
    'div',
    { className: 'preview-image-box', style: style },
    _react2.default.createElement(
      'div',
      { onClick: onClick, className: imageWrapperClassName },
      _react2.default.createElement('img', { className: coverMeta.className, src: coverMeta.src, alt: coverMeta.alt })
    ),
    _react2.default.createElement(
      'div',
      { className: 'preview-image-title' },
      coverMeta.alt
    ),
    _react2.default.createElement('div', {
      className: 'preview-image-description',
      dangerouslySetInnerHTML: { __html: coverMeta.description }
    }),
    _react2.default.createElement(
      _modal2.default,
      {
        className: 'image-modal',
        width: 960,
        visible: previewVisible,
        title: null,
        footer: null,
        onCancel: onCancel
      },
      _react2.default.createElement(
        _carousel2.default,
        {
          className: '' + (onlyOneImg ? 'image-modal-single' : ''),
          draggable: !onlyOneImg,
          adaptiveHeight: true
        },
        comparable ? cover : imgs
      ),
      _react2.default.createElement(
        'div',
        { className: 'preview-image-title' },
        coverMeta.alt
      )
    )
  );
}

function isGoodBadImg(imgMeta) {
  return imgMeta.isGood || imgMeta.isBad;
}

function isCompareImg(imgMeta) {
  return isGoodBadImg(imgMeta) || imgMeta.inline;
}

var ImagePreview = function (_React$Component) {
  (0, _inherits3.default)(ImagePreview, _React$Component);

  function ImagePreview(props) {
    (0, _classCallCheck3.default)(this, ImagePreview);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImagePreview.__proto__ || (0, _getPrototypeOf2.default)(ImagePreview)).call(this, props));

    _this.handleClick = function (index) {
      _this.setState({
        previewVisible: (0, _defineProperty3.default)({}, index, true)
      });
    };

    _this.handleCancel = function () {
      _this.setState({
        previewVisible: {}
      });
    };

    _this.state = {
      previewVisible: {}
    };
    return _this;
  }

  (0, _createClass3.default)(ImagePreview, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var imgs = this.props.imgs;

      var imgsMeta = imgs.map(function (img) {
        var alt = img.alt,
            description = img.description,
            src = img.src;

        var imgClassName = img.class;
        return {
          className: imgClassName,
          alt: alt,
          description: description,
          src: src,
          isGood: isGood(imgClassName),
          isBad: isBad(imgClassName),
          inline: isInline(imgClassName)
        };
      });

      var imagesList = imgsMeta.map(function (meta, index) {
        var metaCopy = (0, _extends3.default)({}, meta);
        delete metaCopy.description;
        delete metaCopy.isGood;
        delete metaCopy.isBad;
        return _react2.default.createElement(
          'div',
          { key: index },
          _react2.default.createElement(
            'div',
            { className: 'image-modal-container' },
            _react2.default.createElement('img', (0, _extends3.default)({}, metaCopy, { alt: meta.alt }))
          )
        );
      });

      var comparable = imgs.length === 2 && imgsMeta.every(isCompareImg) || imgs.length >= 2 && imgsMeta.every(isGoodBadImg);

      var style = comparable ? { width: (100 / imgs.length).toFixed(3) + '%' } : null;

      var hasCarousel = imgs.length > 1 && !comparable;
      var previewClassName = (0, _classnames2.default)({
        'preview-image-boxes': true,
        clearfix: true,
        'preview-image-boxes-compare': comparable,
        'preview-image-boxes-with-carousel': hasCarousel
      });
      return _react2.default.createElement(
        'div',
        { className: previewClassName },
        imagesList.map(function (_, index) {
          if (!comparable && index !== 0) {
            return null;
          }

          return _react2.default.createElement(PreviewImageBox, {
            key: index,
            style: style,
            comparable: comparable,
            previewVisible: !!_this2.state.previewVisible[index],
            cover: imagesList[index],
            coverMeta: imgsMeta[index],
            imgs: imagesList,
            onClick: function onClick() {
              _this2.handleClick(index);
            },
            onCancel: _this2.handleCancel
          });
        })
      );
    }
  }]);
  return ImagePreview;
}(_react2.default.Component);

exports.default = ImagePreview;
module.exports = exports.default;
module.exports.default = exports.default;
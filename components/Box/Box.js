'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _utils = require('../../utils');

var _hocs = require('../hocs');

var _StyledBox = require('./StyledBox');

var _StyledBox2 = _interopRequireDefault(_StyledBox);

var _doc = require('./doc');

var _doc2 = _interopRequireDefault(_doc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styledComponents = {
  div: _StyledBox2.default
}; // tag -> styled component

var Box = function (_Component) {
  _inherits(Box, _Component);

  function Box() {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Box.prototype.getChildContext = function getChildContext() {
    var grommet = this.context.grommet;
    var _props = this.props,
        background = _props.background,
        theme = _props.theme;

    if (background) {
      var dark = false;
      if ((typeof background === 'undefined' ? 'undefined' : _typeof(background)) === 'object') {
        dark = background.dark;
      } else {
        var color = (0, _utils.colorForName)(background, theme);
        if (color) {
          dark = (0, _utils.colorIsDark)(color);
        }
      }
      return {
        grommet: _extends({}, grommet, { dark: dark })
      };
    }
    return {};
  };

  Box.prototype.render = function render() {
    var _props2 = this.props,
        a11yTitle = _props2.a11yTitle,
        children = _props2.children,
        direction = _props2.direction,
        elevation = _props2.elevation,
        fill = _props2.fill,
        gap = _props2.gap,
        overflow = _props2.overflow,
        responsive = _props2.responsive,
        tag = _props2.tag,
        theme = _props2.theme,
        wrap = _props2.wrap,
        rest = _objectWithoutProperties(_props2, ['a11yTitle', 'children', 'direction', 'elevation', 'fill', 'gap', 'overflow', 'responsive', 'tag', 'theme', 'wrap']);

    var grommet = this.context.grommet;


    var StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = _StyledBox2.default.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    var contents = children;
    if (gap) {
      contents = [];
      var firstIndex = void 0;
      _react.Children.forEach(children, function (child, index) {
        if (child) {
          if (firstIndex === undefined) {
            firstIndex = index;
          } else {
            contents.push(_react2.default.createElement(_StyledBox.StyledBoxGap, {
              key: index,
              gap: gap,
              directionProp: direction,
              responsive: responsive,
              theme: theme
            }));
          }
        }
        contents.push(child);
      });
    }

    return _react2.default.createElement(
      StyledComponent,
      _extends({
        'aria-label': a11yTitle,
        directionProp: direction,
        elevationProp: elevation,
        fillProp: fill,
        overflowProp: overflow,
        wrapProp: wrap,
        responsive: responsive,
        theme: theme,
        grommet: grommet
      }, rest),
      contents
    );
  };

  return Box;
}(_react.Component);

Box.contextTypes = {
  grommet: _propTypes2.default.object
};
Box.childContextTypes = {
  grommet: _propTypes2.default.object
};
Box.defaultProps = {
  direction: 'column',
  margin: 'none',
  pad: 'none',
  responsive: true,
  tag: 'div'
};


if (process.env.NODE_ENV !== 'production') {
  (0, _doc2.default)(Box);
}

exports.default = (0, _recompose.compose)(_hocs.withTheme)(Box);
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp2;

/**
 * Created by zengtao on 2018/12/27.
 */
import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

var Index = (_temp2 = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || _Object$getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.componentWillMount = function () {}, _this.componentDidMount = function () {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {}

        //移除

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                QueueAnim,
                _extends({ type: this.props.type, duration: this.props.duration }, this.props.other_set, { className: this.props.className + " ani_warp" }),
                this.props.children
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    //其他的动画设置
    other_set: {},
    //默认的动画延迟时间
    duration: 2000,
    //默认的动画效果
    type: "alpha",
    className: ""
}, _temp2);
export { Index as default };
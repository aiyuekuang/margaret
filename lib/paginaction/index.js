import 'antd/lib/pagination/style';
import _Pagination from 'antd/lib/pagination';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp2;

/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent } from 'react';

import { cuns } from 'esn';

var Index = (_temp2 = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || _Object$getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.componentDidMount = function () {}, _temp), _possibleConstructorReturn(_this, _ret);
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
                'div',
                { className: 'up_page', style: { textAlign: this.props.align, padding: this.props.padding } },
                React.createElement(_Pagination, this.props.other_set)
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    //居中还是居左居右
    align: "right",
    //组件的内边距
    padding: 6,
    //其他的设置
    other_set: {}
}, _temp2);
export { Index as default };
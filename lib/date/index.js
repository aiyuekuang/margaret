import _objectDestructuringEmpty from 'babel-runtime/helpers/objectDestructuringEmpty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp;

/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent } from 'react';

import { cuns } from 'esn';

var Index = (_temp = _class = function (_Component) {
    _inherits(Index, _Component);

    _createClass(Index, null, [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps) {
            // Should be a controlled component.
            // if ('value' in nextProps) {
            // }
            // return null;
        }
    }]);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || _Object$getPrototypeOf(Index)).call(this, props));

        _this.componentDidMount = function () {};

        _this.state = {};
        return _this;
    }

    _createClass(Index, [{
        key: 'componentWillUnmount',


        //移除
        value: function componentWillUnmount() {
            //离开页面消除所有接口请求
            //window.requestCancel();
        }
    }, {
        key: 'render',
        value: function render() {
            _objectDestructuringEmpty(this.props);

            _objectDestructuringEmpty(this.state);

            return React.createElement(React.Fragment, null);
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {}, _temp);
export { Index as default };
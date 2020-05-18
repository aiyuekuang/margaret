import _extends from 'babel-runtime/helpers/extends';
import _objectDestructuringEmpty from 'babel-runtime/helpers/objectDestructuringEmpty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import 'antd/lib/date-picker/style';
import _DatePicker from 'antd/lib/date-picker';

var _class, _temp;

/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent } from 'react';

import { cuns } from 'esn';
var MonthPicker = _DatePicker.MonthPicker,
    RangePicker = _DatePicker.RangePicker,
    WeekPicker = _DatePicker.WeekPicker;

import moment from "moment";
var Index = (_temp = _class = function (_Component) {
    _inherits(Index, _Component);

    _createClass(Index, null, [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps) {
            // Should be a controlled component.
            // if ('value' in nextProps) {
            // }
            return null;
        }
    }]);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || _Object$getPrototypeOf(Index)).call(this, props));

        _this.componentDidMount = function () {};

        _this.onChange_ = function (date, dateString) {
            var _this$props = _this.props,
                onChange = _this$props.onChange,
                value = _this$props.value,
                format = _this$props.format;

            onChange(dateString);
        };

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
            var _this2 = this;

            var _props = this.props,
                onChange = _props.onChange,
                value = _props.value,
                format = _props.format;

            _objectDestructuringEmpty(this.state);

            var value_ = value;
            if (typeof value == "string" && value != "") {
                value_ = moment(value, format);
            }
            if (value == "") {
                value_ = undefined;
            }

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(MonthPicker, _extends({}, this.props, { onChange: function onChange(date, dateString) {
                        return _this2.onChange_(date, dateString);
                    }, value: value_ }))
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    format: "YYYY-MM"
}, _temp);
export { Index as default };
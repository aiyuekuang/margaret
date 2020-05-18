import _extends from 'babel-runtime/helpers/extends';
import _objectDestructuringEmpty from 'babel-runtime/helpers/objectDestructuringEmpty';
import _getIterator from 'babel-runtime/core-js/get-iterator';
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
                string = _this$props.string;

            if (string) {
                var value_ = "";
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _getIterator(dateString), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var i = _step.value;

                        if (i) {
                            value_ += i + ",";
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                onChange(value_);
            } else {
                onChange(dateString);
            }
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
                showTime = _props.showTime,
                format = _props.format;

            _objectDestructuringEmpty(this.state);

            var formatData = "YYYY-MM-DD";

            if (showTime) {
                formatData = "YYYY-MM-DD HH:mm:ss";
            }

            if (format) {
                formatData = format;
            }

            var value_ = value;

            if (value instanceof Array) {
                var arr = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _getIterator(value), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var i = _step2.value;

                        if (i) {
                            arr.push(moment(i, formatData));
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                value_ = arr;
            }

            if (typeof value == "string" && value !== "") {
                var _arr = [];
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = _getIterator(value.split(',')), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _i = _step3.value;

                        if (_i) {
                            _arr.push(moment(_i, formatData));
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                value_ = _arr;
            }
            if (value === "") {
                value_ = [undefined, undefined];
            }

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(RangePicker, _extends({}, this.props, { onChange: function onChange(date, dateString) {
                        return _this2.onChange_(date, dateString);
                    },
                    value: value_ }))
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    format: null,
    string: true,
    showTime: true
}, _temp);
export { Index as default };
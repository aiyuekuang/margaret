import _extends from 'babel-runtime/helpers/extends';
import _objectDestructuringEmpty from 'babel-runtime/helpers/objectDestructuringEmpty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'antd/lib/tree-select/style';
import _TreeSelect from 'antd/lib/tree-select';

var _class, _temp2;

import React from 'react';

import { isArrayop } from "esn";
var TreeNode = _TreeSelect.TreeNode;

var Index = (_temp2 = _class = function (_React$Component) {
    _inherits(Index, _React$Component);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || _Object$getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            //选中的数据
        }, _this.componentDidMount = function () {}, _this.onChange = function (value, label, extra) {
            // console.log(value, label, extra)
            var _value = value;
            if (!isArrayop(value) && _this.props.isOutArr && !_this.props.multiple) {
                _value = [value];
            }

            _this.props.onChange(_value);
        }, _this.renderTreeNodes = function (data) {
            var _this$props = _this.props,
                key_label = _this$props.key_label,
                key_value = _this$props.key_value,
                children = _this$props.children,
                key_key = _this$props.key_key,
                multiple = _this$props.multiple,
                selectPrent = _this$props.selectPrent;

            return data.map(function (item, i) {
                if (item[children] && item[children].length > 0) {
                    return React.createElement(
                        TreeNode,
                        { title: item[key_label], key: item[key_key], value: item[key_value], selectable: multiple || selectPrent },
                        _this.renderTreeNodes(item[children])
                    );
                }
                return React.createElement(TreeNode, { title: item[key_label], key: item[key_key], value: item[key_value] });
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {}
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                treeData = _props.treeData,
                width = _props.width,
                value = _props.value,
                other_set = _props.other_set,
                multiple = _props.multiple;

            _objectDestructuringEmpty(this.state);

            var _value = value;
            if (!multiple && isArrayop(value)) {
                _value = value[0];
            }

            return React.createElement(
                _TreeSelect,
                _extends({
                    style: { width: width },
                    value: _value ? _value : [],
                    placeholder: '\u8BF7\u9009\u62E9',
                    allowClear: true,
                    onChange: this.onChange,
                    treeCheckable: multiple
                }, other_set),
                this.renderTreeNodes(treeData)
            );
        }
    }]);

    return Index;
}(React.Component), _class.defaultProps = {
    //数据的label
    key_label: "title",
    //数据的value值
    key_value: "value",
    key_key: "id",
    //除非你的子也不叫children
    children: "children",
    //数据源
    treeData: [{
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [{
            title: 'Child Node1',
            value: '0-0-1',
            key: '0-0-1'
        }, {
            title: 'Child Node2',
            value: '0-0-2',
            key: '0-0-2'
        }]
    }, {
        title: 'Node2',
        value: '0-1',
        key: '0-1'
    }],
    width: "100%",
    form_value_string: false,
    //单选还是多选
    multiple: true,
    other_set: {},
    //单选时是否需要也是数组格式的返回
    isOutArr: false,
    //单选时是否可以选择父，默认不可以
    selectPrent: false
}, _temp2);
export { Index as default };
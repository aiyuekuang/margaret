import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import "antd/lib/button/style";
import _Button from "antd/lib/button";
import _Object$keys from "babel-runtime/core-js/object/keys";
import "antd/lib/tree-select/style";
import _TreeSelect from "antd/lib/tree-select";
import _JSON$stringify from "babel-runtime/core-js/json/stringify";
import "antd/lib/input/style";
import _Input from "antd/lib/input";
import _toConsumableArray from "babel-runtime/helpers/toConsumableArray";
import "antd/lib/message/style";
import _message from "antd/lib/message";
import _slicedToArray from "babel-runtime/helpers/slicedToArray";
import _extends from "babel-runtime/helpers/extends";
import "antd/lib/form/style";
import _Form from "antd/lib/form";
import "antd/lib/radio/style";
import _Radio from "antd/lib/radio";
import "antd/lib/tree/style";
import _Tree from "antd/lib/tree";

var _class, _temp;

/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent, createRef, useState, useEffect } from 'react';

import { cuns, isObjEmpty } from "esn";

var TreeNode = _Tree.TreeNode;
import { Up_Tree } from "./tree";
import { up_get } from "../utils/common";
import Up_modal_comf from "../modal";
import { up_confirm } from "../modal";
import { RestOutlined, PlusOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

var RadioGroup = _Radio.Group;
var RadioButton = _Radio.Button;

var FormItem = _Form.Item;
var formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
var tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 6
        }
    }
};

var defaultProps = {
    //树数据
    tree_data: [],
    //重新更新树
    get_tree: function get_tree() {},
    //删除树之后，刚刚删的树的数据也要重置
    rest_select_data: function rest_select_data() {},
    //选中的树
    select_data: {},
    //树控件新增、修改的接口地址
    tree_edit: "",
    //树控件的删除地址
    tree_delect: "",
    treeEditUrl: null
};

function Tree_form(prop) {
    var props = _extends({}, defaultProps, prop);

    var key_label = props.key_label,
        key_value = props.key_value,
        name = props.name,
        id = props.id,
        parentId = props.parentId,
        change_pos = props.change_pos,
        father_item = props.father_item,
        select_data = props.select_data,
        rootId = props.rootId,
        titleRule = props.titleRule,
        tree_delect = props.tree_delect,
        move_url = props.move_url,
        value = props.value,
        treeEditUrl = props.treeEditUrl;

    var _Form$useForm = _Form.useForm(),
        _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
        form = _Form$useForm2[0];

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        show = _useState2[0],
        setShow = _useState2[1];

    useEffect(function () {
        // Update the document title using the browser API
        form.resetFields();
        return function () {};
    }, [select_data, value]);

    var handleSubmit = function handleSubmit(values) {
        console.log("Received values of form: ", values);
        eidt_tree(values);
    };

    //我的资源分类_添加/修改我的资源分类
    var eidt_tree = function eidt_tree(values) {
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : select_data[key_value];

        var obj = {};
        obj[props.id] = id;
        var _url = props.tree_edit;
        if (treeEditUrl && id) {
            _url = treeEditUrl;
        }

        props.up_get(_url, _extends({}, values, obj), function (data) {
            _message.success(props.msg(data));
            props.onSelect();
            props.get_tree();
            form.resetFields();
        });
    };

    //删除我的资源分类
    var delect_tree = function delect_tree() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : select_data[key_value];

        var obj = {};
        obj[props.id] = id;
        props.up_get(tree_delect, obj, function (data) {
            _message.success(props.msg(data));
            props.get_tree();
            props.onSelect();
            // props.rest_select_data();
            props.form.resetFields();
        });
    };

    //移动资源
    var move_tree = function move_tree() {
        var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "up";
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : select_data[key_value];

        var obj = {};
        obj[props.id] = id;
        obj[props.orderForward] = forward;
        props.up_get(move_url, obj, function (data) {
            _message.success(props.msg(data));
            props.get_tree();
            // props.rest_select_data();
            // props.form.resetFields(props.name);
        });
    };

    // componentWillReceiveProps(nextProp) {
    //     const {key_label, key_value} = this.props;
    //     if (nextProp.select_data[key_value] != props.select_data[key_value] || nextProp.value != props.value) {
    //         props.form.resetFields();
    //     }
    // }

    var delect = function delect() {
        up_confirm(delect_tree);
    };

    var move = function move(forward) {
        move_tree(forward);
    };

    //childisabled他的子类也不能点
    var renderTreeNodes = function renderTreeNodes(data) {
        var dis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var childisabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        return data.map(function (item, i) {
            if (item.children && item.children.length > 0) {
                return React.createElement(
                    TreeNode,
                    {
                        title: item[key_label],
                        key: item[key_value],
                        value: item[key_value],
                        dataRef: item,
                        disabled: dis === item[key_value] || childisabled
                    },
                    renderTreeNodes(item.children, dis, dis === item[key_value] || childisabled)
                );
            }
            return React.createElement(TreeNode, {
                title: item[key_label],
                key: item[key_value],
                value: item[key_value],
                dataRef: item,
                disabled: dis === item[key_value] || childisabled
            });
        });
    };

    var initialValues = {};

    var lists = props.form_data.map(function (data, i) {
        initialValues[data.field] = props.select_data ? data.init_warp ? data.init_warp(props.select_data[data.field]) : props.select_data[data.field] : data.init_value;
        return React.createElement(
            Fragment,
            { key: i },
            props.select_data && data.hide ? null : React.createElement(
                FormItem,
                _extends({}, formItemLayout, {
                    label: data.title,
                    extra: data.extra
                }, _extends({
                    name: data.field,
                    rules: data.rules ? [{
                        required: data.fill, message: "\u8BF7\u8F93\u5165" + data.title + "!"
                    }].concat(_toConsumableArray(data.rules)) : [{
                        required: data.fill, message: "\u8BF7\u8F93\u5165" + data.title + "!"
                    }]
                }, data.other_set)),
                data.comp ? data.comp : React.createElement(_Input, { placeholder: "\u8BF7\u8F93\u5165" + data.title })
            )
        );
    });

    var tree_father = function tree_father() {
        if (father_item) {
            return father_item[key_value];
        } else if (!isObjEmpty(select_data) && father_item == null) {
            return rootId;
        } else {
            return "";
        }
    };
    var root = { children: props.tree_data };
    root[key_label] = "根目录";
    root[key_value] = rootId;

    initialValues[name] = props.select_data[key_label];
    initialValues[parentId] = tree_father();

    return React.createElement(
        _Form,
        { onFinish: handleSubmit,
            form: form,
            initialValues: initialValues
        },
        React.createElement(
            FormItem,
            _extends({}, formItemLayout, { label: "\u540D\u79F0", name: name }, {
                rules: [{ required: true, message: '请输入名称' }].concat(_toConsumableArray(titleRule))
            }),
            React.createElement(_Input, { placeholder: "\u8BF7\u8F93\u5165\u540D\u79F0" })
        ),
        React.createElement(
            FormItem,
            _extends({}, formItemLayout, { label: "\u4E0A\u7EA7\u76EE\u5F55", name: parentId }, {
                rules: [{ required: true, message: '请选择上级目录' }]
            }),
            React.createElement(
                _TreeSelect,
                {
                    // showSearch
                    allowClear: true,
                    dropdownStyle: { maxHeight: 400, overflow: "auto" },
                    placeholder: "\u8BF7\u9009\u62E9\u4E0A\u7EA7\u76EE\u5F55",
                    disabled: !change_pos && !(_JSON$stringify(select_data) === "{}")
                },
                renderTreeNodes([root], props.select_data[key_value])
            )
        ),
        lists,
        React.createElement(
            FormItem,
            tailFormItemLayout,
            React.createElement(
                "div",
                { className: "up_tree_eidt_form_btn" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        _Button,
                        {
                            type: "primary",
                            htmlType: "submit",
                            disabled: !props.tree_edit
                        },
                        _Object$keys(props.select_data).length === 0 ? React.createElement(PlusOutlined, null) : React.createElement(EditOutlined, null),
                        " ",
                        _Object$keys(props.select_data).length === 0 ? "新增" : "修改"
                    )
                ),
                _Object$keys(props.select_data).length !== 0 ? React.createElement(
                    Fragment,
                    null,
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            _Button,
                            { type: "primary", shape: "circle",
                                onClick: move.bind(this, "up") },
                            React.createElement(ArrowUpOutlined, { style: { color: "#fff" } })
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            _Button,
                            { type: "primary", shape: "circle",
                                onClick: move.bind(this, "down") },
                            React.createElement(ArrowDownOutlined, { style: { color: "#fff" } })
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            _Button,
                            { type: "danger", onClick: delect, disabled: !props.tree_delect },
                            React.createElement(RestOutlined, null),
                            " \u5220\u9664"
                        )
                    )
                ) : null
            )
        )
    );
};

export var Tree_eidt = (_temp = _class = function (_React$Component) {
    _inherits(Tree_eidt, _React$Component);

    function Tree_eidt(props) {
        _classCallCheck(this, Tree_eidt);

        //React16.3中创建Ref的方法
        var _this = _possibleConstructorReturn(this, (Tree_eidt.__proto__ || _Object$getPrototypeOf(Tree_eidt)).call(this, props));

        _this.state = {
            select_data: {},
            father_item: null,
            //从界面传来的树的数据
            tree_data: null,
            value: null
        };

        _this.componentWillMount = function () {};

        _this.componentDidMount = function () {};

        _this.onSelect = function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var father_item = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


            _this.up_tree.current.setSelectedKeys();
            _this.setState({
                select_data: obj,
                father_item: father_item,
                value: value
            });
        };

        _this.rest_select_data = function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _this.setState({
                select_data: value
            });
        };

        _this.onChange = function (e) {
            if (e.target.value == "a") {
                _this.onSelect();
            }
        };

        _this.get_tree = function () {
            _this.up_tree.current.get_tree();
        };

        _this.set_tree_data = function (tree_data) {
            _this.setState({
                tree_data: tree_data
            });
        };

        _this.up_tree = createRef();
        return _this;
    }

    _createClass(Tree_eidt, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps() {}

        //选择的当前树


        //删除树之后，刚刚删的树的数据也要重置


        //切换


        //更新数据的方法

    }, {
        key: "render",
        value: function render() {
            var minWidth = this.props.minWidth;
            var _state = this.state,
                tree_data = _state.tree_data,
                select_data = _state.select_data,
                value = _state.value;


            return React.createElement(
                "div",
                { className: "up_tree_eidt_warp" },
                React.createElement(
                    "div",
                    { className: "up_tree_eidt_warp_l", style: { minWidth: minWidth } },
                    React.createElement(Up_Tree, _extends({
                        ref: this.up_tree,
                        select: this.onSelect,
                        set_tree_data: this.set_tree_data
                    }, this.props))
                ),
                React.createElement(
                    "div",
                    { className: "up_tree_eidt_warp_r" },
                    React.createElement(
                        "div",
                        { className: "up_tree_eidt_warp_r_tab" },
                        React.createElement(
                            RadioGroup,
                            {
                                onChange: this.onChange,
                                value: !value ? "a" : "b"
                            },
                            React.createElement(
                                RadioButton,
                                { value: "a" },
                                "\u65B0\u589E"
                            ),
                            React.createElement(
                                RadioButton,
                                { disabled: value == null, value: "b" },
                                "\u4FEE\u6539"
                            )
                        )
                    ),
                    React.createElement(Tree_form, _extends({
                        select_data: this.state.select_data,
                        rest_select_data: this.rest_select_data,
                        father_item: this.state.father_item,
                        get_tree: this.get_tree,
                        tree_data: tree_data,
                        onSelect: this.onSelect,
                        value: value
                    }, this.props))
                ),
                React.createElement("div", { className: "up_tree_eidt_warp_rr" })
            );
        }
    }]);

    return Tree_eidt;
}(React.Component), _class.defaultProps = {
    up_get: up_get,

    //树数据的新增与编辑地址
    tree_edit: null,
    //树控件的删除地址
    tree_delect: null,

    //树的label
    key_label: "label",
    //树的value
    key_value: "value",
    //提交的本级的id
    id: "id",
    //上级树的id
    parentId: "parentId",
    //分类名称
    name: "name",
    //修改或删除成功后的提示
    msg: function msg(data) {
        return "操作成功";
    },
    //是否可以换位置
    change_pos: true,
    //上移下移url
    move_url: "",
    //上移下移的接口标示
    orderForward: "orderForward",
    //获取树的url
    tree_url: "",
    //根目录的id，默认是-1
    rootId: -1,
    //其他需要写入的树表单字段
    form_data: [],
    //标题校验规则
    titleRule: [],
    minWidth: "auto"
}, _temp);
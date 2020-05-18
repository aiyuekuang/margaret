import 'antd/lib/modal/style';
import _Modal from 'antd/lib/modal';
import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
import 'antd/lib/empty/style';
import _Empty from 'antd/lib/empty';
import _extends from 'babel-runtime/helpers/extends';
import 'antd/lib/spin/style';
import _Spin from 'antd/lib/spin';
import 'antd/lib/input/style';
import _Input from 'antd/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'antd/lib/tree/style';
import _Tree from 'antd/lib/tree';

var _class, _temp;

/**
 * Created by zengtao on 2018/8/1.
 */
import React, { Fragment, Component, PureComponent } from 'react';


var TreeNode = _Tree.TreeNode;
import { Tree_eidt } from "./tree_eidt";
import { isValEmpty } from "esn";
import { DownOutlined, CaretRightOutlined } from "@ant-design/icons";

export var Up_Tree = (_temp = _class = function (_React$Component) {
    _inherits(Up_Tree, _React$Component);

    function Up_Tree(arg) {
        _classCallCheck(this, Up_Tree);

        var _this = _possibleConstructorReturn(this, (Up_Tree.__proto__ || _Object$getPrototypeOf(Up_Tree)).call(this, arg));

        _this.state = {
            //调用者传来的树控件数据
            tree_data: [],
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            select_value: null,
            loading: false
        };

        _this.componentWillMount = function () {
            _this.get_tree();
        };

        _this.get_tree = function () {
            // if(this.props.tree_data){
            //     this.setState({
            //         tree_data:this.props.tree_data
            //     })
            //     this.generateList(this.props.tree_data);
            //     return;
            // }
            _this.setState({
                loading: true
            });
            if (_this.props.tree_url) {
                _this.props.up_get(_this.props.tree_url, _this.props.parm, function (data) {
                    _this.setState({
                        tree_data: _this.props.get_data(data),
                        loading: false
                    });
                    _this.props.set_tree_data(_this.props.get_data(data));
                    _this.generateList(_this.props.get_data(data));
                }, function () {
                    _this.setState({
                        loading: false
                    });
                });
            } else {
                console.log("请传树的url，否则怎么会有树的结构出来");
            }
        };

        _this.getParentKey = function (value, tree) {
            var parentKey = void 0;
            for (var i = 0; i < tree.length; i++) {
                var node = tree[i];
                if (node.children) {
                    if (node.children.length > 0) {
                        if (node.children.some(function (item) {
                            return item[_this.props.key_value] === value;
                        })) {
                            parentKey = node[_this.props.key_value];
                        } else if (_this.getParentKey(value, node.children)) {
                            parentKey = _this.getParentKey(value, node.children);
                        }
                    }
                }
            }
            if (isValEmpty(parentKey)) {
                var dsd = parentKey.toString();
                return dsd;
            } else {
                return parentKey;
            }
        };

        _this.onExpand = function (expandedKeys) {
            _this.setState({
                expandedKeys: expandedKeys,
                autoExpandParent: false
            });
        };

        _this.dataList = [];

        _this.generateList = function (data) {
            var _this$props = _this.props,
                key_label = _this$props.key_label,
                key_value = _this$props.key_value;

            for (var i = 0; i < data.length; i++) {
                var node = data[i];
                var value = node[_this.props.key_value];
                var obj = {};
                obj[key_label] = node[key_label];
                obj[key_value] = value;
                _this.dataList.push(obj);
                if (node.children) {
                    if (node.children.length > 0) {
                        _this.generateList(node.children);
                    }
                }
            }
        };

        _this.onChange = function (e) {
            var value = e.target.value;
            console.log(value);
            if (value == "") {
                _this.setState({
                    expandedKeys: []
                });
                return;
            }
            var expandedKeys = _this.dataList.map(function (item) {
                if (item[_this.props.key_label].indexOf(value) > -1) {
                    return _this.getParentKey(item[_this.props.key_value], _this.state.tree_data);
                }
                return null;
            }).filter(function (item, i, self) {
                return item && self.indexOf(item) === i;
            });
            _this.setState({
                expandedKeys: expandedKeys,
                searchValue: value,
                autoExpandParent: true
            });
        };

        _this.select = function (value, e) {
            if (!_this.props.btn) {
                if (value.length > 0) {
                    _this.props.select(value, e.node.dataRef, e.node.father_item);
                } else {
                    _this.props.select(null, {}, null);
                }
            }
            _this.setSelectedKeys(value);
        };

        _this.setSelectedKeys = function () {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            _this.setState({
                select_value: value
            });
        };

        _this.showModal = function () {
            _this.setState({
                visible: true
            });
        };

        _this.handleCancel = function (e) {
            _this.setState({
                visible: false
            });
        };

        return _this;
    }

    _createClass(Up_Tree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //必须在这里声明，所以 ref 回调可以引用它
            //this.props.onRef(this)

        }

        //点击资源目录搜索


        //新增，修改

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                searchValue = _state.searchValue,
                expandedKeys = _state.expandedKeys,
                autoExpandParent = _state.autoExpandParent,
                loading = _state.loading,
                tree_data = _state.tree_data,
                select_value = _state.select_value;
            var _props = this.props,
                form_other_set = _props.form_other_set,
                other_attr = _props.other_attr,
                className = _props.className,
                tree_hide = _props.tree_hide,
                maxHeight = _props.maxHeight;


            var loop = function loop() {
                var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tree_data;
                var father_item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                //console.log(!data instanceof Array,data,[data])
                if (data instanceof Array) {} else {
                    data = [data];
                }
                return data.map(function (item, i) {
                    var index = item[_this2.props.key_label].indexOf(searchValue);
                    var beforeStr = item[_this2.props.key_label].substr(0, index);
                    var afterStr = item[_this2.props.key_label].substr(index + searchValue.length);
                    var title = index > -1 ? React.createElement(
                        'span',
                        { key: i },
                        beforeStr,
                        React.createElement(
                            'span',
                            { style: { color: '#f50' }, key: i },
                            searchValue
                        ),
                        afterStr
                    ) : React.createElement(
                        'span',
                        { key: i },
                        item[_this2.props.key_label]
                    );
                    if (item.children && item.children.length > 0) {
                        return React.createElement(
                            TreeNode,
                            { key: item[_this2.props.key_value], title: title, dataRef: item,
                                father_item: father_item },
                            loop(item.children, item)
                        );
                    }
                    return React.createElement(TreeNode, { key: item[_this2.props.key_value], title: title, dataRef: item,
                        father_item: father_item });
                });
            };
            return React.createElement(
                'div',
                { className: className },
                React.createElement(
                    'div',
                    { className: 'up_tree_head' },
                    React.createElement(
                        'div',
                        { className: 'up_tree_head_tit' },
                        this.props.tit
                    ),
                    this.props.add ? React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'a',
                            { onClick: this.showModal },
                            '\u65B0\u589E/\u4FEE\u6539'
                        )
                    ) : null,
                    tree_hide ? React.createElement(
                        'div',
                        { onClick: tree_hide.bind(this, false) },
                        React.createElement(
                            'div',
                            { className: 'up_tree_head_show' },
                            React.createElement(CaretRightOutlined, null)
                        )
                    ) : null
                ),
                this.props.search ? React.createElement(
                    'div',
                    { className: 'up_tree_search' },
                    React.createElement(_Input, { placeholder: '\u8BF7\u8F93\u5165\u540D\u79F0', onChange: this.onChange })
                ) : null,
                React.createElement(
                    'div',
                    { className: 'up_tree_body', style: { maxHeight: maxHeight } },
                    loading ? React.createElement(
                        'div',
                        { className: 'loading' },
                        React.createElement(_Spin, null)
                    ) : tree_data && tree_data.length > 0 ? React.createElement(
                        _Tree,
                        _extends({
                            onExpand: this.onExpand,
                            expandedKeys: expandedKeys,
                            autoExpandParent: autoExpandParent,
                            onSelect: this.select,
                            switcherIcon: React.createElement(DownOutlined, null),
                            selectedKeys: select_value ? select_value : []
                        }, other_attr),
                        loop()
                    ) : React.createElement(_Empty, { image: _Empty.PRESENTED_IMAGE_SIMPLE })
                ),
                this.props.btn ? React.createElement(
                    'div',
                    { className: 'up_tree_btn' },
                    React.createElement(
                        _Button,
                        { type: 'primary', onClick: this.props.select.bind(this, this.state.select_value) },
                        '\u786E\u5B9A'
                    )
                ) : null,
                React.createElement(
                    _Modal,
                    {
                        title: '\u65B0\u589E/\u7F16\u8F91',
                        visible: this.state.visible,
                        onCancel: this.handleCancel,
                        footer: null,
                        width: 800
                    },
                    React.createElement(Tree_eidt, { tree_data: this.state.tree_data, get_tree: this.get_tree,
                        tree_url: this.props.tree_url, other_set: form_other_set })
                )
            );
        }
    }]);

    return Up_Tree;
}(React.Component), _class.defaultProps = {
    up_get: function up_get() {},
    //调用者选择后的回调value是key的数组，obj是属性的数组
    select: function select(value, obj) {
        console.log(value, obj);
    },
    //是否显示按钮，默认不显示
    btn: false,
    //标题
    tit: "资源目录",
    //去除添加,默认去除
    add: false,
    //调用树数据的参数
    parm: {},
    //是否显示搜索，默认显示
    search: false,
    //树的url，如果为null就是不需要树
    tree_url: "/tree",
    //获取树数据的接口返回
    get_data: function get_data(data) {
        return data.entity;
    },
    //是否直接从上个界面传递已获取的输数据
    //tree_data:null,
    //数据的label
    key_label: "label",
    //数据的value值
    key_value: "value",
    //树的其他设置
    other_attr: {},
    //树编辑控件或者其他什么控件需要这个树的数据的时候可以使用和这个回调
    set_tree_data: function set_tree_data(data) {},
    //tree的样式
    className: "up_tree_warp",
    tree_hide: null,
    //树控件的最大高度
    maxHeight: 500
}, _temp);
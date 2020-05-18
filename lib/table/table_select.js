import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
import 'antd/lib/table/style';
import _Table from 'antd/lib/table';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _getIterator from 'babel-runtime/core-js/get-iterator';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'antd/lib/modal/style';
import _Modal from 'antd/lib/modal';
import 'antd/lib/input/style';
import _Input from 'antd/lib/input';

var _class, _temp;

/**
 * Created by zengtao on 2018/8/1.
 */
import React, { Fragment, Component, PureComponent } from 'react';

import { Up_Tree } from "../tree/tree";
import Search_table from "../form/form_search";
import { up_get, getTextByJs } from "../utils/common";
import { valueFormat } from "../utils/common";
import { diff } from "../utils/common";
import { CaretRightOutlined, DownOutlined } from "@ant-design/icons";
import { diffObj } from "esn";

//截取字符串
function str_cut(str, length) {
    if (!str) {
        return '';
    }
    if (str.length > length) {
        str = str.slice(0, length) + '...';
    }
    return str;
}

var Search = _Input.Search;
var confirm = _Modal.confirm;

var Index = (_temp = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || _Object$getPrototypeOf(Index)).call(this, props));

        _this.componentWillMount = function () {};

        _this.componentDidMount = function () {
            if (_this.props.dataSource) {
                _this.setState({
                    dataSource: _this.props.dataSource
                });
            }
        };

        _this.table_search = function (submit) {
            return React.createElement(Search_table, _extends({ submit: submit, form_data: _this.props.table_search_form }, _this.props.other_search_form));
        };

        _this.get_data = function () {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.values;
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.pagination.current;
            var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.state.pagination.pageSize;
            var props_value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this.props.values;
            var url = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _this.props.url;

            _this.setState({
                loading: true
            });
            //搜索框初始值的判断
            var search_init_data = {};
            if (_JSON$stringify(values) == "{}") {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _getIterator(_this.props.table_search_form), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var i = _step.value;

                        search_init_data[i.field] = i.init_value;
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
            } else {
                search_init_data = {};
            }
            _this.props.up_get(url, _extends({}, values, search_init_data, props_value, {
                pageIndex: page,
                pageSize: pageSize
            }), function (data) {
                var pagination = _extends({}, _this.state.pagination);
                // if (page == 1) {
                pagination.total = _this.props.set_total(data);
                // }
                pagination.current = page;
                pagination.pageSize = pageSize;
                _this.props.get_data_return(data);
                _this.setState({
                    dataSource: _this.props.set_data(data),
                    pagination: pagination
                });
            }, function () {
                _this.setState({
                    loading: false
                });
            });
        };

        _this.handleTableChange = function (pagination, filters, sorter) {
            _this.get_data(_this.state.values, pagination.current, pagination.pageSize);
        };

        _this.select = function (value, obj) {
            var values = _extends({}, _this.state.values);
            _this.props.treeClick(value);
            values[_this.props.tree_data] = value ? value[0] : null;
            _this.get_data(values, 1);
            _this.setState({
                values: values
            });
        };

        _this.scroll = function () {
            var kuan = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _getIterator(_this.props.columns), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var i = _step2.value;

                    kuan += i.width;
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

            return kuan;
        };

        _this.onSelectChange = function (selectedRowKeys, selectedRows) {
            _this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
        };

        _this.handleCancel = function (e) {
            _this.setState({
                visible: false
            });
        };

        _this.Search = function (value) {
            var values = {};
            values[_this.props.search_label] = value;
            _this.get_data(values, 1);
            _this.setState({
                values: values
            });
        };

        _this.tree_hide = function (bool) {
            _this.setState({
                tree_show: bool
            });
        };

        _this.change = function () {
            var onChange = _this.props.onChange;
            var selectedRows = _this.state.selectedRows;

            _this.setState({
                visible: false
            });
            onChange(_this.state.selectedRowKeys, selectedRows);
        };

        _this.show = function () {
            _this.get_data();
            var data = {
                // selectedRowKeys:[],
                visible: true
            };

            if (!_this.props.isKeepSelectedRowKeys) {
                data.selectedRowKeys = [];
            }
            _this.setState(data);
        };

        _this.state = {
            loading: false,
            selectedRowKeys: props.value,
            visible: false,
            pagination: {
                current: 1,
                pageSize: 10,
                total: 10,
                showQuickJumper: true,
                showSizeChanger: true,
                size: "small",
                pageSizeOptions: ['5', '10', '20', '30', '40']
            },
            dataSource: [],
            //查询时需要用到的值
            values: {},
            record: null,
            tree_show: true,
            selectedRows: []
        };

        return _this;
    }

    _createClass(Index, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {
            if (!diff(nextProp.values, this.props.values)) {
                this.get_data(this.state.values, this.state.pagination.current, this.state.pagination.pageSize, nextProp.values);
            }

            if (diffObj(nextProp.value, this.props.value)) {
                this.setState({
                    selectedRowKeys: nextProp.value
                });
            }
            if (!diff(nextProp.url, this.props.url)) {
                this.get_data(this.state.values, this.state.pagination.current, this.state.pagination.pageSize, nextProp.values, nextProp.url);
            }
        }

        //移除

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
        //离开页面消除所有接口请求


        //搜索组件


        //获取表格数据


        //分页请求数据


        //计算表格的宽度


        //搜索

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                other_tree = _props.other_tree,
                has_page = _props.has_page,
                up_get = _props.up_get,
                delect_url = _props.delect_url,
                rowKey = _props.rowKey,
                act_fixed = _props.act_fixed,
                has_edit = _props.has_edit,
                table_add_form = _props.table_add_form,
                table_className = _props.table_className,
                size = _props.size,
                search_tit = _props.search_tit,
                search_label = _props.search_label,
                has_delect_lot = _props.has_delect_lot,
                searchWidth = _props.searchWidth,
                tit = _props.tit;
            var _state = this.state,
                selectedRowKeys = _state.selectedRowKeys,
                record = _state.record,
                tree_show = _state.tree_show,
                visible = _state.visible;


            var columns = [].concat(_toConsumableArray(this.props.columns));

            var _loop = function _loop(i) {
                if (i.strCut) {
                    i.render = function (text) {
                        return React.createElement(
                            'span',
                            null,
                            text && text.length > i.strCut ? React.createElement(
                                Fragment,
                                null,
                                str_cut(text, i.strCut),
                                '\xA0',
                                React.createElement(
                                    'a',
                                    { onClick: function onClick() {
                                            _Modal.info({
                                                maskClosable: true,
                                                title: i.modalConfig && i.modalConfig.title ? i.modalConfig.title : "全部值",
                                                width: i.modalConfig && i.modalConfig.width ? i.modalConfig.width : 520,
                                                content: React.createElement(
                                                    'div',
                                                    { style: {
                                                            overflow: 'scroll',
                                                            maxHeight: i.modalConfig && i.modalConfig.height ? i.modalConfig.height : 600
                                                        } },
                                                    i.modalConfig && i.modalConfig.format ? i.modalConfig.format(text) : text
                                                ),
                                                onOk: function onOk() {}
                                            });
                                        } },
                                    '\u66F4\u591A'
                                )
                            ) : text
                        );
                    };
                }
            };

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _getIterator(columns), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var i = _step3.value;

                    _loop(i);
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

            var rowSelection = {
                selectedRowKeys: selectedRowKeys,
                onChange: this.onSelectChange,
                getCheckboxProps: function getCheckboxProps(record) {
                    return {
                        disabled: _this2.props.row_dis(record)
                    };
                }
            };

            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    'span',
                    {
                        onClick: this.show
                    },
                    this.props.children
                ),
                React.createElement(
                    _Modal,
                    _extends({}, this.props.modal_config, {
                        tit: tit,
                        visible: this.state.visible,
                        onCancel: this.handleCancel,
                        footer: null
                    }),
                    React.createElement(
                        'div',
                        { className: 'up_table_warp', style: { margin: this.props.margin } },
                        this.props.table_search_form.length > 0 ? React.createElement(
                            'div',
                            { className: 'up_table_warp_top' },
                            this.table_search(this.submit)
                        ) : null,
                        React.createElement(
                            'div',
                            { className: 'up_table_warp_bottom' },
                            this.props.tree_url ? React.createElement(
                                'div',
                                { className: tree_show ? "up_table_warp_bottom_l" : "up_table_warp_bottom_l gybxs" },
                                React.createElement(Up_Tree, _extends({ tree_hide: this.tree_hide, up_get: up_get, select: this.select,
                                    tree_url: this.props.tree_url }, other_tree))
                            ) : null,
                            React.createElement(
                                'div',
                                {
                                    className: this.props.tree_url ? "up_table_warp_bottom_r" : "up_table_warp_bottom_r_s" },
                                React.createElement(
                                    'div',
                                    { className: 'up_table_warp_btn' },
                                    React.createElement(
                                        'div',
                                        { className: tree_show ? "gybxs" : "", onClick: this.tree_hide.bind(this, true) },
                                        React.createElement(
                                            'div',
                                            { className: 'up_table_warp_btn_tree_btn' },
                                            React.createElement(CaretRightOutlined, null)
                                        )
                                    ),
                                    this.props.other_btn(this.state.selectedRowKeys, this.onSelectChange, this.get_data),
                                    search_label ? React.createElement(
                                        'div',
                                        null,
                                        React.createElement(Search, {
                                            placeholder: search_tit,
                                            onSearch: this.Search,
                                            style: { width: searchWidth }
                                        })
                                    ) : null
                                ),
                                React.createElement(_Table, _extends({ rowKey: this.props.rowKey,
                                    columns: columns,
                                    dataSource: this.state.dataSource,
                                    onChange: this.handleTableChange,
                                    loading: this.state.loading,
                                    pagination: has_page ? this.state.pagination : false,
                                    scroll: { x: this.scroll() },
                                    rowSelection: rowSelection,
                                    style: { width: "100%" },
                                    className: table_className,
                                    size: size
                                }, this.props.table_attr))
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'up_table_warp_btn_submit' },
                            React.createElement(
                                _Button,
                                { type: 'primary', onClick: this.change },
                                '\u63D0\u4EA4'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    up_get: up_get,
    //表格结构数据
    columns: [{
        title: '编号',
        dataIndex: 'id',
        key: "id",
        width: 100
    }, {
        title: '标题',
        dataIndex: 'title',
        key: "title",
        width: 200
    }],
    dataSource: null,
    //接口连接
    url: "/shishi",
    //额外的需要加入的参数
    values: {},
    //数据获取方式
    set_data: function set_data(data) {
        return data.entity.pageItems;
    },
    //获取分页总数的方式
    set_total: function set_total(data) {
        return data.records.total;
    },
    //整个table的外边距
    margin: 0,
    //树的搜索字段
    tree_data: "tree_data",
    //树的url，如果为null就是不需要树
    tree_url: null,
    //表格的其他属性
    table_attr: {},
    //是否有分页
    has_page: true,
    //判断是否可以被点击
    row_dis: function row_dis(record) {
        return false;
    },
    //批量操作的对象
    row_action: null,
    //主键id
    rowKey: "id",
    //其他按钮组件
    other_btn: function other_btn(selectedRowKeys, onSelectChange, get_data) {},
    //搜索组件的form对象
    table_search_form: [],

    //其他搜索组件的参数
    other_search_form: {},
    //树的其它选项
    other_tree: {},

    //外面的需要用到这个表格请求的数据的话，可以用这个方法
    get_data_return: function get_data_return(data) {},
    //表格的样式
    table_className: "table_className",
    //表格的是什么型的默认是紧凑型的
    size: "middle",
    //搜索的标题字段
    search_tit: "请输入关键词",
    search_label: null,
    //搜索框的宽度
    searchWidth: 200,
    //树控件点击后的回调
    treeClick: function treeClick(data) {},
    onChange: function onChange(value) {},
    modal_config: {},
    tit: null,
    value: [],
    //是否需要重新打开时已选数据还在
    isKeepSelectedRowKeys: true
}, _temp);
export { Index as default };
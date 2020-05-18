import 'antd/lib/table/style';
import _Table from 'antd/lib/table';
import 'antd/lib/dropdown/style';
import _Dropdown from 'antd/lib/dropdown';
import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
import 'antd/lib/menu/style';
import _Menu from 'antd/lib/menu';
import 'antd/lib/divider/style';
import _Divider from 'antd/lib/divider';
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
import React, { Fragment, Component, PureComponent, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Up_Tree } from "../tree/tree";
import Search_table from "../form/form_search";
import Form_add from "../form/form_adds";
import { up_get, getTextByJs } from "../utils/common";
import { diff } from "../utils/common";
import { DownOutlined, CaretRightOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { isArrayop } from "esn";

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

export var Up_table = (_temp = _class = function (_Component) {
    _inherits(Up_table, _Component);

    function Up_table(props) {
        _classCallCheck(this, Up_table);

        var _this = _possibleConstructorReturn(this, (Up_table.__proto__ || _Object$getPrototypeOf(Up_table)).call(this, props));

        _this.componentWillMount = function () {
            _this.get_data();
        };

        _this.componentDidMount = function () {};

        _this.table_search = function (submit) {
            return React.createElement(Search_table, _extends({ submit: submit, form_data: _this.props.table_search_form }, _this.props.other_search_form));
        };

        _this.table_add = function (record) {
            return React.createElement(Form_add, _extends({
                up_get: _this.props.up_get,
                record: record,
                form_data: _this.props.table_add_form,
                submit_fun: function submit_fun() {
                    _this.get_data(_this.state.values, _this.state.pagination.current, _this.state.pagination.pageSize, _this.props.values, _this.props.url, function () {
                        _this.handleCancel();
                    });
                },
                submit: _this.props.submit_add,
                submit_add_url: _this.props.submit_add_url,
                eidtUrl: _this.props.eidtUrl
            }, _this.props.form_other_set, {
                id: _this.props.id_form ? _this.props.id_form : _this.props.rowKey
            }));
        };

        _this.get_data = function () {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.values;
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.pagination.current;
            var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.state.pagination.pageSize;
            var props_value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this.props.values;
            var url = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _this.props.url;
            var fun = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};
            var set_total = _this.props.set_total;

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
                if (set_total) {
                    pagination.total = set_total(data);
                }
                pagination.current = page;
                pagination.pageSize = pageSize;
                _this.props.get_data_return(data);
                _this.setState({
                    dataSource: _this.props.set_data(data),
                    pagination: pagination
                });
                fun();
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

        _this.submit = function (data) {
            var values = _extends({}, _this.state.values, data);
            _this.props.onSearchChange(values);
            _this.get_data(values, 1);
            _this.setState({
                values: values
            });
        };

        _this.onSelectChange = function (selectedRowKeys) {
            _this.setState({ selectedRowKeys: selectedRowKeys });
        };

        _this.handleMenuClick = function (e) {
            _this.props.row_action[e.key].fun(_this.state.selectedRowKeys, _this.onSelectChange, _this.reget_data);
        };

        _this.showModal = function () {
            var record = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (record) {
                _this.props.eidt_pull_data(record, function (record) {
                    _this.setState({
                        visible: true,
                        record: record
                    });
                });
            } else {
                _this.setState({
                    visible: true,
                    record: record
                });
            }
            _this.props.eidtClick(record);
        };

        _this.handleCancel = function (e) {
            _this.setState({
                visible: false
            });
        };

        _this.reget_data = function () {
            _this.get_data();
        };

        _this.delect_all = function () {
            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var _this$state = _this.state,
                pagination = _this$state.pagination,
                values = _this$state.values;
            var _this$props = _this.props,
                delectUseArr = _this$props.delectUseArr,
                delectFun = _this$props.delectFun;

            var parm = _extends({}, _this.props.delect_parm);
            var currentTemp = pagination.current;
            var totalPage = Math.ceil(pagination.total / pagination.pageSize);
            var yushu = pagination.total % pagination.pageSize;
            var geshu = 1;
            if (isArrayop(id)) {
                geshu = id.length;
            }
            if (id instanceof Array && !delectUseArr) {
                parm[_this.props.delect_id] = getTextByJs(id);
            } else {
                if (delectUseArr) {
                    parm[_this.props.delect_id] = [id];
                } else {
                    parm[_this.props.delect_id] = id;
                }
            }
            if (pagination.current == totalPage && (yushu == geshu || yushu == 0) && pagination.current > 0) {
                currentTemp -= 1;
            }

            if (yushu < geshu) {
                var jiye = Math.ceil(geshu / pagination.pageSize);
                currentTemp -= jiye;
            }

            _this.props.up_get(_this.props.delect_url, parm, function (data) {
                console.log(_this.state.pagination);

                _this.setState({
                    selectedRowKeys: []
                });
                _this.get_data(values, currentTemp);
            }, function () {}, true);

            delectFun(id);
        };

        _this.showDeleteConfirm = function (id) {
            confirm({
                title: '提示？',
                content: _this.props.delect_confirm,
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk: function onOk() {
                    _this.delect_all(id);
                },
                onCancel: function onCancel() {}
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

        _this.state = {
            loading: false,
            selectedRowKeys: [],
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
            tree_show: true
        };
        return _this;
    }

    _createClass(Up_table, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {
            if (!diff(nextProp.values, this.props.values)) {
                this.get_data(this.state.values, this.state.pagination.current, this.state.pagination.pageSize, nextProp.values);
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


        //编辑和新增用到的表单组件


        //获取表格数据


        //分页请求数据


        //计算表格的宽度


        //批量操作之后更新数据的函数


        //搜索

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                action_width = _props.action_width,
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
                set_total = _props.set_total,
                submit_add_url = _props.submit_add_url,
                delectEnb = _props.delectEnb,
                edit_enb = _props.edit_enb,
                submit_add = _props.submit_add;
            var _state = this.state,
                selectedRowKeys = _state.selectedRowKeys,
                record = _state.record,
                tree_show = _state.tree_show,
                visible = _state.visible,
                values = _state.values;

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

            if (this.props.action_comp || delect_url || table_add_form.length > 0) {
                columns.push({
                    title: '操作',
                    dataIndex: 'action',
                    width: action_width,
                    fixed: act_fixed,
                    render: function render(text, record) {
                        var has_edit_ = has_edit && (submit_add_url || submit_add);
                        if (typeof has_edit === "function") {
                            has_edit_ = has_edit(record) && submit_add_url;
                        }
                        return React.createElement(
                            Fragment,
                            null,
                            _this2.props.action_comp ? _this2.props.action_comp(text, record) : null,
                            has_edit_ && table_add_form.length > 0 ? edit_enb(record) ? React.createElement(
                                'a',
                                { onClick: _this2.showModal.bind(_this2, record) },
                                '\u7F16\u8F91'
                            ) : null : null,
                            has_edit_ || delectEnb(record) && edit_enb(record) ? React.createElement(_Divider, { type: 'vertical' }) : null,
                            delect_url ? delectEnb(record) ? React.createElement(
                                'a',
                                { onClick: _this2.showDeleteConfirm.bind(_this2, record[rowKey]) },
                                '\u5220\u9664'
                            ) : null : null
                        );
                    }
                });
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
            var btn = this.props.row_action ? this.props.row_action.map(function (data, i) {
                return React.createElement(
                    _Menu.Item,
                    { key: i },
                    data.icon ? React.createElement(data.icon, null) : null,
                    data.tit
                );
            }) : null;

            var menu = React.createElement(
                _Menu,
                { onClick: this.handleMenuClick },
                btn
            );
            return React.createElement(
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
                        { className: this.props.tree_url ? "up_table_warp_bottom_r" : "up_table_warp_bottom_r_s" },
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
                            this.props.has_add && table_add_form.length > 0 ? React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    _Button,
                                    { type: 'primary', onClick: this.showModal.bind(this, null) },
                                    React.createElement(PlusOutlined, null),
                                    '\u65B0\u589E'
                                )
                            ) : null,
                            delect_url && has_delect_lot ? React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    _Button,
                                    { type: 'danger', disabled: selectedRowKeys.length == 0,
                                        onClick: this.showDeleteConfirm.bind(this, selectedRowKeys) },
                                    React.createElement(DeleteOutlined, null),
                                    '\u6279\u91CF\u5220\u9664'
                                )
                            ) : null,
                            this.props.row_action ? React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    _Dropdown,
                                    { overlay: menu, disabled: selectedRowKeys.length == 0 },
                                    React.createElement(
                                        _Button,
                                        null,
                                        '\u6279\u91CF\u64CD\u4F5C ',
                                        React.createElement(DownOutlined, null)
                                    )
                                )
                            ) : null,
                            this.props.other_btn(this.state.selectedRowKeys, this.onSelectChange, this.get_data, values),
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
                            pagination: set_total ? this.state.pagination : false,
                            scroll: { x: this.scroll() },
                            rowSelection: this.props.row_action || delect_url && has_delect_lot ? rowSelection : null,
                            style: { width: "100%" },
                            className: table_className,
                            size: size
                        }, this.props.table_attr))
                    )
                ),
                React.createElement(
                    _Modal,
                    _extends({
                        title: this.state.record ? this.props.table_main_tit ? '\u7F16\u8F91\u300A' + this.state.record[this.props.table_main_tit] + '\u300B' : "编辑" : "新增",
                        visible: visible,
                        onCancel: this.handleCancel,
                        footer: null
                    }, this.props.modal_config),
                    React.createElement('div', { id: 'select' }),
                    visible ? this.table_add(this.state.record) : null
                )
            );
        }
    }]);

    return Up_table;
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
    //接口连接
    url: "/shishi",
    //额外的需要加入的参数
    values: {},
    //数据获取方式
    set_data: function set_data(data) {
        return data.entity.pageItems;
    },
    //获取分页总数的方式
    set_total: null,
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
        return record.id === '1';
    },
    //批量操作的对象
    row_action: null,
    //主键id
    rowKey: "id",
    //是否有新增/编辑
    has_add: true,
    //是否有编辑可以传递函数，因为有的时候不同的行，控制可不可以编辑
    has_edit: true,
    //是否有批量删除
    has_delect_lot: true,
    //对编辑进行判断，哪些可以编辑，哪些不可以编辑的函数
    edit_enb: function edit_enb(record) {
        return true;
    },
    //对删除进行判断，哪些可以删除，哪些不可以删除
    delectEnb: function delectEnb(record) {
        return true;
    },
    //其他操作的组件
    action_comp: null,
    //弹框的设置
    modal_config: {},
    //主标题字段，用于显示在新增或编辑弹框的上面
    table_main_tit: "",
    //其他按钮组件
    other_btn: function other_btn(selectedRowKeys, onSelectChange, get_data) {},
    //编辑和新增用到的表单组件
    table_add_form: [],
    //新增编辑的提交函数
    submit_add: null,
    //编辑新增的提交url
    submit_add_url: null,
    //搜索组件的form对象
    table_search_form: [],
    //操作的宽度
    action_width: 120,
    //其他搜索组件的参数
    other_search_form: {},
    //树的其它选项
    other_tree: {},
    //其他新增的表单的的设置
    form_other_set: {},
    //编辑时获取服务器数据
    eidt_pull_data: function eidt_pull_data(record, fun) {
        fun(record);
    },
    //表单修改时需要传的主键的id
    id_form: null,
    //批量删除单独的按钮
    delect_url: null,
    delect_id: "id",
    //操作选项是否固定
    act_fixed: false,
    //外面的需要用到这个表格请求的数据的话，可以用这个方法
    get_data_return: function get_data_return(data) {},
    //批量删除需要的额外的参数
    delect_parm: {},
    //表格的样式
    table_className: "table_className",
    //表格的是什么型的默认是紧凑型的
    size: "middle",
    //搜索的标题字段
    search_tit: "请输入关键词",
    search_label: null,
    //删除前的提示文字
    delect_confirm: "数据删除后无法恢复，确定删除？",
    //搜索框的宽度
    searchWidth: 200,
    //树控件点击后的回调
    treeClick: function treeClick(data) {},
    //搜索变化时的回调
    onSearchChange: function onSearchChange(values) {},
    //编辑需要另外的url的
    eidtUrl: null,
    //删除使用数组返回，而不是逗号分隔的字符串
    delectUseArr: false,
    //编辑时的回调
    eidtClick: function eidtClick(record) {},
    //删除按钮点击的时候，调用的函数
    delectFun: function delectFun(id) {}
}, _temp);
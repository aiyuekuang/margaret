import 'antd/lib/row/style';
import _Row from 'antd/lib/row';
import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
import 'antd/lib/col/style';
import _Col from 'antd/lib/col';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _extends from 'babel-runtime/helpers/extends';
import 'antd/lib/input/style';
import _Input from 'antd/lib/input';
import 'antd/lib/form/style';
import _Form from 'antd/lib/form';
/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, useEffect, useState } from 'react';

import { cloneop, cuns } from 'esn';
import { up_get } from "../utils/common";

var FormItem = _Form.Item;

var defaultProps = {
    up_get: up_get,
    //生成表单的各个字段
    form_data: [{
        //表单标题
        title: "编号",
        //字段
        field: "id",
        //是否必填
        fill: true,
        //表单规则
        rules: [{
            max: 10, message: '长度不得超过10'
        }],
        //默认值,可以是函数，(text,record)=>{}
        init_value: 1,
        //其他的规则对象设置
        other_set: {},
        //其他提示
        extra: "",
        //日期控件用到的format
        format: 'YYYY-MM-DD',
        //表单组件
        comp: React.createElement(_Input, null),
        //是否需要显示
        hide: false
    }, {
        //表单标题
        title: "标题",
        //字段
        field: "title",
        fill: false,
        //表单规则
        rules: [{
            max: 10, message: '长度不得超过10'
        }],
        //表单组件
        comp: React.createElement(_Input, null)
    }, {
        //表单标题
        title: "上传图片",
        //字段
        field: "img",
        fill: false,
        //表单组件
        comp: React.createElement(_Input, null),
        rules: []
    }],
    //submit提交
    submit: function submit(values, record, fun) {
        console.log(values, record, fun);
        fun();
    },
    //编辑新增的提交url
    submit_add_url: null,
    //提交后的操作，比如关闭弹框之类
    submit_fun: function submit_fun() {},
    //编辑时单条的数据
    record: null,
    //上面表单组件的位置
    formItemLayout: [6, 16],
    //编辑时传递的主键
    id: "id",
    //有几列数据
    li: 1,
    //表单的样式
    className: "",
    //时间的格式
    dateFormat: 'YYYY-MM-DD',
    //提交时需要的额外参数
    addParms: {},
    //是否需要提交和重置
    hasBtn: true,
    //编辑需要另外的url的
    eidtUrl: null,
    //额外需要的表单
    OtherForm: function OtherForm() {
        return React.createElement('div', null);
    },
    //form表单需要的设置
    formSet: {},
    //组件变化是否需要重置值
    formDataChangeRest: false,
    //编辑时hide字段遇到，是否需要隐藏整个字段
    hideParam: false
};

export default function index(prop) {
    var props = _extends({}, defaultProps, prop);

    var li = props.li,
        className = props.className,
        form_data = props.form_data,
        hasBtn = props.hasBtn,
        eidtUrl = props.eidtUrl,
        OtherForm = props.OtherForm,
        record = props.record,
        formSet = props.formSet,
        formDataChangeRest = props.formDataChangeRest,
        hideParam = props.hideParam;

    var _Form$useForm = _Form.useForm(),
        _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
        form = _Form$useForm2[0];

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        disabled = _useState2[0],
        setDisabled = _useState2[1];

    useEffect(function () {
        // Update the document title using the browser API
        if (formDataChangeRest) {
            form.resetFields();
        }

        return function () {};
    }, [form_data]);

    useEffect(function () {
        // Update the document title using the browser API
        if (record) {
            form.setFieldsValue(record);
        }
        return function () {};
    }, [record]);

    var formItemLayout = function formItemLayout() {
        var formItemLayout_ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.formItemLayout;

        return {
            labelCol: {
                xs: { span: 24 },
                sm: { span: formItemLayout_[0] }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: formItemLayout_[1] }
            }
        };
    };

    var rest = function rest() {
        form.resetFields();
        //this.props.submit({});
    };

    var handleSubmit = function handleSubmit(values) {
        // let _record =null
        // if(record){
        //     _record = cloneop(record);
        // }

        setDisabled(true);
        var values_temp = {};
        if (!hideParam) {
            values_temp = _extends({}, initialValues, values, props.addParms);
        } else {
            values_temp = _extends({}, values, props.addParms);
        }

        var _loop = function _loop(i) {
            if (values_temp[i] && values_temp[i]._isAMomentObject) {
                var _index = props.form_data.find(function (data) {
                    return i === data.field;
                });
                values_temp[i] = values_temp[i].format(_index.format ? _index.format : props.dateFormat);
            }
        };

        for (var i in values_temp) {
            _loop(i);
        }
        if (props.record) {
            values_temp[props.id] = props.record[props.id];
        }
        if (props.submit_add_url) {
            var _url = props.submit_add_url;
            if (eidtUrl && props.record) {
                _url = eidtUrl;
            }

            props.up_get(_url, values_temp, function (data) {
                rest();
                props.submit_fun(data);
            }, function () {
                setDisabled(false);
            });
        } else {
            props.submit(values_temp, props.record, function () {
                rest();
                props.submit_fun();
                setDisabled(false);
            });
        }
    };
    var initialValues = {};

    var lists = props.form_data.map(function (data, i) {

        initialValues[data.field] = props.record ? typeof data.init_value === "function" ? data.init_value(props.record[data.field], props.record) : props.record[data.field] : data.init_value;

        return React.createElement(
            Fragment,
            { key: i },
            props.record && data.hide ? null : React.createElement(
                'div',
                { style: { width: data.width ? data.width : 100 / li + "%" } },
                React.createElement(
                    FormItem,
                    _extends({}, data.formItemLayout ? formItemLayout(data.formItemLayout) : formItemLayout(), {
                        label: data.title,
                        style: {
                            marginBotton: 10
                        },
                        extra: data.extra
                    }, _extends({
                        name: data.field,
                        rules: data.rules ? [{
                            required: data.fill, message: '\u8BF7\u8F93\u5165' + data.title + '!'
                        }].concat(_toConsumableArray(data.rules)) : [{
                            required: data.fill, message: '\u8BF7\u8F93\u5165' + data.title + '!'
                        }]
                    }, data.other_set)),
                    typeof data.comp === "function" ? data.comp(props.record) : data.comp
                )
            )
        );
    });

    return React.createElement(
        _Form,
        _extends({ onFinish: handleSubmit, form: form, initialValues: initialValues }, formSet),
        React.createElement(
            'div',
            { className: className },
            React.createElement(
                'div',
                { className: 'up_table_form_add_list' },
                lists
            ),
            React.createElement(
                'div',
                { className: '' },
                React.createElement(OtherForm, null)
            ),
            hasBtn ? React.createElement(
                'div',
                { style: { width: 100 / li + "%" } },
                React.createElement(
                    _Row,
                    null,
                    React.createElement(_Col, formItemLayout().labelCol),
                    React.createElement(
                        _Col,
                        formItemLayout().wrapperCol,
                        React.createElement(
                            'div',
                            { className: 'up_table_form_add_btn' },
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    _Button,
                                    { disabled: disabled, type: 'primary', htmlType: 'submit' },
                                    '\u63D0\u4EA4'
                                )
                            ),
                            !props.record ? React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    _Button,
                                    { disabled: disabled, onClick: rest
                                    },
                                    '\u91CD\u7F6E'
                                )
                            ) : null
                        )
                    )
                )
            ) : null
        )
    );
};
import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
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

import { cuns } from 'esn';
import { up_get } from "../utils/common";
import { DownOutlined, UpOutlined } from '@ant-design/icons';

var FormItem = _Form.Item;

var defaultProps = {
    //生成表单的各个字段
    form_data: [{
        //表单标题
        title: "标题",
        //字段
        field: "email",
        //表单规则
        rules: [{
            max: 10, message: '长度不得超过10'
        }],
        //默认值
        init_value: 1,
        //表单组件
        comp: React.createElement(_Input, null),
        //是否在收起时显示
        is_top: true
    }, {
        //表单标题
        title: "关键字",
        //字段
        field: "email2",
        //表单规则
        rules: [{
            max: 10, message: '长度不得超过10'
        }],
        //表单组件
        comp: React.createElement(_Input, null),
        //是否在收起时显示
        is_top: false
    }],
    //submit提交
    submit: function submit(values) {
        console.log(values);
    },
    search_line: true,
    //布局
    formItemLayout: [4, 18],
    noLabel: false,
    //form表单需要的设置
    formSet: {},
    //实例运行时，返回一个form
    returnForm: function returnForm(form) {}
};

export default function index(prop) {
    var props = _extends({}, defaultProps, prop);

    var search_line = props.search_line,
        form_data = props.form_data,
        noLabel = props.noLabel,
        formSet = props.formSet,
        returnForm = props.returnForm;

    var _Form$useForm = _Form.useForm(),
        _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
        form = _Form$useForm2[0];

    var _useState = useState(true),
        _useState2 = _slicedToArray(_useState, 2),
        toogle = _useState2[0],
        setToogle = _useState2[1];

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        show = _useState4[0],
        setShow = _useState4[1];

    useEffect(function () {
        // Update the document title using the browser API
        showFun();
        returnForm(form);
        return function () {};
    }, []);

    var formItemLayout = search_line ? {
        labelCol: {
            xs: { span: 24 },
            sm: { span: props.formItemLayout[0] }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: props.formItemLayout[1] }
        }
    } : {};

    var showFun = function showFun() {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.form_data;

        var index = arr.find(function (data, i) {
            return !data.is_top;
        });
        setShow(index !== undefined);
    };

    var toogle_fun = function toogle_fun() {
        if (!toogle) {
            var rest_field = [];
            for (var i = 0; i < props.form_data.length; i++) {
                if (!props.form_data[i].is_top) {
                    rest_field.push(props.form_data[i].field);
                }
            }
            form.resetFields(rest_field);
        }
        setToogle(!toogle);
    };

    var rest = function rest() {
        form.resetFields();
        form.validateFields().then(function (values) {
            props.submit(values);
        });
    };

    var handleSubmit = function handleSubmit(values) {
        props.submit(values);
    };

    var initialValues = {};

    var lists = form_data.map(function (data, i) {
        var prop = {};
        if (!noLabel) {
            prop.label = data.title;
        }

        initialValues[data.field] = data.init_value;
        if (toogle) {
            if (data.is_top) {
                return React.createElement(
                    'div',
                    { key: i },
                    React.createElement(
                        FormItem,
                        _extends({
                            name: data.field
                        }, prop, formItemLayout),
                        data.comp
                    )
                );
            } else {
                return null;
            }
        } else {
            return React.createElement(
                'div',
                { key: i },
                React.createElement(
                    FormItem,
                    _extends({
                        name: data.field
                    }, prop, formItemLayout),
                    data.comp
                )
            );
        }
    });

    return React.createElement(
        _Form,
        _extends({ onFinish: handleSubmit,
            form: form,
            initialValues: initialValues,
            labelAlign: 'left'
        }, formSet),
        React.createElement(
            'div',
            { className: noLabel ? "up_table_form_search" : "up_table_form" },
            lists,
            React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'up_table_form_btn ant-form-item' },
                    React.createElement(
                        _Button,
                        {
                            type: 'primary',
                            htmlType: 'submit'
                        },
                        '\u67E5\u8BE2'
                    ),
                    React.createElement(
                        _Button,
                        {
                            style: { marginLeft: 10 },
                            onClick: rest
                        },
                        '\u91CD\u7F6E'
                    ),
                    show ? React.createElement(
                        'a',
                        {
                            style: { marginLeft: 6 },
                            onClick: toogle_fun },
                        toogle ? "展开" : "收起",
                        '\xA0',
                        toogle ? React.createElement(DownOutlined, null) : React.createElement(UpOutlined, null)
                    ) : null
                )
            )
        )
    );
};
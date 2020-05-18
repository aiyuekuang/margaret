import _extends from 'babel-runtime/helpers/extends';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import 'antd/lib/input/style';
import _Input from 'antd/lib/input';
import 'antd/lib/switch/style';
import _Switch from 'antd/lib/switch';

import { MinusCircleOutlined, PlusOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import FormAdd from "./form_adds";
import FormQues from "./questionAddForm";

var defaultProps = {
    color: "#1DA57A",
    submit: function submit() {},
    form_data: [{
        //表单标题
        title: "是否必答",
        //字段
        field: "must",
        //默认值,可以是函数，(text,record)=>{}
        init_value: true,
        //其他提示
        extra: "",
        //表单组件
        other_set: {
            valuePropName: 'checked'
        },
        comp: React.createElement(_Switch, { checkedChildren: '\u662F', unCheckedChildren: '\u5426' })
    }, {
        //表单标题
        title: "标题",
        //字段
        field: "title",
        fill: true,
        //表单组件
        comp: React.createElement(_Input, null)
    }],
    //是否有选择
    hasOpt: true,
    record: null,
    disabledAdd: false
};

export default function Index(prop) {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        isEmpty = _useState2[0],
        setIsEmpty = _useState2[1];

    var dateRef = useRef();
    var props = _extends({}, defaultProps, prop);
    var form_data = props.form_data,
        submit = props.submit,
        color = props.color,
        hasOpt = props.hasOpt,
        record = props.record,
        disabledAdd = props.disabledAdd;


    var submitFun = function submitFun(values, record, fun) {
        var _values = _extends({}, values);
        if (hasOpt) {
            _values.isEmpty = dateRef.current.returnArr();
        }
        submit(_values, record, fun);
    };

    return React.createElement(FormAdd, {
        record: record,
        form_data: form_data,
        submit: submitFun,
        OtherForm: function OtherForm() {
            if (hasOpt) {
                return React.createElement(FormQues, {
                    record: record,
                    color: color,
                    ref: dateRef,
                    disabledAdd: disabledAdd
                });
            } else {
                return null;
            }
        }
    });
};
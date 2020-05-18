import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
import 'antd/lib/form/style';
import _Form from 'antd/lib/form';
import _extends from 'babel-runtime/helpers/extends';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import 'antd/lib/input/style';
import _Input from 'antd/lib/input';

import { MinusCircleOutlined, PlusOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React, { Fragment, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

var TextArea = _Input.TextArea;


var defaultProps = {
    color: "#1DA57A",
    formItemLayout: [6, 16],
    multiple: false,
    record: null,
    label: "选项",
    rules: [{
        required: true,
        whitespace: true,
        message: "不能为空"
    }],
    name: "options",
    isTextArea: false
};

function Index(prop, ref) {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        arr = _useState2[0],
        setArr = _useState2[1];

    var props = _extends({}, defaultProps, prop);
    var color = props.color,
        record = props.record,
        label = props.label,
        rules = props.rules,
        name = props.name,
        isTextArea = props.isTextArea;


    useEffect(function () {
        // Update the document title using the browser API

        return function () {};
    }, []);

    var _style = {
        className: "dynamic-delete-button",
        style: { margin: '0 8px', fontSize: 14, color: color }
    };

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

    var formItemLayoutBtn = function formItemLayoutBtn() {
        var formItemLayout_ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.formItemLayout;

        return {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: formItemLayout_[1], offset: formItemLayout_[0] }
            }
        };
    };

    useImperativeHandle(ref, function () {
        return {
            returnArr: function returnArr() {
                return arr;
            }
        };
    });

    return React.createElement(
        Fragment,
        null,
        React.createElement(
            _Form.List,
            { name: name },
            function (fields, _ref) {
                var add = _ref.add,
                    remove = _ref.remove,
                    move = _ref.move;


                return React.createElement(
                    'div',
                    null,
                    fields.map(function (field, index) {
                        return React.createElement(
                            _Form.Item,
                            _extends({}, formItemLayout(), {
                                label: '' + label + (index + 1),
                                required: false,
                                key: field.key
                            }),
                            React.createElement(
                                _Form.Item,
                                _extends({}, field, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    rules: rules,
                                    noStyle: true
                                }),
                                isTextArea ? React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u9009\u9879' + (index + 1), style: { width: '60%' } }) : React.createElement(_Input, { placeholder: '\u8BF7\u8F93\u5165\u9009\u9879' + (index + 1), style: { width: '60%' } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'anup_form_ques_opt' },
                                fields.length > 1 ? React.createElement(
                                    Fragment,
                                    null,
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(ArrowUpOutlined, _extends({}, _style, {
                                            onClick: function onClick() {
                                                move(index, index - 1);
                                            }
                                        }))
                                    ),
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(ArrowDownOutlined, _extends({}, _style, {
                                            onClick: function onClick() {
                                                move(index, index + 1);
                                            }
                                        }))
                                    ),
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(MinusCircleOutlined, _extends({}, _style, {
                                            onClick: function onClick() {
                                                remove(field.name);
                                            }
                                        }))
                                    )
                                ) : null
                            )
                        );
                    }),
                    React.createElement(
                        _Form.Item,
                        formItemLayoutBtn(),
                        React.createElement(
                            _Button,
                            {
                                type: 'dashed',
                                onClick: function onClick() {
                                    add();
                                },
                                style: { width: '60%' }
                            },
                            React.createElement(PlusOutlined, null),
                            ' \u65B0\u589E'
                        )
                    )
                );
            }
        )
    );
};

export default Index = forwardRef(Index);
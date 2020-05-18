import 'antd/lib/input/style';
import _Input from 'antd/lib/input';
import 'antd/lib/upload/style';
import _Upload from 'antd/lib/upload';
import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
import _extends from 'babel-runtime/helpers/extends';
import 'antd/lib/message/style';
import _message from 'antd/lib/message';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp;

/**
 * Created by zengtao on 2018/12/18.
 */
import React, { Fragment, Component, PureComponent } from 'react';

import { form_value, turn_data } from "../utils/common";
import { createMap } from "esn";
import { CloudUploadOutlined } from "@ant-design/icons";

function f3(n) {
    return n === 0 ? 0 : n - n * 2;
}

var Index = (_temp = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || _Object$getPrototypeOf(Index)).call(this, props));

        _this.patternEnum = createMap([{
            id: 1,
            name: "上传模式"
        }, {
            id: 2,
            name: "URL模式"
        }]);

        _this.customRequest = function (value) {
            var file = value.file;
            _this.props.up_get(url, _this.props.upload_parm(file), function (data) {});

            //进行移动云上传
            _this.setState({
                loading_img: true
            });
            //this.props.onChange(file)
        };

        _this.load = null;

        _this.load_fun = function () {
            var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (_this.props.showUploadList) {
                return;
            }
            if (bool) {
                _this.load = _message.loading('上传中...', 0);
            } else {
                _this.load();
            }
        };

        _this.beforeUpload = function (file) {
            var max_size = _this.props.max_size;

            _this.setState({
                loading_img: true
            });
            _this.load_fun(true);
            _this.props.before_upload();
            var isLtMax = true,
                judge = true;
            if (max_size) {
                var file_size = file.size / 1024 / 1024;
                isLtMax = file_size < max_size;
                if (!isLtMax) {
                    _message.error('\u6587\u4EF6' + file_size.toFixed(2) + 'M\u8D85\u8FC7' + max_size + 'M\u9650\u5236');
                }
            }
            if (_this.props.accept.length > 0) {
                judge = _this.props.accept.find(function (i) {
                    console.log(33, file.type);
                    return i == file.type;
                });
                if (!judge) {
                    _message.error('\u6587\u4EF6\u300A' + file.name + '\u300B\u683C\u5F0F\u4E0D\u662F' + _this.props.accept);
                }
            }
            _this.load_fun(false);
            _this.setState({
                loading_img: false
            });
            return judge != undefined && isLtMax;
        };

        _this.handleChange = function (info) {
            var fileList = info.fileList;
            fileList = fileList.filter(function (file) {
                if (file.response) {
                    file.url = _this.props.add_url + _this.props.api_set(file.response);
                    return _this.props.api_key(file.response);
                } else {
                    if (!file.hasOwnProperty("status")) {
                        return false;
                    }
                    return true;
                }
            });

            if (info.file.status === "done") {
                if (_this.props.api_key(info.file.response)) {
                    _this.load_fun(false);
                } else {
                    _this.load_fun(false);
                    _this.setState({ loading_img: false });
                    _message.error('\u6587\u4EF6\u300A' + info.file.name + '\u300B\u4E0A\u4F20\u5931\u8D25\uFF1A' + _this.props.msg(info.file.response));
                }
                _this.props.upload_fun(info.file.response, function () {
                    _this.setState({ loading_img: false });
                });
                fileList = fileList.slice(f3(_this.props.num));
                _this.props.onChange(form_value(fileList, _this.props.form_value_string, _this.props));
            }

            if (info.file.status === "removed") {
                _this.props.onChange(form_value(fileList, _this.props.form_value_string, _this.props));
            }

            _this.setState({ fileList: fileList });
        };

        _this.patternChange = function (value) {
            if (value === 1) {
                _this.setState({
                    pattern: 2
                });
            } else {
                _this.setState({
                    pattern: 1
                });
            }
        };

        _this.state = {
            loading_img: false,
            fileList: turn_data(props.value, function (data, i) {
                return {
                    thumbUrl: props.add_url + data,
                    name: data.split('/').pop(),
                    response: props.response(data),
                    uid: i,
                    status: 'done',
                    url: props.add_url + data
                };
            }),
            pattern: 1
        };
        return _this;
    }

    _createClass(Index, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {
            var _this2 = this;

            if (nextProp.value !== this.props.value) {
                this.setState({
                    fileList: turn_data(nextProp.value, function (data, i) {
                        return {
                            thumbUrl: _this2.props.add_url + data,
                            name: data.split('/').pop(),
                            response: _this2.props.response(data),
                            uid: i,
                            status: 'done',
                            url: _this2.props.add_url + data
                        };
                    })
                });
            }
        }

        /**
         * 上传之前的验证
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                token = _props.token,
                value = _props.value,
                hasPattern = _props.hasPattern,
                Authorization = _props.Authorization;
            var _state = this.state,
                pattern = _state.pattern,
                fileList = _state.fileList;

            var props = _extends({
                action: this.props.url,
                onChange: this.handleChange,
                name: this.props.name
            }, this.props.other_set);
            var headers = {};
            headers[Authorization] = token;
            return React.createElement(
                Fragment,
                null,
                pattern === 1 ? React.createElement(
                    _Upload,
                    _extends({
                        className: 'inline_block',
                        fileList: fileList }, props, {
                        disabled: this.state.loading_img || this.props.disabled,
                        listType: this.props.listType,
                        accept: this.props.accept.length > 0 ? this.props.accept.join(",") : null,
                        beforeUpload: this.beforeUpload,
                        showUploadList: this.props.showUploadList,
                        headers: _extends({}, headers, props.headers)
                    }),
                    this.props.children ? this.props.children : React.createElement(
                        _Button,
                        {
                            disabled: this.state.loading_img || this.props.disabled },
                        this.props.showUploadList ? React.createElement(
                            Fragment,
                            null,
                            React.createElement(CloudUploadOutlined, null),
                            ' ',
                            this.props.tit
                        ) : this.props.tit
                    )
                ) : React.createElement(_Input, { style: { width: 180 }, value: value, onChange: this.props.onChange }),
                '\xA0',
                hasPattern ? React.createElement(
                    'a',
                    { onClick: this.patternChange.bind(this, pattern) },
                    this.patternEnum.get(pattern).name
                ) : null
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    up_get: function up_get() {},
    //是否禁用上传按钮
    disabled: false,
    //图片上传地址
    url: "/upload/profile",
    //上传的参数
    // upload_parm: (file) => {
    //     return {};
    // },
    //允许上传几张，默认是1张图片
    num: 1,
    //允许上传的文件格式
    accept: [],
    //文件最大
    max_size: 1,
    //其他设置
    other_set: {},
    //上传文件的参数名
    name: "file",
    //接口数据处理
    api_set: function api_set(data) {
        return data.entity;
    },
    //接口数据是否接收成功的函数
    api_key: function api_key(data) {
        return data.key === 1;
    },
    //当前图片list改变时就会调用
    onChange: function onChange(list) {
        //console.log(list)
    },
    //上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
    listType: "picture",
    //按钮文本
    tit: "点击上传",
    //是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon
    showUploadList: true,
    //上传成功后的回调,
    upload_fun: function upload_fun(data, loading) {
        loading();
    },
    //上传开始时的回调
    before_upload: function before_upload() {},
    //成功和失败后的提示语
    msg: function msg(data) {
        return data.value;
    },

    //前缀url,如果后端返回的是一个需要拼接的地址，那就用这个地址拼接
    add_url: "",

    //拼接代码需要用到的接口返回格式
    response: function response(url) {
        return { key: 1, entity: url, value: "成功" };
    },
    //onChange的时候，是返回数组还是返回字符串
    form_value_string: true,
    token: "",
    //是否可以切换图片模式
    hasPattern: false,
    Authorization: "Authorization"
}, _temp);
export { Index as default };
import 'antd/lib/upload/style';
import _Upload from 'antd/lib/upload';
import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import 'antd/lib/message/style';
import _message from 'antd/lib/message';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp2;

/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent } from 'react';

import { cuns } from 'esn';
import { CloudUploadOutlined } from "@ant-design/icons";

var Index = (_temp2 = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || _Object$getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            OSSData: {}
        }, _this.init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var OSSData;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return _this.mockGetOSSData();

                        case 3:
                            OSSData = _context.sent;


                            _this.setState({
                                OSSData: OSSData
                            });
                            _context.next = 10;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context['catch'](0);

                            _message.error(_context.t0);

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2, [[0, 7]]);
        })), _this.mockGetOSSData = function () {
            var _this$props = _this.props,
                dir = _this$props.dir,
                expire = _this$props.expire,
                host = _this$props.host,
                accessId = _this$props.accessId,
                policy = _this$props.policy,
                signature = _this$props.signature;

            return {
                dir: dir,
                expire: expire,
                host: host,
                accessId: accessId,
                policy: policy,
                signature: signature
            };
        }, _this.onChange = function (_ref3) {
            var fileList = _ref3.fileList;
            var onChange = _this.props.onChange;

            console.log('Aliyun OSS:', fileList);
            if (onChange) {
                onChange([].concat(_toConsumableArray(fileList)));
            }
        }, _this.onRemove = function (file) {
            var _this$props2 = _this.props,
                value = _this$props2.value,
                onChange = _this$props2.onChange;


            var files = value.filter(function (v) {
                return v.url !== file.url;
            });

            if (onChange) {
                onChange(files);
            }
        }, _this.transformFile = function (file) {
            var OSSData = _this.state.OSSData;


            var suffix = file.name.slice(file.name.lastIndexOf('.'));
            var filename = Date.now() + suffix;
            file.url = OSSData.dir + filename;

            return file;
        }, _this.getExtraData = function (file) {
            var OSSData = _this.state.OSSData;


            return {
                key: file.url,
                OSSAccessKeyId: OSSData.accessId,
                policy: OSSData.policy,
                Signature: OSSData.signature
            };
        }, _this.beforeUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
            var OSSData, expire;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            OSSData = _this.state.OSSData;
                            expire = OSSData.expire * 1000;

                            if (!(expire < Date.now())) {
                                _context2.next = 5;
                                break;
                            }

                            _context2.next = 5;
                            return _this.init();

                        case 5:
                            return _context2.abrupt('return', true);

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        })), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'componentDidMount',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.init();

                            case 2:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function componentDidMount() {
                return _ref5.apply(this, arguments);
            }

            return componentDidMount;
        }()

        // Mock get OSS api
        // https://help.aliyun.com/document_detail/31988.html

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                tit = _props.tit,
                value = _props.value,
                other_set = _props.other_set;

            var props = _extends({
                name: 'file',
                fileList: value,
                action: this.state.OSSData.host,
                onChange: this.onChange,
                onRemove: this.onRemove,
                transformFile: this.transformFile,
                data: this.getExtraData,
                beforeUpload: this.beforeUpload
            }, other_set);
            return React.createElement(
                _Upload,
                props,
                React.createElement(
                    _Button,
                    null,
                    React.createElement(CloudUploadOutlined, null),
                    ' ',
                    tit
                )
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    value: [],
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw==',
    tit: "点击上传",
    //其他设置
    other_set: {}
}, _temp2);
export { Index as default };
import 'antd/lib/button/style';
import _Button from 'antd/lib/button';
import _extends from 'babel-runtime/helpers/extends';
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
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder';
import { upload } from "../utils/fetchData";
var Index = (_temp2 = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || _Object$getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            editorState: BraftEditor.createEditorState(null)
        }, _this.componentWillMount = function () {
            if (_this.props.value) {
                _this.setState({
                    editorState: BraftEditor.createEditorState(_this.props.value)
                });
            }
        }, _this.rest = function (data) {
            _this.setState({
                editorState: ContentUtils.clear(_this.state.editorState)
            });
            _this.props.rest();
        }, _this.handleChange = function (editorState) {
            _this.props.onChange(editorState.toHTML());
            _this.setState({
                editorState: editorState
            });
        }, _this.preview = function () {
            if (window.previewWindow) {
                window.previewWindow.close();
            }
            window.previewWindow = window.open();
            window.previewWindow.document.write(_this.buildPreviewHtml());
            window.previewWindow.document.close();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {
            if (nextProp.value != this.props.value) {
                if (nextProp.value) {
                    this.setState({
                        editorState: BraftEditor.createEditorState(nextProp.value)
                    });
                } else {
                    this.setState({
                        editorState: BraftEditor.createEditorState("")
                    });
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'buildPreviewHtml',
        value: function buildPreviewHtml() {
            return this.state.editorState.toHTML();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                upload_url = _props.upload_url,
                upload_set = _props.upload_set,
                upload_size = _props.upload_size,
                image = _props.image,
                video = _props.video,
                audio = _props.audio,
                set_data = _props.set_data,
                is_true = _props.is_true,
                other_set = _props.other_set;
            var editorState = this.state.editorState;

            var extendControls = ['separator', {
                key: 'clear-editor',
                type: 'button',
                text: '清除',
                onClick: this.rest
            }, 'separator', {
                key: 'custom-button',
                type: 'button',
                text: '预览',
                onClick: this.preview
            }];
            var myUploadFn = function myUploadFn(param) {

                var progressFn = function progressFn(event) {
                    // 上传进度发生变化时调用param.progress
                    param.progress(event.loaded / event.total * 100);
                };

                var errorFn = function errorFn(response) {
                    // 上传发生错误时调用param.error
                    param.error({
                        msg: '上传失败'
                    });
                };

                upload(upload_url, _extends({ file: param.file }, upload_set)).then(function (res) {
                    console.log(res);
                    if (is_true(res.data)) {
                        param.success({
                            url: set_data(res.data)
                        });
                    } else {
                        errorFn(res);
                    }
                }, function (erro) {
                    errorFn(erro);
                    console.log(erro);
                });
            };
            return React.createElement(
                'div',
                { className: 'braft_warp' },
                React.createElement(
                    'div',
                    { className: 'braft_warp_top' },
                    React.createElement(BraftEditor, _extends({
                        value: editorState,
                        onBlur: this.handleChange,
                        extendControls: extendControls,
                        controls: this.props.controls.concat(this.props.extra_con),
                        media: { uploadFn: myUploadFn,
                            validateFn: function validateFn(file) {
                                return file.size < 1024 * upload_size;
                            },
                            accepts: {
                                image: image,
                                video: video,
                                audio: audio
                            }
                        }
                    }, other_set))
                ),
                this.props.btn ? React.createElement(
                    'div',
                    { className: 'braft_warp_btn' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            _Button,
                            { type: 'primary', onClick: this.props.submit },
                            '\u63D0\u4EA4'
                        )
                    )
                ) : null
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    up_get: function up_get() {},
    //文字变化之后的接收
    onChange: function onChange(data) {
        console.log(data);
    },
    //全部的组件
    controls: ['undo', 'redo', 'separator', 'font-size', 'line-height', 'letter-spacing', 'separator', 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator', 'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator', 'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator', 'link', 'separator', 'hr', 'separator', 'media', 'clear'],
    //在默认基础上，其他需要的组件
    extra_con: [],
    //提交按钮触发
    submit: function submit(data) {
        console.log(data);
    },
    //重置按钮
    rest: function rest() {},
    //是否显示btn
    btn: false,
    //上传图片的url
    upload_url: "/upload/profile",
    //图片上传的其他参数设置
    upload_set: {},
    //上传文件的大小以k为单位
    upload_size: 1000,
    //图片文件的上传格式
    image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
    //是否需要上传video
    video: false, //'video/mp4'
    //是否需要上传音频
    audio: false, // 'audio/mp3'
    //判断数据是否正确的函数
    is_true: function is_true(data) {
        return data.key == 1;
    },
    //数据获取方式
    set_data: function set_data(data) {
        return data.filePath;
    },
    //其他的富文本的设置
    other_set: {}
}, _temp2);
export { Index as default };
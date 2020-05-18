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
import { uid } from "../utils/common";
var Index = (_temp2 = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || _Object$getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.um = null, _this.uuid = null, _this.componentWillMount = function () {
            _this.um = null;
            _this.uuid = uid();
        }, _this.componentDidMount = function () {
            if (!_this.isInclude("ueditor.all.min.js")) {
                _this.createScriptDom("/lib/ueditor_s/ueditor.config.js", function () {
                    _this.createScriptDom("/lib/ueditor_s/ueditor.all.min.js", function () {
                        _this.createScriptDom("/lib/ueditor_s/lang/zh-cn/zh-cn.js", function () {
                            _this.init();
                        });
                    });
                });
            } else {
                _this.init();
            }
        }, _this.isInclude = function (name) {
            var js = /js$/i.test(name);
            var es = document.getElementsByTagName(js ? 'script' : 'link');
            for (var i = 0; i < es.length; i++) {
                if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
            }return false;
        }, _this.createScriptDom = function (url, callback) {
            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'js';

            var scriptDom = null;
            if (type == "js") {
                scriptDom = document.createElement('script');
                scriptDom.type = 'text/javascript';
                scriptDom.async = true;
                scriptDom.src = url;
                document.body.appendChild(scriptDom);
            } else {
                var head = document.getElementsByTagName('head')[0];
                scriptDom = document.createElement('link');
                scriptDom.href = url;
                scriptDom.rel = 'stylesheet';
                scriptDom.type = 'text/css';
                head.appendChild(scriptDom);
            }
            scriptDom.onload = function () {
                callback();
            };
        }, _this.init = function () {
            _this.um = UE.getEditor(_this.uuid, _this.props.config);
            _this.um.addListener('blur', function () {
                _this.props.onChange(_this.getAllHtml());
            });

            if (_this.props.value) {
                _this.setContent(_this.props.value);
                _this.props.onChange(_this.props.value);
            }
        }, _this.getAllHtml = function () {
            return _this.um.getContent();
        }, _this.setContent = function (text) {
            var isAppendTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            _this.um.ready(function () {
                _this.um.setContent(text, isAppendTo);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {
            if (nextProp.value != this.props.value) {
                if (nextProp.value) {
                    this.setContent(nextProp.value);
                    this.props.onChange(nextProp.value);
                } else {
                    this.setContent("");
                }
            }
        }

        //移除

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}

        //获取内容


        //写入内容

    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'up_ueditor' },
                React.createElement('script', { type: 'text/plain', id: this.uuid, style: { width: "100%", height: 240 } })
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    //文字变化之后的接收
    onChange: function onChange(data) {},
    //百度富文本的一些常用设置
    config: {
        toolbars: [['fullscreen', 'source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'simpleupload', 'horizontal', 'date', 'time']]
    }
}, _temp2);
export { Index as default };
import _typeof from 'babel-runtime/helpers/typeof';
import _getIterator from 'babel-runtime/core-js/get-iterator';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import 'antd/lib/notification/style';
import _notification from 'antd/lib/notification';
import 'antd/lib/message/style';
import _message from 'antd/lib/message';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

/**
 * Created by zengtao on 2018/8/1.
 */
import React, { Fragment, Component, PureComponent } from 'react';
import NProgress from 'nprogress';

import { getData, postData } from "./fetchData";
import { qus } from "esn";
//整合的一个get请求，
//url:请求的地址
//parm：参数对象
//chenggong：请求成功后的回调
//all_fun：请求无论成功失败都会调用的一个回调，用于如loading的显示与消除
//erro：错误的回调

export var up_get = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var parm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var chenggong = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
        var all_fun = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
        var erro = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
        var response;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        NProgress.start();
                        _context.next = 3;
                        return postData("/mock" + url, parm);

                    case 3:
                        response = _context.sent;
                        _context.next = 6;
                        return function (response) {
                            if (response.data.key == 1) {
                                all_fun();
                                chenggong(response.data);
                                NProgress.done();
                            } else if (response.data.key == -9001) {
                                all_fun();
                                _message.error("登录时效，请重新登录");
                                history.push("/login");
                            } else {
                                all_fun();
                                _notification['error']({
                                    message: '接口提示',
                                    description: response.data.value
                                });
                            }
                            NProgress.done();
                        }(response);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function up_get() {
        return _ref.apply(this, arguments);
    };
}();

//临时下载插件
export var createScriptDom = function createScriptDom(url, callback) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'js';

    var isInclude = function isInclude(name) {
        var js = /js$/i.test(name);
        var es = document.getElementsByTagName(js ? 'script' : 'link');
        for (var i = 0; i < es.length; i++) {
            if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
        }return false;
    };

    if (isInclude(url.split("/")[url.split("/").length - 1])) {
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
    }
};

export var uid = function uid() {
    var now = +new Date();
    return 'bee-' + now;
};

export var getTextByJs = function getTextByJs(arr) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (str.length > 0) {
        str = str.substr(0, str.length - 1);
    }
    return str;
};

//数组根据字段判断是不是需要转成字符串
export var form_value = function form_value(list, form_value_string, props) {
    var str = form_value_string ? "" : [];
    if (list && list.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _getIterator(list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                if (i.response && props.api_key(i.response)) {
                    if (form_value_string) {
                        str += (str.length > 2 ? "," : "") + props.api_set(i.response);
                    } else {
                        str.push(props.api_set(i.response));
                    }
                }
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
    }
    console.log(list, form_value_string, str);
    return str;
};

//图片地址可能是数组也可能是字符串，转成数组转图片对象
export var turn_data = function turn_data(arr) {
    var arr_obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (arr) {
        if (typeof arr == 'string') {
            arr = arr.split(",");
        }
        if (arr instanceof Array && arr.length > 0) {
            if (arr_obj) {
                return arr.map(function (data, i) {
                    return arr_obj(data, i);
                });
            }
            return arr;
        } else {
            return [];
        }
    } else {
        return [];
    }
};

export var valueFormat = function valueFormat(value, tit) {
    try {
        if (value) {
            return value;
        } else {
            return tit;
        }
    } catch (e) {
        return tit;
    }
};

export var diff = function diff(x, y) {
    // If both x and y are null or undefined and exactly the same
    if (x === y) {
        return true;
    }

    // If they are not strictly equal, they both need to be Objects
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }

    //They must have the exact same prototype chain,the closest we can do is
    //test the constructor.
    if (x.constructor !== y.constructor) {
        return false;
    }

    for (var p in x) {
        //Inherited properties were tested using x.constructor === y.constructor
        if (x.hasOwnProperty(p)) {
            // Allows comparing x[ p ] and y[ p ] when set to undefined
            if (!y.hasOwnProperty(p)) {
                return false;
            }

            // If they have the same strict value or identity then they are equal
            if (x[p] === y[p]) {
                continue;
            }

            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (_typeof(x[p]) !== "object") {
                return false;
            }

            // Objects and Arrays must be tested recursively
            if (!Object.equals(x[p], y[p])) {
                return false;
            }
        }
    }

    for (p in y) {
        // allows x[ p ] to be set to undefined
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
};
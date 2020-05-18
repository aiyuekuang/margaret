import 'antd/lib/message/style';
import _message from 'antd/lib/message';
import _Promise from 'babel-runtime/core-js/promise';

var _this = this;

/**
 * Created by admin on 2016/10/10.
 */
import axios from 'axios';
import { qus, cuns } from 'esn';


var api = "/api";
//封装好的get和post接口，调用方法情况action文件
export var Axios = axios.create({
    // baseURL: API_URL, //设置默认api路径
    timeout: 10000, //设置超时时间
    headers: {
        'X-Custom-Header': 'foobar',
        responseType: "json",
        'content-type': api == "/mock" ? 'application/json' : 'application/x-www-form-urlencoded'
    }
});
//封装好的get和post接口，调用方法情况action文件
export var Axios_file = axios.create({
    // baseURL: API_URL, //设置默认api路径
    timeout: 10000, //设置超时时间
    headers: {
        'X-Custom-Header': 'foobar',
        responseType: "json",
        'content-type': "multipart/form-data"
    }
});

Axios.defaults.withCredentials = true;
// 配置发送请求拦截器
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
window.requestCancel = source.cancel; // 保存到全局变量，用于路由切换时调用

Axios.interceptors.request.use(function (config) {
    config.cancelToken = source.token;
    return config;
}, function (err) {
    return _Promise.reject(err);
});

Axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (err) {
    console.log(222, err);
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误(400)';
                break;
            case 401:
                err.message = '未授权，请重新登录(401)';
                _message.error(err.response.headers.msg ? decodeURI(err.response.headers.msg) : "未登录，请重新登录");
                break;
            case 403:
                err.message = '拒绝访问(403)';
                break;
            case 404:
                err.message = '请求出错(404)';
                break;
            case 408:
                err.message = '请求超时(408)';
                break;
            case 500:
                err.message = '服务器错误(500)';
                break;
            case 501:
                err.message = '服务未实现(501)';
                break;
            case 502:
                err.message = '网络错误(502)';
                break;
            case 503:
                err.message = '服务不可用(503)';
                break;
            case 504:
                err.message = '网络超时(504)';
                break;
            case 505:
                err.message = 'HTTP版本不受支持(505)';
                break;
            default:
                err.message = '\u8FDE\u63A5\u51FA\u9519(' + err.response.status + ')!';
        }
    } else {
        err.message = '连接服务器失败!';
    }
    return _Promise.reject(err);
});

export var getData = function getData(url) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Axios.get('' + url, {
        params: api == "/mock" ? param : getFormJson(param)
    });
};

export var postData = function postData(url) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Axios.post('' + url, api == "/mock" ? param : getFormJson(param));
};
var config = {
    onUploadProgress: function onUploadProgress(progressEvent) {
        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
        _this.progress = complete;
        console.log(complete);
    }
};
export var upload = function upload(url) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Axios_file.post('' + url, getFormJson(param));
};

function getFormJson(obj) {
    var oMyForm = new FormData();
    for (var i in obj) {
        oMyForm.append(i, obj[i]);
    }
    return oMyForm;
}
import 'antd/lib/modal/style';
import _Modal from 'antd/lib/modal';
/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent } from 'react';

var confirm = _Modal.confirm;

export var up_confirm = function up_confirm(ok) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "确定删除？";

    confirm({
        title: '提示',
        content: title,
        okText: "是",
        maskClosable: true,
        okType: 'primary',
        cancelText: "否",
        onOk: ok
    });
};

export default { up_confirm: up_confirm };
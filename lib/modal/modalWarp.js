import "antd/lib/modal/style";
import _Modal from "antd/lib/modal";
import _extends from "babel-runtime/helpers/extends";
import _slicedToArray from "babel-runtime/helpers/slicedToArray";
/**
 * Created by zengtao on 2017/5/19.
 */
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react';

import { cloneop, deleteObjKey } from "esn";
//本项目的模板页面


var defaultProps = {
    title: "日志",
    Compnent: function Compnent() {
        return React.createElement("div", null);
    },
    className: "inlineBlock",
    config: {},
    open: function open() {}
};

function Index(prop, ref) {
    // Declare a new state variable, which we'll call "count"
    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        visible = _useState2[0],
        _setVisible = _useState2[1];

    var props = _extends({}, defaultProps, prop);
    var title = props.title,
        Compnent = props.Compnent,
        className = props.className,
        config = props.config,
        open = props.open;


    var handleCancel = function handleCancel() {
        _setVisible(false);
    };

    var onShow = function onShow() {
        open();
        _setVisible(true);
    };

    useImperativeHandle(ref, function () {
        return {
            setVisible: function setVisible(bool) {
                return _setVisible(bool);
            }
        };
    });

    return React.createElement(
        Fragment,
        null,
        React.createElement(
            "div",
            { className: className, onClick: onShow },
            props.children
        ),
        React.createElement(
            _Modal,
            _extends({
                title: title,
                visible: visible,
                footer: null,
                onCancel: handleCancel
            }, config),
            React.createElement(Compnent, { visible: visible })
        )
    );
}

export default Index = forwardRef(Index);
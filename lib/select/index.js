import _toConsumableArray from "babel-runtime/helpers/toConsumableArray";
import _typeof from "babel-runtime/helpers/typeof";
import _extends from "babel-runtime/helpers/extends";
import _slicedToArray from "babel-runtime/helpers/slicedToArray";
import "antd/lib/select/style";
import _Select from "antd/lib/select";
/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, useEffect, useState } from 'react';

import { arrNumberToString, arrStringToNumber, cloneop, deleteObjKey, isArrayop, StringToBoolean } from "esn";
//本项目的模板页面

var Option = _Select.Option;


var defaultProps = {
    dataSource: [{
        name: "11",
        id: 1
    }, {
        name: "22",
        id: 2
    }],
    label: "name",
    labelValue: "id",
    //保持数值原来的类型
    keepOrgType: true,
    onChange: function onChange(value) {
        console.log(6677, value);
    },
    value: []
};

export default function Index(prop) {
    // Declare a new state variable, which we'll call "count"
    var _useState = useState("string"),
        _useState2 = _slicedToArray(_useState, 2),
        type = _useState2[0],
        setType = _useState2[1];

    var _useState3 = useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        valueState = _useState4[0],
        setValueState = _useState4[1];

    var props = _extends({}, defaultProps, prop);
    var dataSource = props.dataSource,
        label = props.label,
        labelValue = props.labelValue,
        value = props.value;


    useEffect(function () {
        // Update the document title using the browser API
        if (isArrayop(dataSource) && dataSource.length > 1) {
            setType(_typeof(dataSource[1][labelValue]));
        }

        return function () {};
    }, [dataSource]);

    useEffect(function () {
        // Update the document title using the browser API
        if (isArrayop(value) && value.length > 0) {
            if (typeof value[0] === "number") {
                setValueState(arrNumberToString(value));
            }
        } else {
            var _value = value;

            if (type !== "string") {
                _value = _value.toString();
            }

            setValueState(_value);
        }

        return function () {};
    }, [value]);

    function handleChange(value) {
        var _value = value;

        if (isArrayop(value)) {
            _value = [].concat(_toConsumableArray(value));
            if (type === "number") {
                _value = arrStringToNumber(value);
            }
        } else {

            if (type === "boolean") {
                _value = StringToBoolean(value);
            }

            if (type === "number") {
                _value = parseInt(value);
            }
        }

        props.onChange(_value);
    }

    var children = dataSource.map(function (data, i) {
        return React.createElement(
            Option,
            { key: data[labelValue] },
            data[label]
        );
    });

    var _props = cloneop(props);

    return React.createElement(
        _Select,
        _extends({
            style: { width: "100%" }
        }, deleteObjKey(["keepOrgType", "dataSource", "onChange", "value", "labelValue"], _props), {
            onChange: handleChange,
            value: valueState
        }),
        children
    );
}
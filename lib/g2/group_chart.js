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
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

//G2.Global.renderer = 'svg'

var Index = (_temp2 = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || _Object$getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.componentWillMount = function () {}, _this.componentDidMount = function () {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    //改变数据的动画


    _createClass(Index, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {}

        //移除

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                x = _props.x,
                y = _props.y,
                title = _props.title,
                info = _props.info,
                name = _props.name,
                fields = _props.fields,
                data = _props.data,
                width = _props.width,
                height = _props.height,
                padding = _props.padding;

            var dv = new DataSet().createView();
            dv.transform({
                type: "fold",
                fields: fields,
                // 展开字段集
                key: x,
                // key字段
                value: y // value字段
            });
            return React.createElement(
                'div',
                { className: 'up_g2_warp', style: { width: width, padding: padding } },
                React.createElement(
                    Chart,
                    {
                        data: dv.source(data),
                        height: height ? height : 500,
                        forceFit: true
                    },
                    title ? React.createElement(
                        'div',
                        { className: 'mainTitle' },
                        title
                    ) : null,
                    info ? React.createElement(
                        'div',
                        { className: 'subTitle' },
                        info
                    ) : null,
                    React.createElement(Axis, { name: x }),
                    React.createElement(Axis, { name: y }),
                    React.createElement(Legend, null),
                    React.createElement(Tooltip, {
                        crosshairs: {
                            type: "y"
                        }
                    }),
                    React.createElement(Geom, { type: 'interval', position: x + '*' + y, color: name, adjust: [{
                            type: "dodge",
                            marginRatio: 1 / 32
                        }] })
                )
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    //固定宽高
    width: null,
    //高度必填，不然就报错
    height: null,
    padding: "auto",
    // 数据源
    data: [{
        name: "London",
        "Jan": 18.9,
        "Feb": 28.8,
        "Mar": 39.3,
        "Apr": 81.4,
        May: 47,
        "Jun.": 20.3,
        "Jul.": 24,
        "Aug.": 35.6
    }, {
        name: "Berlin",
        "Jan.": 12.4,
        "Feb.": 23.2,
        "Mar.": 34.5,
        "Apr.": 99.7,
        May: 52.6,
        "Jun.": 35.5,
        "Jul.": 37.4,
        "Aug.": 42.4
    }, {
        name: "nanujing",
        "Jan.": 12.4,
        "Feb.": 23.2,
        "Mar.": 34.5,
        "Apr.": 99.7,
        May: 52.6,
        "Jun.": 35.5,
        "Jul.": 37.4,
        "Aug.": 42.4
    }],
    //x的名称
    x: "x",
    //y的名称
    y: "y",
    //标题
    title: null,
    //描述
    info: null,
    //数据源中的name字段
    name: "name",
    //x轴上的那一横排
    fields: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."]
}, _temp2);
export { Index as default };
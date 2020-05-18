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
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from "bizcharts";
import DataSet from '@antv/data-set';

//G2.Global.renderer = 'svg'
var DataView = DataSet.DataView;
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
                data = _props.data,
                width = _props.width,
                height = _props.height,
                padding = _props.padding;
            //改变数据的动画

            var dv = new DataView();
            dv.source(data).transform({
                type: "percent",
                field: y,
                dimension: x,
                as: "percent"
            });

            var cols = {
                percent: {
                    formatter: function formatter(val) {
                        val = (val * 100).toFixed(2) + "%";
                        return val;
                    }
                }
            };
            return React.createElement(
                'div',
                { className: 'up_g2_warp', style: { width: width, padding: padding } },
                React.createElement(
                    Chart,
                    { forceFit: true,
                        height: height ? height : 500,
                        data: dv,
                        padding: 'auto',
                        scale: cols
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
                    React.createElement(Coord, { type: 'theta', radius: 0.75 }),
                    React.createElement(Axis, { name: 'percent' }),
                    React.createElement(Legend, {
                        position: 'right'
                    }),
                    React.createElement(Tooltip, {
                        showTitle: false,
                        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                    }),
                    React.createElement(
                        Geom,
                        {
                            type: 'intervalStack',
                            position: 'percent',
                            color: x,
                            tooltip: [x + '*' + y, function (item, y) {
                                return {
                                    name: item,
                                    value: y
                                };
                            }],
                            style: {
                                lineWidth: 1,
                                stroke: "#fff"
                            }
                        },
                        React.createElement(Label, {
                            content: 'percent',
                            formatter: function formatter(val, item) {
                                return item.point[x] + ": " + val;
                            }
                        })
                    )
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
    //边距必填，不然就报错
    padding: "auto",
    // 数据源
    data: [{ x: '事例一', y: 40 }, { x: '事例二', y: 21 }, { x: '事例三', y: 17 }, { x: '事例四', y: 13 }, { x: '事例五', y: 9 }],
    x: "x",
    y: "y",
    //标题
    title: null,
    //描述
    info: null
}, _temp2);
export { Index as default };
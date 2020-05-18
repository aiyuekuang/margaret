import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp;

/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent } from 'react';

import { cuns } from 'esn';
import { G2, Chart, Geom, Axis, Tooltip, Legend, Coord, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from "bizcharts-plugin-slider";
import moment from "moment";
//G2.Global.renderer = 'svg'
var Index = (_temp = _class = function (_Component) {
    _inherits(Index, _Component);

    //改变数据的动画


    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || _Object$getPrototypeOf(Index)).call(this, props));

        _this.componentWillMount = function () {};

        _this.componentDidMount = function () {};

        _this.state = {};
        var _state = {};

        if (props.filterSatrt) {
            _state = {
                start: props.filterSatrt,
                end: props.filterEnd
            };
        }

        _this.ds = new DataSet({
            state: _state
        });

        _this._dv = _this.ds.createView("origin");

        return _this;
    }

    _createClass(Index, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProp) {}

        //移除

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'onChange',
        value: function onChange(obj) {
            var startValue = obj.startValue,
                endValue = obj.endValue;


            this.ds.setState("start", moment(startValue).format(format));
            this.ds.setState("end", moment(endValue).format(format));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                x = _props.x,
                y = _props.y,
                title = _props.title,
                info = _props.info,
                width = _props.width,
                height = _props.height,
                padding = _props.padding,
                data = _props.data,
                range = _props.range,
                shape = _props.shape,
                min = _props.min,
                xName = _props.xName,
                yName = _props.yName,
                format = _props.format,
                filterSatrt = _props.filterSatrt,
                filterEnd = _props.filterEnd;

            var cols = {};

            var dv = this._dv.source(data);

            if (filterSatrt) {
                dv.transform({
                    type: "filter",
                    callback: function callback(obj) {
                        var time = moment(obj.time).format(format); // !注意：时间格式，建议转换为时间戳进行比较
                        return time >= _this2.ds.state.start && time <= _this2.ds.state.end;
                    }
                });
            }

            cols[x] = {
                min: min,
                alias: xName
            };

            cols[y] = {
                range: range,
                alias: yName
            };

            return React.createElement(
                'div',
                { className: 'up_g2_warp', style: { width: width, padding: padding } },
                React.createElement(
                    Chart,
                    {
                        data: dv,
                        scale: cols,
                        height: height ? height : 500,
                        padding: 'auto',
                        forceFit: true
                    },
                    title ? React.createElement(
                        'span',
                        { className: 'mainTitle' },
                        title
                    ) : null,
                    info ? React.createElement(
                        'span',
                        { className: 'subTitle' },
                        info
                    ) : null,
                    React.createElement(Axis, { name: x }),
                    React.createElement(Axis, { name: y }),
                    React.createElement(Tooltip, {
                        crosshairs: {
                            type: "y"
                        }
                    }),
                    React.createElement(Geom, { type: 'line', position: x + '*' + y, size: 2, shape: shape }),
                    React.createElement(Geom, {
                        type: 'point',
                        position: x + '*' + y,
                        size: 4,
                        shape: shape,
                        style: {
                            stroke: "#fff",
                            lineWidth: 1
                        }
                    })
                ),
                filterSatrt ? React.createElement(Slider, {
                    width: 'auto',
                    height: 26,
                    start: dv.start,
                    end: dv.end,
                    xAxis: x,
                    yAxis: y,
                    scales: {
                        date: {
                            type: y,
                            tickCount: 10,
                            mask: format
                        }
                    },
                    data: dv,
                    backgroundChart: {
                        type: "line"
                    },
                    onChange: this.onChange.bind(this)
                }) : null
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
        "time": "2019-08-08",
        "value": 0
    }, {
        "time": "2019-08-09",
        "value": 0
    }, {
        "time": "2019-08-10",
        "value": 0
    }, {
        "time": "2019-08-11",
        "value": 0
    }, {
        "time": "2019-08-12",
        "value": 0
    }, {
        "time": "2019-08-13",
        "value": 0
    }, {
        "time": "2019-08-14",
        "value": 0
    }, {
        "time": "2019-08-15",
        "value": 0
    }, {
        "time": "2019-08-16",
        "value": 0
    }, {
        "time": "2019-08-17",
        "value": 0
    }, {
        "time": "2019-08-18",
        "value": 0
    }, {
        "time": "2019-08-19",
        "value": 0
    }, {
        "time": "2019-08-20",
        "value": 0
    }, {
        "time": "2019-08-21",
        "value": 0
    }, {
        "time": "2019-08-22",
        "value": 0
    }, {
        "time": "2019-08-23",
        "value": 0
    }, {
        "time": "2019-08-24",
        "value": 0
    }, {
        "time": "2019-08-25",
        "value": 0
    }, {
        "time": "2019-08-26",
        "value": 0
    }, {
        "time": "2019-08-27",
        "value": 0
    }, {
        "time": "2019-08-28",
        "value": 0
    }, {
        "time": "2019-08-29",
        "value": 12
    }, {
        "time": "2019-08-30",
        "value": 1039
    }, {
        "time": "2019-08-31",
        "value": 438
    }, {
        "time": "2019-09-01",
        "value": 0
    }, {
        "time": "2019-09-02",
        "value": 587
    }, {
        "time": "2019-09-03",
        "value": 341
    }, {
        "time": "2019-09-04",
        "value": 600
    }, {
        "time": "2019-09-05",
        "value": 684
    }, {
        "time": "2019-09-06",
        "value": 250
    }, {
        "time": "2019-09-07",
        "value": 0
    }, {
        "time": "2019-09-08",
        "value": 0
    }],
    //x的名称
    x: "time",
    //y的名称
    y: "value",
    xName: "日期时间",
    yName: "数量",
    //标题
    title: null,
    //描述
    info: null,
    //[0, 1]
    range: null,
    //0
    min: null,
    //smooth曲线，circle直线
    shape: "smooth",
    //日期筛选的日期format
    format: "YYYY-MM-DD",
    //filter筛选日期
    filterSatrt: null,
    filterEnd: null }, _temp);
export { Index as default };
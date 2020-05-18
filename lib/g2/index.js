import _defineProperty from 'babel-runtime/helpers/defineProperty';
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
import Nodataicon from "../icon/no_data";
//G2.Global.renderer = 'svg'

var Index = (_temp = _class = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || _Object$getPrototypeOf(Index)).call(this, props));

        _this.state = {};

        _this.componentWillMount = function () {};

        _this.componentDidMount = function () {};

        _this.dv = new DataSet().createView();

        return _this;
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
            var _cols;

            var _props = this.props,
                x = _props.x,
                y = _props.y,
                title = _props.title,
                info = _props.info,
                width = _props.width,
                height = _props.height,
                padding = _props.padding,
                transpose = _props.transpose,
                data = _props.data,
                position = _props.position,
                dy = _props.dy,
                xName = _props.xName,
                yName = _props.yName;


            var cols = (_cols = {}, _defineProperty(_cols, '' + x, {
                alias: xName
            }), _defineProperty(_cols, '' + y, {
                alias: yName
            }), _cols);

            return React.createElement(
                'div',
                { className: 'up_g2_warp', style: { width: width, padding: padding } },
                data && data.length > 0 ? React.createElement(
                    Chart,
                    {
                        data: this.dv.source(this.props.data),
                        scale: cols,
                        height: height ? height : 500,
                        padding: 'auto',
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
                    React.createElement(Coord, { transpose: transpose }),
                    React.createElement(Axis, { name: x }),
                    React.createElement(Axis, { name: y }),
                    React.createElement(Legend, { position: position, dy: dy }),
                    React.createElement(Tooltip, null),
                    React.createElement(Geom, { type: 'interval', position: x + '*' + y, color: x })
                ) : React.createElement(
                    'div',
                    { className: 'none_data' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(Nodataicon, null),
                        '\u6682\u65E0\u6570\u636E'
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
    padding: "auto",
    // 数据源
    data: [{
        country: "中国",
        population: 131744
    }, {
        country: "印度",
        population: 104970
    }, {
        country: "美国",
        population: 29034
    }, {
        country: "印尼",
        population: 23489
    }, {
        country: "巴西",
        population: 18203
    }],
    //x的名称
    x: "country",
    //y的名称
    y: "population",
    xName: "日期时间",
    yName: "数量",
    //标题
    title: null,
    //描述
    info: null,
    //横过来
    transpose: false,
    //legend的位置
    position: "top",
    dy: -20
}, _temp);
export { Index as default };
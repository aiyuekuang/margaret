import _extends from "babel-runtime/helpers/extends";
import _getIterator from "babel-runtime/core-js/get-iterator";
import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";

var _class, _temp2;

/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent } from 'react';
import { Chart, Geom, Tooltip, Guide, Legend } from "bizcharts";

var Text = Guide.Text;
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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || _Object$getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.componentDidMount = function () {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: "componentWillUnmount",


        //移除
        value: function componentWillUnmount() {}
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                x = _props.x,
                y = _props.y,
                title = _props.title,
                info = _props.info,
                data = _props.data,
                width = _props.width,
                height = _props.height,
                padding = _props.padding,
                font_size = _props.font_size;

            var data_temp = [],
                score = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _getIterator(data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    var temp = _extends({}, i);
                    temp.path = 'M381.759 0h292l-.64 295.328-100.127-100.096-94.368 94.368C499.808 326.848 512 369.824 512 415.712c0 141.376-114.56 256-256 256-141.376 0-256-114.624-256-256s114.624-256 256-256c48.8 0 94.272 13.92 133.12 37.632l93.376-94.592L381.76 0zM128.032 415.744c0 70.688 57.312 128 128 128s128-57.312 128-128-57.312-128-128-128-128 57.312-128 128z';
                    data_temp.push(temp);
                    score += i[y];
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

            var cols = {};
            cols[y] = {
                min: 0,
                max: score
            };

            return React.createElement(
                "div",
                { className: "up_g2_warp", style: { width: width, padding: padding } },
                React.createElement(
                    Chart,
                    {
                        data: data_temp,
                        scale: cols,
                        height: height ? height : 500,
                        forceFit: true
                    },
                    title ? React.createElement(
                        "div",
                        { className: "mainTitle" },
                        title
                    ) : null,
                    info ? React.createElement(
                        "div",
                        { className: "subTitle" },
                        info
                    ) : null,
                    React.createElement(Tooltip, {
                        showTitle: false,
                        itemTpl: '<li data-index={index}>' + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' + '{name}: {value}' + '人</li>'
                    }),
                    React.createElement(Geom, {
                        type: "interval",
                        position: x + "*" + y,
                        color: x,
                        shape: "liquid-fill-gauge",
                        style: {
                            lineWidth: 10,
                            opacity: 0.75
                        }
                    }),
                    React.createElement(Legend, null),
                    React.createElement(
                        Guide,
                        null,
                        data_temp.map(function (row, i) {
                            var pos = {};
                            pos[x] = row[x];
                            pos[y] = score / 2;
                            return React.createElement(Text, {
                                content: (row[y] / score * 100).toFixed(2) + "%",
                                top: true,
                                key: i,
                                position: pos,
                                style: {
                                    opacity: 0.75,
                                    fontSize: font_size,
                                    textAlign: 'center'
                                }
                            });
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
    padding: "auto",
    // 数据源
    data: [{
        x: 'male',
        y: 50
    }, {
        x: 'middle',
        y: 25
    }, {
        x: 'female',
        y: 25
    }],
    x: "x",
    y: "y",
    //标题
    title: null,
    //描述
    info: null,
    //圈里字的大小
    font_size: 16
}, _temp2);
export { Index as default };
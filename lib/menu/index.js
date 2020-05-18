import _getIterator from 'babel-runtime/core-js/get-iterator';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import 'antd/lib/menu/style';
import _Menu from 'antd/lib/menu';

var _class, _temp;

/**
 * Created by zengtao on 2017/5/19.
 */
import React, { Fragment, Component, PureComponent } from 'react';

import { arrAdd, arrDelNull, truncate } from 'esn';
//本项目的模板页面
var SubMenu = _Menu.SubMenu;
var Index = (_temp = _class = function (_Component) {
    _inherits(Index, _Component);

    _createClass(Index, null, [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            // const {value} = nextProps;
            // 当传入的type发生变化的时候，更新state
            // if ("value" in nextProps && value !== prevState.value) {
            //     console.log(value)
            //     return {
            //         value,
            //     };
            // }
            return null;
        }
    }]);

    function Index(props) {
        _classCallCheck(this, Index);

        //一套算法获取默认展开的父
        var _this = _possibleConstructorReturn(this, (Index.__proto__ || _Object$getPrototypeOf(Index)).call(this, props));

        _this.componentDidMount = function () {};

        _this.itemFun = function (e) {
            var path = e.key;
            var url = e.item.props.data[_this.props.url];
            if (url) {
                window.open(url);
            } else {
                _this.setState({
                    selectedKeys: [path]
                }, function () {
                    _this.props.history.push(e.key);
                });
            }
        };

        var defaultOpenKeys = function defaultOpenKeys(value) {
            return arrAdd(arrDelNull(truncate(value.split("/"))), "/");
        };

        _this.state = {
            selectedKeys: [location.pathname],
            defaultOpenKeys: [defaultOpenKeys(location.pathname)]
        };

        if (props.history.listen) {
            props.history.listen(function (location, action) {
                // location is an object like window.location
                console.log(action, location.pathname);
                _this.setState({
                    selectedKeys: [location.pathname],
                    defaultOpenKeys: [defaultOpenKeys(location.pathname)]
                });
            });
        }

        return _this;
    }

    _createClass(Index, [{
        key: 'componentWillUnmount',


        //移除
        value: function componentWillUnmount() {
            //离开页面消除所有接口请求
            //window.requestCancel();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                routeData = _props.routeData,
                collapsed = _props.collapsed,
                lang = _props.lang,
                hide = _props.hide;
            var _state = this.state,
                selectedKeys = _state.selectedKeys,
                defaultOpenKeys = _state.defaultOpenKeys;


            var menuLi = function menuLi(routeData) {
                var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
                return routeData.map(function (data, i) {
                    var isNext = data.children && data.children.length > 0;
                    var isExpend = true;
                    if (isNext) {
                        isExpend = false;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = _getIterator(data.children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var _i = _step.value;

                                if (!_i[hide]) {
                                    isExpend = true;
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

                    var key_ = parentPath + data.path;
                    if (isNext && isExpend) {
                        return React.createElement(
                            SubMenu,
                            {
                                key: key_,
                                title: React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'span',
                                        null,
                                        data[lang]
                                    )
                                )
                            },
                            menuLi(data.children, key_)
                        );
                    } else {
                        if (data[hide]) {
                            return null;
                        } else {
                            return React.createElement(
                                _Menu.Item,
                                { key: key_, data: data },
                                React.createElement(
                                    'span',
                                    null,
                                    data[lang]
                                )
                            );
                        }
                    }
                });
            };

            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    _Menu,
                    { theme: 'dark', mode: 'inline',
                        style: { lineHeight: '64px' },
                        selectedKeys: selectedKeys,
                        defaultOpenKeys: defaultOpenKeys,
                        onClick: this.itemFun,
                        inlineCollapsed: collapsed
                    },
                    menuLi(routeData)
                )
            );
        }
    }]);

    return Index;
}(Component), _class.defaultProps = {
    history: {},
    routeData: [],
    collapsed: false,
    lang: "name",
    //跳转网页的字段
    url: "url",
    hide: "hide"
}, _temp);
export { Index as default };
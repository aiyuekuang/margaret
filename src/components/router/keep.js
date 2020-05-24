/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState} from 'react';
import {
    arrDelNull,
    arrLast,
    cloneop,
    isArrayop,
    treeFindObjById,
    treeSearchArrByArr,
    treeSearchByArr,
    urlToArr
} from "esn";
import {mg} from "../context";
import {history} from "./index";
//本项目的模板页面

const mgRouterShow = "mgRouterShow";

let defaultProps = {
    data: [],
}

//写入一个层级数组，找到对应的那个，改变当中的布尔值的值为true,其他的全部为false
export let treeSetKeyByArr = (tree, arr, label = 'id', bool = "show", children = 'children') => {
    let layer = 0;
    if (!tree) {
        console.log('提示', '你传递的tree是空');
    }
    let tree_ = cloneop(tree);
    if (!isArrayop(tree_)) {
        tree_ = [tree_];
    }
    let loop = (tree_, layer = 0) => {
        for (let i of tree_.keys()) {
            if (tree_[i][label] === arr[layer]) {
                if (arr[layer] && tree_[i][children] && tree_[i][children].length) {
                    tree_[i][bool] = false;
                    loop(tree_[i][children], layer + 1);
                } else if (layer === (arr.length - 1)) {
                    tree_[i][bool] = true;
                }
            } else {
                if (tree_[i][children] && tree_[i][children].length) {
                    tree_[i][bool] = false;
                    loop(tree_[i][children], layer + 1);
                } else {
                    tree_[i][bool] = false;
                }
            }
        }
    };
    loop(tree_);
    return tree_;
};

export default function Index(prop) {
    let props = {
        ...defaultProps, ...prop
    }
    const {data, onChange} = props;
    const {mgRouter, mgKeepRouter, dispatch} = mg()


    let setRouter = (_location, data = data) => {
        let treeResult = [];
        let newData = [];


        if (_location.pathname === "/") {
            let obj = treeFindObjById("/", data, "path")
            treeResult = [obj]
            newData = treeSetKeyByArr(data, ["/"], "path", mgRouterShow)
        } else {
            treeResult = treeSearchArrByArr(data, urlToArr(_location.pathname), "path")
            newData = treeSetKeyByArr(data, urlToArr(_location.pathname), "path", mgRouterShow)
        }

        dispatch({
            type: "MGSETROUTER",
            data: treeResult
        })

        dispatch({
            type: "MGSETKEEPROUTER",
            data: newData
        })


    }

    history.listen((_location, type) => {
        setRouter(_location, mgKeepRouter)
    })

    useEffect(() => {
        let obj = arrLast(mgRouter)
        if (obj && obj.redirect) {
            history.replace(obj.redirect)
        }

        return () => {
        }
    }, [mgRouter]);

    useEffect(() => {
        setRouter(history.location, data)
        return () => {
        }
    }, [data]);


    let loopDom = (_routerData = mgKeepRouter) => {
        return _routerData.map((data, i) => {
            if (data.children && data.children.length) {
                return loopDom(data.children)
            } else {
                if (data.component) {
                    return (
                        <div style={{display: data[mgRouterShow] ? "inline-block" : "none"}} key={i}>
                            <data.component/>
                        </div>
                    )
                } else {
                    return null
                }
            }
        })
    }

    return (
        <Fragment>
            {loopDom()}
        </Fragment>
    );
}

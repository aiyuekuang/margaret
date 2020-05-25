/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState} from 'react';
import {createBrowserHistory} from "history"
import {
    arrLast,
    treeFindObjById,
    treeSearchArrByArr,
    urlToArr
} from "esn";
import {mg} from "../context";
//本项目的模板页面

export const history = createBrowserHistory()


let defaultProps = {
    data: []
}

export default function Index(prop) {
    let props = {
        ...defaultProps, ...prop
    }
    const {data} = props;
    const {mgRouter, dispatch} = mg()

    let setRouter = (datas) => {
        let treeResult = [];

        if (datas.pathname === "/") {
            treeResult = [treeFindObjById("/", data, "path")]
        } else {
            treeResult = treeSearchArrByArr(data, urlToArr(datas.pathname), "path")
        }

        dispatch({
            type: "MGSETROUTER",
            data: treeResult
        })
    }

    useEffect(() => {
        setRouter(history.location);
        history.listen((datas, type) => {
            setRouter(datas);
        })

        return () => {
        }
    }, []);

    let View = mgRouter && arrLast(mgRouter) ? arrLast(mgRouter).component : () => (<span/>)

    return (
        <Fragment>
            <View/>
        </Fragment>
    );
}

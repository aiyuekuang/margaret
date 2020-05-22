/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState} from 'react';
import {createBrowserHistory} from "history"
import {arrDelNull, arrLast, cloneop, isArrayop, treeSearchArrByArr, treeSearchByArr, urlToArr} from "esn";
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
        let pathArr = urlToArr(datas.pathname)
        dispatch({
            type: "MGSETROUTER",
            data: treeSearchArrByArr(data, pathArr, "path")
        })
    }

    useEffect(() => {
        console.log(565, history.location)
        setRouter(history.location);
        history.listen((datas, type) => {
            setRouter(datas);
        })
        return () => {
        }
    }, []);

    console.log(55533,arrLast(mgRouter))
    let View = mgRouter && arrLast(mgRouter) ? arrLast(mgRouter).component : ()=>(<span/>)

    return (
        <Fragment>
            <View/>
        </Fragment>
    );
}

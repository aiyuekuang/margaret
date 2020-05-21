/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState, useContext} from 'react';
import Page1 from "@page/page1"
import Page2 from "@page/page2"
import Router from "@components/router"
import {mg} from "@components/context";


//本项目的模板页面

let baseRoutes = [{
    name: "内页1",
    zh_CN: "内页1",
    en_US: "home",
    path: "/page1",
    hide: true,
    component: Page1,
    icon: "HomeOutlined",
}, {
    name: "内页2",
    zh_CN: "内页2",
    en_US: "home",
    path: "/page2",
    hide: true,
    component: Page2,
    icon: "HomeOutlined",
}]


let defaultProps = {}

export default function Index(prop) {
    // Declare a new state variable, which we'll call "count"

    const {count1,count2, dispatchs} = mg()

    let props = {
        ...defaultProps, ...prop
    }

    const {} = props;


    useEffect(() => {
        // Update the document title using the browser API

        return () => {
        }
    }, []);

    return (
        <Router data={baseRoutes}>
            {count1}
            <button onClick={() => {
                dispatchs({
                    type: "ADD"
                })
            }}>加
            </button>
            <button onClick={() => {
                dispatchs({
                    type: "JIAN"
                })
            }}>减
            </button>
            <br/>
            {count2}
            <button onClick={() => {
                dispatchs({
                    type: "ADD2"
                })
            }}>加1
            </button>
            <button onClick={() => {
                dispatchs({
                    type: "JIAN2"
                })
            }}>减
            </button>
            <br/>
            <a href="/page1">内页1</a>
            <a href="/page2">内页2</a>
        </Router>
    );
}

/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState, useContext} from 'react';
import Home from "@page/home"
import Page1 from "@page/page1"
import Page2 from "@page/page2"
import Page3 from "@page/page3"
import Router, {history} from "@components/router"
import KeepRouter from "@components/router/keep"
import {mg} from "@components/context";


//本项目的模板页面

let baseRoutes = [{
    name: "主页",
    zh_CN: "主页",
    en_US: "home",
    path: "/",
    hide: true,
    component: Home,
    icon: "HomeOutlined"
}, {
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
},{
    name: "内页3",
    zh_CN: "内页1",
    en_US: "home",
    path: "/page5",
    redirect:"/page5/page3",
    hide: true,
    icon: "HomeOutlined",
    component: Page2,
    children: [{
        name: "内页3",
        zh_CN: "内页3",
        en_US: "home",
        path: "/page3",
        hide: true,
        component: Page3,
        icon: "HomeOutlined",
    }]
}]


let defaultProps = {}

export default function Index(prop) {
    // Declare a new state variable, which we'll call "count"


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
        <KeepRouter data={baseRoutes} onChange={(data)=>{
            console.log(11111,data)
        }}/>
        )
}

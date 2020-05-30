/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect , useState } from 'react';
import {mg} from "@components/context";
import {history} from "@components";
//本项目的模板页面

let baseRoutes = [{
    name: "主页",
    zh_CN: "主页",
    en_US: "home",
    path: "/",
    hide: true,
    component: "home",
    icon: "HomeOutlined",
}]



let defaultProps={}

export default function Index(prop) {
    // Declare a new state variable, which we'll call "count"
    const {count1} = mg()

    let props={
        ...defaultProps,...prop
    }

    useEffect(() => {
        // Update the document title using the browser API

        return ()=>{
        }
    },[]);



    const goTo = (url) => {
        history.push(url)
    }
    return (
        <div>
            {count1}
            内页3
            <a onClick={() => goTo("/page1")}>内页1</a>
            <a onClick={() => goTo("/page2")}>内页2</a>
            <a onClick={() => goTo("/page5/page3", {state: 11})}>内页3</a>
        </div>
    );
}

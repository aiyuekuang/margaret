/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect , useState } from 'react';
import {mg} from "@components/context";
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


    console.log(66)

    return (
        <div>
            {count1}
        </div>
    );
}

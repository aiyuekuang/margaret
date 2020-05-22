/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect , useState } from 'react';
//本项目的模板页面


let defaultProps={
    data:[]
}


export default function Index(prop) {

    let props={
        ...defaultProps,...prop
    }
    const {data} = props;

    useEffect(() => {
        return ()=>{
        }
    },[]);





    console.log(222,data)

    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
}

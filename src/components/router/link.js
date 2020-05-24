/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState} from 'react';
import {history} from "@components/router/index";
//本项目的模板页面


let defaultProps = {
    to: ""
}

export default function Index(prop) {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    let props = {
        ...defaultProps, ...prop
    }
    const {children, to} = props;

    useEffect(() => {
        // Update the document title using the browser API

        return () => {
        }
    }, []);

    const goTo = () => {
        history.push(to)
    }


    return (
        <Fragment>
            <a onClick={goTo}>{children}</a>
        </Fragment>
    );
}

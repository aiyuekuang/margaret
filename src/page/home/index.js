/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState, useContext} from 'react';
import Page1 from "@page/page1"
import Page2 from "@page/page2"
import Page3 from "@page/page3"
import Router, {history, Link} from "@components/router"
import {mg} from "@components/context";


let defaultProps = {}

export default function Index(prop) {
    // Declare a new state variable, which we'll call "count"

    const {count1, count2, dispatch, setKeepRouterData} = mg()

    let props = {
        ...defaultProps, ...prop
    }

    const {} = props;



    useEffect(() => {
        // Update the document title using the browser API

        return () => {
        }
    }, []);

    const goTo = (url) => {
        history.push(url)
    }


    return (
        <Fragment>
            {count1}
            <button onClick={() => {
                dispatch({
                    type: "ADD"
                })
            }}>加
            </button>
            <button onClick={() => {
                dispatch({
                    type: "JIAN"
                })
            }}>减
            </button>
            <br/>
            {count2}
            <button onClick={() => {
                dispatch({
                    type: "ADD2"
                })
            }}>加1
            </button>
            <button onClick={() => {
                dispatch({
                    type: "JIAN2"
                })
            }}>减
            </button>
            <br/>
            <Link to="/page5">link的去内页5</Link>
            <a onClick={() => goTo("/page1")}>内页1</a>
            <a onClick={() => goTo("/page2")}>内页2</a>
            <a onClick={() => goTo("/page5/page3", {state: 11})}>内页3</a>
        </Fragment>
    );
}

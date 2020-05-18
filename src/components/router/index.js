/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect , useState } from 'react';
//本项目的模板页面


let defaultProps={
    data:[]
}

export default function Index(prop) {
    // Declare a new state variable, which we'll call "count"
    const [View, setView] = useState(0);

    let props={
        ...defaultProps,...prop
    }
    const {data} = props;

    useEffect(() => {
        // Update the document title using the browser API

        return ()=>{
        }
    },[]);



    let onClickRegister = () => {
        setView('Register')
        window.history.pushState(null, '', '/register')
    }


    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
}

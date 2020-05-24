## margaret

​		Margaret is the next generation routing Library of react, which is based on community reflection react There are two modes in this database. The first is the route system without saving the route state, which is consistent with react router. The second is the route database which can keep the route state for a long time. React route library can be used to develop the route database which can be used to maintain the previously operated state after switching the page and when switching back again.
​    At the same time, we use react hook to build a data flow processing library, which is consistent with Redux, but more simplified
​    Margaret is a very light-weight library with few APIs. The data flow is developed based on the context feature of hook. The two routing modes switch seamlessly, and the user's project remains unchanged



## Installation and demo

#### Installation ：

```cmd
npm install margaret
or
yarn add margaret
```



#### Necessary configuration：

1. Provider must be configured at react entry

```jsx
import {MgProvider} from "margaret";
import * as reducer from "./reducer";

//reducer is a user-defined reducer file
<MgProvider reducer={reducer}>
     <App/>
</MgProvider>
```

2. Custom reducer file reducer.js Preparation of

```javascript
export const count1 = (state = 1, action={}) => {

    switch (action.type) {
        case "ADD":
            return state + 1;
        case "JIAN":
            return state - 1;
        default:
            return state;
    }
}

export const count2 = (state = 3, action={}) => {
 
    switch (action.type) {
        case "ADD2":
            return state + 2;
        case "JIAN2":
            return state - 2;
        default:
            return state;
    }
}
```



2. Writing router files

```jsx
let baseRoutes = [{
    name: "home",
    path: "/",
    hide: true,
    component: Home,
}, {
    name: "page1",
    path: "/page1",
    component: Page1,
}, {
    name: "page2",
    path: "/page2",
    component: Page2,
},{
    name: "page5",
    path: "/page5",
    redirect:"/page5/page3"
    children: [{
        name: "page3",
        path: "/page3",
        component: Page3,
    }]
}]

export default function Index(prop) {

    const {dispatch, mgRouter} = mg()

    return (
        <KeepRouter data={baseRoutes}/>
        )
}

```

4. Interface call

```jsx
import React, {Fragment, useEffect, useState, useContext} from 'react';
import Page1 from "@page/page1"
import Page2 from "@page/page2"
import Page3 from "@page/page3"
import {history, Link,mg,Router} from "margaret"
export default function Index(prop) {
    const {count1, count2,dispatch, setKeepRouterData} = mg()

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
            }}>add
            </button>
            <button onClick={() => {
                dispatch({
                    type: "JIAN"
                })
            }}>subtraction
            </button>
            <br/>
            {count2}
            <button onClick={() => {
                dispatch({
                    type: "ADD2"
                })
            }}>add1
            </button>
            <button onClick={() => {
                dispatch({
                    type: "JIAN2"
                })
            }}>subtraction2
            </button>
            <br/>
            <Link to="/page5">link to page 5</Link>
            <a onClick={() => goTo("/page1")}>page1</a>
            <a onClick={() => goTo("/page2")}>page2</a>
            <a onClick={() => goTo("/page5/page3", {state: 11})}>page3</a>
        </Fragment>
    );
}
```

It contains the use of data flow and routing. If you just want to use data flow, do not introduce router. Use mg to receive data and dispatch function in the required page. For details, please see：[URL](https://github.com/aiyuekuang/margaret/blob/master/doc/doc.md)

### License

margaret is MIT licensed.
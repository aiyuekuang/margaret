## margaret

​		margaret是react的下一代路由库，基于社区反映react 的router痛点进行了新的设计，本库有2种模式，第一种是不保存路由状态的路由系统，与react-router一致，第二种是能够持久保持路由状态的，react路由库，可用于开发在切换页面后，再次切换回来时，打开页面依然保持之前操作过的状态。

​		同时利用react hook打造了一款数据流处理库，用法与redux思路一致，但更为简化

​		margaret是一款极为轻量的库，api也极少，数据流是基于hook的context特性进行开发，2种路由方式无缝切换，用户的项目保持不变



## 用法

#### 安装：

```cmd
npm install margaret
or
yarn add margaret
```



#### 必要的配置：

1. 必须在react入口处配置Provider

```jsx
import {MgProvider} from "margaret";
import * as reducer from "./reducer";

//reducer就是用户自己定义的reducer文件
<MgProvider reducer={reducer}>
     <App/>
</MgProvider>
```

2. 自定义reducer文件reducer.js的编写

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



2. router文件的编写

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

4. 界面的调用

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

里面包含了数据流的使用以及路由的使用，如果只是想用数据流则不引入router即可，在需要用的页面中用mg接收数据及dispatch函数，详细文档请看：[地址](https://github.com/aiyuekuang/margaret/blob/master/doc/doc.md)

### License

margaret is MIT licensed.
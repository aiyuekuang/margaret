### 初始化

#### MgProvider

基于react hook的context，将其包裹在react的入口之上，即可将整个margaret引入项目。



#### mg

是整个margaret的属性集合，在其中可以拿到router的运行时数据（当前路由的数据，设置路由数据的action，reducer数据等），前提是必须在函数组件中使用





### 数据流管理

数据流管理是margaret的一大特色，整合了react hook的context。告别繁复的库设置，随用随引，引入库只需要在入口设置一下MgProvider，如下：

```javascript
import {MgProvider} from "margaret";
import * as reducer from "./reducer";

<MgProvider reducer={reducer}>
    <App/>
</MgProvider>
```

并且将您自己编写的reducer引入，就完成了库的完全引入工作，reducer.js的编写规范，如下：

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

调用与更新数据方式，具体方式类似redux的方式

```javascript
import React, {Fragment} from 'react';
import {mg} from "@components/context";

export default function Index(prop) {
    const {count1, count2,dispatch} = mg()

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
        </Fragment>
    );
}
```



### 路由

路由系统采用的是集中配置方式，在一个js中对margaret传入一个路由的json，将控制整个项目的路由走向

#### 1.普通路由

```javascript
import {Router} from "margaret"

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
        <Router data={baseRoutes}/>
        )
}
```

##### Router：

不保留路由状态的路由组件

##### data

树形嵌套结构的路由数据，路由对象的必要字段：

path：必填，路由地址

component：必填，对应的react组件

redirect：非必填，重定向的地址

children：非必填，子路由

用户如果对项目中其他地方需要用到路由数据，都可以对这个数据进行变更，增减非必填字段，或自定义字段

##### mgRouter

当前路由的路由路径的数组对象



#### 2.状态路由



```javascript
import {KeepRouter} from "margaret"

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

    const {dispatch, mgRouter,mgKeepRouter,setKeepRouterData} = mg()

    return (
        <KeepRouter data={baseRoutes}/>
        )
}
```
##### KeepRouter：

保留路由状态的路由组件

##### data

树形嵌套结构的路由数据，路由对象的必要字段：

path：必填，路由地址

component：必填，对应的react组件

redirect：非必填，重定向的地址

children：非必填，子路由

用户如果对项目中其他地方需要用到路由数据，都可以对这个数据进行变更，增减非必填字段，或自定义字段

##### mgRouter

当前路由的路由路径的数组对象

##### mgKeepRouter

经过处理的路由全量对象数组，对象数组中的mgRouterShow是保留字段，对路由有逻辑作用，不可变更，但这值为true时，是当前正在打开的页面，可以用来做业务上的处理

##### setKeepRouterData

主动设置全局路由对象数组的action函数，可以借用路由数组，开发业务之后，有变化，再告知margaret即可，用法如下：

```javascript
export default function Index(prop) {

    const {dispatch, mgRouter,mgKeepRouter,setKeepRouterData} = mg()

    //baseRoutes参照上面的代码
    return (
        <KeepRouter data={baseRoutes}/>
        )
}
```


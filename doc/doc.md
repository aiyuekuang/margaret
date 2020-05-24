### 初始化

#### MgProvider

基于react hook的context，将其包裹在react的入口之上，即可将整个margaret引入项目。



#### mg

是整个margaret的属性集合，在其中可以拿到router的运行时数据（当前路由的数据，设置路由数据的action，reducer数据等）





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


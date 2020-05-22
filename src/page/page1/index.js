/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState} from 'react';
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


let defaultProps = {}

export default function Index(prop) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  let props = {
    ...defaultProps, ...prop
  }
  const {} = props;

  useEffect(() => {
    // Update the document title using the browser API

    return () => {
    }
  }, []);


  console.log(22)

  return (
    <div>
      内页2
    </div>
  );
}

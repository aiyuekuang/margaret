/**
 * Created by zengtao on 2017/5/19.
 */
import React, {Fragment, useEffect, useState} from 'react';
import Router, {history, Link} from "@components/router";
//本项目的模板页面


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


  const goTo = (url) => {
    history.push(url)
  }

  return (
    <div>
      内页1
        <input type="text"/>
        <Link to="/page2">link的去内页2</Link>
      <a onClick={() => goTo("/page1")}>内页1</a>
      <a onClick={() => goTo("/page2")}>内页2</a>
      <a onClick={() => goTo("/page5/page3", {state: 11})}>内页3</a>
    </div>
  );
}

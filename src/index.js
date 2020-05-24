import ReactDOM from 'react-dom';
import React from 'react';
import App from './page/router'
import "./style/lib.scss"
import "../mock"
import {MgProvider} from "@components/context";
import * as reducer from "./reducer";

ReactDOM.render(
    <MgProvider reducer={reducer}>
        <App/>
    </MgProvider>
    ,
    document.getElementById('root')
);

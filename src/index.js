import ReactDOM from 'react-dom';
import React from 'react';
import App from './page/router'
import "./style/lib.scss"
import "../mock"
import {AppProvider} from "@components/context";
import * as reducer from "./reducer";

ReactDOM.render(
    <AppProvider reducer={reducer}>
        <App/>
    </AppProvider>
    ,
    document.getElementById('root')
);

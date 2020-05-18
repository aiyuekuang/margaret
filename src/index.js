import ReactDOM from 'react-dom';
import React from 'react';
import App from './page/home'
import "./style/lib.scss"
import "../mock"
import {AppProvider} from "@components/context";

ReactDOM.render(
    <AppProvider>
        <App/>
    </AppProvider>
    ,
    document.getElementById('root')
);

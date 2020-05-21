import React, {createContext, useReducer, useContext} from "react";
import {bindReducer, rootReducer} from "@components/context/reducer";

const AppContext = createContext();

const { Provider,Consumer } = AppContext;



export function AppProvider(props) {
    const { children } = props;
    const globalState = {};
    const allReducer = [];
    let store;

    for (let i in bindReducer){
        store = useReducer(bindReducer[i], bindReducer[i]())

        globalState[i] = store[0]
        allReducer.push(store[1])
    }

    // 这里可以创建一个 global dispatch function 和 global state
    const dispatchs = action => {
        return allReducer.forEach(fn => fn(action));
    }



    return (
        <Provider value={{dispatchs,...globalState }}>
            {children}
        </Provider>
    );
}

export const mg = ()=>useContext(AppContext); // 把addAction映射进来


export default AppContext;
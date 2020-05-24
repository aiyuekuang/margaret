import React, {createContext, useReducer, useContext} from "react";
import * as reducerRouter from "../reducer";

const AppContext = createContext();

const { Provider,Consumer } = AppContext;
export const mg = ()=>useContext(AppContext); // 把addAction映射进来



export function MgProvider(props) {
    const { children,reducer } = props;
    const rootReducer = {...reducerRouter,...reducer}
    const globalState = {};
    const allReducer = [];
    let store;

    for (let i in rootReducer){
        store = useReducer(rootReducer[i], rootReducer[i]())

        globalState[i] = store[0]
        allReducer.push(store[1])
    }

    // 这里可以创建一个 global dispatch function 和 global state
    const dispatch = action => {
        return allReducer.forEach(fn => fn(action));
    }

    const setKeepRouterData=(data)=>{
        dispatch({
            type: "MGSETKEEPROUTER",
            data: data
        })
    }

    return (
        <Provider value={{dispatch,...globalState,...{setKeepRouterData} }}>
            {children}
        </Provider>
    );
}




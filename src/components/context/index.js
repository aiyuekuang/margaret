import React, {createContext, useReducer, useContext} from "react";
import {bindReducer, rootReducer} from "@components/context/reducer";

const AppContext = createContext();

const { Provider,Consumer } = AppContext;



export function AppProvider(props) {
    const { children } = props;
    const [state, dispatch] = useReducer(rootReducer, bindReducer);

    console.log(2323,bindReducer)
    return (
        <Provider value={{ state, dispatch}}>
            {children}
        </Provider>
    );
}

export const mg = ()=>useContext(AppContext); // 把addAction映射进来


export default AppContext;
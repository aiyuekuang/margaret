import React, {createContext, useReducer, useContext} from "react";
import rootReducer from "./reducer";

const AppContext = createContext();

const { Provider,Consumer } = AppContext;



export function AppProvider(props) {
    const { children } = props;
    const [state, dispatch] = useReducer(rootReducer, 1);

    return (
        <Provider value={{ state, dispatch}}>
            {children}
        </Provider>
    );
}

export const mg = ()=>useContext(AppContext); // 把addAction映射进来


export default AppContext;
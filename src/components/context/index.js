import React, {createContext, useReducer, useContext} from "react";

const AppContext = createContext();

const { Provider,Consumer } = AppContext;
export const mg = ()=>useContext(AppContext); // 把addAction映射进来



export function AppProvider(props) {
    const { children,reducer } = props;
    const globalState = {};
    const allReducer = [];
    let store;

    for (let i in reducer){
        store = useReducer(reducer[i], reducer[i]())

        globalState[i] = store[0]
        allReducer.push(store[1])
    }

    // 这里可以创建一个 global dispatch function 和 global state
    const dispatch = action => {
        return allReducer.forEach(fn => fn(action));
    }

    return (
        <Provider value={{dispatch,...globalState,Consumer }}>
            {children}
        </Provider>
    );
}



export default AppContext;
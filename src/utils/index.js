export function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (state, action) => a(b(state, action), action))
}

export const combindReducer = (reducer) => {
    let obj = {};
    for (let i in reducer) {
        obj[i] = reducer[i]();
    }
    return obj;
}

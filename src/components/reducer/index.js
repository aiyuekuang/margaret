export const mgRouter = (state = [], action={}) => {
    switch (action.type) {
        case "MGSETROUTER":
            return action.data
        default:
            return state;
    }
}


export const mgKeepRouter = (state = [], action={}) => {
    switch (action.type) {
        case "MGSETKEEPROUTER":
            return action.data
        default:
            return state;
    }
}




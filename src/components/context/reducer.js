export const count1 = (state, action) => {
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "JIAN":
            return state - 1;
        default:
            return state;
    }
}

export const count2 = (state, action) => {
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "JIAN":
            return state - 1;
        default:
            return state;
    }
}


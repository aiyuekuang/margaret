import {compose} from "../utils";

const count1 = (state, action) => {
    console.log(77,state,action)
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "JIAN":
            return state - 1;
        default:
            return state;
    }
}

const count2 = (state, action) => {
    console.log(88,state,action)
    switch (action.type) {
        case "ADD2":
            return state + 1;
        case "JIAN2":
            return state - 1;
        default:
            return state;
    }
}

const rootReducer = compose(count1,count2)

export default rootReducer;
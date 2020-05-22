import {combindReducer, compose} from "@utils";

export const mgRouter = (state = [], action={}) => {
    switch (action.type) {
        case "MGSETROUTER":
            return action.data
        default:
            return state;
    }
}






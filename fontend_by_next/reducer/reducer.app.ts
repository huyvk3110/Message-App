import { UPDATE_USER_DATA, SET_LOGGER } from "../define/define.redux.key";
import { IStoreApp } from "../define/define.interface";

let appStore: IStoreApp = {
    user: {
        id: "",
        name: "",
        email: "",
    }
}

export default function appReducer(state = appStore, action: { type: string, payload: any }) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_USER_DATA:
            return Object.assign({}, state, { user: payload })
        case SET_LOGGER:
            return Object.assign({}, state, { logged: payload })
        default:
            return state;
    }
}
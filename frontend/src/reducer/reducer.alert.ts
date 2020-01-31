import { SHOW_ALERT, HIDE_ALERT } from "../define/define.redux.key";
import { IStoreAlert } from "../define/define.interface";

let alertState: IStoreAlert = {
    innerContent: '',
    variant: 'primary',
    show: false,
    dismissible: false
}

export default function alertReducer(state = alertState, action: { type: string, payload: any }) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_ALERT:
            return Object.assign({}, state, payload, { show: true });
        case HIDE_ALERT:
            return Object.assign({}, state, { show: false });
        default:
            return state;
    }
}
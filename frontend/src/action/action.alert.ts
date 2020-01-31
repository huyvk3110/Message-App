import { SHOW_ALERT, HIDE_ALERT } from "../define/define.redux.key";
import { IStoreAlert } from "../define/define.interface";

export function showAlert(data: IStoreAlert) {
    return {
        type: SHOW_ALERT,
        payload: data,
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}
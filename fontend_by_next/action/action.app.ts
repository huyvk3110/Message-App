import { UPDATE_USER_DATA, SET_LOGGER } from "../define/define.redux.key";

export function updateUserData(data: any) {
    return {
        type: UPDATE_USER_DATA,
        payload: data,
    }
}
import { createStore, combineReducers } from "redux";
import alertReducer from "./reducer/reducer.alert";
import appReducer from "./reducer/reducer.app";

const store = createStore(combineReducers({
    alert: alertReducer,
    app: appReducer,
}))

// store.subscribe(() => { console.log('Store:', store.getState()) });

export default store;
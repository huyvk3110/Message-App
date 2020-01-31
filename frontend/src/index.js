import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom";
import React from "react";
import App from "./app";

const view = <Provider store={store}>
    <App />
</Provider>

ReactDOM.render(view, document.getElementById('root'));
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./views/views.login";
import Chat from "./views/views.chat";

class App extends Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact={true}>
                        <Login />
                    </Route>
                    <Route path="/t">
                        <Chat />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
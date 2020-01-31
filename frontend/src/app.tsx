import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./views/views.login";
import Chat from "./views/views.chat";
import Alert from "./components/components.alert";
import { IStoreApp } from "./define/define.interface";

interface IProps {
    app: IStoreApp
}

class App extends Component<IProps> {
    constructor(props: any) {
        super(props)
    }

    render() {
        const { logged } = this.props.app;
        return (
            <Router>
                <Alert />
                <Switch>
                    <Route path="/" exact={true}>
                        <Login />
                    </Route>
                    <Route path="/t">
                        <Chat />
                    </Route>
                </Switch>
                {!logged ? <Redirect to="/" /> : undefined}
            </Router>
        )
    }
}

const mapStateToProps = (state: any) => ({
    app: state.app
})

export default connect(mapStateToProps)(App);
import React, { Component } from "react";
import Login from "./views/views.login";
import Chat from "./views/views.chat";

class App extends Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <Chat />
                {/* <Login /> */}
            </div>
        )
    }
}

export default App;
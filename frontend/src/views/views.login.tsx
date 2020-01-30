import React, { Component } from "react";

class Login extends Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
                <form className="form-signin text-center">
                    <i className="fa fa-heart logo"></i>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control input-square-bottom" placeholder="Email adress" required autoFocus/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control input-square-bottom input-square-top" placeholder="Password" required/>
                    <label htmlFor="inputComfirmPassword" className="sr-only">Password</label>
                    <input type="password" id="inputComfirmPassword" className="form-control input-square-top" placeholder="Confirm password"/>
                    <button type="submit" className="btn btn-primary btn-block mt-3">Sign in</button>
                </form>
            </div>
        )
    }
}

export default Login;
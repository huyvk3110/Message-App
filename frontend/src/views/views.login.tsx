import React, { Component } from "react";

enum LOGIN_TYPE {
    SIGNIN = 1,
    SIGNUP = 2,
}

interface IProps {

}

interface IStates {
    loginType: LOGIN_TYPE
}

class Login extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            loginType: LOGIN_TYPE.SIGNIN,
        }

        this.onClickTabSignIn = this.onClickTabSignIn.bind(this);
        this.onClickTabSignUp = this.onClickTabSignUp.bind(this);
    }

    onClickTabSignIn() {
        if (this.state.loginType !== LOGIN_TYPE.SIGNIN)
            this.setState({ loginType: LOGIN_TYPE.SIGNIN });
    }

    onClickTabSignUp() {
        if (this.state.loginType !== LOGIN_TYPE.SIGNUP)
            this.setState({ loginType: LOGIN_TYPE.SIGNUP });
    }

    render() {
        const { loginType } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
                <form className="form-signin text-center">
                    <i className="fa fa-heart logo"></i>
                    <h1 className="h3 mb-3 font-weight-normal">Message</h1>
                    <div className="btn-group btn-group-lg w-100" role="group" aria-label="Basic example">
                        <a onClick={this.onClickTabSignIn} className={`btn input-square-bottom font-weight-light ${loginType === LOGIN_TYPE.SIGNIN ? "btn-primary text-white" : "btn-white text-secondary"}`}>Sign in</a>
                        <a onClick={this.onClickTabSignUp} className={`btn input-square-bottom font-weight-light ${loginType === LOGIN_TYPE.SIGNUP ? "btn-primary text-white" : "btn-white text-secondary"}`}>Sign up</a>
                    </div>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control input-square-bottom input-square-top" placeholder="Email adress" required autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className={`form-control input-square-top ${loginType === LOGIN_TYPE.SIGNUP ? "input-square-bottom" : ""}`} placeholder="Password" required />
                    {loginType === LOGIN_TYPE.SIGNUP && <label htmlFor="inputComfirmPassword" className="sr-only">Confirm Password</label>}
                    {loginType === LOGIN_TYPE.SIGNUP && <input type="password" id="inputComfirmPassword" className="form-control input-square-top" placeholder="Confirm password" />}
                    <button type="submit" className="btn btn-primary btn-block mt-3">{loginType === LOGIN_TYPE.SIGNIN ? "Sign in" : "Sign up"}</button>
                    <button type="button" className="btn btn-danger btn-block mt-1"><i className="fa fa-google-plus" style={{ fontSize: '20px' }}></i>  Google</button>
                </form>
            </div>
        )
    }
}

export default Login;
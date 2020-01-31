import React, { Component, SyntheticEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../api";
import { connect } from "react-redux";
import { showAlert } from "../action/action.alert";
import { setLogged, updateUserData } from "../action/action.app";
import { IStoreApp } from "../define/define.interface";

enum LOGIN_TYPE {
    SIGNIN = 1,
    SIGNUP = 2,
}

interface IProps {
    app: IStoreApp
    showAlert: typeof showAlert
    setLogged: typeof setLogged
    updateUserData: typeof updateUserData
}

interface IStates {
    loginType: LOGIN_TYPE,
    email: string,
    password: string,
    passwordConfirm: string,
}

class Login extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            loginType: LOGIN_TYPE.SIGNIN,
            email: '',
            password: '',
            passwordConfirm: '',
        }

        this.loginSuccessHandle = this.loginSuccessHandle.bind(this);
        this.loginFailureHandle = this.loginFailureHandle.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onClickTabSignIn = this.onClickTabSignIn.bind(this);
        this.onClickTabSignUp = this.onClickTabSignUp.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onClickLoginGoogle = this.onClickLoginGoogle.bind(this);
    }

    componentWillMount() {
        API.loginToken()
            .then(this.loginSuccessHandle)
            .catch(this.loginFailureHandle);
    }

    loginSuccessHandle(data: any) {
        this.props.updateUserData(data);
        this.props.setLogged(true);
    }

    loginFailureHandle() {
        this.props.updateUserData({
            id: '',
            name: '',
            email: '',
        });
        this.props.setLogged(false);
    }

    onChangeEmail(event: any) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event: any) {
        this.setState({ password: event.target.value });
    }

    onChangeConfirmPassword(event: any) {
        this.setState({ passwordConfirm: event.target.value });
    }

    onClickTabSignIn() {
        if (this.state.loginType !== LOGIN_TYPE.SIGNIN)
            this.setState({ loginType: LOGIN_TYPE.SIGNIN });
    }

    onClickTabSignUp() {
        if (this.state.loginType !== LOGIN_TYPE.SIGNUP)
            this.setState({ loginType: LOGIN_TYPE.SIGNUP });
    }

    onClickSubmit() {
        const { loginType, email, password, passwordConfirm } = this.state;
        if (loginType === LOGIN_TYPE.SIGNIN && (!email || !password) ||
            loginType === LOGIN_TYPE.SIGNUP && (!email || !password || !passwordConfirm)) return;

        if (loginType === LOGIN_TYPE.SIGNIN) {
            API.login(email, password)
                .then(this.loginSuccessHandle)
                .catch(this.loginFailureHandle)
        } else if (loginType === LOGIN_TYPE.SIGNUP && password === passwordConfirm) {
            API.register(email, password)
                .then(data => {
                    if (data.data.status === 'success') this.setState({ loginType: LOGIN_TYPE.SIGNIN })
                })
        }
    }

    onClickLoginGoogle() {
        API.loginToken()
            .then(data => { console.log(data); })
            .catch(error => { console.log(error) });
    }

    render() {
        const { loginType } = this.state;
        const { app } = this.props;

        const view = app.logged ? <Redirect to="/t" /> : < div className="d-flex justify-content-center align-items-center vw-100 vh-100" >
            <form className="form-signin text-center" onSubmit={(event) => { event.preventDefault() }}>
                <i className="fa fa-paper-plane logo"></i>
                <h1 className="h3 mb-3 font-weight-normal">Message</h1>
                <div className="btn-group btn-group-lg w-100" role="group" aria-label="Basic example">
                    <a onClick={this.onClickTabSignIn} className={`btn input-square-bottom font-weight-light ${loginType === LOGIN_TYPE.SIGNIN ? "btn-primary text-white" : "btn-white text-secondary"}`}>Sign in</a>
                    <a onClick={this.onClickTabSignUp} className={`btn input-square-bottom font-weight-light ${loginType === LOGIN_TYPE.SIGNUP ? "btn-primary text-white" : "btn-white text-secondary"}`}>Sign up</a>
                </div>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control input-square-bottom input-square-top" onChange={this.onChangeEmail} placeholder="Email adress" required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className={`form-control input-square-top ${loginType === LOGIN_TYPE.SIGNUP ? "input-square-bottom" : ""}`} onChange={this.onChangePassword} placeholder="Password" required />
                {loginType === LOGIN_TYPE.SIGNUP && <label htmlFor="inputComfirmPassword" className="sr-only">Confirm Password</label>}
                {loginType === LOGIN_TYPE.SIGNUP && <input type="password" id="inputComfirmPassword" className="form-control input-square-top" onChange={this.onChangeConfirmPassword} placeholder="Confirm password" required={loginType === LOGIN_TYPE.SIGNUP} />}
                <button type="submit" className="btn btn-primary btn-block mt-3" onClick={this.onClickSubmit}>{loginType === LOGIN_TYPE.SIGNIN ? "Sign in" : "Sign up"}</button>
                <button type="button" className="btn btn-danger btn-block mt-1" onClick={this.onClickLoginGoogle}><i className="fa fa-google-plus" style={{ fontSize: '20px' }}></i>  Google</button>
            </form>
        </div >

        return (view)
    }
}

const mapStateToProps = (state: any) => ({
    app: state.app
})

const mapDispatchToProps = {
    showAlert, setLogged, updateUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
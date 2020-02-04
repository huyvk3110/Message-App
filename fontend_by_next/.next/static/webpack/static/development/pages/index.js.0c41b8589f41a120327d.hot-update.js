webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api */ "./api.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _action_action_alert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../action/action.alert */ "./action/action.alert.ts");
/* harmony import */ var _action_action_app__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../action/action.app */ "./action/action.app.ts");






var _jsxFileName = "/Users/vankhachuy/Work/Project/message_v2/pages/index.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement;





var LOGIN_TYPE;

(function (LOGIN_TYPE) {
  LOGIN_TYPE[LOGIN_TYPE["SIGNIN"] = 1] = "SIGNIN";
  LOGIN_TYPE[LOGIN_TYPE["SIGNUP"] = 2] = "SIGNUP";
})(LOGIN_TYPE || (LOGIN_TYPE = {}));

var Login =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Login, _Component);

  function Login(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Login);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Login).call(this, props));
    _this.state = {
      loginType: LOGIN_TYPE.SIGNIN,
      email: '',
      password: '',
      passwordConfirm: ''
    };
    _this.loginSuccessHandle = _this.loginSuccessHandle.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.loginFailureHandle = _this.loginFailureHandle.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChangeEmail = _this.onChangeEmail.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChangePassword = _this.onChangePassword.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onChangeConfirmPassword = _this.onChangeConfirmPassword.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onClickTabSignIn = _this.onClickTabSignIn.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onClickTabSignUp = _this.onClickTabSignUp.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onClickSubmit = _this.onClickSubmit.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.onClickLoginGoogle = _this.onClickLoginGoogle.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Login, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      _api__WEBPACK_IMPORTED_MODULE_7__["default"].loginToken().then(this.loginSuccessHandle)["catch"](this.loginFailureHandle);
    }
  }, {
    key: "loginSuccessHandle",
    value: function loginSuccessHandle(data) {
      this.props.updateUserData(data);
    }
  }, {
    key: "loginFailureHandle",
    value: function loginFailureHandle() {
      this.props.updateUserData({
        id: '',
        name: '',
        email: ''
      });
    }
  }, {
    key: "onChangeEmail",
    value: function onChangeEmail(event) {
      this.setState({
        email: event.target.value
      });
    }
  }, {
    key: "onChangePassword",
    value: function onChangePassword(event) {
      this.setState({
        password: event.target.value
      });
    }
  }, {
    key: "onChangeConfirmPassword",
    value: function onChangeConfirmPassword(event) {
      this.setState({
        passwordConfirm: event.target.value
      });
    }
  }, {
    key: "onClickTabSignIn",
    value: function onClickTabSignIn() {
      if (this.state.loginType !== LOGIN_TYPE.SIGNIN) this.setState({
        loginType: LOGIN_TYPE.SIGNIN
      });
    }
  }, {
    key: "onClickTabSignUp",
    value: function onClickTabSignUp() {
      if (this.state.loginType !== LOGIN_TYPE.SIGNUP) this.setState({
        loginType: LOGIN_TYPE.SIGNUP
      });
    }
  }, {
    key: "onClickSubmit",
    value: function onClickSubmit() {
      var _this2 = this;

      var _this$state = this.state,
          loginType = _this$state.loginType,
          email = _this$state.email,
          password = _this$state.password,
          passwordConfirm = _this$state.passwordConfirm;
      if (loginType === LOGIN_TYPE.SIGNIN && (!email || !password) || loginType === LOGIN_TYPE.SIGNUP && (!email || !password || !passwordConfirm)) return;

      if (loginType === LOGIN_TYPE.SIGNIN) {
        _api__WEBPACK_IMPORTED_MODULE_7__["default"].login(email, password).then(this.loginSuccessHandle)["catch"](this.loginFailureHandle);
      } else if (loginType === LOGIN_TYPE.SIGNUP && password === passwordConfirm) {
        _api__WEBPACK_IMPORTED_MODULE_7__["default"].register(email, password).then(function (data) {
          if (data.data.status === 'success') _this2.setState({
            loginType: LOGIN_TYPE.SIGNIN
          });
        });
      }
    }
  }, {
    key: "onClickLoginGoogle",
    value: function onClickLoginGoogle() {
      _api__WEBPACK_IMPORTED_MODULE_7__["default"].getAccount().then(function (data) {
        return console.log(data);
      }); // API.logout().then(data=>console.log(data))
    }
  }, {
    key: "render",
    value: function render() {
      var loginType = this.state.loginType;
      return __jsx("div", {
        className: "d-flex justify-content-center align-items-center vw-100 vh-100",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, __jsx("form", {
        className: "form-signin text-center",
        onSubmit: function onSubmit(event) {
          event.preventDefault();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, __jsx("i", {
        className: "fa fa-paper-plane logo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }), __jsx("h1", {
        className: "h3 mb-3 font-weight-normal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, "Message"), __jsx("div", {
        className: "btn-group btn-group-lg w-100",
        role: "group",
        "aria-label": "Basic example",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, __jsx("a", {
        onClick: this.onClickTabSignIn,
        className: "btn input-square-bottom font-weight-light ".concat(loginType === LOGIN_TYPE.SIGNIN ? "btn-primary text-white" : "btn-white text-secondary"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, "Sign in"), __jsx("a", {
        onClick: this.onClickTabSignUp,
        className: "btn input-square-bottom font-weight-light ".concat(loginType === LOGIN_TYPE.SIGNUP ? "btn-primary text-white" : "btn-white text-secondary"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, "Sign up")), __jsx("label", {
        htmlFor: "inputEmail",
        className: "sr-only",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, "Email address"), __jsx("input", {
        type: "email",
        id: "inputEmail",
        className: "form-control input-square-bottom input-square-top",
        onChange: this.onChangeEmail,
        placeholder: "Email adress",
        required: true,
        autoFocus: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }), __jsx("label", {
        htmlFor: "inputPassword",
        className: "sr-only",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, "Password"), __jsx("input", {
        type: "password",
        id: "inputPassword",
        className: "form-control input-square-top ".concat(loginType === LOGIN_TYPE.SIGNUP ? "input-square-bottom" : ""),
        onChange: this.onChangePassword,
        placeholder: "Password",
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }), loginType === LOGIN_TYPE.SIGNUP && __jsx("label", {
        htmlFor: "inputComfirmPassword",
        className: "sr-only",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, "Confirm Password"), loginType === LOGIN_TYPE.SIGNUP && __jsx("input", {
        type: "password",
        id: "inputComfirmPassword",
        className: "form-control input-square-top",
        onChange: this.onChangeConfirmPassword,
        placeholder: "Confirm password",
        required: loginType === LOGIN_TYPE.SIGNUP,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }), __jsx("button", {
        type: "submit",
        className: "btn btn-primary btn-block mt-3",
        onClick: this.onClickSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      }, loginType === LOGIN_TYPE.SIGNIN ? "Sign in" : "Sign up"), __jsx("button", {
        type: "button",
        className: "btn btn-danger btn-block mt-1",
        onClick: this.onClickLoginGoogle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      }, __jsx("i", {
        className: "fa fa-google-plus",
        style: {
          fontSize: '20px'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      }), "  Google")));
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    app: state.app
  };
};

var mapDispatchToProps = {
  showAlert: _action_action_alert__WEBPACK_IMPORTED_MODULE_9__["showAlert"],
  updateUserData: _action_action_app__WEBPACK_IMPORTED_MODULE_10__["updateUserData"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(Login));

/***/ })

})
//# sourceMappingURL=index.js.0c41b8589f41a120327d.hot-update.js.map
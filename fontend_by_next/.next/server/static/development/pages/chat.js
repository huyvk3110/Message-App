module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api.ts":
/*!****************!*\
  !*** ./api.ts ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return API; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const HOST = 'http://127.0.0.1:3001';
class API {
  static login(email, password) {
    return new Promise((res, rej) => {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${HOST}/api/auth/login`, {
        username: email,
        password
      }, {
        headers: API.headers
      }).then(response => {
        const {
          status,
          authenticate,
          data
        } = response.data;
        console.log(response);

        if (status === 'success') {
          localStorage.setItem('token', authenticate);
          API.headers = Object.assign({}, API.headers, {
            'Authorization': `Bearer ${authenticate}`
          });
          res(data);
        }
      }).catch(error => console.log('error', error));
    });
  }

  static loginToken() {
    return new Promise((res, rej) => {
      const token = localStorage.getItem('token');
      if (!token) return rej();
      API.headers = Object.assign({}, API.headers, {
        'Authorization': `Bearer ${token}`
      });
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${HOST}/api/auth/login-jwt`, {}, {
        headers: API.headers
      }).then(response => {
        const {
          status,
          authenticate,
          data
        } = response.data;

        if (status === 'success') {
          res(data);
        }
      }).catch(error => rej(error));
    });
  }

  static register(email, password) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${HOST}/api/account`, {
      email,
      password
    }, {
      headers: API.headers
    });
  }

  static logout() {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${HOST}/api/auth/logout`);
  }

  static getAccount() {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${HOST}/api/account`, {
      headers: API.headers
    });
  }

}

_defineProperty(API, "headers", {
  'Content-Type': 'application/json'
});

/***/ }),

/***/ "./pages/chat.tsx":
/*!************************!*\
  !*** ./pages/chat.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api */ "./api.ts");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "socket.io-client");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/vankhachuy/Work/Project/message_v2/pages/chat.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class Chat extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default()('http://127.0.0.1:3001/');
    socket.on('USER_ONLINE', function (data) {
      console.log('Socket', data);
    });
    socket.on('MESSAGE', function (data) {
      console.log('Socket', 'Message', data);
    });
    socket.on('CHATROOM_LIST', function (data) {
      console.log('Socket', data);
    });
  }

  render() {
    const {
      app
    } = this.props;
    return __jsx("div", {
      className: "chat container-fluid",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, __jsx("div", {
      className: "row vh-100",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, __jsx("div", {
      className: "col-sm-5 col-md-3 chat-left py-1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: this
    }, __jsx("div", {
      className: "chat-left-info",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, __jsx("div", {
      className: "chat-top-info px-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, __jsx("div", {
      className: "d-flex align-items-center",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, __jsx("button", {
      className: "btn avatar circle-40 color-gray mr-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    })), __jsx("span", {
      className: "font-weight-bolder",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      },
      __self: this
    }, app.user.name)), __jsx("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      },
      __self: this
    }, __jsx("button", {
      className: "btn circle-40 color-gray mr-1",
      onClick: () => {
        _api__WEBPACK_IMPORTED_MODULE_1__["default"].logout();
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-pencil-square-o",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    })), __jsx("button", {
      className: "btn circle-40 color-gray",
      onClick: () => {
        _api__WEBPACK_IMPORTED_MODULE_1__["default"].getAccount().then(data => console.log(data));
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-pencil-square-o",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      },
      __self: this
    })))), __jsx("div", {
      className: "input-group mb-1 search-bar px-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }, __jsx("div", {
      className: "input-group-prepend",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }, __jsx("span", {
      className: "input-group-text font-weight-light",
      id: "basic-addon1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-search",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }))), __jsx("input", {
      type: "text",
      className: "form-control font-weight-light",
      placeholder: "Search",
      "aria-label": "Search",
      "aria-describedby": "basic-addon1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      },
      __self: this
    }))), __jsx("div", {
      className: "chat-left-list",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }, __jsx("a", {
      className: "d-flex chatroom-item item-active align-items-center p-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, __jsx("div", {
      className: "avatar circle-50 color-gray",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: this
    })), __jsx("div", {
      className: "d-flex flex-column pl-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71
      },
      __self: this
    }, __jsx("span", {
      className: "font-weight-normal chatroom-item-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      },
      __self: this
    }, "huyvk"), __jsx("span", {
      className: "font-weight-light text-black-50 chatroom-item-info",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73
      },
      __self: this
    }, "Lorem ipsum dolor sit amet consectetur"))), __jsx("a", {
      className: "d-flex chatroom-item align-items-center p-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      },
      __self: this
    }, __jsx("div", {
      className: "avatar circle-50 color-gray",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      },
      __self: this
    })), __jsx("div", {
      className: "d-flex flex-column pl-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80
      },
      __self: this
    }, __jsx("span", {
      className: "font-weight-normal chatroom-item-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81
      },
      __self: this
    }, "huyvk"), __jsx("span", {
      className: "font-weight-light text-black-50 chatroom-item-info",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82
      },
      __self: this
    }, "Lorem ipsum dolor sit amet consectetur"))))), __jsx("div", {
      className: "col-sm-7 col-md-9 chat-right py-1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    }, __jsx("div", {
      className: "chat-top-info px-3",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88
      },
      __self: this
    }, __jsx("div", {
      className: "d-flex align-items-center",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    }, __jsx("button", {
      className: "btn avatar circle-40 color-gray mr-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91
      },
      __self: this
    })), __jsx("div", {
      className: "d-flex flex-column",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93
      },
      __self: this
    }, __jsx("span", {
      className: "font-weight-bolder",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94
      },
      __self: this
    }, "huyvk3110"), __jsx("span", {
      className: "font-weight-light text-success",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 95
      },
      __self: this
    }, "online")))), __jsx("div", {
      className: "chat-right-content px-4 py-1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
      },
      __self: this
    }, __jsx("div", {
      className: "message-item message-friend",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, __jsx("div", {
      className: "btn avatar circle-40 color-gray mr-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102
      },
      __self: this
    })), __jsx("div", {
      className: "message-list",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }, __jsx("div", {
      className: "message",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105
      },
      __self: this
    }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illo maxime voluptas, dolore rerum facere? Et, molestiae! Optio, earum minus aut aliquid iste eum iusto inventore nemo est natus rem?"), __jsx("div", {
      className: "message",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108
      },
      __self: this
    }, "Lorem ipsum dolor sit amet consectetur adipisicing elit."))), __jsx("div", {
      className: "message-item message-me",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 113
      },
      __self: this
    }, __jsx("div", {
      className: "btn avatar circle-40 color-gray mr-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114
      },
      __self: this
    }, __jsx("i", {
      className: "fa fa-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 115
      },
      __self: this
    })), __jsx("div", {
      className: "message-list",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 117
      },
      __self: this
    }, __jsx("div", {
      className: "message",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118
      },
      __self: this
    }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illo maxime voluptas, dolore rerum facere? Et, molestiae! Optio, earum minus aut aliquid iste eum iusto inventore nemo est natus rem?"), __jsx("div", {
      className: "message",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121
      },
      __self: this
    }, "Lorem ipsum dolor sit amet consectetur adipisicing elit.")))), __jsx("div", {
      className: "chat-right-input mx-1 d-flex justify-content-between",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 127
      },
      __self: this
    }, __jsx("div", {
      className: "input-group mb-3",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128
      },
      __self: this
    }, __jsx("input", {
      type: "text",
      className: "form-control chat-right-input font-weight-light",
      placeholder: "Text message",
      "aria-label": "Text message",
      "aria-describedby": "button-addon2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 129
      },
      __self: this
    }), __jsx("div", {
      className: "input-group-append",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130
      },
      __self: this
    }, __jsx("button", {
      className: "btn btn-primary",
      type: "button",
      id: "button-addon2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131
      },
      __self: this
    }, "Send")))))));
  }

}

_defineProperty(Chat, "defaultProps", {
  app: {
    user: {
      id: '',
      name: '',
      email: ''
    }
  }
});

const mapStateToProps = state => ({
  app: state.app
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, null)(Chat));

/***/ }),

/***/ 5:
/*!******************************!*\
  !*** multi ./pages/chat.tsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/vankhachuy/Work/Project/message_v2/pages/chat.tsx */"./pages/chat.tsx");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ })

/******/ });
//# sourceMappingURL=chat.js.map
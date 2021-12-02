/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/App.js":
/*!************************!*\
  !*** ./src/app/App.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _vendor_relast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vendor/relast */ \"./src/vendor/relast.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n // const session = require('./components/session/index').Session;\n// const login = require('./components/login/index').Login;\n// const main = require('./view/templates/default/index').Default;\n// // NAVIGATION\n// const Dashboard = require('./content/dashboard/index').Dashboard;\n// const Products = require('./content/products_manager/stock').Products;\n// const Sales = require('./content/products_manager/index').Sales_Invoice;\n// const Users = require('./content/users_manager/index').Users;\n// // NAVIGATION\n\nvar App = /*#__PURE__*/function (_Rapp) {\n  _inherits(App, _Rapp);\n\n  var _super = _createSuper(App);\n\n  function App(args) {\n    var _this;\n\n    _classCallCheck(this, App);\n\n    _this = _super.call(this, args, _assertThisInitialized(_this)); // this.add_comp('Session', session, {props:{response: 'session_response'}});\n    // this.add_comp('Login', login, {css: 'components/login/main.css', props: {response: 'session_response', Session:'Session'}});\n    // this.add_comp('Template', main, {css: 'view/templates/default/main.css', props:{Session:'Session'}});\n    // this.set_nav('/dashboard', { name: 'Dashboard', title: 'Dashboard', mod: Dashboard });\n    // this.set_nav('/products', { name: 'Products', title: 'Stock Management', mod: Products });\n    // this.set_nav('/sales', { name: 'Sales', title: 'Sales and Invoicing', mod: Sales });\n    // this.set_nav('/users', { name: 'Users', title: 'Users Management', mod: Users });\n\n    _defineProperty(_assertThisInitialized(_this), \"run\", function (props) {// // THIS METHOD RUN WHEN THE RENDER FINISH\n      // this.render({\n      //     dom: 'loading',\n      //     bbox: 'main-loader'\n      // });\n      // this.render({\n      //     dom: 'no_logged',\n      //     bbox: 'main-content'\n      // });\n      // // this.get_comp('Session').call_action('check_session');\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"states\", function (props) {// this.state('logged', false);\n      // this.state('loaded', false);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"actions\", function (props) {// this.action('session_response', (args)=>\n      // {\n      //     this.reset('main-loader');\n      //     if(args)\n      //     {\n      //         this.render({\n      //             dom: 'logged',\n      //             bbox: 'main-content'\n      //         });\n      //     }\n      //     this.state('loaded', true);\n      //     this.state('logged', args);\n      // });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"draw\", function (props) {// this.dom('loading', ()=>\n      // {\n      //     return (\n      //         `<div class='loading-lbox'>\n      //             <div>\n      //                 <img src='./assets/preloaders/points.gif' />\n      //                 <p>Loading...</p>\n      //             </div>\n      //         </div>`\n      //     );\n      // });\n      // this.dom('no_logged', ()=>\n      // {\n      //     return (`<section id='Login'></section>`);\n      // });\n      // this.dom('logged', ()=>\n      // {\n      //     return (`<section id='Template'></section>`);\n      // });\n      // this._dom.main = () =>\n      // {\n      //     return (\n      //         `<section>\n      //             <div id='Session'></div>\n      //             <div id='main-content' class='main-content'></div>\n      //             <div id='main-loader'></div>\n      //         </section>`\n      //     );\n      // }\n      // this._dom.style =`\n      //     @font-face {\n      //         font-family: 'aaarghnormal';\n      //         src: url('assets/fonts/aaargh-webfont.woff2') format('woff2'),\n      //             url('assets/fonts/aaargh-webfont.woff') format('woff');\n      //         font-weight: normal;\n      //         font-style: normal;\n      //     }\n      //     @font-face {\n      //         font-family: 'abelregular';\n      //         src: url('assets/fonts/abel-regular-webfont.woff2') format('woff2'),\n      //             url('assets/fonts/abel-regular-webfont.woff') format('woff');\n      //         font-weight: normal;\n      //         font-style: normal;\n      //     }\n      //     button{font-size: 20px;}`;\n    });\n\n    return _this;\n  }\n\n  return App;\n}(_vendor_relast__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n//# sourceURL=webpack://cti_ecom/./src/app/App.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/App.js */ \"./src/app/App.js\");\n\n\nwindow.onload = function () {\n  new _app_App_js__WEBPACK_IMPORTED_MODULE_0__.default({\n    name: 'Main',\n    bbox: document.getElementById('root'),\n    electron: elec\n  }).start().render().title('CTI Ecom');\n};\n\n//# sourceURL=webpack://cti_ecom/./src/main.js?");

/***/ }),

/***/ "./src/vendor/relast.js":
/*!******************************!*\
  !*** ./src/vendor/relast.js ***!
  \******************************/
/***/ (() => {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\src\\\\vendor\\\\relast.js: Unexpected token (18:24)\\n\\n\\u001b[0m \\u001b[90m 16 |\\u001b[39m \\t_dom \\u001b[33m=\\u001b[39m {}\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 17 |\\u001b[39m \\t_effects \\u001b[33m=\\u001b[39m []\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 18 |\\u001b[39m \\t_wrappers \\u001b[33m=\\u001b[39m { indexers \\u001b[33m=\\u001b[39m {}\\u001b[33m,\\u001b[39m ids \\u001b[33m=\\u001b[39m {} }\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    |\\u001b[39m \\t                       \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 19 |\\u001b[39m \\t_nav \\u001b[33m=\\u001b[39m {}\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 20 |\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 21 |\\u001b[39m \\t_ran \\u001b[33m=\\u001b[39m \\u001b[36mfalse\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n    at Parser._raise (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:798:17)\\n    at Parser.raiseWithData (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:791:17)\\n    at Parser.raise (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:752:17)\\n    at Parser.unexpected (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3257:16)\\n    at Parser.checkExpressionErrors (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3350:12)\\n    at Parser.parseMaybeAssign (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10846:12)\\n    at C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10776:39\\n    at Parser.allowInAnd (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12589:16)\\n    at Parser.parseMaybeAssignAllowIn (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10776:17)\\n    at Parser.parseInitializer (C:\\\\wamp64\\\\www\\\\CTI\\\\cti_cluster3\\\\web\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13859:46)\");\n\n//# sourceURL=webpack://cti_ecom/./src/vendor/relast.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
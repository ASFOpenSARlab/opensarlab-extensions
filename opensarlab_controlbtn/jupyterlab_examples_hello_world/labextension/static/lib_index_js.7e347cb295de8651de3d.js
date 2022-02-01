"use strict";
(self["webpackChunk_jupyterlab_examples_hello_world"] = self["webpackChunk_jupyterlab_examples_hello_world"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jupyterlab_topbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jupyterlab-topbar */ "webpack/sharing/consume/default/jupyterlab-topbar/jupyterlab-topbar");
/* harmony import */ var jupyterlab_topbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jupyterlab_topbar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);


const plugin = {
    id: 'opensarlab-topbar-serverbtn',
    autoStart: true,
    requires: [jupyterlab_topbar__WEBPACK_IMPORTED_MODULE_0__.ITopBar],
    activate: (app, topBar) => {
        const serverBtn = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton({
            className: 'hub-server-button',
            label: 'Hub Control Panel',
            onClick: () => {
                window.location.href = "/hub/home";
            },
            tooltip: 'A place to stop the server and logout',
        });
        topBar.addItem('server-btn', serverBtn);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.7e347cb295de8651de3d.js.map
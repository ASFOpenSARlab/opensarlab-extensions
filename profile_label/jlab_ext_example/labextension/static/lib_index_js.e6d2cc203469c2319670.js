"use strict";
(self["webpackChunk_jupyterlab_examples_server_extension"] = self["webpackChunk_jupyterlab_examples_server_extension"] || []).push([["lib_index_js"],{

/***/ "./lib/handler.js":
/*!************************!*\
  !*** ./lib/handler.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "requestAPI": () => (/* binding */ requestAPI)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
async function requestAPI(endPoint = '', init = {}) {
    // Make request to Jupyter API
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
    const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, 'jlab-ext-example', endPoint);
    let response;
    try {
        response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.NetworkError(error);
    }
    const data = await response.json();
    if (!response.ok) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, data.message);
    }
    return data;
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ link_extension),
/* harmony export */   "extension": () => (/* binding */ extension)
/* harmony export */ });
/* harmony import */ var jupyterlab_topbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jupyterlab-topbar */ "webpack/sharing/consume/default/jupyterlab-topbar/jupyterlab-topbar");
/* harmony import */ var jupyterlab_topbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jupyterlab_topbar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handler */ "./lib/handler.js");






/**
 * The command IDs used by the server extension plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.get = 'server:get-file';
})(CommandIDs || (CommandIDs = {}));
/**
 * Initialization data for the server-extension-example extension.
 */
const extension = {
    id: 'server-extension-example',
    autoStart: true,
    optional: [_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__.ILauncher],
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.ICommandPalette],
    activate: async (app, palette, launcher) => {
        console.log('JupyterLab extension server-extension-example is activated!');
        // GET request
        try {
            const data = await (0,_handler__WEBPACK_IMPORTED_MODULE_5__.requestAPI)('hello');
            console.log(data);
        }
        catch (reason) {
            console.error(`Error on GET /jlab-ext-example/hello.\n${reason}`);
        }
        // POST request
        const dataToSend = { name: 'George' };
        try {
            const reply = await (0,_handler__WEBPACK_IMPORTED_MODULE_5__.requestAPI)('hello', {
                body: JSON.stringify(dataToSend),
                method: 'POST',
            });
            console.log(reply);
        }
        catch (reason) {
            console.error(`Error on POST /jlab-ext-example/hello ${dataToSend}.\n${reason}`);
        }
        const { commands, shell } = app;
        const command = CommandIDs.get;
        const category = 'Extension Examples';
        commands.addCommand(command, {
            label: 'Get Server Content in a IFrame Widget',
            caption: 'Get Server Content in a IFrame Widget',
            execute: () => {
                const widget = new IFrameWidget();
                shell.add(widget, 'main');
            },
        });
        palette.addItem({ command, category: category });
        if (launcher) {
            // Add launcher
            launcher.add({
                command: command,
                category: category,
            });
        }
    },
};
// export default extension;
class IFrameWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.IFrame {
    constructor() {
        super();
        const baseUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_3__.PageConfig.getBaseUrl();
        this.url = baseUrl + 'jlab-ext-example/public/index.html';
        this.id = 'doc-example';
        this.title.label = 'Server Doc';
        this.title.closable = true;
        this.node.style.overflowY = 'auto';
    }
}
class DocsAnchorWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget {
    constructor() {
        super();
        this.hyperlink = document.createElement('a');
        this.hyperlink.text = 'OpenSARlab Docs';
        this.hyperlink.href =
            'https://opensarlab-docs.asf.alaska.edu/user-guides/how_to_run_a_notebook/';
        this.hyperlink.target = 'blank';
        this.addClass('docs-anchor-widget');
        this.node.appendChild(this.hyperlink);
    }
}
const link_extension = {
    id: 'jupyterlab-topbar-doclink',
    autoStart: true,
    requires: [jupyterlab_topbar__WEBPACK_IMPORTED_MODULE_0__.ITopBar],
    activate: (app, topBar) => {
        const docLinkWidget = new DocsAnchorWidget();
        topBar.addItem('doc_link', docLinkWidget);
    },
};



/***/ })

}]);
//# sourceMappingURL=lib_index_js.e6d2cc203469c2319670.js.map
"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/campaignDetails",{

/***/ "./pages/campaignDetails.js":
/*!**********************************!*\
  !*** ./pages/campaignDetails.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__) {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getServserSideProps\": function() { return /* binding */ getServserSideProps; }\n/* harmony export */ });\n/* harmony import */ var C_Users_eugen_Documents_GitHub_CrowdCoin_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var C_Users_eugen_Documents_GitHub_CrowdCoin_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_eugen_Documents_GitHub_CrowdCoin_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _images_dollar_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/dollar.png */ \"./images/dollar.png\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _ethereum_campaign__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ethereum/campaign */ \"./ethereum/campaign.js\");\n/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-icons/fi */ \"./node_modules/react-icons/fi/index.esm.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ethereum_campaign__WEBPACK_IMPORTED_MODULE_7__]);\n_ethereum_campaign__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nvar _s = $RefreshSig$();\nfunction getServserSideProps(context) {\n    return _getServserSideProps.apply(this, arguments);\n}\nfunction _getServserSideProps() {\n    _getServserSideProps = _asyncToGenerator(C_Users_eugen_Documents_GitHub_CrowdCoin_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(context) {\n        var campaignInstance, summary;\n        return C_Users_eugen_Documents_GitHub_CrowdCoin_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n            while(1)switch(_ctx.prev = _ctx.next){\n                case 0:\n                    campaignInstance = (0,_ethereum_campaign__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(context.query.id);\n                    _ctx.next = 3;\n                    return campaignInstance.methods.getCampaignSummary().call();\n                case 3:\n                    summary = _ctx.sent;\n                    console.log(\"SUMMARY\", context);\n                    return _ctx.abrupt(\"return\", {\n                        props: {\n                            summary: summary\n                        }\n                    });\n                case 6:\n                case \"end\":\n                    return _ctx.stop();\n            }\n        }, _callee);\n    }));\n    return _getServserSideProps.apply(this, arguments);\n}\nfunction CampaignDetails() {\n    _s();\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    var id = router.query.id;\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"title\", {\n                        children: \"CrowdCoin\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                        lineNumber: 28,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"initial-scale=1.0, width=device-width\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                        lineNumber: 29,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"flex justify-center border-b-2 bg-slate-800\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                        className: \"px-3\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {\n                            src: _images_dollar_png__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n                            alt: \"Logo\",\n                            width: 70,\n                            height: 70\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h1\", {\n                        className: \"text-3xl text-center text-white py-4\",\n                        children: \"CrowdCoin\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                        lineNumber: 35,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"container mx-auto px-4 pb-12\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                        className: \"flex justify-start mt-6 mb-5 ml-4 mr-4\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"a\", {\n                            href: \"/\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"button\", {\n                                className: \"flex justify-start bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_icons_fi__WEBPACK_IMPORTED_MODULE_8__.FiChevronLeft, {\n                                        size: \"1.5em\",\n                                        className: \"mr-1\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                                        lineNumber: 42,\n                                        columnNumber: 15\n                                    }, this),\n                                    \" \",\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"span\", {\n                                        children: \"Back\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                                        lineNumber: 43,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                                lineNumber: 41,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                            lineNumber: 40,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                        lineNumber: 39,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                        className: \"mt-12\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h1\", {\n                            className: \"text-xl mb-0 ml-4 truncate\",\n                            children: [\n                                \"Campaign ID:\",\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"span\", {\n                                    className: \"font-bold\",\n                                    children: id\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                                    lineNumber: 51,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                            lineNumber: 49,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                        lineNumber: 48,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n                lineNumber: 38,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\eugen\\\\Documents\\\\GitHub\\\\CrowdCoin\\\\pages\\\\campaignDetails.js\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this));\n}\n_s(CampaignDetails, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = CampaignDetails;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CampaignDetails);\nvar _c;\n$RefreshReg$(_c, \"CampaignDetails\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9jYW1wYWlnbkRldGFpbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNaO0FBQ1c7QUFDQTtBQUNUO0FBQ2E7QUFDRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUV2QyxTQUFlUSxtQkFBbUIsQ0FBQ0MsT0FBTztXQUEzQkQsb0JBQW1COztTQUFuQkEsb0JBQW1CO0lBQW5CQSxvQkFBbUIseUtBQWxDLFFBQVEsU0FBMkJDLE9BQU8sRUFBRSxDQUFDO1lBQzVDQyxnQkFBZ0IsRUFDaEJDLE9BQU87Ozs7b0JBRFBELGdCQUFnQixHQUFHSiw4REFBUSxDQUFDRyxPQUFPLENBQUNHLEtBQUssQ0FBQ0MsRUFBRTs7MkJBQzVCSCxnQkFBZ0IsQ0FBQ0ksT0FBTyxDQUFDQyxrQkFBa0IsR0FBR0MsSUFBSTs7b0JBQWxFTCxPQUFPO29CQUNiTSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFTLFVBQUVULE9BQU87aURBRXZCLENBQUM7d0JBQ05VLEtBQUssRUFBRSxDQUFDOzRCQUFDUixPQUFPLEVBQVBBLE9BQU87d0JBQUMsQ0FBQztvQkFDcEIsQ0FBQzs7Ozs7O0lBQ0gsQ0FBQztXQVJxQkgsb0JBQW1COztTQVVoQ1ksZUFBZSxHQUFHLENBQUM7O0lBQzFCLEdBQUssQ0FBQ0MsTUFBTSxHQUFHbEIsc0RBQVM7SUFDeEIsR0FBSyxDQUNNVSxFQUFFLEdBQ1RRLE1BQU0sQ0FEUlQsS0FBSyxDQUFJQyxFQUFFO0lBR2IsTUFBTSw2RUFDSFMsQ0FBRzs7d0ZBQ0RwQixrREFBSTs7Z0dBQ0ZxQixDQUFLO2tDQUFDLENBQVM7Ozs7OztnR0FDZkMsQ0FBSTt3QkFBQ0MsSUFBSSxFQUFDLENBQVU7d0JBQUNDLE9BQU8sRUFBQyxDQUF1Qzs7Ozs7Ozs7Ozs7O3dGQUV0RUosQ0FBRztnQkFBQ0ssU0FBUyxFQUFDLENBQTZDOztnR0FDekRMLENBQUc7d0JBQUNLLFNBQVMsRUFBQyxDQUFNOzhHQUNsQnRCLG1EQUFLOzRCQUFDdUIsR0FBRyxFQUFFeEIsMERBQUk7NEJBQUV5QixHQUFHLEVBQUMsQ0FBTTs0QkFBQ0MsS0FBSyxFQUFFLEVBQUU7NEJBQUVDLE1BQU0sRUFBRSxFQUFFOzs7Ozs7Ozs7OztnR0FFbkRDLENBQUU7d0JBQUNMLFNBQVMsRUFBQyxDQUFzQztrQ0FBQyxDQUFTOzs7Ozs7Ozs7Ozs7d0ZBRy9ETCxDQUFHO2dCQUFDSyxTQUFTLEVBQUMsQ0FBOEI7O2dHQUMxQ0wsQ0FBRzt3QkFBQ0ssU0FBUyxFQUFDLENBQXdDOzhHQUNwRE0sQ0FBQzs0QkFBQ0MsSUFBSSxFQUFDLENBQUc7a0hBQ1JDLENBQU07Z0NBQUNSLFNBQVMsRUFBQyxDQUF5Rjs7Z0hBQ3hHcEIseURBQWE7d0NBQUM2QixJQUFJLEVBQUUsQ0FBTzt3Q0FBRVQsU0FBUyxFQUFDLENBQU07Ozs7OztvQ0FBSSxDQUFHO2dIQUNwRFUsQ0FBSTtrREFBQyxDQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dHQUtmZixDQUFHO3dCQUFDSyxTQUFTLEVBQUMsQ0FBTzs4R0FDbkJLLENBQUU7NEJBQUNMLFNBQVMsRUFBQyxDQUE0Qjs7Z0NBQUMsQ0FFekM7NEdBQUNVLENBQUk7b0NBQUNWLFNBQVMsRUFBQyxDQUFXOzhDQUFFZCxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU0zQyxDQUFDO0dBdENRTyxlQUFlOztRQUNQakIsa0RBQVM7OztLQURqQmlCLGVBQWU7QUF3Q3hCLCtEQUFlQSxlQUFlLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvY2FtcGFpZ25EZXRhaWxzLmpzP2JlMDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5pbXBvcnQgTG9nbyBmcm9tIFwiLi4vaW1hZ2VzL2RvbGxhci5wbmdcIjtcclxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCBDYW1wYWlnbiBmcm9tIFwiLi4vZXRoZXJldW0vY2FtcGFpZ25cIjtcclxuaW1wb3J0IHsgRmlDaGV2cm9uTGVmdCB9IGZyb20gXCJyZWFjdC1pY29ucy9maVwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZzZXJTaWRlUHJvcHMoY29udGV4dCkge1xyXG4gIGNvbnN0IGNhbXBhaWduSW5zdGFuY2UgPSBDYW1wYWlnbihjb250ZXh0LnF1ZXJ5LmlkKTtcclxuICBjb25zdCBzdW1tYXJ5ID0gYXdhaXQgY2FtcGFpZ25JbnN0YW5jZS5tZXRob2RzLmdldENhbXBhaWduU3VtbWFyeSgpLmNhbGwoKTtcclxuICBjb25zb2xlLmxvZyhcIlNVTU1BUllcIiwgY29udGV4dCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwcm9wczogeyBzdW1tYXJ5IH0sXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ2FtcGFpZ25EZXRhaWxzKCkge1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IHtcclxuICAgIHF1ZXJ5OiB7IGlkIH0sXHJcbiAgfSA9IHJvdXRlcjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxIZWFkPlxyXG4gICAgICAgIDx0aXRsZT5Dcm93ZENvaW48L3RpdGxlPlxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJpbml0aWFsLXNjYWxlPTEuMCwgd2lkdGg9ZGV2aWNlLXdpZHRoXCIgLz5cclxuICAgICAgPC9IZWFkPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgYm9yZGVyLWItMiBiZy1zbGF0ZS04MDBcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTNcIj5cclxuICAgICAgICAgIDxJbWFnZSBzcmM9e0xvZ299IGFsdD1cIkxvZ29cIiB3aWR0aD17NzB9IGhlaWdodD17NzB9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIHRleHQtY2VudGVyIHRleHQtd2hpdGUgcHktNFwiPkNyb3dkQ29pbjwvaDE+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBweC00IHBiLTEyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktc3RhcnQgbXQtNiBtYi01IG1sLTQgbXItNFwiPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIi9cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktc3RhcnQgYmctYmx1ZS01MDAgaG92ZXI6YmctYmx1ZS03MDAgdGV4dC13aGl0ZSBweS0yIHB4LTYgcm91bmRlZCBzaGFkb3ctbWRcIj5cclxuICAgICAgICAgICAgICA8RmlDaGV2cm9uTGVmdCBzaXplPXtcIjEuNWVtXCJ9IGNsYXNzTmFtZT1cIm1yLTFcIiAvPntcIiBcIn1cclxuICAgICAgICAgICAgICA8c3Bhbj5CYWNrPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMlwiPlxyXG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgbWItMCBtbC00IHRydW5jYXRlXCI+XHJcbiAgICAgICAgICAgIENhbXBhaWduIElEOlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj57aWR9PC9zcGFuPlxyXG4gICAgICAgICAgPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW1wYWlnbkRldGFpbHM7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsIkhlYWQiLCJ1c2VSb3V0ZXIiLCJMb2dvIiwiSW1hZ2UiLCJDYW1wYWlnbiIsIkZpQ2hldnJvbkxlZnQiLCJnZXRTZXJ2c2VyU2lkZVByb3BzIiwiY29udGV4dCIsImNhbXBhaWduSW5zdGFuY2UiLCJzdW1tYXJ5IiwicXVlcnkiLCJpZCIsIm1ldGhvZHMiLCJnZXRDYW1wYWlnblN1bW1hcnkiLCJjYWxsIiwiY29uc29sZSIsImxvZyIsInByb3BzIiwiQ2FtcGFpZ25EZXRhaWxzIiwicm91dGVyIiwiZGl2IiwidGl0bGUiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJjbGFzc05hbWUiLCJzcmMiLCJhbHQiLCJ3aWR0aCIsImhlaWdodCIsImgxIiwiYSIsImhyZWYiLCJidXR0b24iLCJzaXplIiwic3BhbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/campaignDetails.js\n");

/***/ })

});
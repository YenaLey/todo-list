"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./components/Logo.tsx":
/*!*****************************!*\
  !*** ./components/Logo.tsx ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nconst Logo = ()=>{\n    _s();\n    const navigate = useNavigate();\n    const [logoSrc, setLogoSrc] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"/images/logo_large.png\");\n    const handleLogo = ()=>{\n        navigate(\"/todos\");\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)({\n        \"Logo.useEffect\": ()=>{\n            const updateLogo = {\n                \"Logo.useEffect.updateLogo\": ()=>{\n                    if (window.innerWidth <= 450) {\n                        setLogoSrc(\"/images/logo_small.png\");\n                    } else {\n                        setLogoSrc(\"/images/logo_large.png\");\n                    }\n                }\n            }[\"Logo.useEffect.updateLogo\"];\n            updateLogo();\n            window.addEventListener(\"resize\", updateLogo);\n            return ({\n                \"Logo.useEffect\": ()=>{\n                    window.removeEventListener(\"resize\", updateLogo);\n                }\n            })[\"Logo.useEffect\"];\n        }\n    }[\"Logo.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        src: logoSrc,\n        alt: \"logo\",\n        width: 100,\n        height: 40,\n        priority: true,\n        onClick: handleLogo\n    }, void 0, false, {\n        fileName: \"/Users/leeyena/web-project/todo-list/components/Logo.tsx\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Logo, \"7mPdtr9aucwFTqV34cIjbKw6WNE=\", true);\n_c = Logo;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);\nvar _c;\n$RefreshReg$(_c, \"Logo\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvTG9nby50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUUrQjtBQUNhO0FBRzVDLE1BQU1HLE9BQU87O0lBQ1gsTUFBTUMsV0FBV0M7SUFDakIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdMLCtDQUFRQSxDQUFDO0lBRXZDLE1BQU1NLGFBQWE7UUFDakJKLFNBQVM7SUFDWDtJQUVBSCxnREFBU0E7MEJBQUM7WUFDUixNQUFNUTs2Q0FBYTtvQkFDakIsSUFBSUMsT0FBT0MsVUFBVSxJQUFJLEtBQUs7d0JBQzVCSixXQUFXO29CQUNiLE9BQU87d0JBQ0xBLFdBQVc7b0JBQ2I7Z0JBQ0Y7O1lBRUFFO1lBRUFDLE9BQU9FLGdCQUFnQixDQUFDLFVBQVVIO1lBRWxDO2tDQUFPO29CQUNMQyxPQUFPRyxtQkFBbUIsQ0FBQyxVQUFVSjtnQkFDdkM7O1FBQ0Y7eUJBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDVCxrREFBS0E7UUFDSmMsS0FBS1I7UUFDTFMsS0FBSTtRQUNKQyxPQUFPO1FBQ1BDLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxTQUFTWDs7Ozs7O0FBR2Y7R0FwQ01MO0tBQUFBO0FBc0NOLGlFQUFlQSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvbGVleWVuYS93ZWItcHJvamVjdC90b2RvLWxpc3QvY29tcG9uZW50cy9Mb2dvLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5cbmNvbnN0IExvZ28gPSAoKSA9PiB7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgW2xvZ29TcmMsIHNldExvZ29TcmNdID0gdXNlU3RhdGUoXCIvaW1hZ2VzL2xvZ29fbGFyZ2UucG5nXCIpO1xuXG4gIGNvbnN0IGhhbmRsZUxvZ28gPSAoKSA9PiB7XG4gICAgbmF2aWdhdGUoXCIvdG9kb3NcIik7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1cGRhdGVMb2dvID0gKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDQ1MCkge1xuICAgICAgICBzZXRMb2dvU3JjKFwiL2ltYWdlcy9sb2dvX3NtYWxsLnBuZ1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldExvZ29TcmMoXCIvaW1hZ2VzL2xvZ29fbGFyZ2UucG5nXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB1cGRhdGVMb2dvKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVMb2dvKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVMb2dvKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8SW1hZ2VcbiAgICAgIHNyYz17bG9nb1NyY31cbiAgICAgIGFsdD1cImxvZ29cIlxuICAgICAgd2lkdGg9ezEwMH1cbiAgICAgIGhlaWdodD17NDB9XG4gICAgICBwcmlvcml0eVxuICAgICAgb25DbGljaz17aGFuZGxlTG9nb31cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nbztcbiJdLCJuYW1lcyI6WyJJbWFnZSIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTG9nbyIsIm5hdmlnYXRlIiwidXNlTmF2aWdhdGUiLCJsb2dvU3JjIiwic2V0TG9nb1NyYyIsImhhbmRsZUxvZ28iLCJ1cGRhdGVMb2dvIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJwcmlvcml0eSIsIm9uQ2xpY2siXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/Logo.tsx\n"));

/***/ })

});
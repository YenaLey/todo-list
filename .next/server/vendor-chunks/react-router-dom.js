"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-router-dom";
exports.ids = ["vendor-chunks/react-router-dom"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-router-dom/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-router-dom/dist/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * react-router-dom v7.0.2\n *\n * Copyright (c) Remix Software Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.md file in the root directory of this source tree.\n *\n * @license MIT\n */\n\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __export = (target, all) => {\n  for (var name in all)\n    __defProp(target, name, { get: all[name], enumerable: true });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from))\n      if (!__hasOwnProp.call(to, key) && key !== except)\n        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n  }\n  return to;\n};\nvar __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, \"default\"), secondTarget && __copyProps(secondTarget, mod, \"default\"));\nvar __toCommonJS = (mod) => __copyProps(__defProp({}, \"__esModule\", { value: true }), mod);\n\n// index.ts\nvar react_router_dom_exports = {};\n__export(react_router_dom_exports, {\n  HydratedRouter: () => import_dom.HydratedRouter,\n  RouterProvider: () => import_dom.RouterProvider\n});\nmodule.exports = __toCommonJS(react_router_dom_exports);\nvar import_dom = __webpack_require__(/*! react-router/dom */ \"(ssr)/./node_modules/react-router/dist/development/dom-export.js\");\n__reExport(react_router_dom_exports, __webpack_require__(/*! react-router */ \"(ssr)/./node_modules/react-router/dist/development/index.js\"), module.exports);\n// Annotate the CommonJS export names for ESM import in node:\n0 && (0);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0NBQWtDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsNEZBQTRGO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGtCQUFrQixhQUFhOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMsMEZBQWtCO0FBQzNDLHFDQUFxQyxtQkFBTyxDQUFDLGlGQUFjO0FBQzNEO0FBQ0EsTUFBTSxDQUlMIiwic291cmNlcyI6WyIvVXNlcnMvbGVleWVuYS93ZWItcHJvamVjdC90b2RvLWxpc3Qvbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZGlzdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHJlYWN0LXJvdXRlci1kb20gdjcuMC4yXG4gKlxuICogQ29weXJpZ2h0IChjKSBSZW1peCBTb2Z0d2FyZSBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLm1kIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX19yZUV4cG9ydCA9ICh0YXJnZXQsIG1vZCwgc2Vjb25kVGFyZ2V0KSA9PiAoX19jb3B5UHJvcHModGFyZ2V0LCBtb2QsIFwiZGVmYXVsdFwiKSwgc2Vjb25kVGFyZ2V0ICYmIF9fY29weVByb3BzKHNlY29uZFRhcmdldCwgbW9kLCBcImRlZmF1bHRcIikpO1xudmFyIF9fdG9Db21tb25KUyA9IChtb2QpID0+IF9fY29weVByb3BzKF9fZGVmUHJvcCh7fSwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSksIG1vZCk7XG5cbi8vIGluZGV4LnRzXG52YXIgcmVhY3Rfcm91dGVyX2RvbV9leHBvcnRzID0ge307XG5fX2V4cG9ydChyZWFjdF9yb3V0ZXJfZG9tX2V4cG9ydHMsIHtcbiAgSHlkcmF0ZWRSb3V0ZXI6ICgpID0+IGltcG9ydF9kb20uSHlkcmF0ZWRSb3V0ZXIsXG4gIFJvdXRlclByb3ZpZGVyOiAoKSA9PiBpbXBvcnRfZG9tLlJvdXRlclByb3ZpZGVyXG59KTtcbm1vZHVsZS5leHBvcnRzID0gX190b0NvbW1vbkpTKHJlYWN0X3JvdXRlcl9kb21fZXhwb3J0cyk7XG52YXIgaW1wb3J0X2RvbSA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXIvZG9tXCIpO1xuX19yZUV4cG9ydChyZWFjdF9yb3V0ZXJfZG9tX2V4cG9ydHMsIHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIiksIG1vZHVsZS5leHBvcnRzKTtcbi8vIEFubm90YXRlIHRoZSBDb21tb25KUyBleHBvcnQgbmFtZXMgZm9yIEVTTSBpbXBvcnQgaW4gbm9kZTpcbjAgJiYgKG1vZHVsZS5leHBvcnRzID0ge1xuICBIeWRyYXRlZFJvdXRlcixcbiAgUm91dGVyUHJvdmlkZXIsXG4gIC4uLnJlcXVpcmUoXCJyZWFjdC1yb3V0ZXJcIilcbn0pO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-router-dom/dist/index.js\n");

/***/ })

};
;
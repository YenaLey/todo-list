"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/cookie";
exports.ids = ["vendor-chunks/cookie"];
exports.modules = {

/***/ "(ssr)/./node_modules/cookie/dist/index.js":
/*!*******************************************!*\
  !*** ./node_modules/cookie/dist/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.parse = parse;\nexports.serialize = serialize;\n/**\n * RegExp to match cookie-name in RFC 6265 sec 4.1.1\n * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2\n * which has been replaced by the token definition in RFC 7230 appendix B.\n *\n * cookie-name       = token\n * token             = 1*tchar\n * tchar             = \"!\" / \"#\" / \"$\" / \"%\" / \"&\" / \"'\" /\n *                     \"*\" / \"+\" / \"-\" / \".\" / \"^\" / \"_\" /\n *                     \"`\" / \"|\" / \"~\" / DIGIT / ALPHA\n *\n * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191\n * Allow same range as cookie value, except `=`, which delimits end of name.\n */\nconst cookieNameRegExp = /^[\\u0021-\\u003A\\u003C\\u003E-\\u007E]+$/;\n/**\n * RegExp to match cookie-value in RFC 6265 sec 4.1.1\n *\n * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )\n * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E\n *                     ; US-ASCII characters excluding CTLs,\n *                     ; whitespace DQUOTE, comma, semicolon,\n *                     ; and backslash\n *\n * Allowing more characters: https://github.com/jshttp/cookie/issues/191\n * Comma, backslash, and DQUOTE are not part of the parsing algorithm.\n */\nconst cookieValueRegExp = /^[\\u0021-\\u003A\\u003C-\\u007E]*$/;\n/**\n * RegExp to match domain-value in RFC 6265 sec 4.1.1\n *\n * domain-value      = <subdomain>\n *                     ; defined in [RFC1034], Section 3.5, as\n *                     ; enhanced by [RFC1123], Section 2.1\n * <subdomain>       = <label> | <subdomain> \".\" <label>\n * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]\n *                     Labels must be 63 characters or less.\n *                     'let-dig' not 'letter' in the first char, per RFC1123\n * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>\n * <let-dig-hyp>     = <let-dig> | \"-\"\n * <let-dig>         = <letter> | <digit>\n * <letter>          = any one of the 52 alphabetic characters A through Z in\n *                     upper case and a through z in lower case\n * <digit>           = any one of the ten digits 0 through 9\n *\n * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173\n *\n * > (Note that a leading %x2E (\".\"), if present, is ignored even though that\n * character is not permitted, but a trailing %x2E (\".\"), if present, will\n * cause the user agent to ignore the attribute.)\n */\nconst domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;\n/**\n * RegExp to match path-value in RFC 6265 sec 4.1.1\n *\n * path-value        = <any CHAR except CTLs or \";\">\n * CHAR              = %x01-7F\n *                     ; defined in RFC 5234 appendix B.1\n */\nconst pathValueRegExp = /^[\\u0020-\\u003A\\u003D-\\u007E]*$/;\nconst __toString = Object.prototype.toString;\nconst NullObject = /* @__PURE__ */ (() => {\n    const C = function () { };\n    C.prototype = Object.create(null);\n    return C;\n})();\n/**\n * Parse a cookie header.\n *\n * Parse the given cookie header string into an object\n * The object has the various cookies as keys(names) => values\n */\nfunction parse(str, options) {\n    const obj = new NullObject();\n    const len = str.length;\n    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.\n    if (len < 2)\n        return obj;\n    const dec = options?.decode || decode;\n    let index = 0;\n    do {\n        const eqIdx = str.indexOf(\"=\", index);\n        if (eqIdx === -1)\n            break; // No more cookie pairs.\n        const colonIdx = str.indexOf(\";\", index);\n        const endIdx = colonIdx === -1 ? len : colonIdx;\n        if (eqIdx > endIdx) {\n            // backtrack on prior semicolon\n            index = str.lastIndexOf(\";\", eqIdx - 1) + 1;\n            continue;\n        }\n        const keyStartIdx = startIndex(str, index, eqIdx);\n        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);\n        const key = str.slice(keyStartIdx, keyEndIdx);\n        // only assign once\n        if (obj[key] === undefined) {\n            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);\n            let valEndIdx = endIndex(str, endIdx, valStartIdx);\n            const value = dec(str.slice(valStartIdx, valEndIdx));\n            obj[key] = value;\n        }\n        index = endIdx + 1;\n    } while (index < len);\n    return obj;\n}\nfunction startIndex(str, index, max) {\n    do {\n        const code = str.charCodeAt(index);\n        if (code !== 0x20 /*   */ && code !== 0x09 /* \\t */)\n            return index;\n    } while (++index < max);\n    return max;\n}\nfunction endIndex(str, index, min) {\n    while (index > min) {\n        const code = str.charCodeAt(--index);\n        if (code !== 0x20 /*   */ && code !== 0x09 /* \\t */)\n            return index + 1;\n    }\n    return min;\n}\n/**\n * Serialize data into a cookie header.\n *\n * Serialize a name value pair into a cookie string suitable for\n * http headers. An optional options object specifies cookie parameters.\n *\n * serialize('foo', 'bar', { httpOnly: true })\n *   => \"foo=bar; httpOnly\"\n */\nfunction serialize(name, val, options) {\n    const enc = options?.encode || encodeURIComponent;\n    if (!cookieNameRegExp.test(name)) {\n        throw new TypeError(`argument name is invalid: ${name}`);\n    }\n    const value = enc(val);\n    if (!cookieValueRegExp.test(value)) {\n        throw new TypeError(`argument val is invalid: ${val}`);\n    }\n    let str = name + \"=\" + value;\n    if (!options)\n        return str;\n    if (options.maxAge !== undefined) {\n        if (!Number.isInteger(options.maxAge)) {\n            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);\n        }\n        str += \"; Max-Age=\" + options.maxAge;\n    }\n    if (options.domain) {\n        if (!domainValueRegExp.test(options.domain)) {\n            throw new TypeError(`option domain is invalid: ${options.domain}`);\n        }\n        str += \"; Domain=\" + options.domain;\n    }\n    if (options.path) {\n        if (!pathValueRegExp.test(options.path)) {\n            throw new TypeError(`option path is invalid: ${options.path}`);\n        }\n        str += \"; Path=\" + options.path;\n    }\n    if (options.expires) {\n        if (!isDate(options.expires) ||\n            !Number.isFinite(options.expires.valueOf())) {\n            throw new TypeError(`option expires is invalid: ${options.expires}`);\n        }\n        str += \"; Expires=\" + options.expires.toUTCString();\n    }\n    if (options.httpOnly) {\n        str += \"; HttpOnly\";\n    }\n    if (options.secure) {\n        str += \"; Secure\";\n    }\n    if (options.partitioned) {\n        str += \"; Partitioned\";\n    }\n    if (options.priority) {\n        const priority = typeof options.priority === \"string\"\n            ? options.priority.toLowerCase()\n            : undefined;\n        switch (priority) {\n            case \"low\":\n                str += \"; Priority=Low\";\n                break;\n            case \"medium\":\n                str += \"; Priority=Medium\";\n                break;\n            case \"high\":\n                str += \"; Priority=High\";\n                break;\n            default:\n                throw new TypeError(`option priority is invalid: ${options.priority}`);\n        }\n    }\n    if (options.sameSite) {\n        const sameSite = typeof options.sameSite === \"string\"\n            ? options.sameSite.toLowerCase()\n            : options.sameSite;\n        switch (sameSite) {\n            case true:\n            case \"strict\":\n                str += \"; SameSite=Strict\";\n                break;\n            case \"lax\":\n                str += \"; SameSite=Lax\";\n                break;\n            case \"none\":\n                str += \"; SameSite=None\";\n                break;\n            default:\n                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);\n        }\n    }\n    return str;\n}\n/**\n * URL-decode string value. Optimized to skip native call when no %.\n */\nfunction decode(str) {\n    if (str.indexOf(\"%\") === -1)\n        return str;\n    try {\n        return decodeURIComponent(str);\n    }\n    catch (e) {\n        return str;\n    }\n}\n/**\n * Determine if value is a Date.\n */\nfunction isDate(val) {\n    return __toString.call(val) === \"[object Date]\";\n}\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY29va2llL2Rpc3QvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYTtBQUNiLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELEtBQUssa0NBQWtDLEtBQUs7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixnQkFBZ0I7QUFDN0Msa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELEtBQUs7QUFDOUQ7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELElBQUk7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGVBQWU7QUFDNUU7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGVBQWU7QUFDNUU7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGFBQWE7QUFDeEU7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsZ0JBQWdCO0FBQzlFO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsbUVBQW1FLGlCQUFpQjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxtRUFBbUUsaUJBQWlCO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2xlZXllbmEvd2ViLXByb2plY3QvdG9kby1saXN0L25vZGVfbW9kdWxlcy9jb29raWUvZGlzdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmV4cG9ydHMuc2VyaWFsaXplID0gc2VyaWFsaXplO1xuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggY29va2llLW5hbWUgaW4gUkZDIDYyNjUgc2VjIDQuMS4xXG4gKiBUaGlzIHJlZmVycyBvdXQgdG8gdGhlIG9ic29sZXRlZCBkZWZpbml0aW9uIG9mIHRva2VuIGluIFJGQyAyNjE2IHNlYyAyLjJcbiAqIHdoaWNoIGhhcyBiZWVuIHJlcGxhY2VkIGJ5IHRoZSB0b2tlbiBkZWZpbml0aW9uIGluIFJGQyA3MjMwIGFwcGVuZGl4IEIuXG4gKlxuICogY29va2llLW5hbWUgICAgICAgPSB0b2tlblxuICogdG9rZW4gICAgICAgICAgICAgPSAxKnRjaGFyXG4gKiB0Y2hhciAgICAgICAgICAgICA9IFwiIVwiIC8gXCIjXCIgLyBcIiRcIiAvIFwiJVwiIC8gXCImXCIgLyBcIidcIiAvXG4gKiAgICAgICAgICAgICAgICAgICAgIFwiKlwiIC8gXCIrXCIgLyBcIi1cIiAvIFwiLlwiIC8gXCJeXCIgLyBcIl9cIiAvXG4gKiAgICAgICAgICAgICAgICAgICAgIFwiYFwiIC8gXCJ8XCIgLyBcIn5cIiAvIERJR0lUIC8gQUxQSEFcbiAqXG4gKiBOb3RlOiBBbGxvd2luZyBtb3JlIGNoYXJhY3RlcnMgLSBodHRwczovL2dpdGh1Yi5jb20vanNodHRwL2Nvb2tpZS9pc3N1ZXMvMTkxXG4gKiBBbGxvdyBzYW1lIHJhbmdlIGFzIGNvb2tpZSB2YWx1ZSwgZXhjZXB0IGA9YCwgd2hpY2ggZGVsaW1pdHMgZW5kIG9mIG5hbWUuXG4gKi9cbmNvbnN0IGNvb2tpZU5hbWVSZWdFeHAgPSAvXltcXHUwMDIxLVxcdTAwM0FcXHUwMDNDXFx1MDAzRS1cXHUwMDdFXSskLztcbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIGNvb2tpZS12YWx1ZSBpbiBSRkMgNjI2NSBzZWMgNC4xLjFcbiAqXG4gKiBjb29raWUtdmFsdWUgICAgICA9ICpjb29raWUtb2N0ZXQgLyAoIERRVU9URSAqY29va2llLW9jdGV0IERRVU9URSApXG4gKiBjb29raWUtb2N0ZXQgICAgICA9ICV4MjEgLyAleDIzLTJCIC8gJXgyRC0zQSAvICV4M0MtNUIgLyAleDVELTdFXG4gKiAgICAgICAgICAgICAgICAgICAgIDsgVVMtQVNDSUkgY2hhcmFjdGVycyBleGNsdWRpbmcgQ1RMcyxcbiAqICAgICAgICAgICAgICAgICAgICAgOyB3aGl0ZXNwYWNlIERRVU9URSwgY29tbWEsIHNlbWljb2xvbixcbiAqICAgICAgICAgICAgICAgICAgICAgOyBhbmQgYmFja3NsYXNoXG4gKlxuICogQWxsb3dpbmcgbW9yZSBjaGFyYWN0ZXJzOiBodHRwczovL2dpdGh1Yi5jb20vanNodHRwL2Nvb2tpZS9pc3N1ZXMvMTkxXG4gKiBDb21tYSwgYmFja3NsYXNoLCBhbmQgRFFVT1RFIGFyZSBub3QgcGFydCBvZiB0aGUgcGFyc2luZyBhbGdvcml0aG0uXG4gKi9cbmNvbnN0IGNvb2tpZVZhbHVlUmVnRXhwID0gL15bXFx1MDAyMS1cXHUwMDNBXFx1MDAzQy1cXHUwMDdFXSokLztcbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIGRvbWFpbi12YWx1ZSBpbiBSRkMgNjI2NSBzZWMgNC4xLjFcbiAqXG4gKiBkb21haW4tdmFsdWUgICAgICA9IDxzdWJkb21haW4+XG4gKiAgICAgICAgICAgICAgICAgICAgIDsgZGVmaW5lZCBpbiBbUkZDMTAzNF0sIFNlY3Rpb24gMy41LCBhc1xuICogICAgICAgICAgICAgICAgICAgICA7IGVuaGFuY2VkIGJ5IFtSRkMxMTIzXSwgU2VjdGlvbiAyLjFcbiAqIDxzdWJkb21haW4+ICAgICAgID0gPGxhYmVsPiB8IDxzdWJkb21haW4+IFwiLlwiIDxsYWJlbD5cbiAqIDxsYWJlbD4gICAgICAgICAgID0gPGxldC1kaWc+IFsgWyA8bGRoLXN0cj4gXSA8bGV0LWRpZz4gXVxuICogICAgICAgICAgICAgICAgICAgICBMYWJlbHMgbXVzdCBiZSA2MyBjaGFyYWN0ZXJzIG9yIGxlc3MuXG4gKiAgICAgICAgICAgICAgICAgICAgICdsZXQtZGlnJyBub3QgJ2xldHRlcicgaW4gdGhlIGZpcnN0IGNoYXIsIHBlciBSRkMxMTIzXG4gKiA8bGRoLXN0cj4gICAgICAgICA9IDxsZXQtZGlnLWh5cD4gfCA8bGV0LWRpZy1oeXA+IDxsZGgtc3RyPlxuICogPGxldC1kaWctaHlwPiAgICAgPSA8bGV0LWRpZz4gfCBcIi1cIlxuICogPGxldC1kaWc+ICAgICAgICAgPSA8bGV0dGVyPiB8IDxkaWdpdD5cbiAqIDxsZXR0ZXI+ICAgICAgICAgID0gYW55IG9uZSBvZiB0aGUgNTIgYWxwaGFiZXRpYyBjaGFyYWN0ZXJzIEEgdGhyb3VnaCBaIGluXG4gKiAgICAgICAgICAgICAgICAgICAgIHVwcGVyIGNhc2UgYW5kIGEgdGhyb3VnaCB6IGluIGxvd2VyIGNhc2VcbiAqIDxkaWdpdD4gICAgICAgICAgID0gYW55IG9uZSBvZiB0aGUgdGVuIGRpZ2l0cyAwIHRocm91Z2ggOVxuICpcbiAqIEtlZXAgc3VwcG9ydCBmb3IgbGVhZGluZyBkb3Q6IGh0dHBzOi8vZ2l0aHViLmNvbS9qc2h0dHAvY29va2llL2lzc3Vlcy8xNzNcbiAqXG4gKiA+IChOb3RlIHRoYXQgYSBsZWFkaW5nICV4MkUgKFwiLlwiKSwgaWYgcHJlc2VudCwgaXMgaWdub3JlZCBldmVuIHRob3VnaCB0aGF0XG4gKiBjaGFyYWN0ZXIgaXMgbm90IHBlcm1pdHRlZCwgYnV0IGEgdHJhaWxpbmcgJXgyRSAoXCIuXCIpLCBpZiBwcmVzZW50LCB3aWxsXG4gKiBjYXVzZSB0aGUgdXNlciBhZ2VudCB0byBpZ25vcmUgdGhlIGF0dHJpYnV0ZS4pXG4gKi9cbmNvbnN0IGRvbWFpblZhbHVlUmVnRXhwID0gL14oWy5dP1thLXowLTldKFthLXowLTktXXswLDYxfVthLXowLTldKT8pKFsuXVthLXowLTldKFthLXowLTktXXswLDYxfVthLXowLTldKT8pKiQvaTtcbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIHBhdGgtdmFsdWUgaW4gUkZDIDYyNjUgc2VjIDQuMS4xXG4gKlxuICogcGF0aC12YWx1ZSAgICAgICAgPSA8YW55IENIQVIgZXhjZXB0IENUTHMgb3IgXCI7XCI+XG4gKiBDSEFSICAgICAgICAgICAgICA9ICV4MDEtN0ZcbiAqICAgICAgICAgICAgICAgICAgICAgOyBkZWZpbmVkIGluIFJGQyA1MjM0IGFwcGVuZGl4IEIuMVxuICovXG5jb25zdCBwYXRoVmFsdWVSZWdFeHAgPSAvXltcXHUwMDIwLVxcdTAwM0FcXHUwMDNELVxcdTAwN0VdKiQvO1xuY29uc3QgX190b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCBOdWxsT2JqZWN0ID0gLyogQF9fUFVSRV9fICovICgoKSA9PiB7XG4gICAgY29uc3QgQyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBDLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgcmV0dXJuIEM7XG59KSgpO1xuLyoqXG4gKiBQYXJzZSBhIGNvb2tpZSBoZWFkZXIuXG4gKlxuICogUGFyc2UgdGhlIGdpdmVuIGNvb2tpZSBoZWFkZXIgc3RyaW5nIGludG8gYW4gb2JqZWN0XG4gKiBUaGUgb2JqZWN0IGhhcyB0aGUgdmFyaW91cyBjb29raWVzIGFzIGtleXMobmFtZXMpID0+IHZhbHVlc1xuICovXG5mdW5jdGlvbiBwYXJzZShzdHIsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvYmogPSBuZXcgTnVsbE9iamVjdCgpO1xuICAgIGNvbnN0IGxlbiA9IHN0ci5sZW5ndGg7XG4gICAgLy8gUkZDIDYyNjUgc2VjIDQuMS4xLCBSRkMgMjYxNiAyLjIgZGVmaW5lcyBhIGNvb2tpZSBuYW1lIGNvbnNpc3RzIG9mIG9uZSBjaGFyIG1pbmltdW0sIHBsdXMgJz0nLlxuICAgIGlmIChsZW4gPCAyKVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIGNvbnN0IGRlYyA9IG9wdGlvbnM/LmRlY29kZSB8fCBkZWNvZGU7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBkbyB7XG4gICAgICAgIGNvbnN0IGVxSWR4ID0gc3RyLmluZGV4T2YoXCI9XCIsIGluZGV4KTtcbiAgICAgICAgaWYgKGVxSWR4ID09PSAtMSlcbiAgICAgICAgICAgIGJyZWFrOyAvLyBObyBtb3JlIGNvb2tpZSBwYWlycy5cbiAgICAgICAgY29uc3QgY29sb25JZHggPSBzdHIuaW5kZXhPZihcIjtcIiwgaW5kZXgpO1xuICAgICAgICBjb25zdCBlbmRJZHggPSBjb2xvbklkeCA9PT0gLTEgPyBsZW4gOiBjb2xvbklkeDtcbiAgICAgICAgaWYgKGVxSWR4ID4gZW5kSWR4KSB7XG4gICAgICAgICAgICAvLyBiYWNrdHJhY2sgb24gcHJpb3Igc2VtaWNvbG9uXG4gICAgICAgICAgICBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihcIjtcIiwgZXFJZHggLSAxKSArIDE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXlTdGFydElkeCA9IHN0YXJ0SW5kZXgoc3RyLCBpbmRleCwgZXFJZHgpO1xuICAgICAgICBjb25zdCBrZXlFbmRJZHggPSBlbmRJbmRleChzdHIsIGVxSWR4LCBrZXlTdGFydElkeCk7XG4gICAgICAgIGNvbnN0IGtleSA9IHN0ci5zbGljZShrZXlTdGFydElkeCwga2V5RW5kSWR4KTtcbiAgICAgICAgLy8gb25seSBhc3NpZ24gb25jZVxuICAgICAgICBpZiAob2JqW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IHZhbFN0YXJ0SWR4ID0gc3RhcnRJbmRleChzdHIsIGVxSWR4ICsgMSwgZW5kSWR4KTtcbiAgICAgICAgICAgIGxldCB2YWxFbmRJZHggPSBlbmRJbmRleChzdHIsIGVuZElkeCwgdmFsU3RhcnRJZHgpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBkZWMoc3RyLnNsaWNlKHZhbFN0YXJ0SWR4LCB2YWxFbmRJZHgpKTtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXggPSBlbmRJZHggKyAxO1xuICAgIH0gd2hpbGUgKGluZGV4IDwgbGVuKTtcbiAgICByZXR1cm4gb2JqO1xufVxuZnVuY3Rpb24gc3RhcnRJbmRleChzdHIsIGluZGV4LCBtYXgpIHtcbiAgICBkbyB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBzdHIuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgIGlmIChjb2RlICE9PSAweDIwIC8qICAgKi8gJiYgY29kZSAhPT0gMHgwOSAvKiBcXHQgKi8pXG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfSB3aGlsZSAoKytpbmRleCA8IG1heCk7XG4gICAgcmV0dXJuIG1heDtcbn1cbmZ1bmN0aW9uIGVuZEluZGV4KHN0ciwgaW5kZXgsIG1pbikge1xuICAgIHdoaWxlIChpbmRleCA+IG1pbikge1xuICAgICAgICBjb25zdCBjb2RlID0gc3RyLmNoYXJDb2RlQXQoLS1pbmRleCk7XG4gICAgICAgIGlmIChjb2RlICE9PSAweDIwIC8qICAgKi8gJiYgY29kZSAhPT0gMHgwOSAvKiBcXHQgKi8pXG4gICAgICAgICAgICByZXR1cm4gaW5kZXggKyAxO1xuICAgIH1cbiAgICByZXR1cm4gbWluO1xufVxuLyoqXG4gKiBTZXJpYWxpemUgZGF0YSBpbnRvIGEgY29va2llIGhlYWRlci5cbiAqXG4gKiBTZXJpYWxpemUgYSBuYW1lIHZhbHVlIHBhaXIgaW50byBhIGNvb2tpZSBzdHJpbmcgc3VpdGFibGUgZm9yXG4gKiBodHRwIGhlYWRlcnMuIEFuIG9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHNwZWNpZmllcyBjb29raWUgcGFyYW1ldGVycy5cbiAqXG4gKiBzZXJpYWxpemUoJ2ZvbycsICdiYXInLCB7IGh0dHBPbmx5OiB0cnVlIH0pXG4gKiAgID0+IFwiZm9vPWJhcjsgaHR0cE9ubHlcIlxuICovXG5mdW5jdGlvbiBzZXJpYWxpemUobmFtZSwgdmFsLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZW5jID0gb3B0aW9ucz8uZW5jb2RlIHx8IGVuY29kZVVSSUNvbXBvbmVudDtcbiAgICBpZiAoIWNvb2tpZU5hbWVSZWdFeHAudGVzdChuYW1lKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBhcmd1bWVudCBuYW1lIGlzIGludmFsaWQ6ICR7bmFtZX1gKTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSBlbmModmFsKTtcbiAgICBpZiAoIWNvb2tpZVZhbHVlUmVnRXhwLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGFyZ3VtZW50IHZhbCBpcyBpbnZhbGlkOiAke3ZhbH1gKTtcbiAgICB9XG4gICAgbGV0IHN0ciA9IG5hbWUgKyBcIj1cIiArIHZhbHVlO1xuICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICBpZiAob3B0aW9ucy5tYXhBZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5tYXhBZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBvcHRpb24gbWF4QWdlIGlzIGludmFsaWQ6ICR7b3B0aW9ucy5tYXhBZ2V9YCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IFwiOyBNYXgtQWdlPVwiICsgb3B0aW9ucy5tYXhBZ2U7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRvbWFpbikge1xuICAgICAgICBpZiAoIWRvbWFpblZhbHVlUmVnRXhwLnRlc3Qob3B0aW9ucy5kb21haW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBvcHRpb24gZG9tYWluIGlzIGludmFsaWQ6ICR7b3B0aW9ucy5kb21haW59YCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IFwiOyBEb21haW49XCIgKyBvcHRpb25zLmRvbWFpbjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucGF0aCkge1xuICAgICAgICBpZiAoIXBhdGhWYWx1ZVJlZ0V4cC50ZXN0KG9wdGlvbnMucGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYG9wdGlvbiBwYXRoIGlzIGludmFsaWQ6ICR7b3B0aW9ucy5wYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIHN0ciArPSBcIjsgUGF0aD1cIiArIG9wdGlvbnMucGF0aDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZXhwaXJlcykge1xuICAgICAgICBpZiAoIWlzRGF0ZShvcHRpb25zLmV4cGlyZXMpIHx8XG4gICAgICAgICAgICAhTnVtYmVyLmlzRmluaXRlKG9wdGlvbnMuZXhwaXJlcy52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBvcHRpb24gZXhwaXJlcyBpcyBpbnZhbGlkOiAke29wdGlvbnMuZXhwaXJlc31gKTtcbiAgICAgICAgfVxuICAgICAgICBzdHIgKz0gXCI7IEV4cGlyZXM9XCIgKyBvcHRpb25zLmV4cGlyZXMudG9VVENTdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaHR0cE9ubHkpIHtcbiAgICAgICAgc3RyICs9IFwiOyBIdHRwT25seVwiO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zZWN1cmUpIHtcbiAgICAgICAgc3RyICs9IFwiOyBTZWN1cmVcIjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucGFydGl0aW9uZWQpIHtcbiAgICAgICAgc3RyICs9IFwiOyBQYXJ0aXRpb25lZFwiO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5wcmlvcml0eSkge1xuICAgICAgICBjb25zdCBwcmlvcml0eSA9IHR5cGVvZiBvcHRpb25zLnByaW9yaXR5ID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICA/IG9wdGlvbnMucHJpb3JpdHkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHN3aXRjaCAocHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsb3dcIjpcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCI7IFByaW9yaXR5PUxvd1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1lZGl1bVwiOlxuICAgICAgICAgICAgICAgIHN0ciArPSBcIjsgUHJpb3JpdHk9TWVkaXVtXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaGlnaFwiOlxuICAgICAgICAgICAgICAgIHN0ciArPSBcIjsgUHJpb3JpdHk9SGlnaFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBvcHRpb24gcHJpb3JpdHkgaXMgaW52YWxpZDogJHtvcHRpb25zLnByaW9yaXR5fWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNhbWVTaXRlKSB7XG4gICAgICAgIGNvbnN0IHNhbWVTaXRlID0gdHlwZW9mIG9wdGlvbnMuc2FtZVNpdGUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgID8gb3B0aW9ucy5zYW1lU2l0ZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICA6IG9wdGlvbnMuc2FtZVNpdGU7XG4gICAgICAgIHN3aXRjaCAoc2FtZVNpdGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpY3RcIjpcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCI7IFNhbWVTaXRlPVN0cmljdFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxheFwiOlxuICAgICAgICAgICAgICAgIHN0ciArPSBcIjsgU2FtZVNpdGU9TGF4XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm9uZVwiOlxuICAgICAgICAgICAgICAgIHN0ciArPSBcIjsgU2FtZVNpdGU9Tm9uZVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBvcHRpb24gc2FtZVNpdGUgaXMgaW52YWxpZDogJHtvcHRpb25zLnNhbWVTaXRlfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG4vKipcbiAqIFVSTC1kZWNvZGUgc3RyaW5nIHZhbHVlLiBPcHRpbWl6ZWQgdG8gc2tpcCBuYXRpdmUgY2FsbCB3aGVuIG5vICUuXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgICBpZiAoc3RyLmluZGV4T2YoXCIlXCIpID09PSAtMSlcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cik7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdmFsdWUgaXMgYSBEYXRlLlxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gICAgcmV0dXJuIF9fdG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgRGF0ZV1cIjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/cookie/dist/index.js\n");

/***/ })

};
;
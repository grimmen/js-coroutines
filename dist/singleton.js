"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _run=_interopRequireDefault(require("./run"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.singleton=singleton;function singleton(a,b){var c=null,d=[],e=function(){return c&&(d.forEach(function(a){return a.terminate()}),d=[],c.terminate(b)),c=e._promise=(0,_run.default)(a.apply(void 0,arguments))};return e.join=function(a){return d.push(a),a},e}
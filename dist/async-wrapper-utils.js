"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.wrapAsPromiseAndYieldFn=wrapAsPromiseAndYieldFn;var _coroutines=require("./coroutines"),_wrappers=require("./wrappers"),_run=_interopRequireDefault(require("./run"));function wrapAsPromiseAndYieldFn(a){var b=function(b,c){for(var d=arguments.length,e=Array(2<d?d-2:0),f=2;f<d;f++)e[f-2]=arguments[f];return(0,_run.default)(a.apply(void 0,[b,(0,_wrappers.yielding)(c)].concat(e)))};return b.with=function(){for(var a=arguments.length,c=Array(a),d=0;d<a;d++)c[d]=arguments[d];return _coroutines.call.apply(void 0,[b].concat(c))},b}
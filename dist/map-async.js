"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mapAsync=void 0;var _asyncWrapperUtils=require("./async-wrapper-utils"),_map=require("./map"),mapAsync=(0,_asyncWrapperUtils.wrapAsPromiseAndYieldFn)(_map.map);exports.mapAsync=mapAsync;
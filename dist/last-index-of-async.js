"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lastIndexOfAsync=void 0;var _asyncWrapperUtils=require("./async-wrapper-utils"),_lastIndexOf=require("./last-index-of"),lastIndexOfAsync=(0,_asyncWrapperUtils.wrapAsPromiseAndYieldFn)(_lastIndexOf.lastIndexOf);exports.lastIndexOfAsync=lastIndexOfAsync;
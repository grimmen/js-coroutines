"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.someAsync=void 0;var _asyncWrapperUtils=require("./async-wrapper-utils"),_some=require("./some"),someAsync=(0,_asyncWrapperUtils.wrapAsPromiseAndYieldFn)(_some.some);exports.someAsync=someAsync;
"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.repeat=repeat;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_run=_interopRequireDefault(require("./run"));function repeat(a,b){return function(){var c=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function c(d){var e,f;return _regenerator.default.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:e=d,f=0;case 2:if(!(f<b)){c.next=17;break}if(e=a.call(this,e),!e.next){c.next=10;break}return c.next=7,(0,_run.default)(e);case 7:e=c.sent,c.next=14;break;case 10:if(!e.then){c.next=14;break}return c.next=13,e;case 13:e=c.sent;case 14:f++,c.next=2;break;case 17:return c.abrupt("return",e);case 18:case"end":return c.stop();}},c,this)}));return function(){return c.apply(this,arguments)}}()}
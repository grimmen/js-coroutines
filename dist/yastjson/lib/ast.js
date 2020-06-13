"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AST = exports.ASTNode = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _token = require("./token");

var _expression = require("./expression");

var _yielder = require("./yielder");

/**
 * Copyright (c) 2020 5u9ar (zhuyingda) (c) 2020 Mike Talbot (Generator mods)
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var ASTNode = /*#__PURE__*/function () {
  function ASTNode(tokens, type) {
    (0, _classCallCheck2.default)(this, ASTNode);
    this.type = type;
    this.tokens = tokens;
    this.childNodeList = [];
  }

  (0, _createClass2.default)(ASTNode, [{
    key: "addChild",
    value: function addChild(node) {
      this.childNodeList.push(node);
    }
  }]);
  return ASTNode;
}();

exports.ASTNode = ASTNode;

var AST = /*#__PURE__*/function () {
  function AST(tokens) {
    (0, _classCallCheck2.default)(this, AST);
    this.tokens = tokens;
  }

  (0, _createClass2.default)(AST, [{
    key: "buildTree",
    value: /*#__PURE__*/_regenerator.default.mark(function buildTree() {
      return _regenerator.default.wrap(function buildTree$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.handleExprJson(this.tokens), "t0", 1);

            case 1:
              return _context.abrupt("return", _context.t0);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, buildTree, this);
    })
  }, {
    key: "handleExprJson",
    value: /*#__PURE__*/_regenerator.default.mark(function handleExprJson(tokens) {
      var node, firstToken, arrayExpr, objectExpr;
      return _regenerator.default.wrap(function handleExprJson$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(0, _yielder.yielder)()) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return;

            case 3:
              node = new ASTNode(tokens, _expression.ExprType.Json);
              firstToken = tokens[0];

              if (!(firstToken.type === _token.TokenType.LeftBracket)) {
                _context2.next = 11;
                break;
              }

              return _context2.delegateYield(this.handleExprArray(tokens), "t0", 7);

            case 7:
              arrayExpr = _context2.t0;
              node.addChild(arrayExpr);
              _context2.next = 18;
              break;

            case 11:
              if (!(firstToken.type === _token.TokenType.LeftBrace)) {
                _context2.next = 17;
                break;
              }

              return _context2.delegateYield(this.handleExprObject(tokens), "t1", 13);

            case 13:
              objectExpr = _context2.t1;
              node.addChild(objectExpr);
              _context2.next = 18;
              break;

            case 17:
              throw new Error("[json expression error] unexpected token ".concat(firstToken.text));

            case 18:
              return _context2.abrupt("return", node);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, handleExprJson, this);
    })
  }, {
    key: "handleExprArray",
    value: /*#__PURE__*/_regenerator.default.mark(function handleExprArray(tokens) {
      var node, valueTokens, brace, bracket, index, length, token, _valueExpr, valueExpr;

      return _regenerator.default.wrap(function handleExprArray$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(tokens.length === 2 && tokens[0].type === _token.TokenType.LeftBracket && tokens[1].type === _token.TokenType.RightBracket)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", new ASTNode(tokens, _expression.ExprType.Array));

            case 2:
              node = new ASTNode(tokens, _expression.ExprType.Array);
              valueTokens = [];
              brace = 0;
              bracket = 0;
              index = 1, length = tokens.length - 1;

            case 7:
              if (!(index < length)) {
                _context3.next = 40;
                break;
              }

              if (!(0, _yielder.yielder)()) {
                _context3.next = 11;
                break;
              }

              _context3.next = 11;
              return;

            case 11:
              token = tokens[index];

              if (!(token.type === _token.TokenType.Comma && brace === 0 && bracket === 0)) {
                _context3.next = 24;
                break;
              }

              if (!(valueTokens.length === 1)) {
                _context3.next = 17;
                break;
              }

              _context3.t0 = this.handleExprValueDirect(valueTokens);
              _context3.next = 19;
              break;

            case 17:
              return _context3.delegateYield(this.handleExprValue(valueTokens), "t1", 18);

            case 18:
              _context3.t0 = _context3.t1;

            case 19:
              _valueExpr = _context3.t0;
              valueTokens = [];
              node.addChild(_valueExpr);
              _context3.next = 37;
              break;

            case 24:
              _context3.t2 = token.type;
              _context3.next = _context3.t2 === _token.TokenType.RightBrace ? 27 : _context3.t2 === _token.TokenType.RightBracket ? 29 : _context3.t2 === _token.TokenType.LeftBrace ? 31 : _context3.t2 === _token.TokenType.LeftBracket ? 33 : 35;
              break;

            case 27:
              brace--;
              return _context3.abrupt("break", 36);

            case 29:
              bracket--;
              return _context3.abrupt("break", 36);

            case 31:
              brace++;
              return _context3.abrupt("break", 36);

            case 33:
              bracket++;
              return _context3.abrupt("break", 36);

            case 35:
              return _context3.abrupt("break", 36);

            case 36:
              valueTokens.push(token);

            case 37:
              index++;
              _context3.next = 7;
              break;

            case 40:
              if (!(valueTokens.length === 1)) {
                _context3.next = 44;
                break;
              }

              _context3.t3 = this.handleExprValueDirect(valueTokens);
              _context3.next = 46;
              break;

            case 44:
              return _context3.delegateYield(this.handleExprValue(valueTokens), "t4", 45);

            case 45:
              _context3.t3 = _context3.t4;

            case 46:
              valueExpr = _context3.t3;
              node.addChild(valueExpr);
              return _context3.abrupt("return", node);

            case 49:
            case "end":
              return _context3.stop();
          }
        }
      }, handleExprArray, this);
    })
  }, {
    key: "handleExprObject",
    value: /*#__PURE__*/_regenerator.default.mark(function handleExprObject(tokens) {
      var node, propExprNode, propTokens, valueTokens, brace, bracket, state, index, length, token, _valueExpr2, valueExpr;

      return _regenerator.default.wrap(function handleExprObject$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(tokens.length === 2 && tokens[0].type === _token.TokenType.LeftBrace && tokens[1].type === _token.TokenType.RightBrace)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", new ASTNode(tokens, _expression.ExprType.Object));

            case 2:
              node = new ASTNode(tokens, _expression.ExprType.Object);
              propTokens = [];
              valueTokens = [];
              brace = 0;
              bracket = 0;
              state = "prop";
              index = 1, length = tokens.length - 1;

            case 9:
              if (!(index < length)) {
                _context4.next = 58;
                break;
              }

              if (!(0, _yielder.yielder)()) {
                _context4.next = 13;
                break;
              }

              _context4.next = 13;
              return;

            case 13:
              token = tokens[index];

              if (!(token.type === _token.TokenType.Colon && state === "prop")) {
                _context4.next = 21;
                break;
              }

              return _context4.delegateYield(this.handleExprProp(propTokens), "t0", 16);

            case 16:
              propExprNode = _context4.t0;
              propTokens = [];
              state = "value";
              _context4.next = 55;
              break;

            case 21:
              if (!(token.type === _token.TokenType.Comma && state === "prop" && brace === 0 && bracket === 0)) {
                _context4.next = 34;
                break;
              }

              if (!(valueTokens.length === 1)) {
                _context4.next = 26;
                break;
              }

              _context4.t1 = this.handleExprValueDirect(valueTokens);
              _context4.next = 28;
              break;

            case 26:
              return _context4.delegateYield(this.handleExprValue(valueTokens), "t2", 27);

            case 27:
              _context4.t1 = _context4.t2;

            case 28:
              _valueExpr2 = _context4.t1;
              valueTokens = [];
              propExprNode.addChild(_valueExpr2);
              node.addChild(propExprNode);
              _context4.next = 55;
              break;

            case 34:
              _context4.t3 = state;
              _context4.next = _context4.t3 === "prop" ? 37 : _context4.t3 === "value" ? 39 : 54;
              break;

            case 37:
              propTokens.push(token);
              return _context4.abrupt("break", 55);

            case 39:
              _context4.t4 = token.type;
              _context4.next = _context4.t4 === _token.TokenType.RightBrace ? 42 : _context4.t4 === _token.TokenType.RightBracket ? 44 : _context4.t4 === _token.TokenType.LeftBrace ? 46 : _context4.t4 === _token.TokenType.LeftBracket ? 48 : 50;
              break;

            case 42:
              brace--;
              return _context4.abrupt("break", 51);

            case 44:
              bracket--;
              return _context4.abrupt("break", 51);

            case 46:
              brace++;
              return _context4.abrupt("break", 51);

            case 48:
              bracket++;
              return _context4.abrupt("break", 51);

            case 50:
              return _context4.abrupt("break", 51);

            case 51:
              valueTokens.push(token);

              if (brace === 0 && bracket === 0) {
                state = "prop";
              }

              return _context4.abrupt("break", 55);

            case 54:
              throw new Error("[object expression error] unexpected state");

            case 55:
              index++;
              _context4.next = 9;
              break;

            case 58:
              if (!(valueTokens.length === 1)) {
                _context4.next = 62;
                break;
              }

              _context4.t5 = this.handleExprValueDirect(valueTokens);
              _context4.next = 64;
              break;

            case 62:
              return _context4.delegateYield(this.handleExprValue(valueTokens), "t6", 63);

            case 63:
              _context4.t5 = _context4.t6;

            case 64:
              valueExpr = _context4.t5;
              propExprNode.addChild(valueExpr);
              node.addChild(propExprNode);
              return _context4.abrupt("return", node);

            case 68:
            case "end":
              return _context4.stop();
          }
        }
      }, handleExprObject, this);
    })
  }, {
    key: "handleExprProp",
    value: /*#__PURE__*/_regenerator.default.mark(function handleExprProp(tokens) {
      var node;
      return _regenerator.default.wrap(function handleExprProp$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(0, _yielder.yielder)()) {
                _context5.next = 3;
                break;
              }

              _context5.next = 3;
              return;

            case 3:
              node = new ASTNode(tokens, _expression.ExprType.Prop);
              node.propName = tokens[0].text.slice(1, -1);
              return _context5.abrupt("return", node);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, handleExprProp);
    })
  }, {
    key: "handleExprValueDirect",
    value: function handleExprValueDirect(tokens) {
      var node = new ASTNode(tokens, _expression.ExprType.Value);
      var tokenType = tokens[0].type;

      switch (tokenType) {
        case _token.TokenType.Null:
        case _token.TokenType.Boolean:
        case _token.TokenType.Number:
        case _token.TokenType.String:
          node.value = new ASTNode(tokens, tokenType);
          break;

        default:
          throw new Error("[value expression error] unknown single token type");
      }

      return node;
    }
  }, {
    key: "handleExprValue",
    value: /*#__PURE__*/_regenerator.default.mark(function handleExprValue(tokens) {
      var node;
      return _regenerator.default.wrap(function handleExprValue$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(0, _yielder.yielder)()) {
                _context6.next = 3;
                break;
              }

              _context6.next = 3;
              return;

            case 3:
              node = new ASTNode(tokens, _expression.ExprType.Value);
              return _context6.delegateYield(this.handleExprJson(tokens), "t0", 5);

            case 5:
              node.value = _context6.t0;
              return _context6.abrupt("return", node);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, handleExprValue, this);
    })
  }]);
  return AST;
}();

exports.AST = AST;
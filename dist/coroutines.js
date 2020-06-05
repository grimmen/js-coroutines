"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;
exports.update = update;
exports.runAsync = runAsync;
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function run(coroutine) {
  var loopWhileMsRemains = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16 * 10;
  var terminated = false;
  var resolver = null;
  var result = new Promise(function (resolve, reject) {
    resolver = resolve;
    var iterator = coroutine(); // Request a callback during idle

    window.requestIdleCallback(run); // Handle background processing when tab is not active

    var id = setTimeout(runFromTimeout, timeout);

    function run(api) {
      clearTimeout(id); // Stop the timeout version

      if (terminated) {
        iterator.return();
        return;
      }

      var minTime = Math.max(0.5, loopWhileMsRemains);

      try {
        do {
          var _iterator$next = iterator.next(),
              value = _iterator$next.value,
              done = _iterator$next.done;

          if (done) {
            resolve(value);
            return;
          }

          if (value === true) {
            break;
          }

          if (value) {
            minTime = +value;
            if (isNaN(minTime)) minTime = 1;
          }
        } while (api.timeRemaining() > minTime);
      } catch (e) {
        reject(e);
        return;
      } // Request an idle callback


      window.requestIdleCallback(run); // Request again on timeout

      id = setTimeout(runFromTimeout, timeout);
    }

    function runFromTimeout() {
      var budget = 8.5;
      var start = performance.now();
      run({
        timeRemaining: function timeRemaining() {
          return budget - (performance.now() - start);
        }
      });
    }
  });

  result.terminate = function (result) {
    terminated = true;

    if (resolver) {
      resolver(result);
    }
  };

  return result;
}

function update(coroutine) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var terminated = false;
  var resolver = null;
  var result = new Promise(function (resolve, reject) {
    resolver = resolve;
    var iterator = coroutine.apply(void 0, params);
    window.requestAnimationFrame(run);

    function run() {
      if (terminated) {
        iterator.return();
        return;
      }

      try {
        var _iterator$next2 = iterator.next(),
            value = _iterator$next2.value,
            done = _iterator$next2.done;

        if (done) {
          resolve(value);
          return;
        }
      } catch (e) {
        reject(e);
        return;
      }

      window.requestAnimationFrame(run);
    }
  });

  result.terminate = function (result) {
    terminated = true;

    if (resolver) {
      resolver(result);
    }
  };

  return result;
}

function runAsync(coroutine) {
  var loopWhileMsRemains = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 160;
  var options = {
    timeout: timeout
  };
  var terminated = false;
  var resolver = null;
  var result = new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var iterator, run, _run;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _run = function _run3() {
                _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(api) {
                  var minTime, _yield$iterator$next, value, done;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!terminated) {
                            _context.next = 3;
                            break;
                          }

                          iterator.return();
                          return _context.abrupt("return");

                        case 3:
                          minTime = Math.max(0.5, loopWhileMsRemains);
                          _context.prev = 4;

                        case 5:
                          _context.next = 7;
                          return iterator.next();

                        case 7:
                          _yield$iterator$next = _context.sent;
                          value = _yield$iterator$next.value;
                          done = _yield$iterator$next.done;

                          if (!done) {
                            _context.next = 13;
                            break;
                          }

                          resolve(value);
                          return _context.abrupt("return");

                        case 13:
                          if (!(value === true)) {
                            _context.next = 15;
                            break;
                          }

                          return _context.abrupt("break", 17);

                        case 15:
                          if (value) {
                            minTime = +value;
                            if (isNaN(minTime)) minTime = 1;
                          }

                        case 16:
                          if (api.timeRemaining() > minTime) {
                            _context.next = 5;
                            break;
                          }

                        case 17:
                          _context.next = 23;
                          break;

                        case 19:
                          _context.prev = 19;
                          _context.t0 = _context["catch"](4);
                          reject(_context.t0);
                          return _context.abrupt("return");

                        case 23:
                          window.requestIdleCallback(run, options);

                        case 24:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[4, 19]]);
                }));
                return _run.apply(this, arguments);
              };

              run = function _run2(_x3) {
                return _run.apply(this, arguments);
              };

              resolver = resolve;
              _context2.next = 5;
              return Promise.resolve(coroutine());

            case 5:
              iterator = _context2.sent;
              window.requestIdleCallback(run);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  result.terminate = function (result) {
    terminated = true;

    if (resolver) {
      resolver(result);
    }
  };

  return result;
}

var _default = run;
exports.default = _default;
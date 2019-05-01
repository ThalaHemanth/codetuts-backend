'use strict';var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};

var _v = require('uuid/v4');var _v2 = _interopRequireDefault(_v);
var _axios = require('axios');var _axios2 = _interopRequireDefault(_axios);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}Function.prototype.$asyncbind = function $asyncbind(self, catcher) {"use strict";if (!Function.prototype.$asyncbind) {Object.defineProperty(Function.prototype, "$asyncbind", { value: $asyncbind, enumerable: false, configurable: true, writable: true });}if (!$asyncbind.trampoline) {$asyncbind.trampoline = function trampoline(t, x, s, e, u) {return function b(q) {while (q) {if (q.then) {q = q.then(b, e);return u ? undefined : q;}try {if (q.pop) {if (q.length) return q.pop() ? x.call(t) : q;q = s;} else q = q.call(t);} catch (r) {return e(r);}}};};}if (!$asyncbind.LazyThenable) {$asyncbind.LazyThenable = function () {function isThenable(obj) {return obj && obj instanceof Object && typeof obj.then === "function";}function resolution(p, r, how) {try {var x = how ? how(r) : r;if (p === x) return p.reject(new TypeError("Promise resolution loop"));if (isThenable(x)) {x.then(function (y) {resolution(p, y);}, function (e) {p.reject(e);});} else {p.resolve(x);}} catch (ex) {p.reject(ex);}}function _unchained(v) {}function thenChain(res, rej) {this.resolve = res;this.reject = rej;}function Chained() {};Chained.prototype = { resolve: _unchained, reject: _unchained, then: thenChain };function then(res, rej) {var chain = new Chained();try {this._resolver(function (value) {return isThenable(value) ? value.then(res, rej) : resolution(chain, value, res);}, function (ex) {resolution(chain, ex, rej);});} catch (ex) {resolution(chain, ex, rej);}return chain;}function Thenable(resolver) {this._resolver = resolver;this.then = then;};Thenable.resolve = function (v) {return Thenable.isThenable(v) ? v : { then: function then(resolve) {return resolve(v);} };};Thenable.isThenable = isThenable;return Thenable;}();$asyncbind.EagerThenable = $asyncbind.Thenable = ($asyncbind.EagerThenableFactory = function (tick) {tick = tick || (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === "object" && process.nextTick || typeof setImmediate === "function" && setImmediate || function (f) {setTimeout(f, 0);};var soon = function () {var fq = [],fqStart = 0,bufferSize = 1024;function callQueue() {while (fq.length - fqStart) {try {fq[fqStart]();} catch (ex) {}fq[fqStart++] = undefined;if (fqStart === bufferSize) {fq.splice(0, bufferSize);fqStart = 0;}}}return function (fn) {fq.push(fn);if (fq.length - fqStart === 1) tick(callQueue);};}();function Zousan(func) {if (func) {var me = this;func(function (arg) {me.resolve(arg);}, function (arg) {me.reject(arg);});}}Zousan.prototype = { resolve: function resolve(value) {if (this.state !== undefined) return;if (value === this) return this.reject(new TypeError("Attempt to resolve promise with self"));var me = this;if (value && (typeof value === "function" || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object")) {try {var first = 0;var then = value.then;if (typeof then === "function") {then.call(value, function (ra) {if (!first++) {me.resolve(ra);}}, function (rr) {if (!first++) {me.reject(rr);}});return;}} catch (e) {if (!first) this.reject(e);return;}}this.state = STATE_FULFILLED;this.v = value;if (me.c) soon(function () {for (var n = 0, l = me.c.length; n < l; n++) {STATE_FULFILLED(me.c[n], value);}});}, reject: function reject(reason) {if (this.state !== undefined) return;this.state = STATE_REJECTED;this.v = reason;var clients = this.c;if (clients) soon(function () {for (var n = 0, l = clients.length; n < l; n++) {STATE_REJECTED(clients[n], reason);}});}, then: function then(onF, onR) {var p = new Zousan();var client = { y: onF, n: onR, p: p };if (this.state === undefined) {if (this.c) this.c.push(client);else this.c = [client];} else {var s = this.state,a = this.v;soon(function () {s(client, a);});}return p;} };function STATE_FULFILLED(c, arg) {if (typeof c.y === "function") {try {var yret = c.y.call(undefined, arg);c.p.resolve(yret);} catch (err) {c.p.reject(err);}} else c.p.resolve(arg);}function STATE_REJECTED(c, reason) {if (typeof c.n === "function") {try {var yret = c.n.call(undefined, reason);c.p.resolve(yret);} catch (err) {c.p.reject(err);}} else c.p.reject(reason);}Zousan.resolve = function (val) {if (val && val instanceof Zousan) return val;var z = new Zousan();z.resolve(val);return z;};Zousan.reject = function (err) {if (err && err instanceof Zousan) return err;var z = new Zousan();z.reject(err);return z;};Zousan.version = "2.3.3-nodent";return Zousan;})();}function boundThen() {return resolver.apply(self, arguments);}var resolver = this;switch (catcher) {case true:return new $asyncbind.Thenable(boundThen);case 0:return new $asyncbind.LazyThenable(boundThen);case undefined:boundThen.then = boundThen;return boundThen;default:return function () {try {return resolver.apply(self, arguments);} catch (ex) {return catcher(ex);}};}};function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};} /* eslint-disable prefer-destructuring */ /* eslint-disable no-shadow */

var Mutation = {
  Signup: function Signup(parent, _ref, _ref2) {var email = _ref.email,password = _ref.password;var firebase = _ref2.firebase;
    firebase.
    auth().
    createUserWithEmailAndPassword(email, password).
    catch(function (err) {return console.log(err);});
    return 'Success';
  },
  Signin: function Signin(parent, _ref3, _ref4) {var email = _ref3.email,password = _ref3.password;var firebase = _ref4.firebase;
    firebase.
    auth().
    signInWithEmailAndPassword(email, password).
    catch(function (err) {return console.log(err);});
    return 'Logged In';
  },
  CreateApi: function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref5) {var db = _ref5.db;var title, Language, playlistId, id, Items, _ref7, data, urls, promises, res, videoDetails, newItems;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              title = args.title.toLowerCase();
              Language = args.Language.toLowerCase();
              playlistId = args.playlistId;
              id = (0, _v2.default)();
              Items = [];_context.next = 7;return (
                _axios2.default.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' +
                playlistId + '&key=AIzaSyCxqkIJes14pl7_8hSkgq_cApTDRgK12OI&maxResults=50'));case 7:_ref7 = _context.sent;data = _ref7.data;

              Items = data.items.map(function (item) {return {
                  channel: item.snippet.channelTitle,
                  thumbnail: item.snippet.thumbnails.default.url,
                  title: item.snippet.title,
                  video: item.snippet.resourceId.videoId };});

              urls = Items.map(
              function (item) {return 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=' +

                item.video + '&key=AIzaSyCxqkIJes14pl7_8hSkgq_cApTDRgK12OI';});


              promises = urls.map(function (url) {return _axios2.default.get(url);});_context.next = 14;return (
                Promise.all(promises));case 14:res = _context.sent;_context.next = 17;return (
                res.map(function (response) {return {
                    id: response.data.items[0].id,
                    duration: response.data.items[0].contentDetails.duration };}));case 17:videoDetails = _context.sent;

              newItems = Items.map(function (item) {
                var tempItems = void 0;
                videoDetails.forEach(function (video) {
                  if (video.id === item.video) {
                    var duration = Math.round(
                    _moment2.default.duration(video.duration).asMinutes());

                    tempItems = _extends({}, item, { duration: duration });
                  }
                });
                return _extends({}, tempItems);
              });
              console.log(newItems);
              db.collection(Language).add({
                id: id,
                title: title,
                playlistId: playlistId,
                playlist: newItems });return _context.abrupt('return',


              {
                id: id,
                title: title,
                language: Language,
                playlist: newItems });case 22:case 'end':return _context.stop();}}}, _callee, undefined);}));function CreateApi(_x, _x2, _x3) {return _ref6.apply(this, arguments);}return CreateApi;}() };exports.




default = Mutation;
//# sourceMappingURL=Mutation.js.map
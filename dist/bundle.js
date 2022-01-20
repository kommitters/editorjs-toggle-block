!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.Toggle = t())
    : (e.Toggle = t());
})(self, function () {
  return (() => {
    var e = {
        424: (e, t, r) => {
          'use strict';
          r.d(t, { Z: () => s });
          var n = r(81),
            o = r.n(n),
            a = r(645),
            i = r.n(a)()(o());
          i.push([
            e.id,
            '.toggle-block .toggle-input {\n  vertical-align: middle;\n  display: inline-block;\n  padding: 1% 0 1% 0;\n  outline: none;\n  border: none;\n  min-width: 94%;\n}\n\n.toggle-block svg {\n  vertical-align: middle;\n  width: 34px;\n  height: 34px;\n}\n',
            '',
          ]);
          const s = i;
        },
        645: (e) => {
          'use strict';
          e.exports = function (e) {
            var t = [];
            return (
              (t.toString = function () {
                return this.map(function (t) {
                  var r = '',
                    n = void 0 !== t[5];
                  return (
                    t[4] && (r += '@supports ('.concat(t[4], ') {')),
                    t[2] && (r += '@media '.concat(t[2], ' {')),
                    n &&
                      (r += '@layer'.concat(
                        t[5].length > 0 ? ' '.concat(t[5]) : '',
                        ' {'
                      )),
                    (r += e(t)),
                    n && (r += '}'),
                    t[2] && (r += '}'),
                    t[4] && (r += '}'),
                    r
                  );
                }).join('');
              }),
              (t.i = function (e, r, n, o, a) {
                'string' == typeof e && (e = [[null, e, void 0]]);
                var i = {};
                if (n)
                  for (var s = 0; s < this.length; s++) {
                    var c = this[s][0];
                    null != c && (i[c] = !0);
                  }
                for (var u = 0; u < e.length; u++) {
                  var l = [].concat(e[u]);
                  (n && i[l[0]]) ||
                    (void 0 !== a &&
                      (void 0 === l[5] ||
                        (l[1] = '@layer'
                          .concat(l[5].length > 0 ? ' '.concat(l[5]) : '', ' {')
                          .concat(l[1], '}')),
                      (l[5] = a)),
                    r &&
                      (l[2]
                        ? ((l[1] = '@media '
                            .concat(l[2], ' {')
                            .concat(l[1], '}')),
                          (l[2] = r))
                        : (l[2] = r)),
                    o &&
                      (l[4]
                        ? ((l[1] = '@supports ('
                            .concat(l[4], ') {')
                            .concat(l[1], '}')),
                          (l[4] = o))
                        : (l[4] = ''.concat(o))),
                    t.push(l));
                }
              }),
              t
            );
          };
        },
        81: (e) => {
          'use strict';
          e.exports = function (e) {
            return e[1];
          };
        },
        379: (e) => {
          'use strict';
          var t = [];
          function r(e) {
            for (var r = -1, n = 0; n < t.length; n++)
              if (t[n].identifier === e) {
                r = n;
                break;
              }
            return r;
          }
          function n(e, n) {
            for (var a = {}, i = [], s = 0; s < e.length; s++) {
              var c = e[s],
                u = n.base ? c[0] + n.base : c[0],
                l = a[u] || 0,
                d = ''.concat(u, ' ').concat(l);
              a[u] = l + 1;
              var p = r(d),
                f = {
                  css: c[1],
                  media: c[2],
                  sourceMap: c[3],
                  supports: c[4],
                  layer: c[5],
                };
              if (-1 !== p) t[p].references++, t[p].updater(f);
              else {
                var v = o(f, n);
                (n.byIndex = s),
                  t.splice(s, 0, { identifier: d, updater: v, references: 1 });
              }
              i.push(d);
            }
            return i;
          }
          function o(e, t) {
            var r = t.domAPI(t);
            return (
              r.update(e),
              function (t) {
                if (t) {
                  if (
                    t.css === e.css &&
                    t.media === e.media &&
                    t.sourceMap === e.sourceMap &&
                    t.supports === e.supports &&
                    t.layer === e.layer
                  )
                    return;
                  r.update((e = t));
                } else r.remove();
              }
            );
          }
          e.exports = function (e, o) {
            var a = n((e = e || []), (o = o || {}));
            return function (e) {
              e = e || [];
              for (var i = 0; i < a.length; i++) {
                var s = r(a[i]);
                t[s].references--;
              }
              for (var c = n(e, o), u = 0; u < a.length; u++) {
                var l = r(a[u]);
                0 === t[l].references && (t[l].updater(), t.splice(l, 1));
              }
              a = c;
            };
          };
        },
        569: (e) => {
          'use strict';
          var t = {};
          e.exports = function (e, r) {
            var n = (function (e) {
              if (void 0 === t[e]) {
                var r = document.querySelector(e);
                if (
                  window.HTMLIFrameElement &&
                  r instanceof window.HTMLIFrameElement
                )
                  try {
                    r = r.contentDocument.head;
                  } catch (e) {
                    r = null;
                  }
                t[e] = r;
              }
              return t[e];
            })(e);
            if (!n)
              throw new Error(
                "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
              );
            n.appendChild(r);
          };
        },
        216: (e) => {
          'use strict';
          e.exports = function (e) {
            var t = document.createElement('style');
            return e.setAttributes(t, e.attributes), e.insert(t, e.options), t;
          };
        },
        565: (e, t, r) => {
          'use strict';
          e.exports = function (e) {
            var t = r.nc;
            t && e.setAttribute('nonce', t);
          };
        },
        795: (e) => {
          'use strict';
          e.exports = function (e) {
            var t = e.insertStyleElement(e);
            return {
              update: function (r) {
                !(function (e, t, r) {
                  var n = '';
                  r.supports && (n += '@supports ('.concat(r.supports, ') {')),
                    r.media && (n += '@media '.concat(r.media, ' {'));
                  var o = void 0 !== r.layer;
                  o &&
                    (n += '@layer'.concat(
                      r.layer.length > 0 ? ' '.concat(r.layer) : '',
                      ' {'
                    )),
                    (n += r.css),
                    o && (n += '}'),
                    r.media && (n += '}'),
                    r.supports && (n += '}');
                  var a = r.sourceMap;
                  a &&
                    'undefined' != typeof btoa &&
                    (n +=
                      '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
                        btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                        ' */'
                      )),
                    t.styleTagTransform(n, e, t.options);
                })(t, e, r);
              },
              remove: function () {
                !(function (e) {
                  if (null === e.parentNode) return !1;
                  e.parentNode.removeChild(e);
                })(t);
              },
            };
          };
        },
        589: (e) => {
          'use strict';
          e.exports = function (e, t) {
            if (t.styleSheet) t.styleSheet.cssText = e;
            else {
              for (; t.firstChild; ) t.removeChild(t.firstChild);
              t.appendChild(document.createTextNode(e));
            }
          };
        },
        370: (e) => {
          e.exports =
            '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 25 15"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path></svg>';
        },
      },
      t = {};
    function r(n) {
      var o = t[n];
      if (void 0 !== o) return o.exports;
      var a = (t[n] = { id: n, exports: {} });
      return e[n](a, a.exports, r), a.exports;
    }
    (r.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return r.d(t, { a: t }), t;
    }),
      (r.d = (e, t) => {
        for (var n in t)
          r.o(t, n) &&
            !r.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
    var n = {};
    return (
      (() => {
        'use strict';
        r.d(n, { default: () => y });
        var e = r(379),
          t = r.n(e),
          o = r(795),
          a = r.n(o),
          i = r(569),
          s = r.n(i),
          c = r(565),
          u = r.n(c),
          l = r(216),
          d = r.n(l),
          p = r(589),
          f = r.n(p),
          v = r(424),
          h = {};
        (h.styleTagTransform = f()),
          (h.setAttributes = u()),
          (h.insert = s().bind(null, 'head')),
          (h.domAPI = a()),
          (h.insertStyleElement = d()),
          t()(v.Z, h),
          v.Z && v.Z.locals && v.Z.locals;
        var m = r(370),
          g = r.n(m);
        class y {
          static get toolbox() {
            return { title: 'Toggle', icon: g() };
          }
          constructor({ data: e }) {
            (this.data = { text: e.text || '' }), (this.wrapper = void 0);
          }
          render() {
            (this.wrapper = document.createElement('div')),
              this.wrapper.classList.add('toggle-block'),
              (this.wrapper.innerHTML = g());
            const e = document.createElement('div');
            return (
              e.classList.add('toggle-input'),
              (e.contentEditable = !0),
              (e.innerHTML = this.data.text || ''),
              this.wrapper.appendChild(e),
              this.wrapper
            );
          }
          save(e) {
            const t = e.querySelector('div');
            return Object.assign(this.data, { text: t.innerHTML });
          }
          validate(e) {
            return !!e.text.trim();
          }
        }
      })(),
      n.default
    );
  })();
});

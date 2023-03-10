!(function(e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).Terminal = e();
  }
})(function() {
  return (function s(o, a, l) {
    function h(t, e) {
      if (!a[t]) {
        if (!o[t]) {
          var i = "function" == typeof require && require;
          if (!e && i) return i(t, !0);
          if (c) return c(t, !0);
          var r = new Error("Cannot find module '" + t + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        var n = (a[t] = { exports: {} });
        o[t][0].call(
          n.exports,
          function(e) {
            return h(o[t][1][e] || e);
          },
          n,
          n.exports,
          s,
          o,
          a,
          l
        );
      }
      return a[t].exports;
    }
    for (
      var c = "function" == typeof require && require, e = 0;
      e < l.length;
      e++
    )
      h(l[e]);
    return h;
  })(
    {
      1: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            l = e("./Strings"),
            o = e("./common/Platform"),
            a = e("./ui/RenderDebouncer"),
            h = e("./ui/Lifecycle"),
            c = e("./common/Lifecycle"),
            u = e("./ui/ScreenDprMonitor"),
            f = ((s = c.Disposable),
            n(_, s),
            (_.prototype.dispose = function() {
              s.prototype.dispose.call(this),
                this._terminal.element.removeChild(this._accessibilityTreeRoot),
                (this._rowElements.length = 0);
            }),
            (_.prototype._onBoundaryFocus = function(e, t) {
              var i = e.target,
                r = this._rowElements[
                  0 === t ? 1 : this._rowElements.length - 2
                ];
              if (
                i.getAttribute("aria-posinset") !==
                  (0 === t ? "1" : "" + this._terminal.buffer.lines.length) &&
                e.relatedTarget === r
              ) {
                var n, s;
                if (
                  (0 === t
                    ? ((n = i),
                      (s = this._rowElements.pop()),
                      this._rowContainer.removeChild(s))
                    : ((n = this._rowElements.shift()),
                      (s = i),
                      this._rowContainer.removeChild(n)),
                  n.removeEventListener(
                    "focus",
                    this._topBoundaryFocusListener
                  ),
                  s.removeEventListener(
                    "focus",
                    this._bottomBoundaryFocusListener
                  ),
                  0 === t)
                ) {
                  var o = this._createAccessibilityTreeNode();
                  this._rowElements.unshift(o),
                    this._rowContainer.insertAdjacentElement("afterbegin", o);
                } else
                  (o = this._createAccessibilityTreeNode()),
                    this._rowElements.push(o),
                    this._rowContainer.appendChild(o);
                this._rowElements[0].addEventListener(
                  "focus",
                  this._topBoundaryFocusListener
                ),
                  this._rowElements[
                    this._rowElements.length - 1
                  ].addEventListener(
                    "focus",
                    this._bottomBoundaryFocusListener
                  ),
                  this._terminal.scrollLines(0 === t ? -1 : 1),
                  this._rowElements[
                    0 === t ? 1 : this._rowElements.length - 2
                  ].focus(),
                  e.preventDefault(),
                  e.stopImmediatePropagation();
              }
            }),
            (_.prototype._onResize = function(e) {
              this._rowElements[
                this._rowElements.length - 1
              ].removeEventListener("focus", this._bottomBoundaryFocusListener);
              for (
                var t = this._rowContainer.children.length;
                t < this._terminal.rows;
                t++
              )
                (this._rowElements[t] = this._createAccessibilityTreeNode()),
                  this._rowContainer.appendChild(this._rowElements[t]);
              for (; this._rowElements.length > e; )
                this._rowContainer.removeChild(this._rowElements.pop());
              this._rowElements[this._rowElements.length - 1].addEventListener(
                "focus",
                this._bottomBoundaryFocusListener
              ),
                this._refreshRowsDimensions();
            }),
            (_.prototype._createAccessibilityTreeNode = function() {
              var e = document.createElement("div");
              return (
                e.setAttribute("role", "listitem"),
                (e.tabIndex = -1),
                this._refreshRowDimensions(e),
                e
              );
            }),
            (_.prototype._onTab = function(e) {
              for (var t = 0; t < e; t++) this._onChar(" ");
            }),
            (_.prototype._onChar = function(e) {
              var t = this;
              this._liveRegionLineCount < 21 &&
                (0 < this._charsToConsume.length
                  ? this._charsToConsume.shift() !== e &&
                    (this._charsToAnnounce += e)
                  : (this._charsToAnnounce += e),
                "\n" === e &&
                  (this._liveRegionLineCount++,
                  21 === this._liveRegionLineCount &&
                    (this._liveRegion.textContent += l.tooMuchOutput)),
                o.isMac &&
                  this._liveRegion.textContent &&
                  0 < this._liveRegion.textContent.length &&
                  !this._liveRegion.parentNode &&
                  setTimeout(function() {
                    t._accessibilityTreeRoot.appendChild(t._liveRegion);
                  }, 0));
            }),
            (_.prototype._clearLiveRegion = function() {
              (this._liveRegion.textContent = ""),
                (this._liveRegionLineCount = 0),
                o.isMac &&
                  this._liveRegion.parentNode &&
                  this._accessibilityTreeRoot.removeChild(this._liveRegion);
            }),
            (_.prototype._onKey = function(e) {
              this._clearLiveRegion(), this._charsToConsume.push(e);
            }),
            (_.prototype._refreshRows = function(e, t) {
              this._renderRowsDebouncer.refresh(e, t, this._terminal.rows);
            }),
            (_.prototype._renderRows = function(e, t) {
              for (
                var i = this._terminal.buffer,
                  r = i.lines.length.toString(),
                  n = e;
                n <= t;
                n++
              ) {
                var s = i.translateBufferLineToString(i.ydisp + n, !0),
                  o = (i.ydisp + n + 1).toString(),
                  a = this._rowElements[n];
                a &&
                  ((a.textContent = 0 === s.length ? l.blankLine : s),
                  a.setAttribute("aria-posinset", o),
                  a.setAttribute("aria-setsize", r));
              }
              this._announceCharacters();
            }),
            (_.prototype._refreshRowsDimensions = function() {
              if (this._dimensions.actualCellHeight) {
                this._rowElements.length !== this._terminal.rows &&
                  this._onResize(this._terminal.rows);
                for (var e = 0; e < this._terminal.rows; e++)
                  this._refreshRowDimensions(this._rowElements[e]);
              }
            }),
            (_.prototype.setDimensions = function(e) {
              (this._dimensions = e), this._refreshRowsDimensions();
            }),
            (_.prototype._refreshRowDimensions = function(e) {
              e.style.height = this._dimensions.actualCellHeight + "px";
            }),
            (_.prototype._announceCharacters = function() {
              0 !== this._charsToAnnounce.length &&
                ((this._liveRegion.textContent += this._charsToAnnounce),
                (this._charsToAnnounce = ""));
            }),
            _);
          function _(e, t) {
            var i = s.call(this) || this;
            (i._terminal = e),
              (i._dimensions = t),
              (i._liveRegionLineCount = 0),
              (i._charsToConsume = []),
              (i._charsToAnnounce = ""),
              (i._accessibilityTreeRoot = document.createElement("div")),
              i._accessibilityTreeRoot.classList.add("xterm-accessibility"),
              (i._rowContainer = document.createElement("div")),
              i._rowContainer.classList.add("xterm-accessibility-tree"),
              (i._rowElements = []);
            for (var r = 0; r < i._terminal.rows; r++)
              (i._rowElements[r] = i._createAccessibilityTreeNode()),
                i._rowContainer.appendChild(i._rowElements[r]);
            return (
              (i._topBoundaryFocusListener = function(e) {
                return i._onBoundaryFocus(e, 0);
              }),
              (i._bottomBoundaryFocusListener = function(e) {
                return i._onBoundaryFocus(e, 1);
              }),
              i._rowElements[0].addEventListener(
                "focus",
                i._topBoundaryFocusListener
              ),
              i._rowElements[i._rowElements.length - 1].addEventListener(
                "focus",
                i._bottomBoundaryFocusListener
              ),
              i._refreshRowsDimensions(),
              i._accessibilityTreeRoot.appendChild(i._rowContainer),
              (i._renderRowsDebouncer = new a.RenderDebouncer(
                i._renderRows.bind(i)
              )),
              i._refreshRows(),
              (i._liveRegion = document.createElement("div")),
              i._liveRegion.classList.add("live-region"),
              i._liveRegion.setAttribute("aria-live", "assertive"),
              i._accessibilityTreeRoot.appendChild(i._liveRegion),
              i._terminal.element.insertAdjacentElement(
                "afterbegin",
                i._accessibilityTreeRoot
              ),
              i.register(i._renderRowsDebouncer),
              i.register(
                i._terminal.onResize(function(e) {
                  return i._onResize(e.rows);
                })
              ),
              i.register(
                i._terminal.onRender(function(e) {
                  return i._refreshRows(e.start, e.end);
                })
              ),
              i.register(
                i._terminal.onScroll(function() {
                  return i._refreshRows();
                })
              ),
              i.register(
                i._terminal.addDisposableListener("a11y.char", function(e) {
                  return i._onChar(e);
                })
              ),
              i.register(
                i._terminal.onLineFeed(function() {
                  return i._onChar("\n");
                })
              ),
              i.register(
                i._terminal.addDisposableListener("a11y.tab", function(e) {
                  return i._onTab(e);
                })
              ),
              i.register(
                i._terminal.onKey(function(e) {
                  return i._onKey(e.key);
                })
              ),
              i.register(
                i._terminal.addDisposableListener("blur", function() {
                  return i._clearLiveRegion();
                })
              ),
              (i._screenDprMonitor = new u.ScreenDprMonitor()),
              i.register(i._screenDprMonitor),
              i._screenDprMonitor.setListener(function() {
                return i._refreshRowsDimensions();
              }),
              i.register(
                h.addDisposableDomListener(window, "resize", function() {
                  return i._refreshRowsDimensions();
                })
              ),
              i
            );
          }
          i.AccessibilityManager = f;
        },
        {
          "./Strings": 16,
          "./common/Lifecycle": 24,
          "./common/Platform": 25,
          "./ui/Lifecycle": 59,
          "./ui/RenderDebouncer": 60,
          "./ui/ScreenDprMonitor": 61
        }
      ],
      2: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("./common/CircularList"),
            H = e("./core/buffer/BufferLine"),
            O = e("./core/buffer/BufferReflow"),
            n = e("./core/buffer/Marker");
          i.MAX_BUFFER_SIZE = 4294967295;
          var s = ((o.prototype.getNullCell = function(e) {
            return (
              e
                ? ((this._nullCell.fg = e.fg), (this._nullCell.bg = e.bg))
                : ((this._nullCell.fg = 0), (this._nullCell.bg = 0)),
              this._nullCell
            );
          }),
          (o.prototype.getWhitespaceCell = function(e) {
            return (
              e
                ? ((this._whitespaceCell.fg = e.fg),
                  (this._whitespaceCell.bg = e.bg))
                : ((this._whitespaceCell.fg = 0),
                  (this._whitespaceCell.bg = 0)),
              this._whitespaceCell
            );
          }),
          (o.prototype.getBlankLine = function(e, t) {
            return new H.BufferLine(
              this._terminal.cols,
              this.getNullCell(e),
              t
            );
          }),
          Object.defineProperty(o.prototype, "hasScrollback", {
            get: function() {
              return this._hasScrollback && this.lines.maxLength > this._rows;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(o.prototype, "isCursorInViewport", {
            get: function() {
              var e = this.ybase + this.y - this.ydisp;
              return 0 <= e && e < this._rows;
            },
            enumerable: !0,
            configurable: !0
          }),
          (o.prototype._getCorrectBufferLength = function(e) {
            if (!this._hasScrollback) return e;
            var t = e + this._terminal.options.scrollback;
            return t > i.MAX_BUFFER_SIZE ? i.MAX_BUFFER_SIZE : t;
          }),
          (o.prototype.fillViewportRows = function(e) {
            if (0 === this.lines.length) {
              void 0 === e && (e = H.DEFAULT_ATTR_DATA);
              for (var t = this._rows; t--; )
                this.lines.push(this.getBlankLine(e));
            }
          }),
          (o.prototype.clear = function() {
            (this.ydisp = 0),
              (this.ybase = 0),
              (this.y = 0),
              (this.x = 0),
              (this.lines = new r.CircularList(
                this._getCorrectBufferLength(this._rows)
              )),
              (this.scrollTop = 0),
              (this.scrollBottom = this._rows - 1),
              this.setupTabStops();
          }),
          (o.prototype.resize = function(e, t) {
            var i = this.getNullCell(H.DEFAULT_ATTR_DATA),
              r = this._getCorrectBufferLength(t);
            if (
              (r > this.lines.maxLength && (this.lines.maxLength = r),
              0 < this.lines.length)
            ) {
              if (this._cols < e)
                for (var n = 0; n < this.lines.length; n++)
                  this.lines.get(n).resize(e, i);
              var s = 0;
              if (this._rows < t)
                for (var o = this._rows; o < t; o++)
                  this.lines.length < t + this.ybase &&
                    (0 < this.ybase &&
                    this.lines.length <= this.ybase + this.y + s + 1
                      ? (this.ybase--, s++, 0 < this.ydisp && this.ydisp--)
                      : this.lines.push(new H.BufferLine(e, i)));
              else
                for (o = this._rows; t < o; o--)
                  this.lines.length > t + this.ybase &&
                    (this.lines.length > this.ybase + this.y + 1
                      ? this.lines.pop()
                      : (this.ybase++, this.ydisp++));
              if (r < this.lines.maxLength) {
                var a = this.lines.length - r;
                0 < a &&
                  (this.lines.trimStart(a),
                  (this.ybase = Math.max(this.ybase - a, 0)),
                  (this.ydisp = Math.max(this.ydisp - a, 0))),
                  (this.lines.maxLength = r);
              }
              (this.x = Math.min(this.x, e - 1)),
                (this.y = Math.min(this.y, t - 1)),
                s && (this.y += s),
                (this.savedY = Math.min(this.savedY, t - 1)),
                (this.savedX = Math.min(this.savedX, e - 1)),
                (this.scrollTop = 0);
            }
            if (
              ((this.scrollBottom = t - 1),
              this._isReflowEnabled && (this._reflow(e, t), this._cols > e))
            )
              for (n = 0; n < this.lines.length; n++)
                this.lines.get(n).resize(e, i);
            (this._cols = e), (this._rows = t);
          }),
          Object.defineProperty(o.prototype, "_isReflowEnabled", {
            get: function() {
              return this._hasScrollback && !this._terminal.options.windowsMode;
            },
            enumerable: !0,
            configurable: !0
          }),
          (o.prototype._reflow = function(e, t) {
            this._cols !== e &&
              (e > this._cols
                ? this._reflowLarger(e, t)
                : this._reflowSmaller(e, t));
          }),
          (o.prototype._reflowLarger = function(e, t) {
            var i = O.reflowLargerGetLinesToRemove(
              this.lines,
              this._cols,
              e,
              this.ybase + this.y,
              this.getNullCell(H.DEFAULT_ATTR_DATA)
            );
            if (0 < i.length) {
              var r = O.reflowLargerCreateNewLayout(this.lines, i);
              O.reflowLargerApplyNewLayout(this.lines, r.layout),
                this._reflowLargerAdjustViewport(e, t, r.countRemoved);
            }
          }),
          (o.prototype._reflowLargerAdjustViewport = function(e, t, i) {
            for (
              var r = this.getNullCell(H.DEFAULT_ATTR_DATA), n = i;
              0 < n--;

            )
              0 === this.ybase
                ? (0 < this.y && this.y--,
                  this.lines.length < t &&
                    this.lines.push(new H.BufferLine(e, r)))
                : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
          }),
          (o.prototype._reflowSmaller = function(e, t) {
            for (
              var i = this.getNullCell(H.DEFAULT_ATTR_DATA),
                r = [],
                n = 0,
                s = this.lines.length - 1;
              0 <= s;
              s--
            ) {
              var o = this.lines.get(s);
              if (!(!o || (!o.isWrapped && o.getTrimmedLength() <= e))) {
                for (var a = [o]; o.isWrapped && 0 < s; )
                  (o = this.lines.get(--s)), a.unshift(o);
                var l = this.ybase + this.y;
                if (!(s <= l && l < s + a.length)) {
                  var h = a[a.length - 1].getTrimmedLength(),
                    c = O.reflowSmallerGetNewLineLengths(a, this._cols, e),
                    u = c.length - a.length,
                    f = void 0;
                  f =
                    0 === this.ybase && this.y !== this.lines.length - 1
                      ? Math.max(0, this.y - this.lines.maxLength + u)
                      : Math.max(
                          0,
                          this.lines.length - this.lines.maxLength + u
                        );
                  for (var _ = [], d = 0; d < u; d++) {
                    var p = this.getBlankLine(H.DEFAULT_ATTR_DATA, !0);
                    _.push(p);
                  }
                  0 < _.length &&
                    (r.push({ start: s + a.length + n, newLines: _ }),
                    (n += _.length)),
                    a.push.apply(a, _);
                  var m = c.length - 1,
                    y = c[m];
                  0 === y && (y = c[--m]);
                  for (var g = a.length - u - 1, C = h; 0 <= g; ) {
                    var v = Math.min(C, y);
                    if (
                      (a[m].copyCellsFrom(a[g], C - v, y - v, v, !0),
                      0 == (y -= v) && (y = c[--m]),
                      0 == (C -= v))
                    ) {
                      g--;
                      var b = Math.max(g, 0);
                      C = O.getWrappedLineTrimmedLength(a, b, this._cols);
                    }
                  }
                  for (d = 0; d < a.length; d++)
                    c[d] < e && a[d].setCell(c[d], i);
                  for (var w = u - f; 0 < w--; )
                    0 === this.ybase
                      ? this.y < t - 1
                        ? (this.y++, this.lines.pop())
                        : (this.ybase++, this.ydisp++)
                      : this.ybase <
                          Math.min(
                            this.lines.maxLength,
                            this.lines.length + n
                          ) -
                            t &&
                        (this.ybase === this.ydisp && this.ydisp++,
                        this.ybase++);
                }
              }
            }
            if (0 < r.length) {
              var S = [],
                E = [];
              for (d = 0; d < this.lines.length; d++) E.push(this.lines.get(d));
              var L = this.lines.length,
                A = L - 1,
                x = 0,
                T = r[x];
              this.lines.length = Math.min(
                this.lines.maxLength,
                this.lines.length + n
              );
              var M = 0;
              for (
                d = Math.min(this.lines.maxLength - 1, L + n - 1);
                0 <= d;
                d--
              )
                if (T && T.start > A + M) {
                  for (var R = T.newLines.length - 1; 0 <= R; R--)
                    this.lines.set(d--, T.newLines[R]);
                  d++,
                    S.push({ index: A + 1, amount: T.newLines.length }),
                    (M += T.newLines.length),
                    (T = r[++x]);
                } else this.lines.set(d, E[A--]);
              var k = 0;
              for (d = S.length - 1; 0 <= d; d--)
                (S[d].index += k),
                  this.lines.onInsertEmitter.fire(S[d]),
                  (k += S[d].amount);
              var D = Math.max(0, L + n - this.lines.maxLength);
              0 < D && this.lines.onTrimEmitter.fire(D);
            }
          }),
          (o.prototype.stringIndexToBufferIndex = function(e, t, i) {
            for (void 0 === i && (i = !1); t; ) {
              var r = this.lines.get(e);
              if (!r) return [-1, -1];
              for (
                var n = i ? r.getTrimmedLength() : r.length, s = 0;
                s < n;
                ++s
              )
                if (
                  (r.get(s)[H.CHAR_DATA_WIDTH_INDEX] &&
                    (t -= r.get(s)[H.CHAR_DATA_CHAR_INDEX].length || 1),
                  t < 0)
                )
                  return [e, s];
              e++;
            }
            return [e, 0];
          }),
          (o.prototype.translateBufferLineToString = function(e, t, i, r) {
            void 0 === i && (i = 0);
            var n = this.lines.get(e);
            return n ? n.translateToString(t, i, r) : "";
          }),
          (o.prototype.getWrappedRangeForLine = function(e) {
            for (var t = e, i = e; 0 < t && this.lines.get(t).isWrapped; ) t--;
            for (
              ;
              i + 1 < this.lines.length && this.lines.get(i + 1).isWrapped;

            )
              i++;
            return { first: t, last: i };
          }),
          (o.prototype.setupTabStops = function(e) {
            for (
              null != e
                ? this.tabs[e] || (e = this.prevStop(e))
                : ((this.tabs = {}), (e = 0));
              e < this._cols;
              e += this._terminal.options.tabStopWidth
            )
              this.tabs[e] = !0;
          }),
          (o.prototype.prevStop = function(e) {
            for (null == e && (e = this.x); !this.tabs[--e] && 0 < e; );
            return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
          }),
          (o.prototype.nextStop = function(e) {
            for (
              null == e && (e = this.x);
              !this.tabs[++e] && e < this._cols;

            );
            return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
          }),
          (o.prototype.addMarker = function(e) {
            var t = this,
              i = new n.Marker(e);
            return (
              this.markers.push(i),
              i.register(
                this.lines.onTrim(function(e) {
                  (i.line -= e), i.line < 0 && i.dispose();
                })
              ),
              i.register(
                this.lines.onInsert(function(e) {
                  i.line >= e.index && (i.line += e.amount);
                })
              ),
              i.register(
                this.lines.onDelete(function(e) {
                  i.line >= e.index &&
                    i.line < e.index + e.amount &&
                    i.dispose(),
                    i.line > e.index && (i.line -= e.amount);
                })
              ),
              i.register(
                i.onDispose(function() {
                  return t._removeMarker(i);
                })
              ),
              i
            );
          }),
          (o.prototype._removeMarker = function(e) {
            this.markers.splice(this.markers.indexOf(e), 1);
          }),
          (o.prototype.iterator = function(e, t, i, r, n) {
            return new a(this, e, t, i, r, n);
          }),
          o);
          function o(e, t) {
            (this._terminal = e),
              (this._hasScrollback = t),
              (this.savedCurAttrData = H.DEFAULT_ATTR_DATA.clone()),
              (this.markers = []),
              (this._nullCell = H.CellData.fromCharData([
                0,
                H.NULL_CELL_CHAR,
                H.NULL_CELL_WIDTH,
                H.NULL_CELL_CODE
              ])),
              (this._whitespaceCell = H.CellData.fromCharData([
                0,
                H.WHITESPACE_CELL_CHAR,
                H.WHITESPACE_CELL_WIDTH,
                H.WHITESPACE_CELL_CODE
              ])),
              (this._cols = this._terminal.cols),
              (this._rows = this._terminal.rows),
              this.clear();
          }
          i.Buffer = s;
          var a = ((l.prototype.hasNext = function() {
            return this._current < this._endIndex;
          }),
          (l.prototype.next = function() {
            var e = this._buffer.getWrappedRangeForLine(this._current);
            e.first < this._startIndex - this._startOverscan &&
              (e.first = this._startIndex - this._startOverscan),
              e.last > this._endIndex + this._endOverscan &&
                (e.last = this._endIndex + this._endOverscan),
              (e.first = Math.max(e.first, 0)),
              (e.last = Math.min(e.last, this._buffer.lines.length));
            for (var t = "", i = e.first; i <= e.last; ++i)
              t += this._buffer.translateBufferLineToString(i, this._trimRight);
            return (this._current = e.last + 1), { range: e, content: t };
          }),
          l);
          function l(e, t, i, r, n, s) {
            void 0 === i && (i = 0),
              void 0 === r && (r = e.lines.length),
              void 0 === n && (n = 0),
              void 0 === s && (s = 0),
              (this._buffer = e),
              (this._trimRight = t),
              (this._startIndex = i),
              (this._endIndex = r),
              (this._startOverscan = n),
              (this._endOverscan = s),
              this._startIndex < 0 && (this._startIndex = 0),
              this._endIndex > this._buffer.lines.length &&
                (this._endIndex = this._buffer.lines.length),
              (this._current = this._startIndex);
          }
          i.BufferStringIterator = a;
        },
        {
          "./common/CircularList": 20,
          "./core/buffer/BufferLine": 29,
          "./core/buffer/BufferReflow": 30,
          "./core/buffer/Marker": 31
        }
      ],
      3: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("./Buffer"),
            n = e("./common/EventEmitter2"),
            s = (Object.defineProperty(o.prototype, "onBufferActivate", {
              get: function() {
                return this._onBufferActivate.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(o.prototype, "alt", {
              get: function() {
                return this._alt;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(o.prototype, "active", {
              get: function() {
                return this._activeBuffer;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(o.prototype, "normal", {
              get: function() {
                return this._normal;
              },
              enumerable: !0,
              configurable: !0
            }),
            (o.prototype.activateNormalBuffer = function() {
              this._activeBuffer !== this._normal &&
                ((this._normal.x = this._alt.x),
                (this._normal.y = this._alt.y),
                this._alt.clear(),
                (this._activeBuffer = this._normal),
                this._onBufferActivate.fire({
                  activeBuffer: this._normal,
                  inactiveBuffer: this._alt
                }));
            }),
            (o.prototype.activateAltBuffer = function(e) {
              this._activeBuffer !== this._alt &&
                (this._alt.fillViewportRows(e),
                (this._alt.x = this._normal.x),
                (this._alt.y = this._normal.y),
                (this._activeBuffer = this._alt),
                this._onBufferActivate.fire({
                  activeBuffer: this._alt,
                  inactiveBuffer: this._normal
                }));
            }),
            (o.prototype.resize = function(e, t) {
              this._normal.resize(e, t), this._alt.resize(e, t);
            }),
            (o.prototype.setupTabStops = function(e) {
              this._normal.setupTabStops(e), this._alt.setupTabStops(e);
            }),
            o);
          function o(e) {
            (this._terminal = e),
              (this._onBufferActivate = new n.EventEmitter2()),
              (this._normal = new r.Buffer(this._terminal, !0)),
              this._normal.fillViewportRows(),
              (this._alt = new r.Buffer(this._terminal, !1)),
              (this._activeBuffer = this._normal),
              this.setupTabStops();
          }
          i.BufferSet = s;
        },
        { "./Buffer": 2, "./common/EventEmitter2": 23 }
      ],
      4: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("./common/EventEmitter2"),
            n = (Object.defineProperty(s.prototype, "onCharSizeChanged", {
              get: function() {
                return this._onCharSizeChanged.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(s.prototype, "width", {
              get: function() {
                return this._width;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(s.prototype, "height", {
              get: function() {
                return this._height;
              },
              enumerable: !0,
              configurable: !0
            }),
            (s.prototype.measure = function(e) {
              (this._measureElement.style.fontFamily = e.fontFamily),
                (this._measureElement.style.fontSize = e.fontSize + "px");
              var t = this._measureElement.getBoundingClientRect();
              if (0 !== t.width && 0 !== t.height) {
                var i = Math.ceil(t.height);
                (this._width === t.width && this._height === i) ||
                  ((this._width = t.width),
                  (this._height = i),
                  this._onCharSizeChanged.fire());
              }
            }),
            s);
          function s(e, t) {
            (this._onCharSizeChanged = new r.EventEmitter2()),
              (this._document = e),
              (this._parentElement = t),
              (this._measureElement = this._document.createElement("span")),
              this._measureElement.classList.add("xterm-char-measure-element"),
              (this._measureElement.textContent = "W"),
              this._measureElement.setAttribute("aria-hidden", "true"),
              this._parentElement.appendChild(this._measureElement);
          }
          i.CharMeasure = n;
        },
        { "./common/EventEmitter2": 23 }
      ],
      5: [
        function(e, t, o) {
          "use strict";
          Object.defineProperty(o, "__esModule", { value: !0 });
          var a = e("./common/TypedArrayUtils");
          (o.wcwidth = (function(e) {
            var t = [
                [768, 879],
                [1155, 1158],
                [1160, 1161],
                [1425, 1469],
                [1471, 1471],
                [1473, 1474],
                [1476, 1477],
                [1479, 1479],
                [1536, 1539],
                [1552, 1557],
                [1611, 1630],
                [1648, 1648],
                [1750, 1764],
                [1767, 1768],
                [1770, 1773],
                [1807, 1807],
                [1809, 1809],
                [1840, 1866],
                [1958, 1968],
                [2027, 2035],
                [2305, 2306],
                [2364, 2364],
                [2369, 2376],
                [2381, 2381],
                [2385, 2388],
                [2402, 2403],
                [2433, 2433],
                [2492, 2492],
                [2497, 2500],
                [2509, 2509],
                [2530, 2531],
                [2561, 2562],
                [2620, 2620],
                [2625, 2626],
                [2631, 2632],
                [2635, 2637],
                [2672, 2673],
                [2689, 2690],
                [2748, 2748],
                [2753, 2757],
                [2759, 2760],
                [2765, 2765],
                [2786, 2787],
                [2817, 2817],
                [2876, 2876],
                [2879, 2879],
                [2881, 2883],
                [2893, 2893],
                [2902, 2902],
                [2946, 2946],
                [3008, 3008],
                [3021, 3021],
                [3134, 3136],
                [3142, 3144],
                [3146, 3149],
                [3157, 3158],
                [3260, 3260],
                [3263, 3263],
                [3270, 3270],
                [3276, 3277],
                [3298, 3299],
                [3393, 3395],
                [3405, 3405],
                [3530, 3530],
                [3538, 3540],
                [3542, 3542],
                [3633, 3633],
                [3636, 3642],
                [3655, 3662],
                [3761, 3761],
                [3764, 3769],
                [3771, 3772],
                [3784, 3789],
                [3864, 3865],
                [3893, 3893],
                [3895, 3895],
                [3897, 3897],
                [3953, 3966],
                [3968, 3972],
                [3974, 3975],
                [3984, 3991],
                [3993, 4028],
                [4038, 4038],
                [4141, 4144],
                [4146, 4146],
                [4150, 4151],
                [4153, 4153],
                [4184, 4185],
                [4448, 4607],
                [4959, 4959],
                [5906, 5908],
                [5938, 5940],
                [5970, 5971],
                [6002, 6003],
                [6068, 6069],
                [6071, 6077],
                [6086, 6086],
                [6089, 6099],
                [6109, 6109],
                [6155, 6157],
                [6313, 6313],
                [6432, 6434],
                [6439, 6440],
                [6450, 6450],
                [6457, 6459],
                [6679, 6680],
                [6912, 6915],
                [6964, 6964],
                [6966, 6970],
                [6972, 6972],
                [6978, 6978],
                [7019, 7027],
                [7616, 7626],
                [7678, 7679],
                [8203, 8207],
                [8234, 8238],
                [8288, 8291],
                [8298, 8303],
                [8400, 8431],
                [12330, 12335],
                [12441, 12442],
                [43014, 43014],
                [43019, 43019],
                [43045, 43046],
                [64286, 64286],
                [65024, 65039],
                [65056, 65059],
                [65279, 65279],
                [65529, 65531]
              ],
              i = [
                [68097, 68099],
                [68101, 68102],
                [68108, 68111],
                [68152, 68154],
                [68159, 68159],
                [119143, 119145],
                [119155, 119170],
                [119173, 119179],
                [119210, 119213],
                [119362, 119364],
                [917505, 917505],
                [917536, 917631],
                [917760, 917999]
              ];
            var r = 0 | e.control,
              n = new Uint8Array(65536);
            a.fill(n, 1),
              (n[0] = e.nul),
              a.fill(n, e.control, 1, 32),
              a.fill(n, e.control, 127, 160),
              a.fill(n, 2, 4352, 4448),
              (n[9001] = 2),
              (n[9002] = 2),
              a.fill(n, 2, 11904, 42192),
              (n[12351] = 1),
              a.fill(n, 2, 44032, 55204),
              a.fill(n, 2, 63744, 64256),
              a.fill(n, 2, 65040, 65050),
              a.fill(n, 2, 65072, 65136),
              a.fill(n, 2, 65280, 65377),
              a.fill(n, 2, 65504, 65511);
            for (var s = 0; s < t.length; ++s)
              a.fill(n, 0, t[s][0], t[s][1] + 1);
            return function(e) {
              return e < 32
                ? 0 | r
                : e < 127
                ? 1
                : e < 65536
                ? n[e]
                : (function(e) {
                    return (function(e, t) {
                      var i,
                        r = 0,
                        n = t.length - 1;
                      if (e < t[0][0] || e > t[n][1]) return !1;
                      for (; r <= n; )
                        if (e > t[(i = (r + n) >> 1)][1]) r = 1 + i;
                        else {
                          if (!(e < t[i][0])) return !0;
                          n = i - 1;
                        }
                      return !1;
                    })(e, i)
                      ? 0
                      : (131072 <= e && e <= 196605) ||
                        (196608 <= e && e <= 262141)
                      ? 2
                      : 1;
                  })(e);
            };
          })({ nul: 0, control: 0 })),
            (o.getStringCellWidth = function(e) {
              for (var t = 0, i = e.length, r = 0; r < i; ++r) {
                var n = e.charCodeAt(r);
                if (55296 <= n && n <= 56319) {
                  if (++r >= i) return t + o.wcwidth(n);
                  var s = e.charCodeAt(r);
                  56320 <= s && s <= 57343
                    ? (n = 1024 * (n - 55296) + s - 56320 + 65536)
                    : (t += o.wcwidth(s));
                }
                t += o.wcwidth(n);
              }
              return t;
            });
        },
        { "./common/TypedArrayUtils": 26 }
      ],
      6: [
        function(e, t, i) {
          "use strict";
          function r(e) {
            return e.replace(/\r?\n/g, "\r");
          }
          function n(e, t) {
            return t ? "[200~" + e + "[201~" : e;
          }
          function s(e, t) {
            var i = t.screenElement.getBoundingClientRect(),
              r = e.clientX - i.left - 10,
              n = e.clientY - i.top - 10;
            (t.textarea.style.position = "absolute"),
              (t.textarea.style.width = "20px"),
              (t.textarea.style.height = "20px"),
              (t.textarea.style.left = r + "px"),
              (t.textarea.style.top = n + "px"),
              (t.textarea.style.zIndex = "1000"),
              t.textarea.focus(),
              setTimeout(function() {
                (t.textarea.style.position = null),
                  (t.textarea.style.width = null),
                  (t.textarea.style.height = null),
                  (t.textarea.style.left = null),
                  (t.textarea.style.top = null),
                  (t.textarea.style.zIndex = null);
              }, 200);
          }
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.prepareTextForTerminal = r),
            (i.bracketTextForPaste = n),
            (i.copyHandler = function(e, t, i) {
              t.browser.isMSIE
                ? window.clipboardData.setData("Text", i.selectionText)
                : e.clipboardData.setData("text/plain", i.selectionText),
                e.preventDefault();
            }),
            (i.pasteHandler = function(t, i) {
              function e(e) {
                (e = n((e = r(e)), i.bracketedPasteMode)),
                  i.handler(e),
                  (i.textarea.value = ""),
                  i.emit("paste", e),
                  i.cancel(t);
              }
              t.stopPropagation(),
                i.browser.isMSIE
                  ? window.clipboardData &&
                    e(window.clipboardData.getData("Text"))
                  : t.clipboardData && e(t.clipboardData.getData("text/plain"));
            }),
            (i.moveTextAreaUnderMouseCursor = s),
            (i.rightClickHandler = function(e, t, i, r) {
              s(e, t),
                r && !i.isClickInSelection(e) && i.selectWordAtCursor(e),
                (t.textarea.value = i.selectionText),
                t.textarea.select();
            });
        },
        {}
      ],
      7: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((n.prototype.compositionstart = function() {
            (this._isComposing = !0),
              (this._compositionPosition.start = this._textarea.value.length),
              (this._compositionView.textContent = ""),
              this._compositionView.classList.add("active");
          }),
          (n.prototype.compositionupdate = function(e) {
            var t = this;
            (this._compositionView.textContent = e.data),
              this.updateCompositionElements(),
              setTimeout(function() {
                t._compositionPosition.end = t._textarea.value.length;
              }, 0);
          }),
          (n.prototype.compositionend = function() {
            this._finalizeComposition(!0);
          }),
          (n.prototype.keydown = function(e) {
            if (this._isComposing || this._isSendingComposition) {
              if (229 === e.keyCode) return !1;
              if (16 === e.keyCode || 17 === e.keyCode || 18 === e.keyCode)
                return !1;
              this._finalizeComposition(!1);
            }
            return 229 !== e.keyCode || (this._handleAnyTextareaChanges(), !1);
          }),
          (n.prototype._finalizeComposition = function(e) {
            var t = this;
            if (
              (this._compositionView.classList.remove("active"),
              (this._isComposing = !1),
              this._clearTextareaPosition(),
              e)
            ) {
              var i = {
                start: this._compositionPosition.start,
                end: this._compositionPosition.end
              };
              (this._isSendingComposition = !0),
                setTimeout(function() {
                  if (t._isSendingComposition) {
                    t._isSendingComposition = !1;
                    var e = void 0;
                    (e = t._isComposing
                      ? t._textarea.value.substring(i.start, i.end)
                      : t._textarea.value.substring(i.start)),
                      t._terminal.handler(e);
                  }
                }, 0);
            } else {
              this._isSendingComposition = !1;
              var r = this._textarea.value.substring(
                this._compositionPosition.start,
                this._compositionPosition.end
              );
              this._terminal.handler(r);
            }
          }),
          (n.prototype._handleAnyTextareaChanges = function() {
            var t = this,
              i = this._textarea.value;
            setTimeout(function() {
              if (!t._isComposing) {
                var e = t._textarea.value.replace(i, "");
                0 < e.length && t._terminal.handler(e);
              }
            }, 0);
          }),
          (n.prototype.updateCompositionElements = function(e) {
            var t = this;
            if (this._isComposing) {
              if (this._terminal.buffer.isCursorInViewport) {
                var i = Math.ceil(
                    this._terminal.charMeasure.height *
                      this._terminal.options.lineHeight
                  ),
                  r = this._terminal.buffer.y * i,
                  n =
                    this._terminal.buffer.x * this._terminal.charMeasure.width;
                (this._compositionView.style.left = n + "px"),
                  (this._compositionView.style.top = r + "px"),
                  (this._compositionView.style.height = i + "px"),
                  (this._compositionView.style.lineHeight = i + "px"),
                  (this._compositionView.style.fontFamily = this._terminal.options.fontFamily),
                  (this._compositionView.style.fontSize =
                    this._terminal.options.fontSize + "px");
                var s = this._compositionView.getBoundingClientRect();
                (this._textarea.style.left = n + "px"),
                  (this._textarea.style.top = r + "px"),
                  (this._textarea.style.width = s.width + "px"),
                  (this._textarea.style.height = s.height + "px"),
                  (this._textarea.style.lineHeight = s.height + "px");
              }
              e ||
                setTimeout(function() {
                  return t.updateCompositionElements(!0);
                }, 0);
            }
          }),
          (n.prototype._clearTextareaPosition = function() {
            (this._textarea.style.left = ""), (this._textarea.style.top = "");
          }),
          n);
          function n(e, t, i) {
            (this._textarea = e),
              (this._compositionView = t),
              (this._terminal = i),
              (this._isComposing = !1),
              (this._isSendingComposition = !1),
              (this._compositionPosition = { start: null, end: null });
          }
          i.CompositionHelper = r;
        },
        {}
      ],
      8: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s = e("./common/Lifecycle"),
            S = e("./core/input/TextDecoder");
          function o(e, t) {
            for (var i = t - e, r = new Array(i); i--; ) r[i] = --t;
            return r;
          }
          var a = ((l.prototype.add = function(e, t, i, r) {
            this.table[(t << 8) | e] = ((0 | i) << 4) | (void 0 === r ? t : r);
          }),
          (l.prototype.addMany = function(e, t, i, r) {
            for (var n = 0; n < e.length; n++) this.add(e[n], t, i, r);
          }),
          l);
          function l(e) {
            this.table =
              "undefined" == typeof Uint8Array
                ? new Array(e)
                : new Uint8Array(e);
          }
          i.TransitionTable = a;
          var h = o(32, 127),
            c = o(0, 24);
          c.push(25), c.push.apply(c, o(28, 32));
          i.VT500_TRANSITION_TABLE = (function() {
            var e,
              t = new a(4095),
              i = o(0, 14);
            for (e in i) for (var r = 0; r <= 160; ++r) t.add(r, e, 1, 0);
            for (e in (t.addMany(h, 0, 2, 0), i))
              t.addMany([24, 26, 153, 154], e, 3, 0),
                t.addMany(o(128, 144), e, 3, 0),
                t.addMany(o(144, 152), e, 3, 0),
                t.add(156, e, 0, 0),
                t.add(27, e, 11, 1),
                t.add(157, e, 4, 8),
                t.addMany([152, 158, 159], e, 0, 7),
                t.add(155, e, 11, 3),
                t.add(144, e, 11, 9);
            return (
              t.addMany(c, 0, 3, 0),
              t.addMany(c, 1, 3, 1),
              t.add(127, 1, 0, 1),
              t.addMany(c, 8, 0, 8),
              t.addMany(c, 3, 3, 3),
              t.add(127, 3, 0, 3),
              t.addMany(c, 4, 3, 4),
              t.add(127, 4, 0, 4),
              t.addMany(c, 6, 3, 6),
              t.addMany(c, 5, 3, 5),
              t.add(127, 5, 0, 5),
              t.addMany(c, 2, 3, 2),
              t.add(127, 2, 0, 2),
              t.add(93, 1, 4, 8),
              t.addMany(h, 8, 5, 8),
              t.add(127, 8, 5, 8),
              t.addMany([156, 27, 24, 26, 7], 8, 6, 0),
              t.addMany(o(28, 32), 8, 0, 8),
              t.addMany([88, 94, 95], 1, 0, 7),
              t.addMany(h, 7, 0, 7),
              t.addMany(c, 7, 0, 7),
              t.add(156, 7, 0, 0),
              t.add(127, 7, 0, 7),
              t.add(91, 1, 11, 3),
              t.addMany(o(64, 127), 3, 7, 0),
              t.addMany(o(48, 58), 3, 8, 4),
              t.add(59, 3, 8, 4),
              t.addMany([60, 61, 62, 63], 3, 9, 4),
              t.addMany(o(48, 58), 4, 8, 4),
              t.add(59, 4, 8, 4),
              t.addMany(o(64, 127), 4, 7, 0),
              t.addMany([58, 60, 61, 62, 63], 4, 0, 6),
              t.addMany(o(32, 64), 6, 0, 6),
              t.add(127, 6, 0, 6),
              t.addMany(o(64, 127), 6, 0, 0),
              t.add(58, 3, 0, 6),
              t.addMany(o(32, 48), 3, 9, 5),
              t.addMany(o(32, 48), 5, 9, 5),
              t.addMany(o(48, 64), 5, 0, 6),
              t.addMany(o(64, 127), 5, 7, 0),
              t.addMany(o(32, 48), 4, 9, 5),
              t.addMany(o(32, 48), 1, 9, 2),
              t.addMany(o(32, 48), 2, 9, 2),
              t.addMany(o(48, 127), 2, 10, 0),
              t.addMany(o(48, 80), 1, 10, 0),
              t.addMany(o(81, 88), 1, 10, 0),
              t.addMany([89, 90, 92], 1, 10, 0),
              t.addMany(o(96, 127), 1, 10, 0),
              t.add(80, 1, 11, 9),
              t.addMany(c, 9, 0, 9),
              t.add(127, 9, 0, 9),
              t.addMany(o(28, 32), 9, 0, 9),
              t.addMany(o(32, 48), 9, 9, 12),
              t.add(58, 9, 0, 11),
              t.addMany(o(48, 58), 9, 8, 10),
              t.add(59, 9, 8, 10),
              t.addMany([60, 61, 62, 63], 9, 9, 10),
              t.addMany(c, 11, 0, 11),
              t.addMany(o(32, 128), 11, 0, 11),
              t.addMany(o(28, 32), 11, 0, 11),
              t.addMany(c, 10, 0, 10),
              t.add(127, 10, 0, 10),
              t.addMany(o(28, 32), 10, 0, 10),
              t.addMany(o(48, 58), 10, 8, 10),
              t.add(59, 10, 8, 10),
              t.addMany([58, 60, 61, 62, 63], 10, 0, 11),
              t.addMany(o(32, 48), 10, 9, 12),
              t.addMany(c, 12, 0, 12),
              t.add(127, 12, 0, 12),
              t.addMany(o(28, 32), 12, 0, 12),
              t.addMany(o(32, 48), 12, 9, 12),
              t.addMany(o(48, 64), 12, 0, 11),
              t.addMany(o(64, 127), 12, 12, 13),
              t.addMany(o(64, 127), 10, 12, 13),
              t.addMany(o(64, 127), 9, 12, 13),
              t.addMany(c, 13, 13, 13),
              t.addMany(h, 13, 13, 13),
              t.add(127, 13, 0, 13),
              t.addMany([27, 156], 13, 14, 0),
              t.add(160, 8, 5, 8),
              t
            );
          })();
          var u = ((f.prototype.hook = function(e, t, i) {}),
          (f.prototype.put = function(e, t, i) {}),
          (f.prototype.unhook = function() {}),
          f);
          function f() {}
          var _,
            d = ((_ = s.Disposable),
            n(p, _),
            (p.prototype.dispose = function() {
              (this._printHandlerFb = null),
                (this._executeHandlerFb = null),
                (this._csiHandlerFb = null),
                (this._escHandlerFb = null),
                (this._oscHandlerFb = null),
                (this._dcsHandlerFb = null),
                (this._errorHandlerFb = null),
                (this._printHandler = null),
                (this._executeHandlers = null),
                (this._escHandlers = null),
                (this._csiHandlers = null),
                (this._oscHandlers = null),
                (this._dcsHandlers = null),
                (this._activeDcsHandler = null),
                (this._errorHandler = null);
            }),
            (p.prototype.setPrintHandler = function(e) {
              this._printHandler = e;
            }),
            (p.prototype.clearPrintHandler = function() {
              this._printHandler = this._printHandlerFb;
            }),
            (p.prototype.setExecuteHandler = function(e, t) {
              this._executeHandlers[e.charCodeAt(0)] = t;
            }),
            (p.prototype.clearExecuteHandler = function(e) {
              this._executeHandlers[e.charCodeAt(0)] &&
                delete this._executeHandlers[e.charCodeAt(0)];
            }),
            (p.prototype.setExecuteHandlerFallback = function(e) {
              this._executeHandlerFb = e;
            }),
            (p.prototype.addCsiHandler = function(e, t) {
              var i = e.charCodeAt(0);
              void 0 === this._csiHandlers[i] && (this._csiHandlers[i] = []);
              var r = this._csiHandlers[i];
              return (
                r.push(t),
                {
                  dispose: function() {
                    var e = r.indexOf(t);
                    -1 !== e && r.splice(e, 1);
                  }
                }
              );
            }),
            (p.prototype.setCsiHandler = function(e, t) {
              this._csiHandlers[e.charCodeAt(0)] = [t];
            }),
            (p.prototype.clearCsiHandler = function(e) {
              this._csiHandlers[e.charCodeAt(0)] &&
                delete this._csiHandlers[e.charCodeAt(0)];
            }),
            (p.prototype.setCsiHandlerFallback = function(e) {
              this._csiHandlerFb = e;
            }),
            (p.prototype.setEscHandler = function(e, t) {
              this._escHandlers[e] = t;
            }),
            (p.prototype.clearEscHandler = function(e) {
              this._escHandlers[e] && delete this._escHandlers[e];
            }),
            (p.prototype.setEscHandlerFallback = function(e) {
              this._escHandlerFb = e;
            }),
            (p.prototype.addOscHandler = function(e, t) {
              void 0 === this._oscHandlers[e] && (this._oscHandlers[e] = []);
              var i = this._oscHandlers[e];
              return (
                i.push(t),
                {
                  dispose: function() {
                    var e = i.indexOf(t);
                    -1 !== e && i.splice(e, 1);
                  }
                }
              );
            }),
            (p.prototype.setOscHandler = function(e, t) {
              this._oscHandlers[e] = [t];
            }),
            (p.prototype.clearOscHandler = function(e) {
              this._oscHandlers[e] && delete this._oscHandlers[e];
            }),
            (p.prototype.setOscHandlerFallback = function(e) {
              this._oscHandlerFb = e;
            }),
            (p.prototype.setDcsHandler = function(e, t) {
              this._dcsHandlers[e] = t;
            }),
            (p.prototype.clearDcsHandler = function(e) {
              this._dcsHandlers[e] && delete this._dcsHandlers[e];
            }),
            (p.prototype.setDcsHandlerFallback = function(e) {
              this._dcsHandlerFb = e;
            }),
            (p.prototype.setErrorHandler = function(e) {
              this._errorHandler = e;
            }),
            (p.prototype.clearErrorHandler = function() {
              this._errorHandler = this._errorHandlerFb;
            }),
            (p.prototype.reset = function() {
              (this.currentState = this.initialState),
                (this._osc = ""),
                (this._params = [0]),
                (this._collect = ""),
                (this._activeDcsHandler = null);
            }),
            (p.prototype.parse = function(e, t) {
              for (
                var i = 0,
                  r = 0,
                  n = !1,
                  s = this.currentState,
                  o = -1,
                  a = -1,
                  l = this._osc,
                  h = this._collect,
                  c = this._params,
                  u = this.TRANSITIONS.table,
                  f = this._activeDcsHandler,
                  _ = null,
                  d = 0;
                d < t;
                ++d
              )
                if (((i = e[d]), 0 === s && 31 < i && i < 128)) {
                  for (o = ~o ? o : d; ++d < t && 31 < e[d] && e[d] < 128; );
                  d--;
                } else if (4 === s && 47 < i && i < 57)
                  c[c.length - 1] = 10 * c[c.length - 1] + i - 48;
                else {
                  switch ((r = u[(s << 8) | (i < 160 ? i : 160)]) >> 4) {
                    case 2:
                      o = ~o ? o : d;
                      break;
                    case 3:
                      ~o && (this._printHandler(e, o, d), (o = -1)),
                        (_ = this._executeHandlers[i])
                          ? _()
                          : this._executeHandlerFb(i);
                      break;
                    case 0:
                      ~o
                        ? (this._printHandler(e, o, d), (o = -1))
                        : ~a && (f.put(e, a, d), (a = -1));
                      break;
                    case 1:
                      if (159 < i)
                        switch (s) {
                          case 0:
                            o = ~o ? o : d;
                            break;
                          case 6:
                            r |= 6;
                            break;
                          case 11:
                            r |= 11;
                            break;
                          case 13:
                            (a = ~a ? a : d), (r |= 13);
                            break;
                          default:
                            n = !0;
                        }
                      else n = !0;
                      if (n) {
                        if (
                          this._errorHandler({
                            position: d,
                            code: i,
                            currentState: s,
                            print: o,
                            dcs: a,
                            osc: l,
                            collect: h,
                            params: c,
                            abort: !1
                          }).abort
                        )
                          return;
                        n = !1;
                      }
                      break;
                    case 7:
                      for (
                        var p = this._csiHandlers[i], m = p ? p.length - 1 : -1;
                        0 <= m && !1 === p[m](c, h);
                        m--
                      );
                      m < 0 && this._csiHandlerFb(h, c, i);
                      break;
                    case 8:
                      59 === i
                        ? c.push(0)
                        : (c[c.length - 1] = 10 * c[c.length - 1] + i - 48);
                      break;
                    case 9:
                      h += String.fromCharCode(i);
                      break;
                    case 10:
                      (_ = this._escHandlers[h + String.fromCharCode(i)])
                        ? _(h, i)
                        : this._escHandlerFb(h, i);
                      break;
                    case 11:
                      ~o && (this._printHandler(e, o, d), (o = -1)),
                        (c = [0]),
                        (h = l = ""),
                        (a = -1);
                      break;
                    case 12:
                      (f =
                        (f = this._dcsHandlers[h + String.fromCharCode(i)]) ||
                        this._dcsHandlerFb).hook(h, c, i);
                      break;
                    case 13:
                      a = ~a ? a : d;
                      break;
                    case 14:
                      f && (~a && f.put(e, a, d), f.unhook(), (f = null)),
                        27 === i && (r |= 1),
                        (c = [0]),
                        (h = l = ""),
                        (a = -1);
                      break;
                    case 4:
                      ~o && (this._printHandler(e, o, d), (o = -1)), (l = "");
                      break;
                    case 5:
                      for (var y = d + 1; ; y++)
                        if (
                          t <= y ||
                          (i = e[y]) < 32 ||
                          (127 < i && i <= 159)
                        ) {
                          (l += S.utf32ToString(e, d, y)), (d = y - 1);
                          break;
                        }
                      break;
                    case 6:
                      if (l && 24 !== i && 26 !== i) {
                        var g = l.indexOf(";");
                        if (-1 === g) this._oscHandlerFb(-1, l);
                        else {
                          for (
                            var C = parseInt(l.substring(0, g)),
                              v = l.substring(g + 1),
                              b = this._oscHandlers[C],
                              w = b ? b.length - 1 : -1;
                            0 <= w && !1 === b[w](v);
                            w--
                          );
                          w < 0 && this._oscHandlerFb(C, v);
                        }
                      }
                      27 === i && (r |= 1), (c = [0]), (h = l = ""), (a = -1);
                  }
                  s = 15 & r;
                }
              0 === s && ~o
                ? this._printHandler(e, o, t)
                : 13 === s && ~a && f && f.put(e, a, t),
                (this._osc = l),
                (this._collect = h),
                (this._params = c),
                (this._activeDcsHandler = f),
                (this.currentState = s);
            }),
            p);
          function p(e) {
            void 0 === e && (e = i.VT500_TRANSITION_TABLE);
            var t = _.call(this) || this;
            return (
              (t.TRANSITIONS = e),
              (t.initialState = 0),
              (t.currentState = t.initialState),
              (t._osc = ""),
              (t._params = [0]),
              (t._collect = ""),
              (t._printHandlerFb = function(e, t, i) {}),
              (t._executeHandlerFb = function(e) {}),
              (t._csiHandlerFb = function(e, t, i) {}),
              (t._escHandlerFb = function(e, t) {}),
              (t._oscHandlerFb = function(e, t) {}),
              (t._dcsHandlerFb = new u()),
              (t._errorHandlerFb = function(e) {
                return e;
              }),
              (t._printHandler = t._printHandlerFb),
              (t._executeHandlers = Object.create(null)),
              (t._csiHandlers = Object.create(null)),
              (t._escHandlers = Object.create(null)),
              (t._oscHandlers = Object.create(null)),
              (t._dcsHandlers = Object.create(null)),
              (t._activeDcsHandler = null),
              (t._errorHandler = t._errorHandlerFb),
              t.setEscHandler("\\", function() {}),
              t
            );
          }
          i.EscapeSequenceParser = d;
        },
        { "./common/Lifecycle": 24, "./core/input/TextDecoder": 34 }
      ],
      9: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var o = e("./common/data/EscapeSequences"),
            a = e("./core/data/Charsets"),
            p = e("./CharWidth"),
            l = e("./EscapeSequenceParser"),
            s = e("./common/Lifecycle"),
            h = e("./common/TypedArrayUtils"),
            m = e("./core/input/TextDecoder"),
            y = e("./core/buffer/BufferLine"),
            c = e("./common/EventEmitter2"),
            u = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 },
            f = ((_.prototype.hook = function(e, t, i) {
              this._data = new Uint32Array(0);
            }),
            (_.prototype.put = function(e, t, i) {
              this._data = h.concat(this._data, e.subarray(t, i));
            }),
            (_.prototype.unhook = function() {
              var e = m.utf32ToString(this._data);
              switch (((this._data = new Uint32Array(0)), e)) {
                case '"q':
                  return this._terminal.handler(
                    o.C0.ESC + 'P1$r0"q' + o.C0.ESC + "\\"
                  );
                case '"p':
                  return this._terminal.handler(
                    o.C0.ESC + 'P1$r61"p' + o.C0.ESC + "\\"
                  );
                case "r":
                  var t =
                    this._terminal.buffer.scrollTop +
                    1 +
                    ";" +
                    (this._terminal.buffer.scrollBottom + 1) +
                    "r";
                  return this._terminal.handler(
                    o.C0.ESC + "P1$r" + t + o.C0.ESC + "\\"
                  );
                case "m":
                  return this._terminal.handler(
                    o.C0.ESC + "P1$r0m" + o.C0.ESC + "\\"
                  );
                case " q":
                  var i = { block: 2, underline: 4, bar: 6 }[
                    this._terminal.getOption("cursorStyle")
                  ];
                  return (
                    (i -= this._terminal.getOption("cursorBlink")),
                    this._terminal.handler(
                      o.C0.ESC + "P1$r" + i + " q" + o.C0.ESC + "\\"
                    )
                  );
                default:
                  this._terminal.error("Unknown DCS $q %s", e),
                    this._terminal.handler(o.C0.ESC + "P0$r" + o.C0.ESC + "\\");
              }
            }),
            _);
          function _(e) {
            (this._terminal = e), (this._data = new Uint32Array(0));
          }
          var d,
            g = ((d = s.Disposable),
            n(C, d),
            Object.defineProperty(C.prototype, "onCursorMove", {
              get: function() {
                return this._onCursorMove.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(C.prototype, "onData", {
              get: function() {
                return this._onData.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(C.prototype, "onLineFeed", {
              get: function() {
                return this._onLineFeed.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(C.prototype, "onScroll", {
              get: function() {
                return this._onScroll.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            (C.prototype.dispose = function() {
              d.prototype.dispose.call(this), (this._terminal = null);
            }),
            (C.prototype.parse = function(e) {
              if (this._terminal) {
                var t = this._terminal.buffer,
                  i = t.x,
                  r = t.y;
                this._terminal.debug && this._terminal.log("data: " + e),
                  this._parseBuffer.length < e.length &&
                    (this._parseBuffer = new Uint32Array(e.length)),
                  this._parser.parse(
                    this._parseBuffer,
                    this._stringDecoder.decode(e, this._parseBuffer)
                  ),
                  ((t = this._terminal.buffer).x === i && t.y === r) ||
                    this._onCursorMove.fire();
              }
            }),
            (C.prototype.parseUtf8 = function(e) {
              if (this._terminal) {
                var t = this._terminal.buffer,
                  i = t.x,
                  r = t.y;
                this._terminal.debug && this._terminal.log("data: " + e),
                  this._parseBuffer.length < e.length &&
                    (this._parseBuffer = new Uint32Array(e.length)),
                  this._parser.parse(
                    this._parseBuffer,
                    this._utf8Decoder.decode(e, this._parseBuffer)
                  ),
                  ((t = this._terminal.buffer).x === i && t.y === r) ||
                    this._terminal.emit("cursormove");
              }
            }),
            (C.prototype.print = function(e, t, i) {
              var r,
                n,
                s = this._terminal.buffer,
                o = this._terminal.charset,
                a = this._terminal.options.screenReaderMode,
                l = this._terminal.cols,
                h = this._terminal.wraparoundMode,
                c = this._terminal.insertMode,
                u = this._terminal.curAttrData,
                f = s.lines.get(s.y + s.ybase);
              this._terminal.updateRange(s.y);
              for (var _ = t; _ < i; ++_) {
                if (((r = e[_]), (n = p.wcwidth(r)), r < 127 && o)) {
                  var d = o[String.fromCharCode(r)];
                  d && (r = d.charCodeAt(0));
                }
                if (
                  (a &&
                    this._terminal.emit("a11y.char", m.stringFromCodePoint(r)),
                  n || !s.x)
                ) {
                  if (s.x + n - 1 >= l)
                    if (h)
                      (s.x = 0),
                        s.y++,
                        s.y > s.scrollBottom
                          ? (s.y--, this._terminal.scroll(!0))
                          : (s.lines.get(s.y).isWrapped = !0),
                        (f = s.lines.get(s.y + s.ybase));
                    else if (2 === n) continue;
                  if (
                    (c &&
                      (f.insertCells(s.x, n, s.getNullCell(u)),
                      2 === f.getWidth(l - 1) &&
                        f.setCellFromCodePoint(
                          l - 1,
                          y.NULL_CELL_CODE,
                          y.NULL_CELL_WIDTH,
                          u.fg,
                          u.bg
                        )),
                    f.setCellFromCodePoint(s.x++, r, n, u.fg, u.bg),
                    0 < n)
                  )
                    for (; --n; )
                      f.setCellFromCodePoint(s.x++, 0, 0, u.fg, u.bg);
                } else
                  f.getWidth(s.x - 1)
                    ? f.addCodepointToCell(s.x - 1, r)
                    : f.addCodepointToCell(s.x - 2, r);
              }
              this._terminal.updateRange(s.y);
            }),
            (C.prototype.addCsiHandler = function(e, t) {
              return this._parser.addCsiHandler(e, t);
            }),
            (C.prototype.addOscHandler = function(e, t) {
              return this._parser.addOscHandler(e, t);
            }),
            (C.prototype.bell = function() {
              this._terminal.bell();
            }),
            (C.prototype.lineFeed = function() {
              var e = this._terminal.buffer;
              this._terminal.options.convertEol && (e.x = 0),
                e.y++,
                e.y > e.scrollBottom && (e.y--, this._terminal.scroll()),
                e.x >= this._terminal.cols && e.x--,
                this._onLineFeed.fire();
            }),
            (C.prototype.carriageReturn = function() {
              this._terminal.buffer.x = 0;
            }),
            (C.prototype.backspace = function() {
              0 < this._terminal.buffer.x && this._terminal.buffer.x--;
            }),
            (C.prototype.tab = function() {
              var e = this._terminal.buffer.x;
              (this._terminal.buffer.x = this._terminal.buffer.nextStop()),
                this._terminal.options.screenReaderMode &&
                  this._terminal.emit("a11y.tab", this._terminal.buffer.x - e);
            }),
            (C.prototype.shiftOut = function() {
              this._terminal.setgLevel(1);
            }),
            (C.prototype.shiftIn = function() {
              this._terminal.setgLevel(0);
            }),
            (C.prototype.insertChars = function(e) {
              this._terminal.buffer.lines
                .get(this._terminal.buffer.y + this._terminal.buffer.ybase)
                .insertCells(
                  this._terminal.buffer.x,
                  e[0] || 1,
                  this._terminal.buffer.getNullCell(
                    this._terminal.eraseAttrData()
                  )
                ),
                this._terminal.updateRange(this._terminal.buffer.y);
            }),
            (C.prototype.cursorUp = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.y -= t),
                this._terminal.buffer.y < 0 && (this._terminal.buffer.y = 0);
            }),
            (C.prototype.cursorDown = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.y += t),
                this._terminal.buffer.y >= this._terminal.rows &&
                  (this._terminal.buffer.y = this._terminal.rows - 1),
                this._terminal.buffer.x >= this._terminal.cols &&
                  this._terminal.buffer.x--;
            }),
            (C.prototype.cursorForward = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.x += t),
                this._terminal.buffer.x >= this._terminal.cols &&
                  (this._terminal.buffer.x = this._terminal.cols - 1);
            }),
            (C.prototype.cursorBackward = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                this._terminal.buffer.x >= this._terminal.cols &&
                  this._terminal.buffer.x--,
                (this._terminal.buffer.x -= t),
                this._terminal.buffer.x < 0 && (this._terminal.buffer.x = 0);
            }),
            (C.prototype.cursorNextLine = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.y += t),
                this._terminal.buffer.y >= this._terminal.rows &&
                  (this._terminal.buffer.y = this._terminal.rows - 1),
                (this._terminal.buffer.x = 0);
            }),
            (C.prototype.cursorPrecedingLine = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.y -= t),
                this._terminal.buffer.y < 0 && (this._terminal.buffer.y = 0),
                (this._terminal.buffer.x = 0);
            }),
            (C.prototype.cursorCharAbsolute = function(e) {
              var t = e[0];
              t < 1 && (t = 1), (this._terminal.buffer.x = t - 1);
            }),
            (C.prototype.cursorPosition = function(e) {
              var t,
                i = e[0] - 1;
              (t = 2 <= e.length ? e[1] - 1 : 0),
                i < 0
                  ? (i = 0)
                  : i >= this._terminal.rows && (i = this._terminal.rows - 1),
                t < 0
                  ? (t = 0)
                  : t >= this._terminal.cols && (t = this._terminal.cols - 1),
                (this._terminal.buffer.x = t),
                (this._terminal.buffer.y = i);
            }),
            (C.prototype.cursorForwardTab = function(e) {
              for (var t = e[0] || 1; t--; )
                this._terminal.buffer.x = this._terminal.buffer.nextStop();
            }),
            (C.prototype._eraseInBufferLine = function(e, t, i, r) {
              void 0 === r && (r = !1);
              var n = this._terminal.buffer.lines.get(
                this._terminal.buffer.ybase + e
              );
              n.replaceCells(
                t,
                i,
                this._terminal.buffer.getNullCell(
                  this._terminal.eraseAttrData()
                )
              ),
                r && (n.isWrapped = !1);
            }),
            (C.prototype._resetBufferLine = function(e) {
              this._eraseInBufferLine(e, 0, this._terminal.cols, !0);
            }),
            (C.prototype.eraseInDisplay = function(e) {
              var t;
              switch (e[0]) {
                case 0:
                  for (
                    t = this._terminal.buffer.y,
                      this._terminal.updateRange(t),
                      this._eraseInBufferLine(
                        t++,
                        this._terminal.buffer.x,
                        this._terminal.cols,
                        0 === this._terminal.buffer.x
                      );
                    t < this._terminal.rows;
                    t++
                  )
                    this._resetBufferLine(t);
                  this._terminal.updateRange(t);
                  break;
                case 1:
                  for (
                    t = this._terminal.buffer.y,
                      this._terminal.updateRange(t),
                      this._eraseInBufferLine(
                        t,
                        0,
                        this._terminal.buffer.x + 1,
                        !0
                      ),
                      this._terminal.buffer.x + 1 >= this._terminal.cols &&
                        (this._terminal.buffer.lines.get(t + 1).isWrapped = !1);
                    t--;

                  )
                    this._resetBufferLine(t);
                  this._terminal.updateRange(0);
                  break;
                case 2:
                  for (
                    t = this._terminal.rows, this._terminal.updateRange(t - 1);
                    t--;

                  )
                    this._resetBufferLine(t);
                  this._terminal.updateRange(0);
                  break;
                case 3:
                  var i =
                    this._terminal.buffer.lines.length - this._terminal.rows;
                  0 < i &&
                    (this._terminal.buffer.lines.trimStart(i),
                    (this._terminal.buffer.ybase = Math.max(
                      this._terminal.buffer.ybase - i,
                      0
                    )),
                    (this._terminal.buffer.ydisp = Math.max(
                      this._terminal.buffer.ydisp - i,
                      0
                    )),
                    this._onScroll.fire(0));
              }
            }),
            (C.prototype.eraseInLine = function(e) {
              switch (e[0]) {
                case 0:
                  this._eraseInBufferLine(
                    this._terminal.buffer.y,
                    this._terminal.buffer.x,
                    this._terminal.cols
                  );
                  break;
                case 1:
                  this._eraseInBufferLine(
                    this._terminal.buffer.y,
                    0,
                    this._terminal.buffer.x + 1
                  );
                  break;
                case 2:
                  this._eraseInBufferLine(
                    this._terminal.buffer.y,
                    0,
                    this._terminal.cols
                  );
              }
              this._terminal.updateRange(this._terminal.buffer.y);
            }),
            (C.prototype.insertLines = function(e) {
              var t = e[0];
              t < 1 && (t = 1);
              for (
                var i = this._terminal.buffer,
                  r = i.y + i.ybase,
                  n = this._terminal.rows - 1 - i.scrollBottom,
                  s = this._terminal.rows - 1 + i.ybase - n + 1;
                t--;

              )
                i.lines.splice(s - 1, 1),
                  i.lines.splice(
                    r,
                    0,
                    i.getBlankLine(this._terminal.eraseAttrData())
                  );
              this._terminal.updateRange(i.y),
                this._terminal.updateRange(i.scrollBottom);
            }),
            (C.prototype.deleteLines = function(e) {
              var t = e[0];
              t < 1 && (t = 1);
              var i,
                r = this._terminal.buffer,
                n = r.y + r.ybase;
              for (
                i = this._terminal.rows - 1 - r.scrollBottom,
                  i = this._terminal.rows - 1 + r.ybase - i;
                t--;

              )
                r.lines.splice(n, 1),
                  r.lines.splice(
                    i,
                    0,
                    r.getBlankLine(this._terminal.eraseAttrData())
                  );
              this._terminal.updateRange(r.y),
                this._terminal.updateRange(r.scrollBottom);
            }),
            (C.prototype.deleteChars = function(e) {
              this._terminal.buffer.lines
                .get(this._terminal.buffer.y + this._terminal.buffer.ybase)
                .deleteCells(
                  this._terminal.buffer.x,
                  e[0] || 1,
                  this._terminal.buffer.getNullCell(
                    this._terminal.eraseAttrData()
                  )
                ),
                this._terminal.updateRange(this._terminal.buffer.y);
            }),
            (C.prototype.scrollUp = function(e) {
              for (var t = e[0] || 1, i = this._terminal.buffer; t--; )
                i.lines.splice(i.ybase + i.scrollTop, 1),
                  i.lines.splice(
                    i.ybase + i.scrollBottom,
                    0,
                    i.getBlankLine(y.DEFAULT_ATTR_DATA)
                  );
              this._terminal.updateRange(i.scrollTop),
                this._terminal.updateRange(i.scrollBottom);
            }),
            (C.prototype.scrollDown = function(e, t) {
              if (e.length < 2 && !t) {
                for (var i = e[0] || 1, r = this._terminal.buffer; i--; )
                  r.lines.splice(r.ybase + r.scrollBottom, 1),
                    r.lines.splice(
                      r.ybase + r.scrollTop,
                      0,
                      r.getBlankLine(y.DEFAULT_ATTR_DATA)
                    );
                this._terminal.updateRange(r.scrollTop),
                  this._terminal.updateRange(r.scrollBottom);
              }
            }),
            (C.prototype.eraseChars = function(e) {
              this._terminal.buffer.lines
                .get(this._terminal.buffer.y + this._terminal.buffer.ybase)
                .replaceCells(
                  this._terminal.buffer.x,
                  this._terminal.buffer.x + (e[0] || 1),
                  this._terminal.buffer.getNullCell(
                    this._terminal.eraseAttrData()
                  )
                );
            }),
            (C.prototype.cursorBackwardTab = function(e) {
              for (var t = e[0] || 1, i = this._terminal.buffer; t--; )
                i.x = i.prevStop();
            }),
            (C.prototype.charPosAbsolute = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.x = t - 1),
                this._terminal.buffer.x >= this._terminal.cols &&
                  (this._terminal.buffer.x = this._terminal.cols - 1);
            }),
            (C.prototype.hPositionRelative = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.x += t),
                this._terminal.buffer.x >= this._terminal.cols &&
                  (this._terminal.buffer.x = this._terminal.cols - 1);
            }),
            (C.prototype.repeatPrecedingCharacter = function(e) {
              var t = this._terminal.buffer,
                i = t.lines.get(t.ybase + t.y);
              i.loadCell(t.x - 1, this._workCell),
                i.replaceCells(
                  t.x,
                  t.x + (e[0] || 1),
                  void 0 !== this._workCell.content
                    ? this._workCell
                    : t.getNullCell(y.DEFAULT_ATTR_DATA)
                );
            }),
            (C.prototype.sendDeviceAttributes = function(e, t) {
              0 < e[0] ||
                (t
                  ? ">" === t &&
                    (this._terminal.is("xterm")
                      ? this._terminal.handler(o.C0.ESC + "[>0;276;0c")
                      : this._terminal.is("rxvt-unicode")
                      ? this._terminal.handler(o.C0.ESC + "[>85;95;0c")
                      : this._terminal.is("linux")
                      ? this._terminal.handler(e[0] + "c")
                      : this._terminal.is("screen") &&
                        this._terminal.handler(o.C0.ESC + "[>83;40003;0c"))
                  : this._terminal.is("xterm") ||
                    this._terminal.is("rxvt-unicode") ||
                    this._terminal.is("screen")
                  ? this._terminal.handler(o.C0.ESC + "[?1;2c")
                  : this._terminal.is("linux") &&
                    this._terminal.handler(o.C0.ESC + "[?6c"));
            }),
            (C.prototype.linePosAbsolute = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.y = t - 1),
                this._terminal.buffer.y >= this._terminal.rows &&
                  (this._terminal.buffer.y = this._terminal.rows - 1);
            }),
            (C.prototype.vPositionRelative = function(e) {
              var t = e[0];
              t < 1 && (t = 1),
                (this._terminal.buffer.y += t),
                this._terminal.buffer.y >= this._terminal.rows &&
                  (this._terminal.buffer.y = this._terminal.rows - 1),
                this._terminal.buffer.x >= this._terminal.cols &&
                  this._terminal.buffer.x--;
            }),
            (C.prototype.hVPosition = function(e) {
              e[0] < 1 && (e[0] = 1),
                e[1] < 1 && (e[1] = 1),
                (this._terminal.buffer.y = e[0] - 1),
                this._terminal.buffer.y >= this._terminal.rows &&
                  (this._terminal.buffer.y = this._terminal.rows - 1),
                (this._terminal.buffer.x = e[1] - 1),
                this._terminal.buffer.x >= this._terminal.cols &&
                  (this._terminal.buffer.x = this._terminal.cols - 1);
            }),
            (C.prototype.tabClear = function(e) {
              var t = e[0];
              t <= 0
                ? delete this._terminal.buffer.tabs[this._terminal.buffer.x]
                : 3 === t && (this._terminal.buffer.tabs = {});
            }),
            (C.prototype.setMode = function(e, t) {
              if (1 < e.length)
                for (var i = 0; i < e.length; i++) this.setMode([e[i]]);
              else if (t) {
                if ("?" === t)
                  switch (e[0]) {
                    case 1:
                      this._terminal.applicationCursor = !0;
                      break;
                    case 2:
                      this._terminal.setgCharset(0, a.DEFAULT_CHARSET),
                        this._terminal.setgCharset(1, a.DEFAULT_CHARSET),
                        this._terminal.setgCharset(2, a.DEFAULT_CHARSET),
                        this._terminal.setgCharset(3, a.DEFAULT_CHARSET);
                      break;
                    case 3:
                      (this._terminal.savedCols = this._terminal.cols),
                        this._terminal.resize(132, this._terminal.rows);
                      break;
                    case 6:
                      this._terminal.originMode = !0;
                      break;
                    case 7:
                      this._terminal.wraparoundMode = !0;
                      break;
                    case 12:
                      break;
                    case 66:
                      this._terminal.log(
                        "Serial port requested application keypad."
                      ),
                        (this._terminal.applicationKeypad = !0),
                        this._terminal.viewport &&
                          this._terminal.viewport.syncScrollArea();
                      break;
                    case 9:
                    case 1e3:
                    case 1002:
                    case 1003:
                      (this._terminal.x10Mouse = 9 === e[0]),
                        (this._terminal.vt200Mouse = 1e3 === e[0]),
                        (this._terminal.normalMouse = 1e3 < e[0]),
                        (this._terminal.mouseEvents = !0),
                        this._terminal.element &&
                          this._terminal.element.classList.add(
                            "enable-mouse-events"
                          ),
                        this._terminal.selectionManager &&
                          this._terminal.selectionManager.disable(),
                        this._terminal.log("Binding to mouse events.");
                      break;
                    case 1004:
                      this._terminal.sendFocus = !0;
                      break;
                    case 1005:
                      this._terminal.utfMouse = !0;
                      break;
                    case 1006:
                      this._terminal.sgrMouse = !0;
                      break;
                    case 1015:
                      this._terminal.urxvtMouse = !0;
                      break;
                    case 25:
                      this._terminal.cursorHidden = !1;
                      break;
                    case 1048:
                      this.saveCursor(e);
                      break;
                    case 1049:
                      this.saveCursor(e);
                    case 47:
                    case 1047:
                      this._terminal.buffers.activateAltBuffer(
                        this._terminal.eraseAttrData()
                      ),
                        this._terminal.refresh(0, this._terminal.rows - 1),
                        this._terminal.viewport &&
                          this._terminal.viewport.syncScrollArea(),
                        this._terminal.showCursor();
                      break;
                    case 2004:
                      this._terminal.bracketedPasteMode = !0;
                  }
              } else
                switch (e[0]) {
                  case 4:
                    this._terminal.insertMode = !0;
                }
            }),
            (C.prototype.resetMode = function(e, t) {
              if (1 < e.length)
                for (var i = 0; i < e.length; i++) this.resetMode([e[i]]);
              else if (t) {
                if ("?" === t)
                  switch (e[0]) {
                    case 1:
                      this._terminal.applicationCursor = !1;
                      break;
                    case 3:
                      132 === this._terminal.cols &&
                        this._terminal.savedCols &&
                        this._terminal.resize(
                          this._terminal.savedCols,
                          this._terminal.rows
                        ),
                        delete this._terminal.savedCols;
                      break;
                    case 6:
                      this._terminal.originMode = !1;
                      break;
                    case 7:
                      this._terminal.wraparoundMode = !1;
                      break;
                    case 12:
                      break;
                    case 66:
                      this._terminal.log("Switching back to normal keypad."),
                        (this._terminal.applicationKeypad = !1),
                        this._terminal.viewport &&
                          this._terminal.viewport.syncScrollArea();
                      break;
                    case 9:
                    case 1e3:
                    case 1002:
                    case 1003:
                      (this._terminal.x10Mouse = !1),
                        (this._terminal.vt200Mouse = !1),
                        (this._terminal.normalMouse = !1),
                        (this._terminal.mouseEvents = !1),
                        this._terminal.element &&
                          this._terminal.element.classList.remove(
                            "enable-mouse-events"
                          ),
                        this._terminal.selectionManager &&
                          this._terminal.selectionManager.enable();
                      break;
                    case 1004:
                      this._terminal.sendFocus = !1;
                      break;
                    case 1005:
                      this._terminal.utfMouse = !1;
                      break;
                    case 1006:
                      this._terminal.sgrMouse = !1;
                      break;
                    case 1015:
                      this._terminal.urxvtMouse = !1;
                      break;
                    case 25:
                      this._terminal.cursorHidden = !0;
                      break;
                    case 1048:
                      this.restoreCursor(e);
                      break;
                    case 1049:
                    case 47:
                    case 1047:
                      this._terminal.buffers.activateNormalBuffer(),
                        1049 === e[0] && this.restoreCursor(e),
                        this._terminal.refresh(0, this._terminal.rows - 1),
                        this._terminal.viewport &&
                          this._terminal.viewport.syncScrollArea(),
                        this._terminal.showCursor();
                      break;
                    case 2004:
                      this._terminal.bracketedPasteMode = !1;
                  }
              } else
                switch (e[0]) {
                  case 4:
                    this._terminal.insertMode = !1;
                }
            }),
            (C.prototype.charAttributes = function(e) {
              if (1 === e.length && 0 === e[0])
                return (
                  (this._terminal.curAttrData.fg = y.DEFAULT_ATTR_DATA.fg),
                  void (this._terminal.curAttrData.bg = y.DEFAULT_ATTR_DATA.bg)
                );
              for (
                var t, i = e.length, r = this._terminal.curAttrData, n = 0;
                n < i;
                n++
              )
                30 <= (t = e[n]) && t <= 37
                  ? ((r.fg &= -50331904), (r.fg |= 16777216 | (t - 30)))
                  : 40 <= t && t <= 47
                  ? ((r.bg &= -50331904), (r.bg |= 16777216 | (t - 40)))
                  : 90 <= t && t <= 97
                  ? ((r.fg &= -50331904), (r.fg |= 16777224 | (t - 90)))
                  : 100 <= t && t <= 107
                  ? ((r.bg &= -50331904), (r.bg |= 16777224 | (t - 100)))
                  : 0 === t
                  ? ((r.fg = y.DEFAULT_ATTR_DATA.fg),
                    (r.bg = y.DEFAULT_ATTR_DATA.bg))
                  : 1 === t
                  ? (r.fg |= 134217728)
                  : 3 === t
                  ? (r.bg |= 67108864)
                  : 4 === t
                  ? (r.fg |= 268435456)
                  : 5 === t
                  ? (r.fg |= 536870912)
                  : 7 === t
                  ? (r.fg |= 67108864)
                  : 8 === t
                  ? (r.fg |= 1073741824)
                  : 2 === t
                  ? (r.bg |= 134217728)
                  : 22 === t
                  ? ((r.fg &= -134217729), (r.bg &= -134217729))
                  : 23 === t
                  ? (r.bg &= -67108865)
                  : 24 === t
                  ? (r.fg &= -268435457)
                  : 25 === t
                  ? (r.fg &= -536870913)
                  : 27 === t
                  ? (r.fg &= -67108865)
                  : 28 === t
                  ? (r.fg &= -1073741825)
                  : 39 === t
                  ? ((r.fg &= -67108864),
                    (r.fg |= 16777215 & y.DEFAULT_ATTR_DATA.fg))
                  : 49 === t
                  ? ((r.bg &= -67108864),
                    (r.bg |= 16777215 & y.DEFAULT_ATTR_DATA.bg))
                  : 38 === t
                  ? 2 === e[n + 1]
                    ? ((n += 2),
                      (r.fg |= 50331648),
                      (r.fg &= -16777216),
                      (r.fg |= y.AttributeData.fromColorRGB([
                        e[n],
                        e[n + 1],
                        e[n + 2]
                      ])),
                      (n += 2))
                    : 5 === e[n + 1] &&
                      ((t = 255 & e[(n += 2)]),
                      (r.fg &= -50331904),
                      (r.fg |= 33554432 | t))
                  : 48 === t
                  ? 2 === e[n + 1]
                    ? ((n += 2),
                      (r.bg |= 50331648),
                      (r.bg &= -16777216),
                      (r.bg |= y.AttributeData.fromColorRGB([
                        e[n],
                        e[n + 1],
                        e[n + 2]
                      ])),
                      (n += 2))
                    : 5 === e[n + 1] &&
                      ((t = 255 & e[(n += 2)]),
                      (r.bg &= -50331904),
                      (r.bg |= 33554432 | t))
                  : 100 === t
                  ? ((r.fg &= -67108864),
                    (r.fg |= 16777215 & y.DEFAULT_ATTR_DATA.fg),
                    (r.bg &= -67108864),
                    (r.bg |= 16777215 & y.DEFAULT_ATTR_DATA.bg))
                  : this._terminal.error("Unknown SGR attribute: %d.", t);
            }),
            (C.prototype.deviceStatus = function(e, t) {
              if (t) {
                if ("?" === t)
                  switch (e[0]) {
                    case 6:
                      (i = this._terminal.buffer.y + 1),
                        (r = this._terminal.buffer.x + 1),
                        this._onData.fire(o.C0.ESC + "[?" + i + ";" + r + "R");
                  }
              } else
                switch (e[0]) {
                  case 5:
                    this._onData.fire(o.C0.ESC + "[0n");
                    break;
                  case 6:
                    var i = this._terminal.buffer.y + 1,
                      r = this._terminal.buffer.x + 1;
                    this._onData.fire(o.C0.ESC + "[" + i + ";" + r + "R");
                }
            }),
            (C.prototype.softReset = function(e, t) {
              "!" === t &&
                ((this._terminal.cursorHidden = !1),
                (this._terminal.insertMode = !1),
                (this._terminal.originMode = !1),
                (this._terminal.wraparoundMode = !0),
                (this._terminal.applicationKeypad = !1),
                this._terminal.viewport &&
                  this._terminal.viewport.syncScrollArea(),
                (this._terminal.applicationCursor = !1),
                (this._terminal.buffer.scrollTop = 0),
                (this._terminal.buffer.scrollBottom = this._terminal.rows - 1),
                (this._terminal.curAttrData = y.DEFAULT_ATTR_DATA.clone()),
                (this._terminal.buffer.x = this._terminal.buffer.y = 0),
                (this._terminal.charset = null),
                (this._terminal.glevel = 0),
                (this._terminal.charsets = [null]));
            }),
            (C.prototype.setCursorStyle = function(e, t) {
              if (" " === t) {
                var i = e[0] < 1 ? 1 : e[0];
                switch (i) {
                  case 1:
                  case 2:
                    this._terminal.setOption("cursorStyle", "block");
                    break;
                  case 3:
                  case 4:
                    this._terminal.setOption("cursorStyle", "underline");
                    break;
                  case 5:
                  case 6:
                    this._terminal.setOption("cursorStyle", "bar");
                }
                var r = i % 2 == 1;
                this._terminal.setOption("cursorBlink", r);
              }
            }),
            (C.prototype.setScrollRegion = function(e, t) {
              t ||
                ((this._terminal.buffer.scrollTop = (e[0] || 1) - 1),
                (this._terminal.buffer.scrollBottom =
                  (e[1] && e[1] <= this._terminal.rows
                    ? e[1]
                    : this._terminal.rows) - 1),
                (this._terminal.buffer.x = 0),
                (this._terminal.buffer.y = 0));
            }),
            (C.prototype.saveCursor = function(e) {
              (this._terminal.buffer.savedX = this._terminal.buffer.x),
                (this._terminal.buffer.savedY = this._terminal.buffer.y),
                (this._terminal.buffer.savedCurAttrData.fg = this._terminal.curAttrData.fg),
                (this._terminal.buffer.savedCurAttrData.bg = this._terminal.curAttrData.bg);
            }),
            (C.prototype.restoreCursor = function(e) {
              (this._terminal.buffer.x = this._terminal.buffer.savedX || 0),
                (this._terminal.buffer.y = this._terminal.buffer.savedY || 0),
                (this._terminal.curAttrData.fg = this._terminal.buffer.savedCurAttrData.fg),
                (this._terminal.curAttrData.bg = this._terminal.buffer.savedCurAttrData.bg);
            }),
            (C.prototype.setTitle = function(e) {
              this._terminal.handleTitle(e);
            }),
            (C.prototype.nextLine = function() {
              (this._terminal.buffer.x = 0), this.index();
            }),
            (C.prototype.keypadApplicationMode = function() {
              this._terminal.log("Serial port requested application keypad."),
                (this._terminal.applicationKeypad = !0),
                this._terminal.viewport &&
                  this._terminal.viewport.syncScrollArea();
            }),
            (C.prototype.keypadNumericMode = function() {
              this._terminal.log("Switching back to normal keypad."),
                (this._terminal.applicationKeypad = !1),
                this._terminal.viewport &&
                  this._terminal.viewport.syncScrollArea();
            }),
            (C.prototype.selectDefaultCharset = function() {
              this._terminal.setgLevel(0),
                this._terminal.setgCharset(0, a.DEFAULT_CHARSET);
            }),
            (C.prototype.selectCharset = function(e) {
              2 === e.length
                ? "/" !== e[0] &&
                  this._terminal.setgCharset(
                    u[e[0]],
                    a.CHARSETS[e[1]] || a.DEFAULT_CHARSET
                  )
                : this.selectDefaultCharset();
            }),
            (C.prototype.index = function() {
              this._terminal.index();
            }),
            (C.prototype.tabSet = function() {
              this._terminal.tabSet();
            }),
            (C.prototype.reverseIndex = function() {
              this._terminal.reverseIndex();
            }),
            (C.prototype.reset = function() {
              this._parser.reset(), this._terminal.reset();
            }),
            (C.prototype.setgLevel = function(e) {
              this._terminal.setgLevel(e);
            }),
            C);
          function C(e, t) {
            void 0 === t && (t = new l.EscapeSequenceParser());
            var r = d.call(this) || this;
            (r._terminal = e),
              (r._parser = t),
              (r._parseBuffer = new Uint32Array(4096)),
              (r._stringDecoder = new m.StringToUtf32()),
              (r._utf8Decoder = new m.Utf8ToUtf32()),
              (r._workCell = new y.CellData()),
              (r._onCursorMove = new c.EventEmitter2()),
              (r._onData = new c.EventEmitter2()),
              (r._onLineFeed = new c.EventEmitter2()),
              (r._onScroll = new c.EventEmitter2()),
              r.register(r._parser),
              r._parser.setCsiHandlerFallback(function(e, t, i) {
                r._terminal.error("Unknown CSI code: ", {
                  collect: e,
                  params: t,
                  flag: String.fromCharCode(i)
                });
              }),
              r._parser.setEscHandlerFallback(function(e, t) {
                r._terminal.error("Unknown ESC code: ", {
                  collect: e,
                  flag: String.fromCharCode(t)
                });
              }),
              r._parser.setExecuteHandlerFallback(function(e) {
                r._terminal.error("Unknown EXECUTE code: ", { code: e });
              }),
              r._parser.setOscHandlerFallback(function(e, t) {
                r._terminal.error("Unknown OSC code: ", {
                  identifier: e,
                  data: t
                });
              }),
              r._parser.setPrintHandler(function(e, t, i) {
                return r.print(e, t, i);
              }),
              r._parser.setCsiHandler("@", function(e, t) {
                return r.insertChars(e);
              }),
              r._parser.setCsiHandler("A", function(e, t) {
                return r.cursorUp(e);
              }),
              r._parser.setCsiHandler("B", function(e, t) {
                return r.cursorDown(e);
              }),
              r._parser.setCsiHandler("C", function(e, t) {
                return r.cursorForward(e);
              }),
              r._parser.setCsiHandler("D", function(e, t) {
                return r.cursorBackward(e);
              }),
              r._parser.setCsiHandler("E", function(e, t) {
                return r.cursorNextLine(e);
              }),
              r._parser.setCsiHandler("F", function(e, t) {
                return r.cursorPrecedingLine(e);
              }),
              r._parser.setCsiHandler("G", function(e, t) {
                return r.cursorCharAbsolute(e);
              }),
              r._parser.setCsiHandler("H", function(e, t) {
                return r.cursorPosition(e);
              }),
              r._parser.setCsiHandler("I", function(e, t) {
                return r.cursorForwardTab(e);
              }),
              r._parser.setCsiHandler("J", function(e, t) {
                return r.eraseInDisplay(e);
              }),
              r._parser.setCsiHandler("K", function(e, t) {
                return r.eraseInLine(e);
              }),
              r._parser.setCsiHandler("L", function(e, t) {
                return r.insertLines(e);
              }),
              r._parser.setCsiHandler("M", function(e, t) {
                return r.deleteLines(e);
              }),
              r._parser.setCsiHandler("P", function(e, t) {
                return r.deleteChars(e);
              }),
              r._parser.setCsiHandler("S", function(e, t) {
                return r.scrollUp(e);
              }),
              r._parser.setCsiHandler("T", function(e, t) {
                return r.scrollDown(e, t);
              }),
              r._parser.setCsiHandler("X", function(e, t) {
                return r.eraseChars(e);
              }),
              r._parser.setCsiHandler("Z", function(e, t) {
                return r.cursorBackwardTab(e);
              }),
              r._parser.setCsiHandler("`", function(e, t) {
                return r.charPosAbsolute(e);
              }),
              r._parser.setCsiHandler("a", function(e, t) {
                return r.hPositionRelative(e);
              }),
              r._parser.setCsiHandler("b", function(e, t) {
                return r.repeatPrecedingCharacter(e);
              }),
              r._parser.setCsiHandler("c", function(e, t) {
                return r.sendDeviceAttributes(e, t);
              }),
              r._parser.setCsiHandler("d", function(e, t) {
                return r.linePosAbsolute(e);
              }),
              r._parser.setCsiHandler("e", function(e, t) {
                return r.vPositionRelative(e);
              }),
              r._parser.setCsiHandler("f", function(e, t) {
                return r.hVPosition(e);
              }),
              r._parser.setCsiHandler("g", function(e, t) {
                return r.tabClear(e);
              }),
              r._parser.setCsiHandler("h", function(e, t) {
                return r.setMode(e, t);
              }),
              r._parser.setCsiHandler("l", function(e, t) {
                return r.resetMode(e, t);
              }),
              r._parser.setCsiHandler("m", function(e, t) {
                return r.charAttributes(e);
              }),
              r._parser.setCsiHandler("n", function(e, t) {
                return r.deviceStatus(e, t);
              }),
              r._parser.setCsiHandler("p", function(e, t) {
                return r.softReset(e, t);
              }),
              r._parser.setCsiHandler("q", function(e, t) {
                return r.setCursorStyle(e, t);
              }),
              r._parser.setCsiHandler("r", function(e, t) {
                return r.setScrollRegion(e, t);
              }),
              r._parser.setCsiHandler("s", function(e, t) {
                return r.saveCursor(e);
              }),
              r._parser.setCsiHandler("u", function(e, t) {
                return r.restoreCursor(e);
              }),
              r._parser.setExecuteHandler(o.C0.BEL, function() {
                return r.bell();
              }),
              r._parser.setExecuteHandler(o.C0.LF, function() {
                return r.lineFeed();
              }),
              r._parser.setExecuteHandler(o.C0.VT, function() {
                return r.lineFeed();
              }),
              r._parser.setExecuteHandler(o.C0.FF, function() {
                return r.lineFeed();
              }),
              r._parser.setExecuteHandler(o.C0.CR, function() {
                return r.carriageReturn();
              }),
              r._parser.setExecuteHandler(o.C0.BS, function() {
                return r.backspace();
              }),
              r._parser.setExecuteHandler(o.C0.HT, function() {
                return r.tab();
              }),
              r._parser.setExecuteHandler(o.C0.SO, function() {
                return r.shiftOut();
              }),
              r._parser.setExecuteHandler(o.C0.SI, function() {
                return r.shiftIn();
              }),
              r._parser.setExecuteHandler(o.C1.IND, function() {
                return r.index();
              }),
              r._parser.setExecuteHandler(o.C1.NEL, function() {
                return r.nextLine();
              }),
              r._parser.setExecuteHandler(o.C1.HTS, function() {
                return r.tabSet();
              }),
              r._parser.setOscHandler(0, function(e) {
                return r.setTitle(e);
              }),
              r._parser.setOscHandler(2, function(e) {
                return r.setTitle(e);
              }),
              r._parser.setEscHandler("7", function() {
                return r.saveCursor([]);
              }),
              r._parser.setEscHandler("8", function() {
                return r.restoreCursor([]);
              }),
              r._parser.setEscHandler("D", function() {
                return r.index();
              }),
              r._parser.setEscHandler("E", function() {
                return r.nextLine();
              }),
              r._parser.setEscHandler("H", function() {
                return r.tabSet();
              }),
              r._parser.setEscHandler("M", function() {
                return r.reverseIndex();
              }),
              r._parser.setEscHandler("=", function() {
                return r.keypadApplicationMode();
              }),
              r._parser.setEscHandler(">", function() {
                return r.keypadNumericMode();
              }),
              r._parser.setEscHandler("c", function() {
                return r.reset();
              }),
              r._parser.setEscHandler("n", function() {
                return r.setgLevel(2);
              }),
              r._parser.setEscHandler("o", function() {
                return r.setgLevel(3);
              }),
              r._parser.setEscHandler("|", function() {
                return r.setgLevel(3);
              }),
              r._parser.setEscHandler("}", function() {
                return r.setgLevel(2);
              }),
              r._parser.setEscHandler("~", function() {
                return r.setgLevel(1);
              }),
              r._parser.setEscHandler("%@", function() {
                return r.selectDefaultCharset();
              }),
              r._parser.setEscHandler("%G", function() {
                return r.selectDefaultCharset();
              });
            function i(e) {
              n._parser.setEscHandler("(" + e, function() {
                return r.selectCharset("(" + e);
              }),
                n._parser.setEscHandler(")" + e, function() {
                  return r.selectCharset(")" + e);
                }),
                n._parser.setEscHandler("*" + e, function() {
                  return r.selectCharset("*" + e);
                }),
                n._parser.setEscHandler("+" + e, function() {
                  return r.selectCharset("+" + e);
                }),
                n._parser.setEscHandler("-" + e, function() {
                  return r.selectCharset("-" + e);
                }),
                n._parser.setEscHandler("." + e, function() {
                  return r.selectCharset("." + e);
                }),
                n._parser.setEscHandler("/" + e, function() {
                  return r.selectCharset("/" + e);
                });
            }
            var n = this;
            for (var s in a.CHARSETS) i(s);
            return (
              r._parser.setErrorHandler(function(e) {
                return r._terminal.error("Parsing error: ", e), e;
              }),
              r._parser.setDcsHandler("$q", new f(r._terminal)),
              r
            );
          }
          i.InputHandler = g;
        },
        {
          "./CharWidth": 5,
          "./EscapeSequenceParser": 8,
          "./common/EventEmitter2": 23,
          "./common/Lifecycle": 24,
          "./common/TypedArrayUtils": 26,
          "./common/data/EscapeSequences": 28,
          "./core/buffer/BufferLine": 29,
          "./core/data/Charsets": 32,
          "./core/input/TextDecoder": 34
        }
      ],
      10: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var u = e("./MouseZoneManager"),
            f = e("./CharWidth"),
            r = e("./common/EventEmitter2"),
            n = (Object.defineProperty(a.prototype, "onLinkHover", {
              get: function() {
                return this._onLinkHover.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onLinkLeave", {
              get: function() {
                return this._onLinkLeave.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onLinkTooltip", {
              get: function() {
                return this._onLinkTooltip.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            (a.prototype.attachToDom = function(e) {
              this._mouseZoneManager = e;
            }),
            (a.prototype.linkifyRows = function(e, t) {
              var i = this;
              this._mouseZoneManager &&
                (null === this._rowsToLinkify.start
                  ? ((this._rowsToLinkify.start = e),
                    (this._rowsToLinkify.end = t))
                  : ((this._rowsToLinkify.start = Math.min(
                      this._rowsToLinkify.start,
                      e
                    )),
                    (this._rowsToLinkify.end = Math.max(
                      this._rowsToLinkify.end,
                      t
                    ))),
                this._mouseZoneManager.clearAll(e, t),
                this._rowsTimeoutId && clearTimeout(this._rowsTimeoutId),
                (this._rowsTimeoutId = setTimeout(function() {
                  return i._linkifyRows();
                }, a.TIME_BEFORE_LINKIFY)));
            }),
            (a.prototype._linkifyRows = function() {
              this._rowsTimeoutId = null;
              var e = this._terminal.buffer,
                t = e.ydisp + this._rowsToLinkify.start;
              if (!(t >= e.lines.length)) {
                for (
                  var i =
                      e.ydisp +
                      Math.min(this._rowsToLinkify.end, this._terminal.rows) +
                      1,
                    r = Math.ceil(a.OVERSCAN_CHAR_LIMIT / this._terminal.cols),
                    n = this._terminal.buffer.iterator(!1, t, i, r, r);
                  n.hasNext();

                )
                  for (
                    var s = n.next(), o = 0;
                    o < this._linkMatchers.length;
                    o++
                  )
                    this._doLinkifyRow(
                      s.range.first,
                      s.content,
                      this._linkMatchers[o]
                    );
                (this._rowsToLinkify.start = null),
                  (this._rowsToLinkify.end = null);
              }
            }),
            (a.prototype.registerLinkMatcher = function(e, t, i) {
              if ((void 0 === i && (i = {}), !t))
                throw new Error("handler must be defined");
              var r = {
                id: this._nextLinkMatcherId++,
                regex: e,
                handler: t,
                matchIndex: i.matchIndex,
                validationCallback: i.validationCallback,
                hoverTooltipCallback: i.tooltipCallback,
                hoverLeaveCallback: i.leaveCallback,
                willLinkActivate: i.willLinkActivate,
                priority: i.priority || 0
              };
              return this._addLinkMatcherToList(r), r.id;
            }),
            (a.prototype._addLinkMatcherToList = function(e) {
              if (0 !== this._linkMatchers.length) {
                for (var t = this._linkMatchers.length - 1; 0 <= t; t--)
                  if (e.priority <= this._linkMatchers[t].priority)
                    return void this._linkMatchers.splice(t + 1, 0, e);
                this._linkMatchers.splice(0, 0, e);
              } else this._linkMatchers.push(e);
            }),
            (a.prototype.deregisterLinkMatcher = function(e) {
              for (var t = 0; t < this._linkMatchers.length; t++)
                if (this._linkMatchers[t].id === e)
                  return this._linkMatchers.splice(t, 1), !0;
              return !1;
            }),
            (a.prototype._doLinkifyRow = function(n, s, o) {
              for (
                var a,
                  l = this,
                  h = new RegExp(o.regex.source, o.regex.flags + "g"),
                  c = -1,
                  e = function() {
                    var t =
                      a["number" != typeof o.matchIndex ? 0 : o.matchIndex];
                    if (!t) {
                      if (u._terminal.debug)
                        throw (console.log({ match: a, matcher: o }),
                        new Error(
                          "match found without corresponding matchIndex"
                        ));
                      return "break";
                    }
                    if (
                      ((c = s.indexOf(t, c + 1)),
                      (h.lastIndex = c + t.length),
                      c < 0)
                    )
                      return "break";
                    var i = u._terminal.buffer.stringIndexToBufferIndex(n, c);
                    if (i[0] < 0) return "break";
                    var r,
                      e = u._terminal.buffer.lines.get(i[0]).getFg(i[1]);
                    e && (r = (e >> 9) & 511),
                      o.validationCallback
                        ? o.validationCallback(t, function(e) {
                            l._rowsTimeoutId ||
                              (e &&
                                l._addLink(
                                  i[1],
                                  i[0] - l._terminal.buffer.ydisp,
                                  t,
                                  o,
                                  r
                                ));
                          })
                        : u._addLink(
                            i[1],
                            i[0] - u._terminal.buffer.ydisp,
                            t,
                            o,
                            r
                          );
                  },
                  u = this;
                null !== (a = h.exec(s)) && "break" !== e();

              );
            }),
            (a.prototype._addLink = function(e, t, i, r, n) {
              var s = this,
                o = f.getStringCellWidth(i),
                a = e % this._terminal.cols,
                l = t + Math.floor(e / this._terminal.cols),
                h = (a + o) % this._terminal.cols,
                c = l + Math.floor((a + o) / this._terminal.cols);
              0 === h && ((h = this._terminal.cols), c--),
                this._mouseZoneManager.add(
                  new u.MouseZone(
                    1 + a,
                    l + 1,
                    h + 1,
                    c + 1,
                    function(e) {
                      if (r.handler) return r.handler(e, i);
                      window.open(i, "_blank");
                    },
                    function() {
                      s._onLinkHover.fire(
                        s._createLinkHoverEvent(a, l, h, c, n)
                      ),
                        s._terminal.element.classList.add(
                          "xterm-cursor-pointer"
                        );
                    },
                    function(e) {
                      s._onLinkTooltip.fire(
                        s._createLinkHoverEvent(a, l, h, c, n)
                      ),
                        r.hoverTooltipCallback && r.hoverTooltipCallback(e, i);
                    },
                    function() {
                      s._onLinkLeave.fire(
                        s._createLinkHoverEvent(a, l, h, c, n)
                      ),
                        s._terminal.element.classList.remove(
                          "xterm-cursor-pointer"
                        ),
                        r.hoverLeaveCallback && r.hoverLeaveCallback();
                    },
                    function(e) {
                      return !r.willLinkActivate || r.willLinkActivate(e, i);
                    }
                  )
                );
            }),
            (a.prototype._createLinkHoverEvent = function(e, t, i, r, n) {
              return {
                x1: e,
                y1: t,
                x2: i,
                y2: r,
                cols: this._terminal.cols,
                fg: n
              };
            }),
            (a.TIME_BEFORE_LINKIFY = 200),
            (a.OVERSCAN_CHAR_LIMIT = 2e3),
            a);
          function a(e) {
            (this._terminal = e),
              (this._linkMatchers = []),
              (this._nextLinkMatcherId = 0),
              (this._onLinkHover = new r.EventEmitter2()),
              (this._onLinkLeave = new r.EventEmitter2()),
              (this._onLinkTooltip = new r.EventEmitter2()),
              (this._rowsToLinkify = { start: null, end: null });
          }
          i.Linkifier = n;
        },
        {
          "./CharWidth": 5,
          "./MouseZoneManager": 12,
          "./common/EventEmitter2": 23
        }
      ],
      11: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((a.getCoordsRelativeToElement = function(e, t) {
            var i = t.getBoundingClientRect();
            return [e.clientX - i.left, e.clientY - i.top];
          }),
          (a.prototype.getCoords = function(e, t, i, r, n, s) {
            if (!i.width || !i.height) return null;
            var o = a.getCoordsRelativeToElement(e, t);
            return o
              ? ((o[0] = Math.ceil(
                  (o[0] +
                    (s
                      ? this._renderCoordinator.dimensions.actualCellWidth / 2
                      : 0)) /
                    this._renderCoordinator.dimensions.actualCellWidth
                )),
                (o[1] = Math.ceil(
                  o[1] / this._renderCoordinator.dimensions.actualCellHeight
                )),
                (o[0] = Math.min(Math.max(o[0], 1), r + (s ? 1 : 0))),
                (o[1] = Math.min(Math.max(o[1], 1), n)),
                o)
              : null;
          }),
          (a.prototype.getRawByteCoords = function(e, t, i, r, n) {
            var s = this.getCoords(e, t, i, r, n),
              o = s[0],
              a = s[1];
            return { x: (o += 32), y: (a += 32) };
          }),
          a);
          function a(e) {
            this._renderCoordinator = e;
          }
          i.MouseHelper = r;
        },
        {}
      ],
      12: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./common/Lifecycle"),
            a = e("./ui/Lifecycle"),
            l = ((s = o.Disposable),
            n(h, s),
            (h.prototype.dispose = function() {
              s.prototype.dispose.call(this), this._deactivate();
            }),
            (h.prototype.add = function(e) {
              this._zones.push(e), 1 === this._zones.length && this._activate();
            }),
            (h.prototype.clearAll = function(e, t) {
              if (0 !== this._zones.length) {
                t || ((e = 0), (t = this._terminal.rows - 1));
                for (var i = 0; i < this._zones.length; i++) {
                  var r = this._zones[i];
                  ((r.y1 > e && r.y1 <= t + 1) ||
                    (r.y2 > e && r.y2 <= t + 1) ||
                    (r.y1 < e && r.y2 > t + 1)) &&
                    (this._currentZone &&
                      this._currentZone === r &&
                      (this._currentZone.leaveCallback(),
                      (this._currentZone = null)),
                    this._zones.splice(i--, 1));
                }
                0 === this._zones.length && this._deactivate();
              }
            }),
            (h.prototype._activate = function() {
              this._areZonesActive ||
                ((this._areZonesActive = !0),
                this._terminal.element.addEventListener(
                  "mousemove",
                  this._mouseMoveListener
                ),
                this._terminal.element.addEventListener(
                  "mouseleave",
                  this._mouseLeaveListener
                ),
                this._terminal.element.addEventListener(
                  "click",
                  this._clickListener
                ));
            }),
            (h.prototype._deactivate = function() {
              this._areZonesActive &&
                ((this._areZonesActive = !1),
                this._terminal.element.removeEventListener(
                  "mousemove",
                  this._mouseMoveListener
                ),
                this._terminal.element.removeEventListener(
                  "mouseleave",
                  this._mouseLeaveListener
                ),
                this._terminal.element.removeEventListener(
                  "click",
                  this._clickListener
                ));
            }),
            (h.prototype._onMouseMove = function(e) {
              (this._lastHoverCoords[0] === e.pageX &&
                this._lastHoverCoords[1] === e.pageY) ||
                (this._onHover(e),
                (this._lastHoverCoords = [e.pageX, e.pageY]));
            }),
            (h.prototype._onHover = function(e) {
              var t = this,
                i = this._findZoneEventAt(e);
              i !== this._currentZone &&
                (this._currentZone &&
                  (this._currentZone.leaveCallback(),
                  (this._currentZone = null),
                  this._tooltipTimeout && clearTimeout(this._tooltipTimeout)),
                i &&
                  ((this._currentZone = i).hoverCallback && i.hoverCallback(e),
                  (this._tooltipTimeout = setTimeout(function() {
                    return t._onTooltip(e);
                  }, 500))));
            }),
            (h.prototype._onTooltip = function(e) {
              this._tooltipTimeout = null;
              var t = this._findZoneEventAt(e);
              t && t.tooltipCallback && t.tooltipCallback(e);
            }),
            (h.prototype._onMouseDown = function(e) {
              if (
                ((this._initialSelectionLength = this._terminal.getSelection().length),
                this._areZonesActive)
              ) {
                var t = this._findZoneEventAt(e);
                t &&
                  t.willLinkActivate(e) &&
                  (e.preventDefault(), e.stopImmediatePropagation());
              }
            }),
            (h.prototype._onMouseLeave = function(e) {
              this._currentZone &&
                (this._currentZone.leaveCallback(),
                (this._currentZone = null),
                this._tooltipTimeout && clearTimeout(this._tooltipTimeout));
            }),
            (h.prototype._onClick = function(e) {
              var t = this._findZoneEventAt(e),
                i = this._terminal.getSelection().length;
              t &&
                i === this._initialSelectionLength &&
                (t.clickCallback(e),
                e.preventDefault(),
                e.stopImmediatePropagation());
            }),
            (h.prototype._findZoneEventAt = function(e) {
              var t = this._terminal.mouseHelper.getCoords(
                e,
                this._terminal.screenElement,
                this._terminal.charMeasure,
                this._terminal.cols,
                this._terminal.rows
              );
              if (!t) return null;
              for (var i = t[0], r = t[1], n = 0; n < this._zones.length; n++) {
                var s = this._zones[n];
                if (s.y1 === s.y2) {
                  if (r === s.y1 && i >= s.x1 && i < s.x2) return s;
                } else if (
                  (r === s.y1 && i >= s.x1) ||
                  (r === s.y2 && i < s.x2) ||
                  (r > s.y1 && r < s.y2)
                )
                  return s;
              }
              return null;
            }),
            h);
          function h(e) {
            var t = s.call(this) || this;
            return (
              (t._terminal = e),
              (t._zones = []),
              (t._areZonesActive = !1),
              (t._tooltipTimeout = null),
              (t._currentZone = null),
              (t._lastHoverCoords = [null, null]),
              t.register(
                a.addDisposableDomListener(
                  t._terminal.element,
                  "mousedown",
                  function(e) {
                    return t._onMouseDown(e);
                  }
                )
              ),
              (t._mouseMoveListener = function(e) {
                return t._onMouseMove(e);
              }),
              (t._mouseLeaveListener = function(e) {
                return t._onMouseLeave(e);
              }),
              (t._clickListener = function(e) {
                return t._onClick(e);
              }),
              t
            );
          }
          i.MouseZoneManager = l;
          function c(e, t, i, r, n, s, o, a, l) {
            (this.x1 = e),
              (this.y1 = t),
              (this.x2 = i),
              (this.y2 = r),
              (this.clickCallback = n),
              (this.hoverCallback = s),
              (this.tooltipCallback = o),
              (this.leaveCallback = a),
              (this.willLinkActivate = l);
          }
          i.MouseZone = c;
        },
        { "./common/Lifecycle": 24, "./ui/Lifecycle": 59 }
      ],
      13: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("./MouseHelper"),
            a = e("./common/Platform"),
            n = e("./SelectionModel"),
            s = e("./handlers/AltClickHandler"),
            o = e("./core/buffer/BufferLine"),
            l = e("./common/EventEmitter2"),
            h = String.fromCharCode(160),
            c = new RegExp(h, "g"),
            u = (Object.defineProperty(f.prototype, "onLinuxMouseSelection", {
              get: function() {
                return this._onLinuxMouseSelection.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(f.prototype, "onRedrawRequest", {
              get: function() {
                return this._onRedrawRequest.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(f.prototype, "onSelectionChange", {
              get: function() {
                return this._onSelectionChange.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            (f.prototype.dispose = function() {
              this._removeMouseDownListeners();
            }),
            Object.defineProperty(f.prototype, "_buffer", {
              get: function() {
                return this._terminal.buffers.active;
              },
              enumerable: !0,
              configurable: !0
            }),
            (f.prototype._initListeners = function() {
              var t = this;
              (this._mouseMoveListener = function(e) {
                return t._onMouseMove(e);
              }),
                (this._mouseUpListener = function(e) {
                  return t._onMouseUp(e);
                }),
                this.initBuffersListeners();
            }),
            (f.prototype.initBuffersListeners = function() {
              var t = this;
              (this._trimListener = this._terminal.buffer.lines.onTrim(function(
                e
              ) {
                return t._onTrim(e);
              })),
                this._terminal.buffers.onBufferActivate(function(e) {
                  return t._onBufferActivate(e);
                });
            }),
            (f.prototype.disable = function() {
              this.clearSelection(), (this._enabled = !1);
            }),
            (f.prototype.enable = function() {
              this._enabled = !0;
            }),
            Object.defineProperty(f.prototype, "selectionStart", {
              get: function() {
                return this._model.finalSelectionStart;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(f.prototype, "selectionEnd", {
              get: function() {
                return this._model.finalSelectionEnd;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(f.prototype, "hasSelection", {
              get: function() {
                var e = this._model.finalSelectionStart,
                  t = this._model.finalSelectionEnd;
                return !(!e || !t || (e[0] === t[0] && e[1] === t[1]));
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(f.prototype, "selectionText", {
              get: function() {
                var e = this._model.finalSelectionStart,
                  t = this._model.finalSelectionEnd;
                if (!e || !t) return "";
                var i = [];
                if (3 === this._activeSelectionMode) {
                  if (e[0] === t[0]) return "";
                  for (var r = e[1]; r <= t[1]; r++) {
                    var n = this._buffer.translateBufferLineToString(
                      r,
                      !0,
                      e[0],
                      t[0]
                    );
                    i.push(n);
                  }
                } else {
                  var s = e[1] === t[1] ? t[0] : void 0;
                  for (
                    i.push(
                      this._buffer.translateBufferLineToString(
                        e[1],
                        !0,
                        e[0],
                        s
                      )
                    ),
                      r = e[1] + 1;
                    r <= t[1] - 1;
                    r++
                  ) {
                    var o = this._buffer.lines.get(r);
                    (n = this._buffer.translateBufferLineToString(r, !0)),
                      o.isWrapped ? (i[i.length - 1] += n) : i.push(n);
                  }
                  e[1] !== t[1] &&
                    ((o = this._buffer.lines.get(t[1])),
                    (n = this._buffer.translateBufferLineToString(
                      t[1],
                      !0,
                      0,
                      t[0]
                    )),
                    o.isWrapped ? (i[i.length - 1] += n) : i.push(n));
                }
                return i
                  .map(function(e) {
                    return e.replace(c, " ");
                  })
                  .join(a.isMSWindows ? "\r\n" : "\n");
              },
              enumerable: !0,
              configurable: !0
            }),
            (f.prototype.clearSelection = function() {
              this._model.clearSelection(),
                this._removeMouseDownListeners(),
                this.refresh(),
                this._onSelectionChange.fire();
            }),
            (f.prototype.refresh = function(e) {
              var t = this;
              this._refreshAnimationFrame ||
                (this._refreshAnimationFrame = window.requestAnimationFrame(
                  function() {
                    return t._refresh();
                  }
                )),
                a.isLinux &&
                  e &&
                  this.selectionText.length &&
                  this._onLinuxMouseSelection.fire(this.selectionText);
            }),
            (f.prototype._refresh = function() {
              (this._refreshAnimationFrame = null),
                this._onRedrawRequest.fire({
                  start: this._model.finalSelectionStart,
                  end: this._model.finalSelectionEnd,
                  columnSelectMode: 3 === this._activeSelectionMode
                });
            }),
            (f.prototype.isClickInSelection = function(e) {
              var t = this._getMouseBufferCoords(e),
                i = this._model.finalSelectionStart,
                r = this._model.finalSelectionEnd;
              return !(!i || !r) && this._areCoordsInSelection(t, i, r);
            }),
            (f.prototype._areCoordsInSelection = function(e, t, i) {
              return (
                (e[1] > t[1] && e[1] < i[1]) ||
                (t[1] === i[1] &&
                  e[1] === t[1] &&
                  e[0] >= t[0] &&
                  e[0] < i[0]) ||
                (t[1] < i[1] && e[1] === i[1] && e[0] < i[0]) ||
                (t[1] < i[1] && e[1] === t[1] && e[0] >= t[0])
              );
            }),
            (f.prototype.selectWordAtCursor = function(e) {
              var t = this._getMouseBufferCoords(e);
              t &&
                (this._selectWordAt(t, !1),
                (this._model.selectionEnd = null),
                this.refresh(!0));
            }),
            (f.prototype.selectAll = function() {
              (this._model.isSelectAllActive = !0),
                this.refresh(),
                this._onSelectionChange.fire();
            }),
            (f.prototype.selectLines = function(e, t) {
              this._model.clearSelection(),
                (e = Math.max(e, 0)),
                (t = Math.min(t, this._terminal.buffer.lines.length - 1)),
                (this._model.selectionStart = [0, e]),
                (this._model.selectionEnd = [this._terminal.cols, t]),
                this.refresh(),
                this._onSelectionChange.fire();
            }),
            (f.prototype._onTrim = function(e) {
              this._model.onTrim(e) && this.refresh();
            }),
            (f.prototype._getMouseBufferCoords = function(e) {
              var t = this._terminal.mouseHelper.getCoords(
                e,
                this._terminal.screenElement,
                this._charMeasure,
                this._terminal.cols,
                this._terminal.rows,
                !0
              );
              return t
                ? (t[0]--, t[1]--, (t[1] += this._terminal.buffer.ydisp), t)
                : null;
            }),
            (f.prototype._getMouseEventScrollAmount = function(e) {
              var t = r.MouseHelper.getCoordsRelativeToElement(
                  e,
                  this._terminal.screenElement
                )[1],
                i =
                  this._terminal.rows *
                  Math.ceil(
                    this._charMeasure.height * this._terminal.options.lineHeight
                  );
              return 0 <= t && t <= i
                ? 0
                : (i < t && (t -= i),
                  (t = Math.min(Math.max(t, -50), 50)),
                  (t /= 50) / Math.abs(t) + Math.round(14 * t));
            }),
            (f.prototype.shouldForceSelection = function(e) {
              return a.isMac
                ? e.altKey &&
                    this._terminal.options.macOptionClickForcesSelection
                : e.shiftKey;
            }),
            (f.prototype.onMouseDown = function(e) {
              if (
                ((this._mouseDownTimeStamp = e.timeStamp),
                (2 !== e.button || !this.hasSelection) && 0 === e.button)
              ) {
                if (!this._enabled) {
                  if (!this.shouldForceSelection(e)) return;
                  e.stopPropagation();
                }
                e.preventDefault(),
                  (this._dragScrollAmount = 0),
                  this._enabled && e.shiftKey
                    ? this._onIncrementalClick(e)
                    : 1 === e.detail
                    ? this._onSingleClick(e)
                    : 2 === e.detail
                    ? this._onDoubleClick(e)
                    : 3 === e.detail && this._onTripleClick(e),
                  this._addMouseDownListeners(),
                  this.refresh(!0);
              }
            }),
            (f.prototype._addMouseDownListeners = function() {
              var e = this;
              this._terminal.element.ownerDocument.addEventListener(
                "mousemove",
                this._mouseMoveListener
              ),
                this._terminal.element.ownerDocument.addEventListener(
                  "mouseup",
                  this._mouseUpListener
                ),
                (this._dragScrollIntervalTimer = setInterval(function() {
                  return e._dragScroll();
                }, 50));
            }),
            (f.prototype._removeMouseDownListeners = function() {
              this._terminal.element.ownerDocument &&
                (this._terminal.element.ownerDocument.removeEventListener(
                  "mousemove",
                  this._mouseMoveListener
                ),
                this._terminal.element.ownerDocument.removeEventListener(
                  "mouseup",
                  this._mouseUpListener
                )),
                clearInterval(this._dragScrollIntervalTimer),
                (this._dragScrollIntervalTimer = null);
            }),
            (f.prototype._onIncrementalClick = function(e) {
              this._model.selectionStart &&
                (this._model.selectionEnd = this._getMouseBufferCoords(e));
            }),
            (f.prototype._onSingleClick = function(e) {
              if (
                ((this._model.selectionStartLength = 0),
                (this._model.isSelectAllActive = !1),
                (this._activeSelectionMode = this.shouldColumnSelect(e)
                  ? 3
                  : 0),
                (this._model.selectionStart = this._getMouseBufferCoords(e)),
                this._model.selectionStart)
              ) {
                this._model.selectionEnd = null;
                var t = this._buffer.lines.get(this._model.selectionStart[1]);
                t &&
                  (t.length >= this._model.selectionStart[0] ||
                    (0 === t.hasWidth(this._model.selectionStart[0]) &&
                      this._model.selectionStart[0]++));
              }
            }),
            (f.prototype._onDoubleClick = function(e) {
              var t = this._getMouseBufferCoords(e);
              t && ((this._activeSelectionMode = 1), this._selectWordAt(t, !0));
            }),
            (f.prototype._onTripleClick = function(e) {
              var t = this._getMouseBufferCoords(e);
              t && ((this._activeSelectionMode = 2), this._selectLineAt(t[1]));
            }),
            (f.prototype.shouldColumnSelect = function(e) {
              return (
                e.altKey &&
                !(
                  a.isMac &&
                  this._terminal.options.macOptionClickForcesSelection
                )
              );
            }),
            (f.prototype._onMouseMove = function(e) {
              e.stopImmediatePropagation();
              var t = this._model.selectionEnd
                ? [this._model.selectionEnd[0], this._model.selectionEnd[1]]
                : null;
              (this._model.selectionEnd = this._getMouseBufferCoords(e)),
                this._model.selectionEnd
                  ? (2 === this._activeSelectionMode
                      ? this._model.selectionEnd[1] <
                        this._model.selectionStart[1]
                        ? (this._model.selectionEnd[0] = 0)
                        : (this._model.selectionEnd[0] = this._terminal.cols)
                      : 1 === this._activeSelectionMode &&
                        this._selectToWordAt(this._model.selectionEnd),
                    (this._dragScrollAmount = this._getMouseEventScrollAmount(
                      e
                    )),
                    3 !== this._activeSelectionMode &&
                      (0 < this._dragScrollAmount
                        ? (this._model.selectionEnd[0] = this._terminal.cols)
                        : this._dragScrollAmount < 0 &&
                          (this._model.selectionEnd[0] = 0)),
                    this._model.selectionEnd[1] < this._buffer.lines.length &&
                      0 ===
                        this._buffer.lines
                          .get(this._model.selectionEnd[1])
                          .hasWidth(this._model.selectionEnd[0]) &&
                      this._model.selectionEnd[0]++,
                    (t &&
                      t[0] === this._model.selectionEnd[0] &&
                      t[1] === this._model.selectionEnd[1]) ||
                      this.refresh(!0))
                  : this.refresh(!0);
            }),
            (f.prototype._dragScroll = function() {
              this._dragScrollAmount &&
                (this._terminal.scrollLines(this._dragScrollAmount, !1),
                0 < this._dragScrollAmount
                  ? (3 !== this._activeSelectionMode &&
                      (this._model.selectionEnd[0] = this._terminal.cols),
                    (this._model.selectionEnd[1] = Math.min(
                      this._terminal.buffer.ydisp + this._terminal.rows,
                      this._terminal.buffer.lines.length - 1
                    )))
                  : (3 !== this._activeSelectionMode &&
                      (this._model.selectionEnd[0] = 0),
                    (this._model.selectionEnd[1] = this._terminal.buffer.ydisp)),
                this.refresh());
            }),
            (f.prototype._onMouseUp = function(e) {
              var t = e.timeStamp - this._mouseDownTimeStamp;
              this._removeMouseDownListeners(),
                this.selectionText.length <= 1 && t < 500
                  ? new s.AltClickHandler(e, this._terminal).move()
                  : this.hasSelection && this._onSelectionChange.fire();
            }),
            (f.prototype._onBufferActivate = function(e) {
              var t = this;
              this.clearSelection(),
                this._trimListener && this._trimListener.dispose(),
                (this._trimListener = e.activeBuffer.lines.onTrim(function(e) {
                  return t._onTrim(e);
                }));
            }),
            (f.prototype._convertViewportColToCharacterIndex = function(e, t) {
              for (var i = t[0], r = 0; t[0] >= r; r++) {
                var n = e.loadCell(r, this._workCell).getChars().length;
                0 === this._workCell.getWidth()
                  ? i--
                  : 1 < n && t[0] !== r && (i += n - 1);
              }
              return i;
            }),
            (f.prototype.setSelection = function(e, t, i) {
              this._model.clearSelection(),
                this._removeMouseDownListeners(),
                (this._model.selectionStart = [e, t]),
                (this._model.selectionStartLength = i),
                this.refresh();
            }),
            (f.prototype._getWordAt = function(e, t, i, r) {
              if (
                (void 0 === i && (i = !0),
                void 0 === r && (r = !0),
                e[0] >= this._terminal.cols)
              )
                return null;
              var n = this._buffer.lines.get(e[1]);
              if (!n) return null;
              var s = this._buffer.translateBufferLineToString(e[1], !1),
                o = this._convertViewportColToCharacterIndex(n, e),
                a = o,
                l = e[0] - o,
                h = 0,
                c = 0,
                u = 0,
                f = 0;
              if (" " === s.charAt(o)) {
                for (; 0 < o && " " === s.charAt(o - 1); ) o--;
                for (; a < s.length && " " === s.charAt(a + 1); ) a++;
              } else {
                var _ = e[0],
                  d = e[0];
                0 === n.getWidth(_) && (h++, _--),
                  2 === n.getWidth(d) && (c++, d++);
                var p = n.getString(d).length;
                for (
                  1 < p && ((f += p - 1), (a += p - 1));
                  0 < _ &&
                  0 < o &&
                  !this._isCharWordSeparator(n.loadCell(_ - 1, this._workCell));

                ) {
                  n.loadCell(_ - 1, this._workCell);
                  var m = this._workCell.getChars().length;
                  0 === this._workCell.getWidth()
                    ? (h++, _--)
                    : 1 < m && ((u += m - 1), (o -= m - 1)),
                    o--,
                    _--;
                }
                for (
                  ;
                  d < n.length &&
                  a + 1 < s.length &&
                  !this._isCharWordSeparator(n.loadCell(d + 1, this._workCell));

                ) {
                  n.loadCell(d + 1, this._workCell);
                  var y = this._workCell.getChars().length;
                  2 === this._workCell.getWidth()
                    ? (c++, d++)
                    : 1 < y && ((f += y - 1), (a += y - 1)),
                    a++,
                    d++;
                }
              }
              a++;
              var g = o + l - h + u,
                C = Math.min(this._terminal.cols, a - o + h + c - u - f);
              if (!t && "" === s.slice(o, a).trim()) return null;
              if (i && 0 === g && 32 !== n.getCodePoint(0)) {
                var v = this._buffer.lines.get(e[1] - 1);
                if (
                  v &&
                  n.isWrapped &&
                  32 !== v.getCodePoint(this._terminal.cols - 1)
                ) {
                  var b = this._getWordAt(
                    [this._terminal.cols - 1, e[1] - 1],
                    !1,
                    !0,
                    !1
                  );
                  if (b) {
                    var w = this._terminal.cols - b.start;
                    (g -= w), (C += w);
                  }
                }
              }
              if (
                r &&
                g + C === this._terminal.cols &&
                32 !== n.getCodePoint(this._terminal.cols - 1)
              ) {
                var S = this._buffer.lines.get(e[1] + 1);
                if (S && S.isWrapped && 32 !== S.getCodePoint(0)) {
                  var E = this._getWordAt([0, e[1] + 1], !1, !1, !0);
                  E && (C += E.length);
                }
              }
              return { start: g, length: C };
            }),
            (f.prototype._selectWordAt = function(e, t) {
              var i = this._getWordAt(e, t);
              if (i) {
                for (; i.start < 0; ) (i.start += this._terminal.cols), e[1]--;
                (this._model.selectionStart = [i.start, e[1]]),
                  (this._model.selectionStartLength = i.length);
              }
            }),
            (f.prototype._selectToWordAt = function(e) {
              var t = this._getWordAt(e, !0);
              if (t) {
                for (var i = e[1]; t.start < 0; )
                  (t.start += this._terminal.cols), i--;
                if (!this._model.areSelectionValuesReversed())
                  for (; t.start + t.length > this._terminal.cols; )
                    (t.length -= this._terminal.cols), i++;
                this._model.selectionEnd = [
                  this._model.areSelectionValuesReversed()
                    ? t.start
                    : t.start + t.length,
                  i
                ];
              }
            }),
            (f.prototype._isCharWordSeparator = function(e) {
              return (
                0 !== e.getWidth() && 0 <= " ()[]{}'\"".indexOf(e.getChars())
              );
            }),
            (f.prototype._selectLineAt = function(e) {
              var t = this._buffer.getWrappedRangeForLine(e);
              (this._model.selectionStart = [0, t.first]),
                (this._model.selectionEnd = [this._terminal.cols, t.last]),
                (this._model.selectionStartLength = 0);
            }),
            f);
          function f(e, t) {
            (this._terminal = e),
              (this._charMeasure = t),
              (this._enabled = !0),
              (this._workCell = new o.CellData()),
              (this._onLinuxMouseSelection = new l.EventEmitter2()),
              (this._onRedrawRequest = new l.EventEmitter2()),
              (this._onSelectionChange = new l.EventEmitter2()),
              this._initListeners(),
              this.enable(),
              (this._model = new n.SelectionModel(e)),
              (this._activeSelectionMode = 0);
          }
          i.SelectionManager = u;
        },
        {
          "./MouseHelper": 11,
          "./SelectionModel": 14,
          "./common/EventEmitter2": 23,
          "./common/Platform": 25,
          "./core/buffer/BufferLine": 29,
          "./handlers/AltClickHandler": 35
        }
      ],
      14: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((n.prototype.clearSelection = function() {
            (this.selectionStart = null),
              (this.selectionEnd = null),
              (this.isSelectAllActive = !1),
              (this.selectionStartLength = 0);
          }),
          Object.defineProperty(n.prototype, "finalSelectionStart", {
            get: function() {
              return this.isSelectAllActive
                ? [0, 0]
                : this.selectionEnd &&
                  this.selectionStart &&
                  this.areSelectionValuesReversed()
                ? this.selectionEnd
                : this.selectionStart;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(n.prototype, "finalSelectionEnd", {
            get: function() {
              if (this.isSelectAllActive)
                return [
                  this._terminal.cols,
                  this._terminal.buffer.ybase + this._terminal.rows - 1
                ];
              if (!this.selectionStart) return null;
              if (this.selectionEnd && !this.areSelectionValuesReversed())
                return this.selectionStartLength &&
                  this.selectionEnd[1] === this.selectionStart[1]
                  ? [
                      Math.max(
                        this.selectionStart[0] + this.selectionStartLength,
                        this.selectionEnd[0]
                      ),
                      this.selectionEnd[1]
                    ]
                  : this.selectionEnd;
              var e = this.selectionStart[0] + this.selectionStartLength;
              return e > this._terminal.cols
                ? [
                    e % this._terminal.cols,
                    this.selectionStart[1] + Math.floor(e / this._terminal.cols)
                  ]
                : [e, this.selectionStart[1]];
            },
            enumerable: !0,
            configurable: !0
          }),
          (n.prototype.areSelectionValuesReversed = function() {
            var e = this.selectionStart,
              t = this.selectionEnd;
            return (
              !(!e || !t) && (e[1] > t[1] || (e[1] === t[1] && e[0] > t[0]))
            );
          }),
          (n.prototype.onTrim = function(e) {
            return (
              this.selectionStart && (this.selectionStart[1] -= e),
              this.selectionEnd && (this.selectionEnd[1] -= e),
              this.selectionEnd && this.selectionEnd[1] < 0
                ? (this.clearSelection(), !0)
                : (this.selectionStart &&
                    this.selectionStart[1] < 0 &&
                    (this.selectionStart[1] = 0),
                  !1)
            );
          }),
          n);
          function n(e) {
            (this._terminal = e), this.clearSelection();
          }
          i.SelectionModel = r;
        },
        {}
      ],
      15: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.DEFAULT_BELL_SOUND =
              "data:audio/wav;base64,UklGRigBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAADpAFgCwAMlBZoG/wdmCcoKRAypDQ8PbRDBEQQTOxRtFYcWlBePGIUZXhoiG88bcBz7HHIdzh0WHlMeZx51HmkeUx4WHs8dah0AHXwc3hs9G4saxRnyGBIYGBcQFv8U4RPAEoYRQBACD70NWwwHC6gJOwjWBloF7gOBAhABkf8b/qv8R/ve+Xf4Ife79W/0JfPZ8Z/wde9N7ijtE+wU6xvqM+lb6H7nw+YX5mrlxuQz5Mzje+Ma49fioeKD4nXiYeJy4pHitOL04j/jn+MN5IPkFOWs5U3mDefM55/ogOl36m7rdOyE7abuyu8D8Unyj/Pg9D/2qfcb+Yn6/vuK/Qj/lAAlAg==");
          var r = (Object.defineProperty(n, "audioContext", {
            get: function() {
              if (!n._audioContext) {
                var e = window.AudioContext || window.webkitAudioContext;
                if (!e)
                  return (
                    console.warn(
                      "Web Audio API is not supported by this browser. Consider upgrading to the latest version"
                    ),
                    null
                  );
                n._audioContext = new e();
              }
              return n._audioContext;
            },
            enumerable: !0,
            configurable: !0
          }),
          (n.prototype.playBellSound = function() {
            var t = n.audioContext;
            if (t) {
              var i = t.createBufferSource();
              t.decodeAudioData(
                this._base64ToArrayBuffer(
                  this._removeMimeType(this._terminal.options.bellSound)
                ),
                function(e) {
                  (i.buffer = e), i.connect(t.destination), i.start(0);
                }
              );
            }
          }),
          (n.prototype._base64ToArrayBuffer = function(e) {
            for (
              var t = window.atob(e),
                i = t.length,
                r = new Uint8Array(i),
                n = 0;
              n < i;
              n++
            )
              r[n] = t.charCodeAt(n);
            return r.buffer;
          }),
          (n.prototype._removeMimeType = function(e) {
            return e.split(",")[1];
          }),
          n);
          function n(e) {
            this._terminal = e;
          }
          i.SoundManager = r;
        },
        {}
      ],
      16: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.blankLine = "Blank line"),
            (i.promptLabel = "Terminal input"),
            (i.tooMuchOutput =
              "Too much output to announce, navigate to rows manually to read");
        },
        {}
      ],
      17: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./BufferSet"),
            a = e("./Buffer"),
            l = e("./CompositionHelper"),
            h = e("./common/EventEmitter"),
            c = e("./Viewport"),
            u = e("./Clipboard"),
            f = e("./common/data/EscapeSequences"),
            _ = e("./InputHandler"),
            d = e("./renderer/Renderer"),
            p = e("./Linkifier"),
            m = e("./SelectionManager"),
            y = e("./CharMeasure"),
            g = e("./common/Platform"),
            C = e("./ui/Lifecycle"),
            v = e("./Strings"),
            b = e("./MouseHelper"),
            w = e("./SoundManager"),
            S = e("./MouseZoneManager"),
            E = e("./AccessibilityManager"),
            L = e("./renderer/atlas/CharAtlasCache"),
            A = e("./renderer/dom/DomRenderer"),
            x = e("./core/input/Keyboard"),
            T = e("./common/Clone"),
            M = e("./common/EventEmitter2"),
            R = e("./core/buffer/BufferLine"),
            k = e("./WindowsMode"),
            D = e("./ui/ColorManager"),
            H = e("./renderer/RenderCoordinator"),
            O = "undefined" != typeof window ? window.document : null,
            B = ["cols", "rows"],
            P = {
              cols: 80,
              rows: 24,
              convertEol: !1,
              termName: "xterm",
              cursorBlink: !1,
              cursorStyle: "block",
              bellSound: w.DEFAULT_BELL_SOUND,
              bellStyle: "none",
              drawBoldTextInBrightColors: !0,
              enableBold: !0,
              experimentalCharAtlas: "static",
              fontFamily: "courier-new, courier, monospace",
              fontSize: 15,
              fontWeight: "normal",
              fontWeightBold: "bold",
              lineHeight: 1,
              letterSpacing: 0,
              scrollback: 1e3,
              screenKeys: !1,
              screenReaderMode: !1,
              debug: !1,
              macOptionIsMeta: !1,
              macOptionClickForcesSelection: !1,
              cancelEvents: !1,
              disableStdin: !1,
              useFlowControl: !1,
              allowTransparency: !1,
              tabStopWidth: 8,
              theme: void 0,
              rightClickSelectsWord: g.isMac,
              rendererType: "canvas",
              windowsMode: !1
            },
            F = ((s = h.EventEmitter),
            n(I, s),
            Object.defineProperty(I.prototype, "onCursorMove", {
              get: function() {
                return this._onCursorMove.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(I.prototype, "onData", {
              get: function() {
                return this._onData.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(I.prototype, "onKey", {
              get: function() {
                return this._onKey.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(I.prototype, "onLineFeed", {
              get: function() {
                return this._onLineFeed.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(I.prototype, "onRender", {
              get: function() {
                return this._onRender.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(I.prototype, "onResize", {
              get: function() {
                return this._onResize.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(I.prototype, "onScroll", {
              get: function() {
                return this._onScroll.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(I.prototype, "onSelectionChange", {
              get: function() {
                return this._onSelectionChange.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(I.prototype, "onTitleChange", {
              get: function() {
                return this._onTitleChange.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            (I.prototype.dispose = function() {
              s.prototype.dispose.call(this),
                this._windowsMode &&
                  (this._windowsMode.dispose(), (this._windowsMode = void 0)),
                (this._customKeyEventHandler = null),
                L.removeTerminalFromCache(this),
                (this.handler = function() {}),
                (this.write = function() {}),
                this.element &&
                  this.element.parentNode &&
                  this.element.parentNode.removeChild(this.element);
            }),
            (I.prototype.destroy = function() {
              this.dispose();
            }),
            (I.prototype._setup = function() {
              var t = this;
              Object.keys(P).forEach(function(e) {
                (null !== t.options[e] && void 0 !== t.options[e]) ||
                  (t.options[e] = P[e]);
              }),
                (this._parent = O ? O.body : null),
                (this.cols = Math.max(this.options.cols, 2)),
                (this.rows = Math.max(this.options.rows, 1)),
                this.options.handler && this.onData(this.options.handler),
                (this.cursorState = 0),
                (this.cursorHidden = !1),
                (this._customKeyEventHandler = null),
                (this.applicationKeypad = !1),
                (this.applicationCursor = !1),
                (this.originMode = !1),
                (this.insertMode = !1),
                (this.wraparoundMode = !0),
                (this.bracketedPasteMode = !1),
                (this.charset = null),
                (this.gcharset = null),
                (this.glevel = 0),
                (this.charsets = [null]),
                (this.curAttrData = R.DEFAULT_ATTR_DATA.clone()),
                (this._eraseAttrData = R.DEFAULT_ATTR_DATA.clone()),
                (this.params = []),
                (this.currentParam = 0),
                (this.writeBuffer = []),
                (this.writeBufferUtf8 = []),
                (this._writeInProgress = !1),
                (this._xoffSentToCatchUp = !1),
                (this._userScrolling = !1),
                (this._inputHandler = new _.InputHandler(this)),
                this._inputHandler.onCursorMove(function() {
                  return t._onCursorMove.fire();
                }),
                this._inputHandler.onLineFeed(function() {
                  return t._onLineFeed.fire();
                }),
                this._inputHandler.onData(function(e) {
                  return t._onData.fire(e);
                }),
                this.register(this._inputHandler),
                (this.selectionManager = this.selectionManager || null),
                (this.linkifier = this.linkifier || new p.Linkifier(this)),
                (this._mouseZoneManager = this._mouseZoneManager || null),
                (this.soundManager =
                  this.soundManager || new w.SoundManager(this)),
                (this.buffers = new o.BufferSet(this)),
                this.selectionManager &&
                  (this.selectionManager.clearSelection(),
                  this.selectionManager.initBuffersListeners()),
                this.options.windowsMode &&
                  (this._windowsMode = k.applyWindowsMode(this));
            }),
            Object.defineProperty(I.prototype, "buffer", {
              get: function() {
                return this.buffers.active;
              },
              enumerable: !0,
              configurable: !0
            }),
            (I.prototype.eraseAttrData = function() {
              return (
                (this._eraseAttrData.bg &= -67108864),
                (this._eraseAttrData.bg |= 67108863 & this.curAttrData.bg),
                this._eraseAttrData
              );
            }),
            (I.prototype.focus = function() {
              this.textarea && this.textarea.focus({ preventScroll: !0 });
            }),
            Object.defineProperty(I.prototype, "isFocused", {
              get: function() {
                return O.activeElement === this.textarea && O.hasFocus();
              },
              enumerable: !0,
              configurable: !0
            }),
            (I.prototype.getOption = function(e) {
              if (!(e in P)) throw new Error('No option with key "' + e + '"');
              return this.options[e];
            }),
            (I.prototype.setOption = function(e, t) {
              if (!(e in P)) throw new Error('No option with key "' + e + '"');
              if (
                (-1 !== B.indexOf(e) &&
                  console.error(
                    'Option "' + e + '" can only be set in the constructor'
                  ),
                this.options[e] !== t)
              ) {
                switch (e) {
                  case "bellStyle":
                    t = t || "none";
                    break;
                  case "cursorStyle":
                    t = t || "block";
                    break;
                  case "fontWeight":
                    t = t || "normal";
                    break;
                  case "fontWeightBold":
                    t = t || "bold";
                    break;
                  case "lineHeight":
                    if (t < 1)
                      return void console.warn(
                        e + " cannot be less than 1, value: " + t
                      );
                  case "rendererType":
                    t = t || "canvas";
                    break;
                  case "tabStopWidth":
                    if (t < 1)
                      return void console.warn(
                        e + " cannot be less than 1, value: " + t
                      );
                    break;
                  case "theme":
                    this._setTheme(t);
                    break;
                  case "scrollback":
                    if ((t = Math.min(t, a.MAX_BUFFER_SIZE)) < 0)
                      return void console.warn(
                        e + " cannot be less than 0, value: " + t
                      );
                    if (this.options[e] !== t) {
                      var i = this.rows + t;
                      if (this.buffer.lines.length > i) {
                        var r = this.buffer.lines.length - i,
                          n = this.buffer.ydisp - r < 0;
                        this.buffer.lines.trimStart(r),
                          (this.buffer.ybase = Math.max(
                            this.buffer.ybase - r,
                            0
                          )),
                          (this.buffer.ydisp = Math.max(
                            this.buffer.ydisp - r,
                            0
                          )),
                          n && this.refresh(0, this.rows - 1);
                      }
                    }
                }
                switch (((this.options[e] = t), e)) {
                  case "fontFamily":
                  case "fontSize":
                    this._renderCoordinator &&
                      (this._renderCoordinator.clear(),
                      this.charMeasure.measure(this.options));
                    break;
                  case "drawBoldTextInBrightColors":
                  case "experimentalCharAtlas":
                  case "enableBold":
                  case "letterSpacing":
                  case "lineHeight":
                  case "fontWeight":
                  case "fontWeightBold":
                    this._renderCoordinator &&
                      (this._renderCoordinator.clear(),
                      this._renderCoordinator.onResize(this.cols, this.rows),
                      this.refresh(0, this.rows - 1));
                    break;
                  case "rendererType":
                    this._renderCoordinator &&
                      this._renderCoordinator.setRenderer(
                        this._createRenderer()
                      );
                    break;
                  case "scrollback":
                    this.buffers.resize(this.cols, this.rows),
                      this.viewport && this.viewport.syncScrollArea();
                    break;
                  case "screenReaderMode":
                    t
                      ? !this._accessibilityManager &&
                        this._renderCoordinator &&
                        (this._accessibilityManager = new E.AccessibilityManager(
                          this,
                          this._renderCoordinator.dimensions
                        ))
                      : this._accessibilityManager &&
                        (this._accessibilityManager.dispose(),
                        (this._accessibilityManager = null));
                    break;
                  case "tabStopWidth":
                    this.buffers.setupTabStops();
                    break;
                  case "windowsMode":
                    t
                      ? this._windowsMode ||
                        (this._windowsMode = k.applyWindowsMode(this))
                      : this._windowsMode &&
                        (this._windowsMode.dispose(),
                        (this._windowsMode = void 0));
                }
                this._renderCoordinator &&
                  this._renderCoordinator.onOptionsChanged();
              }
            }),
            (I.prototype._onTextAreaFocus = function(e) {
              this.sendFocus && this.handler(f.C0.ESC + "[I"),
                this.updateCursorStyle(e),
                this.element.classList.add("focus"),
                this.showCursor(),
                this.emit("focus");
            }),
            (I.prototype.blur = function() {
              return this.textarea.blur();
            }),
            (I.prototype._onTextAreaBlur = function() {
              (this.textarea.value = ""),
                this.refresh(this.buffer.y, this.buffer.y),
                this.sendFocus && this.handler(f.C0.ESC + "[O"),
                this.element.classList.remove("focus"),
                this.emit("blur");
            }),
            (I.prototype._initGlobal = function() {
              var t = this;
              function e(e) {
                return u.pasteHandler(e, t);
              }
              this._bindKeys(),
                this.register(
                  C.addDisposableDomListener(this.element, "copy", function(e) {
                    t.hasSelection() && u.copyHandler(e, t, t.selectionManager);
                  })
                ),
                this.register(
                  C.addDisposableDomListener(this.textarea, "paste", e)
                ),
                this.register(
                  C.addDisposableDomListener(this.element, "paste", e)
                ),
                g.isFirefox
                  ? this.register(
                      C.addDisposableDomListener(
                        this.element,
                        "mousedown",
                        function(e) {
                          2 === e.button &&
                            u.rightClickHandler(
                              e,
                              t,
                              t.selectionManager,
                              t.options.rightClickSelectsWord
                            );
                        }
                      )
                    )
                  : this.register(
                      C.addDisposableDomListener(
                        this.element,
                        "contextmenu",
                        function(e) {
                          u.rightClickHandler(
                            e,
                            t,
                            t.selectionManager,
                            t.options.rightClickSelectsWord
                          );
                        }
                      )
                    ),
                g.isLinux &&
                  this.register(
                    C.addDisposableDomListener(
                      this.element,
                      "auxclick",
                      function(e) {
                        1 === e.button && u.moveTextAreaUnderMouseCursor(e, t);
                      }
                    )
                  );
            }),
            (I.prototype._bindKeys = function() {
              var t = this,
                i = this;
              this.register(
                C.addDisposableDomListener(
                  this.element,
                  "keydown",
                  function(e) {
                    O.activeElement === this && i._keyDown(e);
                  },
                  !0
                )
              ),
                this.register(
                  C.addDisposableDomListener(
                    this.element,
                    "keypress",
                    function(e) {
                      O.activeElement === this && i._keyPress(e);
                    },
                    !0
                  )
                ),
                this.register(
                  C.addDisposableDomListener(
                    this.element,
                    "keyup",
                    function(e) {
                      !(function(e) {
                        return (
                          16 === e.keyCode ||
                          17 === e.keyCode ||
                          18 === e.keyCode
                        );
                      })(e) && t.focus(),
                        i._keyUp(e);
                    },
                    !0
                  )
                ),
                this.register(
                  C.addDisposableDomListener(
                    this.textarea,
                    "keydown",
                    function(e) {
                      return t._keyDown(e);
                    },
                    !0
                  )
                ),
                this.register(
                  C.addDisposableDomListener(
                    this.textarea,
                    "keypress",
                    function(e) {
                      return t._keyPress(e);
                    },
                    !0
                  )
                ),
                this.register(
                  C.addDisposableDomListener(
                    this.textarea,
                    "compositionstart",
                    function() {
                      return t._compositionHelper.compositionstart();
                    }
                  )
                ),
                this.register(
                  C.addDisposableDomListener(
                    this.textarea,
                    "compositionupdate",
                    function(e) {
                      return t._compositionHelper.compositionupdate(e);
                    }
                  )
                ),
                this.register(
                  C.addDisposableDomListener(
                    this.textarea,
                    "compositionend",
                    function() {
                      return t._compositionHelper.compositionend();
                    }
                  )
                ),
                this.register(
                  this.onRender(function() {
                    return t._compositionHelper.updateCompositionElements();
                  })
                ),
                this.register(
                  this.onRender(function(e) {
                    return t._queueLinkification(e.start, e.end);
                  })
                );
            }),
            (I.prototype.open = function(e) {
              var t = this;
              if (((this._parent = e || this._parent), !this._parent))
                throw new Error("Terminal requires a parent element.");
              (this._context = this._parent.ownerDocument.defaultView),
                (this._document = this._parent.ownerDocument),
                (this.element = this._document.createElement("div")),
                (this.element.dir = "ltr"),
                this.element.classList.add("terminal"),
                this.element.classList.add("xterm"),
                this.element.setAttribute("tabindex", "0"),
                this._parent.appendChild(this.element);
              var i = O.createDocumentFragment();
              (this._viewportElement = O.createElement("div")),
                this._viewportElement.classList.add("xterm-viewport"),
                i.appendChild(this._viewportElement),
                (this._viewportScrollArea = O.createElement("div")),
                this._viewportScrollArea.classList.add("xterm-scroll-area"),
                this._viewportElement.appendChild(this._viewportScrollArea),
                (this.screenElement = O.createElement("div")),
                this.screenElement.classList.add("xterm-screen"),
                (this._helperContainer = O.createElement("div")),
                this._helperContainer.classList.add("xterm-helpers"),
                this.screenElement.appendChild(this._helperContainer),
                i.appendChild(this.screenElement),
                (this._mouseZoneManager = new S.MouseZoneManager(this)),
                this.register(this._mouseZoneManager),
                this.register(
                  this.onScroll(function() {
                    return t._mouseZoneManager.clearAll();
                  })
                ),
                this.linkifier.attachToDom(this._mouseZoneManager),
                (this.textarea = O.createElement("textarea")),
                this.textarea.classList.add("xterm-helper-textarea"),
                this.textarea.setAttribute("aria-label", v.promptLabel),
                this.textarea.setAttribute("aria-multiline", "false"),
                this.textarea.setAttribute("autocorrect", "off"),
                this.textarea.setAttribute("autocapitalize", "off"),
                this.textarea.setAttribute("spellcheck", "false"),
                (this.textarea.tabIndex = 0),
                this.register(
                  C.addDisposableDomListener(this.textarea, "focus", function(
                    e
                  ) {
                    return t._onTextAreaFocus(e);
                  })
                ),
                this.register(
                  C.addDisposableDomListener(this.textarea, "blur", function() {
                    return t._onTextAreaBlur();
                  })
                ),
                this._helperContainer.appendChild(this.textarea),
                (this._compositionView = O.createElement("div")),
                this._compositionView.classList.add("composition-view"),
                (this._compositionHelper = new l.CompositionHelper(
                  this.textarea,
                  this._compositionView,
                  this
                )),
                this._helperContainer.appendChild(this._compositionView),
                (this.charMeasure = new y.CharMeasure(
                  O,
                  this._helperContainer
                )),
                this.element.appendChild(i),
                (this._theme = this.options.theme),
                (this._colorManager = new D.ColorManager(
                  O,
                  this.options.allowTransparency
                )),
                this._colorManager.setTheme(this._theme);
              var r = this._createRenderer();
              (this._renderCoordinator = new H.RenderCoordinator(
                r,
                this.rows,
                this.screenElement
              )),
                this._renderCoordinator.onRender(function(e) {
                  return t._onRender.fire(e);
                }),
                this.onResize(function(e) {
                  return t._renderCoordinator.resize(e.cols, e.rows);
                }),
                (this.viewport = new c.Viewport(
                  this,
                  this._viewportElement,
                  this._viewportScrollArea,
                  this.charMeasure,
                  this._renderCoordinator.dimensions
                )),
                this.viewport.onThemeChange(this._colorManager.colors),
                this.register(this.viewport),
                this.register(
                  this.onCursorMove(function() {
                    return t._renderCoordinator.onCursorMove();
                  })
                ),
                this.register(
                  this.onResize(function() {
                    return t._renderCoordinator.onResize(t.cols, t.rows);
                  })
                ),
                this.register(
                  this.addDisposableListener("blur", function() {
                    return t._renderCoordinator.onBlur();
                  })
                ),
                this.register(
                  this.addDisposableListener("focus", function() {
                    return t._renderCoordinator.onFocus();
                  })
                ),
                this.register(
                  this.charMeasure.onCharSizeChanged(function() {
                    return t._renderCoordinator.onCharSizeChanged();
                  })
                ),
                this.register(
                  this._renderCoordinator.onDimensionsChange(function() {
                    return t.viewport.syncScrollArea();
                  })
                ),
                (this.selectionManager = new m.SelectionManager(
                  this,
                  this.charMeasure
                )),
                this.register(
                  this.selectionManager.onSelectionChange(function() {
                    return t._onSelectionChange.fire();
                  })
                ),
                this.register(
                  C.addDisposableDomListener(
                    this.element,
                    "mousedown",
                    function(e) {
                      return t.selectionManager.onMouseDown(e);
                    }
                  )
                ),
                this.register(
                  this.selectionManager.onRedrawRequest(function(e) {
                    return t._renderCoordinator.onSelectionChanged(
                      e.start,
                      e.end,
                      e.columnSelectMode
                    );
                  })
                ),
                this.register(
                  this.selectionManager.onLinuxMouseSelection(function(e) {
                    (t.textarea.value = e),
                      t.textarea.focus(),
                      t.textarea.select();
                  })
                ),
                this.register(
                  this.onScroll(function() {
                    t.viewport.syncScrollArea(), t.selectionManager.refresh();
                  })
                ),
                this.register(
                  C.addDisposableDomListener(
                    this._viewportElement,
                    "scroll",
                    function() {
                      return t.selectionManager.refresh();
                    }
                  )
                ),
                (this.mouseHelper = new b.MouseHelper(this._renderCoordinator)),
                this.element.classList.toggle(
                  "enable-mouse-events",
                  this.mouseEvents
                ),
                this.mouseEvents
                  ? this.selectionManager.disable()
                  : this.selectionManager.enable(),
                this.options.screenReaderMode &&
                  ((this._accessibilityManager = new E.AccessibilityManager(
                    this,
                    this._renderCoordinator.dimensions
                  )),
                  this._accessibilityManager.register(
                    this._renderCoordinator.onDimensionsChange(function(e) {
                      return t._accessibilityManager.setDimensions(e);
                    })
                  )),
                this.charMeasure.measure(this.options),
                this.refresh(0, this.rows - 1),
                this._initGlobal(),
                this.bindMouse();
            }),
            (I.prototype._createRenderer = function() {
              switch (this.options.rendererType) {
                case "canvas":
                  return new d.Renderer(this, this._colorManager.colors);
                case "dom":
                  return new A.DomRenderer(this, this._colorManager.colors);
                default:
                  throw new Error(
                    'Unrecognized rendererType "' +
                      this.options.rendererType +
                      '"'
                  );
              }
            }),
            (I.prototype._setTheme = function(e) {
              (this._theme = e),
                this._colorManager && this._colorManager.setTheme(e),
                this._renderCoordinator &&
                  this._renderCoordinator.setColors(this._colorManager.colors),
                this.viewport &&
                  this.viewport.onThemeChange(this._colorManager.colors);
            }),
            (I.prototype.bindMouse = function() {
              var s = this,
                e = this.element,
                o = this,
                r = 32;
              function a(e) {
                var t, i;
                if (
                  ((t = (function(e) {
                    var t, i, r, n, s;
                    switch (e.overrideType || e.type) {
                      case "mousedown":
                        (t =
                          null !== e.button && void 0 !== e.button
                            ? +e.button
                            : null !== e.which && void 0 !== e.which
                            ? e.which - 1
                            : null),
                          g.isMSIE && (t = 1 === t ? 0 : 4 === t ? 1 : t);
                        break;
                      case "mouseup":
                        t = 3;
                        break;
                      case "DOMMouseScroll":
                        t = e.detail < 0 ? 64 : 65;
                        break;
                      case "wheel":
                        t = e.deltaY < 0 ? 64 : 65;
                    }
                    return (
                      (i = e.shiftKey ? 4 : 0),
                      (r = e.metaKey ? 8 : 0),
                      (n = e.ctrlKey ? 16 : 0),
                      (s = i | r | n),
                      o.vt200Mouse ? (s &= n) : o.normalMouse || (s = 0),
                      (t = 32 + (s << 2) + t)
                    );
                  })(e)),
                  (i = o.mouseHelper.getRawByteCoords(
                    e,
                    o.screenElement,
                    o.charMeasure,
                    o.cols,
                    o.rows
                  )))
                )
                  switch ((l(t, i), e.overrideType || e.type)) {
                    case "mousedown":
                      r = t;
                      break;
                    case "mouseup":
                      r = 32;
                  }
              }
              function n(e, t) {
                if (o.utfMouse) {
                  if (2047 < t) return void e.push(2047);
                  e.push(t);
                } else {
                  if (255 === t) return void e.push(0);
                  127 < t && (t = 127), e.push(t);
                }
              }
              function l(e, t) {
                if (o._vt300Mouse) {
                  (e &= 3), (t.x -= 32), (t.y -= 32);
                  var i = f.C0.ESC + "[24";
                  if (0 === e) i += "1";
                  else if (1 === e) i += "3";
                  else if (2 === e) i += "5";
                  else {
                    if (3 === e) return;
                    i += "0";
                  }
                  return (
                    (i += "~[" + t.x + "," + t.y + "]\r"), void o.handler(i)
                  );
                }
                if (o._decLocator)
                  return (
                    (e &= 3),
                    (t.x -= 32),
                    (t.y -= 32),
                    0 === e
                      ? (e = 2)
                      : 1 === e
                      ? (e = 4)
                      : 2 === e
                      ? (e = 6)
                      : 3 === e && (e = 3),
                    void o.handler(
                      f.C0.ESC +
                        "[" +
                        e +
                        ";" +
                        (3 === e ? 4 : 0) +
                        ";" +
                        t.y +
                        ";" +
                        t.x +
                        ";" +
                        t.page || "0&w"
                    )
                  );
                if (o.urxvtMouse)
                  return (
                    (t.x -= 32),
                    (t.y -= 32),
                    t.x++,
                    t.y++,
                    void o.handler(
                      f.C0.ESC + "[" + e + ";" + t.x + ";" + t.y + "M"
                    )
                  );
                if (o.sgrMouse)
                  return (
                    (t.x -= 32),
                    (t.y -= 32),
                    void o.handler(
                      f.C0.ESC +
                        "[<" +
                        ((3 == (3 & e) ? -4 & e : e) - 32) +
                        ";" +
                        t.x +
                        ";" +
                        t.y +
                        (3 == (3 & e) ? "m" : "M")
                    )
                  );
                var r = [];
                n(r, e),
                  n(r, t.x),
                  n(r, t.y),
                  o.handler(
                    f.C0.ESC + "[M" + String.fromCharCode.apply(String, r)
                  );
              }
              this.register(
                C.addDisposableDomListener(e, "mousedown", function(e) {
                  if (
                    (e.preventDefault(),
                    s.focus(),
                    s.mouseEvents &&
                      !s.selectionManager.shouldForceSelection(e))
                  ) {
                    if ((a(e), s.vt200Mouse))
                      return (e.overrideType = "mouseup"), a(e), s.cancel(e);
                    var t;
                    s.normalMouse &&
                      ((t = function(e) {
                        s.normalMouse &&
                          (function(e) {
                            var t = r,
                              i = o.mouseHelper.getRawByteCoords(
                                e,
                                o.screenElement,
                                o.charMeasure,
                                o.cols,
                                o.rows
                              );
                            i && l((t += 32), i);
                          })(e);
                      }),
                      s._document.addEventListener("mousemove", t));
                    var i = function(e) {
                      return (
                        s.normalMouse && !s.x10Mouse && a(e),
                        t &&
                          (s._document.removeEventListener("mousemove", t),
                          (t = null)),
                        s._document.removeEventListener("mouseup", i),
                        s.cancel(e)
                      );
                    };
                    return (
                      s._document.addEventListener("mouseup", i), s.cancel(e)
                    );
                  }
                })
              ),
                this.register(
                  C.addDisposableDomListener(e, "wheel", function(e) {
                    if (s.mouseEvents)
                      s.x10Mouse ||
                        s._vt300Mouse ||
                        s._decLocator ||
                        (a(e), e.preventDefault());
                    else if (!s.buffer.hasScrollback) {
                      var t = s.viewport.getLinesScrolled(e);
                      if (0 === t) return;
                      for (
                        var i =
                            f.C0.ESC +
                            (s.applicationCursor ? "O" : "[") +
                            (e.deltaY < 0 ? "A" : "B"),
                          r = "",
                          n = 0;
                        n < Math.abs(t);
                        n++
                      )
                        r += i;
                      s.handler(r);
                    }
                  })
                ),
                this.register(
                  C.addDisposableDomListener(e, "wheel", function(e) {
                    if (!s.mouseEvents)
                      return s.viewport.onWheel(e), s.cancel(e);
                  })
                ),
                this.register(
                  C.addDisposableDomListener(e, "touchstart", function(e) {
                    if (!s.mouseEvents)
                      return s.viewport.onTouchStart(e), s.cancel(e);
                  })
                ),
                this.register(
                  C.addDisposableDomListener(e, "touchmove", function(e) {
                    if (!s.mouseEvents)
                      return s.viewport.onTouchMove(e), s.cancel(e);
                  })
                );
            }),
            (I.prototype.refresh = function(e, t) {
              this._renderCoordinator &&
                this._renderCoordinator.refreshRows(e, t);
            }),
            (I.prototype._queueLinkification = function(e, t) {
              this.linkifier && this.linkifier.linkifyRows(e, t);
            }),
            (I.prototype.updateCursorStyle = function(e) {
              this.selectionManager &&
              this.selectionManager.shouldColumnSelect(e)
                ? this.element.classList.add("column-select")
                : this.element.classList.remove("column-select");
            }),
            (I.prototype.showCursor = function() {
              this.cursorState ||
                ((this.cursorState = 1),
                this.refresh(this.buffer.y, this.buffer.y));
            }),
            (I.prototype.scroll = function(e) {
              var t;
              void 0 === e && (e = !1), (t = this._blankLine);
              var i = this.eraseAttrData();
              (t &&
                t.length === this.cols &&
                t.getFg(0) === i.fg &&
                t.getBg(0) === i.bg) ||
                ((t = this.buffer.getBlankLine(i, e)), (this._blankLine = t)),
                (t.isWrapped = e);
              var r = this.buffer.ybase + this.buffer.scrollTop,
                n = this.buffer.ybase + this.buffer.scrollBottom;
              if (0 === this.buffer.scrollTop) {
                var s = this.buffer.lines.isFull;
                n === this.buffer.lines.length - 1
                  ? s
                    ? this.buffer.lines.recycle().copyFrom(t)
                    : this.buffer.lines.push(t.clone())
                  : this.buffer.lines.splice(n + 1, 0, t.clone()),
                  s
                    ? this._userScrolling &&
                      (this.buffer.ydisp = Math.max(this.buffer.ydisp - 1, 0))
                    : (this.buffer.ybase++,
                      this._userScrolling || this.buffer.ydisp++);
              } else {
                var o = n - r + 1;
                this.buffer.lines.shiftElements(r + 1, o - 1, -1),
                  this.buffer.lines.set(n, t.clone());
              }
              this._userScrolling || (this.buffer.ydisp = this.buffer.ybase),
                this.updateRange(this.buffer.scrollTop),
                this.updateRange(this.buffer.scrollBottom),
                this._onScroll.fire(this.buffer.ydisp);
            }),
            (I.prototype.scrollLines = function(e, t) {
              if (e < 0) {
                if (0 === this.buffer.ydisp) return;
                this._userScrolling = !0;
              } else
                e + this.buffer.ydisp >= this.buffer.ybase &&
                  (this._userScrolling = !1);
              var i = this.buffer.ydisp;
              (this.buffer.ydisp = Math.max(
                Math.min(this.buffer.ydisp + e, this.buffer.ybase),
                0
              )),
                i !== this.buffer.ydisp &&
                  (t || this._onScroll.fire(this.buffer.ydisp),
                  this.refresh(0, this.rows - 1));
            }),
            (I.prototype.scrollPages = function(e) {
              this.scrollLines(e * (this.rows - 1));
            }),
            (I.prototype.scrollToTop = function() {
              this.scrollLines(-this.buffer.ydisp);
            }),
            (I.prototype.scrollToBottom = function() {
              this.scrollLines(this.buffer.ybase - this.buffer.ydisp);
            }),
            (I.prototype.scrollToLine = function(e) {
              var t = e - this.buffer.ydisp;
              0 != t && this.scrollLines(t);
            }),
            (I.prototype.writeUtf8 = function(e) {
              var t = this;
              this._isDisposed ||
                (e &&
                  (this.writeBufferUtf8.push(e),
                  this.options.useFlowControl &&
                    !this._xoffSentToCatchUp &&
                    5 <= this.writeBufferUtf8.length &&
                    (this.handler(f.C0.DC3), (this._xoffSentToCatchUp = !0)),
                  !this._writeInProgress &&
                    0 < this.writeBufferUtf8.length &&
                    ((this._writeInProgress = !0),
                    setTimeout(function() {
                      t._innerWriteUtf8();
                    }))));
            }),
            (I.prototype._innerWriteUtf8 = function(e) {
              var t = this;
              void 0 === e && (e = 0),
                this._isDisposed && (this.writeBufferUtf8 = []);
              for (var i = Date.now(); this.writeBufferUtf8.length > e; ) {
                var r = this.writeBufferUtf8[e];
                if (
                  (e++,
                  this._xoffSentToCatchUp &&
                    this.writeBufferUtf8.length === e &&
                    (this.handler(f.C0.DC1), (this._xoffSentToCatchUp = !1)),
                  (this._refreshStart = this.buffer.y),
                  (this._refreshEnd = this.buffer.y),
                  this._inputHandler.parseUtf8(r),
                  this.updateRange(this.buffer.y),
                  this.refresh(this._refreshStart, this._refreshEnd),
                  12 <= Date.now() - i)
                )
                  break;
              }
              this.writeBufferUtf8.length > e
                ? (50 < e &&
                    ((this.writeBufferUtf8 = this.writeBufferUtf8.slice(e)),
                    (e = 0)),
                  setTimeout(function() {
                    return t._innerWriteUtf8(e);
                  }, 0))
                : ((this._writeInProgress = !1), (this.writeBufferUtf8 = []));
            }),
            (I.prototype.write = function(e) {
              var t = this;
              this._isDisposed ||
                (e &&
                  (this.writeBuffer.push(e),
                  this.options.useFlowControl &&
                    !this._xoffSentToCatchUp &&
                    5 <= this.writeBuffer.length &&
                    (this.handler(f.C0.DC3), (this._xoffSentToCatchUp = !0)),
                  !this._writeInProgress &&
                    0 < this.writeBuffer.length &&
                    ((this._writeInProgress = !0),
                    setTimeout(function() {
                      t._innerWrite();
                    }))));
            }),
            (I.prototype._innerWrite = function(e) {
              var t = this;
              void 0 === e && (e = 0),
                this._isDisposed && (this.writeBuffer = []);
              for (var i = Date.now(); this.writeBuffer.length > e; ) {
                var r = this.writeBuffer[e];
                if (
                  (e++,
                  this._xoffSentToCatchUp &&
                    this.writeBuffer.length === e &&
                    (this.handler(f.C0.DC1), (this._xoffSentToCatchUp = !1)),
                  (this._refreshStart = this.buffer.y),
                  (this._refreshEnd = this.buffer.y),
                  this._inputHandler.parse(r),
                  this.updateRange(this.buffer.y),
                  this.refresh(this._refreshStart, this._refreshEnd),
                  12 <= Date.now() - i)
                )
                  break;
              }
              this.writeBuffer.length > e
                ? (50 < e &&
                    ((this.writeBuffer = this.writeBuffer.slice(e)), (e = 0)),
                  setTimeout(function() {
                    return t._innerWrite(e);
                  }, 0))
                : ((this._writeInProgress = !1), (this.writeBuffer = []));
            }),
            (I.prototype.writeln = function(e) {
              this.write(e + "\r\n");
            }),
            (I.prototype.attachCustomKeyEventHandler = function(e) {
              this._customKeyEventHandler = e;
            }),
            (I.prototype.addCsiHandler = function(e, t) {
              return this._inputHandler.addCsiHandler(e, t);
            }),
            (I.prototype.addOscHandler = function(e, t) {
              return this._inputHandler.addOscHandler(e, t);
            }),
            (I.prototype.registerLinkMatcher = function(e, t, i) {
              var r = this.linkifier.registerLinkMatcher(e, t, i);
              return this.refresh(0, this.rows - 1), r;
            }),
            (I.prototype.deregisterLinkMatcher = function(e) {
              this.linkifier.deregisterLinkMatcher(e) &&
                this.refresh(0, this.rows - 1);
            }),
            (I.prototype.registerCharacterJoiner = function(e) {
              var t = this._renderCoordinator.registerCharacterJoiner(e);
              return this.refresh(0, this.rows - 1), t;
            }),
            (I.prototype.deregisterCharacterJoiner = function(e) {
              this._renderCoordinator.deregisterCharacterJoiner(e) &&
                this.refresh(0, this.rows - 1);
            }),
            Object.defineProperty(I.prototype, "markers", {
              get: function() {
                return this.buffer.markers;
              },
              enumerable: !0,
              configurable: !0
            }),
            (I.prototype.addMarker = function(e) {
              if (this.buffer === this.buffers.normal)
                return this.buffer.addMarker(
                  this.buffer.ybase + this.buffer.y + e
                );
            }),
            (I.prototype.hasSelection = function() {
              return (
                !!this.selectionManager && this.selectionManager.hasSelection
              );
            }),
            (I.prototype.select = function(e, t, i) {
              this.selectionManager.setSelection(e, t, i);
            }),
            (I.prototype.getSelection = function() {
              return this.selectionManager
                ? this.selectionManager.selectionText
                : "";
            }),
            (I.prototype.getSelectionPosition = function() {
              if (this.selectionManager.hasSelection)
                return {
                  startColumn: this.selectionManager.selectionStart[0],
                  startRow: this.selectionManager.selectionStart[1],
                  endColumn: this.selectionManager.selectionEnd[0],
                  endRow: this.selectionManager.selectionEnd[1]
                };
            }),
            (I.prototype.clearSelection = function() {
              this.selectionManager && this.selectionManager.clearSelection();
            }),
            (I.prototype.selectAll = function() {
              this.selectionManager && this.selectionManager.selectAll();
            }),
            (I.prototype.selectLines = function(e, t) {
              this.selectionManager && this.selectionManager.selectLines(e, t);
            }),
            (I.prototype._keyDown = function(e) {
              if (
                this._customKeyEventHandler &&
                !1 === this._customKeyEventHandler(e)
              )
                return !1;
              if (!this._compositionHelper.keydown(e))
                return (
                  this.buffer.ybase !== this.buffer.ydisp &&
                    this.scrollToBottom(),
                  !1
                );
              var t = x.evaluateKeyboardEvent(
                e,
                this.applicationCursor,
                this.browser.isMac,
                this.options.macOptionIsMeta
              );
              if ((this.updateCursorStyle(e), 3 !== t.type && 2 !== t.type))
                return (
                  1 === t.type && this.selectAll(),
                  !!this._isThirdLevelShift(this.browser, e) ||
                    (t.cancel && this.cancel(e, !0),
                    !t.key ||
                      (this.emit("keydown", e),
                      this._onKey.fire({ key: t.key, domEvent: e }),
                      this.showCursor(),
                      this.handler(t.key),
                      this.cancel(e, !0)))
                );
              var i = this.rows - 1;
              return (
                this.scrollLines(2 === t.type ? -i : i), this.cancel(e, !0)
              );
            }),
            (I.prototype._isThirdLevelShift = function(e, t) {
              var i =
                (e.isMac &&
                  !this.options.macOptionIsMeta &&
                  t.altKey &&
                  !t.ctrlKey &&
                  !t.metaKey) ||
                (e.isMSWindows && t.altKey && t.ctrlKey && !t.metaKey);
              return "keypress" === t.type
                ? i
                : i && (!t.keyCode || 47 < t.keyCode);
            }),
            (I.prototype.setgLevel = function(e) {
              (this.glevel = e), (this.charset = this.charsets[e]);
            }),
            (I.prototype.setgCharset = function(e, t) {
              (this.charsets[e] = t), this.glevel === e && (this.charset = t);
            }),
            (I.prototype._keyUp = function(e) {
              this.updateCursorStyle(e);
            }),
            (I.prototype._keyPress = function(e) {
              var t;
              if (
                this._customKeyEventHandler &&
                !1 === this._customKeyEventHandler(e)
              )
                return !1;
              if ((this.cancel(e), e.charCode)) t = e.charCode;
              else if (null === e.which || void 0 === e.which) t = e.keyCode;
              else {
                if (0 === e.which || 0 === e.charCode) return !1;
                t = e.which;
              }
              return !(
                !t ||
                ((e.altKey || e.ctrlKey || e.metaKey) &&
                  !this._isThirdLevelShift(this.browser, e)) ||
                ((t = String.fromCharCode(t)),
                this.emit("keypress", t, e),
                this._onKey.fire({ key: t, domEvent: e }),
                this.showCursor(),
                this.handler(t),
                0)
              );
            }),
            (I.prototype.bell = function() {
              var e = this;
              this.emit("bell"),
                this._soundBell() && this.soundManager.playBellSound(),
                this._visualBell() &&
                  (this.element.classList.add("visual-bell-active"),
                  clearTimeout(this._visualBellTimer),
                  (this._visualBellTimer = window.setTimeout(function() {
                    e.element.classList.remove("visual-bell-active");
                  }, 200)));
            }),
            (I.prototype.log = function(e, t) {
              this.options.debug &&
                this._context.console &&
                this._context.console.log &&
                this._context.console.log(e, t);
            }),
            (I.prototype.error = function(e, t) {
              this.options.debug &&
                this._context.console &&
                this._context.console.error &&
                this._context.console.error(e, t);
            }),
            (I.prototype.resize = function(e, t) {
              isNaN(e) ||
                isNaN(t) ||
                (e !== this.cols || t !== this.rows
                  ? (e < 2 && (e = 2),
                    t < 1 && (t = 1),
                    this.buffers.resize(e, t),
                    (this.cols = e),
                    (this.rows = t),
                    this.buffers.setupTabStops(this.cols),
                    this.charMeasure && this.charMeasure.measure(this.options),
                    this.refresh(0, this.rows - 1),
                    this._onResize.fire({ cols: e, rows: t }))
                  : !this.charMeasure ||
                    (this.charMeasure.width && this.charMeasure.height) ||
                    this.charMeasure.measure(this.options));
            }),
            (I.prototype.updateRange = function(e) {
              e < this._refreshStart && (this._refreshStart = e),
                e > this._refreshEnd && (this._refreshEnd = e);
            }),
            (I.prototype.maxRange = function() {
              (this._refreshStart = 0), (this._refreshEnd = this.rows - 1);
            }),
            (I.prototype.clear = function() {
              if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
                this.buffer.lines.set(
                  0,
                  this.buffer.lines.get(this.buffer.ybase + this.buffer.y)
                ),
                  (this.buffer.lines.length = 1),
                  (this.buffer.ydisp = 0),
                  (this.buffer.ybase = 0),
                  (this.buffer.y = 0);
                for (var e = 1; e < this.rows; e++)
                  this.buffer.lines.push(
                    this.buffer.getBlankLine(R.DEFAULT_ATTR_DATA)
                  );
                this.refresh(0, this.rows - 1),
                  this._onScroll.fire(this.buffer.ydisp);
              }
            }),
            (I.prototype.is = function(e) {
              return 0 === (this.options.termName + "").indexOf(e);
            }),
            (I.prototype.handler = function(e) {
              this.options.disableStdin ||
                (this.selectionManager &&
                  this.selectionManager.hasSelection &&
                  this.selectionManager.clearSelection(),
                this.buffer.ybase !== this.buffer.ydisp &&
                  this.scrollToBottom(),
                this._onData.fire(e));
            }),
            (I.prototype.handleTitle = function(e) {
              this._onTitleChange.fire(e);
            }),
            (I.prototype.index = function() {
              this.buffer.y++,
                this.buffer.y > this.buffer.scrollBottom &&
                  (this.buffer.y--, this.scroll()),
                this.buffer.x >= this.cols && this.buffer.x--;
            }),
            (I.prototype.reverseIndex = function() {
              if (this.buffer.y === this.buffer.scrollTop) {
                var e = this.buffer.scrollBottom - this.buffer.scrollTop;
                this.buffer.lines.shiftElements(
                  this.buffer.y + this.buffer.ybase,
                  e,
                  1
                ),
                  this.buffer.lines.set(
                    this.buffer.y + this.buffer.ybase,
                    this.buffer.getBlankLine(this.eraseAttrData())
                  ),
                  this.updateRange(this.buffer.scrollTop),
                  this.updateRange(this.buffer.scrollBottom);
              } else this.buffer.y--;
            }),
            (I.prototype.reset = function() {
              (this.options.rows = this.rows), (this.options.cols = this.cols);
              var e = this._customKeyEventHandler,
                t = this._inputHandler,
                i = this.cursorState,
                r = this.writeBuffer,
                n = this.writeBufferUtf8,
                s = this._writeInProgress,
                o = this._xoffSentToCatchUp,
                a = this._userScrolling;
              this._setup(),
                (this._customKeyEventHandler = e),
                (this._inputHandler = t),
                (this.cursorState = i),
                (this.writeBuffer = r),
                (this.writeBufferUtf8 = n),
                (this._writeInProgress = s),
                (this._xoffSentToCatchUp = o),
                (this._userScrolling = a),
                this.refresh(0, this.rows - 1),
                this.viewport && this.viewport.syncScrollArea();
            }),
            (I.prototype.tabSet = function() {
              this.buffer.tabs[this.buffer.x] = !0;
            }),
            (I.prototype.cancel = function(e, t) {
              if (this.options.cancelEvents || t)
                return e.preventDefault(), e.stopPropagation(), !1;
            }),
            (I.prototype._visualBell = function() {
              return !1;
            }),
            (I.prototype._soundBell = function() {
              return "sound" === this.options.bellStyle;
            }),
            I);
          function I(e) {
            void 0 === e && (e = {});
            var t = s.call(this) || this;
            return (
              (t.browser = g),
              (t._blankLine = null),
              (t._onCursorMove = new M.EventEmitter2()),
              (t._onData = new M.EventEmitter2()),
              (t._onKey = new M.EventEmitter2()),
              (t._onLineFeed = new M.EventEmitter2()),
              (t._onRender = new M.EventEmitter2()),
              (t._onResize = new M.EventEmitter2()),
              (t._onScroll = new M.EventEmitter2()),
              (t._onSelectionChange = new M.EventEmitter2()),
              (t._onTitleChange = new M.EventEmitter2()),
              (t.options = T.clone(e)),
              t._setup(),
              t.onCursorMove(function() {
                return t.emit("cursormove");
              }),
              t.onData(function(e) {
                return t.emit("data", e);
              }),
              t.onKey(function(e) {
                return t.emit("key", e.key, e.domEvent);
              }),
              t.onLineFeed(function() {
                return t.emit("linefeed");
              }),
              t.onRender(function(e) {
                return t.emit("refresh", e);
              }),
              t.onResize(function(e) {
                return t.emit("resize", e);
              }),
              t.onSelectionChange(function() {
                return t.emit("selection");
              }),
              t.onScroll(function(e) {
                return t.emit("scroll", e);
              }),
              t.onTitleChange(function(e) {
                return t.emit("title", e);
              }),
              t
            );
          }
          i.Terminal = F;
        },
        {
          "./AccessibilityManager": 1,
          "./Buffer": 2,
          "./BufferSet": 3,
          "./CharMeasure": 4,
          "./Clipboard": 6,
          "./CompositionHelper": 7,
          "./InputHandler": 9,
          "./Linkifier": 10,
          "./MouseHelper": 11,
          "./MouseZoneManager": 12,
          "./SelectionManager": 13,
          "./SoundManager": 15,
          "./Strings": 16,
          "./Viewport": 18,
          "./WindowsMode": 19,
          "./common/Clone": 21,
          "./common/EventEmitter": 22,
          "./common/EventEmitter2": 23,
          "./common/Platform": 25,
          "./common/data/EscapeSequences": 28,
          "./core/buffer/BufferLine": 29,
          "./core/input/Keyboard": 33,
          "./renderer/RenderCoordinator": 43,
          "./renderer/Renderer": 44,
          "./renderer/atlas/CharAtlasCache": 48,
          "./renderer/dom/DomRenderer": 56,
          "./ui/ColorManager": 58,
          "./ui/Lifecycle": 59
        }
      ],
      18: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var o,
            s = e("./common/Lifecycle"),
            a = e("./ui/Lifecycle"),
            l = ((o = s.Disposable),
            n(h, o),
            (h.prototype.onDimensionsChance = function(e) {
              this._dimensions = e;
            }),
            (h.prototype.onThemeChange = function(e) {
              this._viewportElement.style.backgroundColor = e.background.css;
            }),
            (h.prototype._refresh = function() {
              var e = this;
              null === this._refreshAnimationFrame &&
                (this._refreshAnimationFrame = requestAnimationFrame(
                  function() {
                    return e._innerRefresh();
                  }
                ));
            }),
            (h.prototype._innerRefresh = function() {
              if (0 < this._charMeasure.height) {
                (this._currentRowHeight =
                  this._dimensions.scaledCellHeight / window.devicePixelRatio),
                  (this._lastRecordedViewportHeight = this._viewportElement.offsetHeight);
                var e =
                  Math.round(
                    this._currentRowHeight * this._lastRecordedBufferLength
                  ) +
                  (this._lastRecordedViewportHeight -
                    this._dimensions.canvasHeight);
                this._lastRecordedBufferHeight !== e &&
                  ((this._lastRecordedBufferHeight = e),
                  (this._scrollArea.style.height =
                    this._lastRecordedBufferHeight + "px"));
              }
              var t = this._terminal.buffer.ydisp * this._currentRowHeight;
              this._viewportElement.scrollTop !== t &&
                ((this._ignoreNextScrollEvent = !0),
                (this._viewportElement.scrollTop = t)),
                (this._refreshAnimationFrame = null);
            }),
            (h.prototype.syncScrollArea = function() {
              if (
                this._lastRecordedBufferLength !==
                this._terminal.buffer.lines.length
              )
                return (
                  (this._lastRecordedBufferLength = this._terminal.buffer.lines.length),
                  void this._refresh()
                );
              if (
                this._lastRecordedViewportHeight ===
                this._dimensions.canvasHeight
              ) {
                var e = this._terminal.buffer.ydisp * this._currentRowHeight;
                (this._lastScrollTop === e &&
                  this._lastScrollTop === this._viewportElement.scrollTop &&
                  this._dimensions.scaledCellHeight /
                    window.devicePixelRatio ===
                    this._currentRowHeight) ||
                  this._refresh();
              } else this._refresh();
            }),
            (h.prototype._onScroll = function(e) {
              if (
                ((this._lastScrollTop = this._viewportElement.scrollTop),
                this._viewportElement.offsetParent)
              )
                if (this._ignoreNextScrollEvent)
                  this._ignoreNextScrollEvent = !1;
                else {
                  var t =
                    Math.round(this._lastScrollTop / this._currentRowHeight) -
                    this._terminal.buffer.ydisp;
                  this._terminal.scrollLines(t, !0);
                }
            }),
            (h.prototype.onWheel = function(e) {
              var t = this._getPixelsScrolled(e);
              0 !== t &&
                ((this._viewportElement.scrollTop += t), e.preventDefault());
            }),
            (h.prototype._getPixelsScrolled = function(e) {
              if (0 === e.deltaY) return 0;
              var t = e.deltaY;
              return (
                e.deltaMode === WheelEvent.DOM_DELTA_LINE
                  ? (t *= this._currentRowHeight)
                  : e.deltaMode === WheelEvent.DOM_DELTA_PAGE &&
                    (t *= this._currentRowHeight * this._terminal.rows),
                t
              );
            }),
            (h.prototype.getLinesScrolled = function(e) {
              if (0 === e.deltaY) return 0;
              var t = e.deltaY;
              return (
                e.deltaMode === WheelEvent.DOM_DELTA_PIXEL
                  ? ((t /= this._currentRowHeight + 0),
                    (this._wheelPartialScroll += t),
                    (t =
                      Math.floor(Math.abs(this._wheelPartialScroll)) *
                      (0 < this._wheelPartialScroll ? 1 : -1)),
                    (this._wheelPartialScroll %= 1))
                  : e.deltaMode === WheelEvent.DOM_DELTA_PAGE &&
                    (t *= this._terminal.rows),
                t
              );
            }),
            (h.prototype.onTouchStart = function(e) {
              this._lastTouchY = e.touches[0].pageY;
            }),
            (h.prototype.onTouchMove = function(e) {
              var t = this._lastTouchY - e.touches[0].pageY;
              (this._lastTouchY = e.touches[0].pageY),
                0 != t &&
                  ((this._viewportElement.scrollTop += t), e.preventDefault());
            }),
            h);
          function h(e, t, i, r, n) {
            var s = o.call(this) || this;
            return (
              (s._terminal = e),
              (s._viewportElement = t),
              (s._scrollArea = i),
              (s._charMeasure = r),
              (s._dimensions = n),
              (s.scrollBarWidth = 0),
              (s._currentRowHeight = 0),
              (s._lastRecordedBufferLength = 0),
              (s._lastRecordedViewportHeight = 0),
              (s._lastRecordedBufferHeight = 0),
              (s._lastScrollTop = 0),
              (s._wheelPartialScroll = 0),
              (s._refreshAnimationFrame = null),
              (s._ignoreNextScrollEvent = !1),
              (s.scrollBarWidth =
                s._viewportElement.offsetWidth - s._scrollArea.offsetWidth ||
                15),
              s.register(
                a.addDisposableDomListener(
                  s._viewportElement,
                  "scroll",
                  s._onScroll.bind(s)
                )
              ),
              setTimeout(function() {
                return s.syncScrollArea();
              }, 0),
              s
            );
          }
          i.Viewport = l;
        },
        { "./common/Lifecycle": 24, "./ui/Lifecycle": 59 }
      ],
      19: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("./core/buffer/BufferLine");
          i.applyWindowsMode = function(t) {
            return t.onLineFeed(function() {
              var e = t.buffer.lines
                .get(t.buffer.ybase + t.buffer.y - 1)
                .get(t.cols - 1);
              t.buffer.lines.get(t.buffer.ybase + t.buffer.y).isWrapped =
                e[r.CHAR_DATA_CODE_INDEX] !== r.NULL_CELL_CODE &&
                e[r.CHAR_DATA_CODE_INDEX] !== r.WHITESPACE_CELL_CODE;
            });
          };
        },
        { "./core/buffer/BufferLine": 29 }
      ],
      20: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("./EventEmitter2"),
            n = (Object.defineProperty(s.prototype, "onDelete", {
              get: function() {
                return this.onDeleteEmitter.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(s.prototype, "onInsert", {
              get: function() {
                return this.onInsertEmitter.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(s.prototype, "onTrim", {
              get: function() {
                return this.onTrimEmitter.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(s.prototype, "maxLength", {
              get: function() {
                return this._maxLength;
              },
              set: function(e) {
                if (this._maxLength !== e) {
                  for (
                    var t = new Array(e), i = 0;
                    i < Math.min(e, this.length);
                    i++
                  )
                    t[i] = this._array[this._getCyclicIndex(i)];
                  (this._array = t),
                    (this._maxLength = e),
                    (this._startIndex = 0);
                }
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(s.prototype, "length", {
              get: function() {
                return this._length;
              },
              set: function(e) {
                if (e > this._length)
                  for (var t = this._length; t < e; t++)
                    this._array[t] = void 0;
                this._length = e;
              },
              enumerable: !0,
              configurable: !0
            }),
            (s.prototype.get = function(e) {
              return this._array[this._getCyclicIndex(e)];
            }),
            (s.prototype.set = function(e, t) {
              this._array[this._getCyclicIndex(e)] = t;
            }),
            (s.prototype.push = function(e) {
              (this._array[this._getCyclicIndex(this._length)] = e),
                this._length === this._maxLength
                  ? ((this._startIndex = ++this._startIndex % this._maxLength),
                    this.onTrimEmitter.fire(1))
                  : this._length++;
            }),
            (s.prototype.recycle = function() {
              if (this._length !== this._maxLength)
                throw new Error("Can only recycle when the buffer is full");
              return (
                (this._startIndex = ++this._startIndex % this._maxLength),
                this.onTrimEmitter.fire(1),
                this._array[this._getCyclicIndex(this._length - 1)]
              );
            }),
            Object.defineProperty(s.prototype, "isFull", {
              get: function() {
                return this._length === this._maxLength;
              },
              enumerable: !0,
              configurable: !0
            }),
            (s.prototype.pop = function() {
              return this._array[this._getCyclicIndex(this._length-- - 1)];
            }),
            (s.prototype.splice = function(e, t) {
              for (var i = [], r = 2; r < arguments.length; r++)
                i[r - 2] = arguments[r];
              if (t) {
                for (var n = e; n < this._length - t; n++)
                  this._array[this._getCyclicIndex(n)] = this._array[
                    this._getCyclicIndex(n + t)
                  ];
                this._length -= t;
              }
              for (n = this._length - 1; e <= n; n--)
                this._array[this._getCyclicIndex(n + i.length)] = this._array[
                  this._getCyclicIndex(n)
                ];
              for (n = 0; n < i.length; n++)
                this._array[this._getCyclicIndex(e + n)] = i[n];
              if (this._length + i.length > this._maxLength) {
                var s = this._length + i.length - this._maxLength;
                (this._startIndex += s),
                  (this._length = this._maxLength),
                  this.onTrimEmitter.fire(s);
              } else this._length += i.length;
            }),
            (s.prototype.trimStart = function(e) {
              e > this._length && (e = this._length),
                (this._startIndex += e),
                (this._length -= e),
                this.onTrimEmitter.fire(e);
            }),
            (s.prototype.shiftElements = function(e, t, i) {
              if (!(t <= 0)) {
                if (e < 0 || e >= this._length)
                  throw new Error("start argument out of range");
                if (e + i < 0)
                  throw new Error(
                    "Cannot shift elements in list beyond index 0"
                  );
                if (0 < i) {
                  for (var r = t - 1; 0 <= r; r--)
                    this.set(e + r + i, this.get(e + r));
                  var n = e + t + i - this._length;
                  if (0 < n)
                    for (this._length += n; this._length > this._maxLength; )
                      this._length--,
                        this._startIndex++,
                        this.onTrimEmitter.fire(1);
                } else
                  for (r = 0; r < t; r++) this.set(e + r + i, this.get(e + r));
              }
            }),
            (s.prototype._getCyclicIndex = function(e) {
              return (this._startIndex + e) % this._maxLength;
            }),
            s);
          function s(e) {
            (this._maxLength = e),
              (this.onDeleteEmitter = new r.EventEmitter2()),
              (this.onInsertEmitter = new r.EventEmitter2()),
              (this.onTrimEmitter = new r.EventEmitter2()),
              (this._array = new Array(this._maxLength)),
              (this._startIndex = 0),
              (this._length = 0);
          }
          i.CircularList = n;
        },
        { "./EventEmitter2": 23 }
      ],
      21: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.clone = function e(t, i) {
              if ((void 0 === i && (i = 5), "object" != typeof t)) return t;
              if (null === t) return null;
              var r = Array.isArray(t) ? [] : {};
              for (var n in t) r[n] = i <= 1 ? t[n] : e(t[n], i - 1);
              return r;
            });
        },
        {}
      ],
      22: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./Lifecycle"),
            a = ((s = o.Disposable),
            n(l, s),
            (l.prototype.on = function(e, t) {
              (this._events[e] = this._events[e] || []),
                this._events[e].push(t);
            }),
            (l.prototype.addDisposableListener = function(e, t) {
              var i = this;
              this.on(e, t);
              var r = !1;
              return {
                dispose: function() {
                  r || (i.off(e, t), (r = !0));
                }
              };
            }),
            (l.prototype.off = function(e, t) {
              if (this._events[e])
                for (var i = this._events[e], r = i.length; r--; )
                  if (i[r] === t) return void i.splice(r, 1);
            }),
            (l.prototype.removeAllListeners = function(e) {
              this._events[e] && delete this._events[e];
            }),
            (l.prototype.emit = function(e) {
              for (var t = [], i = 1; i < arguments.length; i++)
                t[i - 1] = arguments[i];
              if (this._events[e])
                for (var r = this._events[e], n = 0; n < r.length; n++)
                  r[n].apply(this, t);
            }),
            (l.prototype.emitMayRemoveListeners = function(e) {
              for (var t = [], i = 1; i < arguments.length; i++)
                t[i - 1] = arguments[i];
              if (this._events[e])
                for (
                  var r = this._events[e], n = r.length, s = 0;
                  s < r.length;
                  s++
                )
                  r[s].apply(this, t), (s -= n - r.length), (n = r.length);
            }),
            (l.prototype.listeners = function(e) {
              return this._events[e] || [];
            }),
            (l.prototype.dispose = function() {
              s.prototype.dispose.call(this), (this._events = {});
            }),
            l);
          function l() {
            var e = s.call(this) || this;
            return (e._events = e._events || {}), e;
          }
          i.EventEmitter = a;
        },
        { "./Lifecycle": 24 }
      ],
      23: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = (Object.defineProperty(n.prototype, "event", {
            get: function() {
              var i = this;
              return (
                this._event ||
                  (this._event = function(t) {
                    return (
                      i._listeners.push(t),
                      {
                        dispose: function() {
                          for (var e = 0; e < i._listeners.length; e++)
                            if (i._listeners[e] === t)
                              return void i._listeners.splice(e, 1);
                        }
                      }
                    );
                  }),
                this._event
              );
            },
            enumerable: !0,
            configurable: !0
          }),
          (n.prototype.fire = function(e) {
            for (var t = [], i = 0; i < this._listeners.length; i++)
              t.push(this._listeners[i]);
            for (i = 0; i < t.length; i++) t[i].call(void 0, e);
          }),
          n);
          function n() {
            this._listeners = [];
          }
          i.EventEmitter2 = r;
        },
        {}
      ],
      24: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((n.prototype.dispose = function() {
            (this._isDisposed = !0),
              this._disposables.forEach(function(e) {
                return e.dispose();
              }),
              (this._disposables.length = 0);
          }),
          (n.prototype.register = function(e) {
            this._disposables.push(e);
          }),
          (n.prototype.unregister = function(e) {
            var t = this._disposables.indexOf(e);
            -1 !== t && this._disposables.splice(t, 1);
          }),
          n);
          function n() {
            (this._disposables = []), (this._isDisposed = !1);
          }
          i.Disposable = r;
        },
        {}
      ],
      25: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = "undefined" == typeof navigator,
            n = r ? "node" : navigator.userAgent,
            s = r ? "node" : navigator.platform;
          function o(e, t) {
            return 0 <= e.indexOf(t);
          }
          (i.isFirefox = !!~n.indexOf("Firefox")),
            (i.isSafari = /^((?!chrome|android).)*safari/i.test(n)),
            (i.isMSIE = !!~n.indexOf("MSIE") || !!~n.indexOf("Trident")),
            (i.isMac = o(["Macintosh", "MacIntel", "MacPPC", "Mac68K"], s)),
            (i.isIpad = "iPad" === s),
            (i.isIphone = "iPhone" === s),
            (i.isMSWindows = o(["Windows", "Win16", "Win32", "WinCE"], s)),
            (i.isLinux = 0 <= s.indexOf("Linux"));
        },
        {}
      ],
      26: [
        function(e, t, i) {
          "use strict";
          function n(e, t, i, r) {
            if (
              (void 0 === i && (i = 0),
              void 0 === r && (r = e.length),
              i >= e.length)
            )
              return e;
            (i = (e.length + i) % e.length),
              (r = r >= e.length ? e.length : (e.length + r) % e.length);
            for (var n = i; n < r; ++n) e[n] = t;
            return e;
          }
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.fill = function(e, t, i, r) {
              return e.fill ? e.fill(t, i, r) : n(e, t, i, r);
            }),
            (i.fillFallback = n),
            (i.concat = function(e, t) {
              var i = new e.constructor(e.length + t.length);
              return i.set(e), i.set(t, e.length), i;
            });
        },
        {}
      ],
      27: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.DEFAULT_COLOR = 256);
        },
        {}
      ],
      28: [
        function(e, t, i) {
          "use strict";
          var r, n;
          Object.defineProperty(i, "__esModule", { value: !0 }),
            ((r = i.C0 || (i.C0 = {})).NUL = "\0"),
            (r.SOH = ""),
            (r.STX = ""),
            (r.ETX = ""),
            (r.EOT = ""),
            (r.ENQ = ""),
            (r.ACK = ""),
            (r.BEL = ""),
            (r.BS = "\b"),
            (r.HT = "\t"),
            (r.LF = "\n"),
            (r.VT = "\v"),
            (r.FF = "\f"),
            (r.CR = "\r"),
            (r.SO = ""),
            (r.SI = ""),
            (r.DLE = ""),
            (r.DC1 = ""),
            (r.DC2 = ""),
            (r.DC3 = ""),
            (r.DC4 = ""),
            (r.NAK = ""),
            (r.SYN = ""),
            (r.ETB = ""),
            (r.CAN = ""),
            (r.EM = ""),
            (r.SUB = ""),
            (r.ESC = ""),
            (r.FS = ""),
            (r.GS = ""),
            (r.RS = ""),
            (r.US = ""),
            (r.SP = " "),
            (r.DEL = ""),
            ((n = i.C1 || (i.C1 = {})).PAD = "??"),
            (n.HOP = "??"),
            (n.BPH = "??"),
            (n.NBH = "??"),
            (n.IND = "??"),
            (n.NEL = "??"),
            (n.SSA = "??"),
            (n.ESA = "??"),
            (n.HTS = "??"),
            (n.HTJ = "??"),
            (n.VTS = "??"),
            (n.PLD = "??"),
            (n.PLU = "??"),
            (n.RI = "??"),
            (n.SS2 = "??"),
            (n.SS3 = "??"),
            (n.DCS = "??"),
            (n.PU1 = "??"),
            (n.PU2 = "??"),
            (n.STS = "??"),
            (n.CCH = "??"),
            (n.MW = "??"),
            (n.SPA = "??"),
            (n.EPA = "??"),
            (n.SOS = "??"),
            (n.SGCI = "??"),
            (n.SCI = "??"),
            (n.CSI = "??"),
            (n.ST = "??"),
            (n.OSC = "??"),
            (n.PM = "??"),
            (n.APC = "??");
        },
        {}
      ],
      29: [
        function(e, t, o) {
          "use strict";
          var r,
            i =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(o, "__esModule", { value: !0 });
          var a = e("../input/TextDecoder"),
            n = e("../../common/Types");
          (o.DEFAULT_ATTR = 256 | (n.DEFAULT_COLOR << 9)),
            (o.CHAR_DATA_ATTR_INDEX = 0),
            (o.CHAR_DATA_CHAR_INDEX = 1),
            (o.CHAR_DATA_WIDTH_INDEX = 2),
            (o.CHAR_DATA_CODE_INDEX = 3),
            (o.NULL_CELL_CHAR = ""),
            (o.NULL_CELL_WIDTH = 1),
            (o.NULL_CELL_CODE = 0),
            (o.WHITESPACE_CELL_CHAR = " "),
            (o.WHITESPACE_CELL_WIDTH = 1),
            (o.WHITESPACE_CELL_CODE = 32);
          var s = ((l.toColorRGB = function(e) {
            return [(e >>> 16) & 255, (e >>> 8) & 255, 255 & e];
          }),
          (l.fromColorRGB = function(e) {
            return ((255 & e[0]) << 16) | ((255 & e[1]) << 8) | (255 & e[2]);
          }),
          (l.prototype.clone = function() {
            var e = new l();
            return (e.fg = this.fg), (e.bg = this.bg), e;
          }),
          (l.prototype.isInverse = function() {
            return 67108864 & this.fg;
          }),
          (l.prototype.isBold = function() {
            return 134217728 & this.fg;
          }),
          (l.prototype.isUnderline = function() {
            return 268435456 & this.fg;
          }),
          (l.prototype.isBlink = function() {
            return 536870912 & this.fg;
          }),
          (l.prototype.isInvisible = function() {
            return 1073741824 & this.fg;
          }),
          (l.prototype.isItalic = function() {
            return 67108864 & this.bg;
          }),
          (l.prototype.isDim = function() {
            return 134217728 & this.bg;
          }),
          (l.prototype.getFgColorMode = function() {
            return 50331648 & this.fg;
          }),
          (l.prototype.getBgColorMode = function() {
            return 50331648 & this.bg;
          }),
          (l.prototype.isFgRGB = function() {
            return 50331648 == (50331648 & this.fg);
          }),
          (l.prototype.isBgRGB = function() {
            return 50331648 == (50331648 & this.bg);
          }),
          (l.prototype.isFgPalette = function() {
            return (
              16777216 == (50331648 & this.fg) ||
              33554432 == (50331648 & this.fg)
            );
          }),
          (l.prototype.isBgPalette = function() {
            return (
              16777216 == (50331648 & this.bg) ||
              33554432 == (50331648 & this.bg)
            );
          }),
          (l.prototype.isFgDefault = function() {
            return 0 == (50331648 & this.fg);
          }),
          (l.prototype.isBgDefault = function() {
            return 0 == (50331648 & this.bg);
          }),
          (l.prototype.getFgColor = function() {
            switch (50331648 & this.fg) {
              case 16777216:
              case 33554432:
                return 255 & this.fg;
              case 50331648:
                return 16777215 & this.fg;
              default:
                return -1;
            }
          }),
          (l.prototype.getBgColor = function() {
            switch (50331648 & this.bg) {
              case 16777216:
              case 33554432:
                return 255 & this.bg;
              case 50331648:
                return 16777215 & this.bg;
              default:
                return -1;
            }
          }),
          l);
          function l() {
            (this.fg = 0), (this.bg = 0);
          }
          (o.AttributeData = s), (o.DEFAULT_ATTR_DATA = Object.freeze(new s()));
          var h,
            c = (i(u, (h = s)),
            (u.fromCharData = function(e) {
              var t = new u();
              return t.setFromCharData(e), t;
            }),
            (u.prototype.isCombined = function() {
              return 2097152 & this.content;
            }),
            (u.prototype.getWidth = function() {
              return this.content >> 22;
            }),
            (u.prototype.getChars = function() {
              return 2097152 & this.content
                ? this.combinedData
                : 2097151 & this.content
                ? a.stringFromCodePoint(2097151 & this.content)
                : "";
            }),
            (u.prototype.getCode = function() {
              return this.isCombined()
                ? this.combinedData.charCodeAt(this.combinedData.length - 1)
                : 2097151 & this.content;
            }),
            (u.prototype.setFromCharData = function(e) {
              (this.fg = e[o.CHAR_DATA_ATTR_INDEX]), (this.bg = 0);
              var t = !1;
              if (2 < e[o.CHAR_DATA_CHAR_INDEX].length) t = !0;
              else if (2 === e[o.CHAR_DATA_CHAR_INDEX].length) {
                var i = e[o.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
                if (55296 <= i && i <= 56319) {
                  var r = e[o.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                  56320 <= r && r <= 57343
                    ? (this.content =
                        (1024 * (i - 55296) + r - 56320 + 65536) |
                        (e[o.CHAR_DATA_WIDTH_INDEX] << 22))
                    : (t = !0);
                } else t = !0;
              } else
                this.content =
                  e[o.CHAR_DATA_CHAR_INDEX].charCodeAt(0) |
                  (e[o.CHAR_DATA_WIDTH_INDEX] << 22);
              t &&
                ((this.combinedData = e[o.CHAR_DATA_CHAR_INDEX]),
                (this.content = 2097152 | (e[o.CHAR_DATA_WIDTH_INDEX] << 22)));
            }),
            (u.prototype.getAsCharData = function() {
              return [
                this.fg,
                this.getChars(),
                this.getWidth(),
                this.getCode()
              ];
            }),
            u);
          function u() {
            var e = (null !== h && h.apply(this, arguments)) || this;
            return (
              (e.content = 0), (e.fg = 0), (e.bg = 0), (e.combinedData = ""), e
            );
          }
          o.CellData = c;
          var f = ((_.prototype.get = function(e) {
            var t = this._data[3 * e + 0],
              i = 2097151 & t;
            return [
              this._data[3 * e + 1],
              2097152 & t
                ? this._combined[e]
                : i
                ? a.stringFromCodePoint(i)
                : "",
              t >> 22,
              2097152 & t
                ? this._combined[e].charCodeAt(this._combined[e].length - 1)
                : i
            ];
          }),
          (_.prototype.set = function(e, t) {
            (this._data[3 * e + 1] = t[o.CHAR_DATA_ATTR_INDEX]),
              1 < t[o.CHAR_DATA_CHAR_INDEX].length
                ? ((this._combined[e] = t[1]),
                  (this._data[3 * e + 0] =
                    2097152 | e | (t[o.CHAR_DATA_WIDTH_INDEX] << 22)))
                : (this._data[3 * e + 0] =
                    t[o.CHAR_DATA_CHAR_INDEX].charCodeAt(0) |
                    (t[o.CHAR_DATA_WIDTH_INDEX] << 22));
          }),
          (_.prototype.getWidth = function(e) {
            return this._data[3 * e + 0] >> 22;
          }),
          (_.prototype.hasWidth = function(e) {
            return 12582912 & this._data[3 * e + 0];
          }),
          (_.prototype.getFg = function(e) {
            return this._data[3 * e + 1];
          }),
          (_.prototype.getBg = function(e) {
            return this._data[3 * e + 2];
          }),
          (_.prototype.hasContent = function(e) {
            return 4194303 & this._data[3 * e + 0];
          }),
          (_.prototype.getCodePoint = function(e) {
            var t = this._data[3 * e + 0];
            return 2097152 & t
              ? this._combined[e].charCodeAt(this._combined[e].length - 1)
              : 2097151 & t;
          }),
          (_.prototype.isCombined = function(e) {
            return 2097152 & this._data[3 * e + 0];
          }),
          (_.prototype.getString = function(e) {
            var t = this._data[3 * e + 0];
            return 2097152 & t
              ? this._combined[e]
              : 2097151 & t
              ? a.stringFromCodePoint(2097151 & t)
              : "";
          }),
          (_.prototype.loadCell = function(e, t) {
            var i = 3 * e;
            return (
              (t.content = this._data[0 + i]),
              (t.fg = this._data[1 + i]),
              (t.bg = this._data[2 + i]),
              2097152 & t.content && (t.combinedData = this._combined[e]),
              t
            );
          }),
          (_.prototype.setCell = function(e, t) {
            2097152 & t.content && (this._combined[e] = t.combinedData),
              (this._data[3 * e + 0] = t.content),
              (this._data[3 * e + 1] = t.fg),
              (this._data[3 * e + 2] = t.bg);
          }),
          (_.prototype.setCellFromCodePoint = function(e, t, i, r, n) {
            (this._data[3 * e + 0] = t | (i << 22)),
              (this._data[3 * e + 1] = r),
              (this._data[3 * e + 2] = n);
          }),
          (_.prototype.addCodepointToCell = function(e, t) {
            var i = this._data[3 * e + 0];
            2097152 & i
              ? (this._combined[e] += a.stringFromCodePoint(t))
              : (2097151 & i
                  ? ((this._combined[e] =
                      a.stringFromCodePoint(2097151 & i) +
                      a.stringFromCodePoint(t)),
                    (i &= -2097152),
                    (i |= 2097152))
                  : (i = t | (1 << 22)),
                (this._data[3 * e + 0] = i));
          }),
          (_.prototype.insertCells = function(e, t, i) {
            if (((e %= this.length), t < this.length - e)) {
              for (var r = new c(), n = this.length - e - t - 1; 0 <= n; --n)
                this.setCell(e + t + n, this.loadCell(e + n, r));
              for (n = 0; n < t; ++n) this.setCell(e + n, i);
            } else for (n = e; n < this.length; ++n) this.setCell(n, i);
          }),
          (_.prototype.deleteCells = function(e, t, i) {
            if (((e %= this.length), t < this.length - e)) {
              for (var r = new c(), n = 0; n < this.length - e - t; ++n)
                this.setCell(e + n, this.loadCell(e + t + n, r));
              for (n = this.length - t; n < this.length; ++n)
                this.setCell(n, i);
            } else for (n = e; n < this.length; ++n) this.setCell(n, i);
          }),
          (_.prototype.replaceCells = function(e, t, i) {
            for (; e < t && e < this.length; ) this.setCell(e++, i);
          }),
          (_.prototype.resize = function(e, t) {
            if (e !== this.length) {
              if (e > this.length) {
                var i = new Uint32Array(3 * e);
                this.length &&
                  (3 * e < this._data.length
                    ? i.set(this._data.subarray(0, 3 * e))
                    : i.set(this._data)),
                  (this._data = i);
                for (var r = this.length; r < e; ++r) this.setCell(r, t);
              } else if (e) {
                (i = new Uint32Array(3 * e)).set(this._data.subarray(0, 3 * e)),
                  (this._data = i);
                var n = Object.keys(this._combined);
                for (r = 0; r < n.length; r++) {
                  var s = parseInt(n[r], 10);
                  e <= s && delete this._combined[s];
                }
              } else (this._data = new Uint32Array(0)), (this._combined = {});
              this.length = e;
            }
          }),
          (_.prototype.fill = function(e) {
            this._combined = {};
            for (var t = 0; t < this.length; ++t) this.setCell(t, e);
          }),
          (_.prototype.copyFrom = function(e) {
            for (var t in (this.length !== e.length
              ? (this._data = new Uint32Array(e._data))
              : this._data.set(e._data),
            (this.length = e.length),
            (this._combined = {}),
            e._combined))
              this._combined[t] = e._combined[t];
            this.isWrapped = e.isWrapped;
          }),
          (_.prototype.clone = function() {
            var e = new _(0);
            for (var t in ((e._data = new Uint32Array(this._data)),
            (e.length = this.length),
            this._combined))
              e._combined[t] = this._combined[t];
            return (e.isWrapped = this.isWrapped), e;
          }),
          (_.prototype.getTrimmedLength = function() {
            for (var e = this.length - 1; 0 <= e; --e)
              if (4194303 & this._data[3 * e + 0])
                return e + (this._data[3 * e + 0] >> 22);
            return 0;
          }),
          (_.prototype.copyCellsFrom = function(e, t, i, r, n) {
            var s = e._data;
            if (n)
              for (var o = r - 1; 0 <= o; o--)
                for (var a = 0; a < 3; a++)
                  this._data[3 * (i + o) + a] = s[3 * (t + o) + a];
            else
              for (o = 0; o < r; o++)
                for (a = 0; a < 3; a++)
                  this._data[3 * (i + o) + a] = s[3 * (t + o) + a];
            var l = Object.keys(e._combined);
            for (a = 0; a < l.length; a++) {
              var h = parseInt(l[a], 10);
              t <= h && (this._combined[h - t + i] = e._combined[h]);
            }
          }),
          (_.prototype.translateToString = function(e, t, i) {
            void 0 === e && (e = !1),
              void 0 === t && (t = 0),
              void 0 === i && (i = this.length),
              e && (i = Math.min(i, this.getTrimmedLength()));
            for (var r = ""; t < i; ) {
              var n = this._data[3 * t + 0],
                s = 2097151 & n;
              (r +=
                2097152 & n
                  ? this._combined[t]
                  : s
                  ? a.stringFromCodePoint(s)
                  : o.WHITESPACE_CELL_CHAR),
                (t += n >> 22 || 1);
            }
            return r;
          }),
          _);
          function _(e, t, i) {
            void 0 === i && (i = !1),
              (this.isWrapped = i),
              (this._combined = {}),
              (this._data = new Uint32Array(3 * e));
            for (
              var r =
                  t ||
                  c.fromCharData([
                    0,
                    o.NULL_CELL_CHAR,
                    o.NULL_CELL_WIDTH,
                    o.NULL_CELL_CODE
                  ]),
                n = 0;
              n < e;
              ++n
            )
              this.setCell(n, r);
            this.length = e;
          }
          o.BufferLine = f;
        },
        { "../../common/Types": 27, "../input/TextDecoder": 34 }
      ],
      30: [
        function(e, t, i) {
          "use strict";
          function v(e, t, i) {
            if (t === e.length - 1) return e[t].getTrimmedLength();
            var r = !e[t].hasContent(i - 1) && 1 === e[t].getWidth(i - 1),
              n = 2 === e[t + 1].getWidth(0);
            return r && n ? i - 1 : i;
          }
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.reflowLargerGetLinesToRemove = function(e, t, i, r, n) {
              for (var s = [], o = 0; o < e.length - 1; o++) {
                var a = o,
                  l = e.get(++a);
                if (l.isWrapped) {
                  for (var h = [e.get(o)]; a < e.length && l.isWrapped; )
                    h.push(l), (l = e.get(++a));
                  if (o <= r && r < a) o += h.length - 1;
                  else {
                    for (
                      var c = 0, u = v(h, c, t), f = 1, _ = 0;
                      f < h.length;

                    ) {
                      var d = v(h, f, t),
                        p = d - _,
                        m = i - u,
                        y = Math.min(p, m);
                      h[c].copyCellsFrom(h[f], _, u, y, !1),
                        (u += y) === i && (c++, (u = 0)),
                        (_ += y) === d && (f++, (_ = 0)),
                        0 === u &&
                          0 !== c &&
                          2 === h[c - 1].getWidth(i - 1) &&
                          (h[c].copyCellsFrom(h[c - 1], i - 1, u++, 1, !1),
                          h[c - 1].setCell(i - 1, n));
                    }
                    h[c].replaceCells(u, i, n);
                    for (
                      var g = 0, C = h.length - 1;
                      0 < C && (c < C || 0 === h[C].getTrimmedLength());
                      C--
                    )
                      g++;
                    0 < g && (s.push(o + h.length - g), s.push(g)),
                      (o += h.length - 1);
                  }
                }
              }
              return s;
            }),
            (i.reflowLargerCreateNewLayout = function(e, t) {
              for (var i = [], r = 0, n = t[r], s = 0, o = 0; o < e.length; o++)
                if (n === o) {
                  var a = t[++r];
                  e.onDeleteEmitter.fire({ index: o - s, amount: a }),
                    (o += a - 1),
                    (s += a),
                    (n = t[++r]);
                } else i.push(o);
              return { layout: i, countRemoved: s };
            }),
            (i.reflowLargerApplyNewLayout = function(e, t) {
              for (var i = [], r = 0; r < t.length; r++) i.push(e.get(t[r]));
              for (r = 0; r < i.length; r++) e.set(r, i[r]);
              e.length = t.length;
            }),
            (i.reflowSmallerGetNewLineLengths = function(i, r, e) {
              for (
                var t = [],
                  n = i
                    .map(function(e, t) {
                      return v(i, t, r);
                    })
                    .reduce(function(e, t) {
                      return e + t;
                    }),
                  s = 0,
                  o = 0,
                  a = 0;
                a < n;

              ) {
                if (n - a < e) {
                  t.push(n - a);
                  break;
                }
                s += e;
                var l = v(i, o, r);
                l < s && ((s -= l), o++);
                var h = 2 === i[o].getWidth(s - 1);
                h && s--;
                var c = h ? e - 1 : e;
                t.push(c), (a += c);
              }
              return t;
            }),
            (i.getWrappedLineTrimmedLength = v);
        },
        {}
      ],
      31: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("../../common/EventEmitter2"),
            a = e("../../common/Lifecycle"),
            l = ((s = a.Disposable),
            n(h, s),
            Object.defineProperty(h.prototype, "id", {
              get: function() {
                return this._id;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(h.prototype, "onDispose", {
              get: function() {
                return this._onDispose.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            (h.prototype.dispose = function() {
              this.isDisposed ||
                ((this.isDisposed = !0), this._onDispose.fire());
            }),
            (h._nextId = 1),
            h);
          function h(e) {
            var t = s.call(this) || this;
            return (
              (t.line = e),
              (t._id = h._nextId++),
              (t.isDisposed = !1),
              (t._onDispose = new o.EventEmitter2()),
              t
            );
          }
          i.Marker = l;
        },
        { "../../common/EventEmitter2": 23, "../../common/Lifecycle": 24 }
      ],
      32: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.CHARSETS = {}),
            (i.DEFAULT_CHARSET = i.CHARSETS.B),
            (i.CHARSETS[0] = {
              "`": "???",
              a: "???",
              b: "\t",
              c: "\f",
              d: "\r",
              e: "\n",
              f: "??",
              g: "??",
              h: "???",
              i: "\v",
              j: "???",
              k: "???",
              l: "???",
              m: "???",
              n: "???",
              o: "???",
              p: "???",
              q: "???",
              r: "???",
              s: "???",
              t: "???",
              u: "???",
              v: "???",
              w: "???",
              x: "???",
              y: "???",
              z: "???",
              "{": "??",
              "|": "???",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS.A = { "#": "??" }),
            (i.CHARSETS.B = null),
            (i.CHARSETS[4] = {
              "#": "??",
              "@": "??",
              "[": "ij",
              "\\": "??",
              "]": "|",
              "{": "??",
              "|": "f",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS.C = i.CHARSETS[5] = {
              "[": "??",
              "\\": "??",
              "]": "??",
              "^": "??",
              "`": "??",
              "{": "??",
              "|": "??",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS.R = {
              "#": "??",
              "@": "??",
              "[": "??",
              "\\": "??",
              "]": "??",
              "{": "??",
              "|": "??",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS.Q = {
              "@": "??",
              "[": "??",
              "\\": "??",
              "]": "??",
              "^": "??",
              "`": "??",
              "{": "??",
              "|": "??",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS.K = {
              "@": "??",
              "[": "??",
              "\\": "??",
              "]": "??",
              "{": "??",
              "|": "??",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS.Y = {
              "#": "??",
              "@": "??",
              "[": "??",
              "\\": "??",
              "]": "??",
              "`": "??",
              "{": "??",
              "|": "??",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS.E = i.CHARSETS[6] = {
              "@": "??",
              "[": "??",
              "\\": "??",
              "]": "??",
              "^": "??",
              "`": "??",
              "{": "??",
              "|": "??",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS.Z = {
              "#": "??",
              "@": "??",
              "[": "??",
              "\\": "??",
              "]": "??",
              "{": "??",
              "|": "??",
              "}": "??"
            }),
            (i.CHARSETS.H = i.CHARSETS[7] = {
              "@": "??",
              "[": "??",
              "\\": "??",
              "]": "??",
              "^": "??",
              "`": "??",
              "{": "??",
              "|": "??",
              "}": "??",
              "~": "??"
            }),
            (i.CHARSETS["="] = {
              "#": "??",
              "@": "??",
              "[": "??",
              "\\": "??",
              "]": "??",
              "^": "??",
              _: "??",
              "`": "??",
              "{": "??",
              "|": "??",
              "}": "??",
              "~": "??"
            });
        },
        {}
      ],
      33: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var h = e("../../common/data/EscapeSequences"),
            c = {
              48: ["0", ")"],
              49: ["1", "!"],
              50: ["2", "@"],
              51: ["3", "#"],
              52: ["4", "$"],
              53: ["5", "%"],
              54: ["6", "^"],
              55: ["7", "&"],
              56: ["8", "*"],
              57: ["9", "("],
              186: [";", ":"],
              187: ["=", "+"],
              188: [",", "<"],
              189: ["-", "_"],
              190: [".", ">"],
              191: ["/", "?"],
              192: ["`", "~"],
              219: ["[", "{"],
              220: ["\\", "|"],
              221: ["]", "}"],
              222: ["'", '"']
            };
          i.evaluateKeyboardEvent = function(e, t, i, r) {
            var n = { type: 0, cancel: !1, key: void 0 },
              s =
                (e.shiftKey ? 1 : 0) |
                (e.altKey ? 2 : 0) |
                (e.ctrlKey ? 4 : 0) |
                (e.metaKey ? 8 : 0);
            switch (e.keyCode) {
              case 0:
                "UIKeyInputUpArrow" === e.key
                  ? (n.key = t ? h.C0.ESC + "OA" : h.C0.ESC + "[A")
                  : "UIKeyInputLeftArrow" === e.key
                  ? (n.key = t ? h.C0.ESC + "OD" : h.C0.ESC + "[D")
                  : "UIKeyInputRightArrow" === e.key
                  ? (n.key = t ? h.C0.ESC + "OC" : h.C0.ESC + "[C")
                  : "UIKeyInputDownArrow" === e.key &&
                    (n.key = t ? h.C0.ESC + "OB" : h.C0.ESC + "[B");
                break;
              case 8:
                if (e.shiftKey) {
                  n.key = h.C0.BS;
                  break;
                }
                if (e.altKey) {
                  n.key = h.C0.ESC + h.C0.DEL;
                  break;
                }
                n.key = h.C0.DEL;
                break;
              case 9:
                if (e.shiftKey) {
                  n.key = h.C0.ESC + "[Z";
                  break;
                }
                (n.key = h.C0.HT), (n.cancel = !0);
                break;
              case 13:
                (n.key = h.C0.CR), (n.cancel = !0);
                break;
              case 27:
                (n.key = h.C0.ESC), (n.cancel = !0);
                break;
              case 37:
                s
                  ? ((n.key = h.C0.ESC + "[1;" + (1 + s) + "D"),
                    n.key === h.C0.ESC + "[1;3D" &&
                      (n.key = i ? h.C0.ESC + "b" : h.C0.ESC + "[1;5D"))
                  : (n.key = t ? h.C0.ESC + "OD" : h.C0.ESC + "[D");
                break;
              case 39:
                s
                  ? ((n.key = h.C0.ESC + "[1;" + (1 + s) + "C"),
                    n.key === h.C0.ESC + "[1;3C" &&
                      (n.key = i ? h.C0.ESC + "f" : h.C0.ESC + "[1;5C"))
                  : (n.key = t ? h.C0.ESC + "OC" : h.C0.ESC + "[C");
                break;
              case 38:
                s
                  ? ((n.key = h.C0.ESC + "[1;" + (1 + s) + "A"),
                    n.key === h.C0.ESC + "[1;3A" &&
                      (n.key = h.C0.ESC + "[1;5A"))
                  : (n.key = t ? h.C0.ESC + "OA" : h.C0.ESC + "[A");
                break;
              case 40:
                s
                  ? ((n.key = h.C0.ESC + "[1;" + (1 + s) + "B"),
                    n.key === h.C0.ESC + "[1;3B" &&
                      (n.key = h.C0.ESC + "[1;5B"))
                  : (n.key = t ? h.C0.ESC + "OB" : h.C0.ESC + "[B");
                break;
              case 45:
                e.shiftKey || e.ctrlKey || (n.key = h.C0.ESC + "[2~");
                break;
              case 46:
                n.key = s ? h.C0.ESC + "[3;" + (1 + s) + "~" : h.C0.ESC + "[3~";
                break;
              case 36:
                n.key = s
                  ? h.C0.ESC + "[1;" + (1 + s) + "H"
                  : t
                  ? h.C0.ESC + "OH"
                  : h.C0.ESC + "[H";
                break;
              case 35:
                n.key = s
                  ? h.C0.ESC + "[1;" + (1 + s) + "F"
                  : t
                  ? h.C0.ESC + "OF"
                  : h.C0.ESC + "[F";
                break;
              case 33:
                e.shiftKey ? (n.type = 2) : (n.key = h.C0.ESC + "[5~");
                break;
              case 34:
                e.shiftKey ? (n.type = 3) : (n.key = h.C0.ESC + "[6~");
                break;
              case 112:
                n.key = s ? h.C0.ESC + "[1;" + (1 + s) + "P" : h.C0.ESC + "OP";
                break;
              case 113:
                n.key = s ? h.C0.ESC + "[1;" + (1 + s) + "Q" : h.C0.ESC + "OQ";
                break;
              case 114:
                n.key = s ? h.C0.ESC + "[1;" + (1 + s) + "R" : h.C0.ESC + "OR";
                break;
              case 115:
                n.key = s ? h.C0.ESC + "[1;" + (1 + s) + "S" : h.C0.ESC + "OS";
                break;
              case 116:
                n.key = s
                  ? h.C0.ESC + "[15;" + (1 + s) + "~"
                  : h.C0.ESC + "[15~";
                break;
              case 117:
                n.key = s
                  ? h.C0.ESC + "[17;" + (1 + s) + "~"
                  : h.C0.ESC + "[17~";
                break;
              case 118:
                n.key = s
                  ? h.C0.ESC + "[18;" + (1 + s) + "~"
                  : h.C0.ESC + "[18~";
                break;
              case 119:
                n.key = s
                  ? h.C0.ESC + "[19;" + (1 + s) + "~"
                  : h.C0.ESC + "[19~";
                break;
              case 120:
                n.key = s
                  ? h.C0.ESC + "[20;" + (1 + s) + "~"
                  : h.C0.ESC + "[20~";
                break;
              case 121:
                n.key = s
                  ? h.C0.ESC + "[21;" + (1 + s) + "~"
                  : h.C0.ESC + "[21~";
                break;
              case 122:
                n.key = s
                  ? h.C0.ESC + "[23;" + (1 + s) + "~"
                  : h.C0.ESC + "[23~";
                break;
              case 123:
                n.key = s
                  ? h.C0.ESC + "[24;" + (1 + s) + "~"
                  : h.C0.ESC + "[24~";
                break;
              default:
                if (!e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)
                  if ((i && !r) || !e.altKey || e.metaKey)
                    i && !e.altKey && !e.ctrlKey && e.metaKey
                      ? 65 === e.keyCode && (n.type = 1)
                      : e.key &&
                        !e.ctrlKey &&
                        !e.altKey &&
                        !e.metaKey &&
                        48 <= e.keyCode &&
                        1 === e.key.length
                      ? (n.key = e.key)
                      : e.key &&
                        e.ctrlKey &&
                        "_" === e.key &&
                        (n.key = h.C0.US);
                  else {
                    var o = c[e.keyCode],
                      a = o && o[e.shiftKey ? 1 : 0];
                    if (a) n.key = h.C0.ESC + a;
                    else if (65 <= e.keyCode && e.keyCode <= 90) {
                      var l = e.ctrlKey ? e.keyCode - 64 : e.keyCode + 32;
                      n.key = h.C0.ESC + String.fromCharCode(l);
                    }
                  }
                else
                  65 <= e.keyCode && e.keyCode <= 90
                    ? (n.key = String.fromCharCode(e.keyCode - 64))
                    : 32 === e.keyCode
                    ? (n.key = String.fromCharCode(0))
                    : 51 <= e.keyCode && e.keyCode <= 55
                    ? (n.key = String.fromCharCode(e.keyCode - 51 + 27))
                    : 56 === e.keyCode
                    ? (n.key = String.fromCharCode(127))
                    : 219 === e.keyCode
                    ? (n.key = String.fromCharCode(27))
                    : 220 === e.keyCode
                    ? (n.key = String.fromCharCode(28))
                    : 221 === e.keyCode && (n.key = String.fromCharCode(29));
            }
            return n;
          };
        },
        { "../../common/data/EscapeSequences": 28 }
      ],
      34: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.stringFromCodePoint = function(e) {
              return 65535 < e
                ? ((e -= 65536),
                  String.fromCharCode(55296 + (e >> 10)) +
                    String.fromCharCode((e % 1024) + 56320))
                : String.fromCharCode(e);
            }),
            (i.utf32ToString = function(e, t, i) {
              void 0 === t && (t = 0), void 0 === i && (i = e.length);
              for (var r = "", n = t; n < i; ++n) {
                var s = e[n];
                65535 < s
                  ? ((s -= 65536),
                    (r +=
                      String.fromCharCode(55296 + (s >> 10)) +
                      String.fromCharCode((s % 1024) + 56320)))
                  : (r += String.fromCharCode(s));
              }
              return r;
            });
          var r = ((n.prototype.clear = function() {
            this._interim = 0;
          }),
          (n.prototype.decode = function(e, t) {
            var i = e.length;
            if (!i) return 0;
            var r = 0,
              n = 0;
            this._interim &&
              (56320 <= (a = e.charCodeAt(n++)) && a <= 57343
                ? (t[r++] = 1024 * (this._interim - 55296) + a - 56320 + 65536)
                : ((t[r++] = this._interim), (t[r++] = a)),
              (this._interim = 0));
            for (var s = n; s < i; ++s) {
              var o = e.charCodeAt(s);
              if (55296 <= o && o <= 56319) {
                if (++s >= i) return (this._interim = o), r;
                var a;
                56320 <= (a = e.charCodeAt(s)) && a <= 57343
                  ? (t[r++] = 1024 * (o - 55296) + a - 56320 + 65536)
                  : ((t[r++] = o), (t[r++] = a));
              } else t[r++] = o;
            }
            return r;
          }),
          n);
          function n() {
            this._interim = 0;
          }
          i.StringToUtf32 = r;
          var s = ((o.prototype.clear = function() {
            this.interim.fill(0);
          }),
          (o.prototype.decode = function(e, t) {
            var i = e.length;
            if (!i) return 0;
            var r,
              n,
              s,
              o,
              a = 0,
              l = 0,
              h = 0;
            if (this.interim[0]) {
              var c = !1,
                u = this.interim[0];
              u &= 192 == (224 & u) ? 31 : 224 == (240 & u) ? 15 : 7;
              for (
                var f = 0, _ = void 0;
                (_ = 63 & this.interim[++f]) && f < 4;

              )
                (u <<= 6), (u |= _);
              for (
                var d =
                    192 == (224 & this.interim[0])
                      ? 2
                      : 224 == (240 & this.interim[0])
                      ? 3
                      : 4,
                  p = d - f;
                h < p;

              ) {
                if (i <= h) return 0;
                if (128 != (192 & (_ = e[h++]))) {
                  h--, (c = !0);
                  break;
                }
                (u <<= 6), (u |= 63 & (this.interim[f++] = _));
              }
              c ||
                (2 == d
                  ? u < 128
                    ? h--
                    : (t[a++] = u)
                  : 3 == d
                  ? u < 2048 || (55296 <= u && u <= 57343) || (t[a++] = u)
                  : l < 65536 || 1114111 < l || (t[a++] = u)),
                this.interim.fill(0);
            }
            for (var m = i - 4, y = h; y < i; ) {
              for (
                ;
                !(
                  !(y < m) ||
                  128 & (r = e[y]) ||
                  128 & (n = e[y + 1]) ||
                  128 & (s = e[y + 2]) ||
                  128 & (o = e[y + 3])
                );

              )
                (t[a++] = r),
                  (t[a++] = n),
                  (t[a++] = s),
                  (t[a++] = o),
                  (y += 4);
              if ((r = e[y++]) < 128) t[a++] = r;
              else if (192 == (224 & r)) {
                if (i <= y) return (this.interim[0] = r), a;
                if (128 != (192 & (n = e[y++]))) {
                  y--;
                  continue;
                }
                if ((l = ((31 & r) << 6) | (63 & n)) < 128) {
                  y--;
                  continue;
                }
                t[a++] = l;
              } else if (224 == (240 & r)) {
                if (i <= y) return (this.interim[0] = r), a;
                if (128 != (192 & (n = e[y++]))) {
                  y--;
                  continue;
                }
                if (i <= y)
                  return (this.interim[0] = r), (this.interim[1] = n), a;
                if (128 != (192 & (s = e[y++]))) {
                  y--;
                  continue;
                }
                if (
                  (l = ((15 & r) << 12) | ((63 & n) << 6) | (63 & s)) < 2048 ||
                  (55296 <= l && l <= 57343)
                )
                  continue;
                t[a++] = l;
              } else if (240 == (248 & r)) {
                if (i <= y) return (this.interim[0] = r), a;
                if (128 != (192 & (n = e[y++]))) {
                  y--;
                  continue;
                }
                if (i <= y)
                  return (this.interim[0] = r), (this.interim[1] = n), a;
                if (128 != (192 & (s = e[y++]))) {
                  y--;
                  continue;
                }
                if (i <= y)
                  return (
                    (this.interim[0] = r),
                    (this.interim[1] = n),
                    (this.interim[2] = s),
                    a
                  );
                if (128 != (192 & (o = e[y++]))) {
                  y--;
                  continue;
                }
                if (
                  (l =
                    ((7 & r) << 18) |
                    ((63 & n) << 12) |
                    ((63 & s) << 6) |
                    (63 & o)) < 65536 ||
                  1114111 < l
                )
                  continue;
                t[a++] = l;
              }
            }
            return a;
          }),
          o);
          function o() {
            this.interim = new Uint8Array(3);
          }
          i.Utf8ToUtf32 = s;
        },
        {}
      ],
      35: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("../common/data/EscapeSequences"),
            n = ((s.prototype.move = function() {
              this._mouseEvent.altKey &&
                void 0 !== this._endCol &&
                void 0 !== this._endRow &&
                this._terminal.handler(this._arrowSequences());
            }),
            (s.prototype._arrowSequences = function() {
              return this._terminal.buffer.hasScrollback
                ? this._moveHorizontallyOnly()
                : this._resetStartingRow() +
                    this._moveToRequestedRow() +
                    this._moveToRequestedCol();
            }),
            (s.prototype._resetStartingRow = function() {
              return 0 === this._moveToRequestedRow().length
                ? ""
                : o(
                    this._bufferLine(
                      this._startCol,
                      this._startRow,
                      this._startCol,
                      this._startRow - this._wrappedRowsForRow(this._startRow),
                      !1
                    ).length,
                    this._sequence("D")
                  );
            }),
            (s.prototype._moveToRequestedRow = function() {
              var e = this._startRow - this._wrappedRowsForRow(this._startRow),
                t = this._endRow - this._wrappedRowsForRow(this._endRow);
              return o(
                Math.abs(e - t) - this._wrappedRowsCount(),
                this._sequence(this._verticalDirection())
              );
            }),
            (s.prototype._moveToRequestedCol = function() {
              var e;
              e =
                0 < this._moveToRequestedRow().length
                  ? this._endRow - this._wrappedRowsForRow(this._endRow)
                  : this._startRow;
              var t = this._endRow,
                i = this._horizontalDirection();
              return o(
                this._bufferLine(this._startCol, e, this._endCol, t, "C" === i)
                  .length,
                this._sequence(i)
              );
            }),
            (s.prototype._moveHorizontallyOnly = function() {
              var e = this._horizontalDirection();
              return o(
                Math.abs(this._startCol - this._endCol),
                this._sequence(e)
              );
            }),
            (s.prototype._wrappedRowsCount = function() {
              for (
                var e = 0,
                  t = this._startRow - this._wrappedRowsForRow(this._startRow),
                  i = this._endRow - this._wrappedRowsForRow(this._endRow),
                  r = 0;
                r < Math.abs(t - i);
                r++
              ) {
                var n = "A" === this._verticalDirection() ? -1 : 1;
                this._lines.get(t + n * r).isWrapped && e++;
              }
              return e;
            }),
            (s.prototype._wrappedRowsForRow = function(e) {
              for (
                var t = 0, i = this._lines.get(e).isWrapped;
                i && 0 <= e && e < this._terminal.rows;

              )
                t++, e--, (i = this._lines.get(e).isWrapped);
              return t;
            }),
            (s.prototype._horizontalDirection = function() {
              var e;
              return (
                (e =
                  0 < this._moveToRequestedRow().length
                    ? this._endRow - this._wrappedRowsForRow(this._endRow)
                    : this._startRow),
                (this._startCol < this._endCol && e <= this._endRow) ||
                (this._startCol >= this._endCol && e < this._endRow)
                  ? "C"
                  : "D"
              );
            }),
            (s.prototype._verticalDirection = function() {
              return this._startRow > this._endRow ? "A" : "B";
            }),
            (s.prototype._bufferLine = function(e, t, i, r, n) {
              for (var s = e, o = t, a = ""; s !== i || o !== r; )
                (s += n ? 1 : -1),
                  n && s > this._terminal.cols - 1
                    ? ((a += this._terminal.buffer.translateBufferLineToString(
                        o,
                        !1,
                        e,
                        s
                      )),
                      (e = s = 0),
                      o++)
                    : !n &&
                      s < 0 &&
                      ((a += this._terminal.buffer.translateBufferLineToString(
                        o,
                        !1,
                        0,
                        e + 1
                      )),
                      (e = s = this._terminal.cols - 1),
                      o--);
              return (
                a +
                this._terminal.buffer.translateBufferLineToString(o, !1, e, s)
              );
            }),
            (s.prototype._sequence = function(e) {
              var t = this._terminal.applicationCursor ? "O" : "[";
              return r.C0.ESC + t + e;
            }),
            s);
          function s(e, t) {
            var i;
            (this._mouseEvent = e),
              (this._terminal = t),
              (this._lines = this._terminal.buffer.lines),
              (this._startCol = this._terminal.buffer.x),
              (this._startRow = this._terminal.buffer.y);
            var r = this._terminal.mouseHelper.getCoords(
              this._mouseEvent,
              this._terminal.element,
              this._terminal.charMeasure,
              this._terminal.cols,
              this._terminal.rows,
              !1
            );
            r &&
              ((i = r.map(function(e) {
                return e - 1;
              })),
              (this._endCol = i[0]),
              (this._endRow = i[1]));
          }
          function o(e, t) {
            e = Math.floor(e);
            for (var i = "", r = 0; r < e; r++) i += t;
            return i;
          }
          i.AltClickHandler = n;
        },
        { "../common/data/EscapeSequences": 28 }
      ],
      36: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((n.prototype.dispose = function() {
            for (var e = this._addons.length - 1; 0 <= e; e--)
              this._addons[e].instance.dispose();
          }),
          (n.prototype.loadAddon = function(e, t) {
            var i = this,
              r = { instance: t, dispose: t.dispose, isDisposed: !1 };
            this._addons.push(r),
              (t.dispose = function() {
                return i._wrappedAddonDispose(r);
              }),
              t.activate(e);
          }),
          (n.prototype._wrappedAddonDispose = function(e) {
            if (!e.isDisposed) {
              for (var t = -1, i = 0; i < this._addons.length; i++)
                if (this._addons[i] === e) {
                  t = i;
                  break;
                }
              if (-1 === t)
                throw new Error(
                  "Could not dispose an addon that has not been loaded"
                );
              (e.isDisposed = !0),
                e.dispose.apply(e.instance),
                this._addons.splice(t, 1);
            }
          }),
          n);
          function n() {
            this._addons = [];
          }
          i.AddonManager = r;
        },
        {}
      ],
      37: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("../Terminal"),
            n = e("../Strings"),
            s = e("./AddonManager"),
            o = (Object.defineProperty(a.prototype, "onCursorMove", {
              get: function() {
                return this._core.onCursorMove;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onLineFeed", {
              get: function() {
                return this._core.onLineFeed;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onSelectionChange", {
              get: function() {
                return this._core.onSelectionChange;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onData", {
              get: function() {
                return this._core.onData;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onTitleChange", {
              get: function() {
                return this._core.onTitleChange;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onScroll", {
              get: function() {
                return this._core.onScroll;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onKey", {
              get: function() {
                return this._core.onKey;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onRender", {
              get: function() {
                return this._core.onRender;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "onResize", {
              get: function() {
                return this._core.onResize;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "element", {
              get: function() {
                return this._core.element;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "textarea", {
              get: function() {
                return this._core.textarea;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "rows", {
              get: function() {
                return this._core.rows;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "cols", {
              get: function() {
                return this._core.cols;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "buffer", {
              get: function() {
                return new l(this._core.buffer);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(a.prototype, "markers", {
              get: function() {
                return this._core.markers;
              },
              enumerable: !0,
              configurable: !0
            }),
            (a.prototype.blur = function() {
              this._core.blur();
            }),
            (a.prototype.focus = function() {
              this._core.focus();
            }),
            (a.prototype.on = function(e, t) {
              this._core.on(e, t);
            }),
            (a.prototype.off = function(e, t) {
              this._core.off(e, t);
            }),
            (a.prototype.emit = function(e, t) {
              this._core.emit(e, t);
            }),
            (a.prototype.addDisposableListener = function(e, t) {
              return this._core.addDisposableListener(e, t);
            }),
            (a.prototype.resize = function(e, t) {
              this._core.resize(e, t);
            }),
            (a.prototype.writeln = function(e) {
              this._core.writeln(e);
            }),
            (a.prototype.open = function(e) {
              this._core.open(e);
            }),
            (a.prototype.attachCustomKeyEventHandler = function(e) {
              this._core.attachCustomKeyEventHandler(e);
            }),
            (a.prototype.addCsiHandler = function(e, t) {
              return this._core.addCsiHandler(e, t);
            }),
            (a.prototype.addOscHandler = function(e, t) {
              return this._core.addOscHandler(e, t);
            }),
            (a.prototype.registerLinkMatcher = function(e, t, i) {
              return this._core.registerLinkMatcher(e, t, i);
            }),
            (a.prototype.deregisterLinkMatcher = function(e) {
              this._core.deregisterLinkMatcher(e);
            }),
            (a.prototype.registerCharacterJoiner = function(e) {
              return this._core.registerCharacterJoiner(e);
            }),
            (a.prototype.deregisterCharacterJoiner = function(e) {
              this._core.deregisterCharacterJoiner(e);
            }),
            (a.prototype.addMarker = function(e) {
              return this._core.addMarker(e);
            }),
            (a.prototype.hasSelection = function() {
              return this._core.hasSelection();
            }),
            (a.prototype.select = function(e, t, i) {
              this._core.select(e, t, i);
            }),
            (a.prototype.getSelection = function() {
              return this._core.getSelection();
            }),
            (a.prototype.getSelectionPosition = function() {
              return this._core.getSelectionPosition();
            }),
            (a.prototype.clearSelection = function() {
              this._core.clearSelection();
            }),
            (a.prototype.selectAll = function() {
              this._core.selectAll();
            }),
            (a.prototype.selectLines = function(e, t) {
              this._core.selectLines(e, t);
            }),
            (a.prototype.dispose = function() {
              this._addonManager.dispose(), this._core.dispose();
            }),
            (a.prototype.destroy = function() {
              this._core.destroy();
            }),
            (a.prototype.scrollLines = function(e) {
              this._core.scrollLines(e);
            }),
            (a.prototype.scrollPages = function(e) {
              this._core.scrollPages(e);
            }),
            (a.prototype.scrollToTop = function() {
              this._core.scrollToTop();
            }),
            (a.prototype.scrollToBottom = function() {
              this._core.scrollToBottom();
            }),
            (a.prototype.scrollToLine = function(e) {
              this._core.scrollToLine(e);
            }),
            (a.prototype.clear = function() {
              this._core.clear();
            }),
            (a.prototype.write = function(e) {
              this._core.write(e);
            }),
            (a.prototype.writeUtf8 = function(e) {
              this._core.writeUtf8(e);
            }),
            (a.prototype.getOption = function(e) {
              return this._core.getOption(e);
            }),
            (a.prototype.setOption = function(e, t) {
              this._core.setOption(e, t);
            }),
            (a.prototype.refresh = function(e, t) {
              this._core.refresh(e, t);
            }),
            (a.prototype.reset = function() {
              this._core.reset();
            }),
            (a.applyAddon = function(e) {
              e.apply(a);
            }),
            (a.prototype.loadAddon = function(e) {
              return this._addonManager.loadAddon(this, e);
            }),
            Object.defineProperty(a, "strings", {
              get: function() {
                return n;
              },
              enumerable: !0,
              configurable: !0
            }),
            a);
          function a(e) {
            (this._core = new r.Terminal(e)),
              (this._addonManager = new s.AddonManager());
          }
          i.Terminal = o;
          var l = (Object.defineProperty(h.prototype, "cursorY", {
            get: function() {
              return this._buffer.y;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(h.prototype, "cursorX", {
            get: function() {
              return this._buffer.x;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(h.prototype, "viewportY", {
            get: function() {
              return this._buffer.ydisp;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(h.prototype, "baseY", {
            get: function() {
              return this._buffer.ybase;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(h.prototype, "length", {
            get: function() {
              return this._buffer.lines.length;
            },
            enumerable: !0,
            configurable: !0
          }),
          (h.prototype.getLine = function(e) {
            var t = this._buffer.lines.get(e);
            if (t) return new c(t);
          }),
          h);
          function h(e) {
            this._buffer = e;
          }
          var c = (Object.defineProperty(u.prototype, "isWrapped", {
            get: function() {
              return this._line.isWrapped;
            },
            enumerable: !0,
            configurable: !0
          }),
          (u.prototype.getCell = function(e) {
            if (!(e < 0 || e >= this._line.length)) return new f(this._line, e);
          }),
          (u.prototype.translateToString = function(e, t, i) {
            return this._line.translateToString(e, t, i);
          }),
          u);
          function u(e) {
            this._line = e;
          }
          var f = (Object.defineProperty(_.prototype, "char", {
            get: function() {
              return this._line.getString(this._x);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(_.prototype, "width", {
            get: function() {
              return this._line.getWidth(this._x);
            },
            enumerable: !0,
            configurable: !0
          }),
          _);
          function _(e, t) {
            (this._line = e), (this._x = t);
          }
        },
        { "../Strings": 16, "../Terminal": 17, "./AddonManager": 36 }
      ],
      38: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var o = e("../common/Types"),
            a = e("./atlas/Types"),
            r = e("./atlas/CharAtlasCache"),
            l = e("../core/buffer/BufferLine"),
            n = ((s.prototype.dispose = function() {
              this._container.removeChild(this._canvas),
                this._charAtlas && this._charAtlas.dispose();
            }),
            (s.prototype._initCanvas = function() {
              (this._ctx = this._canvas.getContext("2d", {
                alpha: this._alpha
              })),
                this._alpha || this.clearAll();
            }),
            (s.prototype.onOptionsChanged = function(e) {}),
            (s.prototype.onBlur = function(e) {}),
            (s.prototype.onFocus = function(e) {}),
            (s.prototype.onCursorMove = function(e) {}),
            (s.prototype.onGridChanged = function(e, t, i) {}),
            (s.prototype.onSelectionChanged = function(e, t, i, r) {
              void 0 === r && (r = !1);
            }),
            (s.prototype.setColors = function(e, t) {
              this._refreshCharAtlas(e, t);
            }),
            (s.prototype.setTransparency = function(e, t) {
              if (t !== this._alpha) {
                var i = this._canvas;
                (this._alpha = t),
                  (this._canvas = this._canvas.cloneNode()),
                  this._initCanvas(),
                  this._container.replaceChild(this._canvas, i),
                  this._refreshCharAtlas(e, this._colors),
                  this.onGridChanged(e, 0, e.rows - 1);
              }
            }),
            (s.prototype._refreshCharAtlas = function(e, t) {
              (this._scaledCharWidth <= 0 && this._scaledCharHeight <= 0) ||
                ((this._charAtlas = r.acquireCharAtlas(
                  e,
                  t,
                  this._scaledCharWidth,
                  this._scaledCharHeight
                )),
                this._charAtlas.warmUp());
            }),
            (s.prototype.resize = function(e, t) {
              (this._scaledCellWidth = t.scaledCellWidth),
                (this._scaledCellHeight = t.scaledCellHeight),
                (this._scaledCharWidth = t.scaledCharWidth),
                (this._scaledCharHeight = t.scaledCharHeight),
                (this._scaledCharLeft = t.scaledCharLeft),
                (this._scaledCharTop = t.scaledCharTop),
                (this._canvas.width = t.scaledCanvasWidth),
                (this._canvas.height = t.scaledCanvasHeight),
                (this._canvas.style.width = t.canvasWidth + "px"),
                (this._canvas.style.height = t.canvasHeight + "px"),
                this._alpha || this.clearAll(),
                this._refreshCharAtlas(e, this._colors);
            }),
            (s.prototype.fillCells = function(e, t, i, r) {
              this._ctx.fillRect(
                e * this._scaledCellWidth,
                t * this._scaledCellHeight,
                i * this._scaledCellWidth,
                r * this._scaledCellHeight
              );
            }),
            (s.prototype.fillBottomLineAtCells = function(e, t, i) {
              void 0 === i && (i = 1),
                this._ctx.fillRect(
                  e * this._scaledCellWidth,
                  (t + 1) * this._scaledCellHeight -
                    window.devicePixelRatio -
                    1,
                  i * this._scaledCellWidth,
                  window.devicePixelRatio
                );
            }),
            (s.prototype.fillLeftLineAtCell = function(e, t) {
              this._ctx.fillRect(
                e * this._scaledCellWidth,
                t * this._scaledCellHeight,
                window.devicePixelRatio,
                this._scaledCellHeight
              );
            }),
            (s.prototype.strokeRectAtCell = function(e, t, i, r) {
              (this._ctx.lineWidth = window.devicePixelRatio),
                this._ctx.strokeRect(
                  e * this._scaledCellWidth + window.devicePixelRatio / 2,
                  t * this._scaledCellHeight + window.devicePixelRatio / 2,
                  i * this._scaledCellWidth - window.devicePixelRatio,
                  r * this._scaledCellHeight - window.devicePixelRatio
                );
            }),
            (s.prototype.clearAll = function() {
              this._alpha
                ? this._ctx.clearRect(
                    0,
                    0,
                    this._canvas.width,
                    this._canvas.height
                  )
                : ((this._ctx.fillStyle = this._colors.background.css),
                  this._ctx.fillRect(
                    0,
                    0,
                    this._canvas.width,
                    this._canvas.height
                  ));
            }),
            (s.prototype.clearCells = function(e, t, i, r) {
              this._alpha
                ? this._ctx.clearRect(
                    e * this._scaledCellWidth,
                    t * this._scaledCellHeight,
                    i * this._scaledCellWidth,
                    r * this._scaledCellHeight
                  )
                : ((this._ctx.fillStyle = this._colors.background.css),
                  this._ctx.fillRect(
                    e * this._scaledCellWidth,
                    t * this._scaledCellHeight,
                    i * this._scaledCellWidth,
                    r * this._scaledCellHeight
                  ));
            }),
            (s.prototype.fillCharTrueColor = function(e, t, i, r) {
              (this._ctx.font = this._getFont(e, !1, !1)),
                (this._ctx.textBaseline = "middle"),
                this._clipRow(e, r),
                this._ctx.fillText(
                  t.getChars(),
                  i * this._scaledCellWidth + this._scaledCharLeft,
                  r * this._scaledCellHeight +
                    this._scaledCharTop +
                    this._scaledCharHeight / 2
                );
            }),
            (s.prototype.drawChars = function(e, t, i, r) {
              var n, s;
              t.isFgRGB() || t.isBgRGB()
                ? this._drawUncachedChars(e, t, i, r)
                : (t.isInverse()
                    ? ((n = t.isBgDefault()
                        ? a.INVERTED_DEFAULT_COLOR
                        : t.getBgColor()),
                      (s = t.isFgDefault()
                        ? a.INVERTED_DEFAULT_COLOR
                        : t.getFgColor()))
                    : ((s = t.isBgDefault() ? o.DEFAULT_COLOR : t.getBgColor()),
                      (n = t.isFgDefault() ? o.DEFAULT_COLOR : t.getFgColor())),
                  (n +=
                    e.options.drawBoldTextInBrightColors &&
                    t.isBold() &&
                    n < 8 &&
                    n !== a.INVERTED_DEFAULT_COLOR
                      ? 8
                      : 0),
                  (this._currentGlyphIdentifier.chars =
                    t.getChars() || l.WHITESPACE_CELL_CHAR),
                  (this._currentGlyphIdentifier.code =
                    t.getCode() || l.WHITESPACE_CELL_CODE),
                  (this._currentGlyphIdentifier.bg = s),
                  (this._currentGlyphIdentifier.fg = n),
                  (this._currentGlyphIdentifier.bold =
                    t.isBold() && e.options.enableBold),
                  (this._currentGlyphIdentifier.dim = !!t.isDim()),
                  (this._currentGlyphIdentifier.italic = !!t.isItalic()),
                  (this._charAtlas &&
                    this._charAtlas.draw(
                      this._ctx,
                      this._currentGlyphIdentifier,
                      i * this._scaledCellWidth + this._scaledCharLeft,
                      r * this._scaledCellHeight + this._scaledCharTop
                    )) ||
                    this._drawUncachedChars(e, t, i, r));
            }),
            (s.prototype._drawUncachedChars = function(e, t, i, r) {
              if (
                (this._ctx.save(),
                (this._ctx.font = this._getFont(
                  e,
                  t.isBold() && e.options.enableBold,
                  !!t.isItalic()
                )),
                (this._ctx.textBaseline = "middle"),
                t.isInverse())
              )
                t.isBgDefault()
                  ? (this._ctx.fillStyle = this._colors.background.css)
                  : t.isBgRGB()
                  ? (this._ctx.fillStyle =
                      "rgb(" +
                      l.AttributeData.toColorRGB(t.getBgColor()).join(",") +
                      ")")
                  : (this._ctx.fillStyle = this._colors.ansi[
                      t.getBgColor()
                    ].css);
              else if (t.isFgDefault())
                this._ctx.fillStyle = this._colors.foreground.css;
              else if (t.isFgRGB())
                this._ctx.fillStyle =
                  "rgb(" +
                  l.AttributeData.toColorRGB(t.getFgColor()).join(",") +
                  ")";
              else {
                var n = t.getFgColor();
                e.options.drawBoldTextInBrightColors &&
                  t.isBold() &&
                  n < 8 &&
                  (n += 8),
                  (this._ctx.fillStyle = this._colors.ansi[n].css);
              }
              this._clipRow(e, r),
                t.isDim() && (this._ctx.globalAlpha = a.DIM_OPACITY),
                this._ctx.fillText(
                  t.getChars(),
                  i * this._scaledCellWidth + this._scaledCharLeft,
                  r * this._scaledCellHeight +
                    this._scaledCharTop +
                    this._scaledCharHeight / 2
                ),
                this._ctx.restore();
            }),
            (s.prototype._clipRow = function(e, t) {
              this._ctx.beginPath(),
                this._ctx.rect(
                  0,
                  t * this._scaledCellHeight,
                  e.cols * this._scaledCellWidth,
                  this._scaledCellHeight
                ),
                this._ctx.clip();
            }),
            (s.prototype._getFont = function(e, t, i) {
              return (
                (i ? "italic" : "") +
                " " +
                (t ? e.options.fontWeightBold : e.options.fontWeight) +
                " " +
                e.options.fontSize * window.devicePixelRatio +
                "px " +
                e.options.fontFamily
              );
            }),
            s);
          function s(e, t, i, r, n) {
            (this._container = e),
              (this._alpha = r),
              (this._colors = n),
              (this._scaledCharWidth = 0),
              (this._scaledCharHeight = 0),
              (this._scaledCellWidth = 0),
              (this._scaledCellHeight = 0),
              (this._scaledCharLeft = 0),
              (this._scaledCharTop = 0),
              (this._currentGlyphIdentifier = {
                chars: "",
                code: 0,
                bg: 0,
                fg: 0,
                bold: !1,
                dim: !1,
                italic: !1
              }),
              (this._canvas = document.createElement("canvas")),
              this._canvas.classList.add("xterm-" + t + "-layer"),
              (this._canvas.style.zIndex = i.toString()),
              this._initCanvas(),
              this._container.appendChild(this._canvas);
          }
          i.BaseRenderLayer = n;
        },
        {
          "../common/Types": 27,
          "../core/buffer/BufferLine": 29,
          "./atlas/CharAtlasCache": 48,
          "./atlas/Types": 55
        }
      ],
      39: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            f = e("../core/buffer/BufferLine"),
            o = ((s = f.AttributeData),
            n(a, s),
            (a.prototype.isCombined = function() {
              return 2097152;
            }),
            (a.prototype.getWidth = function() {
              return this._width;
            }),
            (a.prototype.getChars = function() {
              return this.combinedData;
            }),
            (a.prototype.getCode = function() {
              return 2097151;
            }),
            (a.prototype.setFromCharData = function(e) {
              throw new Error("not implemented");
            }),
            (a.prototype.getAsCharData = function() {
              return [
                this.fg,
                this.getChars(),
                this.getWidth(),
                this.getCode()
              ];
            }),
            a);
          function a(e, t, i) {
            var r = s.call(this) || this;
            return (
              (r.content = 0),
              (r.combinedData = ""),
              (r.fg = e.fg),
              (r.bg = e.bg),
              (r.combinedData = t),
              (r._width = i),
              r
            );
          }
          i.JoinedCellData = o;
          var l = ((c.prototype.registerCharacterJoiner = function(e) {
            var t = { id: this._nextCharacterJoinerId++, handler: e };
            return this._characterJoiners.push(t), t.id;
          }),
          (c.prototype.deregisterCharacterJoiner = function(e) {
            for (var t = 0; t < this._characterJoiners.length; t++)
              if (this._characterJoiners[t].id === e)
                return this._characterJoiners.splice(t, 1), !0;
            return !1;
          }),
          (c.prototype.getJoinedCharacters = function(e) {
            if (0 === this._characterJoiners.length) return [];
            var t = this._terminal.buffer.lines.get(e);
            if (0 === t.length) return [];
            for (
              var i = [],
                r = t.translateToString(!0),
                n = 0,
                s = 0,
                o = 0,
                a = t.getFg(0),
                l = t.getBg(0),
                h = 0;
              h < t.getTrimmedLength();
              h++
            )
              if (
                (t.loadCell(h, this._workCell), 0 !== this._workCell.getWidth())
              ) {
                if (this._workCell.fg !== a || this._workCell.bg !== l) {
                  if (1 < h - n)
                    for (
                      var c = this._getJoinedRanges(r, o, s, t, n), u = 0;
                      u < c.length;
                      u++
                    )
                      i.push(c[u]);
                  (n = h),
                    (o = s),
                    (a = this._workCell.fg),
                    (l = this._workCell.bg);
                }
                s +=
                  this._workCell.getChars().length ||
                  f.WHITESPACE_CELL_CHAR.length;
              }
            if (1 < this._terminal.cols - n)
              for (
                c = this._getJoinedRanges(r, o, s, t, n), u = 0;
                u < c.length;
                u++
              )
                i.push(c[u]);
            return i;
          }),
          (c.prototype._getJoinedRanges = function(e, t, i, r, n) {
            for (
              var s = e.substring(t, i),
                o = this._characterJoiners[0].handler(s),
                a = 1;
              a < this._characterJoiners.length;
              a++
            )
              for (
                var l = this._characterJoiners[a].handler(s), h = 0;
                h < l.length;
                h++
              )
                c._mergeRanges(o, l[h]);
            return this._stringRangesToCellRanges(o, r, n), o;
          }),
          (c.prototype._stringRangesToCellRanges = function(e, t, i) {
            var r = 0,
              n = !1,
              s = 0,
              o = e[r];
            if (o) {
              for (var a = i; a < this._terminal.cols; a++) {
                var l = t.getWidth(a),
                  h = t.getString(a).length || f.WHITESPACE_CELL_CHAR.length;
                if (0 !== l) {
                  if ((!n && o[0] <= s && ((o[0] = a), (n = !0)), o[1] <= s)) {
                    if (((o[1] = a), !(o = e[++r]))) break;
                    n = o[0] <= s && ((o[0] = a), !0);
                  }
                  s += h;
                }
              }
              o && (o[1] = this._terminal.cols);
            }
          }),
          (c._mergeRanges = function(e, t) {
            for (var i = !1, r = 0; r < e.length; r++) {
              var n = e[r];
              if (i) {
                if (t[1] <= n[0]) return (e[r - 1][1] = t[1]), e;
                if (t[1] <= n[1])
                  return (
                    (e[r - 1][1] = Math.max(t[1], n[1])),
                    e.splice(r, 1),
                    (i = !1),
                    e
                  );
                e.splice(r, 1), r--;
              } else {
                if (t[1] <= n[0]) return e.splice(r, 0, t), e;
                if (t[1] <= n[1]) return (n[0] = Math.min(t[0], n[0])), e;
                t[0] < n[1] && ((n[0] = Math.min(t[0], n[0])), (i = !0));
              }
            }
            return i ? (e[e.length - 1][1] = t[1]) : e.push(t), e;
          }),
          c);
          function c(e) {
            (this._terminal = e),
              (this._characterJoiners = []),
              (this._nextCharacterJoinerId = 0),
              (this._workCell = new f.CellData());
          }
          i.CharacterJoinerRegistry = l;
        },
        { "../core/buffer/BufferLine": 29 }
      ],
      40: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./BaseRenderLayer"),
            a = e("../core/buffer/BufferLine"),
            l = ((s = o.BaseRenderLayer),
            n(h, s),
            (h.prototype.resize = function(e, t) {
              s.prototype.resize.call(this, e, t),
                (this._state = {
                  x: null,
                  y: null,
                  isFocused: null,
                  style: null,
                  width: null
                });
            }),
            (h.prototype.reset = function(e) {
              this._clearCursor(),
                this._cursorBlinkStateManager &&
                  (this._cursorBlinkStateManager.dispose(),
                  (this._cursorBlinkStateManager = null),
                  this.onOptionsChanged(e));
            }),
            (h.prototype.onBlur = function(e) {
              this._cursorBlinkStateManager &&
                this._cursorBlinkStateManager.pause(),
                e.refresh(e.buffer.y, e.buffer.y);
            }),
            (h.prototype.onFocus = function(e) {
              this._cursorBlinkStateManager
                ? this._cursorBlinkStateManager.resume(e)
                : e.refresh(e.buffer.y, e.buffer.y);
            }),
            (h.prototype.onOptionsChanged = function(e) {
              var t = this;
              e.options.cursorBlink
                ? this._cursorBlinkStateManager ||
                  (this._cursorBlinkStateManager = new c(e, function() {
                    t._render(e, !0);
                  }))
                : (this._cursorBlinkStateManager &&
                    (this._cursorBlinkStateManager.dispose(),
                    (this._cursorBlinkStateManager = null)),
                  e.refresh(e.buffer.y, e.buffer.y));
            }),
            (h.prototype.onCursorMove = function(e) {
              this._cursorBlinkStateManager &&
                this._cursorBlinkStateManager.restartBlinkAnimation(e);
            }),
            (h.prototype.onGridChanged = function(e, t, i) {
              !this._cursorBlinkStateManager ||
              this._cursorBlinkStateManager.isPaused
                ? this._render(e, !1)
                : this._cursorBlinkStateManager.restartBlinkAnimation(e);
            }),
            (h.prototype._render = function(e, t) {
              if (e.cursorState && !e.cursorHidden) {
                var i = e.buffer.ybase + e.buffer.y,
                  r = i - e.buffer.ydisp;
                if (r < 0 || r >= e.rows) this._clearCursor();
                else if (
                  (e.buffer.lines.get(i).loadCell(e.buffer.x, this._cell),
                  void 0 !== this._cell.content)
                ) {
                  if (!e.isFocused)
                    return (
                      this._clearCursor(),
                      this._ctx.save(),
                      (this._ctx.fillStyle = this._colors.cursor.css),
                      this._renderBlurCursor(e, e.buffer.x, r, this._cell),
                      this._ctx.restore(),
                      (this._state.x = e.buffer.x),
                      (this._state.y = r),
                      (this._state.isFocused = !1),
                      (this._state.style = e.options.cursorStyle),
                      void (this._state.width = this._cell.getWidth())
                    );
                  if (
                    !this._cursorBlinkStateManager ||
                    this._cursorBlinkStateManager.isCursorVisible
                  ) {
                    if (this._state) {
                      if (
                        this._state.x === e.buffer.x &&
                        this._state.y === r &&
                        this._state.isFocused === e.isFocused &&
                        this._state.style === e.options.cursorStyle &&
                        this._state.width === this._cell.getWidth()
                      )
                        return;
                      this._clearCursor();
                    }
                    this._ctx.save(),
                      this._cursorRenderers[e.options.cursorStyle || "block"](
                        e,
                        e.buffer.x,
                        r,
                        this._cell
                      ),
                      this._ctx.restore(),
                      (this._state.x = e.buffer.x),
                      (this._state.y = r),
                      (this._state.isFocused = !1),
                      (this._state.style = e.options.cursorStyle),
                      (this._state.width = this._cell.getWidth());
                  } else this._clearCursor();
                }
              } else this._clearCursor();
            }),
            (h.prototype._clearCursor = function() {
              this._state &&
                (this.clearCells(
                  this._state.x,
                  this._state.y,
                  this._state.width,
                  1
                ),
                (this._state = {
                  x: null,
                  y: null,
                  isFocused: null,
                  style: null,
                  width: null
                }));
            }),
            (h.prototype._renderBarCursor = function(e, t, i, r) {
              this._ctx.save(),
                (this._ctx.fillStyle = this._colors.cursor.css),
                this.fillLeftLineAtCell(t, i),
                this._ctx.restore();
            }),
            (h.prototype._renderBlockCursor = function(e, t, i, r) {
              this._ctx.save(),
                (this._ctx.fillStyle = this._colors.cursor.css),
                this.fillCells(t, i, r.getWidth(), 1),
                (this._ctx.fillStyle = this._colors.cursorAccent.css),
                this.fillCharTrueColor(e, r, t, i),
                this._ctx.restore();
            }),
            (h.prototype._renderUnderlineCursor = function(e, t, i, r) {
              this._ctx.save(),
                (this._ctx.fillStyle = this._colors.cursor.css),
                this.fillBottomLineAtCells(t, i),
                this._ctx.restore();
            }),
            (h.prototype._renderBlurCursor = function(e, t, i, r) {
              this._ctx.save(),
                (this._ctx.strokeStyle = this._colors.cursor.css),
                this.strokeRectAtCell(t, i, r.getWidth(), 1),
                this._ctx.restore();
            }),
            h);
          function h(e, t, i) {
            var r = s.call(this, e, "cursor", t, !0, i) || this;
            return (
              (r._cell = new a.CellData()),
              (r._state = {
                x: null,
                y: null,
                isFocused: null,
                style: null,
                width: null
              }),
              (r._cursorRenderers = {
                bar: r._renderBarCursor.bind(r),
                block: r._renderBlockCursor.bind(r),
                underline: r._renderUnderlineCursor.bind(r)
              }),
              r
            );
          }
          i.CursorRenderLayer = l;
          var c = (Object.defineProperty(u.prototype, "isPaused", {
            get: function() {
              return !(this._blinkStartTimeout || this._blinkInterval);
            },
            enumerable: !0,
            configurable: !0
          }),
          (u.prototype.dispose = function() {
            this._blinkInterval &&
              (window.clearInterval(this._blinkInterval),
              (this._blinkInterval = null)),
              this._blinkStartTimeout &&
                (window.clearTimeout(this._blinkStartTimeout),
                (this._blinkStartTimeout = null)),
              this._animationFrame &&
                (window.cancelAnimationFrame(this._animationFrame),
                (this._animationFrame = null));
          }),
          (u.prototype.restartBlinkAnimation = function(e) {
            var t = this;
            this.isPaused ||
              ((this._animationTimeRestarted = Date.now()),
              (this.isCursorVisible = !0),
              this._animationFrame ||
                (this._animationFrame = window.requestAnimationFrame(
                  function() {
                    t._renderCallback(), (t._animationFrame = null);
                  }
                )));
          }),
          (u.prototype._restartInterval = function(e) {
            var t = this;
            void 0 === e && (e = 600),
              this._blinkInterval && window.clearInterval(this._blinkInterval),
              (this._blinkStartTimeout = setTimeout(function() {
                if (t._animationTimeRestarted) {
                  var e = 600 - (Date.now() - t._animationTimeRestarted);
                  if (((t._animationTimeRestarted = null), 0 < e))
                    return void t._restartInterval(e);
                }
                (t.isCursorVisible = !1),
                  (t._animationFrame = window.requestAnimationFrame(function() {
                    t._renderCallback(), (t._animationFrame = null);
                  })),
                  (t._blinkInterval = setInterval(function() {
                    if (t._animationTimeRestarted) {
                      var e = 600 - (Date.now() - t._animationTimeRestarted);
                      return (
                        (t._animationTimeRestarted = null),
                        void t._restartInterval(e)
                      );
                    }
                    (t.isCursorVisible = !t.isCursorVisible),
                      (t._animationFrame = window.requestAnimationFrame(
                        function() {
                          t._renderCallback(), (t._animationFrame = null);
                        }
                      ));
                  }, 600));
              }, e));
          }),
          (u.prototype.pause = function() {
            (this.isCursorVisible = !0),
              this._blinkInterval &&
                (window.clearInterval(this._blinkInterval),
                (this._blinkInterval = null)),
              this._blinkStartTimeout &&
                (window.clearTimeout(this._blinkStartTimeout),
                (this._blinkStartTimeout = null)),
              this._animationFrame &&
                (window.cancelAnimationFrame(this._animationFrame),
                (this._animationFrame = null));
          }),
          (u.prototype.resume = function(e) {
            (this._animationTimeRestarted = null),
              this._restartInterval(),
              this.restartBlinkAnimation(e);
          }),
          u);
          function u(e, t) {
            (this._renderCallback = t),
              (this.isCursorVisible = !0),
              e.isFocused && this._restartInterval();
          }
        },
        { "../core/buffer/BufferLine": 29, "./BaseRenderLayer": 38 }
      ],
      41: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((n.prototype.resize = function(e, t) {
            for (var i = 0; i < e; i++) {
              this.cache.length <= i && this.cache.push([]);
              for (var r = this.cache[i].length; r < t; r++)
                this.cache[i].push(null);
              this.cache[i].length = t;
            }
            this.cache.length = e;
          }),
          (n.prototype.clear = function() {
            for (var e = 0; e < this.cache.length; e++)
              for (var t = 0; t < this.cache[e].length; t++)
                this.cache[e][t] = null;
          }),
          n);
          function n() {
            this.cache = [];
          }
          i.GridCache = r;
        },
        {}
      ],
      42: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./BaseRenderLayer"),
            a = e("./atlas/Types"),
            l = e("./atlas/CharAtlasUtils"),
            h = ((s = o.BaseRenderLayer),
            n(c, s),
            (c.prototype.resize = function(e, t) {
              s.prototype.resize.call(this, e, t), (this._state = null);
            }),
            (c.prototype.reset = function(e) {
              this._clearCurrentLink();
            }),
            (c.prototype._clearCurrentLink = function() {
              if (this._state) {
                this.clearCells(
                  this._state.x1,
                  this._state.y1,
                  this._state.cols - this._state.x1,
                  1
                );
                var e = this._state.y2 - this._state.y1 - 1;
                0 < e &&
                  this.clearCells(0, this._state.y1 + 1, this._state.cols, e),
                  this.clearCells(0, this._state.y2, this._state.x2, 1),
                  (this._state = null);
              }
            }),
            (c.prototype._onLinkHover = function(e) {
              if (
                (e.fg === a.INVERTED_DEFAULT_COLOR
                  ? (this._ctx.fillStyle = this._colors.background.css)
                  : l.is256Color(e.fg)
                  ? (this._ctx.fillStyle = this._colors.ansi[e.fg].css)
                  : (this._ctx.fillStyle = this._colors.foreground.css),
                e.y1 === e.y2)
              )
                this.fillBottomLineAtCells(e.x1, e.y1, e.x2 - e.x1);
              else {
                this.fillBottomLineAtCells(e.x1, e.y1, e.cols - e.x1);
                for (var t = e.y1 + 1; t < e.y2; t++)
                  this.fillBottomLineAtCells(0, t, e.cols);
                this.fillBottomLineAtCells(0, e.y2, e.x2);
              }
              this._state = e;
            }),
            (c.prototype._onLinkLeave = function(e) {
              this._clearCurrentLink();
            }),
            c);
          function c(e, t, i, r) {
            var n = s.call(this, e, "link", t, !0, i) || this;
            return (
              (n._state = null),
              r.linkifier.onLinkHover(function(e) {
                return n._onLinkHover(e);
              }),
              r.linkifier.onLinkLeave(function(e) {
                return n._onLinkLeave(e);
              }),
              n
            );
          }
          i.LinkRenderLayer = h;
        },
        {
          "./BaseRenderLayer": 38,
          "./atlas/CharAtlasUtils": 50,
          "./atlas/Types": 55
        }
      ],
      43: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("../ui/RenderDebouncer"),
            a = e("../common/EventEmitter2"),
            l = e("../common/Lifecycle"),
            h = e("../ui/ScreenDprMonitor"),
            c = e("../ui/Lifecycle"),
            u = ((s = l.Disposable),
            n(f, s),
            Object.defineProperty(f.prototype, "onDimensionsChange", {
              get: function() {
                return this._onDimensionsChange.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(f.prototype, "onRender", {
              get: function() {
                return this._onRender.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(f.prototype, "onRefreshRequest", {
              get: function() {
                return this._onRefreshRequest.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(f.prototype, "dimensions", {
              get: function() {
                return this._renderer.dimensions;
              },
              enumerable: !0,
              configurable: !0
            }),
            (f.prototype._onIntersectionChange = function(e) {
              (this._isPaused = 0 === e.intersectionRatio),
                !this._isPaused &&
                  this._needsFullRefresh &&
                  (this.refreshRows(0, this._rowCount - 1),
                  (this._needsFullRefresh = !1));
            }),
            (f.prototype.refreshRows = function(e, t) {
              this._isPaused
                ? (this._needsFullRefresh = !0)
                : this._renderDebouncer.refresh(e, t, this._rowCount);
            }),
            (f.prototype._renderRows = function(e, t) {
              this._renderer.renderRows(e, t),
                this._onRender.fire({ start: e, end: t });
            }),
            (f.prototype.resize = function(e, t) {
              (this._rowCount = t), this._fireOnCanvasResize();
            }),
            (f.prototype.changeOptions = function() {
              this._renderer.onOptionsChanged(), this._fireOnCanvasResize();
            }),
            (f.prototype._fireOnCanvasResize = function() {
              (this._renderer.dimensions.canvasWidth === this._canvasWidth &&
                this._renderer.dimensions.canvasHeight ===
                  this._canvasHeight) ||
                this._onDimensionsChange.fire(this._renderer.dimensions);
            }),
            (f.prototype.setRenderer = function(e) {
              this._renderer.dispose(), (this._renderer = e);
            }),
            (f.prototype._fullRefresh = function() {
              this._isPaused
                ? (this._needsFullRefresh = !0)
                : this.refreshRows(0, this._rowCount);
            }),
            (f.prototype.setColors = function(e) {
              this._renderer.setColors(e), this._fullRefresh();
            }),
            (f.prototype.onDevicePixelRatioChange = function() {
              this._renderer.onDevicePixelRatioChange();
            }),
            (f.prototype.onResize = function(e, t) {
              this._renderer.onResize(e, t), this._fullRefresh();
            }),
            (f.prototype.onCharSizeChanged = function() {
              this._renderer.onCharSizeChanged();
            }),
            (f.prototype.onBlur = function() {
              this._renderer.onBlur();
            }),
            (f.prototype.onFocus = function() {
              this._renderer.onFocus();
            }),
            (f.prototype.onSelectionChanged = function(e, t, i) {
              this._renderer.onSelectionChanged(e, t, i);
            }),
            (f.prototype.onCursorMove = function() {
              this._renderer.onCursorMove();
            }),
            (f.prototype.onOptionsChanged = function() {
              this._renderer.onOptionsChanged();
            }),
            (f.prototype.clear = function() {
              this._renderer.clear();
            }),
            (f.prototype.registerCharacterJoiner = function(e) {
              return this._renderer.registerCharacterJoiner(e);
            }),
            (f.prototype.deregisterCharacterJoiner = function(e) {
              return this._renderer.deregisterCharacterJoiner(e);
            }),
            f);
          function f(e, t, i) {
            var r = s.call(this) || this;
            if (
              ((r._renderer = e),
              (r._rowCount = t),
              (r._isPaused = !1),
              (r._needsFullRefresh = !1),
              (r._canvasWidth = 0),
              (r._canvasHeight = 0),
              (r._onDimensionsChange = new a.EventEmitter2()),
              (r._onRender = new a.EventEmitter2()),
              (r._onRefreshRequest = new a.EventEmitter2()),
              (r._renderDebouncer = new o.RenderDebouncer(function(e, t) {
                return r._renderRows(e, t);
              })),
              r.register(r._renderDebouncer),
              (r._screenDprMonitor = new h.ScreenDprMonitor()),
              r._screenDprMonitor.setListener(function() {
                return r._renderer.onDevicePixelRatioChange();
              }),
              r.register(r._screenDprMonitor),
              r.register(
                c.addDisposableDomListener(window, "resize", function() {
                  return r._renderer.onDevicePixelRatioChange();
                })
              ),
              "IntersectionObserver" in window)
            ) {
              var n = new IntersectionObserver(
                function(e) {
                  return r._onIntersectionChange(e[e.length - 1]);
                },
                { threshold: 0 }
              );
              n.observe(i),
                r.register({
                  dispose: function() {
                    return n.disconnect();
                  }
                });
            }
            return r;
          }
          i.RenderCoordinator = u;
        },
        {
          "../common/EventEmitter2": 23,
          "../common/Lifecycle": 24,
          "../ui/Lifecycle": 59,
          "../ui/RenderDebouncer": 60,
          "../ui/ScreenDprMonitor": 61
        }
      ],
      44: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./TextRenderLayer"),
            a = e("./SelectionRenderLayer"),
            l = e("./CursorRenderLayer"),
            h = e("./LinkRenderLayer"),
            c = e("../renderer/CharacterJoinerRegistry"),
            u = e("../common/Lifecycle"),
            f = ((s = u.Disposable),
            n(_, s),
            (_.prototype.dispose = function() {
              s.prototype.dispose.call(this),
                this._renderLayers.forEach(function(e) {
                  return e.dispose();
                });
            }),
            (_.prototype.onDevicePixelRatioChange = function() {
              this._devicePixelRatio !== window.devicePixelRatio &&
                ((this._devicePixelRatio = window.devicePixelRatio),
                this.onResize(this._terminal.cols, this._terminal.rows));
            }),
            (_.prototype.setColors = function(e) {
              var t = this;
              (this._colors = e),
                this._renderLayers.forEach(function(e) {
                  e.setColors(t._terminal, t._colors), e.reset(t._terminal);
                });
            }),
            (_.prototype.onResize = function(e, t) {
              var i = this;
              this._updateDimensions(),
                this._renderLayers.forEach(function(e) {
                  return e.resize(i._terminal, i.dimensions);
                }),
                (this._terminal.screenElement.style.width =
                  this.dimensions.canvasWidth + "px"),
                (this._terminal.screenElement.style.height =
                  this.dimensions.canvasHeight + "px");
            }),
            (_.prototype.onCharSizeChanged = function() {
              this.onResize(this._terminal.cols, this._terminal.rows);
            }),
            (_.prototype.onBlur = function() {
              var t = this;
              this._runOperation(function(e) {
                return e.onBlur(t._terminal);
              });
            }),
            (_.prototype.onFocus = function() {
              var t = this;
              this._runOperation(function(e) {
                return e.onFocus(t._terminal);
              });
            }),
            (_.prototype.onSelectionChanged = function(t, i, r) {
              var n = this;
              void 0 === r && (r = !1),
                this._runOperation(function(e) {
                  return e.onSelectionChanged(n._terminal, t, i, r);
                });
            }),
            (_.prototype.onCursorMove = function() {
              var t = this;
              this._runOperation(function(e) {
                return e.onCursorMove(t._terminal);
              });
            }),
            (_.prototype.onOptionsChanged = function() {
              var t = this;
              this._runOperation(function(e) {
                return e.onOptionsChanged(t._terminal);
              });
            }),
            (_.prototype.clear = function() {
              var t = this;
              this._runOperation(function(e) {
                return e.reset(t._terminal);
              });
            }),
            (_.prototype._runOperation = function(t) {
              this._renderLayers.forEach(function(e) {
                return t(e);
              });
            }),
            (_.prototype.renderRows = function(t, i) {
              var r = this;
              this._renderLayers.forEach(function(e) {
                return e.onGridChanged(r._terminal, t, i);
              });
            }),
            (_.prototype._updateDimensions = function() {
              this._terminal.charMeasure.width &&
                this._terminal.charMeasure.height &&
                ((this.dimensions.scaledCharWidth = Math.floor(
                  this._terminal.charMeasure.width * window.devicePixelRatio
                )),
                (this.dimensions.scaledCharHeight = Math.ceil(
                  this._terminal.charMeasure.height * window.devicePixelRatio
                )),
                (this.dimensions.scaledCellHeight = Math.floor(
                  this.dimensions.scaledCharHeight *
                    this._terminal.options.lineHeight
                )),
                (this.dimensions.scaledCharTop =
                  1 === this._terminal.options.lineHeight
                    ? 0
                    : Math.round(
                        (this.dimensions.scaledCellHeight -
                          this.dimensions.scaledCharHeight) /
                          2
                      )),
                (this.dimensions.scaledCellWidth =
                  this.dimensions.scaledCharWidth +
                  Math.round(this._terminal.options.letterSpacing)),
                (this.dimensions.scaledCharLeft = Math.floor(
                  this._terminal.options.letterSpacing / 2
                )),
                (this.dimensions.scaledCanvasHeight =
                  this._terminal.rows * this.dimensions.scaledCellHeight),
                (this.dimensions.scaledCanvasWidth =
                  this._terminal.cols * this.dimensions.scaledCellWidth),
                (this.dimensions.canvasHeight = Math.round(
                  this.dimensions.scaledCanvasHeight / window.devicePixelRatio
                )),
                (this.dimensions.canvasWidth = Math.round(
                  this.dimensions.scaledCanvasWidth / window.devicePixelRatio
                )),
                (this.dimensions.actualCellHeight =
                  this.dimensions.canvasHeight / this._terminal.rows),
                (this.dimensions.actualCellWidth =
                  this.dimensions.canvasWidth / this._terminal.cols));
            }),
            (_.prototype.registerCharacterJoiner = function(e) {
              return this._characterJoinerRegistry.registerCharacterJoiner(e);
            }),
            (_.prototype.deregisterCharacterJoiner = function(e) {
              return this._characterJoinerRegistry.deregisterCharacterJoiner(e);
            }),
            _);
          function _(e, t) {
            var i = s.call(this) || this;
            (i._terminal = e), (i._colors = t);
            var r = i._terminal.options.allowTransparency;
            return (
              (i._characterJoinerRegistry = new c.CharacterJoinerRegistry(e)),
              (i._renderLayers = [
                new o.TextRenderLayer(
                  i._terminal.screenElement,
                  0,
                  i._colors,
                  i._characterJoinerRegistry,
                  r
                ),
                new a.SelectionRenderLayer(
                  i._terminal.screenElement,
                  1,
                  i._colors
                ),
                new h.LinkRenderLayer(
                  i._terminal.screenElement,
                  2,
                  i._colors,
                  i._terminal
                ),
                new l.CursorRenderLayer(i._terminal.screenElement, 3, i._colors)
              ]),
              (i.dimensions = {
                scaledCharWidth: null,
                scaledCharHeight: null,
                scaledCellWidth: null,
                scaledCellHeight: null,
                scaledCharLeft: null,
                scaledCharTop: null,
                scaledCanvasWidth: null,
                scaledCanvasHeight: null,
                canvasWidth: null,
                canvasHeight: null,
                actualCellWidth: null,
                actualCellHeight: null
              }),
              (i._devicePixelRatio = window.devicePixelRatio),
              i._updateDimensions(),
              i.onOptionsChanged(),
              i
            );
          }
          i.Renderer = f;
        },
        {
          "../common/Lifecycle": 24,
          "../renderer/CharacterJoinerRegistry": 39,
          "./CursorRenderLayer": 40,
          "./LinkRenderLayer": 42,
          "./SelectionRenderLayer": 45,
          "./TextRenderLayer": 46
        }
      ],
      45: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./BaseRenderLayer"),
            a = ((s = o.BaseRenderLayer),
            n(l, s),
            (l.prototype._clearState = function() {
              this._state = {
                start: null,
                end: null,
                columnSelectMode: null,
                ydisp: null
              };
            }),
            (l.prototype.resize = function(e, t) {
              s.prototype.resize.call(this, e, t), this._clearState();
            }),
            (l.prototype.reset = function(e) {
              this._state.start &&
                this._state.end &&
                (this._clearState(), this.clearAll());
            }),
            (l.prototype.onSelectionChanged = function(e, t, i, r) {
              if (this._didStateChange(t, i, r, e.buffer.ydisp))
                if ((this.clearAll(), t && i)) {
                  var n = t[1] - e.buffer.ydisp,
                    s = i[1] - e.buffer.ydisp,
                    o = Math.max(n, 0),
                    a = Math.min(s, e.rows - 1);
                  if (!(o >= e.rows || a < 0)) {
                    if (
                      ((this._ctx.fillStyle = this._colors.selection.css), r)
                    ) {
                      var l = t[0],
                        h = i[0] - l,
                        c = a - o + 1;
                      this.fillCells(l, o, h, c);
                    } else {
                      l = n === o ? t[0] : 0;
                      var u = o === a ? i[0] : e.cols;
                      this.fillCells(l, o, u - l, 1);
                      var f = Math.max(a - o - 1, 0);
                      if ((this.fillCells(0, o + 1, e.cols, f), o !== a)) {
                        var _ = s === a ? i[0] : e.cols;
                        this.fillCells(0, a, _, 1);
                      }
                    }
                    (this._state.start = [t[0], t[1]]),
                      (this._state.end = [i[0], i[1]]),
                      (this._state.columnSelectMode = r),
                      (this._state.ydisp = e.buffer.ydisp);
                  }
                } else this._clearState();
            }),
            (l.prototype._didStateChange = function(e, t, i, r) {
              return (
                !this._areCoordinatesEqual(e, this._state.start) ||
                !this._areCoordinatesEqual(t, this._state.end) ||
                i !== this._state.columnSelectMode ||
                r !== this._state.ydisp
              );
            }),
            (l.prototype._areCoordinatesEqual = function(e, t) {
              return !(!e || !t) && e[0] === t[0] && e[1] === t[1];
            }),
            l);
          function l(e, t, i) {
            var r = s.call(this, e, "selection", t, !0, i) || this;
            return r._clearState(), r;
          }
          i.SelectionRenderLayer = a;
        },
        { "./BaseRenderLayer": 38 }
      ],
      46: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var o,
            a = e("./GridCache"),
            s = e("./BaseRenderLayer"),
            d = e("../core/buffer/BufferLine"),
            p = e("./CharacterJoinerRegistry"),
            l = ((o = s.BaseRenderLayer),
            n(h, o),
            (h.prototype.resize = function(e, t) {
              o.prototype.resize.call(this, e, t);
              var i = this._getFont(e, !1, !1);
              (this._characterWidth === t.scaledCharWidth &&
                this._characterFont === i) ||
                ((this._characterWidth = t.scaledCharWidth),
                (this._characterFont = i),
                (this._characterOverlapCache = {})),
                this._state.clear(),
                this._state.resize(e.cols, e.rows);
            }),
            (h.prototype.reset = function(e) {
              this._state.clear(), this.clearAll();
            }),
            (h.prototype._forEachCell = function(e, t, i, r, n) {
              for (var s = t; s <= i; s++)
                for (
                  var o = s + e.buffer.ydisp,
                    a = e.buffer.lines.get(o),
                    l = r ? r.getJoinedCharacters(o) : [],
                    h = 0;
                  h < e.cols;
                  h++
                ) {
                  a.loadCell(h, this._workCell);
                  var c = this._workCell,
                    u = !1,
                    f = h;
                  if (0 !== c.getWidth()) {
                    if (0 < l.length && h === l[0][0]) {
                      u = !0;
                      var _ = l.shift();
                      (c = new p.JoinedCellData(
                        this._workCell,
                        a.translateToString(!0, _[0], _[1]),
                        _[1] - _[0]
                      )),
                        (f = _[1] - 1);
                    }
                    !u &&
                      this._isOverlapping(c) &&
                      f < a.length - 1 &&
                      a.getCodePoint(f + 1) === d.NULL_CELL_CODE &&
                      ((c.content &= -12582913), (c.content |= 2 << 22)),
                      n(c, h, s),
                      (h = f);
                  }
                }
            }),
            (h.prototype._drawBackground = function(e, t, i) {
              var n = this,
                s = this._ctx,
                o = e.cols,
                a = 0,
                l = 0,
                h = null;
              s.save(),
                this._forEachCell(e, t, i, null, function(e, t, i) {
                  var r = null;
                  e.isInverse()
                    ? (r = e.isFgDefault()
                        ? n._colors.foreground.css
                        : e.isFgRGB()
                        ? "rgb(" +
                          d.AttributeData.toColorRGB(e.getFgColor()).join(",") +
                          ")"
                        : n._colors.ansi[e.getFgColor()].css)
                    : e.isBgRGB()
                    ? (r =
                        "rgb(" +
                        d.AttributeData.toColorRGB(e.getBgColor()).join(",") +
                        ")")
                    : e.isBgPalette() &&
                      (r = n._colors.ansi[e.getBgColor()].css),
                    null === h && ((a = t), (l = i)),
                    i !== l
                      ? ((s.fillStyle = h),
                        n.fillCells(a, l, o - a, 1),
                        (a = t),
                        (l = i))
                      : h !== r &&
                        ((s.fillStyle = h),
                        n.fillCells(a, l, t - a, 1),
                        (a = t),
                        (l = i)),
                    (h = r);
                }),
                null !== h &&
                  ((s.fillStyle = h), this.fillCells(a, l, o - a, 1)),
                s.restore();
            }),
            (h.prototype._drawForeground = function(n, e, t) {
              var s = this;
              this._forEachCell(
                n,
                e,
                t,
                this._characterJoinerRegistry,
                function(e, t, i) {
                  if (
                    !e.isInvisible() &&
                    (s.drawChars(n, e, t, i), e.isUnderline())
                  ) {
                    if ((s._ctx.save(), e.isInverse()))
                      e.isBgDefault()
                        ? (s._ctx.fillStyle = s._colors.background.css)
                        : e.isBgRGB()
                        ? (s._ctx.fillStyle =
                            "rgb(" +
                            d.AttributeData.toColorRGB(e.getBgColor()).join(
                              ","
                            ) +
                            ")")
                        : (s._ctx.fillStyle =
                            s._colors.ansi[e.getBgColor()].css);
                    else if (e.isFgDefault())
                      s._ctx.fillStyle = s._colors.foreground.css;
                    else if (e.isFgRGB())
                      s._ctx.fillStyle =
                        "rgb(" +
                        d.AttributeData.toColorRGB(e.getFgColor()).join(",") +
                        ")";
                    else {
                      var r = e.getFgColor();
                      n.options.drawBoldTextInBrightColors &&
                        e.isBold() &&
                        r < 8 &&
                        (r += 8),
                        (s._ctx.fillStyle = s._colors.ansi[r].css);
                    }
                    s.fillBottomLineAtCells(t, i, e.getWidth()),
                      s._ctx.restore();
                  }
                }
              );
            }),
            (h.prototype.onGridChanged = function(e, t, i) {
              0 !== this._state.cache.length &&
                (this._charAtlas && this._charAtlas.beginFrame(),
                this.clearCells(0, t, e.cols, i - t + 1),
                this._drawBackground(e, t, i),
                this._drawForeground(e, t, i));
            }),
            (h.prototype.onOptionsChanged = function(e) {
              this.setTransparency(e, e.options.allowTransparency);
            }),
            (h.prototype._isOverlapping = function(e) {
              if (1 !== e.getWidth()) return !1;
              if (e.getCode() < 256) return !1;
              var t = e.getChars();
              if (this._characterOverlapCache.hasOwnProperty(t))
                return this._characterOverlapCache[t];
              this._ctx.save(), (this._ctx.font = this._characterFont);
              var i =
                Math.floor(this._ctx.measureText(t).width) >
                this._characterWidth;
              return this._ctx.restore(), (this._characterOverlapCache[t] = i);
            }),
            h);
          function h(e, t, i, r, n) {
            var s = o.call(this, e, "text", t, n, i) || this;
            return (
              (s._characterOverlapCache = {}),
              (s._workCell = new d.CellData()),
              (s._state = new a.GridCache()),
              (s._characterJoinerRegistry = r),
              s
            );
          }
          i.TextRenderLayer = l;
        },
        {
          "../core/buffer/BufferLine": 29,
          "./BaseRenderLayer": 38,
          "./CharacterJoinerRegistry": 39,
          "./GridCache": 41
        }
      ],
      47: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((n.prototype.dispose = function() {}),
          (n.prototype.warmUp = function() {
            this._didWarmUp || (this._doWarmUp(), (this._didWarmUp = !0));
          }),
          (n.prototype._doWarmUp = function() {}),
          (n.prototype.beginFrame = function() {}),
          n);
          function n() {
            this._didWarmUp = !1;
          }
          i.default = r;
        },
        {}
      ],
      48: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var h = e("./CharAtlasUtils"),
            r = e("./DynamicCharAtlas"),
            n = e("./NoneCharAtlas"),
            s = e("./StaticCharAtlas"),
            c = { none: n.default, static: s.default, dynamic: r.default },
            u = [];
          (i.acquireCharAtlas = function(e, t, i, r) {
            for (
              var n = h.generateConfig(i, r, e, t), s = 0;
              s < u.length;
              s++
            ) {
              var o = (a = u[s]).ownedBy.indexOf(e);
              if (0 <= o) {
                if (h.configEquals(a.config, n)) return a.atlas;
                1 === a.ownedBy.length
                  ? (a.atlas.dispose(), u.splice(s, 1))
                  : a.ownedBy.splice(o, 1);
                break;
              }
            }
            for (s = 0; s < u.length; s++) {
              var a = u[s];
              if (h.configEquals(a.config, n))
                return a.ownedBy.push(e), a.atlas;
            }
            var l = {
              atlas: new c[e.options.experimentalCharAtlas](document, n),
              config: n,
              ownedBy: [e]
            };
            return u.push(l), l.atlas;
          }),
            (i.removeTerminalFromCache = function(e) {
              for (var t = 0; t < u.length; t++) {
                var i = u[t].ownedBy.indexOf(e);
                if (-1 !== i) {
                  1 === u[t].ownedBy.length
                    ? (u[t].atlas.dispose(), u.splice(t, 1))
                    : u[t].ownedBy.splice(i, 1);
                  break;
                }
              }
            });
        },
        {
          "./CharAtlasUtils": 50,
          "./DynamicCharAtlas": 51,
          "./NoneCharAtlas": 53,
          "./StaticCharAtlas": 54
        }
      ],
      49: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var u = e("../../common/Platform"),
            f = e("./Types");
          function _(e, t) {
            for (
              var i = !0,
                r = t.rgba >>> 24,
                n = (t.rgba >>> 16) & 255,
                s = (t.rgba >>> 8) & 255,
                o = 0;
              o < e.data.length;
              o += 4
            )
              e.data[o] === r && e.data[o + 1] === n && e.data[o + 2] === s
                ? (e.data[o + 3] = 0)
                : (i = !1);
            return i;
          }
          function d(e, t) {
            return (
              e + " " + t.fontSize * t.devicePixelRatio + "px " + t.fontFamily
            );
          }
          (i.generateStaticCharAtlasTexture = function(e, t, i) {
            var r = i.scaledCharWidth + f.CHAR_ATLAS_CELL_SPACING,
              n = i.scaledCharHeight + f.CHAR_ATLAS_CELL_SPACING,
              s = t(255 * r, 34 * n),
              o = s.getContext("2d", { alpha: i.allowTransparency });
            (o.fillStyle = i.colors.background.css),
              o.fillRect(0, 0, s.width, s.height),
              o.save(),
              (o.fillStyle = i.colors.foreground.css),
              (o.font = d(i.fontWeight, i)),
              (o.textBaseline = "middle");
            for (var a = 0; a < 256; a++)
              o.save(),
                o.beginPath(),
                o.rect(a * r, 0, r, n),
                o.clip(),
                o.fillText(String.fromCharCode(a), a * r, n / 2),
                o.restore();
            for (o.save(), o.font = d(i.fontWeightBold, i), a = 0; a < 256; a++)
              o.save(),
                o.beginPath(),
                o.rect(a * r, n, r, n),
                o.clip(),
                o.fillText(String.fromCharCode(a), a * r, 1.5 * n),
                o.restore();
            o.restore(), (o.font = d(i.fontWeight, i));
            for (var l = 0; l < 16; l++) {
              var h = (l + 2) * n;
              for (a = 0; a < 256; a++)
                o.save(),
                  o.beginPath(),
                  o.rect(a * r, h, r, n),
                  o.clip(),
                  (o.fillStyle = i.colors.ansi[l].css),
                  o.fillText(String.fromCharCode(a), a * r, h + n / 2),
                  o.restore();
            }
            for (o.font = d(i.fontWeightBold, i), l = 0; l < 16; l++)
              for (h = (l + 2 + 16) * n, a = 0; a < 256; a++)
                o.save(),
                  o.beginPath(),
                  o.rect(a * r, h, r, n),
                  o.clip(),
                  (o.fillStyle = i.colors.ansi[l].css),
                  o.fillText(String.fromCharCode(a), a * r, h + n / 2),
                  o.restore();
            if (
              (o.restore(),
              !("createImageBitmap" in e) || u.isFirefox || u.isSafari)
            )
              return s;
            var c = o.getImageData(0, 0, s.width, s.height);
            return _(c, i.colors.background), e.createImageBitmap(c);
          }),
            (i.clearColor = _);
        },
        { "../../common/Platform": 25, "./Types": 55 }
      ],
      50: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("../../common/Types");
          (i.generateConfig = function(e, t, i, r) {
            var n = {
              foreground: r.foreground,
              background: r.background,
              cursor: null,
              cursorAccent: null,
              selection: null,
              ansi: r.ansi.slice(0, 16)
            };
            return {
              type: i.options.experimentalCharAtlas,
              devicePixelRatio: window.devicePixelRatio,
              scaledCharWidth: e,
              scaledCharHeight: t,
              fontFamily: i.options.fontFamily,
              fontSize: i.options.fontSize,
              fontWeight: i.options.fontWeight,
              fontWeightBold: i.options.fontWeightBold,
              allowTransparency: i.options.allowTransparency,
              colors: n
            };
          }),
            (i.configEquals = function(e, t) {
              for (var i = 0; i < e.colors.ansi.length; i++)
                if (e.colors.ansi[i].rgba !== t.colors.ansi[i].rgba) return !1;
              return (
                e.type === t.type &&
                e.devicePixelRatio === t.devicePixelRatio &&
                e.fontFamily === t.fontFamily &&
                e.fontSize === t.fontSize &&
                e.fontWeight === t.fontWeight &&
                e.fontWeightBold === t.fontWeightBold &&
                e.allowTransparency === t.allowTransparency &&
                e.scaledCharWidth === t.scaledCharWidth &&
                e.scaledCharHeight === t.scaledCharHeight &&
                e.colors.foreground === t.colors.foreground &&
                e.colors.background === t.colors.background
              );
            }),
            (i.is256Color = function(e) {
              return e < r.DEFAULT_COLOR;
            });
        },
        { "../../common/Types": 27 }
      ],
      51: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var c = e("./Types"),
            s = e("./BaseCharAtlas"),
            o = e("../../ui/ColorManager"),
            u = e("./CharAtlasGenerator"),
            a = e("./LRUMap"),
            l = e("../../common/Platform"),
            h = { css: "rgba(0, 0, 0, 0)", rgba: 0 };
          function f(e) {
            return (
              (e.code << 21) |
              (e.bg << 12) |
              (e.fg << 3) |
              ((e.bold ? 0 : 4) + (e.dim ? 0 : 2) + (e.italic ? 0 : 1))
            );
          }
          i.getGlyphCacheKey = f;
          var _,
            d = ((_ = s.default),
            n(p, _),
            (p.prototype.dispose = function() {
              null !== this._bitmapCommitTimeout &&
                (window.clearTimeout(this._bitmapCommitTimeout),
                (this._bitmapCommitTimeout = null));
            }),
            (p.prototype.beginFrame = function() {
              this._drawToCacheCount = 0;
            }),
            (p.prototype.draw = function(e, t, i, r) {
              if (32 === t.code) return !0;
              if (!this._canCache(t)) return !1;
              var n = f(t),
                s = this._cacheMap.get(n);
              if (null != s) return this._drawFromCache(e, s, i, r), !0;
              if (this._drawToCacheCount < 100) {
                var o = void 0;
                o =
                  this._cacheMap.size < this._cacheMap.capacity
                    ? this._cacheMap.size
                    : this._cacheMap.peek().index;
                var a = this._drawToCache(t, o);
                return (
                  this._cacheMap.set(n, a), this._drawFromCache(e, a, i, r), !0
                );
              }
              return !1;
            }),
            (p.prototype._canCache = function(e) {
              return e.code < 256;
            }),
            (p.prototype._toCoordinateX = function(e) {
              return (e % this._width) * this._config.scaledCharWidth;
            }),
            (p.prototype._toCoordinateY = function(e) {
              return (
                Math.floor(e / this._width) * this._config.scaledCharHeight
              );
            }),
            (p.prototype._drawFromCache = function(e, t, i, r) {
              if (!t.isEmpty) {
                var n = this._toCoordinateX(t.index),
                  s = this._toCoordinateY(t.index);
                e.drawImage(
                  t.inBitmap ? this._bitmap : this._cacheCanvas,
                  n,
                  s,
                  this._config.scaledCharWidth,
                  this._config.scaledCharHeight,
                  i,
                  r,
                  this._config.scaledCharWidth,
                  this._config.scaledCharHeight
                );
              }
            }),
            (p.prototype._getColorFromAnsiIndex = function(e) {
              return e < this._config.colors.ansi.length
                ? this._config.colors.ansi[e]
                : o.DEFAULT_ANSI_COLORS[e];
            }),
            (p.prototype._getBackgroundColor = function(e) {
              return this._config.allowTransparency
                ? h
                : e.bg === c.INVERTED_DEFAULT_COLOR
                ? this._config.colors.foreground
                : e.bg < 256
                ? this._getColorFromAnsiIndex(e.bg)
                : this._config.colors.background;
            }),
            (p.prototype._getForegroundColor = function(e) {
              return e.fg === c.INVERTED_DEFAULT_COLOR
                ? this._config.colors.background
                : e.fg < 256
                ? this._getColorFromAnsiIndex(e.fg)
                : this._config.colors.foreground;
            }),
            (p.prototype._drawToCache = function(e, t) {
              this._drawToCacheCount++, this._tmpCtx.save();
              var i = this._getBackgroundColor(e);
              (this._tmpCtx.globalCompositeOperation = "copy"),
                (this._tmpCtx.fillStyle = i.css),
                this._tmpCtx.fillRect(
                  0,
                  0,
                  this._config.scaledCharWidth,
                  this._config.scaledCharHeight
                ),
                (this._tmpCtx.globalCompositeOperation = "source-over");
              var r = e.bold
                  ? this._config.fontWeightBold
                  : this._config.fontWeight,
                n = e.italic ? "italic" : "";
              (this._tmpCtx.font =
                n +
                " " +
                r +
                " " +
                this._config.fontSize * this._config.devicePixelRatio +
                "px " +
                this._config.fontFamily),
                (this._tmpCtx.textBaseline = "middle"),
                (this._tmpCtx.fillStyle = this._getForegroundColor(e).css),
                e.dim && (this._tmpCtx.globalAlpha = c.DIM_OPACITY),
                this._tmpCtx.fillText(
                  e.chars,
                  0,
                  this._config.scaledCharHeight / 2
                ),
                this._tmpCtx.restore();
              var s = this._tmpCtx.getImageData(
                  0,
                  0,
                  this._config.scaledCharWidth,
                  this._config.scaledCharHeight
                ),
                o = !1;
              this._config.allowTransparency || (o = u.clearColor(s, i));
              var a = this._toCoordinateX(t),
                l = this._toCoordinateY(t);
              this._cacheCtx.putImageData(s, a, l);
              var h = { index: t, isEmpty: o, inBitmap: !1 };
              return this._addGlyphToBitmap(h), h;
            }),
            (p.prototype._addGlyphToBitmap = function(e) {
              var t = this;
              "createImageBitmap" in window &&
                !l.isFirefox &&
                !l.isSafari &&
                (this._glyphsWaitingOnBitmap.push(e),
                null === this._bitmapCommitTimeout &&
                  (this._bitmapCommitTimeout = window.setTimeout(function() {
                    return t._generateBitmap();
                  }, 100)));
            }),
            (p.prototype._generateBitmap = function() {
              var i = this,
                r = this._glyphsWaitingOnBitmap;
              (this._glyphsWaitingOnBitmap = []),
                window.createImageBitmap(this._cacheCanvas).then(function(e) {
                  i._bitmap = e;
                  for (var t = 0; t < r.length; t++) r[t].inBitmap = !0;
                }),
                (this._bitmapCommitTimeout = null);
            }),
            p);
          function p(e, t) {
            var i = _.call(this) || this;
            (i._config = t),
              (i._drawToCacheCount = 0),
              (i._glyphsWaitingOnBitmap = []),
              (i._bitmapCommitTimeout = null),
              (i._bitmap = null),
              (i._cacheCanvas = e.createElement("canvas")),
              (i._cacheCanvas.width = 1024),
              (i._cacheCanvas.height = 1024),
              (i._cacheCtx = i._cacheCanvas.getContext("2d", { alpha: !0 }));
            var r = e.createElement("canvas");
            (r.width = i._config.scaledCharWidth),
              (r.height = i._config.scaledCharHeight),
              (i._tmpCtx = r.getContext("2d", {
                alpha: i._config.allowTransparency
              })),
              (i._width = Math.floor(1024 / i._config.scaledCharWidth)),
              (i._height = Math.floor(1024 / i._config.scaledCharHeight));
            var n = i._width * i._height;
            return (i._cacheMap = new a.default(n)), i._cacheMap.prealloc(n), i;
          }
          i.default = d;
        },
        {
          "../../common/Platform": 25,
          "../../ui/ColorManager": 58,
          "./BaseCharAtlas": 47,
          "./CharAtlasGenerator": 49,
          "./LRUMap": 52,
          "./Types": 55
        }
      ],
      52: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((n.prototype._unlinkNode = function(e) {
            var t = e.prev,
              i = e.next;
            e === this._head && (this._head = i),
              e === this._tail && (this._tail = t),
              null !== t && (t.next = i),
              null !== i && (i.prev = t);
          }),
          (n.prototype._appendNode = function(e) {
            var t = this._tail;
            null !== t && (t.next = e),
              (e.prev = t),
              (e.next = null),
              (this._tail = e),
              null === this._head && (this._head = e);
          }),
          (n.prototype.prealloc = function(e) {
            for (var t = this._nodePool, i = 0; i < e; i++)
              t.push({ prev: null, next: null, key: null, value: null });
          }),
          (n.prototype.get = function(e) {
            var t = this._map[e];
            return void 0 !== t
              ? (this._unlinkNode(t), this._appendNode(t), t.value)
              : null;
          }),
          (n.prototype.peekValue = function(e) {
            var t = this._map[e];
            return void 0 !== t ? t.value : null;
          }),
          (n.prototype.peek = function() {
            var e = this._head;
            return null === e ? null : e.value;
          }),
          (n.prototype.set = function(e, t) {
            var i = this._map[e];
            if (void 0 !== i)
              (i = this._map[e]), this._unlinkNode(i), (i.value = t);
            else if (this.size >= this.capacity)
              (i = this._head),
                this._unlinkNode(i),
                delete this._map[i.key],
                (i.key = e),
                (i.value = t),
                (this._map[e] = i);
            else {
              var r = this._nodePool;
              0 < r.length
                ? (((i = r.pop()).key = e), (i.value = t))
                : (i = { prev: null, next: null, key: e, value: t }),
                (this._map[e] = i),
                this.size++;
            }
            this._appendNode(i);
          }),
          n);
          function n(e) {
            (this.capacity = e),
              (this._map = {}),
              (this._head = null),
              (this._tail = null),
              (this._nodePool = []),
              (this.size = 0);
          }
          i.default = r;
        },
        {}
      ],
      53: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./BaseCharAtlas"),
            a = ((s = o.default),
            n(l, s),
            (l.prototype.draw = function(e, t, i, r) {
              return !1;
            }),
            l);
          function l(e, t) {
            return s.call(this) || this;
          }
          i.default = a;
        },
        { "./BaseCharAtlas": 47 }
      ],
      54: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            a = e("./Types"),
            o = e("./CharAtlasGenerator"),
            l = e("./BaseCharAtlas"),
            h = e("./CharAtlasUtils"),
            c = e("../../common/Types"),
            u = ((s = l.default),
            n(f, s),
            (f.prototype._doWarmUp = function() {
              var t = this,
                e = o.generateStaticCharAtlasTexture(
                  window,
                  this._canvasFactory,
                  this._config
                );
              e instanceof HTMLCanvasElement
                ? (this._texture = e)
                : e.then(function(e) {
                    t._texture = e;
                  });
            }),
            (f.prototype._isCached = function(e, t) {
              var i = e.code < 256,
                r = e.fg < 16,
                n = e.fg === c.DEFAULT_COLOR,
                s = e.bg === c.DEFAULT_COLOR;
              return i && (r || n) && s && !e.italic;
            }),
            (f.prototype.draw = function(e, t, i, r) {
              if (null === this._texture || void 0 === this._texture) return !1;
              var n = 0;
              if (
                (h.is256Color(t.fg)
                  ? (n = 2 + t.fg + (t.bold ? 16 : 0))
                  : t.fg === c.DEFAULT_COLOR && t.bold && (n = 1),
                !this._isCached(t, n))
              )
                return !1;
              e.save();
              var s = this._config.scaledCharWidth + a.CHAR_ATLAS_CELL_SPACING,
                o = this._config.scaledCharHeight + a.CHAR_ATLAS_CELL_SPACING;
              return (
                t.dim && (e.globalAlpha = a.DIM_OPACITY),
                e.drawImage(
                  this._texture,
                  t.code * s,
                  n * o,
                  s,
                  this._config.scaledCharHeight,
                  i,
                  r,
                  s,
                  this._config.scaledCharHeight
                ),
                e.restore(),
                !0
              );
            }),
            f);
          function f(e, t) {
            var r = s.call(this) || this;
            return (
              (r._document = e),
              (r._config = t),
              (r._canvasFactory = function(e, t) {
                var i = r._document.createElement("canvas");
                return (i.width = e), (i.height = t), i;
              }),
              r
            );
          }
          i.default = u;
        },
        {
          "../../common/Types": 27,
          "./BaseCharAtlas": 47,
          "./CharAtlasGenerator": 49,
          "./CharAtlasUtils": 50,
          "./Types": 55
        }
      ],
      55: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.INVERTED_DEFAULT_COLOR = 257),
            (i.DIM_OPACITY = 0.5),
            (i.CHAR_ATLAS_CELL_SPACING = 1);
        },
        {}
      ],
      56: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("./DomRendererRowFactory"),
            a = e("../atlas/Types"),
            l = e("../../common/Lifecycle"),
            h = "xterm-dom-renderer-owner-",
            c = "xterm-rows",
            u = "xterm-fg-",
            f = "xterm-bg-",
            _ = "xterm-focus",
            d = "xterm-selection",
            p = 1,
            m = ((s = l.Disposable),
            n(y, s),
            (y.prototype.dispose = function() {
              this._terminal.element.classList.remove(h + this._terminalClass),
                this._terminal.screenElement.removeChild(this._rowContainer),
                this._terminal.screenElement.removeChild(
                  this._selectionContainer
                ),
                this._terminal.screenElement.removeChild(
                  this._themeStyleElement
                ),
                this._terminal.screenElement.removeChild(
                  this._dimensionsStyleElement
                ),
                s.prototype.dispose.call(this);
            }),
            (y.prototype._updateDimensions = function() {
              var t = this;
              (this.dimensions.scaledCharWidth =
                this._terminal.charMeasure.width * window.devicePixelRatio),
                (this.dimensions.scaledCharHeight = Math.ceil(
                  this._terminal.charMeasure.height * window.devicePixelRatio
                )),
                (this.dimensions.scaledCellWidth =
                  this.dimensions.scaledCharWidth +
                  Math.round(this._terminal.options.letterSpacing)),
                (this.dimensions.scaledCellHeight = Math.floor(
                  this.dimensions.scaledCharHeight *
                    this._terminal.options.lineHeight
                )),
                (this.dimensions.scaledCharLeft = 0),
                (this.dimensions.scaledCharTop = 0),
                (this.dimensions.scaledCanvasWidth =
                  this.dimensions.scaledCellWidth * this._terminal.cols),
                (this.dimensions.scaledCanvasHeight =
                  this.dimensions.scaledCellHeight * this._terminal.rows),
                (this.dimensions.canvasWidth = Math.round(
                  this.dimensions.scaledCanvasWidth / window.devicePixelRatio
                )),
                (this.dimensions.canvasHeight = Math.round(
                  this.dimensions.scaledCanvasHeight / window.devicePixelRatio
                )),
                (this.dimensions.actualCellWidth =
                  this.dimensions.canvasWidth / this._terminal.cols),
                (this.dimensions.actualCellHeight =
                  this.dimensions.canvasHeight / this._terminal.rows),
                this._rowElements.forEach(function(e) {
                  (e.style.width = t.dimensions.canvasWidth + "px"),
                    (e.style.height = t.dimensions.actualCellHeight + "px"),
                    (e.style.lineHeight = t.dimensions.actualCellHeight + "px"),
                    (e.style.overflow = "hidden");
                }),
                this._dimensionsStyleElement ||
                  ((this._dimensionsStyleElement = document.createElement(
                    "style"
                  )),
                  this._terminal.screenElement.appendChild(
                    this._dimensionsStyleElement
                  ));
              var e =
                this._terminalSelector +
                " ." +
                c +
                " span { display: inline-block; height: 100%; vertical-align: top; width: " +
                this.dimensions.actualCellWidth +
                "px}";
              (this._dimensionsStyleElement.innerHTML = e),
                (this._selectionContainer.style.height = this._terminal._viewportElement.style.height),
                (this._terminal.screenElement.style.width =
                  this.dimensions.canvasWidth + "px"),
                (this._terminal.screenElement.style.height =
                  this.dimensions.canvasHeight + "px");
            }),
            (y.prototype.setColors = function(e) {
              (this._colors = e), this._injectCss();
            }),
            (y.prototype._injectCss = function() {
              var i = this;
              this._themeStyleElement ||
                ((this._themeStyleElement = document.createElement("style")),
                this._terminal.screenElement.appendChild(
                  this._themeStyleElement
                ));
              var r =
                this._terminalSelector +
                " ." +
                c +
                " { color: " +
                this._colors.foreground.css +
                "; background-color: " +
                this._colors.background.css +
                "; font-family: " +
                this._terminal.options.fontFamily +
                "; font-size: " +
                this._terminal.options.fontSize +
                "px;}";
              (r +=
                this._terminalSelector +
                " span:not(." +
                o.BOLD_CLASS +
                ") { font-weight: " +
                this._terminal.options.fontWeight +
                ";}" +
                this._terminalSelector +
                " span." +
                o.BOLD_CLASS +
                " { font-weight: " +
                this._terminal.options.fontWeightBold +
                ";}" +
                this._terminalSelector +
                " span." +
                o.ITALIC_CLASS +
                " { font-style: italic;}"),
                (r +=
                  "@keyframes blink { 0% { opacity: 1.0; } 50% { opacity: 0.0; } 100% { opacity: 1.0; }}"),
                (r +=
                  this._terminalSelector +
                  " ." +
                  c +
                  ":not(." +
                  _ +
                  ") ." +
                  o.CURSOR_CLASS +
                  " { outline: 1px solid " +
                  this._colors.cursor.css +
                  "; outline-offset: -1px;}" +
                  this._terminalSelector +
                  " ." +
                  c +
                  "." +
                  _ +
                  " ." +
                  o.CURSOR_CLASS +
                  "." +
                  o.CURSOR_BLINK_CLASS +
                  " { animation: blink 1s step-end infinite;}" +
                  this._terminalSelector +
                  " ." +
                  c +
                  "." +
                  _ +
                  " ." +
                  o.CURSOR_CLASS +
                  "." +
                  o.CURSOR_STYLE_BLOCK_CLASS +
                  " { background-color: " +
                  this._colors.cursor.css +
                  "; color: " +
                  this._colors.cursorAccent.css +
                  ";}" +
                  this._terminalSelector +
                  " ." +
                  c +
                  "." +
                  _ +
                  " ." +
                  o.CURSOR_CLASS +
                  "." +
                  o.CURSOR_STYLE_BAR_CLASS +
                  " { box-shadow: 1px 0 0 " +
                  this._colors.cursor.css +
                  " inset;}" +
                  this._terminalSelector +
                  " ." +
                  c +
                  "." +
                  _ +
                  " ." +
                  o.CURSOR_CLASS +
                  "." +
                  o.CURSOR_STYLE_UNDERLINE_CLASS +
                  " { box-shadow: 0 -1px 0 " +
                  this._colors.cursor.css +
                  " inset;}"),
                (r +=
                  this._terminalSelector +
                  " ." +
                  d +
                  " { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}" +
                  this._terminalSelector +
                  " ." +
                  d +
                  " div { position: absolute; background-color: " +
                  this._colors.selection.css +
                  ";}"),
                this._colors.ansi.forEach(function(e, t) {
                  r +=
                    i._terminalSelector +
                    " ." +
                    u +
                    t +
                    " { color: " +
                    e.css +
                    "; }" +
                    i._terminalSelector +
                    " ." +
                    f +
                    t +
                    " { background-color: " +
                    e.css +
                    "; }";
                }),
                (r +=
                  this._terminalSelector +
                  " ." +
                  u +
                  a.INVERTED_DEFAULT_COLOR +
                  " { color: " +
                  this._colors.background.css +
                  "; }" +
                  this._terminalSelector +
                  " ." +
                  f +
                  a.INVERTED_DEFAULT_COLOR +
                  " { background-color: " +
                  this._colors.foreground.css +
                  "; }"),
                (this._themeStyleElement.innerHTML = r);
            }),
            (y.prototype.onDevicePixelRatioChange = function() {
              this._updateDimensions();
            }),
            (y.prototype._refreshRowElements = function(e, t) {
              for (var i = this._rowElements.length; i <= t; i++) {
                var r = document.createElement("div");
                this._rowContainer.appendChild(r), this._rowElements.push(r);
              }
              for (; this._rowElements.length > t; )
                this._rowContainer.removeChild(this._rowElements.pop());
            }),
            (y.prototype.onResize = function(e, t) {
              this._refreshRowElements(e, t), this._updateDimensions();
            }),
            (y.prototype.onCharSizeChanged = function() {
              this._updateDimensions();
            }),
            (y.prototype.onBlur = function() {
              this._rowContainer.classList.remove(_);
            }),
            (y.prototype.onFocus = function() {
              this._rowContainer.classList.add(_);
            }),
            (y.prototype.onSelectionChanged = function(e, t, i) {
              for (; this._selectionContainer.children.length; )
                this._selectionContainer.removeChild(
                  this._selectionContainer.children[0]
                );
              if (e && t) {
                var r = e[1] - this._terminal.buffer.ydisp,
                  n = t[1] - this._terminal.buffer.ydisp,
                  s = Math.max(r, 0),
                  o = Math.min(n, this._terminal.rows - 1);
                if (!(s >= this._terminal.rows || o < 0)) {
                  var a = document.createDocumentFragment();
                  if (i)
                    a.appendChild(
                      this._createSelectionElement(s, e[0], t[0], o - s + 1)
                    );
                  else {
                    var l = r === s ? e[0] : 0,
                      h = s === o ? t[0] : this._terminal.cols;
                    a.appendChild(this._createSelectionElement(s, l, h));
                    var c = o - s - 1;
                    if (
                      (a.appendChild(
                        this._createSelectionElement(
                          s + 1,
                          0,
                          this._terminal.cols,
                          c
                        )
                      ),
                      s !== o)
                    ) {
                      var u = n === o ? t[0] : this._terminal.cols;
                      a.appendChild(this._createSelectionElement(o, 0, u));
                    }
                  }
                  this._selectionContainer.appendChild(a);
                }
              }
            }),
            (y.prototype._createSelectionElement = function(e, t, i, r) {
              void 0 === r && (r = 1);
              var n = document.createElement("div");
              return (
                (n.style.height = r * this.dimensions.actualCellHeight + "px"),
                (n.style.top = e * this.dimensions.actualCellHeight + "px"),
                (n.style.left = t * this.dimensions.actualCellWidth + "px"),
                (n.style.width =
                  this.dimensions.actualCellWidth * (i - t) + "px"),
                n
              );
            }),
            (y.prototype.onCursorMove = function() {}),
            (y.prototype.onOptionsChanged = function() {
              this._updateDimensions(),
                this._injectCss(),
                this._terminal.refresh(0, this._terminal.rows - 1);
            }),
            (y.prototype.clear = function() {
              this._rowElements.forEach(function(e) {
                return (e.innerHTML = "");
              });
            }),
            (y.prototype.renderRows = function(e, t) {
              for (
                var i = this._terminal,
                  r = i.buffer.ybase + i.buffer.y,
                  n = this._terminal.buffer.x,
                  s = this._terminal.options.cursorBlink,
                  o = e;
                o <= t;
                o++
              ) {
                var a = this._rowElements[o];
                a.innerHTML = "";
                var l = o + i.buffer.ydisp,
                  h = i.buffer.lines.get(l),
                  c = i.options.cursorStyle;
                a.appendChild(
                  this._rowFactory.createRow(
                    h,
                    l === r,
                    c,
                    n,
                    s,
                    this.dimensions.actualCellWidth,
                    i.cols
                  )
                );
              }
            }),
            Object.defineProperty(y.prototype, "_terminalSelector", {
              get: function() {
                return "." + h + this._terminalClass;
              },
              enumerable: !0,
              configurable: !0
            }),
            (y.prototype.registerCharacterJoiner = function(e) {
              return -1;
            }),
            (y.prototype.deregisterCharacterJoiner = function(e) {
              return !1;
            }),
            (y.prototype._onLinkHover = function(e) {
              this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !0);
            }),
            (y.prototype._onLinkLeave = function(e) {
              this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !1);
            }),
            (y.prototype._setCellUnderline = function(e, t, i, r, n, s) {
              for (; e !== t || i !== r; ) {
                var o = this._rowElements[i];
                if (!o) return;
                var a = o.children[e];
                a && (a.style.textDecoration = s ? "underline" : "none"),
                  ++e >= n && ((e = 0), i++);
              }
            }),
            y);
          function y(e, t) {
            var i = s.call(this) || this;
            return (
              (i._terminal = e),
              (i._colors = t),
              (i._terminalClass = p++),
              (i._rowElements = []),
              (i._rowContainer = document.createElement("div")),
              i._rowContainer.classList.add(c),
              (i._rowContainer.style.lineHeight = "normal"),
              i._rowContainer.setAttribute("aria-hidden", "true"),
              i._refreshRowElements(i._terminal.cols, i._terminal.rows),
              (i._selectionContainer = document.createElement("div")),
              i._selectionContainer.classList.add(d),
              i._selectionContainer.setAttribute("aria-hidden", "true"),
              (i.dimensions = {
                scaledCharWidth: null,
                scaledCharHeight: null,
                scaledCellWidth: null,
                scaledCellHeight: null,
                scaledCharLeft: null,
                scaledCharTop: null,
                scaledCanvasWidth: null,
                scaledCanvasHeight: null,
                canvasWidth: null,
                canvasHeight: null,
                actualCellWidth: null,
                actualCellHeight: null
              }),
              i._updateDimensions(),
              i._injectCss(),
              (i._rowFactory = new o.DomRendererRowFactory(
                e.options,
                document
              )),
              i._terminal.element.classList.add(h + i._terminalClass),
              i._terminal.screenElement.appendChild(i._rowContainer),
              i._terminal.screenElement.appendChild(i._selectionContainer),
              i._terminal.linkifier.onLinkHover(function(e) {
                return i._onLinkHover(e);
              }),
              i._terminal.linkifier.onLinkLeave(function(e) {
                return i._onLinkLeave(e);
              }),
              i
            );
          }
          i.DomRenderer = m;
        },
        {
          "../../common/Lifecycle": 24,
          "../atlas/Types": 55,
          "./DomRendererRowFactory": 57
        }
      ],
      57: [
        function(e, t, p) {
          "use strict";
          Object.defineProperty(p, "__esModule", { value: !0 });
          var m = e("../atlas/Types"),
            y = e("../../core/buffer/BufferLine");
          (p.BOLD_CLASS = "xterm-bold"),
            (p.DIM_CLASS = "xterm-dim"),
            (p.ITALIC_CLASS = "xterm-italic"),
            (p.UNDERLINE_CLASS = "xterm-underline"),
            (p.CURSOR_CLASS = "xterm-cursor"),
            (p.CURSOR_BLINK_CLASS = "xterm-cursor-blink"),
            (p.CURSOR_STYLE_BLOCK_CLASS = "xterm-cursor-block"),
            (p.CURSOR_STYLE_BAR_CLASS = "xterm-cursor-bar"),
            (p.CURSOR_STYLE_UNDERLINE_CLASS = "xterm-cursor-underline");
          var i = ((r.prototype.createRow = function(e, t, i, r, n, s, o) {
            for (
              var a = this._document.createDocumentFragment(),
                l = 0,
                h = Math.min(e.length, o) - 1;
              0 <= h;
              h--
            )
              if (
                e.loadCell(h, this._workCell).getCode() !== y.NULL_CELL_CODE ||
                (t && h === r)
              ) {
                l = h + 1;
                break;
              }
            for (h = 0; h < l; h++) {
              e.loadCell(h, this._workCell);
              var c = this._workCell.getWidth();
              if (0 !== c) {
                var u = this._document.createElement("span");
                if ((1 < c && (u.style.width = s * c + "px"), t && h === r))
                  switch (
                    (u.classList.add(p.CURSOR_CLASS),
                    n && u.classList.add(p.CURSOR_BLINK_CLASS),
                    i)
                  ) {
                    case "bar":
                      u.classList.add(p.CURSOR_STYLE_BAR_CLASS);
                      break;
                    case "underline":
                      u.classList.add(p.CURSOR_STYLE_UNDERLINE_CLASS);
                      break;
                    default:
                      u.classList.add(p.CURSOR_STYLE_BLOCK_CLASS);
                  }
                this._workCell.isBold() &&
                  this._terminalOptions.enableBold &&
                  u.classList.add(p.BOLD_CLASS),
                  this._workCell.isItalic() && u.classList.add(p.ITALIC_CLASS),
                  this._workCell.isDim() && u.classList.add(p.DIM_CLASS),
                  this._workCell.isUnderline() &&
                    u.classList.add(p.UNDERLINE_CLASS),
                  (u.textContent =
                    this._workCell.getChars() || y.WHITESPACE_CELL_CHAR);
                var f = this._workCell.isInverse();
                if (this._workCell.isFgRGB()) {
                  var _ = u.getAttribute("style") || "";
                  (_ +=
                    (f ? "background-" : "") +
                    "color:rgb(" +
                    y.AttributeData.toColorRGB(
                      this._workCell.getFgColor()
                    ).join(",") +
                    ");"),
                    u.setAttribute("style", _);
                } else if (this._workCell.isFgPalette()) {
                  var d = this._workCell.getFgColor();
                  this._workCell.isBold() &&
                    d < 8 &&
                    !f &&
                    this._terminalOptions.enableBold &&
                    this._terminalOptions.drawBoldTextInBrightColors &&
                    (d += 8),
                    u.classList.add("xterm-" + (f ? "b" : "f") + "g-" + d);
                } else
                  f && u.classList.add("xterm-bg-" + m.INVERTED_DEFAULT_COLOR);
                this._workCell.isBgRGB()
                  ? ((_ = u.getAttribute("style") || ""),
                    (_ +=
                      (f ? "" : "background-") +
                      "color:rgb(" +
                      y.AttributeData.toColorRGB(
                        this._workCell.getBgColor()
                      ).join(",") +
                      ");"),
                    u.setAttribute("style", _))
                  : this._workCell.isBgPalette()
                  ? u.classList.add(
                      "xterm-" +
                        (f ? "f" : "b") +
                        "g-" +
                        this._workCell.getBgColor()
                    )
                  : f &&
                    u.classList.add("xterm-fg-" + m.INVERTED_DEFAULT_COLOR),
                  a.appendChild(u);
              }
            }
            return a;
          }),
          r);
          function r(e, t) {
            (this._terminalOptions = e),
              (this._document = t),
              (this._workCell = new y.CellData());
          }
          p.DomRendererRowFactory = i;
        },
        { "../../core/buffer/BufferLine": 29, "../atlas/Types": 55 }
      ],
      58: [
        function(e, t, n) {
          "use strict";
          Object.defineProperty(n, "__esModule", { value: !0 });
          var s = c("#ffffff"),
            o = c("#000000"),
            a = c("#ffffff"),
            l = c("#000000"),
            h = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967159 };
          function c(e) {
            return { css: e, rgba: (parseInt(e.slice(1), 16) << 8) | 255 };
          }
          function u(e) {
            var t = e.toString(16);
            return t.length < 2 ? "0" + t : t;
          }
          n.DEFAULT_ANSI_COLORS = (function() {
            for (
              var e = [
                  c("#2e3436"),
                  c("#cc0000"),
                  c("#4e9a06"),
                  c("#c4a000"),
                  c("#3465a4"),
                  c("#75507b"),
                  c("#06989a"),
                  c("#d3d7cf"),
                  c("#555753"),
                  c("#ef2929"),
                  c("#8ae234"),
                  c("#fce94f"),
                  c("#729fcf"),
                  c("#ad7fa8"),
                  c("#34e2e2"),
                  c("#eeeeec")
                ],
                t = [0, 95, 135, 175, 215, 255],
                i = 0;
              i < 216;
              i++
            ) {
              var r = t[(i / 36) % 6 | 0],
                n = t[(i / 6) % 6 | 0],
                s = t[i % 6];
              e.push({
                css: "#" + u(r) + u(n) + u(s),
                rgba: ((r << 24) | (n << 16) | (s << 8) | 255) >>> 0
              });
            }
            for (i = 0; i < 24; i++) {
              var o = 8 + 10 * i,
                a = u(o);
              e.push({
                css: "#" + a + a + a,
                rgba: ((o << 24) | (o << 16) | (o << 8) | 255) >>> 0
              });
            }
            return e;
          })();
          var i = ((r.prototype.setTheme = function(e) {
            void 0 === e && (e = {}),
              (this.colors.foreground = this._parseColor(e.foreground, s)),
              (this.colors.background = this._parseColor(e.background, o)),
              (this.colors.cursor = this._parseColor(e.cursor, a, !0)),
              (this.colors.cursorAccent = this._parseColor(
                e.cursorAccent,
                l,
                !0
              )),
              (this.colors.selection = this._parseColor(e.selection, h, !0)),
              (this.colors.ansi[0] = this._parseColor(
                e.black,
                n.DEFAULT_ANSI_COLORS[0]
              )),
              (this.colors.ansi[1] = this._parseColor(
                e.red,
                n.DEFAULT_ANSI_COLORS[1]
              )),
              (this.colors.ansi[2] = this._parseColor(
                e.green,
                n.DEFAULT_ANSI_COLORS[2]
              )),
              (this.colors.ansi[3] = this._parseColor(
                e.yellow,
                n.DEFAULT_ANSI_COLORS[3]
              )),
              (this.colors.ansi[4] = this._parseColor(
                e.blue,
                n.DEFAULT_ANSI_COLORS[4]
              )),
              (this.colors.ansi[5] = this._parseColor(
                e.magenta,
                n.DEFAULT_ANSI_COLORS[5]
              )),
              (this.colors.ansi[6] = this._parseColor(
                e.cyan,
                n.DEFAULT_ANSI_COLORS[6]
              )),
              (this.colors.ansi[7] = this._parseColor(
                e.white,
                n.DEFAULT_ANSI_COLORS[7]
              )),
              (this.colors.ansi[8] = this._parseColor(
                e.brightBlack,
                n.DEFAULT_ANSI_COLORS[8]
              )),
              (this.colors.ansi[9] = this._parseColor(
                e.brightRed,
                n.DEFAULT_ANSI_COLORS[9]
              )),
              (this.colors.ansi[10] = this._parseColor(
                e.brightGreen,
                n.DEFAULT_ANSI_COLORS[10]
              )),
              (this.colors.ansi[11] = this._parseColor(
                e.brightYellow,
                n.DEFAULT_ANSI_COLORS[11]
              )),
              (this.colors.ansi[12] = this._parseColor(
                e.brightBlue,
                n.DEFAULT_ANSI_COLORS[12]
              )),
              (this.colors.ansi[13] = this._parseColor(
                e.brightMagenta,
                n.DEFAULT_ANSI_COLORS[13]
              )),
              (this.colors.ansi[14] = this._parseColor(
                e.brightCyan,
                n.DEFAULT_ANSI_COLORS[14]
              )),
              (this.colors.ansi[15] = this._parseColor(
                e.brightWhite,
                n.DEFAULT_ANSI_COLORS[15]
              ));
          }),
          (r.prototype._parseColor = function(e, t, i) {
            if ((void 0 === i && (i = this.allowTransparency), void 0 === e))
              return t;
            if (
              ((this._ctx.fillStyle = this._litmusColor),
              (this._ctx.fillStyle = e),
              "string" != typeof this._ctx.fillStyle)
            )
              return (
                console.warn(
                  "Color: " + e + " is invalid using fallback " + t.css
                ),
                t
              );
            this._ctx.fillRect(0, 0, 1, 1);
            var r = this._ctx.getImageData(0, 0, 1, 1).data;
            return i || 255 === r[3]
              ? {
                  css: e,
                  rgba: ((r[0] << 24) | (r[1] << 16) | (r[2] << 8) | r[3]) >>> 0
                }
              : (console.warn(
                  "Color: " +
                    e +
                    " is using transparency, but allowTransparency is false. Using fallback " +
                    t.css +
                    "."
                ),
                t);
          }),
          r);
          function r(e, t) {
            this.allowTransparency = t;
            var i = e.createElement("canvas");
            (i.width = 1), (i.height = 1);
            var r = i.getContext("2d");
            if (!r) throw new Error("Could not get rendering context");
            (this._ctx = r),
              (this._ctx.globalCompositeOperation = "copy"),
              (this._litmusColor = this._ctx.createLinearGradient(0, 0, 1, 1)),
              (this.colors = {
                foreground: s,
                background: o,
                cursor: a,
                cursorAccent: l,
                selection: h,
                ansi: n.DEFAULT_ANSI_COLORS.slice()
              });
          }
          n.ColorManager = i;
        },
        {}
      ],
      59: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 }),
            (i.addDisposableDomListener = function(e, t, i, r) {
              return (
                e.addEventListener(t, i, r),
                {
                  dispose: function() {
                    i && e.removeEventListener(t, i, r);
                  }
                }
              );
            });
        },
        {}
      ],
      60: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = ((n.prototype.dispose = function() {
            this._animationFrame &&
              (window.cancelAnimationFrame(this._animationFrame),
              (this._animationFrame = void 0));
          }),
          (n.prototype.refresh = function(e, t, i) {
            var r = this;
            (this._rowCount = i),
              (e = void 0 !== e ? e : 0),
              (t = void 0 !== t ? t : this._rowCount - 1),
              (this._rowStart =
                void 0 !== this._rowStart ? Math.min(this._rowStart, e) : e),
              (this._rowEnd =
                void 0 !== this._rowEnd ? Math.max(this._rowEnd, t) : t),
              this._animationFrame ||
                (this._animationFrame = window.requestAnimationFrame(
                  function() {
                    return r._innerRefresh();
                  }
                ));
          }),
          (n.prototype._innerRefresh = function() {
            void 0 !== this._rowStart &&
              void 0 !== this._rowEnd &&
              void 0 !== this._rowCount &&
              ((this._rowStart = Math.max(this._rowStart, 0)),
              (this._rowEnd = Math.min(this._rowEnd, this._rowCount - 1)),
              this._renderCallback(this._rowStart, this._rowEnd),
              (this._rowStart = void 0),
              (this._rowEnd = void 0),
              (this._animationFrame = void 0));
          }),
          n);
          function n(e) {
            this._renderCallback = e;
          }
          i.RenderDebouncer = r;
        },
        {}
      ],
      61: [
        function(e, t, i) {
          "use strict";
          var r,
            n =
              (this && this.__extends) ||
              ((r = function(e, t) {
                return (r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(e, t) {
                      e.__proto__ = t;
                    }) ||
                  function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  })(e, t);
              }),
              function(e, t) {
                function i() {
                  this.constructor = e;
                }
                r(e, t),
                  (e.prototype =
                    null === t
                      ? Object.create(t)
                      : ((i.prototype = t.prototype), new i()));
              });
          Object.defineProperty(i, "__esModule", { value: !0 });
          var s,
            o = e("../common/Lifecycle"),
            a = ((s = o.Disposable),
            n(l, s),
            (l.prototype.setListener = function(e) {
              var t = this;
              this._listener && this.clearListener(),
                (this._listener = e),
                (this._outerListener = function() {
                  t._listener &&
                    (t._listener(
                      window.devicePixelRatio,
                      t._currentDevicePixelRatio
                    ),
                    t._updateDpr());
                }),
                this._updateDpr();
            }),
            (l.prototype.dispose = function() {
              s.prototype.dispose.call(this), this.clearListener();
            }),
            (l.prototype._updateDpr = function() {
              this._resolutionMediaMatchList &&
                this._outerListener &&
                (this._resolutionMediaMatchList.removeListener(
                  this._outerListener
                ),
                (this._currentDevicePixelRatio = window.devicePixelRatio),
                (this._resolutionMediaMatchList = window.matchMedia(
                  "screen and (resolution: " + window.devicePixelRatio + "dppx)"
                )),
                this._resolutionMediaMatchList.addListener(
                  this._outerListener
                ));
            }),
            (l.prototype.clearListener = function() {
              this._resolutionMediaMatchList &&
                this._listener &&
                this._outerListener &&
                (this._resolutionMediaMatchList.removeListener(
                  this._outerListener
                ),
                (this._resolutionMediaMatchList = void 0),
                (this._listener = void 0),
                (this._outerListener = void 0));
            }),
            l);
          function l() {
            var e = (null !== s && s.apply(this, arguments)) || this;
            return (e._currentDevicePixelRatio = window.devicePixelRatio), e;
          }
          i.ScreenDprMonitor = a;
        },
        { "../common/Lifecycle": 24 }
      ],
      62: [
        function(e, t, i) {
          "use strict";
          Object.defineProperty(i, "__esModule", { value: !0 });
          var r = e("./public/Terminal");
          t.exports = r.Terminal;
        },
        { "./public/Terminal": 37 }
      ]
    },
    {},
    [62]
  )(62);
});

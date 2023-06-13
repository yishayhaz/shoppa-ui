function P(t) {
  return t.split("-")[1];
}
function st(t) {
  return t === "y" ? "height" : "width";
}
function F(t) {
  return t.split("-")[0];
}
function X(t) {
  return ["top", "bottom"].includes(F(t)) ? "x" : "y";
}
function Q(t, e, o) {
  let { reference: n, floating: i } = t;
  const r = n.x + n.width / 2 - i.width / 2,
    c = n.y + n.height / 2 - i.height / 2,
    l = X(e),
    a = st(l),
    s = n[a] / 2 - i[a] / 2,
    u = l === "x";
  let f;
  switch (F(e)) {
    case "top":
      f = { x: r, y: n.y - i.height };
      break;
    case "bottom":
      f = { x: r, y: n.y + n.height };
      break;
    case "right":
      f = { x: n.x + n.width, y: c };
      break;
    case "left":
      f = { x: n.x - i.width, y: c };
      break;
    default:
      f = { x: n.x, y: n.y };
  }
  switch (P(e)) {
    case "start":
      f[l] -= s * (o && u ? -1 : 1);
      break;
    case "end":
      f[l] += s * (o && u ? -1 : 1);
  }
  return f;
}
const xt = async (t, e, o) => {
  const {
      placement: n = "bottom",
      strategy: i = "absolute",
      middleware: r = [],
      platform: c,
    } = o,
    l = r.filter(Boolean),
    a = await (c.isRTL == null ? void 0 : c.isRTL(e));
  let s = await c.getElementRects({ reference: t, floating: e, strategy: i }),
    { x: u, y: f } = Q(s, n, a),
    m = n,
    d = {},
    y = 0;
  for (let h = 0; h < l.length; h++) {
    const { name: p, fn: g } = l[h],
      {
        x,
        y: v,
        data: A,
        reset: $,
      } = await g({
        x: u,
        y: f,
        initialPlacement: n,
        placement: m,
        strategy: i,
        middlewareData: d,
        rects: s,
        platform: c,
        elements: { reference: t, floating: e },
      });
    (u = x ?? u),
      (f = v ?? f),
      (d = { ...d, [p]: { ...d[p], ...A } }),
      $ &&
        y <= 50 &&
        (y++,
        typeof $ == "object" &&
          ($.placement && (m = $.placement),
          $.rects &&
            (s =
              $.rects === !0
                ? await c.getElementRects({
                    reference: t,
                    floating: e,
                    strategy: i,
                  })
                : $.rects),
          ({ x: u, y: f } = Q(s, m, a))),
        (h = -1));
  }
  return { x: u, y: f, placement: m, strategy: i, middlewareData: d };
};
function Y(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function wt(t) {
  return typeof t != "number"
    ? (function (e) {
        return { top: 0, right: 0, bottom: 0, left: 0, ...e };
      })(t)
    : { top: t, right: t, bottom: t, left: t };
}
function z(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height,
  };
}
async function at(t, e) {
  var o;
  e === void 0 && (e = {});
  const { x: n, y: i, platform: r, rects: c, elements: l, strategy: a } = t,
    {
      boundary: s = "clippingAncestors",
      rootBoundary: u = "viewport",
      elementContext: f = "floating",
      altBoundary: m = !1,
      padding: d = 0,
    } = Y(e, t),
    y = wt(d),
    h = l[m ? (f === "floating" ? "reference" : "floating") : f],
    p = z(
      await r.getClippingRect({
        element:
          (o = await (r.isElement == null ? void 0 : r.isElement(h))) == null ||
          o
            ? h
            : h.contextElement ||
              (await (r.getDocumentElement == null
                ? void 0
                : r.getDocumentElement(l.floating))),
        boundary: s,
        rootBoundary: u,
        strategy: a,
      })
    ),
    g = f === "floating" ? { ...c.floating, x: n, y: i } : c.reference,
    x = await (r.getOffsetParent == null
      ? void 0
      : r.getOffsetParent(l.floating)),
    v = ((await (r.isElement == null ? void 0 : r.isElement(x))) &&
      (await (r.getScale == null ? void 0 : r.getScale(x)))) || { x: 1, y: 1 },
    A = z(
      r.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
            rect: g,
            offsetParent: x,
            strategy: a,
          })
        : g
    );
  return {
    top: (p.top - A.top + y.top) / v.y,
    bottom: (A.bottom - p.bottom + y.bottom) / v.y,
    left: (p.left - A.left + y.left) / v.x,
    right: (A.right - p.right + y.right) / v.x,
  };
}
const vt = Math.min,
  bt = Math.max;
function Z(t, e, o) {
  return bt(t, vt(e, o));
}
const Rt = ["top", "right", "bottom", "left"],
  tt = Rt.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []),
  Lt = { left: "right", right: "left", bottom: "top", top: "bottom" };
function et(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Lt[e]);
}
function Et(t, e, o) {
  o === void 0 && (o = !1);
  const n = P(t),
    i = X(t),
    r = st(i);
  let c =
    i === "x"
      ? n === (o ? "end" : "start")
        ? "right"
        : "left"
      : n === "start"
      ? "bottom"
      : "top";
  return (
    e.reference[r] > e.floating[r] && (c = et(c)), { main: c, cross: et(c) }
  );
}
const Tt = { start: "end", end: "start" };
function $t(t) {
  return t.replace(/start|end/g, (e) => Tt[e]);
}
const Dt = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: "autoPlacement",
        options: t,
        async fn(e) {
          var o, n, i;
          const {
              rects: r,
              middlewareData: c,
              placement: l,
              platform: a,
              elements: s,
            } = e,
            {
              crossAxis: u = !1,
              alignment: f,
              allowedPlacements: m = tt,
              autoAlignment: d = !0,
              ...y
            } = Y(t, e),
            h =
              f !== void 0 || m === tt
                ? (function (w, D, W) {
                    return (
                      w
                        ? [
                            ...W.filter((R) => P(R) === w),
                            ...W.filter((R) => P(R) !== w),
                          ]
                        : W.filter((R) => F(R) === R)
                    ).filter((R) => !w || P(R) === w || (!!D && $t(R) !== R));
                  })(f || null, d, m)
                : m,
            p = await at(e, y),
            g = ((o = c.autoPlacement) == null ? void 0 : o.index) || 0,
            x = h[g];
          if (x == null) return {};
          const { main: v, cross: A } = Et(
            x,
            r,
            await (a.isRTL == null ? void 0 : a.isRTL(s.floating))
          );
          if (l !== x) return { reset: { placement: h[0] } };
          const $ = [p[F(x)], p[v], p[A]],
            q = [
              ...(((n = c.autoPlacement) == null ? void 0 : n.overflows) || []),
              { placement: x, overflows: $ },
            ],
            I = h[g + 1];
          if (I)
            return {
              data: { index: g + 1, overflows: q },
              reset: { placement: I },
            };
          const J = q
              .map((w) => {
                const D = P(w.placement);
                return [
                  w.placement,
                  D && u
                    ? w.overflows.slice(0, 2).reduce((W, R) => W + R, 0)
                    : w.overflows[0],
                  w.overflows,
                ];
              })
              .sort((w, D) => w[1] - D[1]),
            K =
              ((i = J.filter((w) =>
                w[2].slice(0, P(w[0]) ? 2 : 3).every((D) => D <= 0)
              )[0]) == null
                ? void 0
                : i[0]) || J[0][0];
          return K !== l
            ? { data: { index: g + 1, overflows: q }, reset: { placement: K } }
            : {};
        },
      }
    );
  },
  kt = function (t) {
    return (
      t === void 0 && (t = 0),
      {
        name: "offset",
        options: t,
        async fn(e) {
          const { x: o, y: n } = e,
            i = await (async function (r, c) {
              const { placement: l, platform: a, elements: s } = r,
                u = await (a.isRTL == null ? void 0 : a.isRTL(s.floating)),
                f = F(l),
                m = P(l),
                d = X(l) === "x",
                y = ["left", "top"].includes(f) ? -1 : 1,
                h = u && d ? -1 : 1,
                p = Y(c, r);
              let {
                mainAxis: g,
                crossAxis: x,
                alignmentAxis: v,
              } = typeof p == "number"
                ? { mainAxis: p, crossAxis: 0, alignmentAxis: null }
                : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...p };
              return (
                m && typeof v == "number" && (x = m === "end" ? -1 * v : v),
                d ? { x: x * h, y: g * y } : { x: g * y, y: x * h }
              );
            })(e, t);
          return { x: o + i.x, y: n + i.y, data: i };
        },
      }
    );
  };
function At(t) {
  return t === "x" ? "y" : "x";
}
const Ot = function (t) {
  return (
    t === void 0 && (t = {}),
    {
      name: "shift",
      options: t,
      async fn(e) {
        const { x: o, y: n, placement: i } = e,
          {
            mainAxis: r = !0,
            crossAxis: c = !1,
            limiter: l = {
              fn: (p) => {
                let { x: g, y: x } = p;
                return { x: g, y: x };
              },
            },
            ...a
          } = Y(t, e),
          s = { x: o, y: n },
          u = await at(e, a),
          f = X(F(i)),
          m = At(f);
        let d = s[f],
          y = s[m];
        if (r) {
          const p = f === "y" ? "bottom" : "right";
          d = Z(d + u[f === "y" ? "top" : "left"], d, d - u[p]);
        }
        if (c) {
          const p = m === "y" ? "bottom" : "right";
          y = Z(y + u[m === "y" ? "top" : "left"], y, y - u[p]);
        }
        const h = l.fn({ ...e, [f]: d, [m]: y });
        return { ...h, data: { x: h.x - o, y: h.y - n } };
      },
    }
  );
};
function L(t) {
  var e;
  return ((e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function E(t) {
  return L(t).getComputedStyle(t);
}
function ft(t) {
  return t instanceof L(t).Node;
}
function C(t) {
  return ft(t) ? (t.nodeName || "").toLowerCase() : "";
}
function T(t) {
  return t instanceof L(t).HTMLElement;
}
function b(t) {
  return t instanceof L(t).Element;
}
function nt(t) {
  return typeof ShadowRoot > "u"
    ? !1
    : t instanceof L(t).ShadowRoot || t instanceof ShadowRoot;
}
function M(t) {
  const { overflow: e, overflowX: o, overflowY: n, display: i } = E(t);
  return (
    /auto|scroll|overlay|hidden|clip/.test(e + n + o) &&
    !["inline", "contents"].includes(i)
  );
}
function Pt(t) {
  return ["table", "td", "th"].includes(C(t));
}
function U(t) {
  const e = G(),
    o = E(t);
  return (
    o.transform !== "none" ||
    o.perspective !== "none" ||
    (!e && !!o.backdropFilter && o.backdropFilter !== "none") ||
    (!e && !!o.filter && o.filter !== "none") ||
    ["transform", "perspective", "filter"].some((n) =>
      (o.willChange || "").includes(n)
    ) ||
    ["paint", "layout", "strict", "content"].some((n) =>
      (o.contain || "").includes(n)
    )
  );
}
function G() {
  return (
    !(typeof CSS > "u" || !CSS.supports) &&
    CSS.supports("-webkit-backdrop-filter", "none")
  );
}
function _(t) {
  return ["html", "body", "#document"].includes(C(t));
}
const ot = Math.min,
  B = Math.max,
  N = Math.round;
function ut(t) {
  const e = E(t);
  let o = parseFloat(e.width) || 0,
    n = parseFloat(e.height) || 0;
  const i = T(t),
    r = i ? t.offsetWidth : o,
    c = i ? t.offsetHeight : n,
    l = N(o) !== r || N(n) !== c;
  return l && ((o = r), (n = c)), { width: o, height: n, fallback: l };
}
function dt(t) {
  return b(t) ? t : t.contextElement;
}
const mt = { x: 1, y: 1 };
function O(t) {
  const e = dt(t);
  if (!T(e)) return mt;
  const o = e.getBoundingClientRect(),
    { width: n, height: i, fallback: r } = ut(e);
  let c = (r ? N(o.width) : o.width) / n,
    l = (r ? N(o.height) : o.height) / i;
  return (
    (c && Number.isFinite(c)) || (c = 1),
    (l && Number.isFinite(l)) || (l = 1),
    { x: c, y: l }
  );
}
const it = { x: 0, y: 0 };
function ht(t, e, o) {
  var n, i;
  if ((e === void 0 && (e = !0), !G())) return it;
  const r = t ? L(t) : window;
  return !o || (e && o !== r)
    ? it
    : {
        x: ((n = r.visualViewport) == null ? void 0 : n.offsetLeft) || 0,
        y: ((i = r.visualViewport) == null ? void 0 : i.offsetTop) || 0,
      };
}
function k(t, e, o, n) {
  e === void 0 && (e = !1), o === void 0 && (o = !1);
  const i = t.getBoundingClientRect(),
    r = dt(t);
  let c = mt;
  e && (n ? b(n) && (c = O(n)) : (c = O(t)));
  const l = ht(r, o, n);
  let a = (i.left + l.x) / c.x,
    s = (i.top + l.y) / c.y,
    u = i.width / c.x,
    f = i.height / c.y;
  if (r) {
    const m = L(r),
      d = n && b(n) ? L(n) : n;
    let y = m.frameElement;
    for (; y && n && d !== m; ) {
      const h = O(y),
        p = y.getBoundingClientRect(),
        g = getComputedStyle(y);
      (p.x += (y.clientLeft + parseFloat(g.paddingLeft)) * h.x),
        (p.y += (y.clientTop + parseFloat(g.paddingTop)) * h.y),
        (a *= h.x),
        (s *= h.y),
        (u *= h.x),
        (f *= h.y),
        (a += p.x),
        (s += p.y),
        (y = L(y).frameElement);
    }
  }
  return z({ width: u, height: f, x: a, y: s });
}
function S(t) {
  return ((ft(t) ? t.ownerDocument : t.document) || window.document)
    .documentElement;
}
function j(t) {
  return b(t)
    ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
    : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function pt(t) {
  return k(S(t)).left + j(t).scrollLeft;
}
function V(t) {
  if (C(t) === "html") return t;
  const e = t.assignedSlot || t.parentNode || (nt(t) && t.host) || S(t);
  return nt(e) ? e.host : e;
}
function yt(t) {
  const e = V(t);
  return _(e) ? e.ownerDocument.body : T(e) && M(e) ? e : yt(e);
}
function H(t, e) {
  var o;
  e === void 0 && (e = []);
  const n = yt(t),
    i = n === ((o = t.ownerDocument) == null ? void 0 : o.body),
    r = L(n);
  return i
    ? e.concat(r, r.visualViewport || [], M(n) ? n : [])
    : e.concat(n, H(n));
}
function rt(t, e, o) {
  let n;
  if (e === "viewport")
    n = (function (i, r) {
      const c = L(i),
        l = S(i),
        a = c.visualViewport;
      let s = l.clientWidth,
        u = l.clientHeight,
        f = 0,
        m = 0;
      if (a) {
        (s = a.width), (u = a.height);
        const d = G();
        (!d || (d && r === "fixed")) && ((f = a.offsetLeft), (m = a.offsetTop));
      }
      return { width: s, height: u, x: f, y: m };
    })(t, o);
  else if (e === "document")
    n = (function (i) {
      const r = S(i),
        c = j(i),
        l = i.ownerDocument.body,
        a = B(r.scrollWidth, r.clientWidth, l.scrollWidth, l.clientWidth),
        s = B(r.scrollHeight, r.clientHeight, l.scrollHeight, l.clientHeight);
      let u = -c.scrollLeft + pt(i);
      const f = -c.scrollTop;
      return (
        E(l).direction === "rtl" && (u += B(r.clientWidth, l.clientWidth) - a),
        { width: a, height: s, x: u, y: f }
      );
    })(S(t));
  else if (b(e))
    n = (function (i, r) {
      const c = k(i, !0, r === "fixed"),
        l = c.top + i.clientTop,
        a = c.left + i.clientLeft,
        s = T(i) ? O(i) : { x: 1, y: 1 };
      return {
        width: i.clientWidth * s.x,
        height: i.clientHeight * s.y,
        x: a * s.x,
        y: l * s.y,
      };
    })(e, o);
  else {
    const i = ht(t);
    n = { ...e, x: e.x - i.x, y: e.y - i.y };
  }
  return z(n);
}
function gt(t, e) {
  const o = V(t);
  return !(o === e || !b(o) || _(o)) && (E(o).position === "fixed" || gt(o, e));
}
function lt(t, e) {
  return T(t) && E(t).position !== "fixed" ? (e ? e(t) : t.offsetParent) : null;
}
function ct(t, e) {
  const o = L(t);
  if (!T(t)) return o;
  let n = lt(t, e);
  for (; n && Pt(n) && E(n).position === "static"; ) n = lt(n, e);
  return n &&
    (C(n) === "html" ||
      (C(n) === "body" && E(n).position === "static" && !U(n)))
    ? o
    : n ||
        (function (i) {
          let r = V(i);
          for (; T(r) && !_(r); ) {
            if (U(r)) return r;
            r = V(r);
          }
          return null;
        })(t) ||
        o;
}
function St(t, e, o) {
  const n = T(e),
    i = S(e),
    r = o === "fixed",
    c = k(t, !0, r, e);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (n || (!n && !r))
    if (((C(e) !== "body" || M(i)) && (l = j(e)), T(e))) {
      const s = k(e, !0, r, e);
      (a.x = s.x + e.clientLeft), (a.y = s.y + e.clientTop);
    } else i && (a.x = pt(i));
  return {
    x: c.left + l.scrollLeft - a.x,
    y: c.top + l.scrollTop - a.y,
    width: c.width,
    height: c.height,
  };
}
const Ct = {
  getClippingRect: function (t) {
    let { element: e, boundary: o, rootBoundary: n, strategy: i } = t;
    const r =
        o === "clippingAncestors"
          ? (function (s, u) {
              const f = u.get(s);
              if (f) return f;
              let m = H(s).filter((p) => b(p) && C(p) !== "body"),
                d = null;
              const y = E(s).position === "fixed";
              let h = y ? V(s) : s;
              for (; b(h) && !_(h); ) {
                const p = E(h),
                  g = U(h);
                g || p.position !== "fixed" || (d = null),
                  (
                    y
                      ? !g && !d
                      : (!g &&
                          p.position === "static" &&
                          d &&
                          ["absolute", "fixed"].includes(d.position)) ||
                        (M(h) && !g && gt(s, h))
                  )
                    ? (m = m.filter((x) => x !== h))
                    : (d = p),
                  (h = V(h));
              }
              return u.set(s, m), m;
            })(e, this._c)
          : [].concat(o),
      c = [...r, n],
      l = c[0],
      a = c.reduce((s, u) => {
        const f = rt(e, u, i);
        return (
          (s.top = B(f.top, s.top)),
          (s.right = ot(f.right, s.right)),
          (s.bottom = ot(f.bottom, s.bottom)),
          (s.left = B(f.left, s.left)),
          s
        );
      }, rt(e, l, i));
    return {
      width: a.right - a.left,
      height: a.bottom - a.top,
      x: a.left,
      y: a.top,
    };
  },
  convertOffsetParentRelativeRectToViewportRelativeRect: function (t) {
    let { rect: e, offsetParent: o, strategy: n } = t;
    const i = T(o),
      r = S(o);
    if (o === r) return e;
    let c = { scrollLeft: 0, scrollTop: 0 },
      l = { x: 1, y: 1 };
    const a = { x: 0, y: 0 };
    if (
      (i || (!i && n !== "fixed")) &&
      ((C(o) !== "body" || M(r)) && (c = j(o)), T(o))
    ) {
      const s = k(o);
      (l = O(o)), (a.x = s.x + o.clientLeft), (a.y = s.y + o.clientTop);
    }
    return {
      width: e.width * l.x,
      height: e.height * l.y,
      x: e.x * l.x - c.scrollLeft * l.x + a.x,
      y: e.y * l.y - c.scrollTop * l.y + a.y,
    };
  },
  isElement: b,
  getDimensions: function (t) {
    return ut(t);
  },
  getOffsetParent: ct,
  getDocumentElement: S,
  getScale: O,
  async getElementRects(t) {
    let { reference: e, floating: o, strategy: n } = t;
    const i = this.getOffsetParent || ct,
      r = this.getDimensions;
    return {
      reference: St(e, await i(o), n),
      floating: { x: 0, y: 0, ...(await r(o)) },
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => E(t).direction === "rtl",
};
function Ft(t, e, o, n) {
  n === void 0 && (n = {});
  const {
      ancestorScroll: i = !0,
      ancestorResize: r = !0,
      elementResize: c = !0,
      animationFrame: l = !1,
    } = n,
    a =
      i || r
        ? [
            ...(b(t) ? H(t) : t.contextElement ? H(t.contextElement) : []),
            ...H(e),
          ]
        : [];
  a.forEach((m) => {
    const d = !b(m) && m.toString().includes("V");
    !i || (l && !d) || m.addEventListener("scroll", o, { passive: !0 }),
      r && m.addEventListener("resize", o);
  });
  let s,
    u = null;
  c &&
    ((u = new ResizeObserver(() => {
      o();
    })),
    b(t) && !l && u.observe(t),
    b(t) || !t.contextElement || l || u.observe(t.contextElement),
    u.observe(e));
  let f = l ? k(t) : null;
  return (
    l &&
      (function m() {
        const d = k(t);
        !f ||
          (d.x === f.x &&
            d.y === f.y &&
            d.width === f.width &&
            d.height === f.height) ||
          o(),
          (f = d),
          (s = requestAnimationFrame(m));
      })(),
    o(),
    () => {
      var m;
      a.forEach((d) => {
        i && d.removeEventListener("scroll", o),
          r && d.removeEventListener("resize", o);
      }),
        (m = u) == null || m.disconnect(),
        (u = null),
        l && cancelAnimationFrame(s);
    }
  );
}
const Vt = (t, e, o) => {
  const n = /* @__PURE__ */ new Map(),
    i = { platform: Ct, ...o },
    r = { ...i.platform, _c: n };
  return xt(t, e, { ...i, platform: r });
};
export {
  Dt as autoPlacement,
  Ft as autoUpdate,
  Vt as computePosition,
  kt as offset,
  Ot as shift,
};

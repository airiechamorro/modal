var Rr = Object.defineProperty;
var jr = (e, t, r) => t in e ? Rr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var X = (e, t, r) => jr(e, typeof t != "symbol" ? t + "" : t, r);
import * as Fe from "react";
import O, { createContext as q, useContext as V, useEffect as C, useRef as T, useState as I, createElement as Ie, useMemo as j, forwardRef as Ot, useImperativeHandle as Yt, useLayoutEffect as _r, useCallback as H, Fragment as Y, isValidElement as Dr, cloneElement as Wr, useId as Ne, useSyncExternalStore as Ur, useReducer as Hr, createRef as Vr } from "react";
import { jsxs as he, Fragment as St, jsx as A } from "react/jsx-runtime";
import Xe from "axios";
import { usePage as Br, router as Te } from "@inertiajs/react";
import { mergeDataIntoQueryString as Xr } from "@inertiajs/core";
import { createPortal as zr } from "react-dom";
const Se = {
  type: "modal",
  navigate: !1,
  modal: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class qr {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Se));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? Se.type,
        navigate: t.navigate ?? Se.navigate,
        modal: { ...Se.modal, ...t.modal ?? {} },
        slideover: { ...Se.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const n = t.split(".");
    let l = this.config;
    for (let i = 0; i < n.length - 1; i++)
      l = l[n[i]] = l[n[i]] || {};
    l[n[n.length - 1]] = r;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const r = t.split(".");
    let n = this.config;
    for (const l of r) {
      if (n[l] === void 0)
        return null;
      n = n[l];
    }
    return n;
  }
}
const Ye = new qr(), wi = () => Ye.reset(), yi = (e, t) => Ye.put(e, t), Pt = (e) => Ye.get(e), we = (e, t) => Ye.get(e ? `slideover.${t}` : `modal.${t}`);
function Gr(e, t) {
  const r = typeof window < "u" ? window.location.origin : "http://localhost";
  return e = typeof e == "string" ? new URL(e, r) : e, t = typeof t == "string" ? new URL(t, r) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function ct(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function be(e) {
  return typeof e == "string" ? e.toLowerCase() : e;
}
function Kr(e, t, r = !1) {
  return r && (t = t.map(be)), Array.isArray(e) ? e.filter((n) => !t.includes(r ? be(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? be(l) : l) || (n[l] = e[l]), n), {});
}
function Yr(e, t, r = !1) {
  return r && (t = t.map(be)), Array.isArray(e) ? e.filter((n) => t.includes(r ? be(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? be(l) : l) && (n[l] = e[l]), n), {});
}
function Zr(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function Pe(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, r) => r.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
function Jr(e) {
  if (typeof window < "u")
    return e.toLowerCase() in window;
  if (typeof document < "u") {
    const n = document.createElement("div");
    return e.toLowerCase() in n;
  }
  const t = e.toLowerCase();
  return [
    /^on(click|dblclick|mousedown|mouseup|mouseover|mouseout|mousemove|mouseenter|mouseleave)$/,
    /^on(keydown|keyup|keypress)$/,
    /^on(focus|blur|change|input|submit|reset)$/,
    /^on(load|unload|error|resize|scroll)$/,
    /^on(touchstart|touchend|touchmove|touchcancel)$/,
    /^on(pointerdown|pointerup|pointermove|pointerenter|pointerleave|pointercancel)$/,
    /^on(drag|dragstart|dragend|dragenter|dragleave|dragover|drop)$/,
    /^on(animationstart|animationend|animationiteration)$/,
    /^on(transitionstart|transitionend|transitionrun|transitioncancel)$/
  ].some((n) => n.test(t));
}
const Ze = q(null);
Ze.displayName = "ModalStackContext";
let Zt = null, Jt = null, xe = null, Ue = {}, dt = [], ye = {};
const Qr = ({ children: e }) => {
  const [t, r] = I([]), [n, l] = I({}), i = (v) => {
    r((u) => {
      const c = v([...u]), h = (w) => {
        var f;
        return c.length < 2 ? !0 : ((f = c.map((x) => ({ id: x.id, shouldRender: x.shouldRender })).reverse().find((x) => x.shouldRender)) == null ? void 0 : f.id) === w;
      };
      return c.forEach((w, f) => {
        c[f].onTopOfStack = h(w.id), c[f].getParentModal = () => f < 1 ? null : c.slice(0, f).reverse().find((x) => x.isOpen), c[f].getChildModal = () => f === c.length - 1 ? null : c.slice(f + 1).find((x) => x.isOpen);
      }), c;
    });
  };
  C(() => {
    dt = t;
  }, [t]);
  class s {
    constructor(u, c, h, w, f) {
      X(this, "show", () => {
        i(
          (u) => u.map((c) => (c.id === this.id && !c.isOpen && (c.isOpen = !0, c.shouldRender = !0), c))
        );
      });
      X(this, "setOpen", (u) => {
        u ? this.show() : this.close();
      });
      X(this, "close", () => {
        i((u) => {
          let c = !1;
          const h = u.map((w) => {
            var f;
            return w.id === this.id && w.isOpen && (Object.keys(w.listeners).forEach((x) => {
              w.off(x);
            }), w.isOpen = !1, (f = w.onCloseCallback) == null || f.call(w), c = !0), w;
          });
          return c ? h : u;
        });
      });
      X(this, "afterLeave", () => {
        this.isOpen || i((u) => {
          const c = u.map((h) => {
            var w;
            return h.id === this.id && !h.isOpen && (h.shouldRender = !1, (w = h.afterLeaveCallback) == null || w.call(h), h.afterLeaveCallback = null), h;
          });
          return this.index === 0 ? [] : c;
        });
      });
      X(this, "on", (u, c) => {
        u = Pe(u), this.listeners[u] = this.listeners[u] ?? [], this.listeners[u].push(c);
      });
      X(this, "off", (u, c) => {
        var h;
        u = Pe(u), c ? this.listeners[u] = ((h = this.listeners[u]) == null ? void 0 : h.filter((w) => w !== c)) ?? [] : delete this.listeners[u];
      });
      X(this, "emit", (u, ...c) => {
        var h;
        (h = this.listeners[Pe(u)]) == null || h.forEach((w) => w(...c));
      });
      X(this, "registerEventListenersFromProps", (u) => {
        const c = [];
        return Object.keys(u).filter((h) => h.startsWith("on")).forEach((h) => {
          const w = Pe(h).replace(/^on-/, "");
          this.on(w, u[h]), c.push(() => this.off(w, u[h]));
        }), () => c.forEach((h) => h());
      });
      X(this, "reload", (u = {}) => {
        var x, P;
        let c = Object.keys(this.response.props);
        if (u.only && (c = u.only), u.except && (c = Kr(c, u.except)), !((x = this.response) != null && x.url))
          return;
        const h = (u.method ?? "get").toLowerCase(), w = u.data ?? {};
        (P = u.onStart) == null || P.call(u);
        const f = {
          ...u.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": c.join(","),
          "X-InertiaUI-Modal": ct(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": xe
        };
        u.reset && u.reset.length > 0 && (f["X-Inertia-Reset"] = u.reset.join(",")), Xe({
          url: this.response.url,
          method: h,
          data: h === "get" ? {} : w,
          params: h === "get" ? w : {},
          headers: f
        }).then((S) => {
          var $;
          this.updateFromResponseData(S.data), ($ = u.onSuccess) == null || $.call(u, S);
        }).catch((S) => {
          var $;
          ($ = u.onError) == null || $.call(u, S);
        }).finally(() => {
          var S;
          (S = u.onFinish) == null || S.call(u);
        });
      });
      X(this, "mergeOrMatchItems", (u, c, h, w) => {
        const f = w.find(($) => $.split(".").slice(0, -1).join(".") === h);
        if (!f)
          return [...Array.isArray(u) ? u : [], ...c];
        const x = f.split(".").pop() || "", P = Array.isArray(u) ? u : [], S = /* @__PURE__ */ new Map();
        return P.forEach(($) => {
          $ && typeof $ == "object" && x in $ ? S.set($[x], $) : S.set(Symbol(), $);
        }), c.forEach(($) => {
          $ && typeof $ == "object" && x in $ ? S.set($[x], $) : S.set(Symbol(), $);
        }), Array.from(S.values());
      });
      X(this, "updateFromResponseData", (u) => {
        const c = (u == null ? void 0 : u.meta) ?? u ?? {}, h = c.mergeProps || [], w = c.deepMergeProps || [], f = c.matchPropsOn || [], x = { ...(u == null ? void 0 : u.props) || {} };
        h.forEach((S) => {
          const $ = x[S];
          Array.isArray($) ? x[S] = this.mergeOrMatchItems(this.props[S] || [], $, S, f) : typeof $ == "object" && $ !== null && (x[S] = {
            ...this.props[S] || {},
            ...$
          });
        });
        const P = (S, $, L) => Array.isArray($) ? this.mergeOrMatchItems(S, $, L, f) : typeof $ == "object" && $ !== null ? Object.keys($).reduce((N, _) => (N[_] = P(S ? S[_] : void 0, $[_], `${L}.${_}`), N), { ...S || {} }) : $;
        w.forEach((S) => {
          const $ = x[S], L = this.props[S];
          x[S] = P(L, $, S);
        }), Object.assign(this.props, { ...this.props, ...x }), this.response = { ...this.response || {}, ...u || {}, props: { ...this.props } }, i((S) => S);
      });
      X(this, "updateProps", (u) => {
        var c;
        this.updateFromResponseData({ props: u, meta: ((c = this.response) == null ? void 0 : c.meta) || {} });
      });
      if (this.id = c.id ?? ct(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = u, this.props = c.props, this.response = c, this.config = h ?? {}, this.onCloseCallback = w, this.afterLeaveCallback = f, ye[this.id]) {
        this.config = {
          ...this.config,
          ...ye[this.id].config ?? {}
        };
        const x = ye[this.id].onClose, P = ye[this.id].onAfterLeave;
        x && (this.onCloseCallback = w ? () => {
          w(), x();
        } : x), P && (this.afterLeaveCallback = f ? () => {
          f(), P();
        } : P), delete ye[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const a = (v, u = {}, c = null, h = null) => Jt(v.component).then((w) => d(w, v, u, c, h)), o = (v) => {
    var c, h;
    const u = (h = (c = v.response) == null ? void 0 : c.meta) == null ? void 0 : h.deferredProps;
    u && Object.keys(u).forEach((w) => {
      v.reload({ only: u[w] });
    });
  }, d = (v, u, c, h, w) => {
    const f = new s(v, u, c, h, w);
    return f.index = t.length, i((x) => [...x, f]), o(f), f.show(), f;
  };
  function p(v, u, c, h) {
    if (!n[v])
      throw new Error(`The local modal "${v}" has not been registered.`);
    const w = d(null, {}, u, c, h);
    return w.name = v, n[v].callback(w), w;
  }
  const y = (v, u = {}) => b(
    v,
    u.method ?? "get",
    u.data ?? {},
    u.headers ?? {},
    u.config ?? {},
    u.onClose,
    u.onAfterLeave,
    u.queryStringArrayFormat ?? "brackets",
    u.navigate ?? Pt("navigate"),
    u.onStart,
    u.onSuccess,
    u.onError,
    u.reset ?? []
  ).then((c) => {
    const h = u.listeners ?? {};
    return Object.keys(h).forEach((w) => {
      const f = Pe(w);
      c.on(f, h[w]);
    }), c;
  }), b = (v, u, c = {}, h = {}, w = {}, f = null, x = null, P = "brackets", S = !1, $ = null, L = null, N = null, _ = []) => {
    const D = ct();
    return new Promise((k, U) => {
      if (v.startsWith("#")) {
        k(p(v.substring(1), w, f, x));
        return;
      }
      const [ge, ce] = Xr(u, v || "", c, P);
      let ee = S && t.length === 0;
      if (t.length === 0 && (xe = typeof window < "u" ? window.location.href : ""), h = {
        ...h,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": Zt,
        "X-InertiaUI-Modal": D,
        "X-InertiaUI-Modal-Use-Router": ee ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": xe
      }, _ && _.length > 0 && (h["X-Inertia-Reset"] = _.join(",")), ee)
        return Ue = {}, ye[D] = {
          config: w,
          onClose: f,
          onAfterLeave: x
        }, Te.visit(ge, {
          method: u,
          data: ce,
          headers: h,
          preserveScroll: !0,
          preserveState: !0,
          onError(...R) {
            N == null || N(...R), U(...R);
          },
          onStart(...R) {
            $ == null || $(...R);
          },
          onSuccess(...R) {
            L == null || L(...R);
          },
          onBefore: () => {
            Ue[D] = k;
          }
        });
      $ == null || $(), Xe({
        url: ge,
        method: u,
        data: ce,
        headers: h
      }).then((R) => {
        L == null || L(R), k(a(R.data, w, f, x));
      }).catch((...R) => {
        N == null || N(...R), U(...R);
      });
    });
  }, E = {
    stack: t,
    localModals: n,
    push: d,
    pushFromResponseData: a,
    length: () => dt.length,
    closeAll: () => {
      dt.reverse().forEach((v) => v.close());
    },
    reset: () => i(() => []),
    visit: b,
    visitModal: y,
    registerLocalModal: (v, u) => {
      l((c) => ({
        ...c,
        [v]: { name: v, callback: u }
      }));
    },
    removeLocalModal: (v) => {
      l((u) => {
        const c = { ...u };
        return delete c[v], c;
      });
    },
    onModalOnBase: (v) => {
      const u = Ue[v.id];
      u && (u(v), delete Ue[v.id]);
    }
  };
  return /* @__PURE__ */ A(Ze.Provider, { value: E, children: e });
}, Je = () => {
  const e = V(Ze);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, It = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], en = (e) => {
  e.initialPage && (Zt = e.initialPage.version), e.resolveComponent && (Jt = e.resolveComponent);
}, bi = (e, t) => (en(t), /* @__PURE__ */ A(Qr, { children: /* @__PURE__ */ A(e, { ...t, children: ({ Component: n, props: l, key: i }) => /* @__PURE__ */ he(St, { children: [
  (() => {
    const a = Ie(n, { key: i, ...l });
    return typeof n.layout == "function" ? n.layout(a) : Array.isArray(n.layout) ? n.layout.concat(a).reverse().reduce((d, p) => Ie(p, l, d)) : a;
  })(),
  /* @__PURE__ */ A(tn, {})
] }) }) })), tn = ({ children: e }) => {
  var o, d;
  const t = V(Ze), r = Br();
  let n = !1, l = !1, i = !!((o = r.props) != null && o._inertiaui_modal);
  C(() => Te.on("start", () => n = !0), []), C(() => Te.on("finish", () => n = !1), []), C(
    () => Te.on("navigate", function(p) {
      const y = p.detail.page.props._inertiaui_modal;
      if (!y) {
        l && t.closeAll(), xe = null, i = !1;
        return;
      }
      l = y, xe = y.baseUrl, t.pushFromResponseData(y, {}, () => {
        if (!y.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && typeof window < "u" && window.location.href !== y.baseUrl && Te.visit(y.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then(t.onModalOnBase);
    }),
    []
  );
  const s = (p) => {
    var y;
    return p.headers["X-InertiaUI-Modal-Base-Url"] = xe ?? (i ? (y = r.props._inertiaui_modal) == null ? void 0 : y.baseUrl : null), p;
  };
  C(() => (Xe.interceptors.request.use(s), () => Xe.interceptors.request.eject(s)), []);
  const a = T();
  return C(() => {
    var b, g;
    const p = (b = r.props) == null ? void 0 : b._inertiaui_modal, y = a.current;
    a.current = p, p && y && p.component === y.component && Gr(p.url, y.url) && ((g = t.stack[0]) == null || g.updateFromResponseData(p));
  }, [(d = r.props) == null ? void 0 : d._inertiaui_modal]), /* @__PURE__ */ he(St, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ A(er, { index: 0 })
  ] });
}, Tt = O.createContext(null);
Tt.displayName = "ModalIndexContext";
const Qt = () => {
  const e = O.useContext(Tt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, er = ({ index: e }) => {
  const { stack: t } = Je(), r = j(() => t[e], [t, e]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ A(Tt.Provider, { value: e, children: /* @__PURE__ */ A(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
};
function tr() {
  return Je().stack[Qt()] ?? null;
}
const rn = ({ children: e, data: t, fallback: r }) => {
  if (!t)
    throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
  const [n, l] = I(!1), i = Array.isArray(t) ? t : [t], s = tr().props;
  return C(() => {
    l(i.every((a) => s[a] !== void 0));
  }, [s, i]), n ? e : r;
};
rn.displayName = "InertiaModalDeferred";
const rr = Ot(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, ...s }, a) => {
  const o = Qt(), { stack: d, registerLocalModal: p, removeLocalModal: y } = Je(), [b, g] = I(null), m = j(() => e ? b : d[o], [e, b, o, d]), E = j(() => {
    var f;
    return (f = d.find((x) => x.shouldRender && x.index > (m == null ? void 0 : m.index))) == null ? void 0 : f.index;
  }, [o, d]), v = j(() => (m == null ? void 0 : m.config.slideover) ?? s.slideover ?? Pt("type") === "slideover", [s.slideover]), u = j(
    () => ({
      slideover: v,
      closeButton: s.closeButton ?? we(v, "closeButton"),
      closeExplicitly: s.closeExplicitly ?? we(v, "closeExplicitly"),
      maxWidth: s.maxWidth ?? we(v, "maxWidth"),
      paddingClasses: s.paddingClasses ?? we(v, "paddingClasses"),
      panelClasses: s.panelClasses ?? we(v, "panelClasses"),
      position: s.position ?? we(v, "position"),
      ...m == null ? void 0 : m.config
    }),
    [s, m == null ? void 0 : m.config]
  );
  C(() => {
    if (e) {
      let f = null;
      return p(e, (x) => {
        f = x.registerEventListenersFromProps(s), g(x);
      }), () => {
        f == null || f(), f = null, y(e);
      };
    }
    return m.registerEventListenersFromProps(s);
  }, [e]);
  const c = T(m);
  C(() => {
    c.current = m;
  }, [m]), C(() => {
    m !== null && (m.isOpen ? i == null || i() : l == null || l());
  }, [m == null ? void 0 : m.isOpen]);
  const [h, w] = I(!1);
  return C(() => {
    h && m !== null && m.isOpen && (m.onTopOfStack ? r == null || r() : n == null || n()), w(!0);
  }, [m == null ? void 0 : m.onTopOfStack]), Yt(
    a,
    () => ({
      afterLeave: () => {
        var f;
        return (f = c.current) == null ? void 0 : f.afterLeave();
      },
      close: () => {
        var f;
        return (f = c.current) == null ? void 0 : f.close();
      },
      emit: (...f) => {
        var x;
        return (x = c.current) == null ? void 0 : x.emit(...f);
      },
      getChildModal: () => {
        var f;
        return (f = c.current) == null ? void 0 : f.getChildModal();
      },
      getParentModal: () => {
        var f;
        return (f = c.current) == null ? void 0 : f.getParentModal();
      },
      reload: (...f) => {
        var x;
        return (x = c.current) == null ? void 0 : x.reload(...f);
      },
      setOpen: () => {
        var f;
        return (f = c.current) == null ? void 0 : f.setOpen();
      },
      get id() {
        var f;
        return (f = c.current) == null ? void 0 : f.id;
      },
      get index() {
        var f;
        return (f = c.current) == null ? void 0 : f.index;
      },
      get isOpen() {
        var f;
        return (f = c.current) == null ? void 0 : f.isOpen;
      },
      get config() {
        var f;
        return (f = c.current) == null ? void 0 : f.config;
      },
      get modalContext() {
        return c.current;
      },
      get onTopOfStack() {
        var f;
        return (f = c.current) == null ? void 0 : f.onTopOfStack;
      },
      get shouldRender() {
        var f;
        return (f = c.current) == null ? void 0 : f.shouldRender;
      }
    }),
    [m]
  ), (m == null ? void 0 : m.shouldRender) && /* @__PURE__ */ he(St, { children: [
    typeof t == "function" ? t({
      afterLeave: m.afterLeave,
      close: m.close,
      config: u,
      emit: m.emit,
      getChildModal: m.getChildModal,
      getParentModal: m.getParentModal,
      id: m.id,
      index: m.index,
      isOpen: m.isOpen,
      modalContext: m,
      onTopOfStack: m.onTopOfStack,
      reload: m.reload,
      setOpen: m.setOpen,
      shouldRender: m.shouldRender
    }) : t,
    E && /* @__PURE__ */ A(er, { index: E })
  ] });
});
rr.displayName = "HeadlessModal";
function nr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (r = nr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ze() {
  for (var e, t, r = 0, n = "", l = arguments.length; r < l; r++) (e = arguments[r]) && (t = nr(e)) && (n && (n += " "), n += t);
  return n;
}
var nn = Object.defineProperty, ln = (e, t, r) => t in e ? nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ft = (e, t, r) => (ln(e, typeof t != "symbol" ? t + "" : t, r), r);
let on = class {
  constructor() {
    ft(this, "current", this.detect()), ft(this, "handoffState", "pending"), ft(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, J = new on();
function Qe(e) {
  var t, r;
  return J.isServer ? null : e ? "ownerDocument" in e ? e.ownerDocument : "current" in e ? (r = (t = e.current) == null ? void 0 : t.ownerDocument) != null ? r : document : null : document;
}
function et(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function le() {
  let e = [], t = { addEventListener(r, n, l, i) {
    return r.addEventListener(n, l, i), t.add(() => r.removeEventListener(n, l, i));
  }, requestAnimationFrame(...r) {
    let n = requestAnimationFrame(...r);
    return t.add(() => cancelAnimationFrame(n));
  }, nextFrame(...r) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...r));
  }, setTimeout(...r) {
    let n = setTimeout(...r);
    return t.add(() => clearTimeout(n));
  }, microTask(...r) {
    let n = { current: !0 };
    return et(() => {
      n.current && r[0]();
    }), t.add(() => {
      n.current = !1;
    });
  }, style(r, n, l) {
    let i = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: l }), this.add(() => {
      Object.assign(r.style, { [n]: i });
    });
  }, group(r) {
    let n = le();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return e.includes(r) || e.push(r), () => {
      let n = e.indexOf(r);
      if (n >= 0) for (let l of e.splice(n, 1)) l();
    };
  }, dispose() {
    for (let r of e.splice(0)) r();
  } };
  return t;
}
function Mt() {
  let [e] = I(le);
  return C(() => () => e.dispose(), [e]), e;
}
let W = (e, t) => {
  J.isServer ? C(e, t) : _r(e, t);
};
function ve(e) {
  let t = T(e);
  return W(() => {
    t.current = e;
  }, [e]), t;
}
let F = function(e) {
  let t = ve(e);
  return O.useCallback((...r) => t.current(...r), [t]);
}, an = q(void 0);
function sn() {
  return V(an);
}
function wt(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function ne(e, t, ...r) {
  if (e in t) {
    let l = t[e];
    return typeof l == "function" ? l(...r) : l;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((l) => `"${l}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, ne), n;
}
var qe = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(qe || {}), ae = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(ae || {});
function G() {
  let e = cn();
  return H((t) => un({ mergeRefs: e, ...t }), [e]);
}
function un({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: l, visible: i = !0, name: s, mergeRefs: a }) {
  a = a ?? dn;
  let o = lr(t, e);
  if (i) return He(o, r, n, s, a);
  let d = l ?? 0;
  if (d & 2) {
    let { static: p = !1, ...y } = o;
    if (p) return He(y, r, n, s, a);
  }
  if (d & 1) {
    let { unmount: p = !0, ...y } = o;
    return ne(p ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return He({ ...y, hidden: !0, style: { display: "none" } }, r, n, s, a);
    } });
  }
  return He(o, r, n, s, a);
}
function He(e, t = {}, r, n, l) {
  let { as: i = r, children: s, refName: a = "ref", ...o } = mt(e, ["unmount", "static"]), d = e.ref !== void 0 ? { [a]: e.ref } : {}, p = typeof s == "function" ? s(t) : s;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(t)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
  let y = {};
  if (t) {
    let b = !1, g = [];
    for (let [m, E] of Object.entries(t)) typeof E == "boolean" && (b = !0), E === !0 && g.push(m.replace(/([A-Z])/g, (v) => `-${v.toLowerCase()}`));
    if (b) {
      y["data-headlessui-state"] = g.join(" ");
      for (let m of g) y[`data-${m}`] = "";
    }
  }
  if (i === Y && (Object.keys(de(o)).length > 0 || Object.keys(de(y)).length > 0)) if (!Dr(p) || Array.isArray(p) && p.length > 1) {
    if (Object.keys(de(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(de(o)).concat(Object.keys(de(y))).map((b) => `  - ${b}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((b) => `  - ${b}`).join(`
`)].join(`
`));
  } else {
    let b = p.props, g = b == null ? void 0 : b.className, m = typeof g == "function" ? (...u) => wt(g(...u), o.className) : wt(g, o.className), E = m ? { className: m } : {}, v = lr(p.props, de(mt(o, ["ref"])));
    for (let u in y) u in v && delete y[u];
    return Wr(p, Object.assign({}, v, y, d, { ref: l(fn(p), d.ref) }, E));
  }
  return Ie(i, Object.assign({}, mt(o, ["ref"]), i !== Y && d, i !== Y && y), p);
}
function cn() {
  let e = T([]), t = H((r) => {
    for (let n of e.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return e.current = r, t;
  };
}
function dn(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t);
  };
}
function lr(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, r = {};
  for (let n of e) for (let l in n) l.startsWith("on") && typeof n[l] == "function" ? (r[l] != null || (r[l] = []), r[l].push(n[l])) : t[l] = n[l];
  if (t.disabled || t["aria-disabled"]) for (let n in r) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(n) && (r[n] = [(l) => {
    var i;
    return (i = l == null ? void 0 : l.preventDefault) == null ? void 0 : i.call(l);
  }]);
  for (let n in r) Object.assign(t, { [n](l, ...i) {
    let s = r[n];
    for (let a of s) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      a(l, ...i);
    }
  } });
  return t;
}
function B(e) {
  var t;
  return Object.assign(Ot(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function de(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function mt(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function fn(e) {
  return O.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let mn = "span";
var Ge = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Ge || {});
function pn(e, t) {
  var r;
  let { features: n = 1, ...l } = e, i = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return G()({ ourProps: i, theirProps: l, slot: {}, defaultTag: mn, name: "Hidden" });
}
let yt = B(pn);
function ir(e) {
  return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function ue(e) {
  return ir(e) && "tagName" in e;
}
function pe(e) {
  return ue(e) && "accessKey" in e;
}
function se(e) {
  return ue(e) && "tabIndex" in e;
}
function hn(e) {
  return ue(e) && "style" in e;
}
function vn(e) {
  return pe(e) && e.nodeName === "IFRAME";
}
function gn(e) {
  return pe(e) && e.nodeName === "INPUT";
}
let or = Symbol();
function wn(e, t = !0) {
  return Object.assign(e, { [or]: t });
}
function Q(...e) {
  let t = T(e);
  C(() => {
    t.current = e;
  }, [e]);
  let r = F((n) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(n) : l.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[or])) ? void 0 : r;
}
let At = q(null);
At.displayName = "DescriptionContext";
function ar() {
  let e = V(At);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, ar), t;
  }
  return e;
}
function yn() {
  let [e, t] = I([]);
  return [e.length > 0 ? e.join(" ") : void 0, j(() => function(r) {
    let n = F((i) => (t((s) => [...s, i]), () => t((s) => {
      let a = s.slice(), o = a.indexOf(i);
      return o !== -1 && a.splice(o, 1), a;
    }))), l = j(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return O.createElement(At.Provider, { value: l }, r.children);
  }, [t])];
}
let bn = "p";
function xn(e, t) {
  let r = Ne(), n = sn(), { id: l = `headlessui-description-${r}`, ...i } = e, s = ar(), a = Q(t);
  W(() => s.register(l), [l, s.register]);
  let o = n || !1, d = j(() => ({ ...s.slot, disabled: o }), [s.slot, o]), p = { ref: a, ...s.props, id: l };
  return G()({ ourProps: p, theirProps: i, slot: d, defaultTag: bn, name: s.name || "Description" });
}
let En = B(xn), $n = Object.assign(En, {});
var sr = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(sr || {});
let On = q(() => {
});
function Sn({ value: e, children: t }) {
  return O.createElement(On.Provider, { value: e }, t);
}
let ur = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let r = super.get(t);
    return r === void 0 && (r = this.factory(t), this.set(t, r)), r;
  }
};
var Pn = Object.defineProperty, Tn = (e, t, r) => t in e ? Pn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Mn = (e, t, r) => (Tn(e, t + "", r), r), cr = (e, t, r) => {
  if (!t.has(e)) throw TypeError("Cannot " + r);
}, z = (e, t, r) => (cr(e, t, "read from private field"), r ? r.call(e) : t.get(e)), pt = (e, t, r) => {
  if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Nt = (e, t, r, n) => (cr(e, t, "write to private field"), t.set(e, r), r), Z, Me, Ae;
let An = class {
  constructor(t) {
    pt(this, Z, {}), pt(this, Me, new ur(() => /* @__PURE__ */ new Set())), pt(this, Ae, /* @__PURE__ */ new Set()), Mn(this, "disposables", le()), Nt(this, Z, t), J.isServer && this.disposables.microTask(() => {
      this.dispose();
    });
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return z(this, Z);
  }
  subscribe(t, r) {
    if (J.isServer) return () => {
    };
    let n = { selector: t, callback: r, current: t(z(this, Z)) };
    return z(this, Ae).add(n), this.disposables.add(() => {
      z(this, Ae).delete(n);
    });
  }
  on(t, r) {
    return J.isServer ? () => {
    } : (z(this, Me).get(t).add(r), this.disposables.add(() => {
      z(this, Me).get(t).delete(r);
    }));
  }
  send(t) {
    let r = this.reduce(z(this, Z), t);
    if (r !== z(this, Z)) {
      Nt(this, Z, r);
      for (let n of z(this, Ae)) {
        let l = n.selector(z(this, Z));
        dr(n.current, l) || (n.current = l, n.callback(l));
      }
      for (let n of z(this, Me).get(t.type)) n(z(this, Z), t);
    }
  }
};
Z = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap();
function dr(e, t) {
  return Object.is(e, t) ? !0 : typeof e != "object" || e === null || typeof t != "object" || t === null ? !1 : Array.isArray(e) && Array.isArray(t) ? e.length !== t.length ? !1 : ht(e[Symbol.iterator](), t[Symbol.iterator]()) : e instanceof Map && t instanceof Map || e instanceof Set && t instanceof Set ? e.size !== t.size ? !1 : ht(e.entries(), t.entries()) : Rt(e) && Rt(t) ? ht(Object.entries(e)[Symbol.iterator](), Object.entries(t)[Symbol.iterator]()) : !1;
}
function ht(e, t) {
  do {
    let r = e.next(), n = t.next();
    if (r.done && n.done) return !0;
    if (r.done || n.done || !Object.is(r.value, n.value)) return !1;
  } while (!0);
}
function Rt(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || Object.getPrototypeOf(t) === null;
}
var Ln = Object.defineProperty, Fn = (e, t, r) => t in e ? Ln(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, jt = (e, t, r) => (Fn(e, typeof t != "symbol" ? t + "" : t, r), r), kn = ((e) => (e[e.Push = 0] = "Push", e[e.Pop = 1] = "Pop", e))(kn || {});
let Cn = { 0(e, t) {
  let r = t.id, n = e.stack, l = e.stack.indexOf(r);
  if (l !== -1) {
    let i = e.stack.slice();
    return i.splice(l, 1), i.push(r), n = i, { ...e, stack: n };
  }
  return { ...e, stack: [...e.stack, r] };
}, 1(e, t) {
  let r = t.id, n = e.stack.indexOf(r);
  if (n === -1) return e;
  let l = e.stack.slice();
  return l.splice(n, 1), { ...e, stack: l };
} }, In = class fr extends An {
  constructor() {
    super(...arguments), jt(this, "actions", { push: (t) => this.send({ type: 0, id: t }), pop: (t) => this.send({ type: 1, id: t }) }), jt(this, "selectors", { isTop: (t, r) => t.stack[t.stack.length - 1] === r, inStack: (t, r) => t.stack.includes(r) });
  }
  static new() {
    return new fr({ stack: [] });
  }
  reduce(t, r) {
    return ne(r.type, Cn, t, r);
  }
};
const mr = new ur(() => In.new());
var Ve = { exports: {} }, vt = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _t;
function Nn() {
  if (_t) return vt;
  _t = 1;
  var e = O;
  function t(o, d) {
    return o === d && (o !== 0 || 1 / o === 1 / d) || o !== o && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, l = e.useRef, i = e.useEffect, s = e.useMemo, a = e.useDebugValue;
  return vt.useSyncExternalStoreWithSelector = function(o, d, p, y, b) {
    var g = l(null);
    if (g.current === null) {
      var m = { hasValue: !1, value: null };
      g.current = m;
    } else m = g.current;
    g = s(
      function() {
        function v(f) {
          if (!u) {
            if (u = !0, c = f, f = y(f), b !== void 0 && m.hasValue) {
              var x = m.value;
              if (b(x, f))
                return h = x;
            }
            return h = f;
          }
          if (x = h, r(c, f)) return x;
          var P = y(f);
          return b !== void 0 && b(x, P) ? (c = f, x) : (c = f, h = P);
        }
        var u = !1, c, h, w = p === void 0 ? null : p;
        return [
          function() {
            return v(d());
          },
          w === null ? void 0 : function() {
            return v(w());
          }
        ];
      },
      [d, p, y, b]
    );
    var E = n(o, g[0], g[1]);
    return i(
      function() {
        m.hasValue = !0, m.value = E;
      },
      [E]
    ), a(E), E;
  }, vt;
}
var gt = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dt;
function Rn() {
  return Dt || (Dt = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(o, d) {
      return o === d && (o !== 0 || 1 / o === 1 / d) || o !== o && d !== d;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = O, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, l = t.useRef, i = t.useEffect, s = t.useMemo, a = t.useDebugValue;
    gt.useSyncExternalStoreWithSelector = function(o, d, p, y, b) {
      var g = l(null);
      if (g.current === null) {
        var m = { hasValue: !1, value: null };
        g.current = m;
      } else m = g.current;
      g = s(
        function() {
          function v(f) {
            if (!u) {
              if (u = !0, c = f, f = y(f), b !== void 0 && m.hasValue) {
                var x = m.value;
                if (b(x, f))
                  return h = x;
              }
              return h = f;
            }
            if (x = h, r(c, f))
              return x;
            var P = y(f);
            return b !== void 0 && b(x, P) ? (c = f, x) : (c = f, h = P);
          }
          var u = !1, c, h, w = p === void 0 ? null : p;
          return [
            function() {
              return v(d());
            },
            w === null ? void 0 : function() {
              return v(w());
            }
          ];
        },
        [d, p, y, b]
      );
      var E = n(o, g[0], g[1]);
      return i(
        function() {
          m.hasValue = !0, m.value = E;
        },
        [E]
      ), a(E), E;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), gt;
}
var Wt;
function jn() {
  return Wt || (Wt = 1, process.env.NODE_ENV === "production" ? Ve.exports = Nn() : Ve.exports = Rn()), Ve.exports;
}
var _n = jn();
function pr(e, t, r = dr) {
  return _n.useSyncExternalStoreWithSelector(F((n) => e.subscribe(Dn, n)), F(() => e.state), F(() => e.state), F(t), r);
}
function Dn(e) {
  return e;
}
function Re(e, t) {
  let r = Ne(), n = mr.get(t), [l, i] = pr(n, H((s) => [n.selectors.isTop(s, r), n.selectors.inStack(s, r)], [n, r]));
  return W(() => {
    if (e) return n.actions.push(r), () => n.actions.pop(r);
  }, [n, e, r]), e ? i ? l : !0 : !1;
}
let bt = /* @__PURE__ */ new Map(), ke = /* @__PURE__ */ new Map();
function Ut(e) {
  var t;
  let r = (t = ke.get(e)) != null ? t : 0;
  return ke.set(e, r + 1), r !== 0 ? () => Ht(e) : (bt.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Ht(e));
}
function Ht(e) {
  var t;
  let r = (t = ke.get(e)) != null ? t : 1;
  if (r === 1 ? ke.delete(e) : ke.set(e, r - 1), r !== 1) return;
  let n = bt.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, bt.delete(e));
}
function Wn(e, { allowed: t, disallowed: r } = {}) {
  let n = Re(e, "inert-others");
  W(() => {
    var l, i;
    if (!n) return;
    let s = le();
    for (let o of (l = r == null ? void 0 : r()) != null ? l : []) o && s.add(Ut(o));
    let a = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let o of a) {
      if (!o) continue;
      let d = Qe(o);
      if (!d) continue;
      let p = o.parentElement;
      for (; p && p !== d.body; ) {
        for (let y of p.children) a.some((b) => y.contains(b)) || s.add(Ut(y));
        p = p.parentElement;
      }
    }
    return s.dispose;
  }, [n, t, r]);
}
function Un(e, t, r) {
  let n = ve((l) => {
    let i = l.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && r();
  });
  C(() => {
    if (!e) return;
    let l = t === null ? null : pe(t) ? t : t.current;
    if (!l) return;
    let i = le();
    if (typeof ResizeObserver < "u") {
      let s = new ResizeObserver(() => n.current(l));
      s.observe(l), i.add(() => s.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let s = new IntersectionObserver(() => n.current(l));
      s.observe(l), i.add(() => s.disconnect());
    }
    return () => i.dispose();
  }, [t, n, e]);
}
let Ke = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Hn = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var te = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(te || {}), xt = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(xt || {}), Vn = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Vn || {});
function Bn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Ke)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function Xn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Hn)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var hr = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(hr || {});
function zn(e, t = 0) {
  var r;
  return e === ((r = Qe(e)) == null ? void 0 : r.body) ? !1 : ne(t, { 0() {
    return e.matches(Ke);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(Ke)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var qn = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(qn || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function re(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Gn = ["textarea", "input"].join(",");
function Kn(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Gn)) != null ? r : !1;
}
function Yn(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let l = t(r), i = t(n);
    if (l === null || i === null) return 0;
    let s = l.compareDocumentPosition(i);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ce(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, s = Array.isArray(e) ? r ? Yn(e) : e : t & 64 ? Xn(e) : Bn(e);
  l.length > 0 && s.length > 1 && (s = s.filter((g) => !l.some((m) => m != null && "current" in m ? (m == null ? void 0 : m.current) === g : m === g))), n = n ?? i.activeElement;
  let a = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), o = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, s.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, s.indexOf(n)) + 1;
    if (t & 8) return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), d = t & 32 ? { preventScroll: !0 } : {}, p = 0, y = s.length, b;
  do {
    if (p >= y || p + y <= 0) return 0;
    let g = o + p;
    if (t & 16) g = (g + y) % y;
    else {
      if (g < 0) return 3;
      if (g >= y) return 1;
    }
    b = s[g], b == null || b.focus(d), p += a;
  } while (b !== i.activeElement);
  return t & 6 && Kn(b) && b.select(), 2;
}
function vr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Zn() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Vt() {
  return vr() || Zn();
}
function Be(e, t, r, n) {
  let l = ve(r);
  C(() => {
    if (!e) return;
    function i(s) {
      l.current(s);
    }
    return document.addEventListener(t, i, n), () => document.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function gr(e, t, r, n) {
  let l = ve(r);
  C(() => {
    if (!e) return;
    function i(s) {
      l.current(s);
    }
    return window.addEventListener(t, i, n), () => window.removeEventListener(t, i, n);
  }, [e, t, n]);
}
const Bt = 30;
function Jn(e, t, r) {
  let n = ve(r), l = H(function(a, o) {
    if (a.defaultPrevented) return;
    let d = o(a);
    if (d === null || !d.getRootNode().contains(d) || !d.isConnected) return;
    let p = (function y(b) {
      return typeof b == "function" ? y(b()) : Array.isArray(b) || b instanceof Set ? b : [b];
    })(t);
    for (let y of p) if (y !== null && (y.contains(d) || a.composed && a.composedPath().includes(y))) return;
    return !zn(d, hr.Loose) && d.tabIndex !== -1 && a.preventDefault(), n.current(a, d);
  }, [n, t]), i = T(null);
  Be(e, "pointerdown", (a) => {
    var o, d;
    Vt() || (i.current = ((d = (o = a.composedPath) == null ? void 0 : o.call(a)) == null ? void 0 : d[0]) || a.target);
  }, !0), Be(e, "pointerup", (a) => {
    if (Vt() || !i.current) return;
    let o = i.current;
    return i.current = null, l(a, () => o);
  }, !0);
  let s = T({ x: 0, y: 0 });
  Be(e, "touchstart", (a) => {
    s.current.x = a.touches[0].clientX, s.current.y = a.touches[0].clientY;
  }, !0), Be(e, "touchend", (a) => {
    let o = { x: a.changedTouches[0].clientX, y: a.changedTouches[0].clientY };
    if (!(Math.abs(o.x - s.current.x) >= Bt || Math.abs(o.y - s.current.y) >= Bt)) return l(a, () => se(a.target) ? a.target : null);
  }, !0), gr(e, "blur", (a) => l(a, () => vn(window.document.activeElement) ? window.document.activeElement : null), !0);
}
function tt(...e) {
  return j(() => Qe(...e), [...e]);
}
function wr(e, t, r, n) {
  let l = ve(r);
  C(() => {
    e = e ?? window;
    function i(s) {
      l.current(s);
    }
    return e.addEventListener(t, i, n), () => e.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function Qn(e) {
  return Ur(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function el(e, t) {
  let r = e(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(l) {
    return n.add(l), () => n.delete(l);
  }, dispatch(l, ...i) {
    let s = t[l].call(r, ...i);
    s && (r = s, n.forEach((a) => a()));
  } };
}
function tl() {
  let e;
  return { before({ doc: t }) {
    var r;
    let n = t.documentElement, l = (r = t.defaultView) != null ? r : window;
    e = Math.max(0, l.innerWidth - n.clientWidth);
  }, after({ doc: t, d: r }) {
    let n = t.documentElement, l = Math.max(0, n.clientWidth - n.offsetWidth), i = Math.max(0, e - l);
    r.style(n, "paddingRight", `${i}px`);
  } };
}
function rl() {
  return vr() ? { before({ doc: e, d: t, meta: r }) {
    function n(l) {
      return r.containers.flatMap((i) => i()).some((i) => i.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let a = le();
        a.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => a.dispose()));
      }
      let i = (l = window.scrollY) != null ? l : window.pageYOffset, s = null;
      t.addEventListener(e, "click", (a) => {
        if (se(a.target)) try {
          let o = a.target.closest("a");
          if (!o) return;
          let { hash: d } = new URL(o.href), p = e.querySelector(d);
          se(p) && !n(p) && (s = p);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (a) => {
        if (se(a.target) && hn(a.target)) if (n(a.target)) {
          let o = a.target;
          for (; o.parentElement && n(o.parentElement); ) o = o.parentElement;
          t.style(o, "overscrollBehavior", "contain");
        } else t.style(a.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (a) => {
        if (se(a.target)) {
          if (gn(a.target)) return;
          if (n(a.target)) {
            let o = a.target;
            for (; o.parentElement && o.dataset.headlessuiPortal !== "" && !(o.scrollHeight > o.clientHeight || o.scrollWidth > o.clientWidth); ) o = o.parentElement;
            o.dataset.headlessuiPortal === "" && a.preventDefault();
          } else a.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var a;
        let o = (a = window.scrollY) != null ? a : window.pageYOffset;
        i !== o && window.scrollTo(0, i), s && s.isConnected && (s.scrollIntoView({ block: "nearest" }), s = null);
      });
    });
  } } : {};
}
function nl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function ll(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let me = el(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: le(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: ll(r) }, l = [rl(), tl(), nl()];
  l.forEach(({ before: i }) => i == null ? void 0 : i(n)), l.forEach(({ after: i }) => i == null ? void 0 : i(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
me.subscribe(() => {
  let e = me.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", l = r.count !== 0;
    (l && !n || !l && n) && me.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && me.dispatch("TEARDOWN", r);
  }
});
function il(e, t, r = () => ({ containers: [] })) {
  let n = Qn(me), l = t ? n.get(t) : void 0, i = l ? l.count > 0 : !1;
  return W(() => {
    if (!(!t || !e)) return me.dispatch("PUSH", t, r), () => me.dispatch("POP", t, r);
  }, [e, t]), i;
}
function ol(e, t, r = () => [document.body]) {
  let n = Re(e, "scroll-lock");
  il(n, t, (l) => {
    var i;
    return { containers: [...(i = l.containers) != null ? i : [], r] };
  });
}
function al(e = 0) {
  let [t, r] = I(e), n = H((o) => r(o), [t]), l = H((o) => r((d) => d | o), [t]), i = H((o) => (t & o) === o, [t]), s = H((o) => r((d) => d & ~o), [r]), a = H((o) => r((d) => d ^ o), [r]);
  return { flags: t, setFlag: n, addFlag: l, hasFlag: i, removeFlag: s, toggleFlag: a };
}
var Xt, zt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Xt = process == null ? void 0 : process.env) == null ? void 0 : Xt.NODE_ENV) === "test" && typeof ((zt = Element == null ? void 0 : Element.prototype) == null ? void 0 : zt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var sl = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(sl || {});
function ul(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function cl(e, t, r, n) {
  let [l, i] = I(r), { hasFlag: s, addFlag: a, removeFlag: o } = al(e && l ? 3 : 0), d = T(!1), p = T(!1), y = Mt();
  return W(() => {
    var b;
    if (e) {
      if (r && i(!0), !t) {
        r && a(3);
        return;
      }
      return (b = n == null ? void 0 : n.start) == null || b.call(n, r), dl(t, { inFlight: d, prepare() {
        p.current ? p.current = !1 : p.current = d.current, d.current = !0, !p.current && (r ? (a(3), o(4)) : (a(4), o(2)));
      }, run() {
        p.current ? r ? (o(3), a(4)) : (o(4), a(3)) : r ? o(1) : a(1);
      }, done() {
        var g;
        p.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (d.current = !1, o(7), r || i(!1), (g = n == null ? void 0 : n.end) == null || g.call(n, r));
      } });
    }
  }, [e, r, t, y]), e ? [l, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function dl(e, { prepare: t, run: r, done: n, inFlight: l }) {
  let i = le();
  return ml(e, { prepare: t, inFlight: l }), i.nextFrame(() => {
    r(), i.requestAnimationFrame(() => {
      i.add(fl(e, n));
    });
  }), i.dispose;
}
function fl(e, t) {
  var r, n;
  let l = le();
  if (!e) return l.dispose;
  let i = !1;
  l.add(() => {
    i = !0;
  });
  let s = (n = (r = e.getAnimations) == null ? void 0 : r.call(e).filter((a) => a instanceof CSSTransition)) != null ? n : [];
  return s.length === 0 ? (t(), l.dispose) : (Promise.allSettled(s.map((a) => a.finished)).then(() => {
    i || t();
  }), l.dispose);
}
function ml(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function Lt(e, t) {
  let r = T([]), n = F(e);
  C(() => {
    let l = [...r.current];
    for (let [i, s] of t.entries()) if (r.current[i] !== s) {
      let a = n(t, l);
      return r.current = t, a;
    }
  }, [n, ...t]);
}
let rt = q(null);
rt.displayName = "OpenClosedContext";
var K = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(K || {});
function nt() {
  return V(rt);
}
function pl({ value: e, children: t }) {
  return O.createElement(rt.Provider, { value: e }, t);
}
function hl({ children: e }) {
  return O.createElement(rt.Provider, { value: null }, e);
}
function vl(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let oe = [];
vl(() => {
  function e(t) {
    if (!se(t.target) || t.target === document.body || oe[0] === t.target) return;
    let r = t.target;
    r = r.closest(Ke), oe.unshift(r ?? t.target), oe = oe.filter((n) => n != null && n.isConnected), oe.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function yr(e) {
  let t = F(e), r = T(!1);
  C(() => (r.current = !1, () => {
    r.current = !0, et(() => {
      r.current && t();
    });
  }), [t]);
}
function gl() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Fe ? ((t) => t.useSyncExternalStore)(Fe)(() => () => {
  }, () => !1, () => !e) : !1;
}
function je() {
  let e = gl(), [t, r] = Fe.useState(J.isHandoffComplete);
  return t && J.isHandoffComplete === !1 && r(!1), Fe.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), Fe.useEffect(() => J.handoff(), []), e ? !1 : t;
}
let br = q(!1);
function wl() {
  return V(br);
}
function qt(e) {
  return O.createElement(br.Provider, { value: e.force }, e.children);
}
function yl(e) {
  let t = wl(), r = V(Er), [n, l] = I(() => {
    var i;
    if (!t && r !== null) return (i = r.current) != null ? i : null;
    if (J.isServer) return null;
    let s = e == null ? void 0 : e.getElementById("headlessui-portal-root");
    if (s) return s;
    if (e === null) return null;
    let a = e.createElement("div");
    return a.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(a);
  });
  return C(() => {
    n !== null && (e != null && e.body.contains(n) || e == null || e.body.appendChild(n));
  }, [n, e]), C(() => {
    t || r !== null && l(r.current);
  }, [r, l, t]), n;
}
let xr = Y, bl = B(function(e, t) {
  let { ownerDocument: r = null, ...n } = e, l = T(null), i = Q(wn((g) => {
    l.current = g;
  }), t), s = tt(l), a = r ?? s, o = yl(a), [d] = I(() => {
    var g;
    return J.isServer ? null : (g = a == null ? void 0 : a.createElement("div")) != null ? g : null;
  }), p = V(Et), y = je();
  W(() => {
    !o || !d || o.contains(d) || (d.setAttribute("data-headlessui-portal", ""), o.appendChild(d));
  }, [o, d]), W(() => {
    if (d && p) return p.register(d);
  }, [p, d]), yr(() => {
    var g;
    !o || !d || (ir(d) && o.contains(d) && o.removeChild(d), o.childNodes.length <= 0 && ((g = o.parentElement) == null || g.removeChild(o)));
  });
  let b = G();
  return y ? !o || !d ? null : zr(b({ ourProps: { ref: i }, theirProps: n, slot: {}, defaultTag: xr, name: "Portal" }), d) : null;
});
function xl(e, t) {
  let r = Q(t), { enabled: n = !0, ownerDocument: l, ...i } = e, s = G();
  return n ? O.createElement(bl, { ...i, ownerDocument: l, ref: r }) : s({ ourProps: { ref: r }, theirProps: i, slot: {}, defaultTag: xr, name: "Portal" });
}
let El = Y, Er = q(null);
function $l(e, t) {
  let { target: r, ...n } = e, l = { ref: Q(t) }, i = G();
  return O.createElement(Er.Provider, { value: r }, i({ ourProps: l, theirProps: n, defaultTag: El, name: "Popover.Group" }));
}
let Et = q(null);
function Ol() {
  let e = V(Et), t = T([]), r = F((i) => (t.current.push(i), e && e.register(i), () => n(i))), n = F((i) => {
    let s = t.current.indexOf(i);
    s !== -1 && t.current.splice(s, 1), e && e.unregister(i);
  }), l = j(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, j(() => function({ children: i }) {
    return O.createElement(Et.Provider, { value: l }, i);
  }, [l])];
}
let Sl = B(xl), $r = B($l), Pl = Object.assign(Sl, { Group: $r });
function Tl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = Re(e, "escape");
  wr(t, "keydown", (l) => {
    n && (l.defaultPrevented || l.key === sr.Escape && r(l));
  });
}
function Ml() {
  var e;
  let [t] = I(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = I((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return W(() => {
    if (!t) return;
    function l(i) {
      n(i.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), r;
}
function Al({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = tt(r), l = F(() => {
    var i, s;
    let a = [];
    for (let o of e) o !== null && (ue(o) ? a.push(o) : "current" in o && ue(o.current) && a.push(o.current));
    if (t != null && t.current) for (let o of t.current) a.push(o);
    for (let o of (i = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? i : []) o !== document.body && o !== document.head && ue(o) && o.id !== "headlessui-portal-root" && (r && (o.contains(r) || o.contains((s = r == null ? void 0 : r.getRootNode()) == null ? void 0 : s.host)) || a.some((d) => o.contains(d)) || a.push(o));
    return a;
  });
  return { resolveContainers: l, contains: F((i) => l().some((s) => s.contains(i))) };
}
let Or = q(null);
function Gt({ children: e, node: t }) {
  let [r, n] = I(null), l = Sr(t ?? r);
  return O.createElement(Or.Provider, { value: l }, e, l === null && O.createElement(yt, { features: Ge.Hidden, ref: (i) => {
    var s, a;
    if (i) {
      for (let o of (a = (s = Qe(i)) == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? a : []) if (o !== document.body && o !== document.head && ue(o) && o != null && o.contains(i)) {
        n(o);
        break;
      }
    }
  } }));
}
function Sr(e = null) {
  var t;
  return (t = V(Or)) != null ? t : e;
}
function Ft() {
  let e = T(!1);
  return W(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Le = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Le || {});
function Ll() {
  let e = T(0);
  return gr(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function Pr(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) ue(r.current) && t.add(r.current);
  return t;
}
let Fl = "div";
var fe = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(fe || {});
function kl(e, t) {
  let r = T(null), n = Q(r, t), { initialFocus: l, initialFocusFallback: i, containers: s, features: a = 15, ...o } = e;
  je() || (a = 0);
  let d = tt(r);
  Rl(a, { ownerDocument: d });
  let p = jl(a, { ownerDocument: d, container: r, initialFocus: l, initialFocusFallback: i });
  _l(a, { ownerDocument: d, container: r, containers: s, previousActiveElement: p });
  let y = Ll(), b = F((c) => {
    if (!pe(r.current)) return;
    let h = r.current;
    ((w) => w())(() => {
      ne(y.current, { [Le.Forwards]: () => {
        Ce(h, te.First, { skipElements: [c.relatedTarget, i] });
      }, [Le.Backwards]: () => {
        Ce(h, te.Last, { skipElements: [c.relatedTarget, i] });
      } });
    });
  }), g = Re(!!(a & 2), "focus-trap#tab-lock"), m = Mt(), E = T(!1), v = { ref: n, onKeyDown(c) {
    c.key == "Tab" && (E.current = !0, m.requestAnimationFrame(() => {
      E.current = !1;
    }));
  }, onBlur(c) {
    if (!(a & 4)) return;
    let h = Pr(s);
    pe(r.current) && h.add(r.current);
    let w = c.relatedTarget;
    se(w) && w.dataset.headlessuiFocusGuard !== "true" && (Tr(h, w) || (E.current ? Ce(r.current, ne(y.current, { [Le.Forwards]: () => te.Next, [Le.Backwards]: () => te.Previous }) | te.WrapAround, { relativeTo: c.target }) : se(c.target) && re(c.target)));
  } }, u = G();
  return O.createElement(O.Fragment, null, g && O.createElement(yt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: Ge.Focusable }), u({ ourProps: v, theirProps: o, defaultTag: Fl, name: "FocusTrap" }), g && O.createElement(yt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: Ge.Focusable }));
}
let Cl = B(kl), Il = Object.assign(Cl, { features: fe });
function Nl(e = !0) {
  let t = T(oe.slice());
  return Lt(([r], [n]) => {
    n === !0 && r === !1 && et(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = oe.slice());
  }, [e, oe, t]), F(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function Rl(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = Nl(r);
  Lt(() => {
    r || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && re(n());
  }, [r]), yr(() => {
    r && re(n());
  });
}
function jl(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: l }) {
  let i = T(null), s = Re(!!(e & 1), "focus-trap#initial-focus"), a = Ft();
  return Lt(() => {
    if (e === 0) return;
    if (!s) {
      l != null && l.current && re(l.current);
      return;
    }
    let o = r.current;
    o && et(() => {
      if (!a.current) return;
      let d = t == null ? void 0 : t.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === d) {
          i.current = d;
          return;
        }
      } else if (o.contains(d)) {
        i.current = d;
        return;
      }
      if (n != null && n.current) re(n.current);
      else {
        if (e & 16) {
          if (Ce(o, te.First | te.AutoFocus) !== xt.Error) return;
        } else if (Ce(o, te.First) !== xt.Error) return;
        if (l != null && l.current && (re(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, s, e]), i;
}
function _l(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: l }) {
  let i = Ft(), s = !!(e & 4);
  wr(t == null ? void 0 : t.defaultView, "focus", (a) => {
    if (!s || !i.current) return;
    let o = Pr(n);
    pe(r.current) && o.add(r.current);
    let d = l.current;
    if (!d) return;
    let p = a.target;
    pe(p) ? Tr(o, p) ? (l.current = p, re(p)) : (a.preventDefault(), a.stopPropagation(), re(d)) : re(l.current);
  }, !0);
}
function Tr(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function Mr(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : Lr) !== Y || O.Children.count(e.children) === 1;
}
let lt = q(null);
lt.displayName = "TransitionContext";
var Dl = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Dl || {});
function Wl() {
  let e = V(lt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Ul() {
  let e = V(it);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let it = q(null);
it.displayName = "NestingContext";
function ot(e) {
  return "children" in e ? ot(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function Ar(e, t) {
  let r = ve(e), n = T([]), l = Ft(), i = Mt(), s = F((g, m = ae.Hidden) => {
    let E = n.current.findIndex(({ el: v }) => v === g);
    E !== -1 && (ne(m, { [ae.Unmount]() {
      n.current.splice(E, 1);
    }, [ae.Hidden]() {
      n.current[E].state = "hidden";
    } }), i.microTask(() => {
      var v;
      !ot(n) && l.current && ((v = r.current) == null || v.call(r));
    }));
  }), a = F((g) => {
    let m = n.current.find(({ el: E }) => E === g);
    return m ? m.state !== "visible" && (m.state = "visible") : n.current.push({ el: g, state: "visible" }), () => s(g, ae.Unmount);
  }), o = T([]), d = T(Promise.resolve()), p = T({ enter: [], leave: [] }), y = F((g, m, E) => {
    o.current.splice(0), t && (t.chains.current[m] = t.chains.current[m].filter(([v]) => v !== g)), t == null || t.chains.current[m].push([g, new Promise((v) => {
      o.current.push(v);
    })]), t == null || t.chains.current[m].push([g, new Promise((v) => {
      Promise.all(p.current[m].map(([u, c]) => c)).then(() => v());
    })]), m === "enter" ? d.current = d.current.then(() => t == null ? void 0 : t.wait.current).then(() => E(m)) : E(m);
  }), b = F((g, m, E) => {
    Promise.all(p.current[m].splice(0).map(([v, u]) => u)).then(() => {
      var v;
      (v = o.current.shift()) == null || v();
    }).then(() => E(m));
  });
  return j(() => ({ children: n, register: a, unregister: s, onStart: y, onStop: b, wait: d, chains: p }), [a, s, n, y, b, p, d]);
}
let Lr = Y, Fr = qe.RenderStrategy;
function Hl(e, t) {
  var r, n;
  let { transition: l = !0, beforeEnter: i, afterEnter: s, beforeLeave: a, afterLeave: o, enter: d, enterFrom: p, enterTo: y, entered: b, leave: g, leaveFrom: m, leaveTo: E, ...v } = e, [u, c] = I(null), h = T(null), w = Mr(e), f = Q(...w ? [h, t, c] : t === null ? [] : [t]), x = (r = v.unmount) == null || r ? ae.Unmount : ae.Hidden, { show: P, appear: S, initial: $ } = Wl(), [L, N] = I(P ? "visible" : "hidden"), _ = Ul(), { register: D, unregister: k } = _;
  W(() => D(h), [D, h]), W(() => {
    if (x === ae.Hidden && h.current) {
      if (P && L !== "visible") {
        N("visible");
        return;
      }
      return ne(L, { hidden: () => k(h), visible: () => D(h) });
    }
  }, [L, h, D, k, P, x]);
  let U = je();
  W(() => {
    if (w && U && L === "visible" && h.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [h, L, U, w]);
  let ge = $ && !S, ce = S && P && $, ee = T(!1), R = Ar(() => {
    ee.current || (N("hidden"), k(h));
  }, _), _e = F((ut) => {
    ee.current = !0;
    let We = ut ? "enter" : "leave";
    R.onStart(h, We, (Oe) => {
      Oe === "enter" ? i == null || i() : Oe === "leave" && (a == null || a());
    });
  }), ie = F((ut) => {
    let We = ut ? "enter" : "leave";
    ee.current = !1, R.onStop(h, We, (Oe) => {
      Oe === "enter" ? s == null || s() : Oe === "leave" && (o == null || o());
    }), We === "leave" && !ot(R) && (N("hidden"), k(h));
  });
  C(() => {
    w && l || (_e(P), ie(P));
  }, [P, w, l]);
  let st = !(!l || !w || !U || ge), [, M] = cl(st, u, P, { start: _e, end: ie }), De = de({ ref: f, className: ((n = wt(v.className, ce && d, ce && p, M.enter && d, M.enter && M.closed && p, M.enter && !M.closed && y, M.leave && g, M.leave && !M.closed && m, M.leave && M.closed && E, !M.transition && P && b)) == null ? void 0 : n.trim()) || void 0, ...ul(M) }), $e = 0;
  L === "visible" && ($e |= K.Open), L === "hidden" && ($e |= K.Closed), P && L === "hidden" && ($e |= K.Opening), !P && L === "visible" && ($e |= K.Closing);
  let Nr = G();
  return O.createElement(it.Provider, { value: R }, O.createElement(pl, { value: $e }, Nr({ ourProps: De, theirProps: v, defaultTag: Lr, features: Fr, visible: L === "visible", name: "Transition.Child" })));
}
function Vl(e, t) {
  let { show: r, appear: n = !1, unmount: l = !0, ...i } = e, s = T(null), a = Mr(e), o = Q(...a ? [s, t] : t === null ? [] : [t]);
  je();
  let d = nt();
  if (r === void 0 && d !== null && (r = (d & K.Open) === K.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [p, y] = I(r ? "visible" : "hidden"), b = Ar(() => {
    r || y("hidden");
  }), [g, m] = I(!0), E = T([r]);
  W(() => {
    g !== !1 && E.current[E.current.length - 1] !== r && (E.current.push(r), m(!1));
  }, [E, r]);
  let v = j(() => ({ show: r, appear: n, initial: g }), [r, n, g]);
  W(() => {
    r ? y("visible") : !ot(b) && s.current !== null && y("hidden");
  }, [r, b]);
  let u = { unmount: l }, c = F(() => {
    var f;
    g && m(!1), (f = e.beforeEnter) == null || f.call(e);
  }), h = F(() => {
    var f;
    g && m(!1), (f = e.beforeLeave) == null || f.call(e);
  }), w = G();
  return O.createElement(it.Provider, { value: b }, O.createElement(lt.Provider, { value: v }, w({ ourProps: { ...u, as: Y, children: O.createElement(kr, { ref: o, ...u, ...i, beforeEnter: c, beforeLeave: h }) }, theirProps: {}, defaultTag: Y, features: Fr, visible: p === "visible", name: "Transition" })));
}
function Bl(e, t) {
  let r = V(lt) !== null, n = nt() !== null;
  return O.createElement(O.Fragment, null, !r && n ? O.createElement($t, { ref: t, ...e }) : O.createElement(kr, { ref: t, ...e }));
}
let $t = B(Vl), kr = B(Hl), Ee = B(Bl), Cr = Object.assign($t, { Child: Ee, Root: $t });
var Xl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Xl || {}), zl = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(zl || {});
let ql = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, kt = q(null);
kt.displayName = "DialogContext";
function at(e) {
  let t = V(kt);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, at), r;
  }
  return t;
}
function Gl(e, t) {
  return ne(t.type, ql, e, t);
}
let Kt = B(function(e, t) {
  let r = Ne(), { id: n = `headlessui-dialog-${r}`, open: l, onClose: i, initialFocus: s, role: a = "dialog", autoFocus: o = !0, __demoMode: d = !1, unmount: p = !1, ...y } = e, b = T(!1);
  a = (function() {
    return a === "dialog" || a === "alertdialog" ? a : (b.current || (b.current = !0, console.warn(`Invalid role [${a}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  })();
  let g = nt();
  l === void 0 && g !== null && (l = (g & K.Open) === K.Open);
  let m = T(null), E = Q(m, t), v = tt(m), u = l ? 0 : 1, [c, h] = Hr(Gl, { titleId: null, descriptionId: null, panelRef: Vr() }), w = F(() => i(!1)), f = F((M) => h({ type: 0, id: M })), x = je() ? u === 0 : !1, [P, S] = Ol(), $ = { get current() {
    var M;
    return (M = c.panelRef.current) != null ? M : m.current;
  } }, L = Sr(), { resolveContainers: N } = Al({ mainTreeNode: L, portals: P, defaultContainers: [$] }), _ = g !== null ? (g & K.Closing) === K.Closing : !1;
  Wn(d || _ ? !1 : x, { allowed: F(() => {
    var M, De;
    return [(De = (M = m.current) == null ? void 0 : M.closest("[data-headlessui-portal]")) != null ? De : null];
  }), disallowed: F(() => {
    var M;
    return [(M = L == null ? void 0 : L.closest("body > *:not(#headlessui-portal-root)")) != null ? M : null];
  }) });
  let D = mr.get(null);
  W(() => {
    if (x) return D.actions.push(n), () => D.actions.pop(n);
  }, [D, n, x]);
  let k = pr(D, H((M) => D.selectors.isTop(M, n), [D, n]));
  Jn(k, N, (M) => {
    M.preventDefault(), w();
  }), Tl(k, v == null ? void 0 : v.defaultView, (M) => {
    M.preventDefault(), M.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), w();
  }), ol(d || _ ? !1 : x, v, N), Un(x, m, w);
  let [U, ge] = yn(), ce = j(() => [{ dialogState: u, close: w, setTitleId: f, unmount: p }, c], [u, c, w, f, p]), ee = j(() => ({ open: u === 0 }), [u]), R = { ref: E, id: n, role: a, tabIndex: -1, "aria-modal": d ? void 0 : u === 0 ? !0 : void 0, "aria-labelledby": c.titleId, "aria-describedby": U, unmount: p }, _e = !Ml(), ie = fe.None;
  x && !d && (ie |= fe.RestoreFocus, ie |= fe.TabLock, o && (ie |= fe.AutoFocus), _e && (ie |= fe.InitialFocus));
  let st = G();
  return O.createElement(hl, null, O.createElement(qt, { force: !0 }, O.createElement(Pl, null, O.createElement(kt.Provider, { value: ce }, O.createElement($r, { target: m }, O.createElement(qt, { force: !1 }, O.createElement(ge, { slot: ee }, O.createElement(S, null, O.createElement(Il, { initialFocus: s, initialFocusFallback: m, containers: N, features: ie }, O.createElement(Sn, { value: w }, st({ ourProps: R, theirProps: y, slot: ee, defaultTag: Kl, features: Yl, visible: u === 0, name: "Dialog" })))))))))));
}), Kl = "div", Yl = qe.RenderStrategy | qe.Static;
function Zl(e, t) {
  let { transition: r = !1, open: n, ...l } = e, i = nt(), s = e.hasOwnProperty("open") || i !== null, a = e.hasOwnProperty("onClose");
  if (!s && !a) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!s) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!a) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !l.static ? O.createElement(Gt, null, O.createElement(Cr, { show: n, transition: r, unmount: l.unmount }, O.createElement(Kt, { ref: t, ...l }))) : O.createElement(Gt, null, O.createElement(Kt, { ref: t, open: n, ...l }));
}
let Jl = "div";
function Ql(e, t) {
  let r = Ne(), { id: n = `headlessui-dialog-panel-${r}`, transition: l = !1, ...i } = e, [{ dialogState: s, unmount: a }, o] = at("Dialog.Panel"), d = Q(t, o.panelRef), p = j(() => ({ open: s === 0 }), [s]), y = F((v) => {
    v.stopPropagation();
  }), b = { ref: d, id: n, onClick: y }, g = l ? Ee : Y, m = l ? { unmount: a } : {}, E = G();
  return O.createElement(g, { ...m }, E({ ourProps: b, theirProps: i, slot: p, defaultTag: Jl, name: "Dialog.Panel" }));
}
let ei = "div";
function ti(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: l, unmount: i }] = at("Dialog.Backdrop"), s = j(() => ({ open: l === 0 }), [l]), a = { ref: t, "aria-hidden": !0 }, o = r ? Ee : Y, d = r ? { unmount: i } : {}, p = G();
  return O.createElement(o, { ...d }, p({ ourProps: a, theirProps: n, slot: s, defaultTag: ei, name: "Dialog.Backdrop" }));
}
let ri = "h2";
function ni(e, t) {
  let r = Ne(), { id: n = `headlessui-dialog-title-${r}`, ...l } = e, [{ dialogState: i, setTitleId: s }] = at("Dialog.Title"), a = Q(t);
  C(() => (s(n), () => s(null)), [n, s]);
  let o = j(() => ({ open: i === 0 }), [i]), d = { ref: a, id: n };
  return G()({ ourProps: d, theirProps: l, slot: o, defaultTag: ri, name: "Dialog.Title" });
}
let li = B(Zl), Ct = B(Ql);
B(ti);
let ii = B(ni), oi = Object.assign(li, { Panel: Ct, Title: ii, Description: $n });
function Ir({ onClick: e }) {
  return /* @__PURE__ */ he(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
      children: [
        /* @__PURE__ */ A("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ A(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ A(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 18L18 6M6 6l12 12"
              }
            )
          }
        )
      ]
    }
  );
}
const ai = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = I(!1);
  return /* @__PURE__ */ A("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ A(
    "div",
    {
      className: ze("im-modal-positioner flex min-h-full justify-center", {
        "items-start": t.position === "top",
        "items-center": t.position === "center",
        "items-end": t.position === "bottom"
      }),
      children: /* @__PURE__ */ A(
        Ee,
        {
          as: "div",
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: ze("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
            "sm:max-w-sm": t.maxWidth === "sm",
            "sm:max-w-md": t.maxWidth === "md",
            "sm:max-w-md md:max-w-lg": t.maxWidth === "lg",
            "sm:max-w-md md:max-w-xl": t.maxWidth === "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.maxWidth === "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.maxWidth === "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.maxWidth === "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.maxWidth === "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.maxWidth === "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.maxWidth === "7xl"
          }),
          children: /* @__PURE__ */ he(
            Ct,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ A("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ A(Ir, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, si = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = I(!1);
  return /* @__PURE__ */ A("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ A(
    "div",
    {
      className: ze("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (t == null ? void 0 : t.position) === "left",
        "justify-end rtl:justify-start": (t == null ? void 0 : t.position) === "right"
      }),
      children: /* @__PURE__ */ A(
        Ee,
        {
          as: "div",
          enterFrom: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          enterTo: "opacity-100 translate-x-0",
          leaveFrom: "opacity-100 translate-x-0",
          leaveTo: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: ze("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
            "sm:max-w-sm": t.maxWidth === "sm",
            "sm:max-w-md": t.maxWidth === "md",
            "sm:max-w-md md:max-w-lg": t.maxWidth === "lg",
            "sm:max-w-md md:max-w-xl": t.maxWidth === "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.maxWidth === "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.maxWidth === "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.maxWidth === "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.maxWidth === "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.maxWidth === "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.maxWidth === "7xl"
          }),
          children: /* @__PURE__ */ he(
            Ct,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ A("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ A(Ir, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, ui = Ot(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, onAfterLeave: s = null, ...a }, o) => {
  const d = (y) => typeof t == "function" ? t(y) : t, p = T(null);
  return Yt(o, () => p.current, [p]), /* @__PURE__ */ A(
    rr,
    {
      ref: p,
      name: e,
      onFocus: r,
      onBlur: n,
      onClose: l,
      onSuccess: i,
      ...a,
      children: ({
        afterLeave: y,
        close: b,
        config: g,
        emit: m,
        getChildModal: E,
        getParentModal: v,
        id: u,
        index: c,
        isOpen: h,
        modalContext: w,
        onTopOfStack: f,
        reload: x,
        setOpen: P,
        shouldRender: S
      }) => /* @__PURE__ */ A(
        Cr,
        {
          appear: !0,
          show: h ?? !1,
          afterLeave: s,
          children: /* @__PURE__ */ he(
            oi,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => g.closeExplicitly ? null : b(),
              "data-inertiaui-modal-id": u,
              "data-inertiaui-modal-index": c,
              children: [
                c === 0 ? /* @__PURE__ */ A(
                  Ee,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: f ? /* @__PURE__ */ A(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ A("div", {})
                  }
                ) : null,
                c > 0 && f ? /* @__PURE__ */ A("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                g.slideover ? /* @__PURE__ */ A(
                  si,
                  {
                    modalContext: w,
                    config: g,
                    children: d({
                      afterLeave: y,
                      close: b,
                      config: g,
                      emit: m,
                      getChildModal: E,
                      getParentModal: v,
                      id: u,
                      index: c,
                      isOpen: h,
                      modalContext: w,
                      onTopOfStack: f,
                      reload: x,
                      setOpen: P,
                      shouldRender: S
                    })
                  }
                ) : /* @__PURE__ */ A(
                  ai,
                  {
                    modalContext: w,
                    config: g,
                    children: d({
                      afterLeave: y,
                      close: b,
                      config: g,
                      emit: m,
                      getChildModal: E,
                      getParentModal: v,
                      id: u,
                      index: c,
                      isOpen: h,
                      modalContext: w,
                      onTopOfStack: f,
                      reload: x,
                      setOpen: P,
                      shouldRender: S
                    })
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
});
ui.displayName = "Modal";
const Oi = ({
  href: e,
  method: t = "get",
  data: r = {},
  as: n = "a",
  headers: l = {},
  queryStringArrayFormat: i = "brackets",
  onAfterLeave: s = null,
  onBlur: a = null,
  onClose: o = null,
  onError: d = null,
  onFocus: p = null,
  onStart: y = null,
  onSuccess: b = null,
  navigate: g = null,
  children: m,
  ...E
}) => {
  const [v, u] = I(!1), [c, h] = I(null), { stack: w, visit: f } = Je(), x = j(() => g ?? Pt("navigate"), [g]), P = {}, S = {};
  Object.keys(E).forEach((k) => {
    It.includes(k) || (k.startsWith("on") && typeof E[k] == "function" ? Jr(k) ? P[k] = E[k] : S[k] = E[k] : P[k] = E[k]);
  });
  const [$, L] = I(!1);
  C(() => {
    c && (c.onTopOfStack && $ ? p == null || p() : !c.onTopOfStack && !$ && (a == null || a()), L(!c.onTopOfStack));
  }, [w]);
  const N = H(() => {
    o == null || o();
  }, [o]), _ = H(() => {
    h(null), s == null || s();
  }, [s]), D = H(
    (k) => {
      k == null || k.preventDefault(), !v && (e.startsWith("#") || (u(!0), y == null || y()), f(
        e,
        t,
        r,
        l,
        Zr(Yr(E, It)),
        () => N(w.length),
        _,
        i,
        x
      ).then((U) => {
        h(U), U.registerEventListenersFromProps(S), b == null || b();
      }).catch((U) => {
        console.error(U), d == null || d(U);
      }).finally(() => u(!1)));
    },
    [e, t, r, l, i, E, N, _]
  );
  return /* @__PURE__ */ A(
    n,
    {
      ...P,
      href: e,
      onClick: D,
      children: typeof m == "function" ? m({ loading: v }) : m
    }
  );
}, ci = ({ children: e, data: t, params: r, buffer: n, as: l, always: i, fallback: s }) => {
  i = i ?? !1, l = l ?? "div", s = s ?? null;
  const [a, o] = I(!1), d = T(!1), p = T(!1), y = T(null), b = tr(), g = H(() => {
    if (t)
      return {
        only: Array.isArray(t) ? t : [t]
      };
    if (!r)
      throw new Error("You must provide either a `data` or `params` prop.");
    return r;
  }, [r, t]);
  return C(() => {
    if (!y.current)
      return;
    const m = new IntersectionObserver(
      (E) => {
        if (!E[0].isIntersecting || (!i && d.current && m.disconnect(), p.current))
          return;
        d.current = !0, p.current = !0;
        const v = g();
        b.reload({
          ...v,
          onStart: (u) => {
            var c;
            p.current = !0, (c = v.onStart) == null || c.call(v, u);
          },
          onFinish: (u) => {
            var c;
            o(!0), p.current = !1, (c = v.onFinish) == null || c.call(v, u), i || m.disconnect();
          }
        });
      },
      {
        rootMargin: `${n || 0}px`
      }
    );
    return m.observe(y.current), () => {
      m.disconnect();
    };
  }, [y, g, n]), i || !a ? Ie(
    l,
    {
      props: null,
      ref: y
    },
    a ? e : s
  ) : a ? e : null;
};
ci.displayName = "InertiaWhenVisible";
const Si = (e) => (t) => (t.default.layout = (r) => Ie(e, {}, r), t);
export {
  rn as Deferred,
  rr as HeadlessModal,
  ui as Modal,
  Oi as ModalLink,
  tn as ModalRoot,
  Qr as ModalStackProvider,
  ci as WhenVisible,
  Pt as getConfig,
  en as initFromPageProps,
  yi as putConfig,
  bi as renderApp,
  wi as resetConfig,
  Si as setPageLayout,
  tr as useModal,
  Qt as useModalIndex,
  Je as useModalStack
};

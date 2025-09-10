var ft = Object.defineProperty;
var pt = (t, e, n) => e in t ? ft(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var S = (t, e, n) => pt(t, typeof e != "symbol" ? e + "" : e, n);
import * as ue from "vue";
import { computed as D, provide as Me, createBlock as E, createCommentVNode as F, openBlock as w, unref as m, mergeProps as L, onUnmounted as U, onBeforeMount as We, onMounted as te, watch as P, createElementBlock as H, Fragment as Se, renderSlot as O, ref as h, h as Y, readonly as mt, markRaw as vt, nextTick as K, toValue as $, inject as ie, onBeforeUnmount as me, useAttrs as je, effectScope as Ke, getCurrentScope as yt, onScopeDispose as gt, getCurrentInstance as ne, shallowRef as ht, toHandlerKey as xt, camelize as bt, defineComponent as M, toRefs as Ve, Comment as wt, cloneVNode as Ct, withCtx as C, watchEffect as ee, reactive as He, normalizeStyle as Ot, createVNode as I, Teleport as Et, normalizeProps as _t, guardReactiveProps as At, createElementVNode as W, normalizeClass as Z, Transition as Ie, resolveDynamicComponent as Pe, withModifiers as Dt } from "vue";
import { usePage as Xe, router as re } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as Mt } from "@inertiajs/core";
import ve from "axios";
const ae = {
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
class St {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(ae));
  }
  put(e, n) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? ae.type,
        navigate: e.navigate ?? ae.navigate,
        modal: { ...ae.modal, ...e.modal ?? {} },
        slideover: { ...ae.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const o = e.split(".");
    let r = this.config;
    for (let a = 0; a < o.length - 1; a++)
      r = r[o[a]] = r[o[a]] || {};
    r[o[o.length - 1]] = n;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const n = e.split(".");
    let o = this.config;
    for (const r of n) {
      if (o[r] === void 0)
        return null;
      o = o[r];
    }
    return o;
  }
}
const ge = new St(), wo = () => ge.reset(), Co = (t, e) => ge.put(t, e), Be = (t) => ge.get(t), z = (t, e) => ge.get(t ? `slideover.${e}` : `modal.${e}`);
function It(t, e) {
  const n = typeof window < "u" ? window.location.origin : "http://localhost";
  return t = typeof t == "string" ? new URL(t, n) : t, e = typeof e == "string" ? new URL(e, n) : e, `${t.origin}${t.pathname}` == `${e.origin}${e.pathname}`;
}
function _e(t = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${t}${crypto.randomUUID()}` : `${t}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Q(t) {
  return typeof t == "string" ? t.toLowerCase() : t;
}
function Pt(t, e, n = !1) {
  return n && (e = e.map(Q)), Array.isArray(t) ? t.filter((o) => !e.includes(n ? Q(o) : o)) : Object.keys(t).reduce((o, r) => (e.includes(n ? Q(r) : r) || (o[r] = t[r]), o), {});
}
function ze(t, e, n = !1) {
  return n && (e = e.map(Q)), Array.isArray(t) ? t.filter((o) => e.includes(n ? Q(o) : o)) : Object.keys(t).reduce((o, r) => (e.includes(n ? Q(r) : r) && (o[r] = t[r]), o), {});
}
function Bt(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, n) => (n in t && t[n] !== null && (e[n] = t[n]), e), {});
}
function de(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, n) => n.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
const Ge = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(t) {
    const e = t, n = le(), o = D(() => n.stack.value[e.index]);
    return Me("modalContext", o), (r, a) => {
      var s;
      return (s = o.value) != null && s.component ? (w(), E(m(o).component, L({ key: 0 }, m(ze)(o.value.props ?? {}, o.value.getComponentPropKeys(), !0), {
        onModalEvent: a[0] || (a[0] = (i, ...l) => o.value.emit(i, ...l))
      }), null, 16)) : F("", !0);
    };
  }
}, $t = {
  __name: "ModalRoot",
  setup(t) {
    const e = le(), n = Xe();
    let o = !1, r = null, a = !1;
    U(re.on("start", () => o = !0)), U(re.on("finish", () => o = !1)), U(
      re.on("navigate", (i) => {
        const l = i.detail.page.props._inertiaui_modal;
        if (!l) {
          r && e.closeAll(), e.setBaseUrl(null), a = !1;
          return;
        }
        r = l, e.setBaseUrl(l.baseUrl), e.pushFromResponseData(l, {}, () => {
          if (!l.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !o && typeof window < "u" && window.location.href !== l.baseUrl && re.visit(l.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        }).then(e.onModalOnBase);
      })
    );
    const s = (i) => {
      var l;
      return i.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl() ?? (a ? (l = n.props._inertiaui_modal) == null ? void 0 : l.baseUrl : null), i;
    };
    return We(() => ve.interceptors.request.use(s)), te(() => a = !!n.props._inertiaui_modal), U(() => ve.interceptors.request.eject(s)), P(
      () => {
        var i;
        return (i = n.props) == null ? void 0 : i._inertiaui_modal;
      },
      (i, l) => {
        var u;
        i && l && i.component === l.component && It(i.url, l.url) && ((u = e.stack.value[0]) == null || u.updateFromResponseData(i));
      }
    ), (i, l) => (w(), H(Se, null, [
      O(i.$slots, "default"),
      m(e).stack.value.length ? (w(), E(Ge, {
        key: 0,
        index: 0
      })) : F("", !0)
    ], 64));
  }
};
let he = null;
const J = h({}), se = h(null), Ae = h({}), A = h([]), ye = h({}), Lt = (t) => {
  he = t;
}, Oo = (t) => {
  t.resolveComponent && (he = t.resolveComponent);
};
class Tt {
  constructor(e, n, o, r, a) {
    S(this, "getComponentPropKeys", () => Array.isArray(this.component.props) ? this.component.props : this.component.props ? Object.keys(this.component.props) : []);
    S(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : A.value.slice(0, e).reverse().find((n) => n.isOpen);
    });
    S(this, "getChildModal", () => {
      const e = this.index.value;
      return e === A.value.length - 1 ? null : A.value.slice(e + 1).find((n) => n.isOpen);
    });
    S(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (A.value[e].isOpen)
          return;
        A.value[e].isOpen = !0, A.value[e].shouldRender = !0;
      }
    });
    S(this, "close", () => {
      var n;
      const e = this.index.value;
      if (e > -1) {
        if (!A.value[e].isOpen)
          return;
        Object.keys(this.listeners).forEach((o) => {
          this.off(o);
        }), A.value[e].isOpen = !1, (n = this.onCloseCallback) == null || n.call(this), this.onCloseCallback = null;
      }
    });
    S(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    S(this, "afterLeave", () => {
      var n;
      const e = this.index.value;
      if (e > -1) {
        if (A.value[e].isOpen)
          return;
        A.value[e].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (A.value = []);
    });
    S(this, "on", (e, n) => {
      e = de(e), this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(n);
    });
    S(this, "off", (e, n) => {
      var o;
      e = de(e), n ? this.listeners[e] = ((o = this.listeners[e]) == null ? void 0 : o.filter((r) => r !== n)) ?? [] : delete this.listeners[e];
    });
    S(this, "emit", (e, ...n) => {
      var o;
      (o = this.listeners[de(e)]) == null || o.forEach((r) => r(...n));
    });
    S(this, "registerEventListenersFromAttrs", (e) => {
      const n = [];
      return Object.keys(e).filter((o) => o.startsWith("on")).forEach((o) => {
        const r = de(o).replace(/^on-/, "");
        this.on(r, e[o]), n.push(() => this.off(r, e[o]));
      }), () => n.forEach((o) => o());
    });
    S(this, "reload", (e = {}) => {
      var a, s;
      let n = Object.keys(this.response.props);
      if (e.only && (n = e.only), e.except && (n = Pt(n, e.except)), !((a = this.response) != null && a.url))
        return;
      const o = (e.method ?? "get").toLowerCase(), r = e.data ?? {};
      (s = e.onStart) == null || s.call(e), ve({
        url: this.response.url,
        method: o,
        data: o === "get" ? {} : r,
        params: o === "get" ? r : {},
        headers: {
          ...e.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": _e(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": se.value
        }
      }).then((i) => {
        var l;
        this.updateFromResponseData(i.data), (l = e.onSuccess) == null || l.call(e, i);
      }).catch((i) => {
        var l;
        (l = e.onError) == null || l.call(e, i);
      }).finally(() => {
        var i;
        (i = e.onFinish) == null || i.call(e);
      });
    });
    S(this, "mergeOrMatchItems", (e, n, o, r) => {
      const a = r.find((u) => u.split(".").slice(0, -1).join(".") === o);
      if (!a)
        return [...Array.isArray(e) ? e : [], ...n];
      const s = a.split(".").pop() || "", i = Array.isArray(e) ? e : [], l = /* @__PURE__ */ new Map();
      return i.forEach((u) => {
        u && typeof u == "object" && s in u ? l.set(u[s], u) : l.set(Symbol(), u);
      }), n.forEach((u) => {
        u && typeof u == "object" && s in u ? l.set(u[s], u) : l.set(Symbol(), u);
      }), Array.from(l.values());
    });
    S(this, "updateFromResponseData", (e) => {
      const n = (e == null ? void 0 : e.meta) ?? e ?? {}, o = n.mergeProps || [], r = n.deepMergeProps || [], a = n.matchPropsOn || [], s = { ...(e == null ? void 0 : e.props) || {} };
      o.forEach((l) => {
        const u = s[l];
        Array.isArray(u) ? s[l] = this.mergeOrMatchItems(this.props.value[l] || [], u, l, a) : typeof u == "object" && u !== null && (s[l] = {
          ...this.props.value[l] || {},
          ...u
        });
      });
      const i = (l, u, d) => Array.isArray(u) ? this.mergeOrMatchItems(l, u, d, a) : typeof u == "object" && u !== null ? Object.keys(u).reduce((f, v) => (f[v] = i(l ? l[v] : void 0, u[v], `${d}.${v}`), f), { ...l || {} }) : u;
      r.forEach((l) => {
        const u = s[l], d = this.props.value[l];
        s[l] = i(d, u, l);
      }), Object.assign(this.props.value, { ...this.props.value, ...s }), this.response = { ...this.response || {}, ...e || {}, props: { ...this.props.value } };
    });
    S(this, "updateProps", (e) => {
      var n;
      this.updateFromResponseData({ props: e, meta: ((n = this.response) == null ? void 0 : n.meta) || {} });
    });
    if (this.id = n.id ?? _e(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = h(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = r, this.afterLeaveCallback = a, J.value[this.id]) {
      this.config = {
        ...this.config,
        ...J.value[this.id].config ?? {}
      };
      const s = J.value[this.id].onClose, i = J.value[this.id].onAfterLeave;
      s && (this.onCloseCallback = r ? () => {
        r(), s();
      } : s), i && (this.afterLeaveCallback = a ? () => {
        a(), i();
      } : i), delete J.value[this.id];
    }
    this.index = D(() => A.value.findIndex((s) => s.id === this.id)), this.onTopOfStack = D(() => {
      var i;
      return A.value.length < 2 ? !0 : ((i = A.value.map((l) => ({ id: l.id, shouldRender: l.shouldRender })).reverse().find((l) => l.shouldRender)) == null ? void 0 : i.id) === this.id;
    });
  }
}
function kt(t, e) {
  ye.value[t] = { name: t, callback: e };
}
function Ft(t, e, n, o) {
  if (!ye.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const r = $e(null, {}, e, n, o);
  return r.name = t, ye.value[t].callback(r), r;
}
function Je(t, e = {}, n = null, o = null) {
  return he(t.component).then((r) => $e(vt(r), t, e, n, o));
}
function Rt(t, e, n = {}, o = {}, r = {}, a = null, s = null, i = "brackets", l = !1, u = null, d = null, f = null) {
  const v = _e();
  return new Promise((c, p) => {
    if (t.startsWith("#")) {
      c(Ft(t.substring(1), r, a, s));
      return;
    }
    const [y, x] = Mt(e, t || "", n, i);
    let g = l && A.value.length === 0;
    if (A.value.length === 0 && (se.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Xe().version,
      "X-InertiaUI-Modal": v,
      "X-InertiaUI-Modal-Use-Router": g ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": se.value
    }, g)
      return J.value[v] = { config: r, onClose: a, onAfterLeave: s }, re.visit(y, {
        method: e,
        data: x,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError(...b) {
          f == null || f(...b), p(...b);
        },
        onStart(...b) {
          u == null || u(...b);
        },
        onSuccess(...b) {
          d == null || d(...b);
        },
        onBefore: () => {
          Ae.value[v] = c;
        }
      });
    u == null || u(), ve({ url: y, method: e, data: x, headers: o }).then((b) => {
      d == null || d(b), c(Je(b.data, r, a, s));
    }).catch((...b) => {
      f == null || f(...b), p(...b);
    });
  });
}
function qt(t) {
  var n, o;
  const e = (o = (n = t.response) == null ? void 0 : n.meta) == null ? void 0 : o.deferredProps;
  e && Object.keys(e).forEach((r) => {
    t.reload({ only: e[r] });
  });
}
function $e(t, e, n, o, r) {
  const a = new Tt(t, e, n, o, r);
  return A.value.push(a), qt(a), K(() => a.show()), a;
}
const Nt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Eo = (t, e) => (e.resolveComponent && (he = e.resolveComponent), () => Y($t, () => Y(t, e)));
function le() {
  return {
    setComponentResolver: Lt,
    getBaseUrl: () => se.value,
    setBaseUrl: (t) => se.value = t,
    stack: mt(A),
    push: $e,
    pushFromResponseData: Je,
    closeAll: () => [...A.value].reverse().forEach((t) => t.close()),
    reset: () => A.value = [],
    visit: Rt,
    registerLocalModal: kt,
    removeLocalModal: (t) => delete ye.value[t],
    onModalOnBase(t) {
      const e = Ae.value[t.id];
      e && (e(t), delete Ae.value[t.id]);
    }
  };
}
function _o() {
  return $(ie("modalContext", null));
}
const Ao = {
  __name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: !0
    }
  },
  setup(t) {
    const e = t, n = ie("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = D(() => (Array.isArray(e.data) ? e.data : [e.data]).every((a) => n.value.props[a] !== void 0));
    return (r, a) => o.value ? O(r.$slots, "default", { key: 0 }) : O(r.$slots, "fallback", { key: 1 });
  }
}, Ut = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "HeadlessModal",
  props: {
    name: {
      type: String,
      required: !1
    },
    // The slideover prop in on top because we need to know if it's a slideover
    // before we can determine the defaule value of other props
    slideover: {
      type: Boolean,
      default: null
    },
    closeButton: {
      type: Boolean,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      default: null
    },
    position: {
      type: String,
      default: null
    }
  },
  emits: ["modal-event", "focus", "blur", "close", "success"],
  setup(t, { expose: e, emit: n }) {
    const o = t, r = le(), a = o.name ? h({}) : ie("modalContext"), s = D(() => {
      var p;
      const c = ((p = a.value.config) == null ? void 0 : p.slideover) ?? o.slideover ?? Be("type") === "slideover";
      return {
        slideover: c,
        closeButton: o.closeButton ?? z(c, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? z(c, "closeExplicitly"),
        maxWidth: o.maxWidth ?? z(c, "maxWidth"),
        paddingClasses: o.paddingClasses ?? z(c, "paddingClasses"),
        panelClasses: o.panelClasses ?? z(c, "panelClasses"),
        position: o.position ?? z(c, "position"),
        ...a.value.config
      };
    });
    o.name && (r.registerLocalModal(o.name, function(c) {
      a.value = c, u();
    }), me(() => {
      r.removeLocalModal(o.name);
    })), te(() => {
      o.name || u();
    });
    const i = h(null);
    me(() => {
      var c;
      return (c = i.value) == null ? void 0 : c.call(i);
    });
    const l = je();
    function u() {
      i.value = a.value.registerEventListenersFromAttrs(l);
    }
    const d = n;
    function f(c, ...p) {
      d("modal-event", c, ...p);
    }
    e({
      emit: f,
      afterLeave: () => {
        var c;
        return (c = a.value) == null ? void 0 : c.afterLeave();
      },
      close: () => {
        var c;
        return (c = a.value) == null ? void 0 : c.close();
      },
      reload: (...c) => {
        var p;
        return (p = a.value) == null ? void 0 : p.reload(...c);
      },
      setOpen: (...c) => {
        var p;
        return (p = a.value) == null ? void 0 : p.setOpen(...c);
      },
      getChildModal: () => {
        var c;
        return (c = a.value) == null ? void 0 : c.getChildModal();
      },
      getParentModal: () => {
        var c;
        return (c = a.value) == null ? void 0 : c.getParentModal();
      },
      get config() {
        var c;
        return (c = a.value) == null ? void 0 : c.config;
      },
      get id() {
        var c;
        return (c = a.value) == null ? void 0 : c.id;
      },
      get index() {
        var c;
        return (c = a.value) == null ? void 0 : c.index;
      },
      get isOpen() {
        var c;
        return (c = a.value) == null ? void 0 : c.isOpen;
      },
      get modalContext() {
        var c;
        return (c = a.value) == null ? void 0 : c.modalContext;
      },
      get onTopOfStack() {
        var c;
        return (c = a.value) == null ? void 0 : c.onTopOfStack;
      },
      get shouldRender() {
        var c;
        return (c = a.value) == null ? void 0 : c.shouldRender;
      }
    }), P(
      () => {
        var c;
        return (c = a.value) == null ? void 0 : c.onTopOfStack;
      },
      (c, p) => {
        c && !p ? d("focus") : !c && p && d("blur");
      }
    ), P(
      () => {
        var c;
        return (c = a.value) == null ? void 0 : c.isOpen;
      },
      (c) => {
        d(c ? "success" : "close");
      },
      { immediate: !0 }
    );
    const v = D(() => {
      var c;
      return (c = r.stack.value.find((p) => p.shouldRender && p.index > a.value.index)) == null ? void 0 : c.index;
    });
    return (c, p) => (w(), H(Se, null, [
      m(a).shouldRender ? O(c.$slots, "default", {
        key: 0,
        id: m(a).id,
        afterLeave: m(a).afterLeave,
        close: m(a).close,
        config: s.value,
        emit: f,
        getChildModal: m(a).getChildModal,
        getParentModal: m(a).getParentModal,
        index: m(a).index,
        isOpen: m(a).isOpen,
        modalContext: m(a),
        onTopOfStack: m(a).onTopOfStack,
        reload: m(a).reload,
        setOpen: m(a).setOpen,
        shouldRender: m(a).shouldRender
      }) : F("", !0),
      v.value ? (w(), E(Ge, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : F("", !0)
    ], 64));
  }
});
function Ye(t, e) {
  const n = typeof t == "string" && !e ? `${t}Context` : e, o = Symbol(n);
  return [(s) => {
    const i = ie(o, s);
    if (i || i === null) return i;
    throw new Error(`Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(", ")}` : `\`${t}\``}`);
  }, (s) => (Me(o, s), s)];
}
function j() {
  let t = document.activeElement;
  if (t == null) return null;
  for (; t != null && t.shadowRoot != null && t.shadowRoot.activeElement != null; ) t = t.shadowRoot.activeElement;
  return t;
}
function Ze(t, e, n) {
  const o = n.originalEvent.target, r = new CustomEvent(t, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  e && o.addEventListener(t, e, { once: !0 }), o.dispatchEvent(r);
}
function Le(t) {
  return t ? t.flatMap((e) => e.type === Se ? Le(e.children) : [e]) : [];
}
const [Qe, Do] = Ye("ConfigProvider");
function et(t) {
  return yt() ? (gt(t), !0) : !1;
}
function Wt(t) {
  let e = !1, n;
  const o = Ke(!0);
  return (...r) => (e || (n = o.run(() => t(...r)), e = !0), n);
}
function jt(t) {
  let e = 0, n, o;
  const r = () => {
    e -= 1, o && e <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (e += 1, o || (o = Ke(!0), n = o.run(() => t(...a))), et(r), n);
}
const X = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Kt = (t) => typeof t < "u", Vt = Object.prototype.toString, Ht = (t) => Vt.call(t) === "[object Object]", Fe = /* @__PURE__ */ Xt();
function Xt() {
  var t, e;
  return X && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function zt(t) {
  return ne();
}
function be(t) {
  return Array.isArray(t) ? t : [t];
}
function Gt(t, e) {
  zt() && me(t, e);
}
function Jt(t, e, n) {
  return P(
    t,
    e,
    {
      ...n,
      immediate: !0
    }
  );
}
const Te = X ? window : void 0;
function xe(t) {
  var e;
  const n = $(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
function tt(...t) {
  const e = [], n = () => {
    e.forEach((i) => i()), e.length = 0;
  }, o = (i, l, u, d) => (i.addEventListener(l, u, d), () => i.removeEventListener(l, u, d)), r = D(() => {
    const i = be($(t[0])).filter((l) => l != null);
    return i.every((l) => typeof l != "string") ? i : void 0;
  }), a = Jt(
    () => {
      var i, l;
      return [
        (l = (i = r.value) == null ? void 0 : i.map((u) => xe(u))) != null ? l : [Te].filter((u) => u != null),
        be($(r.value ? t[1] : t[0])),
        be(m(r.value ? t[2] : t[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        $(r.value ? t[3] : t[2])
      ];
    },
    ([i, l, u, d]) => {
      if (n(), !(i != null && i.length) || !(l != null && l.length) || !(u != null && u.length))
        return;
      const f = Ht(d) ? { ...d } : d;
      e.push(
        ...i.flatMap(
          (v) => l.flatMap(
            (c) => u.map((p) => o(v, c, p, f))
          )
        )
      );
    },
    { flush: "post" }
  ), s = () => {
    a(), n();
  };
  return et(n), s;
}
function Yt() {
  const t = ht(!1), e = ne();
  return e && te(() => {
    t.value = !0;
  }, e), t;
}
function Zt(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function Qt(...t) {
  let e, n, o = {};
  t.length === 3 ? (e = t[0], n = t[1], o = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, n = t[0], o = t[1]) : (e = t[0], n = t[1]) : (e = !0, n = t[0]);
  const {
    target: r = Te,
    eventName: a = "keydown",
    passive: s = !1,
    dedupe: i = !1
  } = o, l = Zt(e);
  return tt(r, a, (d) => {
    d.repeat && $(i) || l(d) && n(d);
  }, s);
}
function en(t) {
  return JSON.parse(JSON.stringify(t));
}
function tn(t, e, n, o = {}) {
  var r, a, s;
  const {
    clone: i = !1,
    passive: l = !1,
    eventName: u,
    deep: d = !1,
    defaultValue: f,
    shouldEmit: v
  } = o, c = ne(), p = n || (c == null ? void 0 : c.emit) || ((r = c == null ? void 0 : c.$emit) == null ? void 0 : r.bind(c)) || ((s = (a = c == null ? void 0 : c.proxy) == null ? void 0 : a.$emit) == null ? void 0 : s.bind(c == null ? void 0 : c.proxy));
  let y = u;
  y = y || `update:${e.toString()}`;
  const x = (_) => i ? typeof i == "function" ? i(_) : en(_) : _, g = () => Kt(t[e]) ? x(t[e]) : f, b = (_) => {
    v ? v(_) && p(y, _) : p(y, _);
  };
  if (l) {
    const _ = g(), T = h(_);
    let k = !1;
    return P(
      () => t[e],
      (B) => {
        k || (k = !0, T.value = x(B), K(() => k = !1));
      }
    ), P(
      T,
      (B) => {
        !k && (B !== t[e] || d) && b(B);
      },
      { deep: d }
    ), T;
  } else
    return D({
      get() {
        return g();
      },
      set(_) {
        b(_);
      }
    });
}
function we(t) {
  if (t === null || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0;
}
function De(t, e, n = ".", o) {
  if (!we(e))
    return De(t, {}, n, o);
  const r = Object.assign({}, e);
  for (const a in t) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const s = t[a];
    s != null && (o && o(r, a, s, n) || (Array.isArray(s) && Array.isArray(r[a]) ? r[a] = [...s, ...r[a]] : we(s) && we(r[a]) ? r[a] = De(
      s,
      r[a],
      (n ? `${n}.` : "") + a.toString(),
      o
    ) : r[a] = s));
  }
  return r;
}
function nn(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((n, o) => De(n, o, "", t), {})
  );
}
const on = nn(), an = jt(() => {
  const t = h(/* @__PURE__ */ new Map()), e = h(), n = D(() => {
    for (const s of t.value.values()) if (s) return !0;
    return !1;
  }), o = Qe({ scrollBody: h(!0) });
  let r = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", Fe && (r == null || r()), e.value = void 0;
  };
  return P(n, (s, i) => {
    var f;
    if (!X) return;
    if (!s) {
      i && a();
      return;
    }
    e.value === void 0 && (e.value = document.body.style.overflow);
    const l = window.innerWidth - document.documentElement.clientWidth, u = {
      padding: l,
      margin: 0
    }, d = (f = o.scrollBody) != null && f.value ? typeof o.scrollBody.value == "object" ? on({
      padding: o.scrollBody.value.padding === !0 ? l : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? l : o.scrollBody.value.margin
    }, u) : u : {
      padding: 0,
      margin: 0
    };
    l > 0 && (document.body.style.paddingRight = typeof d.padding == "number" ? `${d.padding}px` : String(d.padding), document.body.style.marginRight = typeof d.margin == "number" ? `${d.margin}px` : String(d.margin), document.documentElement.style.setProperty("--scrollbar-width", `${l}px`), document.body.style.overflow = "hidden"), Fe && (r = tt(document, "touchmove", (v) => sn(v), { passive: !1 })), K(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), t;
});
function rn(t) {
  const e = Math.random().toString(36).substring(2, 7), n = an();
  n.value.set(e, t);
  const o = D({
    get: () => n.value.get(e) ?? !1,
    set: (r) => n.value.set(e, r)
  });
  return Gt(() => {
    n.value.delete(e);
  }), o;
}
function nt(t) {
  const e = window.getComputedStyle(t);
  if (e.overflowX === "scroll" || e.overflowY === "scroll" || e.overflowX === "auto" && t.clientWidth < t.scrollWidth || e.overflowY === "auto" && t.clientHeight < t.scrollHeight) return !0;
  {
    const n = t.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : nt(n);
  }
}
function sn(t) {
  const e = t || window.event, n = e.target;
  return n instanceof Element && nt(n) ? !1 : e.touches.length > 1 ? !0 : (e.preventDefault && e.cancelable && e.preventDefault(), !1);
}
function ke(t) {
  const e = ne(), n = e == null ? void 0 : e.type.emits, o = {};
  return n != null && n.length || console.warn(`No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`), n == null || n.forEach((r) => {
    o[xt(bt(r))] = (...a) => t(r, ...a);
  }), o;
}
function R() {
  const t = ne(), e = h(), n = D(() => {
    var s, i;
    return ["#text", "#comment"].includes((s = e.value) == null ? void 0 : s.$el.nodeName) ? (i = e.value) == null ? void 0 : i.$el.nextElementSibling : xe(e);
  }), o = Object.assign({}, t.exposed), r = {};
  for (const s in t.props) Object.defineProperty(r, s, {
    enumerable: !0,
    configurable: !0,
    get: () => t.props[s]
  });
  if (Object.keys(o).length > 0) for (const s in o) Object.defineProperty(r, s, {
    enumerable: !0,
    configurable: !0,
    get: () => o[s]
  });
  Object.defineProperty(r, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => t.vnode.el
  }), t.exposed = r;
  function a(s) {
    e.value = s, s && (Object.defineProperty(r, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => s instanceof Element ? s : s.$el
    }), t.exposed = r);
  }
  return {
    forwardRef: a,
    currentRef: e,
    currentElement: n
  };
}
var ln = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, G = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), fe = {}, Ce = 0, ot = function(t) {
  return t && (t.host || ot(t.parentNode));
}, un = function(t, e) {
  return e.map(function(n) {
    if (t.contains(n))
      return n;
    var o = ot(n);
    return o && t.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, dn = function(t, e, n, o) {
  var r = un(e, Array.isArray(t) ? t : [t]);
  fe[n] || (fe[n] = /* @__PURE__ */ new WeakMap());
  var a = fe[n], s = [], i = /* @__PURE__ */ new Set(), l = new Set(r), u = function(f) {
    !f || i.has(f) || (i.add(f), u(f.parentNode));
  };
  r.forEach(u);
  var d = function(f) {
    !f || l.has(f) || Array.prototype.forEach.call(f.children, function(v) {
      if (i.has(v))
        d(v);
      else
        try {
          var c = v.getAttribute(o), p = c !== null && c !== "false", y = (G.get(v) || 0) + 1, x = (a.get(v) || 0) + 1;
          G.set(v, y), a.set(v, x), s.push(v), y === 1 && p && ce.set(v, !0), x === 1 && v.setAttribute(n, "true"), p || v.setAttribute(o, "true");
        } catch (g) {
          console.error("aria-hidden: cannot operate on ", v, g);
        }
    });
  };
  return d(e), i.clear(), Ce++, function() {
    s.forEach(function(f) {
      var v = G.get(f) - 1, c = a.get(f) - 1;
      G.set(f, v), a.set(f, c), v || (ce.has(f) || f.removeAttribute(o), ce.delete(f)), c || f.removeAttribute(n);
    }), Ce--, Ce || (G = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), fe = {});
  };
}, cn = function(t, e, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(t) ? t : [t]), r = ln(t);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), dn(o, r, n, "aria-hidden")) : function() {
    return null;
  };
};
function fn(t) {
  let e;
  P(() => xe(t), (n) => {
    n ? e = cn(n) : e && e();
  }), U(() => {
    e && e();
  });
}
let pn = 0;
function Re(t, e = "reka") {
  var o;
  if ("useId" in ue) return `${e}-${(o = ue.useId) == null ? void 0 : o.call(ue)}`;
  const n = Qe({ useId: void 0 });
  return n.useId ? `${e}-${n.useId()}` : `${e}-${++pn}`;
}
function mn(t, e) {
  const n = h(t);
  function o(a) {
    return e[n.value][a] ?? n.value;
  }
  return {
    state: n,
    dispatch: (a) => {
      n.value = o(a);
    }
  };
}
function vn(t, e) {
  var x;
  const n = h({}), o = h("none"), r = h(t), a = t.value ? "mounted" : "unmounted";
  let s;
  const i = ((x = e.value) == null ? void 0 : x.ownerDocument.defaultView) ?? Te, { state: l, dispatch: u } = mn(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), d = (g) => {
    var b;
    if (X) {
      const _ = new CustomEvent(g, {
        bubbles: !1,
        cancelable: !1
      });
      (b = e.value) == null || b.dispatchEvent(_);
    }
  };
  P(t, async (g, b) => {
    var T;
    const _ = b !== g;
    if (await K(), _) {
      const k = o.value, B = pe(e.value);
      g ? (u("MOUNT"), d("enter"), B === "none" && d("after-enter")) : B === "none" || B === "undefined" || ((T = n.value) == null ? void 0 : T.display) === "none" ? (u("UNMOUNT"), d("leave"), d("after-leave")) : b && k !== B ? (u("ANIMATION_OUT"), d("leave")) : (u("UNMOUNT"), d("after-leave"));
    }
  }, { immediate: !0 });
  const f = (g) => {
    const b = pe(e.value), _ = b.includes(g.animationName), T = l.value === "mounted" ? "enter" : "leave";
    if (g.target === e.value && _ && (d(`after-${T}`), u("ANIMATION_END"), !r.value)) {
      const k = e.value.style.animationFillMode;
      e.value.style.animationFillMode = "forwards", s = i == null ? void 0 : i.setTimeout(() => {
        var B;
        ((B = e.value) == null ? void 0 : B.style.animationFillMode) === "forwards" && (e.value.style.animationFillMode = k);
      });
    }
    g.target === e.value && b === "none" && u("ANIMATION_END");
  }, v = (g) => {
    g.target === e.value && (o.value = pe(e.value));
  }, c = P(e, (g, b) => {
    g ? (n.value = getComputedStyle(g), g.addEventListener("animationstart", v), g.addEventListener("animationcancel", f), g.addEventListener("animationend", f)) : (u("ANIMATION_END"), s !== void 0 && (i == null || i.clearTimeout(s)), b == null || b.removeEventListener("animationstart", v), b == null || b.removeEventListener("animationcancel", f), b == null || b.removeEventListener("animationend", f));
  }, { immediate: !0 }), p = P(l, () => {
    const g = pe(e.value);
    o.value = l.value === "mounted" ? g : "none";
  });
  return U(() => {
    c(), p();
  }), { isPresent: D(() => ["mounted", "unmountSuspended"].includes(l.value)) };
}
function pe(t) {
  return t && getComputedStyle(t).animationName || "none";
}
var at = M({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(t, { slots: e, expose: n }) {
    var u;
    const { present: o, forceMount: r } = Ve(t), a = h(), { isPresent: s } = vn(o, a);
    n({ present: s });
    let i = e.default({ present: s.value });
    i = Le(i || []);
    const l = ne();
    if (i && (i == null ? void 0 : i.length) > 1) {
      const d = (u = l == null ? void 0 : l.parent) != null && u.type.name ? `<${l.parent.type.name} />` : "component";
      throw new Error([
        `Detected an invalid children for \`${d}\` for  \`Presence\` component.`,
        "",
        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
        "You can apply a few solutions:",
        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((f) => `  - ${f}`).join(`
`)
      ].join(`
`));
    }
    return () => r.value || o.value || s.value ? Y(e.default({ present: s.value })[0], { ref: (d) => {
      const f = xe(d);
      return typeof (f == null ? void 0 : f.hasAttribute) > "u" || (f != null && f.hasAttribute("data-reka-popper-content-wrapper") ? a.value = f.firstElementChild : a.value = f), f;
    } }) : null;
  }
});
const yn = M({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: n }) {
    return () => {
      var l;
      if (!n.default) return null;
      const o = Le(n.default()), r = o.findIndex((u) => u.type !== wt);
      if (r === -1) return o;
      const a = o[r];
      (l = a.props) == null || delete l.ref;
      const s = a.props ? L(e, a.props) : e, i = Ct({
        ...a,
        props: {}
      }, s);
      return o.length === 1 ? i : (o[r] = i, o);
    };
  }
}), gn = [
  "area",
  "img",
  "input"
], oe = M({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(t, { attrs: e, slots: n }) {
    const o = t.asChild ? "template" : t.as;
    return typeof o == "string" && gn.includes(o) ? () => Y(o, e) : o !== "template" ? () => Y(t.as, e, { default: n.default }) : () => Y(yn, e, { default: n.default });
  }
}), [V, hn] = Ye("DialogRoot");
var xn = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["update:open"],
  setup(t, { emit: e }) {
    const n = t, r = tn(n, "open", e, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), a = h(), s = h(), { modal: i } = Ve(n);
    return hn({
      open: r,
      modal: i,
      openModal: () => {
        r.value = !0;
      },
      onOpenChange: (l) => {
        r.value = l;
      },
      onOpenToggle: () => {
        r.value = !r.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: a,
      contentElement: s
    }), (l, u) => O(l.$slots, "default", {
      open: m(r),
      close: () => r.value = !1
    });
  }
}), bn = xn, wn = /* @__PURE__ */ M({
  __name: "DialogClose",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(t) {
    const e = t;
    R();
    const n = V();
    return (o, r) => (w(), E(m(oe), L(e, {
      type: o.as === "button" ? "button" : void 0,
      onClick: r[0] || (r[0] = (a) => m(n).onOpenChange(!1))
    }), {
      default: C(() => [O(o.$slots, "default")]),
      _: 3
    }, 16, ["type"]));
  }
}), Cn = wn;
const On = "dismissableLayer.pointerDownOutside", En = "dismissableLayer.focusOutside";
function rt(t, e) {
  const n = e.closest("[data-dismissable-layer]"), o = t.dataset.dismissableLayer === "" ? t : t.querySelector("[data-dismissable-layer]"), r = Array.from(t.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(n && (o === n || r.indexOf(o) < r.indexOf(n)));
}
function _n(t, e, n = !0) {
  var s;
  const o = ((s = e == null ? void 0 : e.value) == null ? void 0 : s.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), r = h(!1), a = h(() => {
  });
  return ee((i) => {
    if (!X || !$(n)) return;
    const l = async (d) => {
      const f = d.target;
      if (!(!(e != null && e.value) || !f)) {
        if (rt(e.value, f)) {
          r.value = !1;
          return;
        }
        if (d.target && !r.value) {
          let c = function() {
            Ze(On, t, v);
          };
          const v = { originalEvent: d };
          d.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = c, o.addEventListener("click", a.value, { once: !0 })) : c();
        } else o.removeEventListener("click", a.value);
        r.value = !1;
      }
    }, u = window.setTimeout(() => {
      o.addEventListener("pointerdown", l);
    }, 0);
    i(() => {
      window.clearTimeout(u), o.removeEventListener("pointerdown", l), o.removeEventListener("click", a.value);
    });
  }), { onPointerDownCapture: () => {
    $(n) && (r.value = !0);
  } };
}
function An(t, e, n = !0) {
  var a;
  const o = ((a = e == null ? void 0 : e.value) == null ? void 0 : a.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), r = h(!1);
  return ee((s) => {
    if (!X || !$(n)) return;
    const i = async (l) => {
      if (!(e != null && e.value)) return;
      await K(), await K();
      const u = l.target;
      !e.value || !u || rt(e.value, u) || l.target && !r.value && Ze(En, t, { originalEvent: l });
    };
    o.addEventListener("focusin", i), s(() => o.removeEventListener("focusin", i));
  }), {
    onFocusCapture: () => {
      $(n) && (r.value = !0);
    },
    onBlurCapture: () => {
      $(n) && (r.value = !1);
    }
  };
}
const q = He({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var Dn = /* @__PURE__ */ M({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "dismiss"
  ],
  setup(t, { emit: e }) {
    const n = t, o = e, { forwardRef: r, currentElement: a } = R(), s = D(() => {
      var p;
      return ((p = a.value) == null ? void 0 : p.ownerDocument) ?? globalThis.document;
    }), i = D(() => q.layersRoot), l = D(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), u = D(() => q.layersWithOutsidePointerEventsDisabled.size > 0), d = D(() => {
      const p = Array.from(i.value), [y] = [...q.layersWithOutsidePointerEventsDisabled].slice(-1), x = p.indexOf(y);
      return l.value >= x;
    }), f = _n(async (p) => {
      const y = [...q.branches].some((x) => x == null ? void 0 : x.contains(p.target));
      !d.value || y || (o("pointerDownOutside", p), o("interactOutside", p), await K(), p.defaultPrevented || o("dismiss"));
    }, a), v = An((p) => {
      [...q.branches].some((x) => x == null ? void 0 : x.contains(p.target)) || (o("focusOutside", p), o("interactOutside", p), p.defaultPrevented || o("dismiss"));
    }, a);
    Qt("Escape", (p) => {
      l.value === i.value.size - 1 && (o("escapeKeyDown", p), p.defaultPrevented || o("dismiss"));
    });
    let c;
    return ee((p) => {
      a.value && (n.disableOutsidePointerEvents && (q.layersWithOutsidePointerEventsDisabled.size === 0 && (c = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = "none"), q.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), p(() => {
        n.disableOutsidePointerEvents && q.layersWithOutsidePointerEventsDisabled.size === 1 && (s.value.body.style.pointerEvents = c);
      }));
    }), ee((p) => {
      p(() => {
        a.value && (i.value.delete(a.value), q.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (p, y) => (w(), E(m(oe), {
      ref: m(r),
      "as-child": p.asChild,
      as: p.as,
      "data-dismissable-layer": "",
      style: Ot({ pointerEvents: u.value ? d.value ? "auto" : "none" : void 0 }),
      onFocusCapture: m(v).onFocusCapture,
      onBlurCapture: m(v).onBlurCapture,
      onPointerdownCapture: m(f).onPointerDownCapture
    }, {
      default: C(() => [O(p.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "style",
      "onFocusCapture",
      "onBlurCapture",
      "onPointerdownCapture"
    ]));
  }
}), Mn = Dn;
const Sn = Wt(() => h([]));
function In() {
  const t = Sn();
  return {
    add(e) {
      const n = t.value[0];
      e !== n && (n == null || n.pause()), t.value = qe(t.value, e), t.value.unshift(e);
    },
    remove(e) {
      var n;
      t.value = qe(t.value, e), (n = t.value[0]) == null || n.resume();
    }
  };
}
function qe(t, e) {
  const n = [...t], o = n.indexOf(e);
  return o !== -1 && n.splice(o, 1), n;
}
function Pn(t) {
  return t.filter((e) => e.tagName !== "A");
}
const Oe = "focusScope.autoFocusOnMount", Ee = "focusScope.autoFocusOnUnmount", Ne = {
  bubbles: !1,
  cancelable: !0
};
function Bn(t, { select: e = !1 } = {}) {
  const n = j();
  for (const o of t)
    if (N(o, { select: e }), j() !== n) return !0;
}
function $n(t) {
  const e = st(t), n = Ue(e, t), o = Ue(e.reverse(), t);
  return [n, o];
}
function st(t) {
  const e = [], n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, { acceptNode: (o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n.nextNode(); ) e.push(n.currentNode);
  return e;
}
function Ue(t, e) {
  for (const n of t) if (!Ln(n, { upTo: e })) return n;
}
function Ln(t, { upTo: e }) {
  if (getComputedStyle(t).visibility === "hidden") return !0;
  for (; t; ) {
    if (e !== void 0 && t === e) return !1;
    if (getComputedStyle(t).display === "none") return !0;
    t = t.parentElement;
  }
  return !1;
}
function Tn(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function N(t, { select: e = !1 } = {}) {
  if (t && t.focus) {
    const n = j();
    t.focus({ preventScroll: !0 }), t !== n && Tn(t) && e && t.select();
  }
}
var kn = /* @__PURE__ */ M({
  __name: "FocusScope",
  props: {
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    trapped: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(t, { emit: e }) {
    const n = t, o = e, { currentRef: r, currentElement: a } = R(), s = h(null), i = In(), l = He({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    ee((d) => {
      if (!X) return;
      const f = a.value;
      if (!n.trapped) return;
      function v(x) {
        if (l.paused || !f) return;
        const g = x.target;
        f.contains(g) ? s.value = g : N(s.value, { select: !0 });
      }
      function c(x) {
        if (l.paused || !f) return;
        const g = x.relatedTarget;
        g !== null && (f.contains(g) || N(s.value, { select: !0 }));
      }
      function p(x) {
        f.contains(s.value) || N(f);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", c);
      const y = new MutationObserver(p);
      f && y.observe(f, {
        childList: !0,
        subtree: !0
      }), d(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", c), y.disconnect();
      });
    }), ee(async (d) => {
      const f = a.value;
      if (await K(), !f) return;
      i.add(l);
      const v = j();
      if (!f.contains(v)) {
        const p = new CustomEvent(Oe, Ne);
        f.addEventListener(Oe, (y) => o("mountAutoFocus", y)), f.dispatchEvent(p), p.defaultPrevented || (Bn(Pn(st(f)), { select: !0 }), j() === v && N(f));
      }
      d(() => {
        f.removeEventListener(Oe, (x) => o("mountAutoFocus", x));
        const p = new CustomEvent(Ee, Ne), y = (x) => {
          o("unmountAutoFocus", x);
        };
        f.addEventListener(Ee, y), f.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || N(v ?? document.body, { select: !0 }), f.removeEventListener(Ee, y), i.remove(l);
        }, 0);
      });
    });
    function u(d) {
      if (!n.loop && !n.trapped || l.paused) return;
      const f = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, v = j();
      if (f && v) {
        const c = d.currentTarget, [p, y] = $n(c);
        p && y ? !d.shiftKey && v === y ? (d.preventDefault(), n.loop && N(p, { select: !0 })) : d.shiftKey && v === p && (d.preventDefault(), n.loop && N(y, { select: !0 })) : v === c && d.preventDefault();
      }
    }
    return (d, f) => (w(), E(m(oe), {
      ref_key: "currentRef",
      ref: r,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: u
    }, {
      default: C(() => [O(d.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), Fn = kn;
function Rn(t) {
  return t ? "open" : "closed";
}
const qn = "DialogTitle", Nn = "DialogContent";
function Un({ titleName: t = qn, contentName: e = Nn, componentLink: n = "dialog.html#title", titleId: o, descriptionId: r, contentElement: a }) {
  const s = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.reka-ui.com/docs/components/${n}`, i = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  te(() => {
    var d;
    document.getElementById(o) || console.warn(s);
    const u = (d = a.value) == null ? void 0 : d.getAttribute("aria-describedby");
    r && u && (document.getElementById(r) || console.warn(i));
  });
}
var Wn = /* @__PURE__ */ M({
  __name: "DialogContentImpl",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(t, { emit: e }) {
    const n = t, o = e, r = V(), { forwardRef: a, currentElement: s } = R();
    return r.titleId || (r.titleId = Re(void 0, "reka-dialog-title")), r.descriptionId || (r.descriptionId = Re(void 0, "reka-dialog-description")), te(() => {
      r.contentElement = s, j() !== document.body && (r.triggerElement.value = j());
    }), process.env.NODE_ENV !== "production" && Un({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: r.titleId,
      descriptionId: r.descriptionId,
      contentElement: s
    }), (i, l) => (w(), E(m(Fn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: l[5] || (l[5] = (u) => o("openAutoFocus", u)),
      onUnmountAutoFocus: l[6] || (l[6] = (u) => o("closeAutoFocus", u))
    }, {
      default: C(() => [I(m(Mn), L({
        id: m(r).contentId,
        ref: m(a),
        as: i.as,
        "as-child": i.asChild,
        "disable-outside-pointer-events": i.disableOutsidePointerEvents,
        role: "dialog",
        "aria-describedby": m(r).descriptionId,
        "aria-labelledby": m(r).titleId,
        "data-state": m(Rn)(m(r).open.value)
      }, i.$attrs, {
        onDismiss: l[0] || (l[0] = (u) => m(r).onOpenChange(!1)),
        onEscapeKeyDown: l[1] || (l[1] = (u) => o("escapeKeyDown", u)),
        onFocusOutside: l[2] || (l[2] = (u) => o("focusOutside", u)),
        onInteractOutside: l[3] || (l[3] = (u) => o("interactOutside", u)),
        onPointerDownOutside: l[4] || (l[4] = (u) => o("pointerDownOutside", u))
      }), {
        default: C(() => [O(i.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "as",
        "as-child",
        "disable-outside-pointer-events",
        "aria-describedby",
        "aria-labelledby",
        "data-state"
      ])]),
      _: 3
    }, 8, ["trapped"]));
  }
}), it = Wn, jn = /* @__PURE__ */ M({
  __name: "DialogContentModal",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(t, { emit: e }) {
    const n = t, o = e, r = V(), a = ke(o), { forwardRef: s, currentElement: i } = R();
    return fn(i), (l, u) => (w(), E(it, L({
      ...n,
      ...m(a)
    }, {
      ref: m(s),
      "trap-focus": m(r).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: u[0] || (u[0] = (d) => {
        var f;
        d.defaultPrevented || (d.preventDefault(), (f = m(r).triggerElement.value) == null || f.focus());
      }),
      onPointerDownOutside: u[1] || (u[1] = (d) => {
        const f = d.detail.originalEvent, v = f.button === 0 && f.ctrlKey === !0;
        (f.button === 2 || v) && d.preventDefault();
      }),
      onFocusOutside: u[2] || (u[2] = (d) => {
        d.preventDefault();
      })
    }), {
      default: C(() => [O(l.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Kn = jn, Vn = /* @__PURE__ */ M({
  __name: "DialogContentNonModal",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(t, { emit: e }) {
    const n = t, r = ke(e);
    R();
    const a = V(), s = h(!1), i = h(!1);
    return (l, u) => (w(), E(it, L({
      ...n,
      ...m(r)
    }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (d) => {
        var f;
        d.defaultPrevented || (s.value || (f = m(a).triggerElement.value) == null || f.focus(), d.preventDefault()), s.value = !1, i.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (d) => {
        var c;
        d.defaultPrevented || (s.value = !0, d.detail.originalEvent.type === "pointerdown" && (i.value = !0));
        const f = d.target;
        ((c = m(a).triggerElement.value) == null ? void 0 : c.contains(f)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && i.value && d.preventDefault();
      })
    }), {
      default: C(() => [O(l.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Hn = Vn, Xn = /* @__PURE__ */ M({
  __name: "DialogContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(t, { emit: e }) {
    const n = t, o = e, r = V(), a = ke(o), { forwardRef: s } = R();
    return (i, l) => (w(), E(m(at), { present: i.forceMount || m(r).open.value }, {
      default: C(() => [m(r).modal.value ? (w(), E(Kn, L({
        key: 0,
        ref: m(s)
      }, {
        ...n,
        ...m(a),
        ...i.$attrs
      }), {
        default: C(() => [O(i.$slots, "default")]),
        _: 3
      }, 16)) : (w(), E(Hn, L({
        key: 1,
        ref: m(s)
      }, {
        ...n,
        ...m(a),
        ...i.$attrs
      }), {
        default: C(() => [O(i.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), lt = Xn, zn = /* @__PURE__ */ M({
  __name: "DialogOverlayImpl",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(t) {
    const e = V();
    return rn(!0), R(), (n, o) => (w(), E(m(oe), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": m(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: C(() => [O(n.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-state"
    ]));
  }
}), Gn = zn, Jn = /* @__PURE__ */ M({
  __name: "DialogOverlay",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(t) {
    const e = V(), { forwardRef: n } = R();
    return (o, r) => {
      var a;
      return (a = m(e)) != null && a.modal.value ? (w(), E(m(at), {
        key: 0,
        present: o.forceMount || m(e).open.value
      }, {
        default: C(() => [I(Gn, L(o.$attrs, {
          ref: m(n),
          as: o.as,
          "as-child": o.asChild
        }), {
          default: C(() => [O(o.$slots, "default")]),
          _: 3
        }, 16, ["as", "as-child"])]),
        _: 3
      }, 8, ["present"])) : F("v-if", !0);
    };
  }
}), Yn = Jn, Zn = /* @__PURE__ */ M({
  __name: "Teleport",
  props: {
    to: {
      type: null,
      required: !1,
      default: "body"
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(t) {
    const e = Yt();
    return (n, o) => m(e) || n.forceMount ? (w(), E(Et, {
      key: 0,
      to: n.to,
      disabled: n.disabled,
      defer: n.defer
    }, [O(n.$slots, "default")], 8, [
      "to",
      "disabled",
      "defer"
    ])) : F("v-if", !0);
  }
}), Qn = Zn, eo = /* @__PURE__ */ M({
  __name: "DialogPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (w(), E(m(Qn), _t(At(e)), {
      default: C(() => [O(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), to = eo, no = /* @__PURE__ */ M({
  __name: "DialogTitle",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "h2"
    }
  },
  setup(t) {
    const e = t, n = V();
    return R(), (o, r) => (w(), E(m(oe), L(e, { id: m(n).titleId }), {
      default: C(() => [O(o.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), ut = no, oo = /* @__PURE__ */ M({
  __name: "VisuallyHidden",
  props: {
    feature: {
      type: String,
      required: !1,
      default: "focusable"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(t) {
    return (e, n) => (w(), E(m(oe), {
      as: e.as,
      "as-child": e.asChild,
      "aria-hidden": e.feature === "focusable" ? "true" : void 0,
      "data-hidden": e.feature === "fully-hidden" ? "" : void 0,
      tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
      style: {
        position: "absolute",
        border: 0,
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: C(() => [O(e.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), dt = oo;
const ct = {
  __name: "CloseButton",
  setup(t) {
    return (e, n) => (w(), E(m(Cn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: C(() => [...n[0] || (n[0] = [
        W("span", { class: "sr-only" }, "Close", -1),
        W("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          W("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])]),
      _: 1
    }));
  }
}, ao = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, ro = ["data-inertiaui-modal-entered"], so = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, io = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = h(!1);
    return (n, o) => (w(), H("div", ao, [
      W("div", {
        class: Z(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.config.position === "top",
          "items-center": t.config.position === "center",
          "items-end": t.config.position === "bottom"
        }])
      }, [
        I(Ie, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (r) => e.value = !0),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: C(() => [
            I(m(lt), {
              "aria-describedby": void 0,
              class: Z({
                "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !t.modalContext.onTopOfStack,
                "sm:max-w-sm": t.config.maxWidth == "sm",
                "sm:max-w-md": t.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": t.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": t.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: o[0] || (o[0] = (r) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && r.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (r) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && r.preventDefault();
              })
            }, {
              default: C(() => [
                I(m(dt), { "as-child": "" }, {
                  default: C(() => [
                    I(m(ut))
                  ]),
                  _: 1
                }),
                W("div", {
                  class: Z(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (w(), H("div", so, [
                    I(ct)
                  ])) : F("", !0),
                  O(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 10, ro)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, lo = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, uo = ["data-inertiaui-modal-entered"], co = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, fo = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = h(!1);
    return (n, o) => (w(), H("div", lo, [
      W("div", {
        class: Z(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": t.config.position === "left",
          "justify-end rtl:justify-start": t.config.position === "right"
        }])
      }, [
        I(Ie, {
          appear: "",
          "enter-from-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (r) => e.value = !0),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: C(() => [
            I(m(lt), {
              "aria-describedby": void 0,
              class: Z({
                "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !t.modalContext.onTopOfStack,
                "sm:max-w-sm": t.config.maxWidth == "sm",
                "sm:max-w-md": t.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": t.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": t.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: o[0] || (o[0] = (r) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && r.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (r) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && r.preventDefault();
              })
            }, {
              default: C(() => [
                I(m(dt), { "as-child": "" }, {
                  default: C(() => [
                    I(m(ut))
                  ]),
                  _: 1
                }),
                W("div", {
                  class: Z(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (w(), H("div", co, [
                    I(ct)
                  ])) : F("", !0),
                  O(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 10, uo)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, po = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], mo = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, Mo = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(t, { expose: e }) {
    const n = h(null), o = h(!1);
    e({
      afterLeave: () => {
        var a;
        return (a = n.value) == null ? void 0 : a.afterLeave();
      },
      close: () => {
        var a;
        return (a = n.value) == null ? void 0 : a.close();
      },
      emit: (...a) => {
        var s;
        return (s = n.value) == null ? void 0 : s.emit(...a);
      },
      getChildModal: () => {
        var a;
        return (a = n.value) == null ? void 0 : a.getChildModal();
      },
      getParentModal: () => {
        var a;
        return (a = n.value) == null ? void 0 : a.getParentModal();
      },
      reload: (...a) => {
        var s;
        return (s = n.value) == null ? void 0 : s.reload(...a);
      },
      setOpen: (...a) => {
        var s;
        return (s = n.value) == null ? void 0 : s.setOpen(...a);
      },
      get config() {
        var a;
        return (a = n.value) == null ? void 0 : a.config;
      },
      get id() {
        var a;
        return (a = n.value) == null ? void 0 : a.id;
      },
      get index() {
        var a;
        return (a = n.value) == null ? void 0 : a.index;
      },
      get isOpen() {
        var a;
        return (a = n.value) == null ? void 0 : a.isOpen;
      },
      get modalContext() {
        var a;
        return (a = n.value) == null ? void 0 : a.modalContext;
      },
      get onTopOfStack() {
        var a;
        return (a = n.value) == null ? void 0 : a.onTopOfStack;
      },
      get shouldRender() {
        var a;
        return (a = n.value) == null ? void 0 : a.shouldRender;
      }
    });
    let r;
    return We(() => {
      r = new MutationObserver(() => {
        document.body.style.pointerEvents === "none" && (document.body.style.pointerEvents = "");
      }), r.observe(document.body, { attributes: !0, attributeFilter: ["style"] });
    }), U(() => {
      r && (r.disconnect(), r = null);
    }), (a, s) => (w(), E(Ut, {
      ref_key: "modal",
      ref: n,
      onSuccess: s[2] || (s[2] = (i) => a.$emit("success")),
      onClose: s[3] || (s[3] = (i) => a.$emit("close")),
      onFocus: s[4] || (s[4] = (i) => a.$emit("focus")),
      onBlur: s[5] || (s[5] = (i) => a.$emit("blur"))
    }, {
      default: C(({
        afterLeave: i,
        close: l,
        config: u,
        emit: d,
        getChildModal: f,
        getParentModal: v,
        id: c,
        index: p,
        isOpen: y,
        modalContext: x,
        onTopOfStack: g,
        reload: b,
        setOpen: _,
        shouldRender: T
      }) => [
        I(m(bn), {
          open: y,
          "onUpdate:open": _
        }, {
          default: C(() => [
            I(m(to), null, {
              default: C(() => [
                W("div", {
                  "data-inertiaui-modal-id": c,
                  "data-inertiaui-modal-index": p,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !g
                }, [
                  p === 0 && g ? (w(), E(Ie, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: s[0] || (s[0] = (k) => o.value = !0)
                  }, {
                    default: C(() => [
                      I(m(Yn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : F("", !0),
                  p > 0 && g ? (w(), H("div", mo)) : F("", !0),
                  (w(), E(Pe(u != null && u.slideover ? fo : io), {
                    "modal-context": x,
                    config: u,
                    onAfterLeave: s[1] || (s[1] = (k) => a.$emit("after-leave"))
                  }, {
                    default: C(() => [
                      O(a.$slots, "default", {
                        id: c,
                        afterLeave: i,
                        close: l,
                        config: u,
                        emit: d,
                        getChildModal: f,
                        getParentModal: v,
                        index: p,
                        isOpen: y,
                        modalContext: x,
                        onTopOfStack: g,
                        reload: b,
                        setOpen: _,
                        shouldRender: T
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, po)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["open", "onUpdate:open"])
      ]),
      _: 3
    }, 512));
  }
}, So = {
  __name: "ModalLink",
  props: {
    href: {
      type: String,
      required: !0
    },
    method: {
      type: String,
      default: "get"
    },
    data: {
      type: Object,
      default: () => ({})
    },
    as: {
      type: String,
      default: "a"
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets"
    },
    navigate: {
      type: Boolean,
      default: null
    },
    // Passthrough to Modal.vue
    closeButton: {
      type: Boolean,
      required: !1,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      required: !1,
      default: null
    },
    maxWidth: {
      type: String,
      required: !1,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    position: {
      type: String,
      required: !1,
      default: null
    },
    slideover: {
      type: Boolean,
      required: !1,
      default: null
    }
  },
  emits: ["after-leave", "blur", "close", "error", "focus", "start", "success"],
  setup(t, { emit: e }) {
    const n = t, o = h(!1), r = le(), a = h(null);
    Me("modalContext", a);
    const s = e, i = h(!1), l = D(() => n.navigate ?? Be("navigate"));
    P(
      () => {
        var y;
        return (y = a.value) == null ? void 0 : y.onTopOfStack;
      },
      (y) => {
        a.value && (y && i.value ? s("focus") : y || s("blur"), i.value = !y);
      }
    );
    const u = h(null);
    me(() => {
      var y;
      (y = u.value) == null || y.call(u);
    });
    const d = je();
    function f() {
      u.value = a.value.registerEventListenersFromAttrs(d);
    }
    P(a, (y, x) => {
      y && !x && (f(), s("success"));
    });
    function v() {
      s("close");
    }
    function c() {
      a.value = null, s("after-leave");
    }
    function p() {
      o.value || (n.href.startsWith("#") || (o.value = !0, s("start")), r.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        Bt(ze(n, Nt)),
        v,
        c,
        n.queryStringArrayFormat,
        l.value
      ).then((y) => {
        a.value = y;
      }).catch((y) => s("error", y)).finally(() => o.value = !1));
    }
    return (y, x) => (w(), E(Pe(t.as), L(m(d), {
      href: t.href,
      onClick: Dt(p, ["prevent"])
    }), {
      default: C(() => [
        O(y.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, Io = {
  __name: "WhenVisible",
  props: {
    data: [String, Array],
    params: Object,
    buffer: { type: Number, default: 0 },
    as: { type: String, default: "div" },
    always: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, n = ie("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = h(!1), r = h(!1), a = h(null);
    let s = null;
    const i = () => {
      if (e.data)
        return { only: Array.isArray(e.data) ? e.data : [e.data] };
      if (!e.params)
        throw new Error("You must provide either a `data` or `params` prop.");
      return e.params;
    };
    return te(() => {
      a.value && (s = new IntersectionObserver(
        (u) => {
          if (!u[0].isIntersecting || (e.always || s.disconnect(), r.value))
            return;
          r.value = !0;
          const d = i();
          n.value.reload({
            ...d,
            onStart: () => {
              var f;
              r.value = !0, (f = d.onStart) == null || f.call(d);
            },
            onFinish: () => {
              var f;
              o.value = !0, r.value = !1, (f = d.onFinish) == null || f.call(d);
            }
          });
        },
        { rootMargin: `${e.buffer}px` }
      ), s.observe(a.value));
    }), U(() => s == null ? void 0 : s.disconnect()), (u, d) => (w(), E(Pe(e.as), {
      ref_key: "rootElement",
      ref: a
    }, {
      default: C(() => [
        o.value ? O(u.$slots, "default", { key: 0 }) : O(u.$slots, "fallback", { key: 1 })
      ]),
      _: 3
    }, 512));
  }
};
function Po(t, e = {}) {
  return le().visit(
    t,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Be("navigate"),
    e.onStart,
    e.onSuccess,
    e.onError
  ).then((n) => {
    const o = e.listeners ?? {};
    return Object.keys(o).forEach((r) => {
      const a = r.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[r]);
    }), n;
  });
}
export {
  Ao as Deferred,
  Ut as HeadlessModal,
  Mo as Modal,
  So as ModalLink,
  $t as ModalRoot,
  Io as WhenVisible,
  Be as getConfig,
  Oo as initFromPageProps,
  Co as putConfig,
  Eo as renderApp,
  wo as resetConfig,
  _o as useModal,
  le as useModalStack,
  Po as visitModal
};

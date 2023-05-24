var d = Object.defineProperty;
var v = (a, e, t) => e in a ? d(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var h = (a, e, t) => (v(a, typeof e != "symbol" ? e + "" : e, t), t);
class p {
  constructor() {
    h(this, "devices", {});
    h(this, "css", {});
    h(this, "rules", {});
  }
  get uid() {
    return Math.floor(Math.random() * 1e5);
  }
  sortDevices() {
    const e = this, t = Object.keys(e.devices);
    if (t.length < 2)
      return;
    t.sort((s, n) => e.devices[s] - e.devices[n]);
    const r = {};
    t.forEach(function(s) {
      r[s] = e.devices[s];
    }), e.devices = r;
  }
  removeMultiWhiteSpace(e) {
    return typeof e != "string" ? e : e.trim().replace(/ +(?= )/g, "");
  }
  responsiveToHash(e) {
    let t = [], r;
    for (r in e)
      t.push(r + "_" + e[r]);
    return t.join("-");
  }
  hashToResponsive(e) {
    const t = {};
    return e.split("-").filter(String).forEach((s) => {
      const [n, i] = s.split(/_(.+)/);
      t[n] = this.devices[i];
    }), t;
  }
  sortHashes() {
    const e = this, { rules: t, hashToResponsive: r } = e, s = Object.keys(t);
    if (s.length < 2)
      return t;
    s.sort(function(i, l) {
      if (i === "all")
        return -1;
      if (l === "all")
        return 1;
      let o = r.call(e, i), c = r.call(e, l);
      if (o.max && c.max)
        return c.max - o.max;
      if (o.min && c.min)
        return c.min - o.min;
      const u = o.max ?? o.min;
      return (c.max ?? c.min) - u;
    });
    const n = {};
    return s.forEach((i) => {
      n[i] = t[i];
    }), n;
  }
  createResponsiveFormat(e) {
    const t = this.hashToResponsive.call(this, e), r = [];
    for (let s in t)
      r.push("(" + s + "-width:" + t[s] + "px)");
    return "@media" + r.join(" and ");
  }
  convertProperties(e) {
    let t = "";
    for (let r in e)
      t += r + ":" + e[r] + ";";
    return t;
  }
  convertRules(e) {
    let t = "";
    for (let r in e) {
      const s = this.convertProperties(e[r]);
      s && (t += r + "{" + s + "}");
    }
    return t;
  }
}
class y extends p {
  addDevice(e, t) {
    this.devices[e] = t, this.sortDevices();
  }
  addCSS(e) {
    this.css[this.uid] = e;
  }
  addRule(e, t, r) {
    const s = this;
    let n = "all", i = {};
    if (e = s.removeMultiWhiteSpace(e), t = s.removeMultiWhiteSpace(t), r && typeof r == "object" && (n = s.responsiveToHash(r)), s.rules[n] || (s.rules[n] = {}), !t && e) {
      const l = e.match(/[^{]+\{[^}]+}/g);
      if (!l)
        return;
      for (let o in l) {
        const c = l[o].match(/([^{]+)\{([^}]+)}/);
        if (c) {
          const u = c[1], f = c[2];
          s.addRule(u, f, r);
        }
      }
      return;
    }
    if (s.rules[n][e] || (s.rules[n][e] = {}), typeof t == "string") {
      i = t.split(";").filter(String);
      const l = {};
      try {
        let o;
        for (o in i) {
          const [c, u] = i[o].split(/:(.*)?/);
          l[c.trim()] = u.trim().replace(";", "");
        }
      } catch {
        return;
      }
      i = l;
    }
    Object.assign(s.rules[n][e], i);
  }
  clear() {
    this.rules = {}, this.css = {};
  }
  output() {
    const { css: e, convertRules: t, createResponsiveFormat: r, sortHashes: s } = this, n = s.call(this);
    let i = "";
    for (let l in e)
      i += e[l];
    for (let l in n) {
      let o = t.call(this, n[l]);
      l !== "all" && (o = r.call(this, l) + "{" + o + "}"), i += o;
    }
    return i.replace(/\s+/g, " ");
  }
}
export {
  y as default
};

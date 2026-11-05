/* Isaac Martínez Ríos — portafolio. Idioma + figuras. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* ---------- Idioma ---------- */

  function currentLang() { return root.getAttribute("lang") === "en" ? "en" : "es"; }

  function applyLang(lang, persist) {
    root.setAttribute("lang", lang);
    var t = root.getAttribute("data-title-" + lang);
    if (t) document.title = t;
    var d = root.getAttribute("data-desc-" + lang);
    var meta = document.querySelector('meta[name="description"]');
    if (d && meta) meta.setAttribute("content", d);
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    if (persist) { try { localStorage.setItem("lang", lang); } catch (e) {} }
    renderAll();
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-set-lang"), true); });
  });

  var T = {
    es: {
      stationsHint: "Pasa el cursor o toca una estación para ver su balance.",
      balance: "balance", trips: "viajes",
      drains: "se vacía", fills: "acumula",
      fill: "Fill rate", inv: "Inventario promedio (USD miles)",
      clasica: "Clásica (media móvil)", seasonal: "SeasonalNaive", lgbm: "Modelo (LightGBM)",
      at95: "Meta: 95 %", frontierHint: "Pasa el cursor sobre la gráfica para comparar políticas.",
      atFill: "Con fill rate de", needs: "necesita",
      costHint: "Costo mediano de la misma canasta de 16 alimentos, por cadena.",
      perWeek: "por semana", vsCheapest: "más que Chedraui",
      hour: "Hora del día", out: "Salidas", inn: "Llegadas", perStation: "viajes por estación y hora",
      hourHint: "Pasa el cursor para ver cada hora.",
      lead: "Lead time", days: "días", lessInv: "menos inventario",
      share: "de la diferencia total entre cadenas",
      prod: { milanesa: "Milanesa de res", limon: "Limón sin semilla", jitomate: "Jitomate saladette", cebolla: "Cebolla blanca", papa: "Papa alfa o blanca" },
      dow: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    },
    en: {
      stationsHint: "Hover or tap a station to see its balance.",
      balance: "balance", trips: "trips",
      drains: "drains", fills: "fills up",
      fill: "Fill rate", inv: "Average inventory (USD thousands)",
      clasica: "Classic (moving average)", seasonal: "SeasonalNaive", lgbm: "Model (LightGBM)",
      at95: "Target: 95%", frontierHint: "Hover over the chart to compare policies.",
      atFill: "At a fill rate of", needs: "needs",
      costHint: "Median cost of the same 16-item food basket, by chain.",
      perWeek: "per week", vsCheapest: "more than Chedraui",
      hour: "Hour of day", out: "Departures", inn: "Arrivals", perStation: "trips per station per hour",
      hourHint: "Hover to read each hour.",
      lead: "Lead time", days: "days", lessInv: "less inventory",
      share: "of the total gap between chains",
      prod: { milanesa: "Beef cutlet", limon: "Seedless lime", jitomate: "Roma tomato", cebolla: "White onion", papa: "Potato" },
      dow: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  };
  function t(k) { return T[currentLang()][k]; }
  function nf(x, dec) {
    return Number(x).toLocaleString(currentLang() === "en" ? "en-US" : "es-MX", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }

  /* ---------- SVG helpers ---------- */

  var NS = "http://www.w3.org/2000/svg";
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function text(parent, x, y, str, attrs) {
    var n = el("text", Object.assign({ x: x, y: y }, attrs || {}), parent);
    n.textContent = str;
    return n;
  }
  function scale(d0, d1, r0, r1) { return function (v) { return r0 + (v - d0) / (d1 - d0) * (r1 - r0); }; }
  function svgFor(host, w, h) {
    host.innerHTML = "";
    return el("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": host.getAttribute("data-label-" + currentLang()) || "" }, host);
  }
  function wOf(host) { return Math.max(300, Math.round(host.clientWidth || 620)); }
  function readout(fig) { return fig.querySelector(".fig__readout"); }
  function setHint(fig, k) { var r = readout(fig); if (r) { r.setAttribute("data-hint", t(k)); } }

  var C = {
    indigo: "#3d3a9e", ochre: "#b27a1e", ref: "#a19f97", ink: "#1a1c22", ink3: "#626674", rule: "#d4d1c8", paper: "#f5f4f0"
  };

  /* ---------- Figura: mapa de estaciones ECOBICI ---------- */

  function drawStations(host, data) {
    var fig = host.closest(".fig");
    var st = data.ecobici.stations;
    var lons = st.map(function (s) { return s[0]; }), lats = st.map(function (s) { return s[1]; });
    var minLon = Math.min.apply(null, lons), maxLon = Math.max.apply(null, lons);
    var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
    var k = Math.cos((minLat + maxLat) / 2 * Math.PI / 180);
    var W = 520, pad = 14;
    var H = Math.round((W - 2 * pad) * (maxLat - minLat) / ((maxLon - minLon) * k)) + 2 * pad;
    var svg = svgFor(host, W, H);
    var x = scale(minLon, maxLon, pad, W - pad), y = scale(minLat, maxLat, H - pad, pad);
    var maxAbs = 3235;
    var g = el("g", {}, svg);
    var pts = [];
    st.slice().sort(function (a, b) { return Math.abs(a[2]) - Math.abs(b[2]); }).forEach(function (s, i) {
      var m = Math.min(1, Math.abs(s[2]) / 1500);
      var px = x(s[0]), py = y(s[1]);
      var c = el("circle", {
        cx: px.toFixed(1), cy: py.toFixed(1), r: (2.4 + m * 4.2).toFixed(2),
        fill: s[2] < 0 ? C.indigo : C.ochre, "fill-opacity": (0.28 + m * 0.62).toFixed(2),
        class: "dot-in", style: "--d:" + Math.round((py / H) * 600) + "ms"
      }, g);
      pts.push({ x: px, y: py, s: s, c: c });
    });
    var ring = el("circle", { r: 9, fill: "none", stroke: C.ink, "stroke-width": 1.5, opacity: 0 }, svg);
    var out = readout(fig);
    function pick(evt) {
      var r = svg.getBoundingClientRect();
      var px = (evt.clientX - r.left) / r.width * W, py = (evt.clientY - r.top) / r.height * H;
      var best = null, bd = 400;
      pts.forEach(function (p) { var d = (p.x - px) * (p.x - px) + (p.y - py) * (p.y - py); if (d < bd) { bd = d; best = p; } });
      if (!best) { ring.setAttribute("opacity", 0); return; }
      ring.setAttribute("cx", best.x); ring.setAttribute("cy", best.y); ring.setAttribute("opacity", 1);
      var v = best.s[2];
      out.textContent = best.s[3] + " · " + t("balance") + " " + (v > 0 ? "+" : "") + nf(v) + " " + t("trips") + " (" + (v < 0 ? t("drains") : t("fills")) + ")";
    }
    svg.addEventListener("pointermove", pick);
    svg.addEventListener("pointerdown", pick);
    svg.addEventListener("pointerleave", function () { ring.setAttribute("opacity", 0); out.textContent = ""; });
    setHint(fig, "stationsHint");
  }

  /* ---------- Figura: curva servicio–inventario ---------- */

  function drawFrontier(host, data) {
    var fig = host.closest(".fig");
    var fr = data.inventario.frontera;
    var W = wOf(host), H = Math.max(260, Math.min(380, Math.round(W * 0.62))), m = { l: 52, r: 16, t: 16, b: 44 };
    var svg = svgFor(host, W, H);
    var x0 = 0.85, x1 = 0.99, y0 = 40, y1 = 110;
    var x = scale(x0, x1, m.l, W - m.r), y = scale(y0, y1, H - m.b, m.t);
    var ax = el("g", { class: "ax" }, svg);
    [40, 60, 80, 100].forEach(function (v) {
      el("line", { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v) }, ax);
      text(ax, m.l - 8, y(v) + 4, nf(v), { "text-anchor": "end" });
    });
    [0.86, 0.9, 0.94, 0.98].forEach(function (v) {
      text(ax, x(v), H - m.b + 18, nf(v * 100) + " %", { "text-anchor": "middle" });
    });
    text(ax, m.l, H - 6, t("fill") + " →", {});
    text(ax, m.l - 44, m.t - 4, "", {});
    el("line", { x1: x(0.95), x2: x(0.95), y1: m.t, y2: H - m.b, stroke: C.ink3, "stroke-dasharray": "3 4" }, svg);
    text(svg, x(0.95) + 6, m.t + 12, t("at95"), { class: "lbl lbl--muted" });
    var order = [["seasonal", C.ref, 1.5], ["clasica", C.ink3, 2], ["lgbm", C.indigo, 3]];
    var series = {};
    order.forEach(function (o) {
      var pts = fr[o[0]].filter(function (p) { return p[0] >= x0 && p[0] <= x1 && p[1] / 1000 <= y1; });
      series[o[0]] = pts;
      var d = pts.map(function (p, i) { return (i ? "L" : "M") + x(p[0]).toFixed(1) + " " + y(p[1] / 1000).toFixed(1); }).join("");
      var path = el("path", { d: d, fill: "none", stroke: o[1], "stroke-width": o[2], "stroke-linejoin": "round", "stroke-linecap": "round", class: "draw" }, svg);
      var len = Math.ceil(path.getTotalLength ? path.getTotalLength() : 1200);
      path.style.setProperty("--len", len);
    });
    var lab = el("g", {}, svg);
    function interp(pts, fx) {
      for (var i = 1; i < pts.length; i++) {
        if (pts[i][0] >= fx) {
          var a = pts[i - 1], b = pts[i], k = (fx - a[0]) / (b[0] - a[0]);
          return a[1] + k * (b[1] - a[1]);
        }
      }
      return null;
    }
    var vline = el("line", { y1: m.t, y2: H - m.b, stroke: C.ink, opacity: 0 }, svg);
    var mk = { lgbm: el("circle", { r: 4.5, fill: C.indigo, opacity: 0 }, svg), clasica: el("circle", { r: 4, fill: C.ink3, opacity: 0 }, svg) };
    var out = readout(fig);
    function show(fx) {
      var a = interp(series.lgbm, fx), b = interp(series.clasica, fx);
      if (a == null || b == null) return;
      vline.setAttribute("x1", x(fx)); vline.setAttribute("x2", x(fx)); vline.setAttribute("opacity", 0.35);
      mk.lgbm.setAttribute("cx", x(fx)); mk.lgbm.setAttribute("cy", y(a / 1000)); mk.lgbm.setAttribute("opacity", 1);
      mk.clasica.setAttribute("cx", x(fx)); mk.clasica.setAttribute("cy", y(b / 1000)); mk.clasica.setAttribute("opacity", 1);
      out.textContent = t("atFill") + " " + nf(fx * 100, 1) + " %: " + t("lgbm") + " " + t("needs") + " USD " + nf(a / 1000, 1) + "k · " + t("clasica") + " USD " + nf(b / 1000, 1) + "k (" + nf((a / b - 1) * 100, 0) + " %)";
    }
    svg.addEventListener("pointermove", function (evt) {
      var r = svg.getBoundingClientRect();
      var fx = scale(m.l, W - m.r, x0, x1)((evt.clientX - r.left) / r.width * W);
      if (fx > 0.86 && fx < 0.975) show(fx);
    });
    svg.addEventListener("pointerleave", function () {
      vline.setAttribute("opacity", 0); mk.lgbm.setAttribute("opacity", 0); mk.clasica.setAttribute("opacity", 0); out.textContent = "";
    });
    var leg = fig.querySelector(".legend");
    if (leg) leg.innerHTML = order.slice().reverse().map(function (o) { return '<li><i class="line" style="background:' + o[1] + '"></i>' + t(o[0]) + "</li>"; }).join("");
    setHint(fig, "frontierHint");
    text(svg, 6, m.t + 4, "", {});
    var yl = text(svg, 0, 0, t("inv"), { class: "ax", transform: "translate(12 " + (H - m.b) + ") rotate(-90)", fill: C.ink3, "font-size": 11 });
    yl.setAttribute("fill", C.ink3);
  }

  /* ---------- Figura: costo de la canasta por cadena (gráfica de puntos) ---------- */

  function drawBasket(host, data) {
    var fig = host.closest(".fig");
    var rows = data.canasta.cadenas;
    var W = wOf(host), rowH = 54, m = { l: Math.min(168, Math.round(W * 0.36)), r: 70, t: 10, b: 36 };
    var H = m.t + rows.length * rowH + m.b;
    var svg = svgFor(host, W, H);
    var x = scale(640, 720, m.l, W - m.r);
    var ax = el("g", { class: "ax" }, svg);
    [640, 660, 680, 700, 720].forEach(function (v) {
      el("line", { x1: x(v), x2: x(v), y1: m.t, y2: H - m.b }, ax);
      text(ax, x(v), H - m.b + 18, "$" + v, { "text-anchor": "middle" });
    });
    var base = rows[0][1];
    rows.forEach(function (r, i) {
      var cy = m.t + i * rowH + rowH / 2;
      text(svg, 0, cy + 4, r[0], { class: "lbl", "font-size": 13 });
      el("line", { x1: x(base), x2: x(r[1]), y1: cy, y2: cy, stroke: i ? C.ref : C.indigo, "stroke-width": 2, class: "draw", style: "--len:" + Math.ceil(x(r[1]) - x(base) + 1) }, svg);
      el("circle", { cx: x(r[1]), cy: cy, r: 7, fill: i ? C.ink : C.indigo, class: "dot-in", style: "--d:" + (300 + i * 120) + "ms" }, svg);
      text(svg, x(r[1]) + 14, cy + 4, "$" + nf(r[1], 2), { class: "lbl", "font-size": 13 });
      if (i) text(svg, x(r[1]) + 14, cy + 20, "+" + nf((r[1] / base - 1) * 100, 1) + " %", { class: "lbl lbl--muted", "font-size": 11 });
    });
    var out = readout(fig);
    if (out) out.setAttribute("data-hint", t("costHint"));
  }

  /* ---------- Figura: perfil horario ECOBICI ---------- */

  function drawHourly(host, data) {
    var fig = host.closest(".fig");
    var hr = data.ecobici.hourly;
    var W = wOf(host), H = Math.max(230, Math.min(320, Math.round(W * 0.5))), m = { l: 40, r: 14, t: 18, b: 44 };
    var svg = svgFor(host, W, H);
    var x = scale(0, 23, m.l, W - m.r), y = scale(0, 6.5, H - m.b, m.t);
    var ax = el("g", { class: "ax" }, svg);
    [0, 2, 4, 6].forEach(function (v) {
      el("line", { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), class: v ? "" : "zero" }, ax);
      text(ax, m.l - 8, y(v) + 4, v, { "text-anchor": "end" });
    });
    [0, 4, 8, 12, 17, 20, 23].forEach(function (h) { text(ax, x(h), H - m.b + 18, (h < 10 ? "0" : "") + h + ":00", { "text-anchor": "middle" }); });
    text(ax, m.l, H - 6, t("hour") + " →", {});
    [[8, 8], [17, 18]].forEach(function (p) {
      el("rect", { x: x(p[0]) - 9, width: x(p[1]) - x(p[0]) + 18, y: m.t, height: H - m.b - m.t, fill: "#e4e3f2" }, svg);
    });
    function line(idx, color, w) {
      var d = hr.map(function (h, i) { return (i ? "L" : "M") + x(h[0]).toFixed(1) + " " + y(h[idx]).toFixed(1); }).join("");
      var p = el("path", { d: d, fill: "none", stroke: color, "stroke-width": w, "stroke-linejoin": "round", class: "draw" }, svg);
      p.style.setProperty("--len", Math.ceil(p.getTotalLength ? p.getTotalLength() : 1200));
    }
    line(2, C.ochre, 2);
    line(1, C.indigo, 3);
    var leg = fig.querySelector(".legend");
    if (leg) leg.innerHTML = '<li><i class="line" style="background:' + C.indigo + '"></i>' + t("out") + '</li><li><i class="line" style="background:' + C.ochre + '"></i>' + t("inn") + "</li>";
    var dot = el("circle", { r: 4.5, fill: C.indigo, opacity: 0 }, svg);
    var out = readout(fig);
    svg.addEventListener("pointermove", function (evt) {
      var r = svg.getBoundingClientRect();
      var h = Math.round(scale(m.l, W - m.r, 0, 23)((evt.clientX - r.left) / r.width * W));
      if (h < 0 || h > 23) return;
      var row = hr[h];
      dot.setAttribute("cx", x(h)); dot.setAttribute("cy", y(row[1])); dot.setAttribute("opacity", 1);
      out.textContent = (h < 10 ? "0" : "") + h + ":00 · " + t("out") + " " + nf(row[1], 2) + " · " + t("inn") + " " + nf(row[2], 2) + " " + t("perStation");
    });
    svg.addEventListener("pointerleave", function () { dot.setAttribute("opacity", 0); out.textContent = ""; });
    setHint(fig, "hourHint");
  }

  /* ---------- Barras horizontales simples ---------- */

  function drawBars(host, rows, max, fmt, color) {
    var W = wOf(host), rowH = 40, m = { l: Math.min(168, Math.round(W * 0.36)), r: 62, t: 4, b: 8 };
    var H = m.t + rows.length * rowH + m.b;
    var svg = svgFor(host, W, H);
    var x = scale(0, max, m.l, W - m.r);
    el("line", { x1: m.l, x2: m.l, y1: 0, y2: H, stroke: C.ink3 }, svg);
    rows.forEach(function (r, i) {
      var cy = m.t + i * rowH;
      text(svg, 0, cy + rowH / 2 + 4, r[0], { class: "lbl", "font-size": 13 });
      el("rect", { x: m.l, y: cy + 8, height: rowH - 16, width: Math.max(1, x(Math.abs(r[1])) - m.l), fill: color, class: "dot-in", style: "--d:" + i * 120 + "ms" }, svg);
      text(svg, x(Math.abs(r[1])) + 8, cy + rowH / 2 + 4, fmt(r[1]), { class: "lbl", "font-size": 13 });
    });
  }

  function drawLeadTime(host, data) {
    var rows = data.inventario.lead_time.map(function (r) { return [t("lead") + " " + r[0] + " " + t("days"), r[1]]; });
    drawBars(host, rows, 25, function (v) { return nf(v) + " %"; }, C.indigo);
  }
  function drawProducts(host, data) {
    var rows = data.canasta.productos.map(function (r) { return [t("prod")[r[0]], r[1]]; });
    drawBars(host, rows, 24, function (v) { return nf(v, 1) + " %"; }, C.indigo);
  }
  function drawDow(host, data) {
    var d = T[currentLang()].dow;
    var rows = data.ecobici.dow.map(function (r) { return [d[r[0]], r[1]]; });
    drawBars(host, rows, 5.5, function (v) { return nf(v, 2); }, C.indigo);
  }

  /* ---------- Orquestación ---------- */

  var DRAW = { stations: drawStations, frontier: drawFrontier, basket: drawBasket, hourly: drawHourly, leadtime: drawLeadTime, products: drawProducts, dow: drawDow };
  var DATA = null;

  function renderAll() {
    if (!DATA) return;
    document.querySelectorAll("[data-chart]").forEach(function (host) {
      var fn = DRAW[host.getAttribute("data-chart")];
      if (fn) { try { fn(host, DATA); } catch (e) { console.error(e); } }
    });
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pending = [];
  function reveal() {
    var vh = window.innerHeight || 800;
    pending = pending.filter(function (f) {
      var r = f.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > 0) {
        setTimeout(function () { f.classList.remove("is-pending"); }, 40);
        return false;
      }
      return true;
    });
    if (!pending.length) window.removeEventListener("scroll", reveal);
  }

  var charts = document.querySelectorAll("[data-chart]");
  if (charts.length) {
    var src = document.body.getAttribute("data-figures") || "/data/figures.json";
    fetch(src).then(function (r) { return r.json(); }).then(function (d) {
      DATA = d;
      if (!reduce) {
        document.querySelectorAll(".fig").forEach(function (f) {
          if (f.querySelector("[data-chart]")) { f.classList.add("is-pending"); pending.push(f); }
        });
      }
      renderAll();
      if (pending.length) { window.addEventListener("scroll", reveal, { passive: true }); reveal(); }
    }).catch(function (e) { console.error("figures", e); });
  }

  var rz, lastW = window.innerWidth;
  window.addEventListener("resize", function () {
    clearTimeout(rz);
    rz = setTimeout(function () { if (Math.abs(window.innerWidth - lastW) > 40) { lastW = window.innerWidth; renderAll(); } }, 200);
  });

  applyLang(currentLang(), false);
})();

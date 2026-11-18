// \0rolldown/runtime.js
var e = Object.defineProperty, t = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, n = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
};
// src/lib/format.ts
function r(e) {
	let t = Math.max(0, Math.round(e));
	if (t < 60) return `${t}s`;
	let n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = String(t % 60).padStart(2, "0");
	return n ? `${n}:${String(r).padStart(2, "0")}:${i}` : `${r}:${i}`;
}
var i = t((() => {}));
// src/lib/settings.ts
function a(e) {
	let t = e && typeof e == "object" ? e : {}, n = (e, t, n, r) => typeof e == "number" && Number.isFinite(e) ? Math.min(r, Math.max(n, e)) : t, r = (e, t, n) => t.includes(e) ? e : n, i = n(t.bufferSeconds, o.bufferSeconds, 30, 600);
	return {
		bufferSeconds: i,
		clipSeconds: n(t.clipSeconds, o.clipSeconds, 5, i),
		quality: r(t.quality, [
			"source",
			"1080",
			"720",
			"480"
		], o.quality),
		saveToDownloads: typeof t.saveToDownloads == "boolean" ? t.saveToDownloads : o.saveToDownloads,
		showOverlay: typeof t.showOverlay == "boolean" ? t.showOverlay : o.showOverlay,
		captionEngine: r(t.captionEngine, [
			"local",
			"groq",
			"openai"
		], o.captionEngine),
		groqKey: typeof t.groqKey == "string" ? t.groqKey.trim() : "",
		openaiKey: typeof t.openaiKey == "string" ? t.openaiKey.trim() : "",
		localModel: r(t.localModel, ["whisper-base", "whisper-small"], o.localModel),
		analytics: typeof t.analytics == "boolean" ? t.analytics : o.analytics
	};
}
var o, s = t((() => {
	o = Object.freeze({
		bufferSeconds: 120,
		quality: "1080",
		clipSeconds: 60,
		saveToDownloads: !0,
		showOverlay: !0,
		captionEngine: "local",
		groqKey: "",
		openaiKey: "",
		localModel: "whisper-base",
		analytics: !0
	});
})), c, l = t((() => {
	c = ":host{all:initial}*{box-sizing:border-box;font-family:Geist,Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif}.dock{--accent:#9146ff;--accent-ink:#fff;--surface:#0e0e12eb;--line:#ffffff1a;--muted:#a3a6b2;pointer-events:auto;touch-action:none;flex-direction:column;gap:8px;display:flex;position:absolute}.dock.kick{--accent:#53fc18;--accent-ink:#07090a}.dock[hidden]{display:none}.dock[data-x=right]{align-items:flex-end}.dock[data-x=left]{align-items:flex-start}.dock[data-y=top]{flex-direction:column-reverse}.shell{background:var(--surface);color:#f4f5f7;border:1px solid var(--line);backdrop-filter:blur(16px)saturate(1.5);user-select:none;border-radius:20px;flex-direction:column;font-size:12px;line-height:1;transition:transform .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s;animation:.28s cubic-bezier(.16,1,.3,1) rise;display:flex;overflow:hidden;box-shadow:0 12px 32px #0000006b,inset 0 1px #ffffff0f}.dock[data-y=top] .shell{flex-direction:column-reverse}.dock[data-mode=edge] .shell{display:none}.dock.is-dragging .shell{transform:scale(1.02);box-shadow:0 22px 48px #00000080,inset 0 1px #ffffff0f}.dock.is-dragging,.dock.is-dragging *{cursor:grabbing!important}.bar{cursor:grab;touch-action:none;align-items:center;gap:8px;height:40px;padding:4px 4px 4px 0;display:flex}.grip{cursor:grab;flex:1;align-self:stretch;align-items:center;gap:8px;padding-left:12px;display:flex}.label{font-variant-numeric:tabular-nums;color:var(--muted);white-space:nowrap}.label b{color:#fff;font-weight:650}.dot{background:#6b6b76;border-radius:50%;flex:none;width:8px;height:8px}[data-status=buffering] .dot,.dot[data-status=buffering]{background:#ff3b3b;animation:1.6s infinite pulse}[data-status=ad] .dot,.dot[data-status=ad],[data-status=error] .dot,.dot[data-status=error]{background:#ffb020}[data-status=offline] .dot,.dot[data-status=offline]{background:#55565f}button{all:unset;cursor:pointer;box-sizing:border-box;font-size:12px;line-height:1;transition:filter .15s,transform .12s,background .15s,color .15s}button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}button:disabled{opacity:.45;cursor:default}button:not(:disabled):active{transform:scale(.96)}.clip{background:var(--accent);height:32px;color:var(--accent-ink);border-radius:999px 6px 6px 999px;align-items:center;padding:0 12px;font-weight:750;display:inline-flex}.more{background:var(--accent);width:30px;height:32px;color:var(--accent-ink);border-radius:6px 999px 999px 6px;place-items:center;margin-left:-6px;display:inline-grid}.more svg{fill:none;stroke:currentColor;stroke-width:2px;stroke-linecap:round;stroke-linejoin:round;width:14px;height:14px;transition:transform .25s cubic-bezier(.2,.8,.2,1)}.dock[data-y=bottom] .more svg{transform:rotate(180deg)}.shell.is-open .more svg{transform:rotate(0)}.dock[data-y=top] .shell.is-open .more svg{transform:rotate(180deg)}.clip:not(:disabled):hover,.more:not(:disabled):hover{filter:brightness(1.1)}.panel{gap:10px;min-width:248px;padding:12px 12px 6px;display:grid}.dock[data-y=top] .panel{padding:6px 12px 12px}.panel[hidden]{display:none}.panel__title{color:var(--muted);letter-spacing:.04em;text-transform:uppercase;margin:0;font-size:11px;font-weight:600}.lengths{flex-wrap:wrap;gap:6px;display:flex}.len{color:#e7e8ee;font-variant-numeric:tabular-nums;background:#ffffff0f;border-radius:10px;padding:8px 11px;font-weight:600}.len:hover:not(:disabled){background:#ffffff1f}.len.is-on{background:color-mix(in oklab, var(--accent) 22%, transparent);color:#fff;box-shadow:inset 0 0 0 1px color-mix(in oklab, var(--accent) 55%, transparent)}.panel__actions{border-top:1px solid var(--line);gap:2px;padding-top:8px;display:grid}.action{color:#e7e8ee;border-radius:8px;padding:9px 8px;font-weight:500}.action:hover{background:#ffffff12}.action--quiet{color:var(--muted)}.panel__version{color:#6e717c;font-variant-numeric:tabular-nums;margin:0;padding:2px 8px 4px;font-size:11px}.tab{background:var(--surface);color:#f4f5f7;border:1px solid var(--line);backdrop-filter:blur(16px)saturate(1.5);cursor:grab;flex-direction:column;justify-content:center;align-items:center;gap:8px;width:22px;height:64px;transition:width .2s cubic-bezier(.2,.8,.2,1),background .15s;display:none;transform:translateY(-50%);box-shadow:0 10px 28px #0000006b}.tab svg{fill:none;stroke:currentColor;stroke-width:2px;stroke-linecap:round;stroke-linejoin:round;width:14px;height:14px}.dock[data-mode=edge] .tab{display:flex}.dock[data-x=right] .tab{border-right:0;border-radius:12px 0 0 12px}.dock[data-x=left] .tab{border-left:0;border-radius:0 12px 12px 0}.dock[data-x=left] .tab svg{transform:rotate(180deg)}.tab:hover{background:#18181ef5;width:28px}.tab:not(:disabled):active{transform:translateY(-50%)scale(.96)}.toasts{flex-direction:column;gap:8px;display:flex}.dock[data-x=right] .toasts{align-items:flex-end}.dock[data-y=top] .toasts{flex-direction:column-reverse}.dock[data-mode=edge] .toasts{position:absolute;top:0;transform:translateY(-50%)}.dock[data-mode=edge][data-x=right] .toasts{right:calc(100% + 10px)}.dock[data-mode=edge][data-x=left] .toasts{left:calc(100% + 10px)}.toast{color:#f4f5f7;border:1px solid var(--line);background:#0c0c10f2;border-radius:14px;gap:3px;width:max-content;max-width:300px;padding:10px 12px;font-size:12.5px;line-height:1.35;transition:opacity .18s,transform .18s;animation:.2s cubic-bezier(.16,1,.3,1) rise;display:grid;box-shadow:0 10px 30px #0006}.toast.out{opacity:0;transform:translateY(6px)}.toast.ok{border-color:color-mix(in oklab, var(--accent) 45%, transparent)}.toast.err{border-color:#ff5c7273}.toast strong{font-weight:750}.toast .title{color:#b6b8c2;-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.toast .warn{color:#ffc24b}.toast .actions{gap:6px;margin-top:4px;display:flex}.link{background:var(--accent);color:var(--accent-ink);border-radius:999px;padding:6px 10px;font-weight:700}.toast.work strong:after{content:\"\";vertical-align:-1px;border:2px solid #ffffff40;border-top-color:var(--accent);border-radius:50%;width:10px;height:10px;margin-left:8px;animation:.8s linear infinite spin;display:inline-block}@keyframes pulse{0%{box-shadow:0 0 #ff3b3b8c}70%{box-shadow:0 0 0 7px #ff3b3b00}to{box-shadow:0 0 #ff3b3b00}}@keyframes rise{0%{opacity:0;transform:translateY(6px)}}@keyframes spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}.dock.is-tucking .shell{opacity:.75;transform:scale(.95)}";
})), u = /* @__PURE__ */ n({});
function d(e, t, n = 1) {
	let r = Math.sqrt(e / n), i = t / (2 * Math.sqrt(e * n)), a = r * Math.sqrt(Math.max(0, 1 - i * i)), o = (e) => i < 1 ? 1 - Math.exp(-i * r * e) * (Math.cos(a * e) + i * r / a * Math.sin(a * e)) : 1 - Math.exp(-r * e) * (1 + r * e), s = .1;
	for (; s < 2 && Math.abs(1 - o(s)) > .001;) s += .02;
	let c = Array.from({ length: 49 }, (e, t) => +o(s * t / 48).toFixed(4));
	return c[48] = 1, {
		easing: `linear(${c.join(", ")})`,
		duration: Math.round(s * 1e3)
	};
}
var f, p, m, ee, h, te, ne, re, ie, g, _, v, y, b, x = t((() => {
	i(), s(), l(), f = "overlayDock", p = 16, m = {
		kind: "free",
		x: "right",
		y: "bottom",
		ox: p,
		oy: p
	}, ee = 4, h = 110, te = 80, ne = 50, re = .25, ie = 4, g = (e, t, n) => Math.min(Math.max(e, t), Math.max(t, n)), _ = 16, v = matchMedia("(prefers-reduced-motion: reduce)"), y = d(170, 25), b = d(300, 33), (() => {
		if (window.__clipprContent) return;
		window.__clipprContent = !0;
		for (let e of document.querySelectorAll("clippr-root")) e.remove();
		let e = location.hostname.includes("kick.com"), t = document.createElement("clippr-root");
		t.style.cssText = "all:initial;position:fixed;inset:0;z-index:2147483646;pointer-events:none;";
		let n = t.attachShadow({ mode: "closed" }), i = document.createElement("style");
		i.textContent = c, n.append(i);
		let o = (e, t, n) => {
			let r = document.createElement(e);
			return t && (r.className = t), n != null && (r.textContent = n), r;
		}, s = (e, t, n) => {
			let r = o("button", e, t);
			return r.type = "button", n && (r.title = n), r;
		}, l = o("div", `dock ${e ? "kick" : "twitch"}`);
		l.hidden = !0;
		let u = o("div", "toasts"), d = o("div", "shell"), x = o("div", "bar"), S = o("div", "grip");
		S.title = "Drag to move · fling to a side to tuck away";
		let C = o("span", "dot"), w = o("span", "label", "Starting…");
		S.append(C, w);
		let T = s("clip", "Clip"), E = s("more", "", "More");
		E.setAttribute("aria-haspopup", "true"), E.setAttribute("aria-expanded", "false"), E.innerHTML = "<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M4 6l4 4 4-4\"/></svg>", x.append(S, T, E);
		let D = o("div", "panel");
		D.hidden = !0;
		let O = o("p", "panel__title", "Clip the last"), k = o("div", "lengths"), A = o("div", "panel__actions"), j = s("action", "Open library"), ae = s("action", "Tuck to the side"), oe = s("action action--quiet", "Hide", "Turn back on in the CLIPPR popup");
		A.append(j, ae, oe);
		let se = o("p", "panel__version", `CLIPPR ${chrome.runtime.getManifest?.().version ?? ""}`.trim());
		D.append(O, k, A, se), d.append(D, x);
		let M = s("tab", "", "Show CLIPPR");
		M.innerHTML = "<span class=\"dot\"></span><svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M10 4 6 8l4 4\"/></svg>";
		let ce = M.querySelector(".dot");
		l.append(u, d, M), n.append(l);
		let le = !0, N = !1, P = 60, F = 120, I = 0, L = !1, R = null, z = m, B = null;
		function ue() {
			!t.isConnected && document.documentElement && document.documentElement.append(t);
		}
		function V() {
			let e = l.style;
			if (e.left = e.right = e.top = e.bottom = "auto", z.kind === "free") {
				let t = d.offsetWidth || 220, n = d.offsetHeight || 44;
				e[z.x] = `${g(z.ox, p, innerWidth - t - p)}px`, e[z.y] = `${g(z.oy, p, innerHeight - n - p)}px`, l.dataset.x = z.x, l.dataset.y = z.y, l.dataset.mode = "free";
			} else e[z.side] = "0px", e.top = `${Math.round(z.at * innerHeight)}px`, l.dataset.x = z.side, l.dataset.y = z.at < .5 ? "top" : "bottom", l.dataset.mode = "edge", Y(!1);
		}
		function de(e) {
			z = e, V(), chrome.storage.local.set({ [f]: z }).catch(() => {});
		}
		function H() {
			let e = d.getBoundingClientRect(), t = d.offsetWidth, n = d.offsetHeight;
			return new DOMRect(e.left + (e.width - t) / 2, e.top + (e.height - n) / 2, t, n);
		}
		let U = {
			x: 0,
			y: 0
		}, W = 0;
		function G(e, t) {
			U = {
				x: e,
				y: t
			}, l.style.transform = e || t ? `translate3d(${e}px, ${t}px, 0)` : "";
		}
		function K() {
			cancelAnimationFrame(W), W = 0;
			let e = getComputedStyle(l).transform, t = e && e !== "none" ? new DOMMatrixReadOnly(e) : null;
			l.getAnimations().forEach((e) => e.cancel()), G(t?.m41 ?? 0, t?.m42 ?? 0);
		}
		function fe(e = 0, t = 0) {
			cancelAnimationFrame(W), W = 0;
			let n = U.x, r = U.y;
			if (v.matches || Math.abs(n) < .5 && Math.abs(r) < .5) return G(0, 0);
			let i = 1 / h, a = (e, t) => e * t >= 0 ? 0 : Math.sign(e) * Math.min(Math.abs(e), i * Math.abs(t)), o = a(e, n), s = a(t, r), c = performance.now(), l = (e) => {
				let t = e - c, a = Math.exp(-.00909090909090909 * t), u = (n + (o + i * n) * t) * a, d = (r + (s + i * r) * t) * a;
				if (Math.abs(u) < .3 && Math.abs(d) < .3) return W = 0, G(0, 0);
				G(u, d), W = requestAnimationFrame(l);
			};
			W = requestAnimationFrame(l);
		}
		function q(e) {
			K();
			let t = H(), n = l.dataset.mode === "edge";
			if (G(0, 0), de(e), v.matches) return;
			let r = e.kind === "edge" && !n, i = e.kind === "free" && n;
			if (r) {
				let t = e.side === "right" ? 1 : -1;
				M.animate([{
					transform: `translateX(${t * 24}px)`,
					opacity: 0
				}, {
					transform: "none",
					opacity: 1
				}], {
					duration: y.duration,
					easing: y.easing
				});
				return;
			}
			if (i) {
				let t = e.x === "right" ? 1 : -1;
				d.animate([{
					transform: `translateX(${t * 28}px) scale(.94)`,
					opacity: 0
				}, {
					transform: "none",
					opacity: 1
				}], {
					duration: y.duration,
					easing: y.easing
				});
				return;
			}
			if (n) return;
			let a = H();
			G(t.left - a.left, t.top - a.top), fe();
		}
		function pe(e, t, n = 0) {
			let r = e.left + e.width / 2 + n * h;
			return e.left <= 0 || t <= _ || r < 8 ? "left" : e.right >= innerWidth || t >= innerWidth - _ || r > innerWidth - 8 ? "right" : null;
		}
		function me(e, t, n, r) {
			let i = pe(e, r, t);
			return i ? {
				kind: "edge",
				side: i,
				at: g((e.top + e.height / 2) / innerHeight, .1, .9)
			} : he(g(e.left + t * h, p, innerWidth - e.width - p), g(e.top + n * h, p, innerHeight - e.height - p), e.width, e.height);
		}
		function he(e, t, n, r) {
			let i = e + n / 2 < innerWidth / 2 ? "left" : "right", a = t + r / 2 < innerHeight / 2 ? "top" : "bottom";
			return {
				kind: "free",
				x: i,
				y: a,
				ox: i === "left" ? e : innerWidth - e - n,
				oy: a === "top" ? t : innerHeight - t - r
			};
		}
		function ge() {
			z.kind === "edge" && q(_e(z));
		}
		function _e(e) {
			let t = g(e.at * innerHeight - 22, p, innerHeight - 44 - p);
			return e.at < .5 ? {
				kind: "free",
				x: e.side,
				y: "top",
				ox: p,
				oy: t
			} : {
				kind: "free",
				x: e.side,
				y: "bottom",
				ox: p,
				oy: innerHeight - t - 44
			};
		}
		let J = !1;
		n.addEventListener("click", (e) => {
			J && (e.stopPropagation(), e.preventDefault());
		}, { capture: !0 });
		function ve(e, t) {
			let n = e[e.length - 1];
			if (!n || t - n.t > ne) return {
				x: 0,
				y: 0
			};
			let r = e.find((e) => n.t - e.t <= te) ?? n, i = n.t - r.t;
			if (i < 8) return {
				x: 0,
				y: 0
			};
			let a = (n.x - r.x) / i, o = (n.y - r.y) / i, s = Math.hypot(a, o);
			if (s < re) return {
				x: 0,
				y: 0
			};
			let c = Math.min(1, ie / s);
			return {
				x: a * c,
				y: o * c
			};
		}
		function ye(e, t, n, r) {
			let i = me(e, t, n, r);
			if (G(0, 0), i.kind === "edge") return q(i);
			de(i);
			let a = H();
			G(e.left - a.left, e.top - a.top), fe(t, n);
		}
		function be(e, t) {
			e.addEventListener("pointerdown", (e) => {
				if (e.button !== 0 || !e.isPrimary) return;
				let n = e.pointerId, r = W !== 0;
				r && K();
				let i = {
					x: e.clientX,
					y: e.clientY
				}, a = i, o = new DOMRect(), s = [], c = !1, u = () => new DOMRect(o.x + U.x, o.y + U.y, o.width, o.height), f = (e) => {
					c = !0;
					try {
						l.setPointerCapture(n);
					} catch {}
					Y(!1), K();
					let t = z;
					z.kind === "edge" && (z = _e(z), V(), G(0, 0)), d.getAnimations().forEach((e) => e.cancel());
					let r = H();
					o = new DOMRect(r.x - U.x, r.y - U.y, r.width, r.height), a = z === t ? {
						x: i.x - U.x,
						y: i.y - U.y
					} : {
						x: e.clientX,
						y: e.clientY
					}, l.classList.add("is-dragging");
				}, p = (e) => {
					if (e.pointerId === n) {
						if (e.pointerType === "mouse" && e.buttons === 0) return m(e);
						if (!c) {
							if (Math.hypot(e.clientX - i.x, e.clientY - i.y) < ee) return;
							f(e);
						}
						for (s.push({
							x: e.clientX,
							y: e.clientY,
							t: e.timeStamp
						}); s.length > 2 && e.timeStamp - s[0].t > 160;) s.shift();
						G(e.clientX - a.x, e.clientY - a.y), l.classList.toggle("is-tucking", !!pe(u(), e.clientX));
					}
				}, m = (e) => {
					if (e.pointerId !== n) return;
					if (removeEventListener("pointermove", p, !0), removeEventListener("pointerup", m, !0), removeEventListener("pointercancel", m, !0), l.classList.remove("is-dragging", "is-tucking"), !c) {
						r && ye(H(), 0, 0, innerWidth / 2), t?.();
						return;
					}
					J = !0, setTimeout(() => J = !1, 0);
					let i = e.type === "pointercancel" ? {
						x: 0,
						y: 0
					} : ve(s, e.timeStamp);
					ye(u(), i.x, i.y, e.clientX);
				};
				addEventListener("pointermove", p, !0), addEventListener("pointerup", m, !0), addEventListener("pointercancel", m, !0);
			});
		}
		be(x), be(M, ge), M.addEventListener("keydown", (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), ge());
		});
		function xe(e, t = !0) {
			let n = d.getBoundingClientRect();
			if (e(), !t || v.matches) return;
			let r = d.getBoundingClientRect();
			d.getAnimations().forEach((e) => e.cancel()), d.animate([{
				width: `${n.width}px`,
				height: `${n.height}px`
			}, {
				width: `${r.width}px`,
				height: `${r.height}px`
			}], {
				duration: b.duration,
				easing: b.easing
			});
		}
		function Se() {
			D.hidden && z.kind !== "edge" && (Ce(), xe(() => {
				D.hidden = !1, d.classList.add("is-open");
			}), E.setAttribute("aria-expanded", "true"), v.matches || D.animate([{
				opacity: 0,
				filter: "blur(4px)",
				transform: "scale(.96)"
			}, {
				opacity: 1,
				filter: "blur(0)",
				transform: "none"
			}], {
				duration: 220,
				easing: "cubic-bezier(.2, .8, .2, 1)"
			}), k.querySelector("button:not(:disabled)")?.focus({ preventScroll: !0 }));
		}
		function Y(e = !0) {
			D.hidden || (xe(() => {
				D.hidden = !0, d.classList.remove("is-open");
			}, e), E.setAttribute("aria-expanded", "false"));
		}
		function Ce() {
			let e = [...[
				15,
				30,
				60,
				120
			].filter((e) => e < F), F];
			k.replaceChildren(...e.map((e) => {
				let t = s(e === P ? "len is-on" : "len", e === F ? `All ${r(Math.min(e, Math.floor(I)))}` : r(e));
				return t.disabled = I < 1 || L, t.addEventListener("click", () => {
					Y(), Ee(e);
				}), t;
			}));
		}
		E.addEventListener("click", (e) => {
			e.stopPropagation(), D.hidden ? Se() : Y();
		}), j.addEventListener("click", () => {
			Y(), chrome.runtime.sendMessage({ type: "open-library" }).catch(() => {});
		}), ae.addEventListener("click", () => {
			Y(!1);
			let e = l.getBoundingClientRect();
			q({
				kind: "edge",
				side: z.kind === "free" ? z.x : "right",
				at: Math.min(.9, Math.max(.1, (e.top + e.height / 2) / innerHeight))
			});
		}), oe.addEventListener("click", async () => {
			let { settings: e } = await chrome.storage.local.get("settings");
			await chrome.storage.local.set({ settings: {
				...a(e),
				showOverlay: !1
			} });
		}), document.addEventListener("pointerdown", (e) => {
			!D.hidden && !e.composedPath().includes(t) && Y();
		}), n.addEventListener("keydown", (e) => {
			e.key === "Escape" && !D.hidden && (Y(), E.focus());
		});
		let we = () => R?.adEndsAt == null ? null : Math.max(0, Math.ceil((R.adEndsAt - Date.now()) / 1e3));
		function X(e) {
			R = e, l.hidden = !(le && N), l.hidden && Y(!1), I = e?.seconds ?? 0;
			let t = e?.inAd ? "ad" : e?.status ?? "starting";
			if (l.dataset.status = t, w.replaceChildren(), !e || e.status === "starting") w.textContent = "Starting buffer…";
			else if (e.status === "offline") w.textContent = "Channel offline";
			else if (e.status === "error") w.textContent = "Reconnecting…";
			else if (e.inAd) {
				let t = we();
				w.append(o("b", void 0, r(e.seconds)), t == null ? " · ad break" : t > 0 ? ` · ad ${r(t)}` : " · ad ending…");
			} else w.append(o("b", void 0, r(e.seconds)), e.variant ? ` · ${e.variant}` : " buffered");
			M.title = e?.inAd ? "Show CLIPPR (ad break)" : `Show CLIPPR (${r(I)} buffered)`, ce.dataset.status = t;
			let n = Math.min(P, Math.floor(I));
			T.textContent = `Clip ${r(Math.max(n, 1))}`, T.title = n < P ? `Clip the last ${r(n)} (Alt+S). It grows to ${r(P)} as the buffer fills.` : `Clip the last ${r(P)} (Alt+S)`, T.disabled = L || I < 1, E.disabled = L, e?.inAd && e.adEndsAt != null ? B ??= setInterval(() => X(R), 1e3) : B &&= (clearInterval(B), null);
		}
		function Z(e, t, n = 5e3) {
			let r = o("div", `toast ${e}`);
			r.setAttribute("role", e === "err" ? "alert" : "status"), t(r), u.append(r);
			let i = setTimeout(() => Te(r), n);
			return r.addEventListener("mouseenter", () => clearTimeout(i)), r.addEventListener("mouseleave", () => i = setTimeout(() => Te(r), 1500)), r;
		}
		function Te(e) {
			e.classList.add("out"), setTimeout(() => e.remove(), 180);
		}
		let Q = null;
		function Ee(e) {
			L || chrome.runtime.sendMessage({
				type: "clip",
				seconds: e
			}).catch(() => {});
		}
		function De(e) {
			Z("ok", (t) => {
				t.append(o("strong", void 0, `Saved ${r(e.seconds)} clip`), o("span", "title", e.title)), e.short && t.append(o("span", "warn", "Shorter than asked: an ad break or reconnect cut the buffer."));
				let n = o("div", "actions"), i = s("link", "Open");
				i.addEventListener("click", () => chrome.runtime.sendMessage({
					type: "open-library",
					clipId: e.id
				})), n.append(i), t.append(n);
			}, 6e3);
		}
		T.addEventListener("click", () => Ee(P)), chrome.runtime.onMessage.addListener((e) => {
			switch (e.type) {
				case "buffer-state":
					N = !!e.channel, X(e.state);
					break;
				case "clip-started":
					L = !0, Q?.remove(), Q = Z("work", (t) => t.append(o("strong", void 0, `Clipping last ${r(e.seconds)}…`)), 3e4), X(R);
					break;
				case "clip-saved":
					L = !1, Q?.remove(), De(e.clip), X(R);
					break;
				case "notice":
					Z("ok", (t) => t.append(o("strong", void 0, e.title), o("span", "title", e.body)), 6e3);
					break;
				case "clip-failed": L = !1, Q?.remove(), Z("err", (t) => t.append(o("strong", void 0, "Couldn't clip"), o("span", "title", e.error))), X(R);
			}
		});
		async function $() {
			let { settings: e } = await chrome.storage.local.get("settings"), t = a(e);
			le = t.showOverlay, P = t.clipSeconds, F = t.bufferSeconds;
			let n = await chrome.runtime.sendMessage({ type: "get-state" }).catch(() => null);
			N = !!n?.channel, ue(), X(n && n.channel ? n.state : null);
		}
		async function Oe() {
			let e = (await chrome.storage.local.get(f).catch(() => ({})))[f], t = e;
			e?.kind === "free" || e?.kind === "edge" ? z = e : t?.kind === "corner" && t.x && t.y && (z = {
				kind: "free",
				x: t.x,
				y: t.y,
				ox: p,
				oy: p
			}), V();
		}
		chrome.storage.onChanged.addListener((e, t) => {
			t === "local" && e.settings && $();
		});
		let ke = location.href, Ae = () => {
			location.href !== ke && (ke = location.href, $());
		};
		window.addEventListener("popstate", Ae), setInterval(Ae, 1e3), window.addEventListener("resize", () => V()), Oe().then($);
	})();
})), S = 120, C = "clippr-site-bar-dock", w = 640, T = [], E = [], D = {}, O = 0, k = () => ({
	status: "buffering",
	seconds: O,
	bytes: 0,
	variant: "1080p60",
	error: null,
	inAd: !1,
	adEndsAt: null
}), A = (e) => T.forEach((t) => t(e));
function j() {
	try {
		return JSON.parse(localStorage.getItem(C) ?? "null");
	} catch {
		return null;
	}
}
innerWidth >= w && (globalThis.chrome = {
	runtime: {
		async sendMessage(e) {
			if (e.type === "get-state") return {
				channel: {
					platform: "twitch",
					channel: "clippr"
				},
				state: k()
			};
			e.type === "clip" && A(document.querySelector("[data-download][href$=\".zip\"]") ? {
				type: "notice",
				title: "This is a preview",
				body: "Download the extension to clip any Twitch or Kick stream for real."
			} : {
				type: "notice",
				title: "CLIPPR is coming soon",
				body: "This is its real recorder bar. Saving clips arrives with the extension."
			}), e.type === "open-library" && (location.href = "./#editor");
		},
		onMessage: { addListener: (e) => void T.push(e) },
		getManifest: () => ({ version: "preview" })
	},
	storage: {
		local: {
			async get(e) {
				return e === "overlayDock" ? { overlayDock: j() ?? void 0 } : { [e]: D[e] };
			},
			async set(e) {
				for (let [t, n] of Object.entries(e)) {
					if (t === "overlayDock") try {
						localStorage.setItem(C, JSON.stringify(n));
					} catch {}
					else D[t] = n;
					E.forEach((e) => e({ [t]: { newValue: n } }, "local"));
				}
			}
		},
		onChanged: { addListener: (e) => void E.push(e) }
	}
}, setInterval(() => {
	O >= S || (O++, A({
		type: "buffer-state",
		tabId: 0,
		platform: "twitch",
		channel: "clippr",
		state: k()
	}));
}, 1e3), await Promise.resolve().then(() => (x(), u)));

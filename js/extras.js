/* Sniff Sniff Club — extras: welcome screen, scroll reveal, paw trail, night mode,
   "Open When..." letters and the Purr Corner. Runs after main.js. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  var ui = function (key) { return SSC.t().ui[key]; };
  function when(id, fn) { if ($(id)) fn(); }
  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  /* ---------- Welcome screen ---------- */
  function initIntro() {
    var box = $("intro");
    var enter = $("intro-enter");
    var done = false;
    function close() {
      if (done) return;
      done = true;
      try { sessionStorage.setItem("ssc-intro", "1"); } catch (e) {}
      box.classList.add("is-leaving");
      setTimeout(function () {
        document.documentElement.classList.remove("intro-on");
        box.remove();
      }, 550);
    }
    if (!document.documentElement.classList.contains("intro-on")) { box.remove(); return; }
    enter.addEventListener("click", close);
    $("intro-skip").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    setTimeout(close, 6000);
    enter.focus({ preventScroll: true });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var seen = document.querySelectorAll("main > .section:not(#home)");
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    seen.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }

  /* ---------- Paw trail ---------- */
  function initTrail() {
    if (reduceMotion) return;
    var last = 0;
    function paw(x, y) {
      var s = document.createElement("span");
      s.className = "trail";
      s.textContent = "🐾";
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--rot", (Math.random() * 60 - 30) + "deg");
      document.body.appendChild(s);
      setTimeout(function () { s.remove(); }, 1000);
    }
    document.addEventListener("pointerdown", function (e) { paw(e.clientX, e.clientY); });
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var now = Date.now();
      if (now - last < 110) return;
      last = now;
      paw(e.clientX, e.clientY);
    });
  }

  /* ---------- Night mode ---------- */
  function initTheme() {
    var btn = $("theme-btn");
    var meta = document.querySelector('meta[name="theme-color"]');
    function isDark() { return document.documentElement.dataset.theme === "dark"; }
    function render() {
      btn.textContent = isDark() ? "☀️" : "🌙";
      btn.setAttribute("aria-pressed", isDark() ? "true" : "false");
      btn.setAttribute("aria-label", ui(isDark() ? "themeToLight" : "themeToDark"));
      if (meta) meta.setAttribute("content", isDark() ? "#2a2040" : "#F9E8EF");
    }
    btn.addEventListener("click", function () {
      if (isDark()) { delete document.documentElement.dataset.theme; store("ssc-theme", "light"); }
      else { document.documentElement.dataset.theme = "dark"; store("ssc-theme", "dark"); }
      render();
    });
    SSC.renderers.push(render);
    render();
  }

  /* ---------- Open When... letters ---------- */
  function initLetters() {
    var list = $("envelopes");
    var modal = $("letter");
    var opener = null;
    var buttons = [];

    SSC.i18n.en.letters.forEach(function (_, n) {
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "envelope";
      var em = document.createElement("span");
      em.className = "envelope__emoji";
      em.setAttribute("aria-hidden", "true");
      var tx = document.createElement("span");
      b.appendChild(em); b.appendChild(tx);
      b.addEventListener("click", function () { open(n, b); });
      li.appendChild(b);
      list.appendChild(li);
      buttons.push({ em: em, tx: tx });
    });

    var current = -1;
    var picks = SSC.i18n.en.letters.map(function (l) { return pickBag(l.texts.length); });
    var shown = -1;   /* which message of the open letter (same index in EN and BM) */
    function pickBag(n) {
      var left = [];
      return function () {
        if (!left.length) for (var i = 0; i < n; i++) left.push(i);
        return left.splice(Math.floor(Math.random() * left.length), 1)[0];
      };
    }
    function fill() {
      var items = SSC.t().letters;
      buttons.forEach(function (b, n) { b.em.textContent = items[n].emoji; b.tx.textContent = items[n].title; });
      if (current > -1) {
        $("letter-emoji").textContent = items[current].emoji;
        $("letter-title").textContent = items[current].title;
        $("letter-text").textContent = items[current].texts[shown];
      }
    }
    function open(n, from) {
      current = n;
      opener = from;
      shown = picks[n]();
      fill();
      modal.hidden = false;
      $("letter-close").focus();
      SSC.burst(from, ["💌", "✨", "💛", "🐾"]);
    }
    function close() {
      if (modal.hidden) return;
      modal.hidden = true;
      current = -1;
      if (opener) opener.focus();
    }
    $("letter-again").addEventListener("click", function () {
      shown = picks[current]();
      fill();
      SSC.burst($("letter-again"), ["💌", "✨", "💛"]);
    });
    $("letter-close").addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    SSC.renderers.push(fill);
    fill();
  }

  /* ---------- Purr Corner: breathing guide + synthesised purr ---------- */
  function initPurr() {
    var box = $("breathe");
    var label = $("breathe-label");
    var startBtn = $("breathe-btn");
    var purrBtn = $("purr-btn");
    var note = $("purr-note");
    var phases = [["in", "breatheIn", 4000], ["hold", "breatheHold", 4000], ["out", "breatheOut", 6000]];
    var running = false, step = 0, timer = null;
    var purring = false, ctx = null, nodes = null;

    function setPhase() {
      var p = phases[step];
      box.dataset.phase = p[0];
      label.textContent = ui(p[1]);
      timer = setTimeout(function () { step = (step + 1) % phases.length; setPhase(); }, p[2]);
    }
    function stopBreathing() {
      running = false;
      clearTimeout(timer);
      box.dataset.phase = "idle";
    }
    function render() {
      startBtn.textContent = ui(running ? "breatheStop" : "breatheStart");
      purrBtn.textContent = ui(purring ? "purrOff" : "purrOn");
      purrBtn.setAttribute("aria-pressed", purring ? "true" : "false");
      if (!running) label.textContent = ui("breatheIdle");
      else label.textContent = ui(phases[step][1]);
      note.textContent = ui("purrMuted");
    }
    startBtn.addEventListener("click", function () {
      if (running) { stopBreathing(); }
      else { running = true; step = 0; setPhase(); }
      render();
    });

    function isMuted() {
      try { return localStorage.getItem("ssc-muted") === "1"; } catch (e) { return false; }
    }
    function startSound() {
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = ctx || new AC();
        if (ctx.state === "suspended") ctx.resume();
        var len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0), last = 0;
        for (var i = 0; i < len; i++) {            /* brown noise: soft, low rumble */
          last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
          d[i] = last * 3.5;
        }
        var src = ctx.createBufferSource();
        src.buffer = buf; src.loop = true;
        var low = ctx.createBiquadFilter();
        low.type = "lowpass"; low.frequency.value = 260;
        var amp = ctx.createGain();
        amp.gain.value = 0.55;
        var lfo = ctx.createOscillator();           /* ~25 Hz wobble = the purr */
        lfo.frequency.value = 25;
        var depth = ctx.createGain();
        depth.gain.value = 0.45;
        var master = ctx.createGain();
        master.gain.setValueAtTime(0.0001, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.5);
        lfo.connect(depth); depth.connect(amp.gain);
        src.connect(low); low.connect(amp); amp.connect(master); master.connect(ctx.destination);
        src.start(); lfo.start();
        nodes = { src: src, lfo: lfo, master: master };
      } catch (e) { nodes = null; /* audio is optional */ }
    }
    function stopSound() {
      if (!nodes) return;
      var n = nodes;
      nodes = null;
      try {
        n.master.gain.cancelScheduledValues(ctx.currentTime);
        n.master.gain.setValueAtTime(n.master.gain.value, ctx.currentTime);
        n.master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        setTimeout(function () { try { n.src.stop(); n.lfo.stop(); } catch (e) {} }, 350);
      } catch (e) {}
    }
    function setPurr(on) {
      purring = on;
      box.classList.toggle("is-purring", on && !reduceMotion);
      note.hidden = !(on && isMuted());
      if (on && !isMuted()) startSound(); else stopSound();
      render();
    }
    purrBtn.addEventListener("click", function () { setPurr(!purring); });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { if (purring) setPurr(false); if (running) { stopBreathing(); render(); } }
    });

    SSC.renderers.push(render);
    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    when("intro", initIntro);
    when("envelopes", initLetters);
    when("breathe", initPurr);
    initReveal();
    initTrail();
  });
})();

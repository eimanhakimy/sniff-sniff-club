/* Sniff Sniff Club — interactions. Text lives in messages.js (EN + BM). */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  var ui = function (key) { return SSC.t().ui[key]; };

  /* Random index without repeats until all have been shown. */
  function bag(n) {
    var left = [];
    return function () {
      if (!left.length) for (var i = 0; i < n; i++) left.push(i);
      return left.splice(Math.floor(Math.random() * left.length), 1)[0];
    };
  }

  function restartAnim(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  /* Little burst of emoji flying out of an element (skipped for reduced motion) */
  function burst(el, emojis) {
    if (reduceMotion || !el) return;
    var r = el.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (var i = 0; i < 12; i++) {
      var s = document.createElement("span");
      s.className = "burst";
      s.textContent = emojis[i % emojis.length];
      var angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
      var dist = 70 + Math.random() * 70;
      s.style.left = cx + "px";
      s.style.top = cy + "px";
      s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      s.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      s.style.setProperty("--rot", (Math.random() * 120 - 60) + "deg");
      document.body.appendChild(s);
      setTimeout(function (n) { return function () { n.remove(); }; }(s), 1000);
    }
  }
  SSC.burst = burst;

  /* ---------- Language ---------- */
  function applyStatic() {
    var t = SSC.t().ui;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (t[el.dataset.i18n] != null) el.textContent = t[el.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      if (t[el.dataset.i18nAlt] != null) el.alt = t[el.dataset.i18nAlt];
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (el) {
      if (t[el.dataset.i18nLabel] != null) el.setAttribute("aria-label", t[el.dataset.i18nLabel]);
    });
  }

  function setLang(lang, save) {
    if (!SSC.i18n[lang]) lang = "en";
    SSC.lang = lang;
    document.documentElement.lang = lang === "ms" ? "ms" : "en";
    if (save) { try { localStorage.setItem("ssc-lang", lang); } catch (e) {} }
    document.querySelectorAll(".langswitch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    applyStatic();
    SSC.renderers.forEach(function (fn) { fn(); });
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem("ssc-lang"); } catch (e) {}
    var guess = (navigator.language || "").toLowerCase().indexOf("ms") === 0 ? "ms" : "en";
    document.querySelectorAll(".langswitch button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.dataset.lang, true); });
    });
    setLang(saved || guess, false);
  }

  /* ---------- Image fallback: labelled placeholder until real photo exists ---------- */
  function placeholder(name) {
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'>" +
      "<rect width='600' height='600' fill='#E6DDF4'/>" +
      "<text x='300' y='290' font-size='140' text-anchor='middle'>🐱</text>" +
      "<text x='300' y='390' font-size='30' font-family='sans-serif' font-weight='700' fill='#80566B' text-anchor='middle'>PLACEHOLDER</text>" +
      "<text x='300' y='430' font-size='24' font-family='sans-serif' fill='#80566B' text-anchor='middle'>add assets/" + name + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function applyFallback(img) {
    if (img.getAttribute("src").indexOf("data:") === 0) return; /* already a placeholder */
    img.src = placeholder(img.dataset.fallback || "teddy/main.jpg");
  }
  function initImages() {
    document.querySelectorAll("img[data-fallback]").forEach(function (img) {
      img.addEventListener("error", function () { applyFallback(img); });
      if (img.complete && img.naturalWidth === 0) applyFallback(img);
    });
  }

  /* ---------- Meow sound (synthesised, no audio file needed) ---------- */
  var audioCtx = null;
  var muted = false;
  try { muted = localStorage.getItem("ssc-muted") === "1"; } catch (e) {}

  function meow() {
    if (muted) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = audioCtx || new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
      var t = audioCtx.currentTime;
      var osc = audioCtx.createOscillator();
      var filter = audioCtx.createBiquadFilter();
      var gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.18);
      osc.frequency.exponentialRampToValueAtTime(520, t + 0.55);
      filter.type = "bandpass";
      filter.Q.value = 4;
      filter.frequency.setValueAtTime(900, t);
      filter.frequency.exponentialRampToValueAtTime(1800, t + 0.2);
      filter.frequency.exponentialRampToValueAtTime(900, t + 0.55);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.35, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      osc.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
      osc.start(t); osc.stop(t + 0.65);
    } catch (e) { /* audio is optional */ }
  }

  function initSoundToggle() {
    var btn = $("sound-toggle");
    function render() {
      btn.setAttribute("aria-pressed", muted ? "true" : "false");
      btn.setAttribute("aria-label", ui(muted ? "soundAriaOff" : "soundAriaOn"));
      btn.textContent = (muted ? "🔇 " : "🔊 ") + ui(muted ? "soundOff" : "soundOn");
    }
    btn.addEventListener("click", function () {
      muted = !muted;
      try { localStorage.setItem("ssc-muted", muted ? "1" : "0"); } catch (e) {}
      render();
      meow();
    });
    SSC.renderers.push(render);
  }

  /* ---------- Section 01: Sniff sniff ---------- */
  function initSniff() {
    var btn = $("sniff-btn");
    var photo = $("hero-photo");
    var img = $("hero-img");
    var box = $("sniff-result");
    var react = $("sniff-react");
    var msg = $("sniff-msg");
    var next = bag(SSC.i18n.en.sniffResults.length);
    var homeSrc = img.getAttribute("src");
    var sniffSrc = img.dataset.sniffSrc;
    var last = null, busy = false, revertTimer = null;

    function showResult() {
      var p = SSC.t().sniffResults[last];
      react.textContent = p.react;
      msg.textContent = ui("sniffPrefix") + "... " + p.msg;
    }
    function showSniffing() {
      react.textContent = ui("sniffing");
      msg.innerHTML = "";
      msg.appendChild(document.createTextNode(ui("sniffPrefix")));
      var dots = document.createElement("span");
      dots.className = "dots";
      msg.appendChild(dots);
    }

    btn.addEventListener("click", function () {
      if (busy) return;
      busy = true;
      last = next();
      btn.classList.add("is-sniffing-btn");
      restartAnim(photo, "is-sniffing");

      box.hidden = false;
      restartAnim(box, "pop");
      showSniffing();

      /* Swap to the "sniffing" photo if it exists; otherwise keep the home photo. */
      var probe = new Image();
      probe.onload = function () { img.src = sniffSrc; };
      probe.src = sniffSrc;

      setTimeout(function () {
        showResult();
        burst(btn, ["🐽", "✨", "💛", "🐾"]);
        btn.classList.remove("is-sniffing-btn");
        busy = false;
      }, reduceMotion ? 150 : 1200);

      clearTimeout(revertTimer);
      revertTimer = setTimeout(function () { img.src = homeSrc; }, 7000);
    });

    SSC.renderers.push(function () {
      if (last === null) return;
      if (busy) showSniffing(); else showResult();
    });
  }

  /* ---------- Section 03: Emergency cat ---------- */
  function initEmergency() {
    var btn = $("deploy-btn");
    var stage = $("emergency-stage");
    var msg = $("emergency-msg");
    var next = bag(SSC.i18n.en.emergency.length);
    var nextPhoto = bag(SSC.photos.funny.length);
    var photoImg = stage.querySelector("img");
    var last = null;

    function render() {
      btn.textContent = ui(last === null ? "deployBtn" : "deployAgain");
      if (last !== null) msg.textContent = SSC.t().emergency[last];
    }
    btn.addEventListener("click", function () {
      last = next();
      var file = SSC.photos.funny[nextPhoto()];   /* random funny photo */
      photoImg.dataset.fallback = file;
      photoImg.src = "assets/" + file;
      stage.hidden = false;
      restartAnim(stage, "deploy");
      render();
      meow();
      burst(btn, ["🚨", "🐾", "✨", "💥"]);
    });
    SSC.renderers.push(render);
  }

  /* ---------- Meme corner ----------
     Each click loads a random photo from the free cataas.com service and puts a
     funny caption on top. If it can't load (offline), it falls back to your own
     photo assets/memes/meme-NN.jpg, then to a labelled placeholder. */
  function initMemes() {
    var img = $("meme-img");
    var cap = $("meme-cap");
    var next = bag(SSC.i18n.en.memes.length);
    var last = 0;
    var localFile = "";

    function render() {
      var t = SSC.t().memes[last];
      $("meme-top").textContent = t.top;
      $("meme-bottom").textContent = t.bottom;
    }
    function photo() {
      localFile = "memes/meme-" + (last < 9 ? "0" : "") + (last + 1) + ".jpg";
      img.src = "https://cataas.com/cat?width=600&height=600&t=" + Date.now() + Math.floor(Math.random() * 1000);
    }
    img.addEventListener("error", function () {
      var src = img.getAttribute("src") || "";
      if (src.indexOf("https://") === 0) img.src = "assets/" + localFile;
      else if (src.indexOf("data:") !== 0) img.src = placeholder(localFile);
    });
    $("meme-btn").addEventListener("click", function () {
      var prev = last;
      last = next();
      if (last === prev) last = next();   /* never show the same caption twice in a row */
      photo();
      render();
      restartAnim(cap, "pop");
    });
    photo();
    SSC.renderers.push(render);
  }

  /* ---------- Section 05: Cat facts ---------- */
  function initFacts() {
    var text = $("fact-text");
    var next = bag(SSC.i18n.en.facts.length);
    var last = next();
    function render() { text.textContent = SSC.t().facts[last]; }
    $("fact-btn").addEventListener("click", function () {
      last = next();
      render();
      restartAnim(text, "pop");
    });
    SSC.renderers.push(render);
  }

  /* ---------- Section 06: Daily happiness ---------- */
  function initHappiness() {
    var tabs = document.querySelectorAll(".tab");
    var out = $("happy-msg");
    var bags = {};
    var current = "compliments";
    var last = null;
    Object.keys(SSC.i18n.en.happiness).forEach(function (k) {
      bags[k] = bag(SSC.i18n.en.happiness[k].length);
    });

    function render() {
      out.textContent = last === null ? ui("happyInit") : SSC.t().happiness[current][last];
    }
    function show() {
      last = bags[current]();
      render();
      restartAnim(out, "pop");
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        current = tab.dataset.cat;
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        show();
      });
    });
    $("happy-btn").addEventListener("click", show);
    SSC.renderers.push(render);
  }

  /* ---------- Section 07: Nap permission ---------- */
  function initNap() {
    var result = $("nap-result");
    var btn = $("nap-btn");
    var napImg = result.querySelector("img");
    var nextPhoto = bag(SSC.photos.sleep.length);
    function render() {
      btn.textContent = ui(result.hidden ? "napBtn" : "napAgain");
      $("nap-msg").textContent = ui("napMsg");
    }
    btn.addEventListener("click", function () {
      var file = SSC.photos.sleep[nextPhoto()];
      napImg.dataset.fallback = file;
      napImg.src = "assets/" + file;
      result.hidden = false;
      restartAnim(result, "pop");
      render();
      burst(btn, ["💤", "😴", "✨", "🌙"]);
    });
    SSC.renderers.push(render);
  }

  /* ---------- Lightbox (shared by "Meet the CEOs" and the Gallery) ---------- */
  var lightbox = null;

  function initLightbox() {
    var box = $("lightbox"), img = $("lb-img"), cap = $("lb-cap");
    var list = [], pos = 0, opener = null, getCap = null, getAlt = null;

    function show(i) {
      pos = (i + list.length) % list.length;
      img.src = "assets/" + list[pos];
      img.alt = getAlt();
      cap.textContent = getCap() + (list.length > 1 ? "  (" + (pos + 1) + "/" + list.length + ")" : "");
    }
    function open(files, start, from, capFn, altFn) {
      list = files; opener = from; getCap = capFn; getAlt = altFn;
      show(start || 0);
      box.hidden = false;
      document.body.style.overflow = "hidden";
      $("lb-close").focus();
    }
    function close() {
      box.hidden = true;
      document.body.style.overflow = "";
      if (opener && document.body.contains(opener)) opener.focus();
    }

    $("lb-close").addEventListener("click", close);
    $("lb-prev").addEventListener("click", function () { show(pos - 1); });
    $("lb-next").addEventListener("click", function () { show(pos + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(pos - 1);
      else if (e.key === "ArrowRight") show(pos + 1);
      else if (e.key === "Tab") {
        /* keep focus inside the dialog */
        var f = [$("lb-close"), $("lb-prev"), $("lb-next")];
        var at = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });

    /* simple swipe */
    var startX = null;
    box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(pos + (dx < 0 ? 1 : -1));
      startX = null;
    });

    SSC.renderers.push(function () { if (!box.hidden) show(pos); });
    lightbox = { open: open };
  }

  /* ---------- Section 04: Meet the CEOs (tap a card to open that cat's album) ---------- */
  function initCeoCards() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".gallery__item"));
    function label(item) {
      return item.querySelector(".gallery__name").textContent + " · " + item.querySelector(".gallery__caption").textContent;
    }
    cards.forEach(function (item) {
      var b = item.querySelector(".gallery__open");
      b.addEventListener("click", function () {
        lightbox.open(SSC.photos.gallery[item.dataset.cat], 0, b,
          function () { return label(item); },
          function () { return item.querySelector("img").alt; });
      });
    });
    SSC.renderers.push(function () {
      cards.forEach(function (item) {
        item.querySelector(".gallery__open").setAttribute("aria-label", ui("openPhoto") + ": " + label(item));
        var more = item.querySelector(".gallery__more");
        if (more) more.setAttribute("aria-label", ui("seeMore") + ": " + item.querySelector(".gallery__name").textContent);
      });
    });
  }

  /* ---------- Photo grid: shows 9, "See all" reveals the rest (Gallery + profile albums) ---------- */
  function makeGrid(grid, more, getItems) {
    var LIMIT = 9;               /* photos shown before "See all" */
    var names = { teddy: "Teddy", tam: "Tam" };
    var expanded = false;

    function moreText(total) { return expanded ? ui("showLess") : ui("seeAll") + " (" + total + ")"; }
    function build() {
      var items = getItems();
      var files = items.map(function (p) { return p.file; });
      var shown = expanded ? items : items.slice(0, LIMIT);
      grid.innerHTML = "";
      shown.forEach(function (p, i) {
        var li = document.createElement("li");
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", ui("openPhoto") + ": " + names[p.who] + " " + (i + 1));
        var im = document.createElement("img");
        im.src = "assets/thumbs/" + p.file;
        im.alt = names[p.who];
        im.loading = "lazy";
        im.width = 200; im.height = 200;
        im.addEventListener("error", function () {   /* no thumbnail yet: use the full photo */
          if (im.src.indexOf("/thumbs/") !== -1) im.src = "assets/" + p.file;
        });
        b.appendChild(im);
        b.addEventListener("click", function () {
          lightbox.open(files, i, b,
            function () { return names[p.who]; },
            function () { return names[p.who]; });
        });
        li.appendChild(b);
        grid.appendChild(li);
      });
      more.hidden = items.length <= LIMIT;
      more.textContent = moreText(items.length);
    }
    more.addEventListener("click", function () {
      expanded = !expanded;
      build();
      if (!expanded) grid.closest("section").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
    SSC.renderers.push(function () {
      more.textContent = moreText(getItems().length);
      Array.prototype.forEach.call(grid.querySelectorAll("button"), function (b, i) {
        b.setAttribute("aria-label", ui("openPhoto") + ": " + b.querySelector("img").alt + " " + (i + 1));
      });
    });
    return { build: build, reset: function () { expanded = false; } };
  }

  /* ---------- Gallery section: every photo, filter by Teddy / Tam ---------- */
  function initGallery() {
    var filters = document.querySelectorAll(".filter");
    var current = "all";
    var g = makeGrid($("photo-grid"), $("photo-more"), function () {
      return SSC.photos.all.filter(function (p) { return current === "all" || p.who === current; });
    });
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        current = f.dataset.filter;
        g.reset();
        filters.forEach(function (x) {
          var on = x === f;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        g.build();
      });
    });
    g.build();
  }

  /* ---------- CEO profile pages (teddy.html, tam.html) ---------- */
  function initProfile() {
    var who = document.body.dataset.who;
    var other = document.body.dataset.other;
    var capKey = { teddy: "cap1", tam: "cap2" }[who];
    var nextQuote = bag(SSC.i18n.en.profiles[who].quotes.length);
    var qi = nextQuote();

    var g = makeGrid($("pf-grid"), $("pf-more"), function () {
      return SSC.photos.all.filter(function (p) { return p.who === who; });
    });
    g.build();

    function render() {
      var d = SSC.t().profiles[who];
      $("pf-title").textContent = ui(capKey);
      $("pf-tagline").textContent = d.tagline;
      $("pf-bio").textContent = d.bio;
      $("pf-quote").textContent = d.quotes[qi];
      $("pf-other").textContent = ui(other === "tam" ? "meetTam" : "meetTeddy");

      var chips = $("pf-traits");
      chips.innerHTML = "";
      d.traits.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        chips.appendChild(li);
      });

      var rows = $("pf-rows");
      rows.innerHTML = "";
      d.rows.forEach(function (r) {
        var wrap = document.createElement("div");
        var dt = document.createElement("dt");
        var dd = document.createElement("dd");
        dt.textContent = r[0];
        dd.textContent = r[1];
        wrap.appendChild(dt);
        wrap.appendChild(dd);
        rows.appendChild(wrap);
      });
    }
    $("pf-quote-btn").addEventListener("click", function () {
      qi = nextQuote();
      render();
      restartAnim($("pf-quote"), "pop");
    });
    $("pf-photo").addEventListener("click", function () {
      restartAnim($("pf-photo"), "is-sniffing");
      burst($("pf-photo"), ["🐾", "✨", "💛", "🎉", "😻"]);
    });
    SSC.renderers.push(render);
  }

  /* ---------- A Little Note: swipeable slider ---------- */
  function initNotes() {
    var track = $("note-track");
    var dots = $("note-dots");
    var count = 1 + SSC.i18n.en.notes.length;   /* first slide is the original note */
    var current = 0;
    var texts = [];

    SSC.i18n.en.notes.forEach(function () {
      var slide = document.createElement("article");
      slide.className = "slide slide--quote";
      var p = document.createElement("p");
      slide.appendChild(p);
      track.appendChild(slide);
      texts.push(p);
    });

    var dotBtns = [];
    for (var i = 0; i < count; i++) {
      (function (n) {
        var b = document.createElement("button");
        b.type = "button";
        b.addEventListener("click", function () { go(n); });
        dots.appendChild(b);
        dotBtns.push(b);
      })(i);
    }

    function mark() {
      dotBtns.forEach(function (b, n) {
        b.classList.toggle("is-active", n === current);
        b.setAttribute("aria-current", n === current ? "true" : "false");
      });
    }
    function go(n) {
      n = (n + count) % count;
      track.scrollTo({ left: n * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    }
    var ticking = false;
    track.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        current = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
        mark();
        ticking = false;
      });
    });
    $("note-prev").addEventListener("click", function () { go(current - 1); });
    $("note-next").addEventListener("click", function () { go(current + 1); });

    SSC.renderers.push(function () {
      var list = SSC.t().notes;
      texts.forEach(function (p, n) { p.textContent = list[n]; });
      dotBtns.forEach(function (b, n) { b.setAttribute("aria-label", ui("noteDot") + " " + (n + 1) + "/" + count); });
      mark();
    });
  }

  /* ---------- Bottom nav highlighting ---------- */
  function initNav() {
    var groups = { home: "home", ceo: "cat", mood: "cat", happiness: "vibes", emergency: "vibes", note: "vibes", letters: "vibes", purr: "vibes", memes: "vibes", facts: "vibes", nap: "vibes", photos: "gallery", developer: "gallery" };
    var links = document.querySelectorAll(".bottomnav a");
    function mark(group) {
      links.forEach(function (a) { a.classList.toggle("is-active", a.dataset.group === group); });
    }
    mark("home");
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) mark(groups[en.target.id]);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(groups).forEach(function (id) {
      var el = $(id);
      if (el) io.observe(el);
    });
  }

  /* run an init only on pages that have its element */
  function when(id, fn) { if ($(id)) fn(); }

  document.addEventListener("DOMContentLoaded", function () {
    initImages();
    when("sound-toggle", initSoundToggle);
    when("sniff-btn", initSniff);
    when("mood-result", SSC.initMood);
    when("meme-btn", initMemes);
    when("deploy-btn", initEmergency);
    when("lightbox", initLightbox);
    initCeoCards();
    when("photo-grid", initGallery);
    when("fact-btn", initFacts);
    when("happy-btn", initHappiness);
    when("nap-btn", initNap);
    when("note-track", initNotes);
    if (document.body.dataset.who) initProfile();
    initNav();
    initLang();   /* last: fills in all text and runs every renderer */
  });
})();

/* Cat's Mood Detector — the replies live in messages.js (SSC.i18n.*.moods): several per mood, one is picked at random. */
window.SSC = window.SSC || {};

SSC.initMood = function () {
  var buttons = document.querySelectorAll(".mood__btn");
  var out = document.getElementById("mood-result");
  var catLine = document.getElementById("mood-cat");
  var noteLine = document.getElementById("mood-note");
  var photo = document.getElementById("mood-img");
  var current = null;
  var idx = 0;
  var bags = {};
  if (!buttons.length || !out) return;

  /* random reply for this mood, no repeats until all have been shown */
  function nextIndex(mood) {
    var n = SSC.i18n.en.moods[mood].length;
    if (!bags[mood] || !bags[mood].length) {
      bags[mood] = [];
      for (var i = 0; i < n; i++) bags[mood].push(i);
    }
    return bags[mood].splice(Math.floor(Math.random() * bags[mood].length), 1)[0];
  }

  function render() {
    if (!current) return;
    var data = SSC.t().moods[current][idx];
    catLine.textContent = data.cat;
    noteLine.textContent = data.note;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      current = btn.dataset.mood;
      idx = nextIndex(current);
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-selected", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var file = SSC.photos.mood[current];
      photo.dataset.fallback = file;
      photo.src = "assets/" + file;
      render();
      if (current === "happy" && SSC.burst) SSC.burst(btn, ["😻", "🎉", "✨", "💛"]);
      out.hidden = false;
      out.classList.remove("pop");
      void out.offsetWidth; /* restart the animation */
      out.classList.add("pop");
    });
  });

  SSC.renderers.push(render);
};

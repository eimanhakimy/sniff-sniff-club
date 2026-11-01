/* Cat's Mood Detector — the responses live in messages.js (SSC.i18n.*.moods). */
window.SSC = window.SSC || {};

SSC.initMood = function () {
  var buttons = document.querySelectorAll(".mood__btn");
  var out = document.getElementById("mood-result");
  var catLine = document.getElementById("mood-cat");
  var noteLine = document.getElementById("mood-note");
  var photo = document.getElementById("mood-img");
  var current = null;
  if (!buttons.length || !out) return;

  function render() {
    if (!current) return;
    var data = SSC.t().moods[current];
    catLine.textContent = data.cat;
    noteLine.textContent = data.note;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      current = btn.dataset.mood;
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-selected", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var file = SSC.photos.mood[current];
      photo.dataset.fallback = file;
      photo.src = "assets/" + file;
      render();
      out.hidden = false;
      out.classList.remove("pop");
      void out.offsetWidth; /* restart the animation */
      out.classList.add("pop");
    });
  });

  SSC.renderers.push(render);
};

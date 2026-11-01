/* Which photo goes where. Paths are inside assets/. Edit freely.
   Teddy's folder: assets/teddy/   Tam's folder: assets/tam/ */
window.SSC = window.SSC || {};

SSC.photos = {
  /* Hero photo, and the one it swaps to while sniffing */
  hero: "teddy/teddy-20.jpg",
  sniff: "teddy/teddy-17.jpg",

  /* Emergency Duo shows a random one of these each click */
  funny: [
    "teddy/teddy-25.jpg",
    "tam/tam-02.jpg",
    "teddy/teddy-02.jpg",
    "tam/tam-05.jpg",
    "teddy/teddy-30.jpg",
    "tam/tam-01.jpg"
  ],

  /* Nap Permission shows a random one of these each click */
  sleep: [
    "teddy/teddy-26.jpg",
    "teddy/teddy-01.jpg",
    "tam/tam-04.jpg",
    "teddy/teddy-30.jpg",
    "tam/tam-05.jpg"
  ],

  /* Mood detector photo for each mood */
  mood: {
    sad: "teddy/teddy-13.jpg",
    sleepy: "teddy/teddy-26.jpg",
    tired: "tam/tam-01.jpg",
    existing: "tam/tam-04.jpg",
    happy: "tam/tam-05.jpg"
  },

  /* "Meet the CEOs": the first photo is the card; tapping it opens all of them */
  gallery: {
    teddy: [
      "teddy/main.jpg", "teddy/teddy-20.jpg", "teddy/teddy-03.jpg", "teddy/teddy-05.jpg",
      "teddy/teddy-11.jpg", "teddy/teddy-13.jpg", "teddy/teddy-14.jpg", "teddy/teddy-17.jpg",
      "teddy/teddy-18.jpg", "teddy/teddy-19.jpg", "teddy/teddy-22.jpg", "teddy/teddy-25.jpg",
      "teddy/teddy-27.jpg", "teddy/teddy-28.jpg", "teddy/teddy-31.jpg", "teddy/teddy-32.jpg",
      "teddy/teddy-33.jpg", "teddy/teddy-34.jpg", "teddy/teddy-21.jpg", "teddy/teddy-02.jpg",
      "teddy/teddy-01.jpg", "teddy/teddy-26.jpg", "teddy/teddy-30.jpg"
    ],
    tam: [
      "tam/main.jpg", "tam/tam-03.jpg", "tam/tam-05.jpg", "tam/tam-02.jpg",
      "tam/tam-01.jpg", "tam/tam-04.jpg"
    ]
  }
};

/* Every photo in the Gallery section (all of Teddy's and Tam's folders). */
SSC.photos.all = (function () {
  var out = [];
  function add(who, n) {
    out.push({ who: who, file: who + "/main.jpg" });
    for (var i = 1; i <= n; i++) {
      out.push({ who: who, file: who + "/" + who + "-" + (i < 10 ? "0" : "") + i + ".jpg" });
    }
  }
  add("teddy", 34);
  add("tam", 5);
  return out;
})();

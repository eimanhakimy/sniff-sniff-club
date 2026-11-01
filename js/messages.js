/* Sniff Sniff Club — all editable text lives here (English "en" and Bahasa Melayu "ms").
   Keep both languages in the SAME ORDER: the lists line up one-to-one,
   so switching language shows the translation of the message you were reading.
   Add, remove or reword anything inside the quotes. Keep the commas! */
window.SSC = window.SSC || {};
SSC.lang = "en";
SSC.renderers = [];            /* functions re-run whenever the language changes */
SSC.t = function () { return SSC.i18n[SSC.lang]; };

SSC.i18n = {

  /* ===================== ENGLISH ===================== */
  en: {
    ui: {
      skip: "Skip to content",
      heroTitle: "Hey, you! ♡",
      heroSub: "Need a little happiness?",
      heroText: "Your favourite therapists, Teddy and Tam, are here.",
      altHome: "Teddy and Tam, looking adorable",
      sniffBtn: "SNIFF SNIFF",
      sniffing: "🐽 *sniffing intensely*",
      sniffPrefix: "Sniff sniff",

      moodTitle: "How are you feeling today?",
      moodHint: "Tap one. Teddy and Tam will respond.",
      moodGroup: "Choose your mood",
      mood_sad: "A little sad",
      mood_sleepy: "Sleepy",
      mood_tired: "Tired",
      mood_existing: "Just existing",
      mood_happy: "Happy",
      altMood: "Teddy and Tam reacting to your mood",
      memeTitle: "Meme Corner 😹",
      memeHint: "Freshly generated, extremely relatable.",
      memeBtn: "Next Meme",
      altMeme: "A funny meme",

      emergencyTitle: "🚨 Emergency Duo!",
      emergencyHint: "Bad vibes detected? We have a solution.",
      deployBtn: "DEPLOY TEDDY & TAM!",
      deployAgain: "DEPLOY AGAIN!",
      soundOn: "Meow on",
      soundOff: "Meow off",
      soundAriaOn: "Meow sound: on. Tap to mute.",
      soundAriaOff: "Meow sound: off. Tap to unmute.",
      altEmergency: "Teddy and Tam have arrived",

      ceoTitle: "Meet the CEOs 🐱",
      ceoHint: "Tap a photo to see more of them.",
      openPhoto: "Open photo",
      cap1: "CEO of Doing Absolutely Nothing.",
      cap2: "Certified Sniff Specialist.",
      alt1: "Teddy, doing absolutely nothing",
      alt2: "Tam, certified sniff specialist",

      galleryTitle: "Gallery 📸",
      galleryHint: "Every photo of Teddy and Tam. Tap one to see it bigger.",
      filterAll: "All",
      filterLabel: "Show photos of",
      factsTitle: "Did You Know?",
      factBtn: "Another Fun Fact",

      happyTitle: "A Little Happiness ♡",
      tabsLabel: "Message type",
      tab_compliments: "🌸 Compliments",
      tab_jokes: "😹 Jokes",
      tab_reminders: "🌿 Reminders",
      happyInit: "Tap the button for a little something.",
      happyBtn: "Give me another",

      napTitle: "Official Nap Permission 💤",
      napBtn: "Request Permission",
      napAgain: "Request Again",
      napMsg: "APPROVED! You are officially allowed to take a break.",
      altNap: "Teddy and Tam fast asleep",

      noteTitle: "A Little Note ♡",
      note1: "I hope this little corner of the internet brings you a smile, even on the days when things feel a little difficult.",
      note2: "Take care of yourself, keep smiling and remember that you deserve good things.",
      devTitle: "Meet the Developer",
      devName: "Labu",
      devRole: "Software Programmer",
      altDev: "Labu, the software programmer",
      noteSliderLabel: "Notes",
      notePrev: "Previous note",
      noteNext: "Next note",
      noteDot: "Note",
      footer: "Made by ManKim & the anak-anak bulus",

      navLabel: "Main",
      navHome: "Home",
      navCat: "Teddy & Tam",
      navVibes: "Good Vibes",
      navGallery: "Gallery",
      seeAll: "See all",
      showLess: "Show less",
      langLabel: "Language",

      lbLabel: "Photo viewer",
      lbClose: "Close",
      lbPrev: "Previous photo",
      lbNext: "Next photo"
    },

    /* `react` is the cat's reaction shown above the message */
    sniffResults: [
      { msg: "Hmmmm. 100% good vibes detected!", react: "😻 *slow happy blink*" },
      { msg: "Smells like you're about to have a great day.", react: "😸 *tail goes up*" },
      { msg: "Sniffed you. Result: certified wonderful human.", react: "🐾 *approving headbutt*" },
      { msg: "Detecting... snacks, sunshine and good luck nearby.", react: "😽 *purr purr purr*" },
      { msg: "Official finding: you are 87% cuddly and 13% chaos.", react: "🙀 *zoomies intensify*" },
      { msg: "No bad vibes found. I checked twice. And a third time.", react: "😺 *judging in a friendly way*" },
      { msg: "Warning: dangerously high levels of awesome.", react: "😹 *rolls over dramatically*" },
      { msg: "Smells like a good day is loading...", react: "🐱 *kneads the blanket*" }
    ],

    emergency: [
      "Bad vibes have been successfully knocked off the table. Just like a glass of water.",
      "Teddy and Tam have arrived. Please remain calm and pet accordingly.",
      "Rule #1: if it's stressful, stare at it until it goes away.",
      "Today's plan: do your best, then nap. In that order. Or just nap.",
      "Emergency resolved. Teddy and Tam are billing you in treats.",
      "You've survived 100% of your bad days so far. Great track record!",
      "Whatever it is, it's smaller than Tam's opinion of it.",
      "Breathe in. Breathe out. Pretend you're a loaf.",
      "Meowtivational quote: today you can do it, because you're purr-fect.",
      "Help is on the way. It is mostly fur, but it is on the way."
    ],

    /* Meme text: `top` and `bottom` lines go over a random photo, classic meme style.
       Same order in both languages. These are DRAFT lines: replace them with your own. */
    memes: [
      { top: "Me: I'll sleep early tonight", bottom: "Me at 3 AM: still scrolling" },
      { top: "When someone says", bottom: "'just one quick thing'" },
      { top: "Monday morning", bottom: "Me trying to be a functional person" },
      { top: "Me looking at my to-do list", bottom: "Nope" },
      { top: "When the snacks are finished", bottom: "But I still check the cupboard" },
      { top: "Me: I'm fine", bottom: "Also me: *deep breath*" },
      { top: "Me: I'll just check one message", bottom: "Me, 2 hours later: still on my phone" },
      { top: "Alarm: *rings*", bottom: "Me: five more minutes (x12)" },
      { top: "Me: I don't need coffee", bottom: "Also me: *drinks the whole pot*" },
      { top: "When you finally sit down", bottom: "And remember one more thing to do" },
      { top: "Me pretending to listen", bottom: "Brain: snack time?" },
      { top: "Diet starts on Monday", bottom: "Today is Tuesday" },
      { top: "Me: I'll save money this month", bottom: "Online shopping: new phone, who dis?" },
      { top: "Is this a meeting?", bottom: "It could have been a message" },
      { top: "Me after one hour of being social", bottom: "Battery: 2%" },
      { top: "Plans cancelled", bottom: "Best news of the week" },
      { top: "Me looking for my phone", bottom: "While holding my phone" },
      { top: "Me: I should drink more water", bottom: "Also me: *drinks more coffee*" },
      { top: "When the Wi-Fi drops", bottom: "My mood drops too" },
      { top: "Friday: finally", bottom: "Me: sleeps until noon" }
    ],

    facts: [
      "Felines like Teddy and Tam sleep around 12 to 16 hours a day, and kittens and seniors often sleep even more.",
      "A purr vibrates at roughly 25 to 150 Hz, a range linked to comfort and healing.",
      "Felines have a special organ called the Jacobson's organ that helps them 'taste' scents in the air.",
      "Teddy's and Tam's noses each have a one-of-a-kind print, much like a human fingerprint.",
      "Teddy and Tam can rotate each ear up to about 180 degrees, thanks to around 30 muscles per ear.",
      "A group of felines is called a clowder. A group of kittens is a kindle.",
      "Teddy and Tam have a third eyelid, called the nictitating membrane, that helps protect their eyes.",
      "Whiskers help Teddy and Tam judge whether they can fit through a space and sense nearby air movement.",
      "Teddy and Tam can't taste sweetness. They lack the receptor for it.",
      "When Teddy or Tam slow-blinks at you, it's often a sign of trust and affection.",
      "Adult felines mostly meow to communicate with humans, not with each other.",
      "Teddy and Tam have excellent night vision and need only about one sixth of the light humans need.",
      "Their collarbones don't connect to other bones, which helps them squeeze through tight gaps.",
      "Kneading with paws is a habit that starts in kittenhood while nursing.",
      "Most felines have 18 toes: five on each front paw and four on each back paw."
    ],

    happiness: {
      compliments: [
        "You're doing better than you think.",
        "You have a really good heart. Teddy and Tam noticed.",
        "Your smile is a very good one. Use it more often.",
        "You make hard days a little lighter.",
        "You're stronger than you realize.",
        "The world is nicer with you in it.",
        "You're the kind of person Teddy and Tam approve of."
      ],
      jokes: [
        "Drink some water, human. You're not a cactus.",
        "What do you call Teddy and Tam in a pile? A meowtain.",
        "Why was Tam sitting on the computer? To keep an eye on the mouse.",
        "I told Teddy it was Monday. Straight back to sleep. Relatable.",
        "What's Tam's favourite colour? Purrple.",
        "Teddy and Tam don't have jobs. They have 'responsibilities' like staring at walls.",
        "What do Teddy and Tam read in the morning? The mewspaper."
      ],
      reminders: [
        "Today might be difficult, but you've got this.",
        "You deserve a little break.",
        "Don't forget to smile today.",
        "Stretch a little. Your back says thank you.",
        "Eat something nice. You're allowed to enjoy it.",
        "One small step at a time is still moving forward.",
        "It's okay to rest. Rest is productive too."
      ]
    },

    /* Slides after the first note in A Little Note (the first slide is note1 + note2 above) */
    notes: [
      "You are allowed to take things slowly. Slow progress is still progress.",
      "Even the strongest people have days when they need a break. This is yours.",
      "You don't have to have everything figured out today.",
      "Be as kind to yourself as you are to the people you care about.",
      "Small steps count. Every little effort adds up.",
      "It's okay to ask for help. It doesn't make you weak, it makes you wise.",
      "Better days are coming, and you're doing a good job getting there.",
      "Your feelings are valid, and so is your need to rest."
    ],

    moods: {
      sad: [
        { cat: "🐾 Sending you one tiny virtual paw hug.", note: "Everything will be okay, one step at a time. It's fine to feel this way for a bit." },
        { cat: "🥹 Teddy and Tam are sitting next to you right now. No questions asked.", note: "You don't have to explain anything. Just breathe and let it be a slow day." },
        { cat: "💛 Sad days are allowed. So are cry breaks and snacks.", note: "Be gentle with yourself. You'd do the same for a friend." },
        { cat: "🫶 *slow blink* That means 'I love you' in my language.", note: "Whatever is weighing on you, it won't be this heavy forever." },
        { cat: "🌧️ Rainy feelings pass, just like rainy days.", note: "Drink some water, take a breath, and do one small nice thing for yourself." },
        { cat: "🤗 Group hug from Teddy and Tam! Fur included, no extra charge.", note: "You're not alone, and you're doing better than you think." }
      ],
      sleepy: [
        { cat: "😴 Ah, a fellow professional. I respect the dedication.", note: "Your body is asking for rest. A cozy nap or an early night is a perfectly good plan." },
        { cat: "😴 Teddy and Tam have been sleepy for years. You're in good company.", note: "Listen to your body. A short rest can make everything feel lighter." },
        { cat: "🛏️ Official diagnosis: the bed is calling.", note: "If you can, take a 20-minute nap. If you can't, at least stretch and sip some water." },
        { cat: "🥱 Yawn detected. It's contagious, now I'm sleepy too.", note: "No shame in an early night. Tomorrow-you will say thank you." },
        { cat: "💤 Eyes closing? Perfect nap weather.", note: "Rest isn't lazy. It's how you recharge for the good stuff." },
        { cat: "🌙 Sleepy is just your body asking nicely before it asks loudly.", note: "Put the phone down for a bit and give yourself a cozy break." }
      ],
      tired: [
        { cat: "Understandable. Have you tried sleeping for 14 hours like me?", note: "You've been doing a lot. Take a breath, drink some water, and go easy on yourself." },
        { cat: "😵 You've been carrying a lot. Time to put some of it down.", note: "Pick just one thing to do next. The rest can wait." },
        { cat: "🔋 Battery low. Please recharge with a snack and a break.", note: "Recharging is part of the work, not a break from it." },
        { cat: "☕ Tired is real. Be kind to yourself today.", note: "Lower the bar a little today. Done is better than perfect." },
        { cat: "🧸 Teddy would tell you to loaf around for a while. Tam agrees.", note: "Sit down, loosen your shoulders, and breathe slowly three times." },
        { cat: "🌿 You don't have to be productive to be valuable.", note: "Rest first. The world can wait a few minutes." }
      ],
      existing: [
        { cat: "😐 Ah, the classic loaf mode. Very advanced.", note: "Some days are just for existing, and that counts. Small wins still count too." },
        { cat: "🍞 Loaf mode activated. Paws tucked, zero expectations.", note: "Some days are for simply being, and that's perfectly fine." },
        { cat: "😶 Not good, not bad, just vibes. Respect.", note: "Neutral days are the quiet in between. They count too." },
        { cat: "🪟 Staring out of the window counts as a hobby.", note: "Maybe do one tiny thing you enjoy, just to nudge the day along." },
        { cat: "🫥 Teddy and Tam do this for hours every day. Elite behaviour.", note: "No need to force a mood. Let it come when it's ready." },
        { cat: "🎲 Plot twist: 'okay' is a perfectly good way to feel.", note: "A glass of water and a short walk can make 'okay' a little brighter." }
      ],
      happy: [
        { cat: "😻 Excellent! I am doing my happy tail wiggle for you.", note: "Keep that energy! The world could use more of your good mood today." },
        { cat: "🎉 Zoomies approved! Run around the house if you must.", note: "Hold on to this feeling. Tell someone about it and spread a little." },
        { cat: "😆 Your happiness just made the whole room warmer.", note: "Take a mental snapshot of what made today good." },
        { cat: "🌟 Teddy and Tam are purring on your behalf.", note: "Enjoy it fully. You deserve every bit of it." },
        { cat: "🍰 Happy mood detected. This calls for a snack.", note: "Share the good mood with someone today. It multiplies." },
        { cat: "💃 Happy dance time! No audience required.", note: "Keep that energy. Tomorrow-you will thank you for the good memories." }
      ]
    }
  },

  /* ===================== BAHASA MELAYU ===================== */
  ms: {
    ui: {
      skip: "Langkau ke kandungan",
      heroTitle: "Hai, awak! ♡",
      heroSub: "Perlukan sedikit kegembiraan?",
      heroText: "Terapis kegemaran awak, Teddy dan Tam, sudah sampai.",
      altHome: "Teddy dan Tam yang comel",
      sniffBtn: "HIDU HIDU",
      sniffing: "🐽 *menghidu sungguh-sungguh*",
      sniffPrefix: "Hidu hidu",

      moodTitle: "Apa perasaan awak hari ini?",
      moodHint: "Tekan satu. Teddy dan Tam akan membalas.",
      moodGroup: "Pilih perasaan awak",
      mood_sad: "Agak sedih",
      mood_sleepy: "Mengantuk",
      mood_tired: "Penat",
      mood_existing: "Sekadar wujud",
      mood_happy: "Gembira",
      altMood: "Teddy dan Tam membalas perasaan awak",
      memeTitle: "Sudut Meme 😹",
      memeHint: "Baru dibuat, memang relatable.",
      memeBtn: "Meme Seterusnya",
      altMeme: "Meme lucu",

      emergencyTitle: "🚨 Duo Kecemasan!",
      emergencyHint: "Aura tak best dikesan? Kami ada penyelesaian.",
      deployBtn: "HANTAR TEDDY & TAM!",
      deployAgain: "HANTAR LAGI!",
      soundOn: "Meow hidup",
      soundOff: "Meow senyap",
      soundAriaOn: "Bunyi meow: hidup. Tekan untuk senyap.",
      soundAriaOff: "Bunyi meow: senyap. Tekan untuk hidupkan.",
      altEmergency: "Teddy dan Tam telah tiba",

      ceoTitle: "Kenali Bos-Bos Kita 🐱",
      ceoHint: "Tekan gambar untuk lihat lebih banyak.",
      openPhoto: "Buka gambar",
      cap1: "Ketua Pegawai Eksekutif Tak Buat Apa-Apa.",
      cap2: "Pakar Hidu Bertauliah.",
      alt1: "Teddy, tidak buat apa-apa",
      alt2: "Tam, pakar hidu bertauliah",

      galleryTitle: "Galeri 📸",
      galleryHint: "Semua gambar Teddy dan Tam. Tekan satu untuk lihat lebih besar.",
      filterAll: "Semua",
      filterLabel: "Papar gambar",
      factsTitle: "Tahukah Awak?",
      factBtn: "Fakta Menarik Lagi",

      happyTitle: "Sedikit Kegembiraan ♡",
      tabsLabel: "Jenis mesej",
      tab_compliments: "🌸 Pujian",
      tab_jokes: "😹 Jenaka",
      tab_reminders: "🌿 Peringatan",
      happyInit: "Tekan butang untuk sesuatu yang menggembirakan.",
      happyBtn: "Beri lagi",

      napTitle: "Kebenaran Tidur Rasmi 💤",
      napBtn: "Mohon Kebenaran",
      napAgain: "Mohon Lagi",
      napMsg: "DILULUSKAN! Awak secara rasmi dibenarkan berehat.",
      altNap: "Teddy dan Tam sedang lena",

      noteTitle: "Sedikit Nota ♡",
      note1: "Saya harap sudut kecil internet ini membawa senyuman, walaupun pada hari-hari yang terasa sukar.",
      note2: "Jaga diri, teruslah tersenyum dan ingat bahawa awak layak mendapat perkara yang baik.",
      devTitle: "Kenali Pembangun",
      devName: "Labu",
      devRole: "Pengaturcara Perisian",
      altDev: "Labu, pengaturcara perisian",
      noteSliderLabel: "Nota",
      notePrev: "Nota sebelumnya",
      noteNext: "Nota seterusnya",
      noteDot: "Nota",
      footer: "Dibuat oleh ManKim & anak-anak bulus",

      navLabel: "Utama",
      navHome: "Utama",
      navCat: "Teddy & Tam",
      navVibes: "Aura Positif",
      navGallery: "Galeri",
      seeAll: "Lihat semua",
      showLess: "Tunjuk kurang",
      langLabel: "Bahasa",

      lbLabel: "Pemapar gambar",
      lbClose: "Tutup",
      lbPrev: "Gambar sebelumnya",
      lbNext: "Gambar seterusnya"
    },

    sniffResults: [
      { msg: "Hmmmm. 100% aura positif dikesan!", react: "😻 *kelip mata perlahan*" },
      { msg: "Bau macam hari ni bakal jadi hari yang best.", react: "😸 *ekor tegak*" },
      { msg: "Dah hidu awak. Keputusan: manusia hebat yang bertauliah.", react: "🐾 *sondol kepala tanda setuju*" },
      { msg: "Mengesan... snek, cahaya matahari dan tuah di sekitar.", react: "😽 *purr purr purr*" },
      { msg: "Dapatan rasmi: awak 87% comel dan 13% kecoh.", react: "🙀 *mula berlari-lari gila*" },
      { msg: "Tiada aura negatif dijumpai. Dah semak dua kali. Dan kali ketiga.", react: "😺 *menilai dengan penuh mesra*" },
      { msg: "Amaran: tahap kehebatan terlalu tinggi.", react: "😹 *golek-golek dramatik*" },
      { msg: "Bau macam hari yang baik sedang dimuat turun...", react: "🐱 *menguli selimut*" }
    ],

    emergency: [
      "Aura buruk berjaya ditolak jatuh dari meja. Macam gelas air tu.",
      "Teddy dan Tam dah tiba. Sila bertenang dan belai dengan sewajarnya.",
      "Peraturan #1: kalau stres, tenung benda tu sampai dia pergi.",
      "Pelan hari ni: buat yang terbaik, lepas tu tidur. Ikut urutan. Atau tidur je terus.",
      "Kecemasan selesai. Teddy dan Tam akan caj awak dengan snek.",
      "Awak dah berjaya harungi 100% hari yang teruk setakat ni. Rekod yang hebat!",
      "Apa pun masalahnya, ia lebih kecil daripada pendapat Tam tentangnya.",
      "Tarik nafas. Hembus. Buat-buat jadi roti.",
      "Kata semangat meow: hari ni awak boleh, sebab awak 'purr-fect'.",
      "Bantuan dalam perjalanan. Kebanyakannya bulu, tapi dalam perjalanan."
    ],

    /* Teks meme: baris `top` dan `bottom` di atas gambar rawak, gaya meme klasik.
       Susunan sama dalam kedua-dua bahasa. Ini baris CONTOH: gantikan dengan ayat lucu awak sendiri. */
    memes: [
      { top: "Saya: nak tidur awal malam ni", bottom: "Saya pukul 3 pagi: masih scroll" },
      { top: "Bila orang kata", bottom: "'sekejap je'" },
      { top: "Pagi Isnin", bottom: "Saya cuba jadi manusia yang berfungsi" },
      { top: "Saya tengok senarai tugas", bottom: "Tak nak" },
      { top: "Bila snek dah habis", bottom: "Tapi masih buka kabinet" },
      { top: "Saya: saya okey", bottom: "Saya juga: *tarik nafas*" },
      { top: "Saya: nak semak satu mesej je", bottom: "Saya 2 jam kemudian: masih main telefon" },
      { top: "Penggera: *berbunyi*", bottom: "Saya: lima minit lagi (x12)" },
      { top: "Saya: tak perlu kopi", bottom: "Saya juga: *habiskan sepoci*" },
      { top: "Bila akhirnya boleh duduk", bottom: "Tiba-tiba teringat satu lagi kerja" },
      { top: "Saya pura-pura dengar", bottom: "Otak: waktu snek ke?" },
      { top: "Diet mula hari Isnin", bottom: "Hari ini Selasa" },
      { top: "Saya: bulan ni nak jimat", bottom: "Beli-belah online: telefon baru, siapa ni?" },
      { top: "Ini mesyuarat ke?", bottom: "Boleh je hantar mesej" },
      { top: "Saya lepas sejam bersosial", bottom: "Bateri: 2%" },
      { top: "Pelan dibatalkan", bottom: "Berita terbaik minggu ini" },
      { top: "Saya cari telefon", bottom: "Sambil pegang telefon" },
      { top: "Saya: patut minum lebih air", bottom: "Saya juga: *minum lagi kopi*" },
      { top: "Bila Wi-Fi terputus", bottom: "Mood pun ikut terputus" },
      { top: "Jumaat: akhirnya", bottom: "Saya: tidur sampai tengah hari" }
    ],

    facts: [
      "Haiwan seperti Teddy dan Tam tidur sekitar 12 hingga 16 jam sehari, dan yang masih kecil serta yang sudah tua sering tidur lebih lama.",
      "Dengkuran bergetar pada kira-kira 25 hingga 150 Hz, julat yang dikaitkan dengan ketenangan dan penyembuhan.",
      "Teddy dan Tam ada organ khas bernama organ Jacobson yang membantu mereka 'merasa' bau di udara.",
      "Hidung Teddy dan Tam masing-masing mempunyai corak unik, seperti cap jari manusia.",
      "Teddy dan Tam boleh memutar setiap telinga sehingga kira-kira 180 darjah, hasil kira-kira 30 otot pada setiap telinga.",
      "Sekumpulan felin dipanggil 'clowder'. Sekumpulan anak felin pula 'kindle'.",
      "Teddy dan Tam mempunyai kelopak mata ketiga, dipanggil membran nictitating, yang melindungi mata mereka.",
      "Misai membantu Teddy dan Tam menilai sama ada mereka muat melalui sesuatu ruang dan mengesan pergerakan udara berdekatan.",
      "Teddy dan Tam tidak dapat merasa manis kerana mereka tiada reseptor untuknya.",
      "Apabila Teddy atau Tam berkelip perlahan kepada awak, ia selalunya tanda percaya dan sayang.",
      "Felin dewasa kebanyakannya mengeow untuk berkomunikasi dengan manusia, bukan sesama mereka.",
      "Teddy dan Tam mempunyai penglihatan malam yang sangat baik dan hanya perlukan kira-kira satu perenam cahaya yang manusia perlukan.",
      "Tulang selangka mereka tidak bersambung dengan tulang lain, jadi mereka boleh menyelit di ruang sempit.",
      "Menguli dengan kaki ialah tabiat yang bermula sejak kecil ketika menyusu.",
      "Kebanyakan felin ada 18 jari kaki: lima pada setiap kaki depan dan empat pada setiap kaki belakang."
    ],

    happiness: {
      compliments: [
        "Awak buat lebih baik daripada yang awak sangka.",
        "Awak ada hati yang sangat baik. Teddy dan Tam pun perasan.",
        "Senyuman awak cantik. Gunakan lebih kerap.",
        "Awak buat hari yang susah jadi sedikit lebih ringan.",
        "Awak lebih kuat daripada yang awak sedar.",
        "Dunia lebih indah dengan kehadiran awak.",
        "Awak jenis manusia yang Teddy dan Tam restui."
      ],
      jokes: [
        "Minum air, manusia. Awak bukan kaktus.",
        "Apa nama Teddy dan Tam bila bertimbun? Sebuah meowtain.",
        "Kenapa Tam duduk atas komputer? Nak jaga tetikus.",
        "Saya beritahu Teddy hari ni Isnin. Terus sambung tidur. Memang relatable.",
        "Apa warna kegemaran Tam? Ungu... eh, 'purrple'.",
        "Teddy dan Tam tak ada kerja. Mereka ada 'tanggungjawab' seperti merenung dinding.",
        "Apa Teddy dan Tam baca pagi-pagi? Akhbar... eh, 'mewspaper'."
      ],
      reminders: [
        "Hari ini mungkin sukar, tapi awak boleh.",
        "Awak layak berehat sebentar.",
        "Jangan lupa senyum hari ini.",
        "Regangkan badan sikit. Belakang awak ucap terima kasih.",
        "Makan sesuatu yang sedap. Awak boleh menikmatinya.",
        "Satu langkah kecil pada satu masa tetap bergerak ke hadapan.",
        "Tak apa untuk berehat. Berehat pun satu produktiviti."
      ]
    },

    /* Slides after the first note in A Little Note (the first slide is note1 + note2 above) */
    notes: [
      "Awak dibenarkan buat sesuatu dengan perlahan. Kemajuan yang perlahan tetap kemajuan.",
      "Orang paling kuat pun ada hari yang perlukan rehat. Inilah hari awak.",
      "Awak tak perlu tahu semuanya hari ini.",
      "Berbaik-baiklah dengan diri sendiri seperti awak berbaik dengan orang yang awak sayang.",
      "Langkah kecil pun dikira. Setiap usaha kecil bertambah.",
      "Tak apa untuk minta tolong. Ia tak menjadikan awak lemah, ia menjadikan awak bijak.",
      "Hari yang lebih baik akan tiba, dan awak sedang buat kerja yang baik untuk sampai ke sana.",
      "Perasaan awak sah, begitu juga keperluan awak untuk berehat."
    ],

    moods: {
      sad: [
        { cat: "🐾 Menghantar satu pelukan kaki maya yang kecil.", note: "Semuanya akan okey, satu langkah demi satu langkah. Tak apa rasa begini sekejap." },
        { cat: "🥹 Teddy dan Tam duduk sebelah awak sekarang. Tak payah tanya apa-apa.", note: "Awak tak perlu terangkan apa-apa. Tarik nafas dan biar hari ini berjalan perlahan." },
        { cat: "💛 Hari sedih pun dibenarkan. Begitu juga rehat menangis dan snek.", note: "Berlembutlah dengan diri sendiri. Awak pun akan buat begitu untuk kawan." },
        { cat: "🫶 *kelip mata perlahan* Dalam bahasa saya, itu maksudnya 'saya sayang awak'.", note: "Apa pun yang membebankan, ia tak akan sentiasa seberat ini." },
        { cat: "🌧️ Perasaan mendung akan berlalu, macam hari hujan.", note: "Minum air, tarik nafas, dan buat satu perkara kecil yang baik untuk diri sendiri." },
        { cat: "🤗 Pelukan berkumpulan dari Teddy dan Tam! Bulu termasuk, tiada caj tambahan.", note: "Awak tak keseorangan, dan awak buat lebih baik daripada yang awak sangka." }
      ],
      sleepy: [
        { cat: "😴 Ah, rakan sekerja profesional. Saya hormati dedikasi awak.", note: "Badan awak minta rehat. Tidur sekejap atau tidur awal memang pelan yang bagus." },
        { cat: "😴 Teddy dan Tam dah lama mengantuk. Awak berada dalam kumpulan yang baik.", note: "Dengar cakap badan awak. Rehat sekejap boleh buat semuanya terasa lebih ringan." },
        { cat: "🛏️ Diagnosis rasmi: katil sedang memanggil.", note: "Kalau boleh, tidur 20 minit. Kalau tak boleh, sekurang-kurangnya regang badan dan minum air." },
        { cat: "🥱 Menguap dikesan. Berjangkit, sekarang saya pun mengantuk.", note: "Tak salah tidur awal malam ini. Awak esok akan ucap terima kasih." },
        { cat: "💤 Mata dah nak tertutup? Cuaca sesuai untuk tidur.", note: "Berehat bukan malas. Ia cara awak mengecas untuk perkara yang best." },
        { cat: "🌙 Mengantuk ialah badan awak minta dengan baik sebelum minta dengan kuat.", note: "Letak telefon sekejap dan beri diri awak rehat yang selesa." }
      ],
      tired: [
        { cat: "Faham. Pernah cuba tidur 14 jam macam saya?", note: "Awak dah buat banyak benda. Tarik nafas, minum air, dan jangan terlalu keras pada diri sendiri." },
        { cat: "😵 Awak dah bawa banyak benda. Masa untuk letak sebahagiannya.", note: "Pilih satu perkara sahaja untuk dibuat seterusnya. Yang lain boleh tunggu." },
        { cat: "🔋 Bateri rendah. Sila cas dengan snek dan rehat.", note: "Mengecas diri ialah sebahagian daripada kerja, bukan berhenti kerja." },
        { cat: "☕ Penat itu nyata. Berbaik-baiklah dengan diri sendiri hari ini.", note: "Rendahkan sedikit standard hari ini. Siap lebih baik daripada sempurna." },
        { cat: "🧸 Teddy akan suruh awak berbaring santai sekejap. Tam setuju.", note: "Duduk, longgarkan bahu, tarik nafas perlahan tiga kali." },
        { cat: "🌿 Awak tak perlu produktif untuk jadi bernilai.", note: "Rehat dahulu. Dunia boleh tunggu beberapa minit." }
      ],
      existing: [
        { cat: "😐 Ah, mod roti yang klasik. Sangat canggih.", note: "Ada hari memang untuk sekadar wujud, dan itu pun dikira. Kejayaan kecil pun dikira." },
        { cat: "🍞 Mod roti diaktifkan. Kaki dilipat, tiada jangkaan.", note: "Ada hari memang untuk sekadar wujud, dan itu tak mengapa." },
        { cat: "😶 Tak baik, tak buruk, cuma vibes. Respect.", note: "Hari neutral ialah ketenangan di antara. Ia pun dikira." },
        { cat: "🪟 Merenung ke luar tingkap dikira hobi.", note: "Mungkin buat satu perkara kecil yang awak suka, sekadar menolak hari ini sikit." },
        { cat: "🫥 Teddy dan Tam buat begini berjam-jam setiap hari. Tingkah laku elit.", note: "Tak perlu paksa perasaan. Biar ia datang bila sedia." },
        { cat: "🎲 Plot twist: 'okey' ialah cara yang elok untuk rasa.", note: "Segelas air dan jalan-jalan sekejap boleh buat 'okey' sedikit lebih cerah." }
      ],
      happy: [
        { cat: "😻 Bagus! Saya goyang ekor gembira untuk awak.", note: "Kekalkan tenaga itu! Dunia perlukan lebih banyak mood baik awak hari ini." },
        { cat: "🎉 Zoomies diluluskan! Berlarilah keliling rumah kalau perlu.", note: "Pegang perasaan ini. Ceritakan pada seseorang dan kongsi sedikit." },
        { cat: "😆 Kegembiraan awak baru buat seluruh bilik jadi lebih hangat.", note: "Ambil gambar mental tentang apa yang buat hari ini baik." },
        { cat: "🌟 Teddy dan Tam sedang mendengkur bagi pihak awak.", note: "Nikmatilah sepenuhnya. Awak layak mendapat semuanya." },
        { cat: "🍰 Mood gembira dikesan. Ini memerlukan snek.", note: "Kongsi mood baik itu dengan seseorang hari ini. Ia berganda." },
        { cat: "💃 Masa menari gembira! Tak perlukan penonton.", note: "Kekalkan tenaga itu. Awak esok akan berterima kasih untuk kenangan yang baik." }
      ]
    }
  }
};

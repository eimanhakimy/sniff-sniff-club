# 🐾 Sniff Sniff Club

A small, wholesome, mobile-first website that delivers happiness through photos of one very important cat.
Plain HTML, CSS and vanilla JavaScript. No build step, no backend, works on GitHub Pages.

## Run it locally

Just double-click `index.html`. (Or serve the folder: `python -m http.server` and open http://localhost:8000.)

## Add your cat photos

Photos live in `assets/teddy/`, `assets/tam/`, `assets/labu/` (developer) and `assets/memes/` (optional fallback).

**`js/photos.js` decides which photo is used where**: hero, sniff, the random Emergency Duo and Nap photos, the photo for each mood, and the album that opens when you tap Teddy or Tam in "Meet the CEOs". To change one, edit the file path there. To add a new photo, drop it in the folder (use simple names like `teddy-35.jpg`, no spaces) and add its path to a list in `photos.js`.

The **Gallery** section shows every photo in `assets/teddy/` and `assets/tam/` (the list is built in `js/photos.js`; if you add `teddy-35.jpg`, raise the number in `add("teddy", 34)`). The grid loads small thumbnails from `assets/thumbs/`: after adding photos run `python make-thumbs.py` (needs `pip install pillow`) to make them.

Photos are already small (about 25 to 230 KB each). For new ones, resize to about 1000 px wide so the site loads fast on phones. Names are case-sensitive on GitHub Pages.

Until a photo exists, a clearly labelled **PLACEHOLDER** shows the filename it is waiting for.

Tips: keep each photo under ~300 KB (resize to about 1000 px wide) so it loads quickly on phones.
Names are case-sensitive on GitHub Pages, so use lowercase `.jpg` (rename `.jpeg`/`.png` files or edit the `src` in `index.html`).

## Change the text

- `js/messages.js` holds **all** text in two languages: `en` (English) and `ms` (Bahasa Melayu). This covers headings, buttons, gallery captions, the closing note, sniff results, emergency messages, cat facts, compliments/jokes/reminders and mood responses.
- Keep the `en` and `ms` lists in the **same order** and the same length: they line up one-to-one, so switching language shows the translation of the message being read.
- The EN / BM switch (top right) remembers the choice. First visit picks BM automatically if the phone's language is Malay.
- The two cats' names (Teddy, Tam) are in `index.html` (`class="gallery__name"`); their funny titles are `cap1`/`cap2` in `js/messages.js`.

**Extras:** the welcome screen ("Hi Nissa"), the night mode button, the "Open When..." letters (`letters` in `js/messages.js`, the same order in English and Bahasa Melayu) and the Purr Corner. The letters are drafts: replace them with your own words. Night mode follows the phone's setting until the visitor taps the moon.

**CEO profile pages:** `teddy.html` and `tam.html` (opened from the "See more details" button on each CEO card). Their text (tagline, bio, the profile rows, trait chips and quotes) is under `profiles` in `js/messages.js`, in English and Bahasa Melayu. The current details are playful drafts: replace them with real ones. Photos come from `assets/teddy/` and `assets/tam/`.

Colours are CSS variables at the top of `css/style.css`.

## Sound

The meow is synthesised in the browser (Web Audio), so no audio file is required and it only plays after a tap.
A mute button sits under the Emergency Cat button, and the choice is remembered.

## Deploy to GitHub Pages

1. Create a GitHub account and a **new public repository** (e.g. `sniff-sniff-club`).
2. Upload everything in this folder (`index.html`, `css/`, `js/`, `assets/`, `README.md`) to the repository root.
   - On the repo page: **Add file → Upload files**, drag the folder contents in, then **Commit changes**.
   - Or with git:
     ```bash
     git init
     git add .
     git commit -m "Sniff Sniff Club"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/sniff-sniff-club.git
     git push -u origin main
     ```
3. In the repo go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then **Save**.
5. Wait a minute or two. Your site will be live at `https://YOUR-USERNAME.github.io/sniff-sniff-club/`.
6. Send the link, preferably to a phone. 🐱

All asset paths are relative, so it works under the `/sniff-sniff-club/` subfolder.
To update later, upload the changed files again and commit; Pages redeploys automatically.

## Project structure

```
index.html
css/style.css
js/messages.js   text content
js/mood.js       mood detector
js/main.js       interactions
js/extras.js     welcome screen, scroll reveal, paw trail, night mode, letters, Purr Corner
assets/teddy/    Teddy's photos
assets/tam/      Tam's photos
assets/labu/     developer photo
assets/memes/    meme photos
assets/sounds/   (optional) your own audio, currently unused
```

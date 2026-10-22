# HEGenAI Training

Site for the pilot and training on GenAI in assessment and feedback for higher
education educators (MSc thesis, DTU Compute, within the Erasmus+ project
HEGenAI). Plain HTML, CSS and a few small scripts, no third-party requests, no
personal data collected. The module list remembers which blocks a visitor has
marked as done; this is stored only in the visitor's own browser (localStorage)
and is never sent anywhere. Hosted on GitHub Pages; all links are relative.

## Files

- `index.html`: landing page
- `modules.html`: list of training modules, with each visitor's progress
- `module.html`: one template for every module, opened as `module.html?m=<module-id>`
- `about.html`: about this site and credits
- `privacy.html`: privacy notice
- `style.css`: shared styling
- `header-title.js`: fades the header title on the landing page
- `modules-data.js`: the list of blocks and modules (see the comment at the top for how to add a module)
- `progress.js`: saves progress in the browser's localStorage under `hegenai:progress:v1`
- `modules.js`: draws the module cards on `modules.html`
- `module.js`: draws a module page from the data and handles "Mark as done"
- `assets/`: `logo-w.svg`, `logo-b.svg`, `favicon.svg` (placeholders; replace with the real files under the same names)
- `.nojekyll`: switches off Jekyll on GitHub Pages

## Preview

Open `index.html` in a browser. No build step, and nothing is fetched, so it
also works straight from disk. The module list on `modules.html` and the
module pages need JavaScript; the other pages do not.

## Module data

All module content lives in `modules-data.js`, as `window.HEGENAI_MODULES`:

```js
{
  blocks: [ { id: "intro", title: "Intro" }, ... ],   // the five blocks, shared by every module
  modules: [
    {
      id: "declaring-genai-use",   // used in module.html?m=... and for progress
      number: 1,
      title: "Declaring GenAI use",
      cluster: null,               // group heading on modules.html, or null
      outcome: "...",              // one sentence, shown on the card and under the module title
      minutes: 60,
      status: "available",         // or "soon": not linked, page shows "Coming soon"
      blocks: [
        { id: "intro", minutes: 10, html: "<p>...</p>" },   // id matches a shared block
        ...
      ],
      sources: "<p>...</p>"        // the "Sources and credits" section
    }
  ]
}
```

Block `html` may use headings (`h3`), paragraphs, lists, links and callouts
(`<div class="callout">...</div>`). A block with `minutes: null` shows "Time to
be confirmed"; a block left out shows a placeholder. A `quiz` field on a block
is reserved for self-check questions and is not shown yet.

## Still to do

- Sign-up: when the survey URL exists, replace the "Sign-up opens soon" pill in `index.html` with a link to it.
- Add the official EU emblem as `assets/eu-emblem.svg` (or `.png`) and uncomment the image in the footer of all pages.
- Replace every "To be confirmed" on the pages once decided.

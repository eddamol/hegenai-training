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
- `site-header.js`: on narrow screens, folds the main navigation behind a menu button and hides the header while scrolling down
- `home.js`: opens one block card at a time on the landing page
- `modules-data.js`: the list of blocks and modules (see the comment at the top for how to add a module)
- `progress.js`: saves progress in the browser's localStorage under `hegenai:progress:v1`
- `modules.js`: draws the module cards on `modules.html`
- `module.js`: draws a module page from the data and handles "Mark as done"
- `quiz.js`: draws the self-check questions in a block and saves the answers
- `resources.js`: opens a module's materials (for example a sample case) in a panel beside the blocks, or full screen on narrow screens
- `assets/module-1/`: pictures used in Module 1 (`aias-figure-1.png`)
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
      outcome: "...",              // one sentence, shown on the card and as the "Key learning outcome"
      outcomeImage: { src: "assets/...", alt: "...", caption: "..." },   // optional picture beside the outcome; caption is optional
      outcomePreview: { resource: "finished-guide", caption: "..." },        // optional, instead of outcomeImage (see Module materials)
      audience: "...",             // optional; "For" in the "Before you start" card
      needs: "...",                // optional; "What you need" in the same card
      minutes: 60,
      extraMinutes: 20,            // optional post-module activity, in minutes
      status: "available",         // or "soon": not linked, page shows "Coming soon"
      blocks: [
        { id: "intro", minutes: 10, html: "<p>...</p>" },   // id matches a shared block
        ...
      ],
      resources: [ { id: "sample-case", title: "...", html: "<p>...</p>" } ],   // optional "Module materials"
      texts: [ { id: "see-prompt", kind: "prompt", lines: [ "..." ] } ],     // optional prompt and draft boxes
      sources: "<p>...</p>"        // the "Sources and credits" section
    }
  ]
}
```

Block `html` may use headings (`h3`), paragraphs, lists, links and callouts
(`<div class="callout">...</div>`).

Drop-downs are closed until opened, show a turning chevron, and may be nested:

```html
<details class="dropdown">
  <summary>The five levels</summary>
  <div class="dropdown-body">...</div>
</details>
```

A link with `data-open-image` opens the picture it links to in the side panel,
with an "Open full size" link under it. `data-title` is the panel heading and
`data-alt` the picture's description. Ctrl, Cmd or Shift click still opens the
file in a new tab.

```html
<a href="assets/module-1/aias-figure-1.png" data-open-image data-title="The AI Assessment Scale" data-alt="...">See the original figure</a>
```

Steps are a numbered list with circles joined by a line:

```html
<ol class="step-list" role="list">
  <li><p><strong>Choose the level.</strong> ...</p></li>
</ol>
```

Checks start with a small text label, so the word carries the meaning and the
colour only supports it:

```html
<ul class="check-list" role="list">
  <li><span class="check-label check-label-ok">OK</span> <span><strong>The level fits.</strong> ...</span></li>
  <li><span class="check-label check-label-fixed">Fixed</span> <span>...</span></li>
</ul>
```

A `<button type="button" class="link-button" data-open-resource="...">` looks
like a text link and opens a module material in the side panel.

### Prompt boxes and draft boxes

`<div data-text="<id>"></div>` in block html shows an entry from the module's
`texts`:

```js
texts: [
  {
    id: "see-prompt",
    kind: "prompt",                // or "draft"
    label: "Prompt",               // a draft box shows it above the text; a prompt box gives it to screen readers
    showLines: 6,                  // lines shown before the toggle; leave out to show all
    moreLabel: "Show the whole prompt",
    lines: [ "Assignment: {{Case study report. ...}}", "..." ]
  }
]
```

All lines are set as text, never as HTML. In a prompt, `{{...}}` marks a
filled-in value, shown tinted and underlined. In a draft, a line starting `# `
is a heading, `- ` a list item, and anything else a paragraph. The toggle
under the box shows or hides the rest and switches to "Show less". Try it will
reuse the prompt box with a copy button and a level picker. If a module has `audience` or `needs`, they appear in a card (labelled "Before you start" for screen readers)
in the right-hand column, above the contents panel. The card scrolls away with
the page while the contents panel stays in view. On narrow screens it sits
under the outcome. A module without `audience` shows "For: Higher education
educators" in the time line instead.

A block with `minutes: null` shows "Time to
be confirmed"; a block left out shows a placeholder.

A block may have a self-check, shown after its content and before "Mark as done":

```js
quiz: {
  title: "Self-check",             // heading above the questions
  intro: "...",                    // optional line under the heading
  scored: true,                    // false = no right or wrong answer
  questions: [
    {
      id: "m1-sc1",                // unique within the module; used to store the answer
      prompt: "...",
      options: [ { text: "...", note: "...", action: { label: "...", resource: "sample-case" } } ],
                                   // note and action are optional
      correct: 1,                  // index into options; leave out when scored is false
      explanation: "..."           // shown after any answer when scored is true
    }
  ]
}
```

All quiz text is plain text, not HTML. In option notes and explanations only
`**bold**` is understood. If the bold phrase is exactly a block title (Intro,
See it, Try it, Make it, Plan it) it becomes a bold link to that block on the
same page, for example `see **Try it**`.

An option with an `action` shows a button with that label under its note once
the option is chosen. The button opens the module material with that id.

Scored questions show "Correct" or "Not quite" with the note and explanation.
A quiz with `scored: false` shows "Not scored. Your answer stays in your
browser." under its title, and an option without a note shows "No right answer;
this just shows where you start." Every answered question has a "Clear answer"
button that removes that answer. Answering never marks a block as done and never
locks anything. Answers are kept with the progress, in the visitor's browser only.

## Module materials

A module may list `resources`: texts trainees can keep open while they work,
such as a sample case or a finished guide. Each has an `id`, a `title` and
`html` (the same kinds of HTML as block content). They are listed under "Module
materials" in the contents panel and in the "Module Blocks" menu on narrow
screens.

On screens 1100px wide and over, a material opens in a panel on the right and
the page narrows to make room, so the panel never covers the blocks and stays
open while you scroll. On narrower screens it opens full screen. Close it with
the Close button or Esc; focus goes back to whatever opened it.

Anything in block html with `data-open-resource="<id>"` opens that material:

```html
<button type="button" data-open-resource="sample-case">Open the sample case</button>
```

`outcomePreview: { resource, caption }` shows that material beside the outcome
as a small printed page (A4 shape, drawn from the same HTML, not an image).
Selecting it opens the material in the same panel. On narrow screens the
preview sits under the outcome sentence.

Mark the fill-in parts of a template with `<mark class="fill-in">[assignment name]</mark>`.
Keep the brackets so the parts do not depend on the highlight alone.

## Still to do

- Sign-up: when the survey URL exists, replace the "Sign-up opens soon" pill in `index.html` with a link to it.
- Add the official EU emblem as `assets/eu-emblem.svg` (or `.png`) and uncomment the image in the footer of all pages.
- Replace every "To be confirmed" on the pages once decided.

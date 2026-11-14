# HEGenAI Training

Site for the pilot and training on GenAI in assessment and feedback for higher
education educators (MSc thesis, DTU Compute, within the Erasmus+ project
HEGenAI). Plain HTML, CSS and a few small scripts, no third-party requests, no
personal data collected. The module list remembers which blocks a visitor has
marked as done, their self-check answers, and any text typed into a module's
form; this is stored only in the visitor's own browser (localStorage) and is
never sent anywhere. Hosted on GitHub Pages; all links are relative.

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
- `form.js`: draws a module's numbered form and keeps its values in the browser under `hegenai:form:<module-id>:v1`
- `make-it.js`: draws the live prompt in a module's Make it block (built from the form's saved values, or from a template, with a copy button and optional file download) and adds tick boxes to a checklist
- `certificate.js`: **not in use yet.** A certificate of completion that was built and kept for possible later use (see "Certificate (not implemented yet)" below)
- `downloads/`: files trainees download, such as `practice-log-module-1.docx` (one practice log per module). The Word file is edited in Word from now on; it is no longer generated from a script
- `downloads/module-2/`: Module 2's `SKILL.md` (the same lines as `M2_SKILL_LINES` in `modules-data.js`; change both together) and `declaration-guide.docx`
- `resources.js`: opens a module's materials (for example a sample case) in a panel beside the blocks, or full screen on narrow screens
- `assets/module-1/`: pictures used in Module 1 (`aias-figure-1.png`)
- `assets/module-3/`: the video used in Module 3's Plan it block (`dtu-feedback-coach.mp4`; see the README in that folder)
- `assets/vendor/`: jsPDF and its licence, kept for the certificate feature that is not in use yet
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
      extraMinutes: 10,            // optional certification time, in minutes; shown as "+ optional 10 min. for certification"
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
under the box shows or hides the rest and switches to "Show less". A prompt
with `copyLabel: "Copy instructions"` gets a copy button under the box that
copies every line, hidden ones included, without the `{{ }}` marks. Unlike a
live prompt, it never shows the "details are missing" notice, so a value such
as `{{[course name]}}` stays tinted and is copied as `[course name]` (Module 2's
Make it uses this). If a module has `audience` or `needs`, they appear in a card (labelled "Before you start" for screen readers)
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
      quote: "...",                // optional; text shown in a box under the prompt, such as the entry being rated
      action: { label: "...", resource: "sample-case" },   // optional; a button under the prompt
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

Questions can be checked together. Give them the same `checkTogether` value
and they show no marks or notes until the trainee presses the button after the
last question of the group. `checkLabels` in the quiz sets the button's label
for each group; without one it says "Check my answers". The last question's
"Clear answer" sits on the same line as the button, and a thin line follows if
more questions come after the group. After the press, every question in the
group is marked as usual and the button adds "again" to its label ("Check my
answers again"). A question answered or changed after that hides its mark and
note until the button is pressed again; the other questions keep theirs.
Answers are saved as usual, but the press is not: after a reload, or once every
answer in the group is cleared, the feedback is held back again.

```js
quiz: {
  checkLabels: { entries: "Check my ratings" },
  questions: [
    { id: "m2-try1", checkTogether: "entries", ... },
    { id: "m2-try2", checkTogether: "entries", ... },   // the button comes after this one
    { id: "m2-try3", ... }                              // feedback straight away
  ]
}
```

`<div data-quiz></div>` in block html places the block's quiz there instead
of after the content, so text can follow the quiz. Without it, nothing changes.

Scored questions show "Correct" or "Not quite" with the note and explanation.
A quiz with `scored: false` shows "Not scored. Your answer stays in your
browser." under its title, and an option without a note shows "No right answer;
this just shows where you start." Every answered question has a "Clear answer"
button that removes that answer. Answering never marks a block as done and never
locks anything. Answers are kept with the progress, in the visitor's browser only.

A `kind: "live-prompt"` text has no `lines`: `make-it.js` builds it from the
form values and the level list in See it. Fields that are empty show as their
`[placeholder]`, and a notice links to Try it while any is empty. A list written
as `<ol class="tick-list" data-checklist>` gets tick boxes; each tick is saved as
`check1`, `check2` and so on next to the form's values, so the form's Clear also
removes them. A checklist also works in a module without a form (Module 2): the
ticks are saved the same way, and each is cleared by unticking it. `HEGenAIForm.set(moduleId, key, value)` saves one value and every
change fires `hegenai:form-change` on `document`.

A live prompt may instead have a `template`: a list of lines where
`{{key|[placeholder]}}` is replaced by the form value saved under `key`. A value
typed on several lines (such as a list of criteria) becomes several prompt
lines. Without `template`, Module 1's prompt is built as before. Further
options on a live prompt:

- `label` is read by screen readers; with `showLabel: true` it is also shown above the box (as on draft boxes).
- `copyLabel` is the copy button's text, so a block can show several copy boxes (Module 3 has the instructions, the skill and a starter prompt).
- A template with no `{{...}}` keys shows fixed text with a copy button.
- `optionalKeys: ["link"]` lists keys that may stay empty without the "details are missing" notice.
- `download: { label, filename }` adds a button that saves the text as a file (Module 3's skill is a SKILL.md file).
- `showLines` and `moreLabel` fold long text behind a toggle, as in prompt boxes.

### Forms

`<div data-form></div>` in block html shows the block's `form`, a numbered
list of fields drawn by `form.js`. Each field is a step with a title, a
guidance line and one or more inputs. Above the steps is "Open the practice
case" (opens `practiceResource` in the side panel). Under the steps, "Click to
clear answers" is styled like "Clear answer" in the self-checks, shows only
when something is filled in, and needs a second click ("Click again to clear
answers") before it empties everything.

Setting `practiceFill: true` in the form adds a "Use the practice case" button
that fills every input that has a `practice` value (never a level). It is off
by default, so no field is pre-filled. `practiceLabel` (default "practice case") names the case on the buttons, and `practiceStatus` replaces the message shown after the button fills the form. Module 3 uses `practiceLabel: "sample case"`.

```js
form: {
  practiceResource: "practice-case",
  fields: [
    { title: "Assignment", guidance: "...",
      inputs: [ { key: "name", label: "Name", type: "line", practice: "..." },
                { key: "description", label: "Description", type: "text", rows: 3, practice: "..." } ] },
    { title: "Level", guidance: "...",
      inputs: [ { key: "level", label: "Level", type: "level", levelsFrom: "The five levels" } ] }
  ]
}
```

Types are `line`, `text` and `level`. A `level` input is a select built from
the `.level-list` of the drop-down whose summary is `levelsFrom` (so the level
sentences are written once, in See it). The chosen level's sentence shows under
the select, and the drop-down is repeated below it. Values are saved as the
trainee types and are set as input values, never as HTML. Other code reads them
with `window.HEGenAIForm.get(moduleId)`, which returns `{ key: "text" }`
(`level` is `"1"` to `"5"` or an empty string).

## Module materials

A module may list `resources`: texts trainees can keep open while they work,
such as a sample case or a finished guide. Each has an `id`, a `title` and
`html` (the same kinds of HTML as block content). They are listed in the
contents panel and in the "Module Blocks" menu on narrow screens, under the
heading given by an optional `group` (for example `"Worked example"`), or
"Module materials" when there is none.

On screens 1100px wide and over, a material opens in a panel on the right and
the page narrows to make room, so the panel never covers the blocks and stays
open while you scroll. On narrower screens it opens full screen. Close it with
the Close button or Esc; focus goes back to whatever opened it.

Anything in block html with `data-open-resource="<id>"` opens that material:

```html
<button type="button" data-open-resource="sample-case">Open the sample case</button>
```

A button with `data-copy-target="<id>"`, in a material or a block, copies the
text of the element with that id: one line per paragraph or list item inside
it, or its whole text if it has none. Its label reads "Copied" for a moment,
and a status line next to it (added if missing) tells screen readers. Copy
buttons under prompt boxes use the same code (`make-it.js`). A prompt box's
body has the id `text-<text id>-body`, so a button placed elsewhere can copy it;
Module 2's Make it puts "Copy skill text" next to the "Download SKILL.md" link
this way (`data-copy-target="text-make-skill-body"`). Module 2's
"Sample declarations" puts each sample's entries in a box with an id:

```html
<p class="prompt-actions"><button type="button" class="pill-button pill-button-secondary" data-copy-target="m2-sample-a">Copy sample A</button></p>
<div class="guide-page" id="m2-sample-a"><p>First entry</p><hr class="entry-divider"><p>Second entry</p></div>
```

`outcomePreview: { resource, caption }` shows that material beside the outcome
as a small printed page (A4 shape, drawn from the same HTML, not an image).
Selecting it opens the material in the same panel. On narrow screens the
preview sits under the outcome sentence.

Mark the fill-in parts of a template with `<mark class="fill-in">[assignment name]</mark>`.
Keep the brackets so the parts do not depend on the highlight alone.

### Layouts and video used in Module 3

- `.criteria-compare` shows each criterion's checkable version beside the faded brief wording. Both stack on narrow screens.
- `.builder-figure` is a simplified picture of an agent builder, with notes on where the two parts of the agent go. It is written once as `M3_BUILDER_FIGURE` in `modules-data.js` and used in both See it and Make it.
- `.fix-list` lists what to change when a check fails.
- A `<video class="module-video" controls>` plays a file from `assets/`, with a text version in a drop-down under it. Module 3's Plan it block plays `assets/module-3/dtu-feedback-coach.mp4`. The captions are in the picture.

## Still to do

- Sign-up: when the survey URL exists, replace the "Sign-up opens soon" pill in `index.html` with a link to it.
- Module 2: add `assets/module-2/agent-setup.mp4`, then switch on the commented-out video in Make it, step 3.
- Add the official EU emblem as `assets/eu-emblem.svg` (or `.png`) and uncomment the image in the footer of all pages.
- Replace every "To be confirmed" on the pages once decided.
- Decide whether to bring back the certificate feature (see the last section).

## Certificate (not implemented yet)

**This feature is not implemented yet.** It was built and then switched off because the right time and way to offer it has not been decided. The code is kept so it can be brought back, probably in an updated form. With the feature off, no visitor sees anything about it and `jspdf.umd.min.js` is never requested.

What is kept:

- `certificate.js`: adds a "Certificate" section after a module's blocks. Once every block is marked as done, the trainee types their name and downloads a PDF made in the browser with jsPDF. The name is not saved or sent anywhere. An optional tick box adds a self-declared line about the practice log. The standard PDF fonts only cover Latin letters.
- `assets/vendor/jspdf.umd.min.js` (jsPDF 2.5.1) and `assets/vendor/jspdf-LICENSE.txt` (MIT licence). The library is loaded only when the download button is pressed.
- The hooks in `module.js` (they do nothing unless `certificate.js` is loaded and a module sets `certificate: true`) and the `.certificate-form` rules in `style.css`.

To bring it back:

1. In `module.html`, uncomment the `<script src="certificate.js">` line.
2. Add `certificate: true,` to the module in `modules-data.js`.
3. In `about.html`, uncomment the jsPDF credit under "Credits".
4. Check that the wording on `index.html` and `privacy.html` about certificates matches what is offered (the privacy text comes from `docs/privacy-notice.md` and is not edited here).

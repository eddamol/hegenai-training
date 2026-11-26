// The list of modules shown on modules.html and module.html?m=<id>.
//
// Each module lives in its own file in this folder and adds itself with
// window.HEGENAI_MODULES.modules.push({...}). To add a module, copy an existing module
// file, rename it module-<n>-<id>.js, and add its script tag after the others in both
// modules.html and module.html. Then change these fields:
//   id       short, unique, lower-case with hyphens; used in the page link and for progress
//   number   the number shown on the card ("Module 3"); also sets the order
//   title    the module title
//   cluster  a group heading to list the module under, or null for none
//   outcome  one sentence on what trainees will be able to do afterwards; shown on the card and
//            in the "Key learning outcome" card on the module page
//   outcomeImage  optional picture beside the outcome on the module page (leave out for none):
//            { src: "assets/...", alt: "description of the picture", caption: "optional caption" }
//   outcomePreview  optional, instead of outcomeImage: a small printed-page view of one of the
//            module's resources (see below); selecting it opens that resource.
//            { resource: "finished-guide", caption: "..." }
//   audience  optional; who the module is for, shown under "For" in a "Before you start" card
//            beside the outcome (leave out to show "For: Higher education educators" in the time line)
//   needs    optional; shown under "What you need" in the same card
//   minutes  length in minutes (60 shows as "About 1 hour")
//   extraMinutes  optional extra time for certification, in minutes (20 adds " + optional 20 min. for certification")
//   status   "soon" (shown as "Coming soon", not linked) or "available"
//   blocks   content for each block, by block id (see below); blocks left out show a placeholder
//              id       one of the block ids defined at the top
//              minutes  approximate time for the block, or null if not decided
//              html     the block content: headings (h3), paragraphs, lists, links,
//                       and callouts written as <div class="callout">...</div>
//                       Drop-downs: <details class="dropdown"><summary>Title</summary>
//                         <div class="dropdown-body">...</div></details> (closed until opened; may be nested)
//                       Pictures in the side panel: <a href="assets/..." data-open-image
//                         data-title="Panel title" data-alt="description">link text</a>
//                       Steps: <ol class="step-list" role="list"><li>...</li></ol>, numbered circles
//                       Checks: <ul class="check-list" role="list"><li><span class="check-label
//                         check-label-ok">OK</span> <span>...</span></li></ul>; use check-label-fixed
//                         and the text "Fixed" for a fixed item (the word carries the meaning, not the colour)
//                       A button that looks like a link and opens a resource:
//                         <button type="button" class="link-button" data-open-resource="sample-case">...</button>
//                       A prompt box or draft box from "texts" (below): <div data-text="see-prompt"></div>
//                       The block's quiz, placed here instead of after the content: <div data-quiz></div>
//              quiz    optional self-check, shown after the block content:
//                         { title: "Self-check",          heading above the questions
//                           intro: "...",                 optional line under the heading
//                           scored: true,                 false = no right or wrong answer
//                           checkLabels: { entries: "..." },   optional; button label per checkTogether group
//                           questions: [
//                             { id: "m1-sc1",             unique within the module; used to store the answer
//                               checkTogether: "entries", optional; marks and notes wait for the group's button
//                               prompt: "...",
//                               quote: "...",             optional; text in a box under the prompt, such as the entry being rated
//                               action: { label: "...", resource: "<resource id>" },   optional; a button under the prompt that opens the resource
//                               options: [ { text: "...", note: "..." } ],   note is optional feedback for that option
//                               correct: 1,               index into options; leave out when scored is false
//                               explanation: "..." } ] }  shown after any answer when scored is true
//                         All quiz text is plain text, not HTML. In notes and explanations only
//                         **bold** is understood; if the bold phrase is exactly a block title
//                         (Intro, See it, Try it, Make it, Plan it) it becomes a bold link to that block.
//                         A quiz with scored: false shows "Not scored. Your answer stays in your browser."
//                         below the questions; an option without a note then shows "No right answer; this just
//                         shows where you start." Every answered question gets a "Clear answer" button.
//                         An option may also have action: { label: "...", resource: "<resource id>" }; when
//                         that option is chosen, a button with that label appears under the note and opens
//                         the resource.
//              form    optional; fills <div data-form></div> in the block html with a numbered form
//                       whose values stay in the browser (see form.js). Later blocks can read them with
//                       window.HEGenAIForm.get(moduleId), for example to build a prompt.
//                         { practiceResource: "practice-case",   resource opened by "Open the practice case"
//                           practiceLabel: "sample case",   optional; names the case on the buttons (default "practice case")
//                           practiceStatus: "...",   optional; message shown after the case fills the form
//                           readyLine: { block: "make", linkLabel: "Make it", optionalKeys: ["rules"] },
//                                                 optional; a line under all steps that says whether the form is empty,
//                                                 partly or fully filled in, and where the result appears: a link to
//                                                 that block, or where: "step 1 below" when it is in the same block.
//                                                 what: "prompt" names the result (what: "instructions", plural: true).
//                                                 Keys in optionalKeys may stay empty
//                           practiceFill: true,   optional, off unless set: adds a "Use the practice case" button that fills
//                                                 every input that has a practice value (never a level)
//                           fields: [ { title: "Assignment",      one numbered step per field
//                                       guidance: "...",
//                                       inputs: [ { key: "name",  key the value is stored under
//                                                   label: "Name",   visible label
//                                                   type: "line",    "line" (one line), "text" (several
//                                                                    lines; rows: 3) or "level" (a select;
//                                                                    levelsFrom is the summary of a
//                                                                    drop-down in the page whose .level-list
//                                                                    gives the levels; that drop-down is
//                                                                    repeated under the select)
//                                                   practice: "..." } ] } ] }   used only when practiceFill is true
//                         A "level" input is never set by the practice case. Values are saved as the
//                         trainee types, under "hegenai:form:<moduleId>:v1".
//   resources  optional "Module materials": texts trainees can open beside the blocks, listed in the
//            contents panel. [ { id: "sample-case", title: "...", html: "<p>...</p>" } ]
//            Optional group: "..." sets the heading it is listed under (default "Module materials").
//            Any element in block html with data-open-resource="<id>" opens that resource, for example
//            <button type="button" data-open-resource="sample-case">Open the sample case</button>
//            Fill-in parts of a template can be marked <mark class="fill-in">[assignment name]</mark>.
//   texts    optional prompt boxes and draft boxes, shown where a block has <div data-text="<id>">:
//            { id: "see-prompt",
//              kind: "prompt",             "prompt": a read-only prompt; {{...}} marks a filled-in value,
//                                          shown highlighted. "draft": GenAI output; a line starting
//                                          "# " is a heading, "- " a list item, anything else a paragraph
//              label: "Prompt",            shown above a draft box; for a prompt box, read by screen readers
//              showLines: 6,               lines shown before the toggle; leave out to show all
//              moreLabel: "Show the whole prompt",   the toggle's text
//              lines: [ "...", "..." ] }   one string per line; always set as text, never as HTML
//   sources HTML for the "Sources and credits" section at the end of the module
// The five blocks and their titles are the same for every module, so they are defined once.
window.HEGENAI_MODULES = {
    blocks: [
        { id: "intro", title: "Intro" },
        { id: "see", title: "See it" },
        { id: "try", title: "Try it" },
        { id: "make", title: "Make it" },
        { id: "plan", title: "Plan it" }
    ],
    modules: []
};

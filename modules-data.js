// The list of modules shown on modules.html and module.html?m=<id>.
//
// To add a module, copy one of the objects in "modules" below and change it:
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
//   extraMinutes  extra time on top, in minutes (20 adds " + 20 min."); optional
//   extraLabel    optional; what the extra time is for, e.g. "practice log" (adds " for the practice log")
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
//              quiz    optional self-check, shown after the block content:
//                         { title: "Self-check",          heading above the questions
//                           intro: "...",                 optional line under the heading
//                           scored: true,                 false = no right or wrong answer
//                           questions: [
//                             { id: "m1-sc1",             unique within the module; used to store the answer
//                               prompt: "...",
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
// Module 3: a simplified agent builder with notes on where the two parts go.
// Used in See it and again in Make it.
var M3_BUILDER_FIGURE =
    '<figure class="builder-figure">' +
    '<div class="bf">' +
    '<div class="bf-win bf-top bf-r1" aria-hidden="true"><span class="bf-dots"><i></i><i></i><i></i></span>Agent builder</div>' +
    '<div class="bf-win bf-r2"><div class="bf-name"><span class="bf-icon" aria-hidden="true"></span><strong>Feedback on the case study report</strong></div></div>' +
    '<div class="bf-note bf-left bf-grey bf-r2"><p>Name it so students recognise it.</p><span class="bf-arrow" aria-hidden="true"></span></div>' +
    '<div class="bf-win bf-r3"><p class="bf-label">Instructions</p>' +
    '<div class="bf-field bf-field-change">' +
    '<p>You give formative feedback to a student on a draft. You do not grade it…</p>' +
    '<p># Assignment<br>Case study report. A 2,500-word…</p>' +
    '<p># Criteria (judge only these)<br>1. Problem analysis. Met when: …<br>2. Justified recommendation. …</p>' +
    '</div></div>' +
    '<div class="bf-note bf-left bf-change bf-r3"><p class="bf-note-title">Instructions: paste</p><p>Your assignment and its criteria, each with a “met when”.</p><p><strong>The only part you change for each assignment.</strong></p><span class="bf-arrow" aria-hidden="true"></span></div>' +
    '<div class="bf-win bf-r4"><p class="bf-label">Skills <span class="bf-add" aria-hidden="true">+ Add</span></p>' +
    '<div class="bf-field bf-field-same"><strong>SKILL.md</strong> · criteria-feedback</div></div>' +
    '<div class="bf-note bf-right bf-same bf-r4"><p class="bf-note-title">Skills: upload once</p><p>Add, then upload the SKILL.md from Make it.</p><p><strong>The same file for every assignment.</strong></p><span class="bf-arrow" aria-hidden="true"></span></div>' +
    '<div class="bf-win bf-bottom bf-r5"><span class="bf-create" aria-hidden="true">Create</span></div>' +
    '<div class="bf-note bf-right bf-grey bf-r5"><p>Then share the link with your students.</p><span class="bf-arrow" aria-hidden="true"></span></div>' +
    '</div>' +
    '<figcaption>Where the two parts go in an agent builder (simplified; your tool may look a little different). You change the instructions for each assignment; the skill stays the same.</figcaption>' +
    '</figure>';

window.HEGENAI_MODULES = {
    blocks: [
        { id: "intro", title: "Intro" },
        { id: "see", title: "See it" },
        { id: "try", title: "Try it" },
        { id: "make", title: "Make it" },
        { id: "plan", title: "Plan it" }
    ],
    modules: [
        {
            id: "declaring-genai-use",
            number: 1,
            title: "Making an Assignment-Level GenAI Use Policy and Declaration Guide",
            cluster: null,
            outcome: "After this module, you can set a GenAI use policy and a declaration guide for a written assignment, and you leave with a completed policy and guide for a given assignment.",
            outcomePreview: { resource: "finished-guide", caption: "An example of the policy and declaration guide you leave with. Select to open it." },
            audience: "Higher education educators who set written assignments. No prior GenAI experience needed.",
            needs: "A GenAI tool. This module uses Microsoft Copilot as the example, and a free account is enough. Also, either an assignment you set or the practice case provided in the module.",
            minutes: 55,
            extraMinutes: 10,
            extraLabel: "practice log",
            status: "available",
            blocks: [
                {
                    id: "intro",
                    minutes: 10,
                    html: '<p><dfn>GenAI</dfn> (generative artificial intelligence) means tools such as ChatGPT or Microsoft Copilot that write text from your instructions, called a prompt.</p>' +
                        '<h3>The problem</h3>' +
                        '<p>Without guidance for the assignment, students have to guess what GenAI use is acceptable. They need clear guidelines on each assignment (Heaps, 2024).</p>' +
                        '<p>A <dfn>declaration</dfn> is a short statement in which a student says how they used GenAI. Even when use is allowed, students are often reluctant to declare it (Gonsalves, 2024, cited in Perkins et al., 2025).</p>',
                    quiz: {
                        title: "Where you stand",
                        intro: "This question helps you choose your route through the module.",
                        scored: false,
                        questions: [
                            {
                                id: "m1-route",
                                prompt: "Which assignment will you work on?",
                                options: [
                                    {
                                        text: "My own, and it already has GenAI rules.",
                                        note: "Use it throughout the module. In **Make it**, you check your rules against four short checks."
                                    },
                                    {
                                        text: "My own, but it has no GenAI rules yet.",
                                        note: "Use it throughout the module. **Make it** gives you a prompt that drafts the policy and declaration guide for you."
                                    },
                                    {
                                        text: "I have none coming up.",
                                        note: "Use the practice case throughout the module. You can keep it for the practice log.",
                                        action: { label: "Open the practice case", resource: "practice-case" }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    id: "see",
                    minutes: 15,
                    html: '<p>In this block, you see an approach to creating an AI policy and declaration guide for the sample case.</p>' +
                        '<p><button type="button" class="link-button" data-open-resource="sample-case">Open the sample case</button></p>' +
                        '<p>The AI policy and declaration guide has three parts:</p>' +
                        '<ol>' +
                        '<li><strong>Level of GenAI use.</strong> The first part specifies where the assignment lies on the AI Assessment Scale. The scale has five levels of GenAI use, from No AI to AI Exploration (Perkins et al., 2025). In choosing the level of AI use for an assignment, make sure that AI is only allowed for tasks that do not directly translate into the learning outcomes of the assignment.</p>' +
                        '<details class="dropdown">' +
                        '<summary>The five levels of AI use: Click to expand</summary>' +
                        '<div class="dropdown-body">' +
                        '<ul class="level-list">' +
                        '<li><strong>Level 1, No AI:</strong> “You must not use AI at any point during the assessment. You must demonstrate your core skills and knowledge.”</li>' +
                        '<li><strong>Level 2, AI Planning:</strong> “You may use AI for planning, idea development, and research. Your final submission should show how you have developed and refined these ideas.”</li>' +
                        '<li><strong>Level 3, AI Collaboration:</strong> “You may use AI to assist with specific tasks such as drafting text, refining and evaluating your work. You must critically evaluate and modify any AI-generated content you use.”</li>' +
                        '<li><strong>Level 4, Full AI:</strong> “You may use AI extensively throughout your work either as you wish, or as specifically directed in your assessment. Focus on directing AI to achieve your goals while demonstrating your critical thinking.”</li>' +
                        '<li><strong>Level 5, AI Exploration:</strong> “You should use AI creatively to solve the task, potentially co-designing new approaches with your instructor.”</li>' +
                        '</ul>' +
                        '<p class="credit-line">“The AI Assessment Scale” by Perkins, Furze, Roe &amp; MacVaugh (2024), from Perkins, Roe &amp; Furze (2025), CC BY-NC-SA 4.0. Used unchanged.</p>' +
                        '<p><a href="assets/module-1/aias-figure-1.png" data-open-image data-title="The AI Assessment Scale" data-alt="The AI Assessment Scale: five levels of AI use, from No AI to AI Exploration">See the original figure</a></p>' +
                        '</div>' +
                        '</details>' +
                        '</li>' +
                        '<li><strong>A list of do\'s and don\'ts.</strong> List what students should and should not do with GenAI, in the assignment’s own terms: “GenAI for…” and “GenAI is not for…”. This two-list format is used in practice, for example in a master’s programme at Dundalk Institute of Technology (Bree et al., 2026) and in course policies that list acceptable and unacceptable uses (Heaps, 2024).</li>' +
                        '<li><strong>A declaration and example.</strong> What students state about their GenAI use, and where.</li>' +
                        '</ol>' +
                        '<p class="section-divider">Now, a four-step approach to making a policy and declaration guide for an assignment, starting with a structured prompt to an AI tool.</p>' +
                        '<ol class="step-list" role="list">' +
                        '<li>' +
                        '<p><strong>Specify the level of GenAI use.</strong> Given the learning outcomes (LOs) in the sample case, GenAI may help students plan, but not do the actual tasks the learning oucomes require. So, it is at Level 2, AI Planning.</p>' +
                        '</li>' +
                        '<li>' +
                        '<p><strong>Fill in the prompt.</strong> Below is a complete prompt for generating the policy and declaration guide, based on the sample case. You could use the same prompt, replacing the underlined details with information on your own assignment, and paste it into an AI tool.</p>' +
                        '<div data-text="see-prompt"></div>' +
                        '</li>' +
                        '<li>' +
                        '<p><strong>Let Copilot draft.</strong> Below is a drafted policy and declaration guide from Microsoft Copilot based on the prompt from step 2, for the sample case.</p>' +
                        '<div data-text="see-draft"></div>' +
                        '</li>' +
                        '<li>' +
                        '<p><strong>Check the draft.</strong> As an educator, you are responsible for ensuring the draft aligns with your course objectives and institutional policies. Here is how the draft above was checked and fixed:</p>' +
                        '<ul class="check-list" role="list">' +
                        '<li><span class="check-label check-label-ok">OK</span> <span><strong>The level fits.</strong> Level 2 is named, and the scale’s sentence is quoted word for word.</span></li>' +
                        '<li><span class="check-label check-label-ok">OK</span> <span><strong>Each item names a concrete use.</strong> Every item is in the report’s own terms, such as “a shortlist of possible organisations”.</span></li>' +
                        '<li><span class="check-label check-label-fixed">Fixed</span> <span><strong>Nothing under “GenAI for…” does what a learning outcome asks.</strong> “Giving feedback on … clarity of writing for a professional reader” does what LO3 asks students to show, and feedback is a Level 3 use. Removed.</span></li>' +
                        '<li><span class="check-label check-label-ok">OK</span> <span><strong>The declaration is complete.</strong> It asks for the tool, the use, the prompts, the part and the date, and says where: the appendix.</span></li>' +
                        '</ul>' +
                        '<p>The result is the <button type="button" class="link-button" data-open-resource="finished-guide">finished sample policy and declaration guide</button>.</p>' +
                        '</li>' +
                        '</ol>' +
                        '<h3>Why it works</h3>' +
                        '<p>The scale gives you and your students a shared way to talk about GenAI use (Perkins et al., 2025), and the two lists make it concrete for one assignment. The prompt drafts the policy and declaration guide. Your check makes it fit your course.</p>',
                    quiz: {
                        title: "Self-check",
                        intro: "Check if you can identify a proper AI use level for another assignment:.",
                        scored: true,
                        questions: [
                            {
                                id: "m1-see1",
                                prompt: "Imagine a take-home essay, set at Level 1: No AI use. What guidance fits best?",
                                options: [
                                    {
                                        text: "Keep Level 1 and ask for a signed ‘no GenAI’ statement in student submissions.",
                                        note: "Declaring work AI-free without a controlled setting has proved untenable (Perkins et al., 2025)."
                                    },
                                    {
                                        text: "Have students do the assignment under supervision, or choose another level.",
                                        note: "Level 1 needs a supervised setting (Perkins et al., 2025)."
                                    },
                                    {
                                        text: "Keep Level 1 and use a GenAI detector when assessing student work.",
                                        note: "Detectors are unreliable (Perkins et al., 2025)."
                                    }
                                ],
                                correct: 1
                            }
                        ]
                    }
                },
                {
                    id: "try",
                    minutes: 10,
                    html: '<p>In this block, you collect the five details the prompt needs, for an assignment you assign to students or, if you do not have one, for the practice case.</p>' +
                        '<div class="callout">' +
                        '<h3 class="callout-title">What to aim for</h3>' +
                        '<ul>' +
                        '<li>All fields are filled in. Leave “Rules you know of” empty only if you know none.</li>' +
                        '<li>The learning outcomes are the ones students see.</li>' +
                        '</ul>' +
                        '</div>' +
                        '<div data-form></div>' +
                        '<details class="dropdown dropdown-under-steps" hidden>' +
                        '<summary>The five levels of AI use: Click to expand</summary>' +
                        '<div class="dropdown-body">' +
                        '<ul class="level-list">' +
                        '<li><strong>Level 1, No AI:</strong> “You must not use AI at any point during the assessment. You must demonstrate your core skills and knowledge.”</li>' +
                        '<li><strong>Level 2, AI Planning:</strong> “You may use AI for planning, idea development, and research. Your final submission should show how you have developed and refined these ideas.”</li>' +
                        '<li><strong>Level 3, AI Collaboration:</strong> “You may use AI to assist with specific tasks such as drafting text, refining and evaluating your work. You must critically evaluate and modify any AI-generated content you use.”</li>' +
                        '<li><strong>Level 4, Full AI:</strong> “You may use AI extensively throughout your work either as you wish, or as specifically directed in your assessment. Focus on directing AI to achieve your goals while demonstrating your critical thinking.”</li>' +
                        '<li><strong>Level 5, AI Exploration:</strong> “You should use AI creatively to solve the task, potentially co-designing new approaches with your instructor.”</li>' +
                        '</ul>' +
                        '<p class="credit-line">“The AI Assessment Scale” by Perkins, Furze, Roe &amp; MacVaugh (2024), from Perkins, Roe &amp; Furze (2025), CC BY-NC-SA 4.0. Used unchanged.</p>' +
                        '<p><a href="assets/module-1/aias-figure-1.png" data-open-image data-title="The AI Assessment Scale" data-alt="The AI Assessment Scale: five levels of AI use, from No AI to AI Exploration">See the original figure</a></p>' +
                        '</div>' +
                        '</details>',
//                        '<h3>Your judgement</h3>' +
//                        '<p>In step 5, you judged which uses of GenAI would replace what the assignment assesses. In <a href="#block-make">Make it</a> you judge the GenAI draft itself, with the checklist.</p>'
                        
                    quiz: {
                        title: "Self-check",
                        intro: "One question that applies to the practice case.",
                        scored: true,
                        questions: [
                            {
                                id: "m1-try1",
                                prompt: "Which AI use level fits the practice case?",
                                action: { label: "Open the practice case", resource: "practice-case" },
                                options: [
                                    {
                                        text: "Level 2, AI Planning.",
                                        note: "Level 2 covers planning, idea development and research. The teacher also allows help with drafting and editing text, which is Level 3 (Perkins et al., 2025)."
                                    },
                                    {
                                        text: "Level 3, AI Collaboration.",
                                        note: "Level 3 allows help with drafting text, refining and evaluating, and students must critically evaluate and modify what GenAI writes (Perkins et al., 2025). The data and the discussion stay with the students."
                                    },
                                    {
                                        text: "Level 4, Full AI.",
                                        note: "At Level 4, GenAI may be used throughout the work. Here, students collect and analyse the data and write the discussion themselves (LO1 to LO3)."
                                    }
                                ],
                                correct: 1
                            }
                        ]
                    },
                    form: {
                        practiceResource: "practice-case",
                        fields: [
                            {
                                title: "The assignment",
                                guidance: "Its name, and a short description.",
                                inputs: [
                                    { key: "name", label: "Name", type: "line",
                                      practice: "Pendulum lab report" },
                                    { key: "description", label: "Description", type: "text", rows: 3,
                                      practice: "A 1,500-word individual lab report in a first-year bachelor's physics course. Students measure the acceleration due to gravity with a simple pendulum, analyse their data, and discuss the result." }
                                ]
                            },
                            {
                                title: "Learning outcomes",
                                guidance: "Copy them as students would see them in the course/assignment description.",
                                inputs: [
                                    { key: "outcomes", label: "Learning outcomes", type: "text", rows: 4,
                                      practice: "LO1 Collect and present measurement data with uncertainties. LO2 Analyse the data and compare the result with the accepted value. LO3 Discuss sources of error and suggest improvements." }
                                ]
                            },
                            {
                                title: "Rules you know of",
                                guidance: "Type or paste any GenAI rules you already know for this course, programme, or institution. Do not look them up now: you check the guide against them before you hand it out (see Plan it). Leave this empty if you know none.",
                                inputs: [
                                    { key: "rules", label: "Rules you know of", type: "text", rows: 3,
                                      practice: "Each assignment states the level of GenAI use allowed, and students must declare all GenAI use." }
                                ]
                            },
                            {
                                title: "Where students declare GenAI use",
                                guidance: "For example an appendix, the cover sheet, or a section of the report.",
                                inputs: [
                                    { key: "declare", label: "Where students declare", type: "line",
                                      practice: "the last section of the Methods chapter, headed \"Use of GenAI\"" }
                                ]
                            },
                            {
                                title: "AI use level",
                                guidance: "Which parts of the assignment show the learning outcomes? GenAI must not do those parts. Choose the AI use level that allows GenAI for the remaining parts.",
                                inputs: [
                                    { key: "level", label: "Level", type: "level", levelsFrom: "The five levels" }
                                ]
                            }
                            
                        ]
                    }
                },
                {
                    id: "make",
                    minutes: 15,
                    html: '<p>In this block, you let GenAI draft your policy and declaration guide, check it, and make it ready to use.</p>' +
                        '<ol class="step-list" role="list">' +
                        '<li>' +
                        '<p><strong>Copy your prompt.</strong> The prompt is ready below, as it was in <a href="#block-see">See it</a> but with your information from <a href="#block-try">Try it</a>. One change: it gives the rules you know of instead of an institution’s name, and tells the tool not to add any. Adjust the information in Try it or copy right away.</p>' +
                        '<div data-text="make-prompt"></div>' +
                        '</li>' +
                        '<li><p><strong>Paste your prompt into a new conversation</strong> in a GenAI tool of your choice, for example Microsoft Copilot (a free account is enough).</p></li>' +
                        '<li><p><strong>Check the draft.</strong> You should now have a drafted GenAI policy and declaration guide. Following the checklist below, fix what falls short: Edit the text yourself, or ask the tool to change one item.</p>' +
                        '<ol class="tick-list" data-checklist>' +
                        '<li>The AI level (1-5) fits what the assignment assesses (Heaps, 2024).</li>' +
                        '<li>The guide stays within the rules you gave, and nothing in it invents a rule.</li>' +
                        '<li>Nothing under “GenAI for…” does what a learning outcome asks students to show.</li>' +
                        '<li>The declaration guide asks for the tool, the use, the prompts/links, the part of the work AI is used for, and the date, and it says where the declaration should be (UQ Library, 2026).</li>' +
                        '</ol>' +
                        '</li>' +
                        '<li><p><strong>Save it.</strong> Paste the finalised policy and guide into a document and save it. Keep the credit line at the end.</p></li>' +
                        '<li>' +
                        '<p><strong>Add an example declaration.</strong> You can write it at the end of the document as in the finished sample policy and declaration guide.</p>' +
                        '<p><button type="button" class="pill-button pill-button-secondary" data-open-resource="finished-guide" aria-haspopup="dialog">Open the finished sample policy and declaration guide</button></p>' +
                        '</li>' +
                        '</ol>'
                },
                {
                    id: "plan",
                    minutes: 5,
                    html: '<p>In this block you plan how students get your policy and declaration guide, and start the practice log.</p>' +
                        '<ol class="step-list" role="list">' +
                        '<li>' +
                        '<p><strong>Download the practice log.</strong></p>' +
                        '<p><a class="pill-button" href="downloads/practice-log-module-1.docx" download>Download the practice log (Word)</a></p>' +
                        '</li>' +
                        '<li><p><strong>Check it against the rules.</strong> Before you hand it out, check it against your institution’s and programme’s GenAI rules, and fix anything that conflicts (Heaps, 2024). No rules found? Note that in the log, and keep the declaration part as it is.</p></li>' +
                        '<li><p><strong>Hand out your guide.</strong> It is ideal to raise GenAI in the first week of the course, and again when you set the assignment (Heaps, 2024). No assignment coming up? Give it to a peer or colleague, and ask them to write a declaration for an imagined use.</p></li>' +
                        '<li><p><strong>Fill in the log.</strong> You can fill in part 1 already when you hand out the guide, and parts 2 and 3 when you have received at least one declaration back.</p></li>' +
                        '<li><p><strong>Upload the completed log</strong> to a survey you receive by email, within 2 weeks from the session. This is optional for participants in facilitated sessions.</p></li>' +
                        '</ol>'
                }
            ],
            resources: [
                {
                    id: "sample-case",
                    group: "Worked example",
                    title: "Sample case",
                    html: '<p class="resource-note">(Invented for this module, used in shown examples.)</p>' +
                        '<p>A 2,500-word individual report in a second-year bachelor’s course. Each student picks an organisation, analyses one problem it faces, and recommends a solution.</p>' +
                        '<ul>' +
                        '<li>Learning outcome 1 (LO1): Analyse an organisation’s problem using course concepts.</li>' +
                        '<li>Learning outcome 2 (LO2): Recommend a solution and justify it with evidence.</li>' +
                        '<li>Learning outcome 3 (LO3): Write clearly for a professional reader.</li>' +
                        '</ul>' +
                        '<p><strong>Institution rules:</strong> GenAI may be used if the course guide says how, and all use must be declared.</p>'
                },
                {
                    id: "finished-guide",
                    group: "Worked example",
                    title: "Finished sample guide",
                    html: '<p class="resource-note">(Based on the sample case, the result of shown examples.)</p>' +
                        '<div class="guide-page">' +
                        '<h3>GenAI in the case study report: Level 2, AI Planning</h3>' +
                        '<blockquote><p>"You may use AI for planning, idea development, and research. Your final submission should show how you have developed and refined these ideas."</p></blockquote>' +
                        '<h4>GenAI for…</h4>' +
                        '<ul>' +
                        '<li>Generating a shortlist of possible organisations and business problems that could be suitable for analysis in the report.</li>' +
                        '<li>Creating an initial report outline that includes sections such as organisational background, problem analysis, solution options, recommendation, and conclusion.</li>' +
                        '<li>Suggesting relevant course concepts, theories, or frameworks that may help analyse the chosen organisational problem.</li>' +
                        '<li>Producing search terms and research questions to help find academic, industry, and organisational sources.</li>' +
                        '</ul>' +
                        '<h4>GenAI is not for…</h4>' +
                        '<ul>' +
                        '<li>Analysing the organisation\'s problem for you, selecting the analysis, or writing the analysis that demonstrates your achievement of LO1 Analyse an organisation\'s problem using course concepts.</li>' +
                        '<li>Choosing, evaluating, or justifying the recommended solution for you, or producing the evidence-based argument that demonstrates your achievement of LO2 Recommend a solution and justify it with evidence.</li>' +
                        '<li>Writing sections of the report for submission, rewriting your work into the final text, or producing the finished professional communication that demonstrates your achievement of LO3 Write clearly for a professional reader.</li>' +
                        '<li>Citing GenAI as a source of evidence or information. Cite the original sources used in your report instead.</li>' +
                        '<li>Uploading, pasting, or asking GenAI to use another person\'s work, or confidential, personal, or copyrighted material.</li>' +
                        '</ul>' +
                        '<h4>Declare your use</h4>' +
                        '<p>In the appendix, state:</p>' +
                        '<ul>' +
                        '<li>The GenAI tool used.</li>' +
                        '<li>What you used it for.</li>' +
                        '<li>The prompts you used, or a link to the chat.</li>' +
                        '<li>Which part of the assignment the use relates to.</li>' +
                        '<li>The date or date range of use.</li>' +
                        '</ul>' +
                        '<p>If you did not use GenAI, state that no GenAI tools were used.</p>' +
                        '<p>Using GenAI beyond this guide, or without declaring it, may count as misconduct under the university\'s rules.</p>' +
                        '<p>Level text from The AI Assessment Scale by Perkins, Furze, Roe &amp; MacVaugh (2024), CC BY-NC-SA 4.0.</p>' +
                        '<p><strong>Example declaration.</strong> GenAI tool: Microsoft Copilot. Used for: Brainstorming three organisations, and suggesting a structure. I chose one organisation and changed the structure. Prompts: <mark class="fill-in">[link to the chat]</mark>. Part of the work: Planning only. Date(s): 2–15 November 2026.</p>' +
                        '</div>'
                },
                {
                    id: "practice-case",
                    group: "Optional materials",
                    title: "Practice case",
                    html: '<p class="resource-note">(Invented for this module, for you to use if you do not have your own case to work on.)</p>' +
                        '<p><strong>Pendulum lab report.</strong> A 1,500-word individual lab report in a first-year bachelor’s physics course. Students measure the acceleration due to gravity with a simple pendulum, analyse their data, and discuss the result.</p>' +
                        '<ul>' +
                        '<li>Learning outcome 1 (LO1): Collect and present measurement data with uncertainties.</li>' +
                        '<li>Learning outcome 2 (LO2): Analyse the data and compare the result with the accepted value.</li>' +
                        '<li>Learning outcome 3 (LO3): Discuss sources of error and suggest improvements.</li>' +
                        '</ul>' +
                        '<p><strong>What the teacher wants:</strong> GenAI may help students draft and edit the introduction and the method description, and give feedback on their draft. Students must check and change anything GenAI writes. They collect and analyse the data, and write the discussion, themselves.</p>' +
                        '<p><strong>Institution rules:</strong> Each assignment states the level of GenAI use allowed, and students must declare all GenAI use.</p>' +
                        '<p><strong>Where students declare:</strong> in the last section of the Methods chapter, headed “Use of GenAI”.</p>'
                }
            ],
            texts: [
                {
                    id: "make-prompt",
                    kind: "live-prompt"      // built from the Try it form by make-it.js
                },
                {
                    id: "see-prompt",
                    kind: "prompt",
                    label: "Prompt",
                    showLines: 6,
                    moreLabel: "Show the whole prompt",
                    lines: [
                        "Write a one-page guide for students on GenAI use in one written assignment. Use plain language.",
                        "Assignment: {{Case study report. A 2,500-word individual report in a second-year bachelor's course. Each student picks an organisation, analyses one problem it faces, and recommends a solution.}}",
                        "Learning outcomes: {{LO1 Analyse an organisation's problem using course concepts. LO2 Recommend a solution and justify it with evidence. LO3 Write clearly for a professional reader.}}",
                        "Where students declare their use: {{an appendix}}",
                        "Institution: {{the university}}",
                        "Level: {{Level 2, AI Planning}}",
                        "Use exactly these parts:",
                        "1) Title: \"{{GenAI in the case study report: Level 2, AI Planning}}\".",
                        "2) This sentence, word for word, in quotation marks: \"{{You may use AI for planning, idea development, and research. Your final submission should show how you have developed and refined these ideas.}}\"",
                        "3) \"GenAI for…\": up to five concrete uses that fit this level and this assignment.",
                        "4) \"GenAI is not for…\": up to five items. For each learning outcome, one item that stops GenAI from doing what the outcome asks students to show. Also: citing GenAI as a source (cite the original sources instead), and pasting in other people's work or confidential, personal or copyrighted material.",
                        "5) \"Declare your use\": in the place given above, students state the GenAI tool, what they used it for, their prompts or a link to the chat, which part of the work, and the date or date range. If they used no GenAI, they say so. Using GenAI beyond this guide, or without declaring it, may count as misconduct under the university's rules.",
                        "6) Last line: \"Level text from The AI Assessment Scale by Perkins, Furze, Roe & MacVaugh (2024), CC BY-NC-SA 4.0.\"",
                        "Every item must name a concrete use in the terms of this assignment, and a student must be able to read it only one way."
                    ]
                },
                {
                    id: "see-draft",
                    kind: "draft",
                    label: "Microsoft Copilot, free version, 27 October 2026",
                    showLines: 4,
                    moreLabel: "Show the whole draft",
                    lines: [
                        "# GenAI in the case study report: Level 2, AI Planning",
                        "\"You may use AI for planning, idea development, and research. Your final submission should show how you have developed and refined these ideas.\"",
                        "# GenAI for…",
                        "- Generating a shortlist of possible organisations and business problems that could be suitable for analysis in the report.",
                        "- Creating an initial report outline that includes sections such as organisational background, problem analysis, solution options, recommendation, and conclusion.",
                        "- Suggesting relevant course concepts, theories, or frameworks that may help analyse the chosen organisational problem.",
                        "- Producing search terms and research questions to help find academic, industry, and organisational sources.",
                        "- Giving feedback on draft structure, paragraph organisation, and clarity of writing for a professional reader.",
                        "# GenAI is not for…",
                        "- Analysing the organisation's problem for you, selecting the analysis, or writing the analysis that demonstrates your achievement of LO1 Analyse an organisation's problem using course concepts.",
                        "- Choosing, evaluating, or justifying the recommended solution for you, or producing the evidence-based argument that demonstrates your achievement of LO2 Recommend a solution and justify it with evidence.",
                        "- Writing sections of the report for submission, rewriting your work into the final text, or producing the finished professional communication that demonstrates your achievement of LO3 Write clearly for a professional reader.",
                        "- Citing GenAI as a source of evidence or information. Cite the original sources used in your report instead.",
                        "- Uploading, pasting, or asking GenAI to use another person's work, or confidential, personal, or copyrighted material.",
                        "# Declare your use",
                        "In the appendix, state:",
                        "- The GenAI tool used.",
                        "- What you used it for.",
                        "- The prompts you used, or a link to the chat.",
                        "- Which part of the assignment the use relates to.",
                        "- The date or date range of use.",
                        "If you did not use GenAI, state that no GenAI tools were used.",
                        "Using GenAI beyond this guide, or without declaring it, may count as misconduct under the university's rules.",
                        "Level text from The AI Assessment Scale by Perkins, Furze, Roe & MacVaugh (2024), CC BY-NC-SA 4.0."
                    ]
                }
            ],
            sources: '<ul class="reference-list">' +
                '<li>Gonsalves, C. (2024). Addressing student non-compliance in AI use declarations: Implications for academic integrity and assessment in higher education. <i>Assessment &amp; Evaluation in Higher Education</i>. <a href="https://doi.org/10.1080/02602938.2024.2415654">https://doi.org/10.1080/02602938.2024.2415654</a> (cited in Perkins et al., 2025)</li>' +
                '<li>Heaps, T. (2024). Setting policy and communicating expectations. In <i>Generative artificial intelligence: Practical uses in education</i> (ch. 4). Pressbooks. <a href="https://pressbooks.openedmb.ca/aiineducation/chapter/setting-policy-and-communicating-expectations/">https://pressbooks.openedmb.ca/aiineducation/chapter/setting-policy-and-communicating-expectations/</a> (CC BY 4.0)</li>' +
                '<li>Perkins, M., Roe, J., &amp; Furze, L. (2025). The AI Assessment Scale revisited: A framework for educational assessment. <i>Journal of University Teaching and Learning Practice, 22</i>(7). <a href="https://doi.org/10.53761/rrm4y757">https://doi.org/10.53761/rrm4y757</a> Preprint: <a href="https://arxiv.org/abs/2412.09029">https://arxiv.org/abs/2412.09029</a> (CC BY-NC-SA 4.0)</li>' +
                '<li>The University of Queensland Library. (2026). <i>Guide to acknowledging and referencing AI</i>. <a href="https://guides.library.uq.edu.au/referencing/acknowledging-and-referencing-ai">https://guides.library.uq.edu.au/referencing/acknowledging-and-referencing-ai</a> (CC BY-NC 4.0)</li>' +
                '</ul>'
        },
        {
            id: "feedback-genai-declarations",
            number: 2,
            title: "Giving Feedback on GenAI Declarations in Written Assignments",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            extraMinutes: 20,
            status: "soon"
        },
        {
            id: "feedback-with-genai",
            number: 3,
            title: "GenAI Teaching Assistant for Formative Feedback",
            cluster: null,
            outcome: "After this module, you can turn the assessment criteria of a written assignment into the instructions of a GenAI feedback agent, and you leave with a tested agent your students can use to check their drafts against your criteria before they hand in.",
            outcomePreview: { resource: "finished-agent", caption: "An example of the feedback agent you leave with. Select to open it." },
            audience: "Higher education educators who set written assignments with stated criteria. No prior GenAI experience needed.",
            needs: "A GenAI tool your institution approves that lets you create an agent and share it with students, for example a Microsoft Copilot agent with instructions and skills, or your institution’s own GenAI platform. Also, the criteria of an assignment you set, or the sample case provided in the module.",
            minutes: 45,
            extraMinutes: 10,
            extraLabel: "practice log",
            status: "available",
            certificate: false,
            blocks: [
                {
                    id: "intro",
                    minutes: 8,
                    html: '<p><dfn>Formative feedback</dfn> is feedback students get while they can still improve their work, for example on a draft before the deadline.</p>' +
                        '<h3>The problem</h3>' +
                        '<p>Students often learn how their work measures up to the criteria only at grading, when it is too late to act on it. Before the deadline, teachers and teaching assistants answer the same “does my draft meet the criteria?” questions again and again, which does not scale to large classes.</p>' +
                        '<p>Many students already ask a GenAI chatbot for feedback, with their own prompts. They get fluent but generic feedback, not tied to your criteria and often too kind to weak work.</p>' +
                        '<h3>What you make</h3>' +
                        '<p>A <dfn>feedback agent</dfn>: a GenAI assistant that you set up once and share with your students through a link on your course page. Students open it, paste their draft, and get feedback on each of your criteria, with a quote from their own text and one next step. No grade, and no rewritten text.</p>' +
                        '<p>This module does not teach you how to build an agent; your tool’s own help does that. It gives you the two things that go into the agent: a <strong>skill</strong> (a SKILL.md file on how to give the feedback, the same for every assignment) and the <strong>instructions</strong> (text with your assignment and criteria, the only part you change).</p>' +
                        '<h3>One example all the way through</h3>' +
                        '<p>The module uses one invented example in every block: the <strong>sample case</strong>, a case study report in a second-year business course, with a weak and a strong draft. If you have no assignment of your own, you use it in <strong>Try it</strong> and <strong>Make it</strong> too.</p>' +
                        '<p><button type="button" class="link-button" data-open-resource="sample-case">Open the sample case</button></p>',
                    quiz: {
                        title: "Where you stand",
                        intro: "This question helps you choose your route through the module.",
                        scored: false,
                        questions: [
                            {
                                id: "m3-route",
                                prompt: "Which assignment will you work on?",
                                options: [
                                    {
                                        text: "My own, and it has written criteria or a rubric.",
                                        note: "Use it throughout the module. In **Try it**, you make 3 to 5 of its criteria checkable."
                                    },
                                    {
                                        text: "My own, but its criteria are not written down yet.",
                                        note: "Use it throughout the module. In **Try it**, write 3 to 5 criteria as you would explain them to a student."
                                    },
                                    {
                                        text: "I have none coming up.",
                                        note: "Use the sample case throughout the module. It comes with a weak and a strong draft to test on.",
                                        action: { label: "Open the sample case", resource: "sample-case" }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    id: "see",
                    minutes: 12,
                    html: '<p>In this block, you see what goes into a feedback agent for the sample case, and what the agent gives a student with a weak draft.</p>' +
                        M3_BUILDER_FIGURE +
                        '<p class="section-divider">Now, the four steps, for the sample case.</p>' +
                        '<ol class="step-list" role="list">' +
                        '<li>' +
                        '<p><strong>Make each criterion checkable.</strong> Criteria as written in an assignment description are for students and graders, for example “well argued”. A GenAI tool needs to know what that looks like in the text, so each criterion gets a “met when”: what the draft must show. The highlighted parts can be checked in the draft; the struck-through words cannot.</p>' +
                        '<div class="criteria-compare">' +
                        '<div class="criteria-head" aria-hidden="true"><span>Checkable: what the agent gets</span><span>Original: what students and graders see</span></div>' +
                        '<div class="criteria-row">' +
                        '<div class="criteria-check"><span class="criteria-label">Checkable</span><strong>Problem analysis.</strong> Met when: <mark>the problem is stated in one or two sentences</mark>, and <mark>at least two course concepts</mark> are applied to it using <mark>facts about the organisation</mark>.</div>' +
                        '<div class="criteria-brief"><span class="criteria-label">Original</span>“The problem is <s>clearly</s> identified and analysed using <s>relevant</s> course concepts.”</div>' +
                        '</div>' +
                        '<div class="criteria-row">' +
                        '<div class="criteria-check"><span class="criteria-label">Checkable</span><strong>Justified recommendation.</strong> Met when: the recommendation <mark>follows from the analysis</mark>, and <mark>each claim for it is backed by a cited source or data</mark> about the organisation.</div>' +
                        '<div class="criteria-brief"><span class="criteria-label">Original</span>“The recommendation is <s>well argued</s> and supported by evidence.”</div>' +
                        '</div>' +
                        '<div class="criteria-row">' +
                        '<div class="criteria-check"><span class="criteria-label">Checkable</span><strong>Clear for a professional reader.</strong> Met when: <mark>each section opens by stating its purpose</mark>, and <mark>the conclusion answers the research question</mark> set in the introduction.</div>' +
                        '<div class="criteria-brief"><span class="criteria-label">Original</span>“The report is <s>clearly written</s> and <s>well structured</s> for a professional reader.”</div>' +
                        '</div>' +
                        '</div>' +
                        '<p>The struck-through qualities still count: you judge them when you grade. The agent only checks what it can see in the draft.</p>' +
                        '</li>' +
                        '<li>' +
                        '<p><strong>Fill in the agent.</strong> The instructions hold the assignment and the checkable criteria; the underlined parts are what you change for your own assignment. The skill stays as it is.</p>' +
                        '<div data-text="see-instructions"></div>' +
                        '<div data-text="see-skill"></div>' +
                        '</li>' +
                        '<li>' +
                        '<p><strong>Run it on a weak draft.</strong> A student opens the agent and pastes their whole draft. Below is the kind of feedback they get.</p>' +
                        '<p><button type="button" class="link-button" data-open-resource="test-weak">Open the weak draft</button></p>' +
                        '<div data-text="see-draft"></div>' +
                        '</li>' +
                        '<li>' +
                        '<p><strong>Check the feedback.</strong> Before students get the agent, you check what it gives against your own judgement:</p>' +
                        '<ul class="check-list" role="list">' +
                        '<li><span class="check-label check-label-ok">OK</span> <span><strong>Each verdict quotes the draft.</strong> The student can see what the verdict is based on.</span></li>' +
                        '<li><span class="check-label check-label-ok">OK</span> <span><strong>The verdicts are not too kind.</strong> The draft reads fluently, but no criterion is met, because each “met when” says what is missing.</span></li>' +
                        '<li><span class="check-label check-label-ok">OK</span> <span><strong>No grade and no rewritten text.</strong> Each next step tells the student what to do, not what to write.</span></li>' +
                        '</ul>' +
                        '<p>Here every check holds. When one does not, <a href="#block-make">Make it</a> shows what to change.</p>' +
                        '</li>' +
                        '</ol>' +
                        '<h3>Why it works</h3>' +
                        '<p>Feedback helps most when it makes clear what good work looks like and reaches students while they can still act on it (Nicol &amp; Macfarlane-Dick, 2006), and when it says where to go next, not only how well the work did (Hattie &amp; Timperley, 2007). The “met when” parts carry your standard into the agent, and testing on a weak and a strong draft shows whether the tool keeps it.</p>',
                    quiz: {
                        title: "Self-check",
                        scored: true,
                        questions: [
                            {
                                id: "m3-see1",
                                prompt: "A student pastes a weak draft, and the feedback says every criterion is met. What is the most likely cause?",
                                options: [
                                    { text: "The student has found a way to trick the tool." },
                                    { text: "The criteria have no “met when”, so the tool falls back on its own, often lenient, judgement." },
                                    { text: "The GenAI tool is broken." }
                                ],
                                correct: 1,
                                explanation: "Without a “met when”, the tool has nothing specific to check, and fluent text tends to pass. See step 1 in **See it**."
                            }
                        ]
                    }
                },
                {
                    id: "try",
                    minutes: 10,
                    html: '<p>In this block, you write what goes into the instructions, for an assignment you set or for the sample case. With the sample case, select “Use the sample case”: the form is filled in with its criteria as written for students, and you make each one checkable yourself. Then compare with the version in <strong>See it</strong>.</p>' +
                        '<div class="callout">' +
                        '<h3 class="callout-title">What to aim for</h3>' +
                        '<ul>' +
                        '<li>3 to 5 criteria, one per line, each with “Met when:”.</li>' +
                        '<li>Each criterion can be judged from the student’s text alone.</li>' +
                        '<li>The criteria are the ones students see, in words they understand.</li>' +
                        '<li>Optional: add the mistake students often make, for example “Typical mistake: claims with no source.” It helps the agent spot it.</li>' +
                        '</ul>' +
                        '</div>' +
                        '<details class="dropdown">' +
                        '<summary>Save time: let GenAI draft the “met when” parts</summary>' +
                        '<div class="dropdown-body">' +
                        '<p>Copy this prompt into your approved GenAI tool, paste your criteria or rubric where shown, and check the result before you put it in the form below. Paste criteria only, never student work.</p>' +
                        '<div data-text="try-starter"></div>' +
                        '</div>' +
                        '</details>' +
                        '<div data-form></div>' +
                        '<details class="dropdown">' +
                        '<summary>Sample case: compare with our checkable version</summary>' +
                        '<div class="dropdown-body">' +
                        '<p>Yours does not need to match. Check that each of yours says what the draft must show, in things a reader can see or count.</p>' +
                        '<ol>' +
                        '<li>Problem analysis. Met when: the problem is stated in one or two sentences, and at least two course concepts are applied to it using facts about the organisation.</li>' +
                        '<li>Justified recommendation. Met when: the recommendation follows from the analysis, and each claim for it is backed by a cited source or data about the organisation.</li>' +
                        '<li>Clear for a professional reader. Met when: each section opens by stating its purpose, and the conclusion answers the research question set in the introduction.</li>' +
                        '</ol>' +
                        '</div>' +
                        '</details>',
                    quiz: {
                        title: "Self-check",
                        scored: true,
                        questions: [
                            {
                                id: "m3-try1",
                                prompt: "Which criterion can a GenAI tool judge from the student’s text alone?",
                                action: { label: "Open the sample case", resource: "sample-case" },
                                options: [
                                    {
                                        text: "Good research. Met when: the student has read widely about the organisation.",
                                        note: "How widely the student read cannot be seen in the text."
                                    },
                                    {
                                        text: "Justified recommendation. Met when: each claim for the recommendation is backed by a cited source or data about the organisation.",
                                        note: "This can be checked in the text: each claim either has a source or data, or not."
                                    },
                                    {
                                        text: "Effort. Met when: the student has worked hard on the report.",
                                        note: "Effort cannot be seen in the text, and it is not what the report is assessed on."
                                    }
                                ],
                                correct: 1
                            }
                        ]
                    },
                    form: {
                        practiceResource: "sample-case",
                        practiceLabel: "sample case",
                        practiceStatus: "Filled in with the sample case. Its criteria are as written for students: rewrite each one with a “Met when:”, then compare with our version below the form.",
                        practiceFill: true,
                        fields: [
                            {
                                title: "The assignment",
                                guidance: "Its name, and a short description students would recognise.",
                                inputs: [
                                    { key: "name", label: "Name", type: "line",
                                      practice: "Case study report" },
                                    { key: "description", label: "Description", type: "text", rows: 3,
                                      practice: "A 2,500-word individual report in a second-year bachelor's course. Each student picks an organisation, analyses one problem it faces, and recommends a solution." }
                                ]
                            },
                            {
                                title: "Criteria",
                                guidance: "Start from the criteria in your assignment description or rubric. Choose 3 to 5, one per line, and write each as: name. Met when: what the draft must show.",
                                inputs: [
                                    { key: "criteria", label: "Criteria", type: "text", rows: 6,
                                      practice: "1. Problem analysis. The problem is clearly identified and analysed using relevant course concepts.\n2. Recommendation. The recommendation is well argued and supported by evidence.\n3. Writing and structure. The report is clearly written and well structured for a professional reader." }
                                ]
                            },
                            {
                                title: "What students paste",
                                guidance: "Which part of the draft, and how long. Shorter parts give more precise feedback.",
                                inputs: [
                                    { key: "paste", label: "What students paste", type: "line",
                                      practice: "their whole draft or one or more sections of it" }
                                ]
                            }
                        ]
                    }
                },
                {
                    id: "make",
                    minutes: 12,
                    html: '<p>In this block, you set up your feedback agent, test it on a weak and a strong draft, fix it if needed, and share it with students.</p>' +
                        '<ol class="step-list" role="list">' +
                        '<li>' +
                        '<p><strong>Download the skill.</strong> It is the same for every assignment, so you download it once and upload it to every feedback agent you make. Keep the file name SKILL.md.</p>' +
                        '<div data-text="make-skill"></div>' +
                        '</li>' +
                        '<li>' +
                        '<p><strong>Copy the instructions.</strong> They hold your information from <a href="#block-try">Try it</a>. This is the only part you change for another assignment.</p>' +
                        '<div data-text="make-instructions"></div>' +
                        '</li>' +
                        '<li><p><strong>Create the agent</strong> in your approved GenAI tool, with a name students will recognise, for example “Feedback on the case study report”. Paste the instructions into its instructions and upload SKILL.md as its skill. If your tool has no place for a skill, paste the skill text under the instructions.</p>' +
                        M3_BUILDER_FIGURE + '</li>' +
                        '<li><p><strong>Test it.</strong> Open a new conversation with your agent and paste the weak draft. Do it twice, in two new conversations. Then paste the strong draft once. Use drafts you wrote yourself or the sample case drafts, never real student work with names or other personal data.</p>' +
                        '<p><button type="button" class="link-button" data-open-resource="test-weak">Open the weak draft</button> · <button type="button" class="link-button" data-open-resource="test-strong">Open the strong draft</button></p></li>' +
                        '<li><p><strong>Check the feedback.</strong> First judge the drafts yourself, criterion by criterion. Then tick what holds:</p>' +
                        '<ol class="tick-list" data-checklist>' +
                        '<li>Every verdict comes with a quote from the draft.</li>' +
                        '<li>The weak draft gets lower verdicts than the strong one, on the criteria where it is weaker.</li>' +
                        '<li>The two runs on the weak draft give the same verdicts.</li>' +
                        '<li>There is no grade or score, and no rewritten text.</li>' +
                        '<li>Each next step is something the student can do, in the terms of your criteria.</li>' +
                        '</ol>' +
                        '</li>' +
                        '<li><p><strong>Fix what failed.</strong> All ticked? Go on to the next step. If a tick is missing, open the list below to see what to change.</p>' +
                        '<details class="dropdown">' +
                        '<summary>If a tick is missing: what to change</summary>' +
                        '<div class="dropdown-body">' +
                        '<p>Most fixes are in your criteria: edit them in <a href="#block-try">Try it</a>, copy the instructions again, paste them over the old ones, and rerun the same drafts. The skill stays as it is.</p>' +
                        '<ul class="fix-list" role="list">' +
                        '<li><p class="fix-check">1. A verdict has no quote, or the format is not followed</p><p><strong>Likely cause:</strong> the agent does not use the skill.</p><p><strong>Change:</strong> check that SKILL.md is uploaded as the agent’s skill. If it still is not used, paste the skill text under the instructions.</p></li>' +
                        '<li><p class="fix-check">2. The weak draft gets “Met”</p><p><strong>Likely cause:</strong> the “met when” is too vague, so fluent text passes.</p><p><strong>Change:</strong> make it something you can see or count (“at least two…”, “each claim…”), and add “Typical mistake: …”.</p></li>' +
                        '<li><p class="fix-check">3. The two runs give different verdicts</p><p><strong>Likely cause:</strong> the criterion checks two things at once, or a word in it can be read two ways.</p><p><strong>Change:</strong> split it into two criteria, or replace the vague word.</p></li>' +
                        '<li><p class="fix-check">4. It gives a grade or rewrites text</p><p><strong>Likely cause:</strong> the rule is lost in a long text.</p><p><strong>Change:</strong> make sure the first line of the instructions is kept as it is, and shorten long criteria.</p></li>' +
                        '<li><p class="fix-check">5. A next step is vague, such as “improve your analysis”</p><p><strong>Likely cause:</strong> the “met when” does not say what the draft must show.</p><p><strong>Change:</strong> rewrite the “met when”; the next step follows from it.</p></li>' +
                        '</ul>' +
                        '<div class="callout">' +
                        '<h3 class="callout-title">Still failing after two rounds?</h3>' +
                        '<p>Take that criterion out of the instructions and tell students to check it themselves or ask you. Share the agent for the criteria that pass. If none pass, do not share it this term. Either way, note what happened in the practice log: it is a useful finding too.</p>' +
                        '</div>' +
                        '</div>' +
                        '</details>' +
                        '</li>' +
                        '<li><p><strong>Share it.</strong> If your institution allows it, share the agent with your students only, and put its link on the course page with one line on top: “Open this agent, then paste your draft.”</p></li>' +
                        '</ol>'
                },
                {
                    id: "plan",
                    minutes: 3,
                    html: '<p>In this block, you plan how students get your feedback agent, and start the practice log.</p>' +
                        '<ol class="step-list" role="list">' +
                        '<li><p><strong>Check the rules.</strong> Students should use a GenAI tool your institution approves, and the course’s GenAI rules must allow GenAI feedback on drafts. If they do not, change the rules or the plan before you share the agent.</p></li>' +
                        '<li><p><strong>Choose when, and introduce it.</strong> Give students the agent when they have a draft, for example two weeks before the deadline. Tell them what it is for, that the feedback can be wrong, that you grade, and not to paste in other people’s work or personal data.</p></li>' +
                        '<li><p><strong>Start the practice log.</strong> Note the course, the assignment, when students get the agent, what you changed while testing, and how you will find out whether they used it (for example, one question in the hand-in). After the hand-in, answer: Was one piece of feedback a student got right by your criteria? What would you tell a colleague?</p></li>' +
                        '</ol>' +
                        '<h3>Example: a course feedback coach at DTU</h3>' +
                        '<p>At the Technical University of Denmark (DTU), this is how a feedback agent looks on DTU’s own GenAI platform, CampusAI: a teacher turns the criteria into a feedback coach that students open with their DTU login, so they only paste their draft. The video shows how it works (1 min 40 s, no sound; demo with an invented course and student draft). You do not need it for this module.</p>' +
                        '<video class="module-video" controls preload="metadata" src="assets/module-3/dtu-feedback-coach.mp4">' +
                        '<p>Your browser cannot play this video. <a href="assets/module-3/dtu-feedback-coach.mp4">Download the video</a>.</p>' +
                        '</video>' +
                        '<details class="dropdown">' +
                        '<summary>Text version of the video</summary>' +
                        '<div class="dropdown-body">' +
                        '<ol>' +
                        '<li><strong>Teacher:</strong> opens the Coach Builder and names the course.</li>' +
                        '<li>Pastes how they assess. Here it is a transcript of them talking about what they look for in reports and what they ask in the oral exam.</li>' +
                        '<li>Signs in with the university account. The AI turns the text into five report criteria and three oral-exam questions.</li>' +
                        '<li>Reviews the criteria, adds course readings the coach can point students to, and downloads the coach to share on the course page.</li>' +
                        '<li><strong>Student:</strong> opens the coach, signs in with their university account, and pastes a draft.</li>' +
                        '<li>Gets feedback on each criterion: whether it is present, partly there or missing, where in the draft, what is weak, a question to think about, and what to reread. No grade, and no rewritten text.</li>' +
                        '</ol>' +
                        '<p>Why your own AI infrastructure helps: students sign in with their university account, so they need no private chatbot accounts; text goes only to the university’s own AI platform; each coach is built from the teacher’s own criteria, which the teacher reviews before students get it.</p>' +
                        '</div>' +
                        '</details>'
                }
            ],
            resources: [
                {
                    id: "sample-case",
                    group: "Worked example",
                    title: "Sample case",
                    html: '<p class="resource-note">(Invented for this module and used in every block. Written as a typical assignment description. In Try it, “Use the sample case” fills in its criteria as written here, for you to make checkable.)</p>' +
                        '<div class="guide-page">' +
                        '<p><strong>Organisation and Management</strong> · 2nd-year BSc · 5 ECTS</p>' +
                        '<h3>Assignment 2: Case study report</h3>' +
                        '<p><strong>Weight:</strong> 40% of the final grade. <strong>Deadline:</strong> Friday, week 11, 23:59, on the course page.</p>' +
                        '<h4>Task</h4>' +
                        '<p>Choose an organisation and identify one problem it faces. Analyse the problem using at least two concepts from the course, and recommend a solution.</p>' +
                        '<h4>Requirements</h4>' +
                        '<ul>' +
                        '<li>Individual report, 2,000–2,500 words, not counting references and appendices.</li>' +
                        '<li>Sections: Introduction (with your research question), Background, Problem analysis, Recommendation, Conclusion, References.</li>' +
                        '<li>APA 7 referencing. Hand in one PDF file.</li>' +
                        '<li>GenAI use: Level 2, AI Planning. See the GenAI guide for this assignment.</li>' +
                        '</ul>' +
                        '<h4>Learning outcomes</h4>' +
                        '<ul>' +
                        '<li>LO1 Analyse an organisation’s problem using course concepts.</li>' +
                        '<li>LO2 Recommend a solution and justify it with evidence.</li>' +
                        '<li>LO3 Write clearly for a professional reader.</li>' +
                        '</ul>' +
                        '<h4>Assessment criteria</h4>' +
                        '<ul>' +
                        '<li><strong>Problem analysis (40%):</strong> The problem is clearly identified and analysed using relevant course concepts.</li>' +
                        '<li><strong>Recommendation (40%):</strong> The recommendation is well argued and supported by evidence.</li>' +
                        '<li><strong>Writing and structure (20%):</strong> The report is clearly written and well structured for a professional reader.</li>' +
                        '</ul>' +
                        '</div>' +
                        '<p>Drafts to test your agent with: <button type="button" class="link-button" data-open-resource="test-weak">weak</button> and <button type="button" class="link-button" data-open-resource="test-strong">strong</button>.</p>'
                },
                {
                    id: "test-weak",
                    group: "Worked example",
                    title: "Weak draft",
                    html: '<p class="resource-note">(Invented for this module: a weak draft for the sample case, with all the sections the assignment asks for, shortened to about 250 words. Paste it into your agent in Make it.)</p>' +
                        '<div class="guide-page">' +
                        '<h4>Introduction</h4>' +
                        '<p>Café Nord is a small café in Aarhus. This report is about Café Nord and the problems it has.</p>' +
                        '<h4>Background</h4>' +
                        '<p>Café Nord opened in 2015. It sells coffee, cakes and sandwiches and has some staff. It is a popular café, but things have changed in the last years.</p>' +
                        '<h4>Problem analysis</h4>' +
                        '<p>Café Nord has a problem with customers. Fewer people come back than before, and this is bad for the business. There are many reasons for this, like competition and prices. Motivation is also important for the staff.</p>' +
                        '<h4>Recommendation</h4>' +
                        '<p>Based on the analysis, Café Nord should introduce a loyalty app. Loyalty apps are very popular and many companies use them successfully. This would solve the problem of customers not coming back and increase sales. It is also cheap to set up.</p>' +
                        '<h4>Conclusion</h4>' +
                        '<p>To sum up, Café Nord has some problems, but with a loyalty app things will get better.</p>' +
                        '<h4>References</h4>' +
                        '<p>Wikipedia. (n.d.). Loyalty program. Retrieved from wikipedia.org</p>' +
                        '</div>'
                },
                {
                    id: "test-strong",
                    group: "Worked example",
                    title: "Strong draft",
                    html: '<p class="resource-note">(Invented for this module: a strong draft for the sample case, with all the sections the assignment asks for, shortened to about 450 words. The organisation, data and the Jensen &amp; Holm source are made up. Paste it into your agent in Make it.)</p>' +
                        '<div class="guide-page">' +
                        '<h4>Introduction</h4>' +
                        '<p>This report asks: why do fewer customers return to Café Nord, a 40-seat café in central Aarhus, and what should it do about it? Its sales fell 18% from 2024 to 2025. The report gives background on the café, analyses the problem and recommends a solution.</p>' +
                        '<h4>Background</h4>' +
                        '<p>This section describes Café Nord as it is today. It opened in 2015, is run by its owner, and has eight staff on part-time contracts with weekly changing schedules. Most of its sales come from regular customers who live or work nearby.</p>' +
                        '<h4>Problem analysis</h4>' +
                        '<p>This section analyses why customers do not return. Since 2024, the share of customers who return within a month has fallen from 46% to 31% (Café Nord sales data, 2025). Two course concepts explain this. First, in Porter’s five forces, the threat of substitutes has grown: two chain cafés opened within 300 m in 2024, both with lower prices. Second, in Herzberg’s two-factor theory, weak hygiene factors such as pay and irregular schedules explain why five of eight staff left in 2024 (owner interview). New staff do not know the regular customers, and in a survey of 40 customers, 29 named “staff who know me” as their main reason for coming.</p>' +
                        '<h4>Recommendation</h4>' +
                        '<p>This section recommends how Café Nord can win back regular customers. It should first offer fixed schedules and match local pay, because staff turnover is the cause the analysis found behind the loss of personal service. It should then add a paper stamp card: in a study of 30 small Danish cafés, stamp cards raised return visits by 10–15% (Jensen &amp; Holm, 2022), at about DKK 2,000 a year against DKK 40,000 for an app.</p>' +
                        '<h4>Conclusion</h4>' +
                        '<p>Fewer customers return to Café Nord because cheaper competitors arrived and staff turnover removed the personal service its regulars came for. Stable staff, followed by a stamp card, is the recommended response.</p>' +
                        '<h4>References</h4>' +
                        '<p>Herzberg, F. (1966). <i>Work and the nature of man</i>. World Publishing.</p>' +
                        '<p>Jensen, M., &amp; Holm, L. (2022). Stamp cards and repeat visits in small Danish cafés. <i>Nordic Journal of Retail Studies, 9</i>(2), 45–58.</p>' +
                        '<p>Porter, M. E. (2008). The five competitive forces that shape strategy. <i>Harvard Business Review, 86</i>(1), 78–93.</p>' +
                        '</div>'
                },
                {
                    id: "finished-agent",
                    group: "Worked example",
                    title: "Finished agent",
                    html: '<p class="resource-note">(Based on the sample case: what the teacher adds to the agent. Students open the agent and paste their draft.)</p>' +
                        '<div class="guide-page">' +
                        '<h3>Feedback agent: case study report</h3>' +
                        '<h4>Instructions (changed for each assignment)</h4>' +
                        '<p>You give formative feedback to a student on a draft of one written assignment. You do not grade it, and you never rewrite the student’s text. Use your skill criteria-feedback for how to give the feedback.</p>' +
                        '<p>Assignment: Case study report. A 2,500-word individual report in a second-year bachelor’s course. Each student picks an organisation, analyses one problem it faces, and recommends a solution.</p>' +
                        '<p>Criteria (judge only these):</p>' +
                        '<ol>' +
                        '<li>Problem analysis. Met when: the problem is stated in one or two sentences, and at least two course concepts are applied to it using facts about the organisation.</li>' +
                        '<li>Justified recommendation. Met when: the recommendation follows from the analysis, and each claim for it is backed by a cited source or data about the organisation.</li>' +
                        '<li>Clear for a professional reader. Met when: each section opens by stating its purpose, and the conclusion answers the research question set in the introduction.</li>' +
                        '</ol>' +
                        '<p>What the student pastes: their whole draft or one or more sections of it.</p>' +
                        '<h4>Skill (SKILL.md, the same for every assignment)</h4>' +
                        '<p>name: criteria-feedback. description: Gives formative feedback on a student’s draft against the assignment criteria in the agent’s instructions.</p>' +
                        '<p>For each criterion: a verdict (Met, Partly met or Not yet met; Partly met if the evidence is weak or unclear), a short quote from the draft as evidence, and one concrete next step. “Cannot judge” if the part needed is missing.</p>' +
                        '<p>Rules: never a grade, a score or an overall judgement; never rewritten text; the same language as the draft; ends with “This is GenAI feedback on your draft against the course criteria. It can be wrong. Your teacher grades your work.”</p>' +
                        '</div>'
                }
            ],
            texts: [
                {
                    id: "make-skill",
                    kind: "live-prompt",
                    label: "Skill",
                    showLabel: true,
                    showLines: 4,
                    moreLabel: "Show the whole skill",
                    copyLabel: "Copy SKILL.md text",
                    download: { label: "Download SKILL.md", filename: "SKILL.md" },
                    template: [
                        "---",
                        "name: criteria-feedback",
                        "description: Gives formative feedback on a student's draft against the assignment criteria in the agent's instructions. Use whenever a student pastes a draft or part of one.",
                        "---",
                        "# What you do",
                        "Judge the draft only against the criteria in your instructions. Do not add criteria of your own. You give feedback; the teacher grades.",
                        "# For each criterion",
                        "- Verdict: Met, Partly met or Not yet met. If the evidence is weak or unclear, give Partly met, not Met.",
                        "- Evidence: a short quote from the draft.",
                        "- Next step: one concrete thing the student can do, in the words of the criterion.",
                        "If the part needed to judge a criterion is missing, write \"Cannot judge\" and say what the student should paste.",
                        "# Rules",
                        "- Never give a grade, a score or an overall judgement.",
                        "- Never rewrite the student's text or write new text for them, even if asked.",
                        "- Write in the same language as the draft.",
                        "- If nothing is pasted, greet the student in one sentence and ask for their draft.",
                        "- End with: \"This is GenAI feedback on your draft against the course criteria. It can be wrong. Your teacher grades your work.\""
                    ]
                },
                {
                    id: "make-instructions",
                    kind: "live-prompt",
                    label: "Instructions",
                    showLabel: true,
                    copyLabel: "Copy instructions",
                    template: [
                        "You give formative feedback to a student on a draft of one written assignment. You do not grade it, and you never rewrite the student's text. Use your skill criteria-feedback for how to give the feedback.",
                        "# Assignment",
                        "{{name|[assignment name]}}. {{description|[description]}}",
                        "# Criteria (judge only these)",
                        "{{criteria|[criteria, one per line, each with Met when]}}",
                        "# What the student pastes",
                        "{{paste|[what students paste]}}"
                    ]
                },
                {
                    id: "try-starter",
                    kind: "live-prompt",
                    label: "Prompt to draft the met when parts",
                    copyLabel: "Copy prompt",
                    template: [
                        "Below are the assessment criteria of my written assignment. Rewrite 3 to 5 of them so that each can be judged from the student's text alone.",
                        "Write each on one line as: name. Met when: what the draft must show.",
                        "Use things a reader can see or count in the text, not words such as \"clear\" or \"well argued\".",
                        "After the list, name any part of my criteria that cannot be judged from the text alone.",
                        "Criteria: [paste your criteria or rubric here]"
                    ]
                },
                {
                    id: "see-instructions",
                    kind: "prompt",
                    label: "Instructions",
                    showLabel: true,
                    lines: [
                        "You give formative feedback to a student on a draft of one written assignment. You do not grade it, and you never rewrite the student's text. Use your skill criteria-feedback for how to give the feedback.",
                        "# Assignment",
                        "{{Case study report. A 2,500-word individual report in a second-year bachelor's course. Each student picks an organisation, analyses one problem it faces, and recommends a solution.}}",
                        "# Criteria (judge only these)",
                        "{{1. Problem analysis. Met when: the problem is stated in one or two sentences, and at least two course concepts are applied to it using facts about the organisation.}}",
                        "{{2. Justified recommendation. Met when: the recommendation follows from the analysis, and each claim for it is backed by a cited source or data about the organisation.}}",
                        "{{3. Clear for a professional reader. Met when: each section opens by stating its purpose, and the conclusion answers the research question set in the introduction.}}",
                        "# What the student pastes",
                        "{{their whole draft or one or more sections of it}}"
                    ]
                },
                {
                    id: "see-skill",
                    kind: "prompt",
                    label: "Skill",
                    showLabel: true,
                    showLines: 4,
                    moreLabel: "Show the whole skill",
                    lines: [
                        "---",
                        "name: criteria-feedback",
                        "description: Gives formative feedback on a student's draft against the assignment criteria in the agent's instructions. Use whenever a student pastes a draft or part of one.",
                        "---",
                        "# What you do",
                        "Judge the draft only against the criteria in your instructions. Do not add criteria of your own. You give feedback; the teacher grades.",
                        "# For each criterion",
                        "- Verdict: Met, Partly met or Not yet met. If the evidence is weak or unclear, give Partly met, not Met.",
                        "- Evidence: a short quote from the draft.",
                        "- Next step: one concrete thing the student can do, in the words of the criterion.",
                        "If the part needed to judge a criterion is missing, write \"Cannot judge\" and say what the student should paste.",
                        "# Rules",
                        "- Never give a grade, a score or an overall judgement.",
                        "- Never rewrite the student's text or write new text for them, even if asked.",
                        "- Write in the same language as the draft.",
                        "- If nothing is pasted, greet the student in one sentence and ask for their draft.",
                        "- End with: \"This is GenAI feedback on your draft against the course criteria. It can be wrong. Your teacher grades your work.\""
                    ]
                },
                {
                    id: "see-draft",
                    kind: "draft",
                    label: "Example feedback on the weak draft (illustration; replace with a real run)",
                    showLines: 5,
                    moreLabel: "Show all the feedback",
                    lines: [
                        "# 1. Problem analysis",
                        "- Verdict: Not yet met.",
                        "- Evidence: \"Café Nord has a problem with customers. Fewer people come back than before\"",
                        "- Next step: State the problem in one or two sentences with a fact about Café Nord, then apply at least two course concepts to it by name.",
                        "# 2. Justified recommendation",
                        "- Verdict: Not yet met.",
                        "- Evidence: \"Loyalty apps are very popular and many companies use them successfully.\"",
                        "- Next step: Back each claim with a cited source or with data about Café Nord, and show how the app answers the problem found in your analysis.",
                        "# 3. Clear for a professional reader",
                        "- Verdict: Not yet met.",
                        "- Evidence: \"This report is about Café Nord and the problems it has.\"",
                        "- Next step: Set a research question in the introduction, open each section by stating its purpose, and make the conclusion answer that question.",
                        "This is GenAI feedback on your draft against the course criteria. It can be wrong. Your teacher grades your work."
                    ]
                }
            ],
            sources: '<ul class="reference-list">' +
                '<li>Hattie, J., &amp; Timperley, H. (2007). The power of feedback. <i>Review of Educational Research, 77</i>(1), 81–112. <a href="https://doi.org/10.3102/003465430298487">https://doi.org/10.3102/003465430298487</a></li>' +
                '<li>Nicol, D. J., &amp; Macfarlane-Dick, D. (2006). Formative assessment and self-regulated learning: A model and seven principles of good feedback practice. <i>Studies in Higher Education, 31</i>(2), 199–218. <a href="https://doi.org/10.1080/03075070600572090">https://doi.org/10.1080/03075070600572090</a></li>' +
                '</ul>'
        },
        {
            id: "rubrics-with-genai",
            number: 4,
            title: "Creating Assessment Rubrics with GenAI",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            extraMinutes: 20,
            status: "soon"
        },
        {
            id: "feedback-lit-course-instructors",
            number: 5,
            title: "Feedback Literacy for Course Instructors with GenAI",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            extraMinutes: 20,
            status: "soon"
        },
        {
            id: "assess-handwritten-exams",
            number: 6,
            title: "GenAI-Supported Assessment of Handwritten exams",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            extraMinutes: 20,
            status: "soon"
        }
    ]
};

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
                    html: '<p>In this block you see how one prompt can turn the sample case into a policy and declaration guide.</p>' +
                        '<p>The policy and declaration guide has three parts:</p>' +
                        '<ol>' +
                        '<li><strong>Level of GenAI use.</strong> Specify where the assignment lies on the AI Assessment Scale. The scale has five levels of GenAI use, from No AI to AI Exploration (Perkins et al., 2025). You choose the level that fits what the assignment assesses.' +
                        '<details class="dropdown">' +
                        '<summary>The five levels</summary>' +
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
                        '<li><strong>A list of do\'s and don\'ts.</strong> List what students should and should not do with GenAI, in the assignment’s own terms: “GenAI for…” and “GenAI is not for…”.</li>' +
                        '<li><strong>A declaration and example.</strong> What students state about their GenAI use, and where.</li>' +
                        '</ol>' +
                        '<ol class="step-list" role="list">' +
                        '<li>' +
                        '<p><strong>Specify the level of GenAI use.</strong> Given the learning outcomes (LOs) in the sample case, GenAI may help students plan, but not do these. So: Level 2, AI Planning.</p>' +
                        '<p><button type="button" class="link-button" data-open-resource="sample-case">Open the sample case</button></p>' +
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
                        intro: "One question that applies step 1 to a new case.",
                        scored: true,
                        questions: [
                            {
                                id: "m1-see1",
                                prompt: "A take-home essay is set at Level 1, No AI. What fits the scale best?",
                                options: [
                                    {
                                        text: "Keep Level 1 and ask for a signed ‘no GenAI’ statement.",
                                        note: "Declaring work AI-free without a controlled setting has proved untenable (Perkins et al., 2025). See step 1."
                                    },
                                    {
                                        text: "Do it under supervision, or choose another level.",
                                        note: "Level 1 needs a supervised setting (Perkins et al., 2025)."
                                    },
                                    {
                                        text: "Keep Level 1 and use a GenAI detector.",
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
                    html: '<p>In this block you collect the five details the prompt needs, for your own assignment or the practice case.</p>' +
                        '<div class="callout">' +
                        '<h3 class="callout-title">What to aim for</h3>' +
                        '<ul>' +
                        '<li>All five fields are filled in.</li>' +
                        '<li>The learning outcomes are the ones students see.</li>' +
                        '</ul>' +
                        '</div>' +
                        '<div data-form></div>' +
                        '<h3>Your judgement</h3>' +
                        '<p>In step 5, you judged which uses of GenAI would replace what the assignment assesses. In <a href="#block-make">Make it</a> you judge the GenAI draft itself, with the checklist.</p>',
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
                                title: "Institution",
                                guidance: "Look up your institution’s GenAI rules. Your policy must stay within them (Heaps, 2024). Write the institution’s name, for example, Technical University of Denmark, DTU.",
                                inputs: [
                                    { key: "institution", label: "Institution", type: "line",
                                      practice: "the university" }
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
                    html: '<p>In this block you let GenAI draft your policy and declaration guide, check it, and make it ready to use.</p>' +
                        '<ol class="step-list" role="list">' +
                        '<li>' +
                        '<p><strong>Copy your prompt.</strong> The prompt is ready below, as it was in <a href="#block-see">See it</a> but with your information from <a href="#block-try">Try it</a>. Adjust the information in Try it or copy right away.</p>' +
                        '<div data-text="make-prompt"></div>' +
                        '</li>' +
                        '<li><p><strong>Paste your prompt into a new conversation</strong> in a GenAI tool of your choice, for example Microsoft Copilot (a free account is enough).</p></li>' +
                        '<li><p><strong>Check the draft.</strong> You should now have a drafted GenAI policy and declaration guide. Following the checklist below, fix what falls short: Edit the text yourself, or ask the tool to change one item.</p></li>' +
                        '<li><p><strong>Save it.</strong> Paste the finalised policy and guide into a document and save it. Keep the credit line at the end.</p></li>' +
                        '<li>' +
                        '<p><strong>Add an example declaration.</strong> You can write it at the end of the document as in the finished sample policy and declaration guide.</p>' +
                        '<p><button type="button" class="pill-button pill-button-secondary" data-open-resource="finished-guide" aria-haspopup="dialog">Open the finished sample policy and declaration guide</button></p>' +
                        '</li>' +
                        '</ol>' +
                        '<h3>Checklist</h3>' +
                        '<ol class="tick-list" data-checklist>' +
                        '<li>The AI level (1-5) fits what the assignment assesses (Heaps, 2024).</li>' +
                        '<li>The AI level (1-5) fits your institution’s rules (Heaps, 2024).</li>' +
                        '<li>Nothing under “GenAI for…” does what a learning outcome asks students to show.</li>' +
                        '<li>The declaration guide asks for the tool, the use, the prompts/links, the part of the work AI is used for, and the date, and it says where the declaration should be (UQ Library, 2026).</li>' +
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
                        '<li><p><strong>Hand out your guide.</strong> It is ideal to raise GenAI in the first week of the course, and again when you set the assignment (Heaps, 2024). No course coming up? Give it to a peer or colleague, and ask them to write a declaration for an imagined use.</p></li>' +
                        '<li><p><strong>Fill in the log:</strong> part 1 when you hand out the guide, parts 2 and 3 when you have one declaration back.</p></li>' +
                        '<li><p><strong>On the certified track,</strong> email the log to the reviewer by the deadline.</p></li>' +
                        '</ol>'
                }
            ],
            resources: [
                {
                    id: "sample-case",
                    title: "Sample case",
                    html: '<p class="resource-note">(Invented for this module, used in shown examples.)</p>' +
                        '<p>A 2,500-word individual report in a second-year bachelor’s course. Each student picks an organisation, analyses one problem it faces, and recommends a solution.</p>' +
                        '<ul>' +
                        '<li>Learning outcome 1 (LO1): Analyse an organisation’s problem using course concepts.</li>' +
                        '<li>Learning outcome 2 (LO2): Recommend a solution and justify it with evidence.</li>' +
                        '<li>Learning outcome 3 (LO3): Write clearly for a professional reader.</li>' +
                        '</ul>' +
                        '<p><strong>Institution rule:</strong> GenAI may be used if the course guide says how, and all use must be declared.</p>'
                },
                {
                    id: "finished-guide",
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
                    title: "Practice case",
                    html: '<p class="resource-note">(Invented for this module.)</p>' +
                        '<p><strong>Pendulum lab report.</strong> A 1,500-word individual lab report in a first-year bachelor’s physics course. Students measure the acceleration due to gravity with a simple pendulum, analyse their data, and discuss the result.</p>' +
                        '<ul>' +
                        '<li>Learning outcome 1 (LO1): Collect and present measurement data with uncertainties.</li>' +
                        '<li>Learning outcome 2 (LO2): Analyse the data and compare the result with the accepted value.</li>' +
                        '<li>Learning outcome 3 (LO3): Discuss sources of error and suggest improvements.</li>' +
                        '</ul>' +
                        '<p><strong>What the teacher wants:</strong> GenAI may help students draft and edit the introduction and the method description, and give feedback on their draft. Students must check and change anything GenAI writes. They collect and analyse the data, and write the discussion, themselves.</p>' +
                        '<p><strong>Institution rule:</strong> Each assignment states the level of GenAI use allowed, and students must declare all GenAI use.</p>' +
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
            title: "Give Formative Feedback with GenAI",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            extraMinutes: 20,
            status: "soon"
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

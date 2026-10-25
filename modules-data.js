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
//   minutes  length in minutes (60 shows as "About 1 hour")
//   extraMinutes  extra time on top, in minutes (20 adds " + 20 min."); optional
//   status   "soon" (shown as "Coming soon", not linked) or "available"
//   blocks   content for each block, by block id (see below); blocks left out show a placeholder
//              id       one of the block ids defined at the top
//              minutes  approximate time for the block, or null if not decided
//              html     the block content: headings (h3), paragraphs, lists, links,
//                       and callouts written as <div class="callout">...</div>
//              quiz     optional self-check, shown after the block content:
//                         { title: "Self-check",          heading above the questions
//                           scored: true,                 false = no right or wrong answer
//                           questions: [
//                             { id: "m1-sc1",             unique within the module; used to store the answer
//                               prompt: "...",
//                               options: [ { text: "...", note: "..." } ],   note is optional feedback for that option
//                               correct: 1,               index into options; leave out when scored is false
//                               explanation: "..." } ] }  shown after any answer when scored is true
//                         All quiz text is plain text, not HTML. In notes and explanations only
//                         **bold** is understood; if the bold phrase is exactly a block title
//                         (Intro, See it, Try it, Make it, Plan it) it becomes a bold link to that block.
//                         A quiz with scored: false shows "Not scored. Your answer stays in your browser."
//                         below the questions; an option without a note then shows "No right answer; this just
//                         shows where you start." Every answered question gets a "Clear answer" button.
//   sources  HTML for the "Sources and credits" section at the end of the module
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
            title: "Declaring GenAI use",
            cluster: null,
            outcome: "After this module, you can write clear GenAI-use guidance for one of your own written assignments, including how students declare their GenAI use, and you leave with a one-page GenAI-use guide for that assignment.",
            minutes: 60,
            extraMinutes: 20,
            status: "available",
            blocks: [
                {
                    id: "intro",
                    minutes: null,
                    html: '<p><span class="to-be-confirmed">Intro content to be confirmed.</span></p>',
                    quiz: {
                        title: "Self-check",
                        scored: false,
                        questions: [
                            {
                                id: "m1-stand",
                                prompt: "For your next written assignment, what are students told about GenAI?",
                                options: [
                                    {
                                        text: "Nothing.",
                                        note: "A good starting point might be to look up your institution’s rules, see **Try it**. Students need clear guidelines on each assignment about how GenAI can and cannot be used (Heaps, 2024)."
                                    },
                                    {
                                        text: "A general course or institution rule.",
                                        note: "A general rule is a good starting point, see **Try it**. Food for thought: does it tell students what is acceptable in this particular assignment? Students need clear guidelines on each assignment (Heaps, 2024)."
                                    },
                                    {
                                        text: "Rules for this assignment, but no way to declare use.",
                                        note: "Food for thought: might there be a benefit in instructing students on declaring GenAI use? For whom? Students are often reluctant to declare use, even when it is allowed (Gonsalves, 2024, cited in Perkins et al., 2025), so a declaration only works if they know exactly what to write, and where. See **Make it**."
                                    },
                                    {
                                        text: "Rules for this assignment and a declaration.",
                                        note: "You are already most of the way there. Food for thought: could a student tell from your declaration exactly what to write? In **Try it**, compare it with the checklist: the tool, what it was used for, the prompts, which part of the work, and the date (UQ Library, 2026)."
                                    },
                                    {
                                        text: "Something else? What and why?",
                                        note: "Food for thought: what is behind your answer, and who set the rules? Letting students draft acceptable and unacceptable uses themselves has led to more dialogue about GenAI during a course (Heaps, 2024). See the optional activity in **Plan it**."
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    id: "see",
                    minutes: null,
                    html: '<p><span class="to-be-confirmed">See it content to be confirmed.</span></p>',
                    quiz: {
                        title: "Self-check",
                        scored: true,
                        questions: [
                            {
                                id: "m1-sc1",
                                prompt: "A take-home essay is set at Level 1, No AI. What does the revised scale say?",
                                options: [
                                    { text: "Fine, if students sign a declaration." },
                                    { text: "Level 1 needs a supervised, controlled setting, so another level is likely more honest for take-home work." },
                                    { text: "Fine, if an AI detector is used." }
                                ],
                                correct: 1,
                                explanation: "Declaring a task AI-free without controlling the setting has proved untenable, and AI detectors are unreliable (Perkins et al., 2025)."
                            },
                            {
                                id: "m1-sc2",
                                prompt: "The DkIT guide allows feedback on writing but not generating the text. Does that fit one level?",
                                options: [
                                    { text: "No, so the guide is wrong." },
                                    { text: "It mixes Level 2 with part of Level 3, which is fine: the lists set the line." },
                                    { text: "It is Level 4." }
                                ],
                                correct: 1,
                                explanation: "The scale is a starting point, and the lists make it specific."
                            },
                            {
                                id: "m1-sc3",
                                prompt: "Why did the scale's authors drop the old rule that students attach their AI-free original work in an appendix?",
                                options: [
                                    { text: "Students found it too much work." },
                                    { text: "There is no reliable way to verify such work." },
                                    { text: "It conflicted with copyright." }
                                ],
                                correct: 1,
                                explanation: "There is no reliable way to verify such work (Perkins et al., 2025)."
                            }
                        ]
                    }
                },
                {
                    id: "try",
                    minutes: null,
                    html: '<p><span class="to-be-confirmed">Try it content to be confirmed.</span></p>'
                },
                {
                    id: "make",
                    minutes: null,
                    html: '<p><span class="to-be-confirmed">Make it content to be confirmed.</span></p>'
                },
                {
                    id: "plan",
                    minutes: null,
                    html: '<p><span class="to-be-confirmed">Plan it content to be confirmed.</span></p>'
                }
            ],
            sources: '<p><span class="to-be-confirmed">Sources and credits to be confirmed.</span></p>'
        },
        {
            id: "mcqs-with-genai",
            number: 2,
            title: "MCQs with GenAI",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            extraMinutes: 20,
            status: "soon"
        },
        {
            id: "feedback-with-genai",
            number: 3,
            title: "Feedback with GenAI",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            extraMinutes: 20,
            status: "soon"
        },
        {
            id: "rubrics-with-genai",
            number: 4,
            title: "Rubrics with GenAI",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            extraMinutes: 20,
            status: "soon"
        }
    ]
};

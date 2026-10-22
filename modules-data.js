// The list of modules shown on modules.html and module.html?m=<id>.
//
// To add a module, copy one of the objects in "modules" below and change it:
//   id       short, unique, lower-case with hyphens; used in the page link and for progress
//   number   the number shown on the card ("Module 3"); also sets the order
//   title    the module title
//   cluster  a group heading to list the module under, or null for none
//   outcome  one sentence on what trainees will be able to do afterwards
//   minutes  approximate length (60 shows as "About 1 hour")
//   status   "soon" (shown as "Coming soon", not linked) or "available"
//   blocks   content for each block, by block id (see below); blocks left out show a placeholder
//              id       one of the block ids defined at the top
//              minutes  approximate time for the block, or null if not decided
//              html     the block content: headings (h3), paragraphs, lists, links,
//                       and callouts written as <div class="callout">...</div>
//              quiz     reserved for self-check questions; not shown yet
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
            outcome: "To be confirmed",
            minutes: 60,
            status: "available",
            blocks: [
                {
                    id: "intro",
                    minutes: null,
                    html: '<p><span class="to-be-confirmed">Intro content to be confirmed.</span></p>'
                },
                {
                    id: "see",
                    minutes: null,
                    html: '<p><span class="to-be-confirmed">See it content to be confirmed.</span></p>'
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
            status: "soon"
        },
        {
            id: "feedback-with-genai",
            number: 3,
            title: "Feedback with GenAI",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            status: "soon"
        },
        {
            id: "rubrics-with-genai",
            number: 4,
            title: "Rubrics with GenAI",
            cluster: null,
            outcome: "To be confirmed",
            minutes: 60,
            status: "soon"
        }
    ]
};

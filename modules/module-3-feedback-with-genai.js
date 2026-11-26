(function () {
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
        '<div class="bf-note bf-left bf-change bf-r3"><p class="bf-note-title">Instructions: Paste</p><p>Your assignment and its criteria, each with a “met when”.</p><p><strong>The only part you change for each assignment.</strong></p><span class="bf-arrow" aria-hidden="true"></span></div>' +
        '<div class="bf-win bf-r4"><p class="bf-label">Skills <span class="bf-add" aria-hidden="true">+ Add</span></p>' +
        '<div class="bf-field bf-field-same"><strong>SKILL.md</strong> · criteria-feedback</div></div>' +
        '<div class="bf-note bf-right bf-same bf-r4"><p class="bf-note-title">Skills: Upload once</p><p>Add, then upload the SKILL.md from Make it.</p><p><strong>The same file for every assignment.</strong></p><span class="bf-arrow" aria-hidden="true"></span></div>' +
        '<div class="bf-win bf-bottom bf-r5"><span class="bf-create" aria-hidden="true">Create</span></div>' +
        '<div class="bf-note bf-right bf-grey bf-r5"><p>Then share the link with your students.</p><span class="bf-arrow" aria-hidden="true"></span></div>' +
        '</div>' +
        '<figcaption>Where the two parts go in an agent builder (simplified; your tool may look a little different). You change the instructions for each assignment; the skill stays the same.</figcaption>' +
        '</figure>';

    window.HEGENAI_MODULES.modules.push({
        id: "feedback-with-genai",
        number: 3,
        title: "Making a GenAI Teaching Assistant for Formative Feedback",
        cluster: null,
        outcome: "After this module, you can write assessment criteria in a way so a GenAI tool can check a drafted assignment against them, and you leave with a feedback agent your students can use to get feedback on their draft.",
        outcomePreview: { resource: "finished-agent", caption: "An example of the feedback agent you leave with. Select to open it." },
        audience: "Higher education educators who set written assignments with stated criteria. No prior GenAI experience needed.",
        needs: "Preferably Microsoft Copilot with a work or school account or a paid plan. Without it, you can still follow the module, but you cannot build or share an agent. Also, either the criteria of an assignment you set or the sample case provided.",
        minutes: 60,
        extraMinutes: 15,
        status: "available",
        blocks: [
            {
                id: "intro",
                minutes: 10,
                html: '<p>In this block you see the problem the module addresses, learn four terms, and choose the assignment you will work on.</p>' +
                        '<h3>The problem</h3>' +
                        '<p>Think of the last written assignment you set. When did students first find out how their work measured up to your criteria?</p>' +
                        '<p>If it was after grading, it was likely too late for them to act on it. Before the deadline, you or teaching assistants may be able to tell students where their drafts stand in terms of the criteria, but not for a large class.</p>' +
                        '<p>Students can also put their drafts into a GenAI tool like ChatGPT or Microsoft Copilot and ask for feedback. But the chatbot does not necessarily have your criteria, so its feedback may be generic.</p>' +
                        '<div class="callout">' +
                        '<h3 class="callout-title">Four terms</h3>' +
                        '<p><strong>Formative feedback:</strong> Feedback students get while they can still improve their work, for example on a draft before the deadline.</p>' +
                        '<p><strong>Agent:</strong> A GenAI assistant you set up once and can share through a link for others to use. It has instructions and a skill, which give context and define how the agent answers.</p>' +
                        '<p><strong>Instructions:</strong> The text you give the agent, here, based on your assignment and its criteria. You change the instructions for each assignment.</p>' +
                        '<p><strong>Skill:</strong> A file (named SKILL.md) that tells the agent how to deliver feedback. It is the same for every assignment.</p>' +
                        '</div>' +
                        '<h3>What you make</h3>' +
                        '<p>You make a feedback agent for one of your assignments, or for the sample case if you do not have an assignment of your own. For each criterion of the assignment, the feedback agent tells the student whether the draft meets it, quotes the line it based that on, and suggests a next step. It gives no grade and writes nothing for the student.</p>' +
                        '<p>This module does not teach you how to implement an agent in different AI tools. Instead, it focuses on what goes into the agent and how it can deliver value for your students. You write the instructions from your own criteria in <strong>Try it</strong>, and you download the skill in <strong>Make it</strong>.</p>' +
                        '<p>At the time of writing, the possibility to create a sharable agent like the one in this module is the most accessible through Microsoft Copilot (although not for personal free accounts). Another similar option is to create a so-called Plugin in ChatGPT.</p>' +
                        '<h3>One example throughout this module</h3>' +
                        '<p>The module uses an invented example of an assignment, the <strong>sample case</strong>: A report set in a second-year business course, with a strong and a weak student draft. If you have no assignment of your own, you also use it in <strong>Try it</strong> and <strong>Make it</strong>.</p>' +
                        '<p><button type="button" class="link-button" data-open-resource="sample-case">Open the sample case</button></p>',
                quiz: {
                    title: "Where you stand",
                    intro: "This question can help you determine how best to approach the module. Optional.",
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
                                    note: "Use the sample case throughout the module. It comes with two invented student drafts, one weak and one strong, to test on.",
                                    action: { label: "Open the sample case", resource: "sample-case" }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: "see",
                minutes: 10,
                html: '<p>In this block, you see how a feedback agent is set up and tested for the sample case, in four steps. Make each criterion checkable, set up the instructions and a skill, run a draft through the agent, and check the feedback.</p>' +
                    M3_BUILDER_FIGURE +
                    '<ol class="step-list" role="list">' +
                    '<li>' +
                    '<p><strong>Make each criterion checkable.</strong> Criteria in assignment descriptions are written for students and graders, for example “well argued”. But a GenAI tool does not know what “well argued” looks like in a text. Therefore, each criterion gets a “met when”, as illustrated below.</p>' +
                    '<div class="criteria-compare">' +
                    '<div class="criteria-head" aria-hidden="true"><span>Checkable criteria: What the agent gets</span><span>Original criteria: What students and graders see</span></div>' +
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
                    '<p>In the checkable versions on the left, the highlighted parts can be checked by the agent. In the original criteria on the right, the struck-through words cannot. What makes the highlighted parts checkable?</p>' +
                    '<details class="dropdown">' +
                    '<summary>The answer: Click to expand</summary>' +
                    '<div class="dropdown-body">' +
                    '<p>The highlighted criteria are made tangible, such as by counting instances or looking for sources next to claims. Words like “clearly” and “relevant” leave room for the reader (or GenAI tool) to decide what counts.</p>' +
                    '</div>' +
                    '</details>' +
                    '<p>The original wording still counts. Keep it in the assignment description, and use the checkable versions only for the agent. You judge the original qualities when you grade, because the agent cannot see them in a draft.</p>' +
                    '</li>' +
                    '<li>' +
                    '<p><strong>Set up the agent: Instructions and a skill.</strong> The instructions hold the assignment and the checkable criteria. The underlined parts below are what you would change for your own assignment. The skill stays as it is.</p>' +
                    '<div data-text="see-instructions"></div>' +
                    '<div data-text="see-skill"></div>' +
                    '</li>' +
                    '<li>' +
                    '<p><strong>Run the agent on a weak assignment draft.</strong> Imagine a student opens the agent and pastes their drafted assignment. Below is the feedback they would get. You can open the weak student draft and judge it yourself against the criteria, then read the agent’s feedback.</p>' +
                    '<p><button type="button" class="link-button" data-open-resource="test-weak">Open the weak student draft</button></p>' +
                    '<div data-text="see-draft"></div>' +
                    '</li>' +
                    '<li>' +
                    '<p><strong>Check the feedback.</strong> Before students get the agent, you judge its performance using your own judgement. Here is how the feedback above was checked:</p>' +
                    '<ul class="check-list" role="list">' +
                    '<li><span class="check-label check-label-ok">OK</span> <span><strong>Each verdict quotes the draft.</strong> The student can see what the verdict is based on.</span></li>' +
                    '<li><span class="check-label check-label-ok">OK</span> <span><strong>The verdicts are not overly kind.</strong> The draft reads fluently, but no criterion is met, because each “met when” says what is missing.</span></li>' +
                    '<li><span class="check-label check-label-ok">OK</span> <span><strong>No grade and no rewritten text.</strong> Each next step tells the student what to do, it doesn’t do it for them.</span></li>' +
                    '</ul>' +
                    '<p>Here, every check holds. When one does not, <a href="#block-make">Make it</a> shows what to change.</p>' +
                    '</li>' +
                    '</ol>' +
                    '<h3>Why it works</h3>' +
                    '<p>Feedback is the most useful when it makes clear what good work looks like and reaches students while they can still act on it (Nicol &amp; Macfarlane-Dick, 2006), and when it says where to go next, not only how well the work did (Hattie &amp; Timperley, 2007). The “met when” parts carry your standard into the agent, and testing on a weak and a strong draft shows whether the tool keeps it.</p>',
                quiz: {
                    title: "Self-check",
                    intro: "See if you can find the likely reason for an agent letting a draft pass too easily. (Your answer is only visible to you.)",
                    scored: true,
                    questions: [
                        {
                            id: "m3-see1",
                            prompt: "A student gives a weak draft to the agent, and the feedback says every criterion is met. What is the most likely cause?",
                            options: [
                                {
                                    text: "The student has found a way to trick the tool.",
                                    note: "The student only pasted a draft into the agent. The way the feedback is delivered depends on the set-up, so that is the first place to look. See step 1 in **See it**."
                                },
                                {
                                    text: "The criteria have no “met when”, so the tool falls back on its own judgement, which may be lenient.",
                                },
                                {
                                    text: "The GenAI tool itself is broken or has an error.",
                                    note: "A tool that gives feedback at all is not broken. The cause is more likely to lie in what you gave it. **Make it** shows what to change."
                                }
                            ],
                            correct: 1,
                            explanation: "Without a “met when” formulation, the tool has nothing specific to check, and text that reads fluently tends to pass. See step 1 in **See it**."
                        }
                    ]
                }
            },
            {
                id: "try",
                minutes: 15,
                html: '<p>In this block, you fill in the parts of the agent instructions that are specific to your assignment, using an assignment you set for your students or the sample case. You start by rewriting the assignment criteria (use three to five) so that they are checkable.</p>' +
                    '<p><button type="button" class="link-button" data-open-resource="sample-case">Open the sample case</button></p>' +
                    '<div class="callout">' +
                    '<h3 class="callout-title">What to aim for</h3>' +
                    '<ul>' +
                    '<li>Have 3-5 criteria, one per line, each with “Met when:”.</li>' +
                    '<li>Each criterion can be judged from the student’s text alone.</li>' +
                    '<li>Each criterion keeps the name students already know.</li>' +
                    '<li>Optional: Add a line such as “Typical mistake: claims with no source.” It helps the agent spot it.</li>' +
                    '</ul>' +
                    '</div>' +
                    '<details class="dropdown">' +
                    '<summary>Save time: Let GenAI change the criteria to have “met when” in them</summary>' +
                    '<div class="dropdown-body">' +
                    '<p>Copy this prompt into your approved GenAI tool, with your criteria where shown. Check the result against "What to aim for" before you put it in the form below. Paste criteria only, never student work.</p>' +
                    '<div data-text="try-starter"></div>' +
                    '</div>' +
                    '</details>' +
                    '<div data-form></div>' +
                    '<p><strong>Test each “met when”.</strong> Could a reader decide from the student’s text alone whether it is met? If not, make it something visible or countable.</p>' +
                    '<details class="dropdown">' +
                    '<summary>Sample case: Compare with our checkable version</summary>' +
                    '<div class="dropdown-body">' +
                    '<p>Yours does not need to match. Check that each of yours says what the draft must show, naming things a reader can see or count.</p>' +
                    '<ol>' +
                    '<li>Problem analysis. Met when: the problem is stated in one or two sentences, and at least two course concepts are applied to it using facts about the organisation.</li>' +
                    '<li>Justified recommendation. Met when: the recommendation follows from the analysis, and each claim for it is backed by a cited source or data about the organisation.</li>' +
                    '<li>Clear for a professional reader. Met when: each section opens by stating its purpose, and the conclusion answers the research question set in the introduction.</li>' +
                    '</ol>' +
                    '</div>' +
                    '</details>',
                quiz: {
                    title: "Self-check",
                    intro: "See if you can tell a checkable criterion from one that is not. (Your answer is only visible to you.)",
                    scored: true,
                    questions: [
                        {
                            id: "m3-try1",
                            prompt: "Which criterion can a GenAI tool judge from the student’s text alone?",
                            options: [
                                {
                                    text: "Good research. Met when: the student has read widely about the organisation.",
                                    note: "How widely the student read cannot be seen in the text. See step 1 in **See it**."
                                },
                                {
                                    text: "Justified recommendation. Met when: each claim for the recommendation is backed by a cited source or data about the organisation.",
                                    note: "This can be checked in the text: each claim either has a source or data, or not."
                                },
                                {
                                    text: "Effort. Met when: the student has worked hard on the report.",
                                    note: "Effort cannot be seen in the text, and it is not what the report is assessed on. See step 1 in **See it**."
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
                    readyLine: { what: "instructions", plural: true, block: "make", linkLabel: "Make it" },
                    // practiceFill: true,   switched off: would add a "Use the sample case" button that fills the form from the `practice` values below
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
                            guidance: "Start from the criteria in your assignment description or rubric. Choose 3-5, one per line. Write each as a name, then “Met when:”, and what the draft must show.",
                            inputs: [
                                { key: "criteria", label: "Criteria", type: "text", rows: 6,
                                  practice: "1. Problem analysis. The problem is clearly identified and analysed using relevant course concepts.\n2. Recommendation. The recommendation is well argued and supported by evidence.\n3. Writing and structure. The report is clearly written and well structured for a professional reader." }
                            ]
                        },
                        {
                            title: "What students paste",
                            guidance: "Say whether students paste their whole draft or only some sections, for example one section at a time.",
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
                minutes: 20,
                html: '<p>In this block, you set up your feedback agent, test it on a weak and a strong draft, fix it if needed, and get a link that can be shared.</p>' +
                    '<ol class="step-list" role="list">' +
                    '<li>' +
                    '<p><strong>Download the skill.</strong> It is the same for every assignment, so you download it once and upload it to every feedback agent you make. Keep the file name SKILL.md.</p>' +
                    '<div data-text="make-skill"></div>' +
                    '</li>' +
                    '<li>' +
                    '<p><strong>Copy the instructions.</strong> They hold your information from <a href="#block-try">Try it</a>. This is the only part you would change for another assignment.</p>' +
                    '<div data-text="make-instructions"></div>' +
                    '</li>' +
                    '<li><p><strong>Create the agent</strong> in your approved GenAI tool. At the time of writing, in Microsoft Copilot (not available for personal free accounts), you find Agents in the left sidebar and choose New agent. If it offers to build one for you, skip that. You then see where to enter the name and instructions and where to upload a skill file.</p>' +
                    '<ul>' +
                    '<li><strong>Name:</strong> Give it a name students will recognise, for example “Feedback on the case study report”.</li>' +
                    '<li><strong>Instructions:</strong> Paste the text from step 2.</li>' +
                    '<li><strong>Skill:</strong> Upload SKILL.md. If your tool has no place for a skill file, paste the skill text under the instructions instead.</li>' +
                    '</ul>' +
                    '<p><strong>No agent builder?</strong> Start a new conversation in any GenAI tool you are allowed to use. Paste the instructions and then the skill text into your first message, and paste a draft as your second message. You can test the feedback this way, but you cannot share it.</p>' +
                    M3_BUILDER_FIGURE + '</li>' +
                    '<li><p><strong>Test it.</strong> Open a new conversation with your agent and paste in the weak draft. Do this twice, in a new conversation each time, to see whether the verdicts stay the same. Then paste the strong draft in a third new conversation.</p>' +
                    '<p>Use drafts you wrote yourself or the sample case drafts, never real student work with names or other personal data.</p>' +
                    '<p><button type="button" class="link-button" data-open-resource="test-weak">Open the weak draft</button> · <button type="button" class="link-button" data-open-resource="test-strong">Open the strong draft</button></p>' +
                    '<details class="dropdown">' +
                    '<summary>No drafts of your own: Let GenAI write test drafts</summary>' +
                    '<div class="dropdown-body">' +
                    '<p>Copy this prompt into your approved GenAI tool. Read both drafts before you use them. The weak one should clearly miss the criteria, and the strong one should clearly meet them.</p>' +
                    '<div data-text="make-drafts"></div>' +
                    '</div>' +
                    '</details>' +
                    '</li>' +
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
                    '<summary>If a tick is missing: What to change</summary>' +
                    '<div class="dropdown-body">' +
                    '<p>Most fixes are in your criteria. Edit them in <a href="#block-try">Try it</a>, copy the instructions again, paste them over the old ones, and rerun the same drafts. The skill stays as it is.</p>' +
                    '<ul class="fix-list" role="list">' +
                    '<li><p class="fix-check">1. A verdict has no quote, or the format is not followed</p><p><strong>Likely cause:</strong> The agent does not use the skill.</p><p><strong>Change:</strong> Check that SKILL.md is uploaded as the agent’s skill. If it still is not used, paste the skill text under the instructions.</p></li>' +
                    '<li><p class="fix-check">2. The weak draft gets “Met”</p><p><strong>Likely cause:</strong> The “met when” is too vague, so fluent text passes.</p><p><strong>Change:</strong> Make it something you can see or count (“at least two…”, “each claim…”), and add “Typical mistake: …”.</p></li>' +
                    '<li><p class="fix-check">3. The two runs give different verdicts</p><p><strong>Likely cause:</strong> The criterion checks two things at once, or a word in it can be read two ways.</p><p><strong>Change:</strong> Split it into two criteria, or replace the vague word.</p></li>' +
                    '<li><p class="fix-check">4. It gives a grade or rewrites text</p><p><strong>Likely cause:</strong> The rule is lost in a long text.</p><p><strong>Change:</strong> Make sure the first line of the instructions is kept as it is, and shorten long criteria.</p></li>' +
                    '<li><p class="fix-check">5. A next step is vague, such as “improve your analysis”</p><p><strong>Likely cause:</strong> The “met when” does not say what the draft must show.</p><p><strong>Change:</strong> Rewrite the “met when”. The next step follows from it.</p></li>' +
                    '</ul>' +
                    '<div class="callout">' +
                    '<h3 class="callout-title">Still failing after two rounds?</h3>' +
                    '<p>Take that criterion out of the instructions and tell students to check it themselves or ask you. Share the agent for the criteria that pass. If none pass, do not share it this term. Either way, note what happened in the practice log. It is a useful finding too.</p>' +
                    '</div>' +
                    '</div>' +
                    '</details>' +
                    '</li>' +
                    '<li><p><strong>Your agent is ready.</strong> Keep it private for now. In <strong>Plan it</strong>, you set up sharing and choose when students get it.</p></li>' +
                    '</ol>'
            },
            {
                id: "plan",
                minutes: 5,
                html: '<p>In this block, you plan how to share your feedback agent with students. You do not need to share it to finish this module.</p>' +
                    '<ol class="step-list" role="list">' +
                    '<li>' +
                    '<p><strong>Check the rules.</strong> Two sets of rules must allow it:</p>' +
                    '<ul>' +
                    '<li><strong>Your course and institution:</strong> The GenAI rules must allow GenAI feedback on drafts. If they do not, change the rules or your plan first.</li>' +
                    '<li><strong>Your Copilot set-up:</strong> Your IT department most likely decides whether teachers can share agents and whether students can use them. Ask: “Can I share an agent I built in Copilot with the students on my course?” Students should sign in with their institution account, not a personal one.</li>' +
                    '</ul>' +
                    '</li>' +
                    '<li><p><strong>Set up sharing.</strong> At the time of writing, you do this in your agent’s sharing settings in Copilot. Choose specific people or groups, not “anyone in your organisation”. Add a colleague first, and your students only after testing. People you share with can use the agent but not edit it.</p></li>' +
                    '<li>' +
                    '<p><strong>Test it as a student would.</strong> Ask your colleague to open the link and paste in a draft. Check that the link opens, that they can use the agent, and that they cannot edit it. Then ask them to try what students will try:</p>' +
                    '<ul>' +
                    '<li>Ask for a grade.</li>' +
                    '<li>Ask it to rewrite a paragraph.</li>' +
                    '<li>Paste in only one section of a draft.</li>' +
                    '</ul>' +
                    '<p>The agent should give no grade, write no text for the student, and say “Cannot judge” for criteria the pasted section does not cover. If it does not, fix the instructions in <a href="#block-make">Make it</a>.</p>' +
                    '</li>' +
                    '<li>' +
                    '<p><strong>Choose when and how to introduce it.</strong> Give students the agent while they work on an assignment, for example two weeks before the deadline. Put the link on the course page with one line: “Open this feedback agent, then paste your draft.” Tell students four things:</p>' +
                    '<ul>' +
                    '<li>What the agent is for.</li>' +
                    '<li>That its feedback can be wrong.</li>' +
                    '<li>That you grade, not the agent.</li>' +
                    '<li>That they must not paste in other people’s work or personal data.</li>' +
                    '</ul>' +
                    '<p>Also decide how you will find out whether they used it, for example, one question in the hand-in.</p>' +
                    '</li>' +
                    '<li>' +
                    '<p><strong>Fill in the practice log.</strong> This is optional if you want to practise and prepare to share the agent with students. The practice log guides you through three steps: Use it, Check it, Reflect on it. It should take 10-20 minutes to fill out.</p>' +
                    '<p><a class="pill-button" href="downloads/practice-log-module-3.docx" download>Download the practice log (Word)</a></p>' +
                    '</li>' +
                    '</ol>' +
                    '<details class="dropdown">' +
                    '<summary>Want a certificate of completion?</summary>' +
                    '<div class="dropdown-body">' +
                    '<p>If you take part in a facilitated session, opt in through the short survey after the session. Hand in your practice log within 2 weeks, and you receive a certificate of completion by email. It shows that you have applied the method in your own work setting, not only completed the module.</p>' +
                    '</div>' +
                    '</details>' +
                    '<details class="dropdown">' +
                    '<summary>Practice log criteria</summary>' +
                    '<div class="dropdown-body">' +
                    '<p>These are the criteria for the certificate of completion: each part of the practice log is met when its criterion holds. If you are not in a facilitated session with the option of a certificate, use them to check your own log.</p>' +
                    '<ol>' +
                    '<li><strong>Use it:</strong> The assignment, who tried it and the draft are stated, and your instructions and one example of the feedback are pasted in the box or attached at the end.</li>' +
                    '<li><strong>Check it:</strong> One criterion is named with the agent’s verdict, and you say whether you agree and why. Disagreeing with the agent is a useful finding.</li>' +
                    '<li><strong>Reflect on it:</strong> One thing is named, with a change for next time, and you have answered yes, not yet or no, with a reason. Naming a setback does not count against you.</li>' +
                    '</ol>' +
                    '</div>' +
                    '</details>' +
                    '<h3>Example: A course feedback coach at DTU</h3>' +
                    '<p>At the Technical University of Denmark (DTU), a feedback agent can look like this on the university’s own GenAI platform, CampusAI. DTU calls it a feedback coach, and students open it with their DTU login. The video is 1 min 40 s, has no sound, and uses an invented course and student draft. You do not need it for this module.</p>' +
                    '<video class="module-video" controls preload="metadata" src="assets/module-3/dtu-feedback-coach.mp4">' +
                    '<p>Your browser cannot play this video. <a href="assets/module-3/dtu-feedback-coach.mp4">Download the video</a>.</p>' +
                    '</video>' +
                    '<details class="dropdown">' +
                    '<summary>Text version of the video</summary>' +
                    '<div class="dropdown-body">' +
                    '<ol>' +
                    '<li><strong>Teacher:</strong> Opens the Coach Builder and names the course.</li>' +
                    '<li>Pastes how they assess. Here it is a transcript of them talking about what they look for in reports and what they ask in the oral exam.</li>' +
                    '<li>Signs in with the university account. The AI turns the text into five report criteria and three oral-exam questions.</li>' +
                    '<li>Reviews the criteria, adds course readings the coach can point students to, and downloads the coach to share on the course page.</li>' +
                    '<li><strong>Student:</strong> Opens the coach, signs in with their university account, and pastes a draft.</li>' +
                    '<li>Gets feedback on each criterion, with whether it is present, partly there or missing, where in the draft, what is weak, a question to think about, and what to reread. No grade, and no rewritten text.</li>' +
                    '</ol>' +
                    '<p>Why your own AI infrastructure helps: Students sign in with their university account, so they need no private chatbot accounts. Text goes only to the university’s own AI platform. Each coach is built from the teacher’s own criteria, which the teacher reviews before students get it.</p>' +
                    '</div>' +
                    '</details>'
            }
        ],
        resources: [
            {
                id: "sample-case",
                group: "Worked example",
                title: "Sample case",
                html: '<p class="resource-note">(An invented assignment description used as a worked example throughout this module. In Try it, you make its criteria, as written here, checkable.)</p>' +
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
                html: '<p class="resource-note">(An invented draft of a student case study report, based on the sample case. The citations are also made up. Used in Make it, as a weak draft to test on.)</p>' +
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
                html: '<p class="resource-note">(An invented draft of a student case study report, based on the sample case. The citations are also made up. Used in Make it, as a strong draft to test on.)</p>' +
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
                id: "make-drafts",
                kind: "live-prompt",
                label: "Prompt to write test drafts",
                copyLabel: "Copy prompt",
                template: [
                    "Write two short drafts of the assignment below, about 250 words each, to test a feedback tool.",
                    "Draft 1 is weak. It reads fluently but meets none of the criteria.",
                    "Draft 2 is strong. It meets all of the criteria.",
                    "Do not use real people or real student work.",
                    "# Assignment",
                    "{{name|[assignment name]}}. {{description|[description]}}",
                    "# Criteria",
                    "{{criteria|[criteria, one per line, each with Met when]}}"
                ]
            },
            {
                id: "see-draft",
                kind: "draft",
                label: "Microsoft Copilot, Work account (Basic), November 2026",
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
    });
}());

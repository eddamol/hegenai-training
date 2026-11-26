(function () {
    window.HEGENAI_MODULES.modules.push({
        id: "declaring-genai-use",
        number: 1,
        title: "Making an Assignment-Level GenAI Use Policy and Declaration Guide",
        cluster: null,
        outcome: "After this module, you can set a GenAI use policy and a declaration guide for a written assignment, and you leave with a completed policy and guide for a given assignment.",
        outcomePreview: { resource: "finished-guide", caption: "An example of the policy and declaration guide you leave with. Select to open it." },
        audience: "Higher education educators who set written assignments. No prior GenAI experience needed.",
        needs: "Access to a GenAI tool. This module uses Microsoft Copilot as an example, and the free version is enough. Also, either an assignment you set or the practice case provided in the module.",
        minutes: 55,
        extraMinutes: 10,
        status: "available",
        blocks: [
            {
                id: "intro",
                minutes: 10,
                html: '<h3>The problem</h3>' +
                    '<p>Without guidance for the assignment, students have to guess what GenAI use is acceptable. They need clear guidelines on each assignment (Heaps, 2024).</p>' +
                    '<p>Even when use is allowed, students are often reluctant to declare it (Gonsalves, 2025).</p>' +
                    '<div class="callout">' +
                    '<h3 class="callout-title">Three terms</h3>' +
                    '<p><dfn>GenAI</dfn> (generative artificial intelligence) means tools such as ChatGPT or Microsoft Copilot that write text from your instructions, called a prompt.</p>' +
                    '<p>A <dfn>declaration</dfn> is a short statement in which a student says how they used GenAI.</p>' +
                    '<p><dfn>Intended learning outcomes</dfn> (LOs) of an assignment are statements that describe what a student should know, understand, or be able to do after the assignment. They describe measurable student results rather than what is assigned, and can be a list of statements.</p>' +
                    '</div>',
                quiz: {
                    title: "Where you stand",
                    intro: "This question can help you determine how best to approach the module. Optional.",
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
                                    text: "The practice case in this module.",
                                    note: "Use the practice case throughout the module. You can also use it for the practice log if you choose to complete that.",
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
                    '<li><strong>Level of GenAI use.</strong> The first part specifies where the assignment lies on the AI Assessment Scale, adapted directly from Perkins et al. (2025). The scale has five levels, ranging from No AI to AI Exploration. In choosing the level of AI use for an assignment, make sure that AI is only allowed for tasks that do not directly translate into the learning outcomes of the assignment. AI use that falls outside the level an assignment is given is not allowed for that assignment, and is further specified with a list of dos and don’ts in the policy.</p>' +
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
                    '<li><strong>A list of dos and don’ts.</strong> The second part has two lists; for what students may and may not do with GenAI, in the terms of the assignment. The lists are titled “GenAI for…” and “GenAI is not for…”. This two-list format is used in practice, for example in a master’s programme at Dundalk Institute of Technology (Bree et al., 2026) and in course policies that list acceptable and unacceptable uses (Heaps, 2024).</li>' +
                    '<li><strong>The declaration guide and an example.</strong> The third part says what students should state about their GenAI use, and where. It ends with an example declaration.</li>' +
                    '</ol>' +
                    '<p class="section-divider">Now, a four-step approach to making a policy and declaration guide for an assignment, starting with a structured prompt to an AI tool.</p>' +
                    '<ol class="step-list" role="list">' +
                    '<li>' +
                    '<p><strong>Specify the level of GenAI use.</strong> Given the learning outcomes (LOs) in the sample case, GenAI may help students plan, but not do the actual tasks the learning outcomes require. So, it is at Level 2, AI Planning.</p>' +
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
                    intro: "Check if you can identify a proper AI use level for another assignment. Optional.",
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
                    readyLine: { block: "make", linkLabel: "Make it", optionalKeys: ["rules"] },
                    fields: [
                        {
                            title: "The assignment",
                            guidance: "The name of the assignment and a short description.",
                            inputs: [
                                { key: "name", label: "Name", type: "line",
                                  practice: "Pendulum lab report" },
                                { key: "description", label: "Description", type: "text", rows: 3,
                                  practice: "A 1,500-word individual lab report in a first-year bachelor's physics course. Students measure the acceleration due to gravity with a simple pendulum, analyse their data, and discuss the result." }
                            ]
                        },
                        {
                            title: "Learning outcomes",
                            guidance: "Copy the learning outcomes (LOs) as students would see them in the assignment description.",
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
                    '<li><p><strong>Paste your prompt into a new conversation</strong> in a GenAI tool of your choice, for example Microsoft Copilot (Work/School account, or paid).</p></li>' +
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
                html: '<p>In this block, you plan how students get your policy and declaration guide, and start the practice log.</p>' +
                    '<ol class="step-list" role="list">' +
                    '<li><p><strong>Check your policy and guide against existing rules.</strong> Before you hand out the AI policy and declaration guide, check it against your institution’s and programme’s GenAI rules, and fix anything that conflicts (Heaps, 2024).</p></li>' +
                    '<li><p><strong>Hand out the guide.</strong> It is ideal to raise GenAI in the first week of the course, and again when you set the assignment (Heaps, 2024). No assignment coming up? Give it to a peer or colleague, and ask them to write a declaration for an imagined use. That way, you test the guide before students get it.</p></li>' +
                    '<li><p><strong>Fill in the practice log.</strong> This is optional if you want to practise and prepare to share the policy and guide with students. The practice log guides you through three steps: Use it, Check it, Reflect on it. It should take about 10 minutes to fill out.</p>' +
                    '<p><a class="pill-button" href="downloads/practice-log-module-1.docx" download>Download the practice log (Word)</a></p>' +
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
                    '<li><strong>Use it:</strong> Who got the guide and which rules (if any) you checked are stated, and the guide is attached.</li>' +
                    '<li><strong>Check it:</strong> At least one declaration is described, with whether it was clear enough and why.</li>' +
                    '<li><strong>Reflect on it:</strong> One thing is named, with a change for next time. Naming a setback does not count against you.</li>' +
                    '</ol>' +
                    '</div>' +
                    '</details>'
            }
        ],
        resources: [
            {
                id: "sample-case",
                group: "Worked example",
                title: "Sample case",
                html: '<p class="resource-note">(An invented assignment description used as a worked example throughout this module.)</p>' +
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
                    '<li>GenAI use: See the GenAI guide for this assignment.</li>' +
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
                    '<p>Not in the description, but known to the teacher:</p>' +
                    '<ul>' +
                    '<li><strong>Institution rules:</strong> GenAI may be used if the course guide says how, and all use must be declared.</li>' +
                    '<li><strong>Where students declare:</strong> in an appendix.</li>' +
                    '</ul>'
            },
            {
                id: "finished-guide",
                group: "Worked example",
                title: "Finished sample guide",
                html: '<p class="resource-note">(Based on the sample case, the result of shown examples.)</p>' +
                    '<div class="guide-page">' +
                    '<h3>GenAI in the case study report: Level 2, AI Planning</h3>' +
                    '<blockquote><p>"You may use AI for planning, idea development, and research. Your final submission should show how you have developed and refined these ideas."</p></blockquote>' +
                    '<p>Other use of GenAI for this assignment is not allowed, see further below.</p>' +
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
                html: '<p class="resource-note">(An invented assignment description you can use throughout the module and after, to practise on.)</p>' +
                    '<div class="guide-page">' +
                    '<p><strong>Physics 1: Mechanics</strong> · 1st-year BSc · 5 ECTS</p>' +
                    '<h3>Assignment 1: Pendulum lab report</h3>' +
                    '<p><strong>Weight:</strong> 20% of the final grade. <strong>Deadline:</strong> Friday, week 7, 23:59, on the course page.</p>' +
                    '<h4>Task</h4>' +
                    '<p>In the lab session, measure the acceleration due to gravity with a simple pendulum. Analyse your data, compare your result with the accepted value, and discuss it.</p>' +
                    '<h4>Requirements</h4>' +
                    '<ul>' +
                    '<li>Individual report, about 1,500 words, not counting references and appendices.</li>' +
                    '<li>Sections: Introduction, Methods, Results, Discussion, References.</li>' +
                    '<li>Hand in one PDF file.</li>' +
                    '<li>GenAI use: See the GenAI guide for this assignment.</li>' +
                    '</ul>' +
                    '<h4>Learning outcomes</h4>' +
                    '<ul>' +
                    '<li>LO1 Collect and present measurement data with uncertainties.</li>' +
                    '<li>LO2 Analyse the data and compare the result with the accepted value.</li>' +
                    '<li>LO3 Discuss sources of error and suggest improvements.</li>' +
                    '</ul>' +
                    '</div>' +
                    '<p>Not in the description, but known to the teacher:</p>' +
                    '<ul>' +
                    '<li><strong>What the teacher wants:</strong> GenAI may help students draft and edit the introduction and the method description, and give feedback on their draft. Students must check and change anything GenAI writes. They collect and analyse the data, and write the discussion, themselves.</li>' +
                    '<li><strong>Institution rules:</strong> Each assignment states the level of GenAI use allowed, and students must declare all GenAI use.</li>' +
                    '<li><strong>Where students declare:</strong> in the last section of the Methods chapter, headed “Use of GenAI”.</li>' +
                    '</ul>'
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
                label: "Microsoft Copilot, Work account (Basic), 27 October 2026",
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
            '<li>Gonsalves, C. (2025). Addressing student non-compliance in AI use declarations: Implications for academic integrity and assessment in higher education. <i>Assessment &amp; Evaluation in Higher Education, 50</i>(4), 592–606. <a href="https://doi.org/10.1080/02602938.2024.2415654">https://doi.org/10.1080/02602938.2024.2415654</a></li>' +
            '<li>Heaps, T. (2024). Setting policy and communicating expectations. In <i>Generative artificial intelligence: Practical uses in education</i> (ch. 4). Pressbooks. <a href="https://pressbooks.openedmb.ca/aiineducation/chapter/setting-policy-and-communicating-expectations/">https://pressbooks.openedmb.ca/aiineducation/chapter/setting-policy-and-communicating-expectations/</a> (CC BY 4.0)</li>' +
            '<li>Perkins, M., Roe, J., &amp; Furze, L. (2025). The AI Assessment Scale revisited: A framework for educational assessment. <i>Journal of University Teaching and Learning Practice, 22</i>(7). <a href="https://doi.org/10.53761/rrm4y757">https://doi.org/10.53761/rrm4y757</a> Preprint: <a href="https://arxiv.org/abs/2412.09029">https://arxiv.org/abs/2412.09029</a> (CC BY-NC-SA 4.0)</li>' +
            '<li>The University of Queensland Library. (2026). <i>Guide to acknowledging and referencing AI</i>. <a href="https://guides.library.uq.edu.au/referencing/acknowledging-and-referencing-ai">https://guides.library.uq.edu.au/referencing/acknowledging-and-referencing-ai</a> (CC BY-NC 4.0)</li>' +
            '</ul>'
    });
}());

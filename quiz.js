// Self-check questions for a module block. Exposes window.HEGenAIQuiz.build(moduleId, quiz, blocks),
// which returns the quiz element. Answers are saved through window.HEGenAIProgress
// and the quiz redraws from the saved answers whenever progress changes.
// All quiz text is set with textContent or text nodes, never as HTML.
(function () {
    var NO_NOTE_FALLBACK = 'No right answer; this just shows where you start.';
    var UNSCORED_LINE = 'Not scored. Your answer stays in your browser.';
    var progress = window.HEGenAIProgress;

    function create(tag, className, text) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    // Adds text to parent. Only **bold** is understood: a bold phrase that exactly
    // matches a block title becomes a bold link to that block's section.
    function appendRichText(parent, text, blocks) {
        text.split('**').forEach(function (part, index) {
            if (!part) return;
            if (index % 2 === 0) {
                parent.appendChild(document.createTextNode(part));
                return;
            }
            var strong = create('strong', '', part);
            var block = blocks.filter(function (candidate) {
                return candidate.title === part;
            })[0];
            if (block) {
                var anchor = create('a', 'quiz-block-link');
                anchor.href = '#block-' + block.id;
                anchor.appendChild(strong);
                parent.appendChild(anchor);
            } else {
                parent.appendChild(strong);
            }
        });
    }

    function buildQuestion(moduleId, quiz, question, blocks) {
        var scored = quiz.scored === true;
        var groupName = 'quiz-' + moduleId + '-' + question.id;
        var fieldset = create('fieldset', 'quiz-question');
        fieldset.appendChild(create('legend', 'quiz-prompt', question.prompt));

        var optionsBox = create('div', 'quiz-options');
        var options = question.options.map(function (option, optionIndex) {
            var label = create('label', 'quiz-option');
            var input = create('input');
            input.type = 'radio';
            input.name = groupName;
            input.value = String(optionIndex);
            input.addEventListener('change', function () {
                progress.recordAnswer(moduleId, question.id, optionIndex,
                    scored ? optionIndex === question.correct : null);
            });
            var text = create('span', 'quiz-option-text', option.text);
            var mark = create('span', 'quiz-option-mark');
            label.appendChild(input);
            label.appendChild(text);
            label.appendChild(mark);
            optionsBox.appendChild(label);
            return { label: label, input: input, mark: mark };
        });
        fieldset.appendChild(optionsBox);

        var feedback = create('div', 'quiz-feedback');
        feedback.setAttribute('aria-live', 'polite');
        fieldset.appendChild(feedback);

        var clear = create('button', 'quiz-clear', 'Clear answer');
        clear.type = 'button';
        clear.hidden = true;
        clear.addEventListener('click', function () {
            progress.clearAnswer(moduleId, question.id);
            options[0].input.focus();
        });
        fieldset.appendChild(clear);

        // Draws this question from the saved answer.
        function update(answer) {
            var picked = answer && typeof answer.picked === 'number' && question.options[answer.picked]
                ? answer.picked : -1;
            var isCorrect = scored && picked === question.correct;

            options.forEach(function (option, optionIndex) {
                var isPicked = optionIndex === picked;
                option.input.checked = isPicked;
                option.label.classList.toggle('is-picked', isPicked);
                // Only the picked option is marked; the right answer is never revealed.
                var markText = '';
                if (scored && isPicked) markText = isCorrect ? '✓ Correct' : '✗ Not correct';
                option.label.classList.toggle('is-correct', scored && isPicked && isCorrect);
                option.label.classList.toggle('is-wrong', scored && isPicked && !isCorrect);
                option.mark.textContent = markText;
            });

            var key = picked + ':' + isCorrect;
            if (feedback.getAttribute('data-state') !== key) {
                feedback.setAttribute('data-state', key);
                feedback.textContent = '';
                if (picked !== -1) {
                    var note = question.options[picked].note;
                    if (scored) {
                        feedback.appendChild(create('p', isCorrect ? 'quiz-verdict is-correct' : 'quiz-verdict',
                            isCorrect ? '✓ Correct' : '✗ Not quite'));
                        if (note) appendRichText(feedback.appendChild(create('p')), note, blocks);
                        if (question.explanation) appendRichText(feedback.appendChild(create('p')), question.explanation, blocks);
                    } else if (note) {
                        appendRichText(feedback.appendChild(create('p')), note, blocks);
                    } else {
                        feedback.appendChild(create('p', '', NO_NOTE_FALLBACK));
                    }
                }
            }
            clear.hidden = picked === -1;
        }

        return { element: fieldset, update: update, id: question.id };
    }

    function build(moduleId, quiz, blocks) {
        var wrapper = create('div', 'quiz');
        if (!quiz || !Array.isArray(quiz.questions)) return wrapper;
        if (quiz.title) wrapper.appendChild(create('h3', 'quiz-title', quiz.title));
        var questions = quiz.questions.map(function (question) {
            var built = buildQuestion(moduleId, quiz, question, blocks || []);
            wrapper.appendChild(built.element);
            return built;
        });

        function refresh() {
            var answers = progress.getAnswers(moduleId);
            questions.forEach(function (question) {
                question.update(answers[question.id]);
            });
        }

        if (quiz.scored !== true) wrapper.appendChild(create('p', 'quiz-unscored', UNSCORED_LINE));

        refresh();
        progress.onChange(refresh);
        return wrapper;
    }

    window.HEGenAIQuiz = { build: build };
})();

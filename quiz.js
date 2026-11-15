// Self-check questions for a module block. Exposes window.HEGenAIQuiz.build(moduleId, quiz, blocks),
// which returns the quiz element. Answers are saved through window.HEGenAIProgress
// and the quiz redraws from the saved answers whenever progress changes.
// All quiz text is set with textContent or text nodes, never as HTML.
(function () {
    var NO_NOTE_FALLBACK = 'No right answer; this just shows where you start.';
    var UNSCORED_LINE = 'Not scored. Your answer stays in your browser.';
    var CHECK_LABEL = 'Check my answers';
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

    // A button under the note that opens one of the module's materials (resources.js).
    function appendAction(parent, action) {
        var resources = window.HEGenAIResources;
        if (!action.label || !resources || !resources.has(action.resource)) return;
        var button = create('button', 'pill-button pill-button-secondary quiz-action', action.label);
        button.type = 'button';
        button.setAttribute('data-open-resource', action.resource);
        button.setAttribute('aria-haspopup', 'dialog');
        parent.appendChild(create('p')).appendChild(button);
    }

    // isRevealed() says whether marks and notes may show yet; questions checked
    // together keep them back until their group's button is pressed.
    // onAnswer() runs before an answer is saved or cleared.
    function buildQuestion(moduleId, quiz, question, blocks, isRevealed, onAnswer) {
        var scored = quiz.scored === true;
        var groupName = 'quiz-' + moduleId + '-' + question.id;
        var fieldset = create('fieldset', 'quiz-question');
        var legend = fieldset.appendChild(create('legend', 'quiz-prompt', question.prompt));
        legend.id = groupName + '-prompt';
        // An optional quote under the prompt, such as the text being rated.
        if (question.quote) {
            var quote = create('blockquote', 'quiz-quote', question.quote);
            quote.id = groupName + '-quote';
            fieldset.setAttribute('aria-describedby', quote.id);
            fieldset.appendChild(quote);
        }
        // A question may offer a material to open before it is answered.
        if (question.action) appendAction(fieldset, question.action);

        var optionsBox = create('div', 'quiz-options');
        var options = question.options.map(function (option, optionIndex) {
            var label = create('label', 'quiz-option');
            var input = create('input');
            input.type = 'radio';
            input.name = groupName;
            input.value = String(optionIndex);
            input.addEventListener('change', function () {
                onAnswer();
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
            onAnswer();
            progress.clearAnswer(moduleId, question.id);
            options[0].input.focus();
        });
        fieldset.appendChild(clear);

        // Draws this question from the saved answer.
        function update(answer) {
            var picked = answer && typeof answer.picked === 'number' && question.options[answer.picked]
                ? answer.picked : -1;
            var isCorrect = scored && picked === question.correct;
            var revealed = isRevealed();
            var marked = scored && revealed;

            options.forEach(function (option, optionIndex) {
                var isPicked = optionIndex === picked;
                option.input.checked = isPicked;
                option.label.classList.toggle('is-picked', isPicked);
                // Only the picked option is marked; the right answer is never revealed.
                var markText = '';
                if (marked && isPicked) markText = isCorrect ? '✓ Correct' : '✗ Not correct';
                option.label.classList.toggle('is-correct', marked && isPicked && isCorrect);
                option.label.classList.toggle('is-wrong', marked && isPicked && !isCorrect);
                option.mark.textContent = markText;
            });

            var key = picked + ':' + isCorrect + ':' + revealed;
            if (feedback.getAttribute('data-state') !== key) {
                feedback.setAttribute('data-state', key);
                feedback.textContent = '';
                if (picked !== -1 && revealed) {
                    var note = question.options[picked].note;
                    var action = question.options[picked].action;
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
                    if (action) appendAction(feedback, action);
                }
            }
            clear.hidden = picked === -1;
        }

        return { element: fieldset, clear: clear, legend: legend, update: update, id: question.id, group: question.checkTogether };
    }

    // The row after the last question of a checkTogether group: the check button,
    // with that question's "Clear answer" moved beside it. Pressing the button
    // shows the marks and notes for the whole group, and its label then adds
    // "again". A question answered or changed after the press waits for the next
    // press. All of this lasts until the page is reloaded, or until every answer
    // in the group is cleared.
    function buildCheckRow(quiz, groupId, lastQuestion, onPress) {
        var labels = quiz.checkLabels || {};
        var label = labels[groupId] || CHECK_LABEL;
        var row = create('div', 'quiz-check');
        var button = create('button', 'pill-button', label);
        button.type = 'button';
        button.addEventListener('click', onPress);
        row.appendChild(button);
        // Outside its question, the clear button names the question it belongs to.
        lastQuestion.clear.setAttribute('aria-describedby', lastQuestion.legend.id);
        row.appendChild(lastQuestion.clear);
        return {
            element: row,
            setChecked: function (checked) {
                button.textContent = checked ? label + ' again' : label;
            }
        };
    }

    function build(moduleId, quiz, blocks) {
        var wrapper = create('div', 'quiz');
        if (!quiz || !Array.isArray(quiz.questions)) return wrapper;
        if (quiz.title) wrapper.appendChild(create('h3', 'quiz-title', quiz.title));
        if (quiz.intro) wrapper.appendChild(create('p', 'quiz-intro', quiz.intro));

        // checkedGroups: groups whose button has been pressed (for its label).
        // revealedQuestions: questions whose feedback shows; a new answer hides it again.
        var checkedGroups = {};
        var revealedQuestions = {};
        var checkRows = {};
        var questions = quiz.questions.map(function (question, index) {
            var group = question.checkTogether;
            var built = buildQuestion(moduleId, quiz, question, blocks || [], function () {
                return !group || revealedQuestions[question.id] === true;
            }, function () {
                revealedQuestions[question.id] = false;
            });
            wrapper.appendChild(built.element);
            var next = quiz.questions[index + 1];
            if (group && (!next || next.checkTogether !== group)) {
                checkRows[group] = buildCheckRow(quiz, group, built, function () {
                    checkedGroups[group] = true;
                    quiz.questions.forEach(function (item) {
                        if (item.checkTogether === group) revealedQuestions[item.id] = true;
                    });
                    refresh();
                });
                wrapper.appendChild(checkRows[group].element);
                // A thin line sets the group apart from the questions after it.
                if (next) wrapper.appendChild(create('hr', 'quiz-divider'));
            }
            return built;
        });

        function refresh() {
            var answers = progress.getAnswers(moduleId);
            Object.keys(checkRows).forEach(function (group) {
                var anyAnswered = questions.some(function (question) {
                    return question.group === group && answers[question.id];
                });
                if (!anyAnswered) checkedGroups[group] = false;
                checkRows[group].setChecked(checkedGroups[group] === true);
            });
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

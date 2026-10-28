// The "Make it" block of Module 1: a prompt built live from the Try it form, and a
// checklist whose ticks are saved next to the form's values (form.js).
// Exposes window.HEGenAIMakeIt:
//   renderPrompt(slot, moduleId, scope)   fills slot with the prompt box and its copy button
//   setupChecklists(container, moduleId)  adds tick boxes to each <ol data-checklist>
// Everything is set as text, never as HTML, and nothing leaves the browser.
(function () {
    var COPIED = 'Copied.';
    var NOT_COPIED = 'Could not copy. Select the text and copy it yourself.';
    var LEVELS_FROM = 'The five levels';
    var LEVEL_1_PARTS = [
        '3) "GenAI is not allowed in any part of this assignment. It is done under supervision on [date]. Students who use assistive technology contact [name] by [date]."'
    ];

    function create(tag, className, text) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function tidy(text) {
        return (text || '').replace(/\s+/g, ' ').trim();
    }

    // The name goes after "GenAI in " and needs a "the" unless it has an article already.
    function inTitle(name) {
        var words = name.split(' ');
        var first = words[0];
        // Lower-case an ordinary first word, but leave acronyms and names such as "iPad" alone.
        if (/^[A-Z][a-z]*$/.test(first)) words[0] = first.charAt(0).toLowerCase() + first.slice(1);
        var text = words.join(' ');
        return /^(the|a|an)\s/i.test(name) ? text : 'the ' + text;
    }

    // One line is a list of { text, filled }. Filled parts are underlined, as in See it.
    function lineOf() {
        return Array.prototype.map.call(arguments, function (part) {
            return typeof part === 'string' ? { text: part, filled: false } : part;
        });
    }

    function value(text, placeholder) {
        return text ? { text: text, filled: true } : placeholder;
    }

    // Returns { lines, missing }. Empty fields show as their [placeholder].
    function buildLines(values, levels) {
        var name = tidy(values.name).replace(/[.\s]+$/, '');
        var description = tidy(values.description);
        var outcomes = tidy(values.outcomes);
        var institution = tidy(values.institution);
        var declare = tidy(values.declare);
        var level = levels.filter(function (item) {
            return item.value === values.level;
        })[0];

        var levelName = level ? level.label.replace(/^Level \d,\s*/, '') : '';
        var levelNumber = level ? level.value : '';
        var levelText = level ? 'Level ' + levelNumber + ', ' + levelName : '';
        var sentence = level ? level.sentence.replace(/^[“"]\s*/, '').replace(/\s*[”"]$/, '') : '';

        var missing = !name || !description || !outcomes || !institution || !declare || !level;
        var lines = [];

        lines.push(lineOf('Write a one-page guide for students on GenAI use in one written assignment. Use plain language.'));
        lines.push(lineOf('Assignment: ', value(name, '[assignment name]'), '. ', value(description, '[description]')));
        lines.push(lineOf('Learning outcomes: ', value(outcomes, '[learning outcomes]')));
        lines.push(lineOf('Where students declare their use: ', value(declare, '[where students declare]')));
        lines.push(lineOf('Institution: ', value(institution, '[institution]')));
        lines.push(lineOf('Level: ', value(levelText, '[level]')));
        lines.push(lineOf('Use exactly these parts:'));
        lines.push(lineOf('1) Title: "GenAI in ',
            name ? { text: inTitle(name), filled: true } : 'the [assignment name]',
            ': ', value(levelText, '[level]'), '".'));
        lines.push(lineOf('2) This sentence, word for word, in quotation marks: "', value(sentence, '[level]'), '"'));

        if (levelNumber === '1') {
            LEVEL_1_PARTS.forEach(function (part) {
                lines.push(lineOf(part));
            });
        } else {
            lines.push(lineOf('3) "GenAI for…": up to five concrete uses that fit this level and this assignment.'));
            lines.push(lineOf('4) "GenAI is not for…": up to five items. For each learning outcome, one item that stops GenAI from doing what the outcome asks students to show. Also: citing GenAI as a source (cite the original sources instead), and pasting in other people\'s work or confidential, personal or copyrighted material.'));
            lines.push(lineOf('5) "Declare your use": in the place given above, students state the GenAI tool, what they used it for, their prompts or a link to the chat, which part of the work, and the date or date range. If they used no GenAI, they say so. Using GenAI beyond this guide, or without declaring it, may count as misconduct under ',
                value(institution, '[institution]'), '\'s rules.'));
        }
        lines.push(lineOf('6) Last line: "Level text from The AI Assessment Scale by Perkins, Furze, Roe & MacVaugh (2024), CC BY-NC-SA 4.0."'));
        if (levelNumber !== '1') {
            lines.push(lineOf('Every item must name a concrete use in the terms of this assignment, and a student must be able to read it only one way.'));
        }
        return { lines: lines, missing: missing };
    }

    function plainText(lines) {
        return lines.map(function (line) {
            return line.map(function (part) {
                return part.text;
            }).join('');
        }).join('\n');
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var helper = create('textarea');
            helper.value = text;
            helper.setAttribute('readonly', '');
            helper.style.position = 'fixed';
            helper.style.opacity = '0';
            document.body.appendChild(helper);
            helper.select();
            var done = false;
            try {
                done = document.execCommand('copy');
            } catch (error) {
                done = false;
            }
            document.body.removeChild(helper);
            if (done) resolve();
            else reject(new Error('copy failed'));
        });
    }

    function renderPrompt(slot, moduleId, scope) {
        var forms = window.HEGenAIForm;
        if (!forms) return;

        var notice = create('p', 'prompt-notice');
        notice.appendChild(document.createTextNode('Some details are missing. Fill them in under '));
        var noticeLink = create('a', '', 'Try it');
        noticeLink.href = '#block-try';
        var strong = create('strong');
        strong.appendChild(noticeLink);
        notice.appendChild(strong);
        notice.appendChild(document.createTextNode('.'));

        var box = create('div', 'text-box prompt-box');
        box.setAttribute('role', 'group');
        box.setAttribute('aria-label', 'Your prompt');
        var body = create('div', 'text-box-body');
        box.appendChild(body);

        var copyButton = create('button', 'pill-button pill-button-secondary', 'Copy prompt');
        copyButton.type = 'button';
        var status = create('span', 'copy-status');
        status.setAttribute('role', 'status');
        var actions = create('div', 'prompt-actions');
        actions.appendChild(copyButton);
        actions.appendChild(status);

        slot.appendChild(notice);
        slot.appendChild(box);
        slot.appendChild(actions);

        var current = '';
        function update() {
            var found = forms.readLevels(scope, LEVELS_FROM);
            var built = buildLines(forms.get(moduleId), found ? found.levels : []);
            current = plainText(built.lines);
            notice.hidden = !built.missing;
            body.textContent = '';
            built.lines.forEach(function (line) {
                var paragraph = create('p', 'prompt-line');
                line.forEach(function (part) {
                    if (part.filled) paragraph.appendChild(create('mark', 'prompt-value', part.text));
                    else paragraph.appendChild(document.createTextNode(part.text));
                });
                body.appendChild(paragraph);
            });
        }

        copyButton.addEventListener('click', function () {
            copyText(current).then(function () {
                status.textContent = COPIED;
            }, function () {
                status.textContent = NOT_COPIED;
            });
        });

        document.addEventListener('hegenai:form-change', function (event) {
            if (event.detail.moduleId === moduleId) update();
        });
        window.addEventListener('storage', function (event) {
            if (event.key === 'hegenai:form:' + moduleId + ':v1') update();
        });
        update();
    }

    // Each <li> in an <ol data-checklist> gets a tick box. A tick is saved as "check<n>"
    // in the form's values, so the form's Clear removes it too.
    function setupChecklists(container, moduleId) {
        var forms = window.HEGenAIForm;
        var lists = container.querySelectorAll('ol[data-checklist]');
        Array.prototype.forEach.call(lists, function (list) {
            var boxes = [];
            Array.prototype.forEach.call(list.children, function (item, index) {
                var key = 'check' + (index + 1);
                var label = create('label', 'tick-item');
                var box = create('input');
                box.type = 'checkbox';
                var text = create('span', 'tick-text');
                while (item.firstChild) text.appendChild(item.firstChild);
                label.appendChild(box);
                label.appendChild(text);
                item.appendChild(label);
                box.checked = forms.get(moduleId)[key] === '1';
                box.addEventListener('change', function () {
                    forms.set(moduleId, key, box.checked ? '1' : '');
                });
                boxes.push({ key: key, box: box });
            });
            function sync() {
                var saved = forms.get(moduleId);
                boxes.forEach(function (entry) {
                    entry.box.checked = saved[entry.key] === '1';
                });
            }
            document.addEventListener('hegenai:form-change', function (event) {
                if (event.detail.moduleId === moduleId) sync();
            });
            window.addEventListener('storage', function (event) {
                if (event.key === 'hegenai:form:' + moduleId + ':v1') sync();
            });
        });
    }

    window.HEGenAIMakeIt = { renderPrompt: renderPrompt, setupChecklists: setupChecklists };
})();

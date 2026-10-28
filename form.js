// A numbered form for a module block, kept in the visitor's own browser.
// Exposes window.HEGenAIForm:
//   build(moduleId, config, scope)   returns the form element; scope is where drop-downs
//                                    named in config.levelsFrom are looked up
//   get(moduleId)                    the saved values as { key: "text" }; an empty string
//                                    where nothing is saved. Level is "1" to "5" or "".
//   set(moduleId, key, value)        saves one value next to the form's (used for ticks)
//   readLevels(scope, summaryText)   the levels of a drop-down, as { dropdown, levels }
// Every change, including "Clear", fires "hegenai:form-change" on document.
// Values are saved as the visitor types, under "hegenai:form:<moduleId>:v1", and are
// never sent anywhere. All text is set as text or as input values, never as HTML.
(function () {
    var CLEAR_LABEL = 'Click to clear answers';
    var CONFIRM_CLEAR = 'Click again to clear answers';
    var SUPERVISION_LINE = 'Only for work done under supervision.';

    function create(tag, className, text) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function storageKey(moduleId) {
        return 'hegenai:form:' + moduleId + ':v1';
    }

    function load(moduleId) {
        try {
            var parsed = JSON.parse(window.localStorage.getItem(storageKey(moduleId)));
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
        } catch (error) {
            // Storage blocked or unreadable: start empty.
        }
        return {};
    }

    function save(moduleId, values) {
        try {
            var filled = Object.keys(values).some(function (key) {
                return values[key];
            });
            if (filled) window.localStorage.setItem(storageKey(moduleId), JSON.stringify(values));
            else window.localStorage.removeItem(storageKey(moduleId));
        } catch (error) {
            // Storage blocked or full: the values last until the page is closed.
        }
    }

    function notify(moduleId) {
        document.dispatchEvent(new CustomEvent('hegenai:form-change', { detail: { moduleId: moduleId } }));
    }

    function set(moduleId, key, value) {
        var values = load(moduleId);
        if (value) values[key] = value;
        else delete values[key];
        save(moduleId, values);
        notify(moduleId);
    }

    function get(moduleId) {
        var saved = load(moduleId);
        var values = {};
        Object.keys(saved).forEach(function (key) {
            if (typeof saved[key] === 'string') values[key] = saved[key];
        });
        return values;
    }

    // Reads "Level 2, AI Planning: “...”" items of a .level-list in a drop-down
    // whose summary is summaryText.
    function readLevels(scope, summaryText) {
        var summaries = scope.querySelectorAll('details.dropdown > summary');
        var summary = Array.prototype.filter.call(summaries, function (candidate) {
            return candidate.textContent.trim() === summaryText;
        })[0];
        if (!summary) return null;
        var dropdown = summary.parentNode;
        var levels = Array.prototype.map.call(dropdown.querySelectorAll('.level-list > li'), function (item, index) {
            var name = item.querySelector('strong');
            var label = name ? name.textContent.replace(/:\s*$/, '') : 'Level ' + (index + 1);
            var sentence = item.textContent.replace(name ? name.textContent : '', '').trim();
            return { value: String(index + 1), label: label, sentence: sentence };
        });
        return { dropdown: dropdown, levels: levels };
    }

    function build(moduleId, config, scope) {
        var values = get(moduleId);
        var inputs = [];
        var idPrefix = 'form-' + moduleId + '-';
        var form = create('form', 'trainee-form');
        form.noValidate = true;
        // Nothing is submitted anywhere.
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });

        var status = create('p', 'form-status');
        status.setAttribute('role', 'status');

        // Saved values are read again each time, so ticks and other tabs are kept.
        function remember(key, value) {
            set(moduleId, key, value);
        }
        function syncFromStorage() {
            values = get(moduleId);
            refreshClear();
        }
        document.addEventListener('hegenai:form-change', function (event) {
            if (event.detail.moduleId === moduleId) syncFromStorage();
        });
        window.addEventListener('storage', function (event) {
            if (event.key === storageKey(moduleId)) syncFromStorage();
        });

        // Top buttons
        var tools = create('div', 'form-tools');
        // Off unless config.practiceFill is true: no field is pre-filled.
        var practiceButton = null;
        if (config.practiceFill === true) {
            practiceButton = create('button', 'pill-button pill-button-secondary', 'Use the practice case');
            practiceButton.type = 'button';
            tools.appendChild(practiceButton);
        }
        if (config.practiceResource && window.HEGenAIResources && window.HEGenAIResources.has(config.practiceResource)) {
            var openButton = create('button', 'pill-button pill-button-secondary', 'Open the practice case');
            openButton.type = 'button';
            openButton.setAttribute('data-open-resource', config.practiceResource);
            openButton.setAttribute('aria-haspopup', 'dialog');
            tools.appendChild(openButton);
        }
        if (tools.children.length) form.appendChild(tools);

        // Steps
        var steps = create('ol', 'step-list form-steps');
        steps.setAttribute('role', 'list');
        (config.fields || []).forEach(function (field, fieldIndex) {
            var item = create('li');
            var single = field.inputs.length === 1;
            var guidanceId = idPrefix + 'guidance-' + fieldIndex;
            var titleId = idPrefix + 'title-' + fieldIndex;

            var guidance = create('p', 'form-guidance', field.guidance);
            guidance.id = guidanceId;
            var title = create(single ? 'label' : 'p', 'form-step-title', field.title + '.');
            title.id = titleId;
            if (single) title.setAttribute('for', idPrefix + field.inputs[0].key);
            var heading = create('div', 'form-step-heading');
            heading.appendChild(title);
            item.appendChild(heading);
            item.appendChild(guidance);

            var group = item;
            if (!single) {
                group = create('div', 'form-group');
                group.setAttribute('role', 'group');
                group.setAttribute('aria-labelledby', titleId);
                group.setAttribute('aria-describedby', guidanceId);
                item.appendChild(group);
            }

            field.inputs.forEach(function (spec) {
                var inputId = idPrefix + spec.key;
                var control;
                if (!single) {
                    var label = create('label', 'form-label', spec.label);
                    label.setAttribute('for', inputId);
                    group.appendChild(label);
                }

                if (spec.type === 'level') {
                    control = create('select', 'form-control form-select');
                    control.appendChild(new Option('Choose a level', ''));
                    var found = spec.levelsFrom && scope ? readLevels(scope, spec.levelsFrom) : null;
                    var levels = found ? found.levels : [];
                    levels.forEach(function (level) {
                        control.appendChild(new Option(level.label, level.value));
                    });
                    var sentence = create('div', 'form-level-sentence');
                    var sentenceId = inputId + '-sentence';
                    sentence.id = sentenceId;
                    sentence.setAttribute('aria-live', 'polite');
                    control.setAttribute('aria-describedby', guidanceId + ' ' + sentenceId);
                    var showSentence = function () {
                        sentence.textContent = '';
                        var chosen = levels.filter(function (level) {
                            return level.value === control.value;
                        })[0];
                        if (!chosen) return;
                        sentence.appendChild(create('p', '', chosen.sentence));
                        if (chosen.value === '1') sentence.appendChild(create('p', '', SUPERVISION_LINE));
                    };
                    control.value = levels.some(function (level) {
                        return level.value === values[spec.key];
                    }) ? values[spec.key] : '';
                    control.addEventListener('change', function () {
                        remember(spec.key, control.value);
                        showSentence();
                    });
                    control.id = inputId;
                    group.appendChild(control);
                    group.appendChild(sentence);
                    showSentence();
                    if (found) {
                        var copy = found.dropdown.cloneNode(true);
                        copy.removeAttribute('open');
                        group.appendChild(copy);
                    }
                    inputs.push({ spec: spec, control: control, refresh: showSentence });
                    return;
                }

                if (spec.type === 'text') {
                    control = create('textarea', 'form-control');
                    control.rows = spec.rows || 3;
                } else {
                    control = create('input', 'form-control');
                    control.type = 'text';
                }
                control.id = inputId;
                control.autocomplete = 'off';
                control.setAttribute('aria-describedby', guidanceId);
                control.value = values[spec.key] || '';
                control.addEventListener('input', function () {
                    remember(spec.key, control.value);
                });
                group.appendChild(control);
                inputs.push({ spec: spec, control: control });
            });
            steps.appendChild(item);
        });
        form.appendChild(steps);

        // Clear, with its confirmation on the button itself
        // Styled like "Clear answer" in the self-checks, but needs a second click.
        var clearButton = create('button', 'quiz-clear', CLEAR_LABEL);
        clearButton.type = 'button';
        var confirming = false;
        function resetClear() {
            confirming = false;
            clearButton.textContent = CLEAR_LABEL;
        }
        function refreshClear() {
            clearButton.hidden = !Object.keys(values).some(function (key) {
                return values[key];
            });
        }
        clearButton.addEventListener('click', function () {
            if (!confirming) {
                confirming = true;
                clearButton.textContent = CONFIRM_CLEAR;
                return;
            }
            inputs.forEach(function (input) {
                input.control.value = '';
                if (input.refresh) input.refresh();
            });
            save(moduleId, {});
            notify(moduleId);
            resetClear();
            status.textContent = 'All fields cleared.';
            if (inputs.length) inputs[0].control.focus();
        });
        clearButton.addEventListener('blur', resetClear);
        form.appendChild(clearButton);
        form.appendChild(status);
        refreshClear();

        // The practice case fills the text fields, never the level.
        if (practiceButton) practiceButton.addEventListener('click', function () {
            inputs.forEach(function (input) {
                if (typeof input.spec.practice !== 'string') return;
                input.control.value = input.spec.practice;
                remember(input.spec.key, input.spec.practice);
            });
            status.textContent = 'Steps 1 to 4 filled in with the practice case. The level is left for you to choose.';
        });

        return form;
    }

    window.HEGenAIForm = { build: build, get: get, set: set, readLevels: readLevels };
})();

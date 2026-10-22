// Builds the module cards on modules.html from window.HEGENAI_MODULES and
// shows each visitor's progress from window.HEGenAIProgress.
(function () {
    var data = window.HEGENAI_MODULES;
    var progress = window.HEGenAIProgress;
    var list = document.getElementById('module-list');
    if (!data || !progress || !list) return;

    var totalBlocks = data.blocks.length;
    var progressViews = [];

    function create(tag, className, text) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function describeLength(minutes) {
        if (minutes % 60 === 0) {
            var hours = minutes / 60;
            return 'About ' + hours + (hours === 1 ? ' hour' : ' hours');
        }
        return 'About ' + minutes + ' minutes';
    }

    function buildProgress(module) {
        var wrapper = create('div', 'module-progress');
        wrapper.hidden = true;

        var bar = create('div', 'progress-bar');
        bar.setAttribute('role', 'progressbar');
        bar.setAttribute('aria-label', 'Progress in module ' + module.number);
        bar.setAttribute('aria-valuemin', '0');
        bar.setAttribute('aria-valuemax', String(totalBlocks));
        var fill = create('div', 'progress-bar-fill');
        bar.appendChild(fill);

        var label = create('p', 'module-progress-label');
        wrapper.appendChild(bar);
        wrapper.appendChild(label);

        progressViews.push({ moduleId: module.id, wrapper: wrapper, bar: bar, fill: fill, label: label });
        return wrapper;
    }

    function buildCard(module) {
        var isAvailable = module.status === 'available';
        var pageUrl = 'module.html?m=' + encodeURIComponent(module.id);
        var card = create('li', 'card module-card');

        card.appendChild(create('p', 'module-number', 'Module ' + module.number));

        var heading = create('h3');
        if (isAvailable) {
            var link = create('a', '', module.title);
            link.href = pageUrl;
            heading.appendChild(link);
        } else {
            heading.textContent = module.title;
        }
        card.appendChild(heading);

        var outcome = create('p', 'module-outcome');
        if (module.outcome === 'To be confirmed') {
            outcome.appendChild(create('span', 'to-be-confirmed', module.outcome));
        } else {
            outcome.textContent = module.outcome;
        }
        card.appendChild(outcome);

        card.appendChild(create('p', 'module-length', describeLength(module.minutes)));
        card.appendChild(buildProgress(module));

        var footer = create('div', 'module-status');
        if (isAvailable) {
            var open = create('a', 'pill-button', 'Open module');
            open.href = pageUrl;
            footer.appendChild(open);
        } else {
            footer.appendChild(create('span', 'status-pill', 'Coming soon'));
        }
        card.appendChild(footer);

        return card;
    }

    // Modules with the same cluster share a heading; modules without one form a flat grid.
    function groupByCluster(modules) {
        var groups = [];
        modules.forEach(function (module) {
            var name = module.cluster || null;
            var group = groups.filter(function (existing) {
                return existing.name === name;
            })[0];
            if (!group) {
                group = { name: name, modules: [] };
                groups.push(group);
            }
            group.modules.push(module);
        });
        return groups;
    }

    function render() {
        var modules = data.modules.slice().sort(function (a, b) {
            return a.number - b.number;
        });
        groupByCluster(modules).forEach(function (group) {
            var container = list;
            if (group.name) {
                container = create('section', 'module-cluster');
                container.appendChild(create('h2', 'module-cluster-title', group.name));
                list.appendChild(container);
            }
            var cards = create('ol', 'cards module-cards');
            group.modules.forEach(function (module) {
                cards.appendChild(buildCard(module));
            });
            container.appendChild(cards);
        });
    }

    function updateProgress() {
        progressViews.forEach(function (view) {
            var done = progress.blocksDone(view.moduleId).filter(function (blockId) {
                return data.blocks.some(function (block) {
                    return block.id === blockId;
                });
            }).length;
            view.wrapper.hidden = done === 0;
            view.fill.style.width = (done / totalBlocks * 100) + '%';
            view.bar.setAttribute('aria-valuenow', String(done));
            view.label.textContent = done + ' of ' + totalBlocks + ' blocks done';
        });
    }

    function setUpReset() {
        var note = document.getElementById('progress-note');
        var resetButton = document.getElementById('reset-button');
        var confirmBox = document.getElementById('reset-confirm');
        var yesButton = document.getElementById('reset-yes');
        var cancelButton = document.getElementById('reset-cancel');
        var status = document.getElementById('reset-status');
        if (!note || !resetButton || !confirmBox || !yesButton || !cancelButton || !status) return;

        function closeConfirm() {
            confirmBox.hidden = true;
            resetButton.hidden = false;
            resetButton.focus();
        }

        resetButton.addEventListener('click', function () {
            status.textContent = '';
            resetButton.hidden = true;
            confirmBox.hidden = false;
            cancelButton.focus();
        });

        cancelButton.addEventListener('click', closeConfirm);

        yesButton.addEventListener('click', function () {
            progress.reset();
            closeConfirm();
            status.textContent = 'Your progress has been reset.';
        });

        confirmBox.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeConfirm();
        });

        note.hidden = false;
    }

    render();
    updateProgress();
    progress.onChange(updateProgress);
    setUpReset();
})();

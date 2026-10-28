// Builds module.html?m=<module-id> from window.HEGENAI_MODULES and tracks
// which blocks are done with window.HEGenAIProgress.
(function () {
    var data = window.HEGENAI_MODULES;
    var progress = window.HEGenAIProgress;
    var page = document.getElementById('module-page');
    if (!data || !progress || !page) return;

    var SITE_NAME = 'HEGenAI Training: GenAI in Higher Education Assessment & Feedback';
    var SOURCES_ID = 'sources';

    function create(tag, className, text) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function link(href, text, className) {
        var element = create('a', className, text);
        element.href = href;
        return element;
    }

    function moduleUrl(module) {
        return 'module.html?m=' + encodeURIComponent(module.id);
    }

    function describeLength(minutes) {
        if (minutes % 60 === 0) {
            var hours = minutes / 60;
            return 'About ' + hours + (hours === 1 ? ' hour' : ' hours');
        }
        return 'About ' + minutes + ' minutes';
    }

    function describeMinutes(minutes) {
        if (minutes % 60 === 0) {
            var hours = minutes / 60;
            return hours + (hours === 1 ? ' hour' : ' hours');
        }
        return minutes + ' minutes';
    }

    function toBeConfirmed(text) {
        return create('span', 'to-be-confirmed', text);
    }

    function setTitle(text) {
        document.title = text + ' - ' + SITE_NAME;
    }

    function findModule(id) {
        return data.modules.filter(function (module) {
            return module.id === id;
        })[0];
    }

    function blockContent(module, blockId) {
        return (module.blocks || []).filter(function (block) {
            return block.id === blockId;
        })[0] || {};
    }

    function sectionId(blockId) {
        return 'block-' + blockId;
    }

    function readModuleId() {
        var match = /[?&]m=([^&#]*)/.exec(window.location.search);
        if (!match) return '';
        try {
            return decodeURIComponent(match[1].replace(/\+/g, ' '));
        } catch (error) {
            return '';
        }
    }

    function renderNotFound() {
        setTitle('Module not found');
        page.appendChild(create('h1', 'page-title', 'Module not found'));
        var message = create('p', '', 'We could not find that module. It may have moved, or the link may be incomplete. ');
        message.appendChild(link('modules.html', 'See all modules'));
        page.appendChild(message);
    }

    function findResource(module, id) {
        return (module.resources || []).filter(function (resource) {
            return resource.id === id;
        })[0];
    }

    // A small printed-page view of a module material. Selecting it opens the
    // material in the resource panel (resources.js).
    function renderPreview(preview, resource) {
        var figure = create('figure', 'outcome-figure outcome-preview');
        var frame = create('div', 'preview-frame');
        var pageView = create('div', 'preview-page block-body');
        pageView.innerHTML = resource.html;
        pageView.setAttribute('aria-hidden', 'true');
        pageView.inert = true;
        frame.appendChild(pageView);
        var open = create('button', 'preview-open');
        open.type = 'button';
        open.setAttribute('data-open-resource', resource.id);
        open.setAttribute('aria-haspopup', 'dialog');
        frame.appendChild(open);
        figure.appendChild(frame);

        var caption = create('figcaption', '', preview.caption || resource.title);
        caption.id = 'preview-caption-' + resource.id;
        open.setAttribute('aria-labelledby', caption.id);
        figure.appendChild(caption);
        return figure;
    }

    // Fills each <div data-text="<id>"> in a block with a prompt box or a draft
    // box from module.texts. Lines are always set as text, never as HTML. Lines
    // after showLines stay hidden until the toggle under the box is pressed.
    function renderTexts(container, module) {
        var slots = container.querySelectorAll('[data-text]');
        Array.prototype.forEach.call(slots, function (slot) {
            var id = slot.getAttribute('data-text');
            var text = (module.texts || []).filter(function (item) {
                return item.id === id;
            })[0];
            if (!text) return;
            var isDraft = text.kind === 'draft';
            var render = isDraft ? renderDraftLines : renderPromptLines;
            slot.className = isDraft ? 'text-box draft-box' : 'text-box prompt-box';
            slot.setAttribute('role', 'group');
            if (isDraft) {
                var label = create('p', 'draft-label', text.label);
                label.id = 'text-' + id + '-label';
                slot.setAttribute('aria-labelledby', label.id);
                slot.appendChild(label);
            } else if (text.label) {
                slot.setAttribute('aria-label', text.label);
            }

            var lines = text.lines || [];
            var shown = typeof text.showLines === 'number' ? text.showLines : lines.length;
            var body = create('div', 'text-box-body');
            body.appendChild(render(lines.slice(0, shown)));
            slot.appendChild(body);
            if (shown >= lines.length) return;

            var moreLabel = text.moreLabel || 'Show all';
            var more = render(lines.slice(shown));
            more.id = 'text-' + id + '-more';
            more.hidden = true;
            body.appendChild(more);
            body.classList.add('is-collapsed');
            var toggle = create('button', 'text-box-toggle', moreLabel);
            toggle.type = 'button';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', more.id);
            toggle.addEventListener('click', function () {
                var opening = more.hidden;
                more.hidden = !opening;
                body.classList.toggle('is-collapsed', !opening);
                toggle.setAttribute('aria-expanded', String(opening));
                toggle.textContent = opening ? 'Show less' : moreLabel;
            });
            slot.appendChild(toggle);
        });
    }

    // Fills <div data-form> in a block with the block's form (form.js). Drop-downs
    // the form repeats are looked up in the blocks drawn so far.
    function renderForm(container, module, block, drawn) {
        var slot = container.querySelector('[data-form]');
        if (!slot || !block.form || !window.HEGenAIForm) return;
        slot.parentNode.replaceChild(window.HEGenAIForm.build(module.id, block.form, drawn), slot);
    }

    // One paragraph per line; {{...}} marks a filled-in value.
    function renderPromptLines(lines) {
        var wrapper = create('div');
        lines.forEach(function (line) {
            var paragraph = create('p', 'prompt-line');
            line.split(/\{\{|\}\}/).forEach(function (part, index) {
                if (!part) return;
                paragraph.appendChild(index % 2 === 1
                    ? create('mark', 'prompt-value', part)
                    : document.createTextNode(part));
            });
            wrapper.appendChild(paragraph);
        });
        return wrapper;
    }

    // "# " starts a heading, "- " a list item, anything else a paragraph.
    function renderDraftLines(lines) {
        var wrapper = create('div');
        var list = null;
        lines.forEach(function (line) {
            if (line.indexOf('- ') === 0) {
                if (!list) list = wrapper.appendChild(create('ul'));
                list.appendChild(create('li', '', line.slice(2)));
                return;
            }
            list = null;
            if (line.indexOf('# ') === 0) {
                wrapper.appendChild(create('h4', 'draft-heading', line.slice(2)));
            } else {
                wrapper.appendChild(create('p', '', line));
            }
        });
        return wrapper;
    }

    function renderOutcomeCard(module, isAvailable) {
        var image = module.outcomeImage;
        var preview = module.outcomePreview;
        var previewResource = preview && findResource(module, preview.resource);
        var card = create('div', 'card outcome-card' +
            (previewResource ? ' has-preview' : image && image.src ? ' has-image' : ''));

        var text = create('div', 'outcome-text');
        text.appendChild(create('p', 'outcome-label', 'Key learning outcome'));
        var sentence = create('p', 'outcome-sentence');
        if (module.outcome === 'To be confirmed') {
            sentence.appendChild(toBeConfirmed(module.outcome));
        } else {
            sentence.textContent = module.outcome;
        }
        text.appendChild(sentence);

        card.appendChild(text);

        if (previewResource) {
            card.appendChild(renderPreview(preview, previewResource));
        } else if (image && image.src) {
            var figure = create('figure', 'outcome-figure');
            var picture = create('img');
            picture.src = image.src;
            picture.alt = image.alt || '';
            figure.appendChild(picture);
            if (image.caption) figure.appendChild(create('figcaption', '', image.caption));
            card.appendChild(figure);
        }
        return card;
    }

    function renderMeta(module, isAvailable) {
        var items = [['Module time', '~' + describeMinutes(module.minutes)]];
        if (module.extraMinutes) items.push(['Post-module activity', '~' + describeMinutes(module.extraMinutes)]);
        if (!module.audience) items.push(['For', 'Higher education educators']);
        var meta = create('p', 'module-meta');
        items.forEach(function (item, index) {
            if (index > 0) meta.appendChild(create('span', 'module-meta-separator', '⋅'));
            var entry = create('span');
            entry.appendChild(create('strong', '', item[0] + ':'));
            entry.appendChild(document.createTextNode(' ' + item[1]));
            meta.appendChild(entry);
        });
        if (!isAvailable) meta.appendChild(create('span', 'status-pill', 'Coming soon'));
        return meta;
    }

    function renderHeader(module, isAvailable) {
        var header = create('header', 'module-header');
        header.appendChild(create('p', 'module-number', 'Module'));
        header.appendChild(create('h1', 'page-title', module.title));

        header.appendChild(renderMeta(module, isAvailable));
        return header;
    }

    // "Before you start": who the module is for and what to have ready. Sits
    // above the contents panel and scrolls away, while the panel stays put.
    function renderFacts(module) {
        var card = create('section', 'card module-facts');
        card.setAttribute('aria-label', 'Before you start');
        var list = create('dl');
        [['For', module.audience], ['What you need', module.needs]].forEach(function (item) {
            if (!item[1]) return;
            list.appendChild(create('dt', '', item[0] + ':'));
            list.appendChild(create('dd', '', item[1]));
        });
        card.appendChild(list);
        return card;
    }

    function renderComingSoon(module) {
        page.appendChild(renderHeader(module, false));
        page.appendChild(renderOutcomeCard(module, false));
        var card = create('div', 'card');
        var message = create('p', '', 'This module is coming soon. ');
        message.appendChild(link('modules.html', 'See all modules'));
        card.appendChild(message);
        page.appendChild(card);
    }

    // The contents list is built twice: a <details> for narrow screens and a
    // sticky panel for wide ones. CSS shows only one of them.
    function buildContentsList(entries, contentsLinks) {
        var list = create('ol', 'contents-list');
        entries.forEach(function (entry) {
            var item = create('li');
            var anchor = link('#' + entry.id, entry.title);
            anchor.setAttribute('data-target', entry.id);
            contentsLinks.push(anchor);
            item.appendChild(anchor);
            list.appendChild(item);
        });
        return list;
    }

    // Module materials open in the resource panel (resources.js), so they are
    // buttons rather than links.
    function buildMaterialsList(resources) {
        var wrapper = create('div', 'contents-materials');
        wrapper.appendChild(create('h3', 'contents-subtitle', 'Module materials'));
        var list = create('ul', 'contents-list');
        resources.forEach(function (resource) {
            var item = create('li');
            var button = create('button', 'contents-resource', resource.title);
            button.type = 'button';
            button.setAttribute('data-open-resource', resource.id);
            button.setAttribute('aria-haspopup', 'dialog');
            item.appendChild(button);
            list.appendChild(item);
        });
        wrapper.appendChild(list);
        return wrapper;
    }

    function renderModule(module) {
        var blocks = data.blocks;
        var view = { strip: {}, toggles: {}, notes: {}, contentsLinks: [] };
        var resources = Array.isArray(module.resources) ? module.resources : [];
        if (window.HEGenAIResources) window.HEGenAIResources.setup(resources);

        page.appendChild(renderHeader(module, true));

        var entries = blocks.map(function (block) {
            return { id: sectionId(block.id), title: block.title };
        });
        entries.push({ id: SOURCES_ID, title: 'Sources and credits' });

        var mobileContents = create('details', 'card contents-mobile');
        mobileContents.appendChild(create('summary', '', 'Module Blocks'));
        mobileContents.appendChild(buildContentsList(entries, view.contentsLinks));
        if (resources.length) mobileContents.appendChild(buildMaterialsList(resources));
        // Opening a material leaves the menu open, so focus can return to its button.
        mobileContents.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') mobileContents.open = false;
        });

        var layout = create('div', 'module-layout');
        var content = create('div', 'module-content');

        var panel = create('nav', 'card contents-panel');
        panel.setAttribute('aria-labelledby', 'contents-panel-title');
        var panelTitle = create('h2', 'contents-title', 'Module Blocks');
        panelTitle.id = 'contents-panel-title';
        panel.appendChild(panelTitle);
        panel.appendChild(buildContentsList(entries, view.contentsLinks));
        if (resources.length) panel.appendChild(buildMaterialsList(resources));

        // Progress
        var standing = create('section', 'card standing');
        standing.setAttribute('aria-labelledby', 'standing-title');
        var standingTitle = create('h2', 'standing-title', 'Progress');
        standingTitle.id = 'standing-title';
        standing.appendChild(standingTitle);
        view.standingCount = create('p', 'standing-count');
        view.standingCount.setAttribute('aria-live', 'polite');
        standing.appendChild(view.standingCount);
        view.standingBar = create('div', 'progress-bar');
        view.standingBar.setAttribute('role', 'progressbar');
        view.standingBar.setAttribute('aria-labelledby', 'standing-title');
        view.standingBar.setAttribute('aria-valuemin', '0');
        view.standingBar.setAttribute('aria-valuemax', String(blocks.length));
        view.standingFill = create('div', 'progress-bar-fill');
        view.standingBar.appendChild(view.standingFill);
        standing.appendChild(view.standingBar);
        view.standingNext = create('p', 'standing-next');
        standing.appendChild(view.standingNext);
        content.appendChild(standing);

        // Block strip
        var strip = create('nav', 'block-strip');
        strip.setAttribute('aria-label', 'Blocks in this module');
        var stripList = create('ol');
        blocks.forEach(function (block) {
            var item = create('li');
            var pill = link('#' + sectionId(block.id), '', 'block-pill');
            var tick = create('span', 'block-tick');
            tick.setAttribute('aria-hidden', 'true');
            pill.appendChild(tick);
            pill.appendChild(document.createTextNode(block.title));
            var doneText = create('span', 'visually-hidden');
            pill.appendChild(doneText);
            view.strip[block.id] = { pill: pill, tick: tick, doneText: doneText };
            item.appendChild(pill);
            stripList.appendChild(item);
        });
        strip.appendChild(stripList);
        content.appendChild(strip);

        // Block sections
        blocks.forEach(function (block) {
            var details = blockContent(module, block.id);
            var section = create('section', 'card module-block');
            section.id = sectionId(block.id);
            var heading = create('h2', '', block.title);
            heading.id = section.id + '-title';
            section.setAttribute('aria-labelledby', heading.id);
            section.appendChild(heading);

            var time = create('p', 'block-time');
            if (typeof details.minutes === 'number') {
                time.textContent = describeLength(details.minutes);
            } else {
                time.appendChild(toBeConfirmed('Time to be confirmed'));
            }
            section.appendChild(time);

            var body = create('div', 'block-body');
            if (details.html) {
                body.innerHTML = details.html;
                renderTexts(body, module);
                renderForm(body, module, details, content);
            } else {
                body.appendChild(create('p')).appendChild(toBeConfirmed('Content to be confirmed.'));
            }
            section.appendChild(body);

            if (details.quiz) {
                section.appendChild(window.HEGenAIQuiz.build(module.id, details.quiz, blocks));
            }

            var actions = create('div', 'block-actions');
            var toggle = create('button', 'pill-button pill-button-secondary mark-done');
            toggle.type = 'button';
            var toggleTick = create('span', 'mark-done-tick', '✓ ');
            toggleTick.setAttribute('aria-hidden', 'true');
            toggle.appendChild(toggleTick);
            toggle.appendChild(document.createTextNode('Mark as done'));
            toggle.setAttribute('aria-describedby', heading.id);
            toggle.addEventListener('click', function () {
                progress.toggleBlock(module.id, block.id);
            });
            var note = create('span', 'block-done-note', 'Done. Press again to undo.');
            actions.appendChild(toggle);
            actions.appendChild(note);
            section.appendChild(actions);
            view.toggles[block.id] = toggle;
            view.notes[block.id] = note;

            content.appendChild(section);
        });

        // Sources and credits
        var sources = create('section', 'card module-sources');
        sources.id = SOURCES_ID;
        sources.appendChild(create('h2', '', 'Sources and credits'));
        var sourcesBody = create('div', 'block-body');
        if (module.sources) {
            sourcesBody.innerHTML = module.sources;
        } else {
            sourcesBody.appendChild(create('p')).appendChild(toBeConfirmed('Sources and credits to be confirmed.'));
        }
        sources.appendChild(sourcesBody);
        content.appendChild(sources);

        content.appendChild(renderPager(module));

        // Narrow screens follow this order: outcome, "Before you start", contents
        // menu, blocks. Wide screens put the side column on the right, so keyboard
        // users still reach the contents panel before the blocks.
        var side = create('div', 'module-side');
        if (module.audience || module.needs) side.appendChild(renderFacts(module));
        side.appendChild(panel);
        layout.appendChild(renderOutcomeCard(module, true));
        layout.appendChild(side);
        layout.appendChild(mobileContents);
        layout.appendChild(content);
        page.appendChild(layout);

        function updateProgress() {
            var doneCount = 0;
            var next = null;
            blocks.forEach(function (block) {
                var done = progress.isBlockDone(module.id, block.id);
                if (done) doneCount += 1;
                else if (!next) next = block;

                var stripItem = view.strip[block.id];
                stripItem.tick.textContent = done ? '✓ ' : '';
                stripItem.doneText.textContent = done ? ' (done)' : '';
                stripItem.pill.classList.toggle('is-done', done);

                view.toggles[block.id].setAttribute('aria-pressed', done ? 'true' : 'false');
                view.notes[block.id].hidden = !done;
            });

            view.standingCount.textContent = doneCount === 0
                ? 'Not started'
                : doneCount + ' of ' + blocks.length + ' blocks done';
            view.standingFill.style.width = (doneCount / blocks.length * 100) + '%';
            view.standingBar.setAttribute('aria-valuenow', String(doneCount));

            view.standingNext.textContent = '';
            if (next) {
                view.standingNext.appendChild(document.createTextNode('Continue with: '));
                view.standingNext.appendChild(link('#' + sectionId(next.id), next.title));
            } else {
                view.standingNext.textContent = 'All blocks done.';
            }
        }

        updateProgress();
        progress.onChange(updateProgress);
        watchSectionInView(entries, view);
    }

    function renderPager(module) {
        var pager = create('nav', 'module-pager');
        pager.setAttribute('aria-label', 'Other modules');

        function addLink(href, label, title, className) {
            var anchor = link(href, '', 'pager-link ' + className);
            anchor.appendChild(create('span', 'pager-label', label));
            anchor.appendChild(create('span', 'pager-title', title));
            pager.appendChild(anchor);
        }

        // A module outside a cluster stands on its own, so it points back to the list.
        if (!module.cluster) {
            addLink('modules.html', 'Next:', 'See more modules', 'pager-next');
            return pager;
        }

        var ordered = data.modules.slice().sort(function (a, b) {
            return a.number - b.number;
        });
        var index = ordered.indexOf(module);
        [[ordered[index - 1], 'Previous module', 'pager-previous'],
         [ordered[index + 1], 'Next module', 'pager-next']].forEach(function (item) {
            var neighbour = item[0];
            if (!neighbour) return;
            addLink(moduleUrl(neighbour), item[1],
                'Module ' + neighbour.number + ': ' + neighbour.title +
                (neighbour.status === 'available' ? '' : ' (coming soon)'),
                item[2]);
        });
        return pager;
    }

    // The strip at the top of the window that the sticky header covers,
    // plus the same 16px margin as scroll-padding-top in style.css.
    function headerClearance() {
        var header = document.querySelector('.site-header');
        return (header ? header.offsetHeight : 0) + 16;
    }

    // Marks the section in view in the contents lists.
    function watchSectionInView(entries, view) {
        if (!('IntersectionObserver' in window)) return;
        var visible = {};

        function mark(currentId) {
            view.contentsLinks.forEach(function (anchor) {
                var isCurrent = anchor.getAttribute('data-target') === currentId;
                anchor.classList.toggle('is-current', isCurrent);
                if (isCurrent) anchor.setAttribute('aria-current', 'true');
                else anchor.removeAttribute('aria-current');
            });
        }

        var observer = new IntersectionObserver(function (changes) {
            changes.forEach(function (change) {
                visible[change.target.id] = change.isIntersecting;
            });
            var current = entries.filter(function (entry) {
                return visible[entry.id];
            })[0];
            if (current) mark(current.id);
        }, { rootMargin: '-' + headerClearance() + 'px 0px -50% 0px' });

        entries.forEach(function (entry) {
            var section = document.getElementById(entry.id);
            if (section) observer.observe(section);
        });
    }

    var module = findModule(readModuleId());
    if (!module) {
        renderNotFound();
    } else if (module.status !== 'available') {
        setTitle(module.title);
        renderComingSoon(module);
    } else {
        setTitle(module.title);
        renderModule(module);
    }
})();

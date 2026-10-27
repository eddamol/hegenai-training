// Module materials: texts such as a sample case that trainees can open beside
// the blocks. Exposes window.HEGenAIResources:
//   setup(resources)   the module's resources, [{ id, title, html }]
//   has(id)            whether the module has that resource
//   open(id, opener)   shows the resource; focus goes back to opener on close
// Any element with data-open-resource="<id>" opens that resource when selected.
// A link with data-open-image opens the picture it links to, with data-title as
// the heading and data-alt (or the alt of the image inside the link) as its text.
// Wide screens show it in a panel on the right that leaves the page usable;
// narrow screens show it full screen.
(function () {
    var wideScreen = window.matchMedia('(min-width: 1100px)');
    var resources = [];
    var panel, heading, body;
    var opener = null;
    var switchingMode = false;

    function create(tag, className, text) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function find(id) {
        return resources.filter(function (resource) {
            return resource.id === id;
        })[0];
    }

    function buildPanel() {
        panel = create('dialog', 'resource-panel');
        panel.setAttribute('aria-labelledby', 'resource-panel-title');

        var top = create('div', 'resource-panel-top');
        heading = create('h2', 'resource-panel-title');
        heading.id = 'resource-panel-title';
        heading.tabIndex = -1;
        top.appendChild(heading);
        var close = create('button', 'pill-button pill-button-secondary resource-panel-close', 'Close');
        close.type = 'button';
        close.addEventListener('click', function () {
            panel.close();
        });
        top.appendChild(close);
        panel.appendChild(top);

        body = create('div', 'block-body resource-panel-body');
        panel.appendChild(body);

        panel.addEventListener('close', function () {
            if (switchingMode) {
                switchingMode = false;
                return;
            }
            document.body.classList.remove('has-resource-panel');
            if (opener && document.body.contains(opener)) opener.focus();
            opener = null;
        });

        // After main, so the panel comes between the page content and the footer in tab order.
        var main = document.getElementById('main');
        if (main) main.parentNode.insertBefore(panel, main.nextSibling);
        else document.body.appendChild(panel);
    }

    function show() {
        if (wideScreen.matches) {
            panel.show();
        } else {
            panel.showModal();
        }
        document.body.classList.toggle('has-resource-panel', wideScreen.matches);
    }

    function open(id, from) {
        var resource = find(id);
        if (!resource) return;
        present(resource.title, from).innerHTML = resource.html;
    }

    function openImage(src, alt, title, from) {
        var picture = create('img', 'resource-image');
        picture.src = src;
        picture.alt = alt || '';
        var target = present(title || alt || '', from);
        target.appendChild(picture);
        // Wide pictures are small in the panel, so offer the file itself too.
        var fullSize = create('a', '', 'Open full size');
        fullSize.href = src;
        fullSize.target = '_blank';
        fullSize.rel = 'noopener noreferrer';
        target.appendChild(create('p', 'resource-image-link')).appendChild(fullSize);
    }

    // Opens the panel with a new heading and an empty body, and returns the body.
    function present(title, from) {
        if (!panel) buildPanel();
        heading.textContent = title;
        body.textContent = '';
        panel.scrollTop = 0;
        opener = from || document.activeElement;
        if (!panel.open) show();
        heading.focus();
        return body;
    }

    document.addEventListener('click', function (event) {
        if (!event.target.closest) return;
        var trigger = event.target.closest('[data-open-resource]');
        if (trigger) {
            event.preventDefault();
            open(trigger.getAttribute('data-open-resource'), trigger);
            return;
        }
        // Ctrl, Cmd or Shift click still opens the picture in a new tab or window.
        var imageLink = event.target.closest('a[data-open-image]');
        if (!imageLink || event.ctrlKey || event.metaKey || event.shiftKey) return;
        event.preventDefault();
        var inner = imageLink.querySelector('img');
        openImage(imageLink.getAttribute('href'),
            imageLink.getAttribute('data-alt') || (inner ? inner.alt : ''),
            imageLink.getAttribute('data-title'), imageLink);
    });

    // A modal dialog closes itself on Esc; the side panel needs it done here.
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && panel && panel.open && wideScreen.matches) {
            panel.close();
        }
    });

    // Moving between wide and narrow switches the panel between side panel and full screen.
    wideScreen.addEventListener('change', function () {
        if (!panel || !panel.open) return;
        switchingMode = true;
        panel.close();
        show();
    });

    window.HEGenAIResources = {
        setup: function (list) {
            resources = Array.isArray(list) ? list : [];
        },
        has: function (id) {
            return Boolean(find(id));
        },
        open: open
    };
})();

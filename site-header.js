// The site header on narrow screens: folds the main navigation behind a menu
// button, and slides the header away while scrolling down. Without JavaScript
// the navigation stays visible and the header stays put.
(function () {
    var header = document.querySelector('.site-header');
    var button = document.querySelector('.menu-button');
    var nav = document.getElementById('site-nav');
    if (!header || !button || !nav) return;

    // Keep in step with the max-width breakpoint for the header in style.css.
    var narrowScreen = window.matchMedia('(max-width: 720px)');

    // Scrolling less than this does not hide or show the header, to avoid jitter.
    var SCROLL_THRESHOLD = 8;

    function isOpen() {
        return button.getAttribute('aria-expanded') === 'true';
    }

    function setOpen(open) {
        button.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('is-open', open);
        if (open) showHeader();
    }

    function showHeader() {
        header.classList.remove('is-hidden');
    }

    header.classList.add('has-menu');
    button.hidden = false;

    button.addEventListener('click', function () {
        setOpen(!isOpen());
    });

    nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            button.focus();
        }
    });

    document.addEventListener('click', function (event) {
        if (isOpen() && !nav.contains(event.target) && !button.contains(event.target)) {
            setOpen(false);
        }
    });

    narrowScreen.addEventListener('change', function () {
        if (!narrowScreen.matches) {
            setOpen(false);
            showHeader();
        }
    });

    window.addEventListener('hashchange', function () {
        setOpen(false);
    });

    // Hide on scroll down, show on scroll up. Always shown near the top of the
    // page, while the menu is open, and while focus is inside the header.
    var lastScrollY = window.scrollY;
    var updateQueued = false;

    function updateOnScroll() {
        updateQueued = false;
        var scrollY = Math.max(window.scrollY, 0);

        if (!narrowScreen.matches || isOpen() || header.contains(document.activeElement) ||
                scrollY <= header.offsetHeight) {
            showHeader();
            lastScrollY = scrollY;
            return;
        }

        if (Math.abs(scrollY - lastScrollY) < SCROLL_THRESHOLD) return;
        header.classList.toggle('is-hidden', scrollY > lastScrollY);
        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', function () {
        if (!updateQueued) {
            updateQueued = true;
            window.requestAnimationFrame(updateOnScroll);
        }
    }, { passive: true });

    header.addEventListener('focusin', showHeader);
})();

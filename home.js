// The block cards on the landing page: one panel open at a time, Intro first.
// Clicking the open card closes it. Arrow keys, Home and End move between cards.
(function () {
    var flow = document.querySelector('.block-flow');
    if (!flow) return;

    var cards = Array.prototype.slice.call(flow.querySelectorAll('.block-card'));

    function panelFor(card) {
        return document.getElementById(card.getAttribute('aria-controls'));
    }

    // Moves the panel's pointer under the middle of its card.
    function pointAt(card) {
        var panel = panelFor(card);
        var cardBox = card.getBoundingClientRect();
        var panelBox = panel.getBoundingClientRect();
        panel.style.setProperty('--pointer-x', (cardBox.left + cardBox.width / 2 - panelBox.left) + 'px');
    }

    function openCard() {
        return cards.filter(function (card) {
            return card.getAttribute('aria-expanded') === 'true';
        })[0];
    }

    function open(cardToOpen) {
        cards.forEach(function (card) {
            var isOpen = card === cardToOpen;
            card.setAttribute('aria-expanded', String(isOpen));
            panelFor(card).hidden = !isOpen;
        });
        if (cardToOpen) pointAt(cardToOpen);
    }

    window.addEventListener('resize', function () {
        var card = openCard();
        if (card) pointAt(card);
    });

    cards.forEach(function (card, index) {
        card.addEventListener('click', function () {
            open(card.getAttribute('aria-expanded') === 'true' ? null : card);
        });

        card.addEventListener('keydown', function (event) {
            var target;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                target = cards[(index + 1) % cards.length];
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                target = cards[(index - 1 + cards.length) % cards.length];
            } else if (event.key === 'Home') {
                target = cards[0];
            } else if (event.key === 'End') {
                target = cards[cards.length - 1];
            }
            if (target) {
                event.preventDefault();
                target.focus();
            }
        });
    });

    flow.classList.add('is-enhanced');
    open(cards[0]);
})();

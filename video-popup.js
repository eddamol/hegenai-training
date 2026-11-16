// Shows a module video larger, in a pop-up. Any element with
// data-open-video="<path to the video>" opens it; data-title is the heading.
// The inline video is paused and the pop-up continues from the same point.
(function () {
    var dialog, heading, player;

    function create(tag, className, text) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function build() {
        dialog = create('dialog', 'video-popup');
        dialog.setAttribute('aria-labelledby', 'video-popup-title');

        var top = create('div', 'video-popup-top');
        heading = create('h2', 'video-popup-title');
        heading.id = 'video-popup-title';
        top.appendChild(heading);
        var close = create('button', 'pill-button pill-button-secondary', 'Close');
        close.type = 'button';
        close.addEventListener('click', function () {
            dialog.close();
        });
        top.appendChild(close);
        dialog.appendChild(top);

        player = create('video', 'video-popup-player');
        player.controls = true;
        player.preload = 'metadata';
        dialog.appendChild(player);

        // A click on the dark area outside the pop-up closes it.
        dialog.addEventListener('click', function (event) {
            if (event.target === dialog) dialog.close();
        });

        dialog.addEventListener('close', function () {
            player.pause();
            player.removeAttribute('src');
            player.load();
        });

        document.body.appendChild(dialog);
    }

    document.addEventListener('click', function (event) {
        if (!event.target.closest) return;
        var trigger = event.target.closest('[data-open-video]');
        if (!trigger) return;
        event.preventDefault();
        if (!dialog) build();

        var inline = trigger.closest('.video-with-popup');
        inline = inline ? inline.querySelector('video') : null;
        var startAt = inline ? inline.currentTime : 0;
        if (inline) inline.pause();

        heading.textContent = trigger.getAttribute('data-title') || '';
        player.src = trigger.getAttribute('data-open-video');
        player.addEventListener('loadedmetadata', function onReady() {
            player.removeEventListener('loadedmetadata', onReady);
            if (startAt) player.currentTime = startAt;
        });
        dialog.showModal();
        player.focus();
    });
})();

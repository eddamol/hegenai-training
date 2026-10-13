// On the landing page, show the title in the header only once the main
// heading has scrolled up behind it. Without JavaScript the title stays visible.
(function () {
    var header = document.querySelector('.site-header');
    var heading = document.querySelector('.hero h1');
    if (!header || !heading) return;

    function update() {
        var headingIsBehindHeader = heading.getBoundingClientRect().bottom <= header.offsetHeight;
        header.classList.toggle('site-header-title-hidden', !headingIsBehindHeader);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
})();

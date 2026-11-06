// The "Certificate" section at the end of a module with certificate: true in modules-data.js.
// Once every block is marked as done, the trainee types their name and downloads a PDF
// certificate of completion. The PDF is made in the browser with jsPDF (assets/vendor,
// MIT licence), loaded only when the button is pressed. Nothing is sent anywhere and the
// name is not saved.
// Exposes window.HEGenAICertificate.build(module, blocks) -> <section>.
(function () {
    var JSPDF_SRC = 'assets/vendor/jspdf.umd.min.js';
    var SITE = 'HEGenAI Training';
    var FOOTNOTE = 'Self-issued on completing the online module. HEGenAI Training is a research and training pilot; this certificate is not a formal academic credit.';
    var FUNDING = 'HEGenAI is funded by the European Union (Erasmus+). Views and opinions expressed are those of the authors only.';

    function create(tag, className, text) {
        var element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    var loading = null;
    function loadJsPDF() {
        if (window.jspdf) return Promise.resolve(window.jspdf);
        if (loading) return loading;
        loading = new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = JSPDF_SRC;
            script.onload = function () { resolve(window.jspdf); };
            script.onerror = function () { loading = null; reject(new Error('jsPDF did not load')); };
            document.head.appendChild(script);
        });
        return loading;
    }

    // The standard PDF fonts only cover Latin letters (Windows-1252).
    function latinOnly(text) {
        return /^[ -~ -ÿ‘’“”–—]*$/.test(text);
    }

    function formatDate(date) {
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function makePdf(jspdf, module, name, practice) {
        var doc = new jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        var width = 297;
        var centre = width / 2;
        var red = [138, 37, 48];

        doc.setDrawColor(red[0], red[1], red[2]);
        doc.setLineWidth(1.2);
        doc.rect(10, 10, width - 20, 190);
        doc.setLineWidth(0.3);
        doc.rect(14, 14, width - 28, 182);

        doc.setTextColor(red[0], red[1], red[2]);
        doc.setFont('times', 'bold');
        doc.setFontSize(16);
        doc.text(SITE, centre, 34, { align: 'center' });

        doc.setFontSize(32);
        doc.text('Certificate of Completion', centre, 56, { align: 'center' });

        doc.setTextColor(40, 40, 40);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(13);
        doc.text('This is to confirm that', centre, 74, { align: 'center' });

        doc.setFont('times', 'bold');
        doc.setFontSize(28);
        doc.text(name, centre, 92, { align: 'center' });
        doc.setLineWidth(0.3);
        doc.line(centre - 70, 96, centre + 70, 96);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(13);
        doc.text('has completed the module', centre, 110, { align: 'center' });

        doc.setFont('times', 'bold');
        doc.setFontSize(18);
        var title = doc.splitTextToSize((module.number ? 'Module ' + module.number + ': ' : '') + module.title, 220);
        doc.text(title, centre, 122, { align: 'center' });

        var y = 122 + title.length * 8 + 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        var outcome = doc.splitTextToSize(module.outcome.replace(/^After this module, you can/, 'Learning outcome: can'), 220);
        doc.text(outcome, centre, y, { align: 'center' });
        y += outcome.length * 5.5 + 4;

        if (practice) {
            doc.setFont('helvetica', 'bold');
            doc.text('and has used the teaching tool in their own teaching and completed the practice log (self-declared).', centre, y, { align: 'center' });
            y += 8;
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text('Date: ' + formatDate(new Date()), centre, Math.max(y + 6, 166), { align: 'center' });

        doc.setFontSize(8);
        doc.setTextColor(90, 90, 90);
        doc.text(FOOTNOTE, centre, 184, { align: 'center' });
        doc.text(FUNDING, centre, 189, { align: 'center' });

        var file = 'certificate-' + module.id + '-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.pdf';
        doc.save(file);
    }

    function build(module, blocks) {
        var progress = window.HEGenAIProgress;
        var section = create('section', 'card module-certificate');
        section.id = 'certificate';
        section.appendChild(create('h2', '', 'Certificate'));
        var body = create('div', 'block-body');
        section.appendChild(body);

        var locked = create('p', 'certificate-locked');
        body.appendChild(locked);

        var form = create('form', 'trainee-form certificate-form');
        form.appendChild(create('p', '', 'Type your name as it should appear on the certificate, and download it as a PDF. Your name is not saved or sent anywhere.'));

        var group = create('div', 'form-group');
        var label = create('label', 'form-label', 'Your name');
        label.htmlFor = 'certificate-name';
        var input = create('input', 'form-control');
        input.type = 'text';
        input.id = 'certificate-name';
        input.autocomplete = 'name';
        input.maxLength = 60;
        group.appendChild(label);
        group.appendChild(input);
        form.appendChild(group);

        var practiceLabel = create('label', 'tick-item');
        var practiceBox = create('input');
        practiceBox.type = 'checkbox';
        practiceLabel.appendChild(practiceBox);
        practiceLabel.appendChild(create('span', 'tick-text', 'I have also used the teaching tool in my teaching and completed the practice log. (Adds a line saying so, marked self-declared.)'));
        form.appendChild(practiceLabel);

        var button = create('button', 'pill-button', 'Download certificate (PDF)');
        button.type = 'submit';
        var status = create('p', 'form-status');
        status.setAttribute('role', 'status');
        form.appendChild(button);
        form.appendChild(status);
        body.appendChild(form);

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var name = input.value.replace(/\s+/g, ' ').trim();
            if (!name) {
                status.textContent = 'Type your name first.';
                input.focus();
                return;
            }
            if (!latinOnly(name)) {
                status.textContent = 'The certificate can only use Latin letters. Please type your name in Latin letters.';
                return;
            }
            status.textContent = 'Making your certificate…';
            loadJsPDF().then(function (jspdf) {
                makePdf(jspdf, module, name, practiceBox.checked);
                status.textContent = 'Downloaded.';
            }, function () {
                status.textContent = 'The certificate could not be made. Reload the page and try again.';
            });
        });

        function update() {
            var done = progress ? progress.blocksDone(module.id) : [];
            var count = blocks.filter(function (block) {
                return done.indexOf(block.id) !== -1;
            }).length;
            var complete = count === blocks.length;
            form.hidden = !complete;
            locked.hidden = complete;
            locked.textContent = 'Mark all ' + blocks.length + ' blocks as done to get your certificate of completion. Done so far: ' + count + ' of ' + blocks.length + '.';
        }
        if (progress) progress.onChange(update);
        update();
        return section;
    }

    window.HEGenAICertificate = { build: build };
})();

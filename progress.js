// Remembers which blocks a visitor has marked as done and which self-check
// answers they gave. Everything stays in this browser's localStorage; nothing
// is sent anywhere. Nothing is written until the visitor clicks something.
//
// Stored shape, under "hegenai:progress:v1":
//   { "<moduleId>": { blocks: { "<blockId>": "<ISO time>" },
//                     answers: { "<questionId>": { picked: 2, correct: true } } } }
(function () {
    var STORAGE_KEY = 'hegenai:progress:v1';
    var listeners = [];
    // Copy kept in memory, so ticks still work on the page if storage is blocked.
    var memory = {};

    function has(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }

    function load() {
        try {
            var raw = window.localStorage.getItem(STORAGE_KEY);
            var parsed = raw ? JSON.parse(raw) : {};
            memory = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
        } catch (error) {
            // Storage blocked or unreadable: carry on with the in-memory copy.
        }
        return memory;
    }

    function save(data) {
        memory = data;
        try {
            if (Object.keys(data).length === 0) {
                window.localStorage.removeItem(STORAGE_KEY);
            } else {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            }
        } catch (error) {
            // Storage blocked or full: the change lasts until the page is closed.
        }
        notify();
    }

    function notify() {
        listeners.slice().forEach(function (listener) {
            try {
                listener();
            } catch (error) {
                // One faulty listener should not stop the others.
            }
        });
    }

    function moduleEntry(data, moduleId) {
        if (!has(data, moduleId) || typeof data[moduleId] !== 'object' || data[moduleId] === null) {
            data[moduleId] = {};
        }
        return data[moduleId];
    }

    function section(entry, name) {
        if (!has(entry, name) || typeof entry[name] !== 'object' || entry[name] === null) {
            entry[name] = {};
        }
        return entry[name];
    }

    function dropEmpty(data, moduleId) {
        var entry = data[moduleId];
        if (entry && !Object.keys(entry.blocks || {}).length && !Object.keys(entry.answers || {}).length) {
            delete data[moduleId];
        }
    }

    function isBlockDone(moduleId, blockId) {
        var data = load();
        return has(data, moduleId) && !!data[moduleId].blocks && has(data[moduleId].blocks, blockId);
    }

    // Returns the ids of the blocks marked as done, as an array.
    function blocksDone(moduleId) {
        var data = load();
        if (!has(data, moduleId) || !data[moduleId].blocks) return [];
        return Object.keys(data[moduleId].blocks);
    }

    // Marks the block done, or not done if it already was. Returns the new state.
    function toggleBlock(moduleId, blockId) {
        var data = load();
        var blocks = section(moduleEntry(data, moduleId), 'blocks');
        var nowDone = !has(blocks, blockId);
        if (nowDone) {
            blocks[blockId] = new Date().toISOString();
        } else {
            delete blocks[blockId];
            dropEmpty(data, moduleId);
        }
        save(data);
        return nowDone;
    }

    function recordAnswer(moduleId, questionId, picked, correct) {
        var data = load();
        section(moduleEntry(data, moduleId), 'answers')[questionId] = { picked: picked, correct: !!correct };
        save(data);
    }

    // Returns a copy: question id -> { picked, correct }.
    function getAnswers(moduleId) {
        var data = load();
        if (!has(data, moduleId) || !data[moduleId].answers) return {};
        return JSON.parse(JSON.stringify(data[moduleId].answers));
    }

    function reset() {
        save({});
    }

    // Calls fn after any change, including one made in another tab.
    // Returns a function that stops the calls.
    function onChange(fn) {
        listeners.push(fn);
        return function () {
            listeners = listeners.filter(function (listener) {
                return listener !== fn;
            });
        };
    }

    window.addEventListener('storage', function (event) {
        if (event.key === STORAGE_KEY || event.key === null) {
            notify();
        }
    });

    window.HEGenAIProgress = {
        isBlockDone: isBlockDone,
        toggleBlock: toggleBlock,
        blocksDone: blocksDone,
        recordAnswer: recordAnswer,
        getAnswers: getAnswers,
        reset: reset,
        onChange: onChange
    };
})();

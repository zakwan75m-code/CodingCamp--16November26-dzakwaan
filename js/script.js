/* ==========================
   LIFE DASHBOARD
   Vanilla JavaScript
   ========================== */

(function () {
    "use strict";

    // ---------- DOM ELEMENTS ----------
    const elements = {
        greetingText: document.getElementById("greetingText"),
        currentDate: document.getElementById("currentDate"),
        currentTime: document.getElementById("currentTime"),
        nameForm: document.getElementById("nameForm"),
        userName: document.getElementById("userName"),

        timer: document.getElementById("timer"),
        timerStatus: document.getElementById("timerStatus"),
        startTimer: document.getElementById("startTimer"),
        stopTimer: document.getElementById("stopTimer"),
        resetTimer: document.getElementById("resetTimer"),

        taskForm: document.getElementById("taskForm"),
        taskInput: document.getElementById("taskInput"),
        taskList: document.getElementById("taskList"),
        taskSummary: document.getElementById("taskSummary"),

        linkForm: document.getElementById("linkForm"),
        linkName: document.getElementById("linkName"),
        linkUrl: document.getElementById("linkUrl"),
        linkList: document.getElementById("linkList"),

        themeToggle: document.getElementById("themeToggle"),
        themeLabel: document.getElementById("themeLabel"),
        themeIcon: document.querySelector(".theme-icon"),
        toast: document.getElementById("toast")
    };

    // ---------- STORAGE HELPERS ----------
    function readStorage(key, fallbackValue) {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue === null ? fallbackValue : JSON.parse(storedValue);
        } catch (error) {
            console.warn("Tidak dapat membaca Local Storage:", error);
            return fallbackValue;
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn("Tidak dapat menyimpan ke Local Storage:", error);
            showToast("Penyimpanan browser tidak tersedia. Perubahan mungkin tidak tersimpan.");
            return false;
        }
    }

    function createId() {
        if (window.crypto && typeof window.crypto.randomUUID === "function") {
            return window.crypto.randomUUID();
        }
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    // ---------- TOAST MESSAGE ----------
    let toastTimeout;

    function showToast(message) {
        elements.toast.textContent = message;
        elements.toast.classList.add("is-visible");

        window.clearTimeout(toastTimeout);
        toastTimeout = window.setTimeout(function () {
            elements.toast.classList.remove("is-visible");
        }, 2800);
    }

    // ---------- GREETING, DATE, AND WIB CLOCK ----------
    function readUserName() {
        try {
            const savedName = localStorage.getItem("userName");
            if (savedName === null) return "";

            try {
                const parsedName = JSON.parse(savedName);
                return typeof parsedName === "string" ? parsedName : "";
            } catch (error) {
                // Migrate the plain-text name saved by the previous version.
                return savedName;
            }
        } catch (error) {
            console.warn("Tidak dapat membaca nama dari Local Storage:", error);
            return "";
        }
    }

    let userName = readUserName();
    elements.userName.value = userName;

    function updateClock() {
        const now = new Date();

        const time = new Intl.DateTimeFormat("id-ID", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23"
        }).format(now);

        const date = new Intl.DateTimeFormat("id-ID", {
            timeZone: "Asia/Jakarta",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(now);

        const hour = Number(new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Jakarta",
            hour: "numeric",
            hourCycle: "h23"
        }).format(now));

        let greeting;

        if (hour < 11) {
            greeting = "Selamat pagi";
        } else if (hour < 15) {
            greeting = "Selamat siang";
        } else if (hour < 18) {
            greeting = "Selamat sore";
        } else {
            greeting = "Selamat malam";
        }

        elements.currentDate.textContent = date;
        elements.currentTime.textContent = time;
        elements.greetingText.textContent = userName
            ? greeting + ", " + userName + "!"
            : greeting + "!";
    }

    elements.nameForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newName = elements.userName.value.trim();

        if (!newName) {
            showToast("Silakan masukkan nama terlebih dahulu.");
            elements.userName.focus();
            return;
        }

        if (newName.length > 40) {
            showToast("Nama maksimal 40 karakter.");
            return;
        }

        userName = newName;

        try {
            localStorage.setItem("userName", JSON.stringify(userName));
            updateClock();
            showToast("Nama berhasil disimpan.");
        } catch (error) {
            console.warn("Nama tidak dapat disimpan:", error);
            updateClock();
            showToast("Nama digunakan, tetapi tidak dapat disimpan di browser.");
        }
    });

    updateClock();
    window.setInterval(updateClock, 1000);

    // ---------- FOCUS TIMER ----------
    const FOCUS_DURATION = 25 * 60;
    const savedTimer = readStorage("focusTimer", null);

    let remainingSeconds = FOCUS_DURATION;
    let timerInterval = null;
    let timerEndTime = null;

    if (
        savedTimer &&
        typeof savedTimer.remainingSeconds === "number" &&
        Number.isFinite(savedTimer.remainingSeconds)
    ) {
        remainingSeconds = Math.max(
            0,
            Math.min(FOCUS_DURATION, Math.ceil(savedTimer.remainingSeconds))
        );
    }

    function saveTimerState(isRunning) {
        writeStorage("focusTimer", {
            remainingSeconds: remainingSeconds,
            running: isRunning,
            endTime: isRunning ? timerEndTime : null
        });
    }

    function renderTimer() {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        elements.timer.textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");
    }

    function stopTimerInterval() {
        if (timerInterval !== null) {
            window.clearInterval(timerInterval);
            timerInterval = null;
        }
        timerEndTime = null;
    }

    function completeTimer() {
        stopTimerInterval();
        remainingSeconds = 0;
        renderTimer();
        saveTimerState(false);
        elements.timerStatus.textContent = "Sesi fokus selesai. Kerja bagus!";
        showToast("Waktu fokus 25 menit selesai!");
    }

    function tickTimer() {
        if (timerEndTime === null) return;

        remainingSeconds = Math.max(
            0,
            Math.ceil((timerEndTime - Date.now()) / 1000)
        );
        renderTimer();

        if (remainingSeconds <= 0) {
            completeTimer();
        }
    }

    function startTimerInterval() {
        timerEndTime = Date.now() + remainingSeconds * 1000;
        saveTimerState(true);
        elements.timerStatus.textContent = "Sedang fokus. Semangat!";
        timerInterval = window.setInterval(tickTimer, 250);
        tickTimer();
    }

    elements.startTimer.addEventListener("click", function () {
        if (timerInterval !== null) return;

        if (remainingSeconds <= 0) {
            showToast("Tekan Atur ulang untuk memulai sesi baru.");
            return;
        }

        startTimerInterval();
    });

    elements.stopTimer.addEventListener("click", function () {
        if (timerInterval === null) {
            elements.timerStatus.textContent = "Timer sedang dijeda.";
            return;
        }

        tickTimer();

        if (timerInterval !== null) {
            stopTimerInterval();
            saveTimerState(false);
            elements.timerStatus.textContent = "Timer dijeda. Lanjutkan saat siap.";
        }
    });

    elements.resetTimer.addEventListener("click", function () {
        stopTimerInterval();
        remainingSeconds = FOCUS_DURATION;
        renderTimer();
        saveTimerState(false);
        elements.timerStatus.textContent = "Siap untuk fokus?";
        showToast("Timer diatur ulang ke 25:00.");
    });

    // Visual state: only the most recently clicked Focus Timer button is white.
    const timerActions = document.querySelector(".timer-actions");
    if (timerActions) {
        timerActions.addEventListener("click", function (event) {
            const clickedButton = event.target.closest("button");
            if (!clickedButton || !timerActions.contains(clickedButton)) return;

            timerActions.querySelectorAll("button").forEach(function (button) {
                button.classList.toggle("is-selected", button === clickedButton);
            });
        });
    }

    // Restore a running or paused timer after refreshing the page.
    if (
        savedTimer &&
        savedTimer.running === true &&
        typeof savedTimer.endTime === "number"
    ) {
        timerEndTime = savedTimer.endTime;
        remainingSeconds = Math.max(
            0,
            Math.ceil((timerEndTime - Date.now()) / 1000)
        );

        if (remainingSeconds > 0) {
            renderTimer();
            elements.timerStatus.textContent = "Melanjutkan sesi fokus sebelumnya.";
            timerInterval = window.setInterval(tickTimer, 250);
            tickTimer();
        } else {
            remainingSeconds = 0;
            renderTimer();
            completeTimer();
        }
    } else {
        renderTimer();

        if (remainingSeconds > 0 && remainingSeconds < FOCUS_DURATION) {
            elements.timerStatus.textContent = "Timer dijeda. Lanjutkan saat siap.";
        } else if (remainingSeconds === 0) {
            elements.timerStatus.textContent = "Sesi fokus selesai. Atur ulang untuk memulai lagi.";
        }

        saveTimerState(false);
    }

    // ---------- TO-DO LIST ----------
    const storedTasks = readStorage("tasks", []);
    let tasks = Array.isArray(storedTasks)
        ? storedTasks.filter(function (task) {
            return task &&
                typeof task.id === "string" &&
                typeof task.text === "string" &&
                typeof task.completed === "boolean";
        })
        : [];

    function saveTasks() {
        return writeStorage("tasks", tasks);
    }

    function updateTaskSummary() {
        const completedCount = tasks.filter(function (task) {
            return task.completed;
        }).length;

        elements.taskSummary.textContent =
            completedCount + " dari " + tasks.length + " tugas selesai";
    }

    function renderTasks() {
        elements.taskList.replaceChildren();

        if (tasks.length === 0) {
            const emptyItem = document.createElement("li");
            emptyItem.className = "empty-state";
            emptyItem.textContent = "Belum ada tugas. Tambahkan tugas pertamamu!";
            elements.taskList.appendChild(emptyItem);
            updateTaskSummary();
            return;
        }

        tasks.forEach(function (task) {
            const item = document.createElement("li");
            item.className = "task-item";
            if (task.completed) {
                item.classList.add("is-completed");
            }

            const checkbox = document.createElement("input");
            checkbox.className = "task-checkbox";
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute("aria-label", "Tandai " + task.text + " selesai");

            checkbox.addEventListener("change", function () {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            const taskText = document.createElement("span");
            taskText.className = "task-text";
            taskText.textContent = task.text;

            const actions = document.createElement("div");
            actions.className = "item-actions";

            const editButton = document.createElement("button");
            editButton.className = "small-button";
            editButton.type = "button";
            editButton.textContent = "Edit";
            editButton.setAttribute("aria-label", "Edit tugas " + task.text);

            editButton.addEventListener("click", function () {
                const updatedText = window.prompt("Ubah nama tugas:", task.text);

                if (updatedText === null) {
                    return;
                }

                const cleanText = updatedText.trim();

                if (!cleanText) {
                    showToast("Nama tugas tidak boleh kosong.");
                    return;
                }

                if (cleanText.length > 120) {
                    showToast("Tugas maksimal 120 karakter.");
                    return;
                }

                const duplicate = tasks.some(function (otherTask) {
                    return otherTask.id !== task.id &&
                        otherTask.text.toLocaleLowerCase("id-ID") === cleanText.toLocaleLowerCase("id-ID");
                });

                if (duplicate) {
                    showToast("Tugas tersebut sudah ada.");
                    return;
                }

                task.text = cleanText;
                saveTasks();
                renderTasks();
                showToast("Tugas berhasil diperbarui.");
            });

            const deleteButton = document.createElement("button");
            deleteButton.className = "small-button delete-button";
            deleteButton.type = "button";
            deleteButton.textContent = "Hapus";
            deleteButton.setAttribute("aria-label", "Hapus tugas " + task.text);

            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter(function (otherTask) {
                    return otherTask.id !== task.id;
                });

                saveTasks();
                renderTasks();
                showToast("Tugas dihapus.");
            });

            actions.append(editButton, deleteButton);
            item.append(checkbox, taskText, actions);
            elements.taskList.appendChild(item);
        });

        updateTaskSummary();
    }

    elements.taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const text = elements.taskInput.value.trim();

        if (!text) {
            showToast("Tugas tidak boleh kosong.");
            elements.taskInput.focus();
            return;
        }

        if (text.length > 120) {
            showToast("Tugas maksimal 120 karakter.");
            return;
        }

        const duplicate = tasks.some(function (task) {
            return task.text.toLocaleLowerCase("id-ID") === text.toLocaleLowerCase("id-ID");
        });

        if (duplicate) {
            showToast("Tugas tersebut sudah ada.");
            return;
        }

        tasks.push({
            id: createId(),
            text: text,
            completed: false
        });

        saveTasks();
        renderTasks();
        elements.taskForm.reset();
        elements.taskInput.focus();
        showToast("Tugas berhasil ditambahkan.");
    });

    renderTasks();

    // ---------- QUICK LINKS ----------
    const storedLinks = readStorage("quickLinks", []);
    let links = Array.isArray(storedLinks)
        ? storedLinks.filter(function (link) {
            return link &&
                typeof link.id === "string" &&
                typeof link.name === "string" &&
                typeof link.url === "string";
        })
        : [];

    function saveLinks() {
        return writeStorage("quickLinks", links);
    }

    function renderLinks() {
        elements.linkList.replaceChildren();

        if (links.length === 0) {
            const emptyItem = document.createElement("li");
            emptyItem.className = "empty-state";
            emptyItem.textContent = "Belum ada tautan tersimpan.";
            elements.linkList.appendChild(emptyItem);
            return;
        }

        links.forEach(function (link) {
            const item = document.createElement("li");
            item.className = "link-item";

            const anchor = document.createElement("a");
            anchor.className = "link-anchor";
            anchor.textContent = link.name;
            anchor.href = link.url;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";

            const deleteButton = document.createElement("button");
            deleteButton.className = "small-button delete-button";
            deleteButton.type = "button";
            deleteButton.textContent = "Hapus";
            deleteButton.setAttribute("aria-label", "Hapus tautan " + link.name);

            deleteButton.addEventListener("click", function () {
                links = links.filter(function (otherLink) {
                    return otherLink.id !== link.id;
                });

                saveLinks();
                renderLinks();
                showToast("Tautan dihapus.");
            });

            item.append(anchor, deleteButton);
            elements.linkList.appendChild(item);
        });
    }

    elements.linkForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = elements.linkName.value.trim();
        const rawUrl = elements.linkUrl.value.trim();

        if (!name || !rawUrl) {
            showToast("Nama dan URL harus diisi.");
            return;
        }

        if (name.length > 50 || rawUrl.length > 500) {
            showToast("Nama maksimal 50 karakter dan URL maksimal 500 karakter.");
            return;
        }

        let parsedUrl;

        try {
            parsedUrl = new URL(rawUrl);
        } catch (error) {
            showToast("URL tidak valid. Gunakan alamat lengkap, misalnya https://example.com.");
            return;
        }

        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            showToast("Tautan hanya boleh menggunakan HTTP atau HTTPS.");
            return;
        }

        const duplicate = links.some(function (link) {
            return link.url.toLowerCase() === parsedUrl.href.toLowerCase();
        });

        if (duplicate) {
            showToast("Tautan tersebut sudah tersimpan.");
            return;
        }

        links.push({
            id: createId(),
            name: name,
            url: parsedUrl.href
        });

        saveLinks();
        renderLinks();
        elements.linkForm.reset();
        elements.linkName.focus();
        showToast("Tautan berhasil ditambahkan.");
    });

    renderLinks();

    // ---------- LIGHT / DARK MODE ----------
    let currentTheme = readStorage("theme", "light");

    if (currentTheme !== "dark" && currentTheme !== "light") {
        currentTheme = "light";
    }

    function applyTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute("data-theme", theme);

        const isDark = theme === "dark";
        elements.themeToggle.setAttribute("aria-pressed", String(isDark));
        elements.themeToggle.setAttribute(
            "aria-label",
            isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
        );
        elements.themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
        elements.themeIcon.textContent = isDark ? "☀" : "☾";
    }

    elements.themeToggle.addEventListener("click", function () {
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);

        try {
            localStorage.setItem("theme", JSON.stringify(nextTheme));
            showToast(nextTheme === "dark" ? "Mode gelap aktif." : "Mode terang aktif.");
        } catch (error) {
            console.warn("Tema tidak dapat disimpan:", error);
            showToast("Tema berubah, tetapi tidak dapat disimpan di browser.");
        }
    });

    applyTheme(currentTheme);
})();

# Requirements Document

## Introduction

Life Dashboard adalah aplikasi web "To-Do List Life Dashboard" yang dibuat sebagai mini project CodingCamp RevoU. Aplikasi ini membantu pengguna mengatur produktivitas harian melalui empat fitur utama: panel sapaan dengan jam dan tanggal real-time, fokus timer (pomodoro) dengan durasi awal 25 menit, daftar tugas (to-do list) yang tersimpan di browser, dan koleksi tautan cepat (quick links) ke website favorit.

Aplikasi ini dibangun menggunakan HTML5, CSS3, dan Vanilla JavaScript murni tanpa framework atau backend, dan menyimpan seluruh data menggunakan Browser Local Storage API. Aplikasi ini ditujukan untuk dipublikasikan melalui GitHub Pages dan harus berjalan di Chrome, Firefox, Edge, dan Safari.

Selain empat fitur wajib, aplikasi ini mengimplementasikan tepat tiga additional challenges: Light/Dark Mode, Custom Name in Greeting, dan Prevent Duplicate Tasks.

## Glossary

- **Life_Dashboard**: Aplikasi web utama "To-Do List Life Dashboard" yang menjadi sistem yang dikembangkan.
- **Greeting_Panel**: Komponen yang menampilkan jam real-time, tanggal, sapaan, dan nama pengguna.
- **Focus_Timer**: Komponen timer hitungan mundur dengan durasi awal 25 menit.
- **Todo_List**: Komponen daftar tugas yang mendukung tambah, edit, tandai selesai, dan hapus tugas.
- **Quick_Links**: Komponen yang menampilkan dan mengelola tautan website favorit pengguna.
- **Task_Validator**: Komponen yang memvalidasi tugas baru untuk mencegah duplikasi.
- **Theme_Manager**: Komponen yang mengatur Light Mode dan Dark Mode.
- **Local_Storage**: Browser Local Storage API yang digunakan untuk menyimpan data secara permanen di browser.
- **User**: Pengguna aplikasi Life_Dashboard.
- **Task**: Satu item tugas dalam Todo_List yang memiliki teks dan status selesai atau belum selesai.
- **Quick_Link**: Satu item tautan website di Quick_Links yang memiliki nama dan URL.
- **Default_Duration**: Durasi awal timer sebesar 25 menit yang digunakan oleh Focus_Timer.

## Requirements

### Requirement 1: Tech Stack and Architecture

**User Story:** As a developer, I want to build Life_Dashboard using HTML5, CSS3, and Vanilla JavaScript only, so that the application runs without a backend server or any JavaScript framework.

#### Acceptance Criteria

1. THE Life_Dashboard SHALL be built using HTML5 for document structure, CSS3 for styling, and Vanilla JavaScript (plain JavaScript with no external framework, library, transpiler, or build step) for application logic.
2. THE Life_Dashboard SHALL operate without any dependency on React, Vue, Angular, or any other JavaScript framework or library, identifiable by the absence of import statements, external script references, and declared package dependencies.
3. THE Life_Dashboard SHALL operate entirely on the client side, requiring no backend server, no server-side processing, and no network requests to external APIs to perform its core functions.
4. THE Life_Dashboard SHALL use Local_Storage as the sole client-side data persistence mechanism, excluding IndexedDB, SessionStorage, Cookies, and any server-side or file-based storage.

### Requirement 2: Folder Structure

**User Story:** As a developer, I want a specific folder structure with single CSS and JavaScript files, so that the project remains simple and easy to maintain.

#### Acceptance Criteria

1. THE Life_Dashboard SHALL contain an `index.html` file at the project root.
2. THE Life_Dashboard SHALL contain exactly one CSS file located at `css/style.css`.
3. THE Life_Dashboard SHALL contain exactly one JavaScript file located at `js/script.js`.
4. THE Life_Dashboard SHALL NOT include any CSS or JavaScript files with `.css` or `.js` extensions beyond `css/style.css` and `js/script.js` anywhere within the project directory.
5. THE Life_Dashboard SHALL include a `.kiro` folder located at the project root for project and submission purposes.

### Requirement 3: Browser Compatibility

**User Story:** As a user, I want Life_Dashboard to run in my preferred browser, so that I am not forced to use a specific browser.

#### Acceptance Criteria

1. THE Life_Dashboard SHALL render all UI elements visibly and without element overlap or truncation in the latest stable versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari.
2. THE Life_Dashboard SHALL respond to user input on all interactive controls in the latest stable versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari.
3. THE Life_Dashboard SHALL display all four feature panels without JavaScript console errors in the latest stable versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari.

### Requirement 4: Deployment via GitHub Pages

**User Story:** As a developer, I want to deploy Life_Dashboard using GitHub Pages, so that the application is publicly accessible on the web.

#### Acceptance Criteria

1. WHEN the Life_Dashboard repository is deployed to GitHub Pages, THE Life_Dashboard SHALL render the main dashboard view at the generated GitHub Pages URL within 5 seconds of page navigation, with CSS styling visually applied and all JavaScript-driven interactive elements responding to user input.
2. THE Life_Dashboard SHALL reference all assets (HTML, CSS, JavaScript) using relative paths, so that no file path modifications are required between local development and GitHub Pages deployment.

### Requirement 5: Real-time Clock in Greeting Panel

**User Story:** As a user, I want to see the current time displayed in real-time, so that I know the exact time while using Life_Dashboard.

#### Acceptance Criteria

1. WHEN the Greeting_Panel is rendered, THE Greeting_Panel SHALL display the current time in the user's local timezone in hours, minutes, and seconds.
2. WHILE the Greeting_Panel is displayed, THE Greeting_Panel SHALL update the displayed time every 1 second without requiring a page reload.
3. THE Greeting_Panel SHALL display the time in 24-hour format with leading zeros (HH:MM:SS).

### Requirement 6: Current Date in Greeting Panel

**User Story:** As a user, I want to see today's date in the greeting panel, so that I know the current date at a glance.

#### Acceptance Criteria

1. THE Greeting_Panel SHALL display the current date in Bahasa Indonesia, showing the day name, day number, month name, and year in that order, based on Indonesian Western Time (WIB, UTC+7).
2. WHEN the date changes at midnight according to Indonesian Western Time (WIB, UTC+7), THE Greeting_Panel SHALL update the displayed date to the new date within 1 second.

### Requirement 7: Time-based Greeting

**User Story:** As a user, I want the greeting to change automatically based on the time of day, so that the application feels personal and relevant.

#### Acceptance Criteria

1. WHILE the current local time is at or after 05:00 and before 12:00, THE Greeting_Panel SHALL display the greeting "Selamat pagi".
2. WHILE the current local time is at or after 12:00 and before 15:00, THE Greeting_Panel SHALL display the greeting "Selamat siang".
3. WHILE the current local time is at or after 15:00 and before 18:00, THE Greeting_Panel SHALL display the greeting "Selamat sore".
4. WHILE the current local time is at or after 18:00 or before 05:00, THE Greeting_Panel SHALL display the greeting "Selamat malam".

### Requirement 8: Custom Name in Greeting (Additional Challenge)

**User Story:** As a user, I want to enter and save my name so that the greeting displays my name personally.

#### Acceptance Criteria

1. WHEN the User enters a name of 1 to 50 characters and confirms it, THE Greeting_Panel SHALL display the entered name alongside the greeting.
2. WHEN a name has been saved, THE Greeting_Panel SHALL display the saved name on every subsequent page load.
3. WHEN the User clears the saved name, THE Greeting_Panel SHALL remove the name from Local_Storage and display the greeting without a name.
4. WHEN the User confirms a name of 1 to 50 characters, THE Greeting_Panel SHALL store the entered name in Local_Storage under a dedicated storage key.
5. IF the User confirms an empty or blank name, THEN THE Greeting_Panel SHALL remove any previously saved name from Local_Storage and display the greeting without a name.
6. IF the User enters a name exceeding 50 characters, THEN THE Greeting_Panel SHALL display an error indicating the name exceeds the maximum length and SHALL NOT save the name.
7. IF Local_Storage is unavailable, THEN THE Greeting_Panel SHALL display the greeting using the entered name for the current session only and display an error indicating the name could not be saved.

### Requirement 9: Focus Timer Initial Duration

**User Story:** As a user, I want the focus timer to start at 25 minutes by default, so that I can follow the standard pomodoro technique.

#### Acceptance Criteria

1. WHEN the Focus_Timer is loaded for the first time, THE Focus_Timer SHALL display 25 minutes and 00 seconds without automatically starting the countdown.
2. WHEN the user resets the Focus_Timer, THE Focus_Timer SHALL restore the display to 25 minutes and 00 seconds and stop any active countdown.

### Requirement 10: Focus Timer Start

**User Story:** As a user, I want to start the focus timer, so that I can begin a focused work session.

#### Acceptance Criteria

1. WHEN the User clicks the Start button, THE Focus_Timer SHALL begin counting down from the current displayed time in one-second decrements.
2. WHILE the Focus_Timer is running, THE Focus_Timer SHALL display a visual indicator, separate from the countdown display, that the timer is active.
3. WHEN the countdown reaches zero, THE Focus_Timer SHALL stop automatically and display a visual notification indicating that the session is complete.
4. IF the displayed time is zero when the User clicks the Start button, THEN THE Focus_Timer SHALL not begin counting down and SHALL display a message indicating that the duration must be greater than zero.
5. IF the User clicks the Start button while the Focus_Timer is running, THEN THE Focus_Timer SHALL continue counting down from the current remaining time.

### Requirement 11: Focus Timer Stop

**User Story:** As a user, I want to pause the focus timer temporarily, so that I can resume my session after a short break.

#### Acceptance Criteria

1. WHILE the Focus_Timer is in the running state, WHEN the User clicks the Stop button, THE Focus_Timer SHALL stop decrementing the remaining time and retain the remaining time value that was current at the moment the Stop button was clicked.
2. WHILE the Focus_Timer is in the paused state, WHEN the User clicks the Start button, THE Focus_Timer SHALL resume decrementing the remaining time starting from the retained value.

### Requirement 12: Focus Timer Reset

**User Story:** As a user, I want to reset the focus timer, so that I can start a fresh session at any time.

#### Acceptance Criteria

1. WHEN the User clicks the Reset button, THE Focus_Timer SHALL stop the countdown, restore the display to the Default_Duration of 25 minutes and 00 seconds, and enter a stopped state in which the countdown does not automatically resume.
2. WHEN the User clicks the Reset button while the timer is running, THE Focus_Timer SHALL stop the countdown before restoring the Default_Duration.

### Requirement 13: Focus Timer Countdown Accuracy

**User Story:** As a user, I want the countdown to be accurate, so that I can trust the timer to measure my focus session correctly.

#### Acceptance Criteria

1. WHILE the Focus_Timer is running, THE Focus_Timer SHALL decrement the displayed time by one second per real second such that cumulative drift does not exceed 1 second over any 60-second interval.
2. THE Focus_Timer SHALL display the remaining time in MM:SS format with leading zeros applied to both the minutes and seconds fields for values below ten.
3. WHEN the remaining time reaches zero, THE Focus_Timer SHALL stop the countdown and display 00:00.

### Requirement 14: Add Task to To-Do List

**User Story:** As a user, I want to add a new task to the to-do list, so that I can track what I need to do.

#### Acceptance Criteria

1. WHEN the User enters task text between 1 and 255 characters and submits the form, THE Todo_List SHALL add the task to the list displayed on the screen.
2. IF the User submits a task with empty text or text consisting only of whitespace characters, THEN THE Todo_List SHALL not add the task and SHALL display a message prompting the User to enter task text.
3. IF the User submits task text exceeding 255 characters, THEN THE Todo_List SHALL not add the task and SHALL display a message indicating the task text exceeds the maximum length of 255 characters.
4. WHEN a task is added, THE Todo_List SHALL assign it a status of not completed.

### Requirement 15: Edit Task in To-Do List

**User Story:** As a user, I want to edit an existing task, so that I can correct or update the task text.

#### Acceptance Criteria

1. WHEN the User activates edit mode on a task and enters new text of 1 to 255 characters, THE Todo_List SHALL update the task text with the new value.
2. IF the User saves the edited task with text that is empty or contains only whitespace characters, THEN THE Todo_List SHALL retain the previous task text and display a validation message prompting the User to enter task text.
3. IF the User exits edit mode without saving changes, THEN THE Todo_List SHALL retain the previous task text without modifying the task.
4. IF the User saves the edited task with text exceeding 255 characters, THEN THE Todo_List SHALL display a validation message indicating the text exceeds the maximum length and retain the previous task text.

### Requirement 16: Mark Task as Complete

**User Story:** As a user, I want to mark a task as complete, so that I can track my finished work.

#### Acceptance Criteria

1. WHEN the User marks a task as complete, THE Todo_List SHALL apply a strikethrough text style to the task title and display a checked completion indicator on the task.
2. WHEN the User marks a completed task as incomplete, THE Todo_List SHALL remove the strikethrough text style from the task title and display an unchecked completion indicator on the task.
3. WHEN the User changes the completion state of a task, THE Todo_List SHALL retain the updated completion state such that the task retains its visual distinction after the Todo_List is closed and reopened.

### Requirement 17: Delete Task from To-Do List

**User Story:** As a user, I want to delete a task, so that I can remove unwanted or finished items from the list.

#### Acceptance Criteria

1. WHEN the User deletes a task, THE Todo_List SHALL remove the task from the displayed list and from Local_Storage.
2. WHEN a task is deleted, THE Todo_List SHALL update the displayed remaining task list to exclude the deleted task within 1 second and without requiring a page reload.
3. WHEN the page is reloaded after a task has been deleted, THE Todo_List SHALL not display the deleted task in the list.
4. IF Local_Storage is unavailable or the write operation fails when a task is deleted, THEN THE Todo_List SHALL retain the task in the displayed list and display an error message indicating that the deletion failed.

### Requirement 18: Persist To-Do List Data in Local Storage

**User Story:** As a user, I want my tasks to persist after I reload the browser, so that I do not lose my task list.

#### Acceptance Criteria

1. WHEN a task is added, edited, marked complete, or deleted, THE Todo_List SHALL save the updated task list, including each task's text and completion status, to Local_Storage.
2. WHEN the Life_Dashboard is loaded, THE Todo_List SHALL retrieve all tasks previously saved in Local_Storage and display them with each task's text and completion status preserved.
3. WHEN the Life_Dashboard is loaded and no tasks exist in Local_Storage, THE Todo_List SHALL display an empty list with no error message displayed to the user.
4. IF Local_Storage is unavailable or the save operation fails, THEN THE Todo_List SHALL display an error message indicating that tasks could not be saved and retain the current task list in the active session.

### Requirement 19: Prevent Duplicate Tasks (Additional Challenge)

**User Story:** As a user, I want the to-do list to prevent duplicate tasks, so that my list stays clean and organized.

#### Acceptance Criteria

1. WHEN the User submits a task whose text matches the text of any task currently in the to-do list, THE Task_Validator SHALL reject the new task without adding it to the list and display a message informing the User that the task already exists.
2. THE Task_Validator SHALL determine that two task texts match by comparing them case-insensitively after trimming leading and trailing whitespace from both texts.
3. WHEN the User edits a task so that its text matches the text of any other task currently in the to-do list, THE Task_Validator SHALL reject the edit without applying the change and display a message informing the User that the task already exists.

### Requirement 20: Display Quick Links

**User Story:** As a user, I want to see my favorite website links as buttons, so that I can access them quickly.

#### Acceptance Criteria

1. WHEN the Life_Dashboard is loaded, THE Quick_Links SHALL display all saved links as clickable buttons, each displaying the saved link's name or URL.
2. WHEN the Life_Dashboard is loaded with no links saved in Local_Storage, THE Quick_Links SHALL display a message indicating no links are saved, without displaying error messages.
3. WHEN a Quick_Links button is clicked, THE Quick_Links SHALL open the corresponding saved website URL.
4. IF Local_Storage cannot be read, THEN THE Quick_Links SHALL display an error message indicating the links could not be loaded, without displaying any link buttons.

### Requirement 21: Add Quick Link

**User Story:** As a user, I want to add a new website link, so that I can build my collection of favorite websites.

#### Acceptance Criteria

1. WHEN the User enters a link name and URL and submits the form, THE Quick_Links SHALL add the link as a new button displaying the link name.
2. IF the User submits a link with an empty or whitespace-only name or an empty or whitespace-only URL, THEN THE Quick_Links SHALL not add the link and SHALL display a message prompting the User to fill in both fields.
3. WHEN the User submits a link with a URL that lacks an http:// or https:// prefix, THE Quick_Links SHALL prepend "https://" to the URL before saving.

### Requirement 22: Open Quick Link

**User Story:** As a user, I want to open a quick link, so that I can navigate to my favorite website.

#### Acceptance Criteria

1. WHEN the User clicks a quick link button, THE Quick_Links SHALL open the corresponding saved website URL in a new browser tab.
2. THE Quick_Links SHALL open the URL using the complete saved URL including its protocol prefix.
3. IF the saved URL for a quick link button is missing a protocol prefix or is empty, THEN THE Quick_Links SHALL not open a new browser tab and SHALL display an error message indicating the URL is invalid.

### Requirement 23: Persist Quick Links in Local Storage

**User Story:** As a user, I want my quick links to persist after I reload the browser, so that my link collection is always available.

#### Acceptance Criteria

1. WHEN a quick link is added, THE Quick_Links SHALL save the complete updated link list to Local_Storage.
2. WHEN the Life_Dashboard is loaded, THE Quick_Links SHALL retrieve all links previously saved in Local_Storage and display them, displaying no links if none are saved.
3. IF saving to Local_Storage fails, THEN THE Quick_Links SHALL retain the added link in the current session and display an error message indicating the link could not be saved.
4. IF the link data retrieved from Local_Storage is invalid, THEN THE Quick_Links SHALL initialize with an empty link list.

### Requirement 24: Light/Dark Mode (Additional Challenge)

**User Story:** As a user, I want to switch between light and dark mode, so that I can use Life_Dashboard comfortably in different lighting conditions.

#### Acceptance Criteria

1. WHEN the User activates dark mode, THE Theme_Manager SHALL apply a dark color scheme, using a dark background with light text, to all visible UI elements of the Life_Dashboard without requiring a page reload.
2. WHEN the User activates light mode, THE Theme_Manager SHALL apply a light color scheme, using a light background with dark text, to all visible UI elements of the Life_Dashboard without requiring a page reload.
3. WHEN a theme is selected, THE Theme_Manager SHALL save the selected theme in Local_Storage.
4. WHEN the Life_Dashboard is loaded, THE Theme_Manager SHALL apply the previously saved theme from Local_Storage.
5. IF no valid theme is found in Local_Storage, THEN THE Theme_Manager SHALL apply light mode as the default theme.

### Requirement 25: Dashboard Layout and Card Design

**User Story:** As a user, I want a modern, clean, and professional dashboard layout, so that the application is pleasant and easy to use.

#### Acceptance Criteria

1. THE Life_Dashboard SHALL display each feature (Greeting_Panel, Focus_Timer, Todo_List, Quick_Links) inside a distinct card separated from adjacent cards by a minimum spacing of 16 pixels, where each card has a border of at least 1 pixel width, a drop shadow, or a background color distinct from the dashboard background.
2. THE Life_Dashboard SHALL apply a consistent color palette using no more than 5 distinct primary colors across all cards.
3. THE Life_Dashboard SHALL use a visual hierarchy where heading text is at least 1.5 times the font size of body text, and interactive elements are visually distinguishable from non-interactive elements through a difference in color, border, or background.
4. THE Life_Dashboard SHALL use readable fonts with a minimum body text size of 16 pixels, a minimum heading text size of 24 pixels, and a minimum label text size of 14 pixels, with a minimum text-to-background contrast ratio of 4.5:1.

### Requirement 26: Responsive Design

**User Story:** As a user, I want Life_Dashboard to work on both laptop and smartphone, so that I can use it on any device.

#### Acceptance Criteria

1. WHEN the Life_Dashboard is viewed on a screen with a width of 1024 pixels or greater, THE Life_Dashboard SHALL display the layout within the viewport width without horizontal scrolling.
2. WHEN the Life_Dashboard is viewed on a screen with a width of 480 pixels or less, THE Life_Dashboard SHALL adjust the layout so that all cards and controls fit within the viewport width without horizontal scrolling, all text remains visible without clipping or overlapping, and all interactive controls remain tappable and functional within the visible viewport.

### Requirement 27: Interactive Feedback

**User Story:** As a user, I want buttons and inputs to respond visually to interaction, so that I get clear feedback when I use the application.

#### Acceptance Criteria

1. WHEN the User hovers over a button or link, THE Life_Dashboard SHALL display a perceptible change in at least one visual property — background, border, or shadow — to indicate the hover state.
2. WHEN the User hovers over, focuses on, or presses a button or input, THE Life_Dashboard SHALL apply a transition between visual states that completes within 100 to 300 milliseconds.
3. THE Life_Dashboard SHALL display buttons and inputs with a minimum interactive target size of 44 by 44 CSS pixels on both laptop and smartphone displays.
4. WHEN a button or input receives keyboard focus, THE Life_Dashboard SHALL display a focus indicator that is visually distinguishable from its non-focused state.

### Requirement 28: JavaScript Code Quality

**User Story:** As a developer, I want the JavaScript code to follow good practices, so that the code is readable, maintainable, and free of errors.

#### Acceptance Criteria

1. THE Life_Dashboard SHALL use `let` and `const` for all variable declarations and SHALL NOT use `var`.
2. THE Life_Dashboard SHALL encapsulate any logic block exceeding 5 consecutive statements that performs a single responsibility into a named function rather than leaving it inline.
3. THE Life_Dashboard SHALL attach event listeners for all user-initiated interactions with UI elements (clicks, input changes, and form submissions) and SHALL NOT use inline event handlers such as `onclick` attributes.
4. THE Life_Dashboard SHALL name all variables and functions using camelCase with names of at least 3 characters that describe their purpose, and SHALL NOT use single-letter identifiers except for loop counters (`i`, `j`, `k`) or placeholder names such as `temp`, `foo`, or `stuff`.
5. THE Life_Dashboard SHALL not contain repeated code blocks of 3 or more identical consecutive statements, and SHALL reuse shared functions for repeated logic instead.
6. WHEN the Life_Dashboard runs, the browser console SHALL display no JavaScript errors or uncaught exceptions during normal operation.

### Requirement 29: Code Comments and Explanation in Indonesian

**User Story:** As a student learning HTML, CSS, and JavaScript, I want the code to include explanatory comments in Indonesian, so that I can understand how each part works.

#### Acceptance Criteria

1. THE Life_Dashboard JavaScript file SHALL include a comment in Indonesian explaining the purpose of each function defined in the file.
2. THE Life_Dashboard JavaScript file SHALL include a comment in Indonesian explaining each code section that contains conditional statements, loops, or event handlers.
3. THE Life_Dashboard CSS file SHALL include a comment in Indonesian identifying the purpose of each group of style rules that target a specific visual component or layout area.
4. THE Life_Dashboard HTML file SHALL include a comment in Indonesian identifying the purpose of each distinct structural section of the document, including the header, main content, and footer areas.

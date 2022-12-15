window.browser = window.browser || window.chrome;

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

function restoreOptions() {
    browser.storage.sync.get({
        openInNewTab: false
    }, function (items) {
        document.getElementById('openInNewTab').checked = items.openInNewTab;
    });
}

function saveOptions() {
    browser.storage.sync.set({
        openInNewTab: document.getElementById('openInNewTab').checked
    }, function () {
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 3000);
    });
}


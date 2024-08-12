document.addEventListener('DOMContentLoaded', function () {
    // Open in new tab
    browser.storage.sync.get('openInNewTab', function (result) {
        document.getElementById('newTabCheckbox').checked = result.openInNewTab || false;
    });
    document.getElementById('newTabCheckbox').addEventListener('change', function () {
        browser.storage.sync.set({'openInNewTab': this.checked});
    });

    // Use custom instance URL
    browser.storage.sync.get('instanceUrl', function (result) {
        document.getElementById('instanceUrlInput').value = result.instanceUrl || 'https://piped.kavin.rocks/';
    });
    document.getElementById('instanceUrlInput').addEventListener('change', function () {
        browser.storage.sync.set({'instanceUrl': this.value});
    });
});

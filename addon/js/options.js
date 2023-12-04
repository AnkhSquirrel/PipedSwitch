document.addEventListener('DOMContentLoaded', function () {
    browser.storage.sync.get('openInNewTab', function (result) {
      document.getElementById('newTabCheckbox').checked = result.openInNewTab || false;
    });
  
    document.getElementById('newTabCheckbox').addEventListener('change', function () {
      browser.storage.sync.set({ 'openInNewTab': this.checked });
    });
  });
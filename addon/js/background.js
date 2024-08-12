const YOUTUBE_URL = "https://www.youtube.com/";

browser.storage.sync.get('instanceUrl', function (result) {
    let pipedUrl = result.instanceUrl || 'https://piped.kavin.rocks/';
    window.browser.contextMenus.create({
        "title": "Piped Switch",
        "onclick": Switch,
        "documentUrlPatterns": ['*://*.youtube.com/*', pipedUrl + '*']
    });
});

function Switch(info) {
    browser.storage.sync.get('instanceUrl', function (result) {
        let pipedUrl = result.instanceUrl || 'https://piped.kavin.rocks/';
        const CURRENT_URL = info.pageUrl;
        let newUrl = CURRENT_URL;

        if (CURRENT_URL.includes(YOUTUBE_URL)) {
            newUrl = pipedUrl + CURRENT_URL.split(YOUTUBE_URL)[1];
        } else if (CURRENT_URL.includes(pipedUrl)) {
            newUrl = YOUTUBE_URL + CURRENT_URL.split(pipedUrl)[1];
        }

        browser.storage.sync.get('openInNewTab', function (result) {
            const openInNewTab = result.openInNewTab || false;
            if (openInNewTab) {
                browser.tabs.create({url: newUrl});
            } else {
                browser.tabs.update({url: newUrl});
            }
        });
    });
}

const YOUTUBE_URL = "https://www.youtube.com/";
const PIPED_URL = "https://piped.kavin.rocks/";

window.browser.contextMenus.create({
    "title": "Piped Switch",
    "onclick": Switch,
    "documentUrlPatterns": ['*://*.youtube.com/*', '*://piped.kavin.rocks/*']
})

function Switch(info) {
    const CURRENT_URL = info.pageUrl;
    let newUrl = CURRENT_URL;

    if (CURRENT_URL.includes(YOUTUBE_URL)) {
        newUrl = PIPED_URL + CURRENT_URL.split(YOUTUBE_URL)[1];
    } else if (CURRENT_URL.includes(PIPED_URL)) {
        newUrl = YOUTUBE_URL + CURRENT_URL.split(PIPED_URL)[1];
    }

    browser.storage.sync.get('openInNewTab', function (result) {
        const openInNewTab = result.openInNewTab || false;
        if (openInNewTab) {
            browser.tabs.create({ url: newUrl });
        } else {
            browser.tabs.update({ url: newUrl });
        }
    });
}
window.browser = window.browser || window.chrome;

const YOUTUBE_URL = "https://www.youtube.com/";
const PIPED_URL = "https://piped.kavin.rocks/";

window.browser.contextMenus.create({
    "title": "Piped Switch",
    "onclick": swicthWebsite,
    "documentUrlPatterns": ['*://*.youtube.com/*', '*://piped.kavin.rocks/*']
})

function swicthWebsite(info) {
    const URL = info.pageUrl;
    let newUrl = URL;

    if (URL.includes(YOUTUBE_URL)) {
        newUrl = PIPED_URL + URL.split(YOUTUBE_URL)[1];
    } else if (URL.includes(PIPED_URL)) {
        newUrl = YOUTUBE_URL + URL.split(PIPED_URL)[1];
    }

    browser.storage.sync.get({
        openInNewTab: false
    }, function (items) {
        if (items.openInNewTab) {
            browser.tabs.create({
                url: newUrl,
            });
        } else {
            browser.tabs.update({
                url: newUrl,
            });
        }
    });
}
